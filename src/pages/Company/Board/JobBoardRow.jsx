import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { RiInboxArchiveLine } from "react-icons/ri";
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
              status: "Uncategorized",
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
          queryKey: ["Jobs", "board", pageNo, limit, id, "Uncategorized"],
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
                  : data?.status === "Uncategorized"
                  ? "#01405126"
                  : "#FFD60026",
              color:
                data?.status === "Shortlisted"
                  ? "#00643A"
                  : data?.status === "Rejected"
                  ? "#FF0000"
                  : data?.status === "Uncategorized"
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
          {!!data?.experience ? `${data?.experience} yrs` : ""}
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
      <div className={`table-item table-content table-content-8`}>
        {isUpdating && <div className="loader-4"></div>}
        {!isUpdating && (
          <>
            {(!!status === false || status === "Show All") && (
              <>
                {data?.status === "Uncategorized" && (
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
            {status === "Uncategorized" && (
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
          </>
        )}
      </div>
    </Fragment>
  );
}
