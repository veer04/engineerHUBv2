import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdMailOutline, MdVisibility, MdClose } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/User/UserDetails";
import { useQueryClient } from "@tanstack/react-query";

export default function JobBoardRow({
  data,
  selectedRows,
  setSelectedRows,
  isAnyRowUpdating,
  setIsAnyRowUpdating,
  isDataFetching,
  showAIScore,
  onSendMail,
}) {
  // get the hiring id from the url use useParams
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status"));
  const [pageNo, setPageNo] = useState(searchParams.get("pageNo"));
  const [limit, setLimit] = useState(searchParams.get("limit"));
  const [isHired, setIsHired] = useState(data?.isHired);
  const [isSelected, setIsSelected] = useState(false);
  const [isHiringLoading, setIsHiringLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  useEffect(() => {
    setStatus(searchParams.get("status"));
  }, [searchParams.get("status")]);

  useEffect(() => {
    setIsHired(data?.isHired);
    setIsHiringLoading(false);
  }, [data?.isHired]);

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  function handleSelectApplicant() {
    if (selectedRows.some((job) => job?._id === data?._id)) {
      setSelectedRows(selectedRows.filter((job) => job?._id !== data?._id));
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  }

  function shortlistApplicant() {
    setIsUpdating(true);
    setIsAnyRowUpdating(true);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: [
            {
              registrationId: data?._id,
              status: "Shortlisted",
            },
          ],
        },
        config
      )
      .then((res) => {
        setIsAnyRowUpdating(false);
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, status],
        });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, "Shortlisted"],
        });
        console.log(res);
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsAnyRowUpdating(false);
        console.log(err);
        setIsUpdating(false);
      });
  }

  function rejectApplicant() {
    setIsUpdating(true);
    setIsAnyRowUpdating(true);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: [
            {
              registrationId: data?._id,
              status: "Rejected",
            },
          ],
        },
        config
      )
      .then((res) => {
        setIsAnyRowUpdating(false);
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, status],
        });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, "Rejected"],
        });
        console.log(res);
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsAnyRowUpdating(false);
        console.log(err);
        setIsUpdating(false);
      });
  }

  function uncategorizeApplicant() {
    setIsUpdating(true);
    setIsAnyRowUpdating(true);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: [
            {
              registrationId: data?._id,
              status: "Response",
            },
          ],
        },
        config
      )
      .then((res) => {
        setIsAnyRowUpdating(false);
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, status],
        });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, "Response"],
        });
        console.log(res);
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsAnyRowUpdating(false);
        console.log(err);
        setIsUpdating(false);
      });
  }

  function handleIsHired() {
    setIsHiringLoading(true);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateHiringStatus`,
        {
          hiringId: id,
          data: [
            {
              registrationId: data?._id,
              isHired: !isHired,
            },
          ],
        },
        config
      )
      .then((res) => {
        console.log(res);
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board", pageNo, limit, id, status],
        });
        // setIsHiringLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsHiringLoading(false);
      });
  }

  return (
    <Fragment key={data?._id}>
      <div className="table-item table-content table-content-1">
        <input
          type="checkbox"
          name={`item-name-${data?._id}`}
          id={`item-id-${data?._id}`}
          checked={selectedRows.some((job) => job?._id === data?._id)}
          onChange={() => handleSelectApplicant()}
        />
      </div>
      <div
        className={`table-item table-content table-content-2 ${
          !!status === false ? "--show-all" : ""
        }`}
      >
        <p
          title={`${data?.firstName}${
            data?.lastName ? ` ${data?.lastName}` : ""
          }`}
          className="body-sm-regular text-crop-2"
        >
          {`${data?.firstName}${data?.lastName ? ` ${data?.lastName}` : ""}`}
        </p>
        {!!status === false && (
          <span
            className="status-tag"
            style={{
              backgroundColor:
                data?.status === "Shortlisted"
                  ? "#00D5881A"
                  : data?.status === "Rejected"
                  ? "#FF00001A"
                  : data?.status === "Response"
                  ? "#01405126"
                  : "#FFD60026",
              color:
                data?.status === "Shortlisted"
                  ? "#00643A"
                  : data?.status === "Rejected"
                  ? "#FF0000"
                  : data?.status === "Response"
                  ? "#002B36"
                  : "#B89A00",
            }}
          >
            {data?.status}
          </span>
        )}
      </div>
      <div className="table-item table-content text-crop-1 overflow-hidden table-content-3">
        <p
          title={data?.skills?.split(",")?.join(", ")}
          className="body-sm-regular text-crop-2 "
        >
          {data?.skills?.split(",")?.join(", ")}
        </p>
      </div>
      <div className="table-item table-content table-content-4">
        <p title={data?.college} className="body-sm-regular text-crop-2">
          {data?.college}
        </p>
      </div>
      <div className="table-item table-content table-content-5">
        <p title={data?.batch} className="body-sm-regular text-crop-2">
          {data?.batch}
        </p>
      </div>
      <div className="table-item table-content table-content-6">
        <p title={data?.experience} className="body-sm-regular text-crop-2">
          {data?.experience > 0
            ? data?.experience === 1
              ? `${data?.experience} year`
              : `${data?.experience} years`
            : ""}
        </p>
      </div>
      <div className="table-item table-content table-content-7">
        {data?.resumeUrl ? (
          <a
            className="body-sm-regular text-crop-2"
            href={data?.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to view
          </a>
        ) : (
          "-"
        )}
      </div>
      {showAIScore && (
        <div className="table-item table-content table-content-sorted">
          <div className="ai-score-container">
            <div className="ai-score">
              <span className="score-value">
                {data?.aiScore !== undefined && data?.aiScore !== null 
                  ? `${Math.round(data.aiScore)}/100` 
                  : "N/A"}
              </span>
            </div>
            {data?.aiScoringSuccess === false && (
              <small className="score-warning">⚠️ Fallback</small>
            )}
          </div>
        </div>
      )}
      {showAIScore && (
        <div className="table-item table-content table-content-summary">
          <div className="summary-content">
            {data?.aiScoreDetails?.reasoning ? (
              <button 
                className="view-summary-btn body-sm-regular"
                onClick={() => setShowSummaryModal(true)}
                title="View AI Analysis Summary"
              >
                <MdVisibility /> View Summary
              </button>
            ) : (
              <small>No summary available</small>
            )}
          </div>
        </div>
      )}
      <div className={`table-item table-content table-content-8`}>
        {isUpdating && <div className="loader-4"></div>}
        {!isUpdating && (
          <>
            {(!!status === false || status === "Show All") && (
              <>
                {data?.status === "Response" && (
                  <>
                    <button
                      onClick={() => shortlistApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                    >
                      <FiUserPlus />
                    </button>
                    <button
                      onClick={() => rejectApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                    >
                      <FiUserX />
                    </button>
                  </>
                )}
                {data?.status === "Shortlisted" && (
                  <>
                    <button
                      onClick={() => rejectApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                    >
                      <FiUserX />
                    </button>
                    <button
                      onClick={() => uncategorizeApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                    >
                      <RiInboxArchiveLine />
                    </button>
                  </>
                )}
                {data?.status === "Rejected" && (
                  <>
                    <button
                      onClick={() => uncategorizeApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                    >
                      <RiInboxArchiveLine />
                    </button>
                  </>
                )}
              </>
            )}
            {status === "Response" && (
              <>
                <button
                  onClick={() => shortlistApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                >
                  <FiUserPlus />
                </button>
                <button
                  onClick={() => rejectApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                >
                  <FiUserX />
                </button>
              </>
            )}

            {status === "Shortlisted" && (
              <>
                <button
                  onClick={() => rejectApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                >
                  <FiUserX />
                </button>
                <button
                  onClick={() => uncategorizeApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                >
                  <RiInboxArchiveLine />
                </button>
              </>
            )}

            {status === "Rejected" && (
              <>
                <button
                  onClick={() => uncategorizeApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                >
                  <RiInboxArchiveLine />
                </button>
              </>
            )}

            {status === "Processing" && (
              <div
                className={`hired-btn d-flex align-items-center w-100 gap-2 ${
                  isHired ? "--hired" : ""
                }`}
              >
                {!isHiringLoading && !isHired && (
                  <>
                    <input
                      type="checkbox"
                      name={`item-name-${data?._id}`}
                      id={`item-id-hired-${data?._id}`}
                      checked={isHired}
                      onChange={handleIsHired}
                    />
                    <label
                      htmlFor={`item-id-hired-${data?._id}`}
                      className={`${isHired ? "--hired" : ""}`}
                    >
                      Mark as hired
                    </label>
                  </>
                )}
                {isHiringLoading && (
                  <>
                    <div className="loader-4"></div> Updating
                  </>
                )}
                {!isHiringLoading && isHired && (
                  <>
                    <input
                      type="checkbox"
                      name={`item-name-${data?._id}`}
                      id={`item-id-hired-${data?._id}`}
                      checked={isHired}
                      onChange={handleIsHired}
                    />
                    <label
                      htmlFor={`item-id-hired-${data?._id}`}
                      className={`${isHired ? "--hired" : ""}`}
                    >
                      Hired
                    </label>
                  </>
                )}
              </div>
            )}
            <button onClick={onSendMail} title="Send Mail">
              <MdMailOutline />
            </button>
          </>
        )}
      </div>

      {/* AI Summary Modal */}
      {showSummaryModal && (
        <div className="ai-summary-modal-overlay" onClick={() => setShowSummaryModal(false)}>
          <div className="ai-summary-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">AI Analysis Summary</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowSummaryModal(false)}
                title="Close"
              >
                <MdClose />
              </button>
            </div>
            <div className="modal-content">
              <div className="candidate-info">
                <h4>{`${data?.firstName}${data?.lastName ? ` ${data?.lastName}` : ""}`}</h4>
                <p className="ai-score-display">
                  <strong>AI Score: </strong>
                  <span className="score-badge">
                    {data?.aiScore !== undefined && data?.aiScore !== null 
                      ? `${Math.round(data.aiScore)}/100` 
                      : "N/A"}
                  </span>
                  {data?.aiScoringSuccess === false && (
                    <span className="fallback-warning">⚠️ Fallback Score</span>
                  )}
                </p>
              </div>
              
              {data?.aiScoreDetails?.reasoning && (
                <div className="reasoning-section">
                  <h5>Analysis Reasoning:</h5>
                  <p>{data.aiScoreDetails.reasoning}</p>
                </div>
              )}
              
              {data?.aiScoreDetails?.keyStrengths && data.aiScoreDetails.keyStrengths.length > 0 && (
                <div className="strengths-section">
                  <h5>Key Strengths:</h5>
                  <ul>
                    {data.aiScoreDetails.keyStrengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {data?.aiScoreDetails?.skillMatch !== undefined && (
                <div className="detailed-scores">
                  <h5>Detailed Breakdown:</h5>
                  <div className="score-breakdown">
                    {data.aiScoreDetails.skillMatch !== undefined && (
                      <div className="score-item">
                        <span>Skill Match:</span>
                        <span>{data.aiScoreDetails.skillMatch}/100</span>
                      </div>
                    )}
                    {data.aiScoreDetails.experienceRelevance !== undefined && (
                      <div className="score-item">
                        <span>Experience Relevance:</span>
                        <span>{data.aiScoreDetails.experienceRelevance}/100</span>
                      </div>
                    )}
                    {data.aiScoreDetails.educationFit !== undefined && (
                      <div className="score-item">
                        <span>Education Fit:</span>
                        <span>{data.aiScoreDetails.educationFit}/100</span>
                      </div>
                    )}
                    {data.aiScoreDetails.overallFit !== undefined && (
                      <div className="score-item">
                        <span>Overall Fit:</span>
                        <span>{data.aiScoreDetails.overallFit}/100</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
