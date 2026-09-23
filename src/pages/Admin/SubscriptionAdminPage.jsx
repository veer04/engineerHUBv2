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
import { IoCloseCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PAYMENT_API_URL } from "../../services/APIUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment/moment";
import PaginationBarWithSearchParams from "../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import Loading from "../../components/Loader/Loading";

export default function SubscriptionAdminPage() {
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

  const subscriptionQuery = useQuery({
    queryKey: [
      "admin",
      "subscriptions",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 30,
    ],
    queryFn: () =>
      axios
        .get(
          `${PAYMENT_API_URL}payment/admin/subscription-payment-records?page=${params.pageNo}&limit=${params.limit}`,
          config
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate("/admin/subscriptions?pageNo=1&limit=30");
    }
  }, [pageNo, limit, navigate]);

  useEffect(() => {
    if (subscriptionQuery.isSuccess) {
      const totalRecords = subscriptionQuery.data?.data?.data?.totalRecords || 1;
      const recordsLength = subscriptionQuery.data?.data?.data?.records?.length || 1;
      const currentLimit = limit ? Number(limit) : recordsLength;
      setPageCount(Math.ceil(totalRecords / currentLimit) || 1);
    }
  }, [subscriptionQuery, limit]);

  return (
    <div className="referral-admin-layout">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Subscriptions | Admin Panel</title>
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
            className="referral-sidebar-btn"
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
            className="referral-sidebar-btn active"
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
        <div className="referral-admin-page subscription-admin-page">
          <section>
            <div className="referral-table-title">
              <h1 className="body-lg-semibold">Check the latest subscriptions here</h1>
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
                  navigate(`/admin/subscriptions?pageNo=1&limit=${e.target.value}`);
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
              <div className="table-item table-headers body-sm-regular">Name</div>
              <div className="table-item table-headers body-sm-regular">Email</div>
              <div className="table-item table-headers body-sm-regular">Phone Number</div>
              <div className="table-item table-headers body-sm-regular">Plan</div>
              <div className="table-item table-headers body-sm-regular">Total AI Credits</div>
              <div className="table-item table-headers body-sm-regular">Amount & Date</div>
              <div className="table-item table-headers body-sm-regular">Renew Date & Status</div>

              {subscriptionQuery.isPending && (
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

              {subscriptionQuery.isSuccess &&
                subscriptionQuery.data?.data?.data?.records?.length === 0 && (
                  <div
                    style={{
                      padding: "3rem",
                      textAlign: "center",
                      gridColumn: "1/8",
                      color: "#64748b",
                      fontWeight: "600",
                    }}
                  >
                    No subscription purchases recorded yet.
                  </div>
                )}

              {subscriptionQuery.isSuccess &&
                subscriptionQuery.data?.data?.data?.records?.map((content, index) => (
                  <Fragment key={content._id || index}>
                    {/* Column 1: Name & Account Type */}
                    <div className="table-item table-content table-content-2">
                      <p className="body-sm-semibold">
                        {content?.name && content?.name !== "N/A" ? (
                          content?.name
                        ) : (
                          <i>No name provided</i>
                        )}
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
                          marginTop: "4px",
                        }}
                      >
                        {content?.ownerModel || "User"}
                      </span>
                    </div>

                    {/* Column 2: Email */}
                    <div className="table-item table-content body-sm-semibold">
                      {content?.email && content?.email !== "N/A" ? (
                        <span style={{ fontSize: "13px", color: "#334155" }}>
                          {content?.email}
                        </span>
                      ) : (
                        <i style={{ color: "#94a3b8" }}>No email provided</i>
                      )}
                    </div>

                    {/* Column 3: Phone Number */}
                    <div className="table-item table-content body-sm-semibold">
                      {content?.mobile && content?.mobile !== "N/A" ? (
                        content?.mobile
                      ) : (
                        <i style={{ color: "#94a3b8" }}>No phone provided</i>
                      )}
                    </div>

                    {/* Column 4: Plan */}
                    <div className="table-item table-content table-content-2">
                      <p
                        className="body-sm-semibold"
                        style={{
                          color: "#0b1c30",
                          textTransform: "capitalize",
                          fontSize: "14px",
                        }}
                      >
                        {content?.planId ? content?.planId : "Free"} Plan
                      </p>
                      <p className="label-sm" style={{ textTransform: "capitalize" }}>
                        {content?.billingCycle || "Monthly"} Cycle
                      </p>
                    </div>

                    {/* Column 5: Total AI Credits */}
                    <div className="table-item table-content body-sm-semibold">
                      <span
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#166534",
                          border: "1px solid #bbf7d0",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {content?.creditsAllocated
                          ? `${content?.creditsAllocated.toLocaleString("en-IN")} Credits`
                          : "0 Credits"}
                      </span>
                    </div>

                    {/* Column 6: Amount & Purchased Date */}
                    <div className="table-item table-content table-content-6">
                      <div>
                        <p className="label-sm">Amount</p>
                        <p className="body-sm-semibold">
                          {typeof content?.amount === "number" ? (
                            content.amount === 0 ? (
                              "Free"
                            ) : (
                              new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: content?.currency || "INR",
                              }).format(content.amount)
                            )
                          ) : (
                            <i>N/A</i>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="label-sm">Purchased at</p>
                        <p className="body-sm-semibold" style={{ fontSize: "12px" }}>
                          {content?.startDate ? (
                            moment(content?.startDate).format("D[/]M[/]YY [at] h[:]mmA")
                          ) : content?.createdAt ? (
                            moment(content?.createdAt).format("D[/]M[/]YY [at] h[:]mmA")
                          ) : (
                            <i>--N/A--</i>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Column 7: Renew Date & Status */}
                    <div className="table-item table-content table-content-6 table-content-7">
                      <div>
                        <p className="label-sm">Renew Date</p>
                        <p className="body-sm-semibold" style={{ fontSize: "12px" }}>
                          {content?.expiresAt ? (
                            moment(content?.expiresAt).format("D[/]M[/]YYYY")
                          ) : (
                            <i>--N/A--</i>
                          )}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "4px",
                        }}
                      >
                        {content?.status === "active" && (
                          <div
                            className="status"
                            style={{ backgroundColor: "#0FB800", width: "1.8rem", height: "1.8rem" }}
                            title="Active Subscription"
                          >
                            <IoMdCheckmark style={{ color: "white", fontSize: "1.1rem" }} />
                          </div>
                        )}
                        {content?.status === "pending" && (
                          <div
                            className="status"
                            style={{ backgroundColor: "#FFD600", width: "1.8rem", height: "1.8rem" }}
                            title="Pending Payment"
                          >
                            <IoIosInformationCircleOutline style={{ color: "black", fontSize: "1.1rem" }} />
                          </div>
                        )}
                        {(content?.status === "expired" || content?.status === "failed" || content?.status === "cancelled") && (
                          <div
                            className="status"
                            style={{ backgroundColor: "#94a3b8", width: "1.8rem", height: "1.8rem" }}
                            title={content?.status}
                          >
                            <IoCloseCircleOutline style={{ color: "white", fontSize: "1.1rem" }} />
                          </div>
                        )}
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "capitalize",
                            color:
                              content?.status === "active"
                                ? "#166534"
                                : content?.status === "pending"
                                ? "#854d0e"
                                : "#64748b",
                          }}
                        >
                          {content?.status || "Unknown"}
                        </span>
                      </div>
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
