import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdMailOutline, MdVisibility, MdClose } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/User/UserDetails";
import { useQueryClient } from "@tanstack/react-query";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";

export default function JobBoardRow({
  data,
  selectedRows,
  setSelectedRows,
  isAnyRowUpdating,
  setIsAnyRowUpdating,
  isDataFetching,
  showAIScore,
  showProcessingView,
  onSendMail,
}) {
  // get the hiring id from the url use useParams
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status"));
  const [pageNo, setPageNo] = useState(searchParams.get("pageNo"));
  const [limit, setLimit] = useState(searchParams.get("limit"));

  const [isSelected, setIsSelected] = useState(false);
  const [isHiringLoading, setIsHiringLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = useGlobalSnackbar();

  useEffect(() => {
    setStatus(searchParams.get("status"));
  }, [searchParams.get("status")]);

  useEffect(() => {
    setIsHiringLoading(false);
  }, [data?.isMarkedForInterview]);

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  const fallbackReason = data?.aiScoreDetails?.reasoning?.toLowerCase?.() || "";
  const isFallbackScore =
    data?.aiScoringSuccess === false || fallbackReason.includes("fallback scoring");

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

  function handleMarkForInterview() {
    setIsHiringLoading(true);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/markForInterview`,
        {
          hiringId: id,
          data: [
            {
              registrationId: data?._id,
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
        // Show success message
        if (res.data.success) {
          setSnackbarMessage("Candidate marked for interview successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        }
        setIsHiringLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage(err?.response?.data?.message || "Failed to mark candidate for interview");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsHiringLoading(false);
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
      {showProcessingView ? (
        <>
          <div className="table-item table-content table-content-email">
            <p title={data?.email || data?.userId?.email || "Not available"} className="body-sm-regular text-crop-2">
              {data?.email || data?.userId?.email || "Not available"}
            </p>
          </div>
          <div className="table-item table-content table-content-phone">
            <p title={data?.phone || data?.userId?.phone || "Not available"} className="body-sm-regular text-crop-2">
              {data?.phone || data?.userId?.phone || "Not available"}
            </p>
          </div>
          <div className="table-item table-content table-content-sorted">
            <div className="ai-score-container">
              <div className="ai-score">
                <span className="score-value">
                  {data?.aiScore !== undefined && data?.aiScore !== null 
                    ? `${Math.round(data.aiScore)}/100` 
                    : "N/A"}
                </span>
              </div>
              {isFallbackScore && (
                <small className="score-warning">⚠️ Fallback</small>
              )}
            </div>
          </div>
          <div className="table-item table-content table-content-summary">
            <div className="summary-content">
              {data?.aiScoreDetails?.reasoning ? (
                <button 
                  className="view-summary-btn body-sm-regular"
                  onClick={() => setShowSummaryModal(true)}
                  title="View AI Analysis Summary"
                >
                  <MdVisibility /> Summary
                </button>
              ) : (
                <small>No summary available</small>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
      <div className="table-item table-content table-content-7">
        {data?.resumeUrl ? (
          <a
            className="body-sm-regular text-crop-2"
            href={data?.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
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
            {isFallbackScore && (
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
                <MdVisibility /> Summary
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
                      className="action-btn shortlist-btn"
                      title="Shortlist Candidate"
                    >
                      <FiUserPlus />
                    </button>
                    <button
                      onClick={() => rejectApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn reject-btn"
                      title="Reject Candidate"
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
                      className="action-btn reject-btn"
                      title="Reject Candidate"
                    >
                      <FiUserX />
                    </button>
                    <button
                      onClick={() => uncategorizeApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn response-btn"
                      title="Move to Response"
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
                      className="action-btn response-btn"
                      title="Move to Response"
                    >
                      <RiInboxArchiveLine />
                    </button>
                  </>
                )}
                {data?.status === "Sorted" && (
                  <>
                    <button
                      onClick={() => shortlistApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn shortlist-btn"
                      title="Shortlist Candidate"
                    >
                      <FiUserPlus />
                    </button>
                    <button
                      onClick={() => rejectApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn reject-btn"
                      title="Reject Candidate"
                    >
                      <FiUserX />
                    </button>
                    <button
                      onClick={() => uncategorizeApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn response-btn"
                      title="Move to Response"
                    >
                      <RiInboxArchiveLine />
                    </button>
                  </>
                )}
                {data?.status === "Processing" && (
                  <>
                    <button
                      onClick={() => shortlistApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn shortlist-btn"
                      title="Shortlist Candidate"
                    >
                      <FiUserPlus />
                    </button>
                    <button
                      onClick={() => rejectApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn reject-btn"
                      title="Reject Candidate"
                    >
                      <FiUserX />
                    </button>
                    <button
                      onClick={() => uncategorizeApplicant()}
                      disabled={isAnyRowUpdating || isDataFetching}
                      className="action-btn response-btn"
                      title="Move to Response"
                    >
                      <RiInboxArchiveLine />
                    </button>
                    <div
                      className={`hired-btn processing-btn d-flex align-items-center gap-2 ${
                        data?.isMarkedForInterview ? "--hired" : ""
                      }`}
                    >
                      {!isHiringLoading && !data?.isMarkedForInterview && (
                        <>
                          <input
                            type="checkbox"
                            name={`item-name-${data?._id}`}
                            id={`item-id-interview-${data?._id}`}
                            checked={data?.isMarkedForInterview}
                            onChange={handleMarkForInterview}
                          />
                          <label
                            htmlFor={`item-id-interview-${data?._id}`}
                            className={`${data?.isMarkedForInterview ? "--hired" : ""}`}
                          >
                            Mark for Interview
                          </label>
                        </>
                      )}
                      {isHiringLoading && (
                        <>
                          <div className="loader-4"></div> Updating
                        </>
                      )}
                      {!isHiringLoading && data?.isMarkedForInterview && (
                        <>
                          <input
                            type="checkbox"
                            name={`item-name-${data?._id}`}
                            id={`item-id-interview-${data?._id}`}
                            checked={data?.isMarkedForInterview}
                            onChange={handleMarkForInterview}
                          />
                          <label
                            htmlFor={`item-id-interview-${data?._id}`}
                            className={`${data?.isMarkedForInterview ? "--hired" : ""}`}
                          >
                            Marked for Interview
                          </label>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            {status === "Response" && (
              <>
                <button
                  onClick={() => shortlistApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn shortlist-btn"
                  title="Shortlist Candidate"
                >
                  <FiUserPlus />
                </button>
                <button
                  onClick={() => rejectApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn reject-btn"
                  title="Reject Candidate"
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
                  className="action-btn reject-btn"
                  title="Reject Candidate"
                >
                  <FiUserX />
                </button>
                <button
                  onClick={() => uncategorizeApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn response-btn"
                  title="Move to Response"
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
                  className="action-btn response-btn"
                  title="Move to Response"
                >
                  <RiInboxArchiveLine />
                </button>
              </>
            )}

            {status === "Sorted" && (
              <>
                <button
                  onClick={() => shortlistApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn shortlist-btn"
                  title="Shortlist Candidate"
                >
                  <FiUserPlus />
                </button>
                <button
                  onClick={() => rejectApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn reject-btn"
                  title="Reject Candidate"
                >
                  <FiUserX />
                </button>
                <button
                  onClick={() => uncategorizeApplicant()}
                  disabled={isAnyRowUpdating || isDataFetching}
                  className="action-btn response-btn"
                  title="Move to Response"
                >
                  <RiInboxArchiveLine />
                </button>
              </>
            )}

            {status === "Processing" && (
              <div
                className={`hired-btn processing-btn d-flex align-items-center gap-2 ${
                  data?.isMarkedForInterview ? "--hired" : ""
                }`}
              >
                {!isHiringLoading && !data?.isMarkedForInterview && (
                  <>
                    <input
                      type="checkbox"
                      name={`item-name-${data?._id}`}
                      id={`item-id-interview-${data?._id}`}
                      checked={data?.isMarkedForInterview}
                      onChange={handleMarkForInterview}
                    />
                    <label
                      htmlFor={`item-id-interview-${data?._id}`}
                      className={`${data?.isMarkedForInterview ? "--hired" : ""}`}
                    >
                      Mark for Interview
                    </label>
                  </>
                )}
                {isHiringLoading && (
                  <>
                    <div className="loader-4"></div> Updating
                  </>
                )}
                {!isHiringLoading && data?.isMarkedForInterview && (
                  <>
                    <input
                      type="checkbox"
                      name={`item-name-${data?._id}`}
                      id={`item-id-interview-${data?._id}`}
                      checked={data?.isMarkedForInterview}
                      onChange={handleMarkForInterview}
                    />
                    <label
                      htmlFor={`item-id-interview-${data?._id}`}
                      className={`${data?.isMarkedForInterview ? "--hired" : ""}`}
                    >
                      Marked for Interview
                    </label>
                  </>
                )}
              </div>
            )}
            <button 
              onClick={onSendMail} 
              title="Send email to this candidate"
              className="action-btn mail-btn"
            >
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
                  {isFallbackScore && (
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
              
              {data?.aiScoreDetails?.areasOfConcern && data.aiScoreDetails.areasOfConcern.length > 0 && (
                <div className="concerns-section">
                  <h5>Areas of Concern:</h5>
                  <ul>
                    {data.aiScoreDetails.areasOfConcern.map((concern, index) => (
                      <li key={index}>{concern}</li>
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
                    {data.aiScoreDetails.educationalBackground !== undefined && (
                      <div className="score-item">
                        <span>Educational Background:</span>
                        <span>{data.aiScoreDetails.educationalBackground}/100</span>
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
