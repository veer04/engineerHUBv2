import { Fragment, useEffect, useState } from "react";
import {
  getAccessToken,
  getUserEmail,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./ReferralAdminPage.css";
import { Helmet } from "react-helmet";
import { IoIosInformationCircleOutline, IoMdCheckmark } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PAYMENT_API_URL } from "../../services/APIUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment/moment";
import PaginationBarWithSearchParams from "../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import Loading from "../../components/Loader/Loading";

export default function MeetingAdminPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = [
    "rishabhs883@gmail.com",
    "career@engineerhub.in",
  ];
  if (!allowedEmailIds.includes(getUserEmail().toLowerCase()))
    return <Page404 />;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pageCount, setPageCount] = useState(1);
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
  };

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  const meetingQuery = useQuery({
    queryKey: [
      "admin",
      "employerMeetings",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 30,
    ],
    queryFn: () =>
      axios
        .get(
          `${PAYMENT_API_URL}payment/admin/employer-meet-records?page=${params.pageNo}&limit=${params.limit}`,
          config
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate("/admin/meetings?pageNo=1&limit=30");
    }
  }, [pageNo, limit, navigate]);

  useEffect(() => {
    if (meetingQuery.isSuccess) {
      const totalRecords = meetingQuery.data?.data?.data?.totalRecords || 1;
      const recordsLength = meetingQuery.data?.data?.data?.records?.length || 1;
      const currentLimit = limit ? Number(limit) : recordsLength;
      setPageCount(Math.ceil(totalRecords / currentLimit) || 1);
    }
  }, [meetingQuery, limit]);

  return (
    <div className="referral-admin-layout">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Meetings | Admin Panel</title>
      </Helmet>

      {/* Sidebar Panel */}
      <aside className="referral-admin-sidebar">
        <div className="sidebar-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/referrals?pageNo=1&limit=30")}
          >
            <span>Bookings</span>
          </button>
          <button
            className="referral-sidebar-btn active"
            onClick={() => navigate("/admin/meetings?pageNo=1&limit=30")}
          >
            <span>Meetings</span>
          </button>
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/hirings?pageNo=1&limit=30")}
          >
            <span>Hirings</span>
          </button>
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/digital-products?pageNo=1&limit=30")}
          >
            <span>Digital Products</span>
          </button>
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/subscriptions?pageNo=1&limit=30")}
          >
            <span>Subscriptions</span>
          </button>
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/upload")}
          >
            <span>Upload</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="referral-admin-main">
        <div className="referral-admin-page">
          <section>
            <div className="referral-table-title">
              <h1 className="body-lg-semibold">Check the latest employer meetings here</h1>
              <PaginationBarWithSearchParams
                className="m-0 referral-table-pagination-bar"
                param="pageNo"
                pages={pageCount}
              />
            </div>

            <div className="limit-container">
              <p className="text">Showing</p>
              <select
                name="limit"
                id="limit"
                value={limit || "30"}
                onChange={(e) => {
                  navigate(`/admin/meetings?pageNo=1&limit=${e.target.value}`);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <p className="text">results</p>
            </div>

            <div className="referral-table">
              <div className="table-item table-headers body-sm-regular">Recruiter & Company</div>
              <div className="table-item table-headers body-sm-regular">Phone Number</div>
              <div className="table-item table-headers body-sm-regular">Requirement / Message</div>
              <div className="table-item table-headers body-sm-regular">Date & Time Slot</div>
              <div className="table-item table-headers body-sm-regular">Actions</div>
              <div className="table-item table-headers body-sm-regular">Booking Details</div>
              <div className="table-item table-headers body-sm-regular">Booking Status</div>

              {meetingQuery.isPending && (
                <div
                  style={{
                    marginTop: "5dvh",
                    marginBottom: "10dvh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gridColumn: "1/8",
                  }}
                >
                  <Loading />
                </div>
              )}

              {meetingQuery.isSuccess &&
                meetingQuery.data?.data?.data?.records?.length === 0 && (
                  <div
                    style={{
                      padding: "3rem",
                      textAlign: "center",
                      gridColumn: "1/8",
                      color: "#64748b",
                      fontWeight: "600",
                    }}
                  >
                    No employer meeting bookings recorded yet.
                  </div>
                )}

              {meetingQuery.isSuccess &&
                meetingQuery.data?.data?.data?.records?.map((content, index) => (
                  <Fragment key={content._id || index}>
                    {/* Column 1: Recruiter Name, Email, Role Tag (User/Alumni/Employer) */}
                    <div className="table-item table-content table-content-2">
                      <p className="body-sm-semibold">
                        {content?.name ? content?.name : <i>No name provided</i>}
                      </p>
                      <p className="label-sm" style={{ marginBottom: "4px" }}>
                        {content?.email ? content?.email : <i>No email provided</i>}
                      </p>
                      <span
                        className="label-sm"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#e6f4f4",
                          color: "#138382",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "700",
                          display: "inline-block",
                          marginTop: "2px",
                        }}
                      >
                        {content?.role === "Organization" || content?.role === "Employer" || (content?.companyName && content?.companyName !== "NA")
                          ? "Employer"
                          : content?.role || "Employer"}
                      </span>
                      {content?.companyName && content?.companyName !== "NA" && (
                        <p className="label-sm" style={{ fontSize: "11px", color: "#475569", fontWeight: "600", marginTop: "4px" }}>
                          {content?.companyName} {content?.designation && content?.designation !== "NA" ? `(${content?.designation})` : ""}
                        </p>
                      )}
                    </div>

                    {/* Column 2: Phone Number */}
                    <div className="table-item table-content body-sm-semibold">
                      {content?.mobile ? (
                        content?.mobile
                      ) : (
                        <i style={{ color: "#94a3b8" }}>No phone number provided</i>
                      )}
                    </div>

                    {/* Column 3: Requirement / Message */}
                    <div className="table-item table-content table-content-2">
                      {content?.query ? (
                        <>
                          <p
                            className="body-sm-regular"
                            style={{
                              fontSize: "13px",
                              color: "#334155",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              marginBottom: "4px",
                            }}
                          >
                            {content?.query}
                          </p>
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#reqModal-${index}`}
                            className="question-response"
                          >
                            View Requirement
                          </button>
                          <div
                            className="modal fade"
                            id={`reqModal-${index}`}
                            aria-labelledby={`reqModalLabel-${index}`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title heading-sm"
                                    id={`reqModalLabel-${index}`}
                                  >
                                    Recruiter Hiring Requirement
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="px-3 py-2 border-bottom">
                                  <p className="m-0 body-sm-semibold">
                                    {content?.name} {content?.companyName ? `(${content?.companyName})` : ""}
                                  </p>
                                  <p className="m-0 label-sm" style={{ color: "#64748b" }}>
                                    {content?.email} &middot; {content?.mobile}
                                  </p>
                                </div>
                                <div
                                  className="modal-body"
                                  style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", whiteSpace: "pre-wrap" }}
                                >
                                  {content?.query}
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{
                                      backgroundColor: "var(--primary-color-green)",
                                      borderRadius: "10px",
                                      border: "none",
                                      padding: "10px 40px",
                                    }}
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <i className="not-present" style={{ color: "#94a3b8" }}>
                          No specific message provided
                        </i>
                      )}
                    </div>

                    {/* Column 4: Date & Time Slot */}
                    <div className="table-item table-content table-content-4">
                      <p className="body-sm-regular">
                        {moment(content?.startDateTime).format("D[/]M[/]YYYY")}
                      </p>
                      <p className="body-sm-regular">
                        {moment(content?.startDateTime).format("h[:]mmA")} to{" "}
                        {moment(content?.endDateTime).format("h[:]mmA")}
                      </p>
                    </div>

                    {/* Column 5: Actions (Join Button) */}
                    <div className="table-item table-content table-content-5">
                      <button
                        disabled={!content?.eventData[0]?.meetLink}
                        className="join-btn body-sm-semibold"
                        onClick={() => window.open(content?.eventData[0]?.meetLink)}
                      >
                        Join
                      </button>
                    </div>

                    {/* Column 6: Booking Details */}
                    <div className="table-item table-content table-content-6">
                      <div>
                        <p className="label-sm">Purchased at</p>
                        <p className="body-sm-semibold">
                          {!!content?.paymentData[0]?.paymentDate ? (
                            moment(content?.paymentData[0]?.paymentDate).format(
                              "D[/]M[/]YY [at] h[:]mmA"
                            )
                          ) : !!content?.updatedAt ? (
                            moment(content?.updatedAt).format(
                              "D[/]M[/]YY [at] h[:]mmA"
                            )
                          ) : (
                            <i>--N/A--</i>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="label-sm">Total Amount</p>
                        <p className="body-sm-semibold">
                          {!!content?.paymentData[0]?.amount ? (
                            new Intl.NumberFormat("en-in", {
                              style: "currency",
                              currency: "INR",
                            }).format(content?.paymentData[0]?.amount / 100)
                          ) : content?.isPaymentPaid ? (
                            "Free"
                          ) : (
                            <i>Not Paid</i>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Column 7: Booking Status */}
                    <div className="table-item table-content table-content-7">
                      {new Date(content?.endDateTime).getTime() <
                        new Date().getTime() && (
                        <div
                          className="status"
                          style={{ backgroundColor: "#0FB800" }}
                        >
                          <IoMdCheckmark
                            style={{ color: "white", fontSize: "1.5rem" }}
                          />
                        </div>
                      )}
                      {new Date(content?.startDateTime).getTime() <
                        new Date().getTime() &&
                        new Date().getTime() <
                          new Date(content?.endDateTime).getTime() && (
                          <div
                            className="status"
                            style={{ backgroundColor: "blue" }}
                          >
                            <IoVideocam
                              style={{ color: "white", fontSize: "1.5rem" }}
                            />
                          </div>
                        )}
                      {new Date(content?.startDateTime).getTime() >
                        new Date().getTime() && (
                        <div
                          className="status"
                          style={{ backgroundColor: "#FFD600" }}
                        >
                          <IoIosInformationCircleOutline
                            style={{ color: "black", fontSize: "1.5rem" }}
                          />
                        </div>
                      )}
                    </div>
                  </Fragment>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
