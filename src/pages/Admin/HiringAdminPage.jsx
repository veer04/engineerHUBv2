import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  FiArrowLeft,
  FiBriefcase,
  FiAward,
  FiEye,
  FiSearch,
  FiExternalLink,
  FiUserCheck,
  FiUserX,
  FiRotateCcw,
} from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { API_URL } from "../../services/APIUtils";
import {
  getAccessToken,
  getUserEmail,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import Loading from "../../components/Loader/Loading";
import PaginationBarWithSearchParams from "../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import "./ReferralAdminPage.css";
import "./HiringAdminPage.css";

export default function HiringAdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();

  // State for active segment: "Jobs" | "Internships"
  const [activeSegment, setActiveSegment] = useState("Jobs");
  const [searchTerm, setSearchTerm] = useState("");

  // Selected job state for candidate responses view
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidateStatus, setCandidateStatus] = useState("Response"); // "Response" | "Shortlisted" | "Rejected" | ""
  const [updatingApplicantId, setUpdatingApplicantId] = useState(null);

  const allowedEmailIds = [
    "rishabhs883@gmail.com",
    "career@engineerhub.in",
  ];
  const userEmail = getUserEmail() ? getUserEmail().toLowerCase() : "";
  const isAuthorized = isUserLoggedIn() && allowedEmailIds.includes(userEmail);

  const pageNo = searchParams.get("pageNo") || "1";
  const limit = searchParams.get("limit") || "30";

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  useEffect(() => {
    if (!searchParams.get("pageNo") || !searchParams.get("limit")) {
      setSearchParams(
        (prev) => {
          prev.set("pageNo", "1");
          prev.set("limit", "30");
          return prev;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  // Fetch easy apply jobs / internships across platform
  const opportunityTypeParam = activeSegment === "Jobs" ? "Job" : "Internship";

  const hiringsQuery = useQuery({
    queryKey: [
      "adminHirings",
      opportunityTypeParam,
      pageNo,
      limit,
      searchTerm,
    ],
    queryFn: () =>
      axios
        .get(`${API_URL}api/v1/getHiringByOpportunityType/`, {
          params: {
            opportunityType: opportunityTypeParam,
            isEasyApply: 1,
            pageNo: pageNo,
            limit: limit,
            search: searchTerm || undefined,
          },
          headers: {
            accessToken: getAccessToken(),
          },
        })
        .then((res) => res?.data),
    staleTime: 1000 * 60 * 2,
    enabled: isAuthorized && !selectedJob,
  });

  // Calculate page count for Hirings list
  const totalHirings =
    hiringsQuery.data?.pageSize ||
    hiringsQuery.data?.totalRecords ||
    hiringsQuery.data?.data?.length ||
    0;
  const hiringsPageCount = Math.max(
    1,
    Math.ceil(totalHirings / Number(limit))
  );

  // Filter list to keep only Easy Apply (no applyLink)
  const rawHiringsList = hiringsQuery.data?.data || [];
  const easyApplyHirings = rawHiringsList.filter((item) => !item.applyLink);

  // Detail query for selected job metadata
  const selectedJobDetailQuery = useQuery({
    queryKey: ["JobDetailAdmin", selectedJob?._id],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/hiringDashboard/hiringDetails/${selectedJob._id}`,
          config
        )
        .then((res) => res?.data?.data),
    enabled: isAuthorized && !!selectedJob?._id,
  });

  // Applicants count for selected job
  const applicantsCountQuery = useQuery({
    queryKey: ["ApplicantsCountAdmin", selectedJob?._id],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/hiringDashboard/getApplicantsStatus/?hiringId=${selectedJob._id}`,
          config
        )
        .then((res) => res?.data?.data),
    enabled: isAuthorized && !!selectedJob?._id,
  });

  // Applicants list query for selected job
  const candidatesQuery = useQuery({
    queryKey: [
      "CandidatesAdmin",
      selectedJob?._id,
      pageNo,
      limit,
      candidateStatus,
    ],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/hiringDashboard/applicant?page=${pageNo}&limit=${limit}&hiringId=${
            selectedJob._id
          }${candidateStatus ? `&status=${candidateStatus}` : ""}`,
          config
        )
        .then((res) => res?.data),
    enabled: isAuthorized && !!selectedJob?._id,
    staleTime: 1000 * 30,
  });

  const candidatesList =
    candidatesQuery.data?.data?.applicants ||
    candidatesQuery.data?.data?.data ||
    [];
  const totalCandidates =
    candidatesQuery.data?.data?.totalApplicants ||
    candidatesQuery.data?.data?.totalRecords ||
    0;
  const candidatesPageCount = Math.max(
    1,
    Math.ceil(totalCandidates / Number(limit))
  );

  // Update applicant status (Shortlist / Reject / Response)
  const handleUpdateStatus = (registrationId, newStatus) => {
    if (!selectedJob?._id) return;
    setUpdatingApplicantId(registrationId);
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: selectedJob._id,
          data: [{ registrationId, status: newStatus }],
        },
        config
      )
      .then(() => {
        setSnackbarMessage(`Candidate status updated to ${newStatus}`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        queryClient.invalidateQueries({
          queryKey: ["CandidatesAdmin", selectedJob._id],
        });
        queryClient.invalidateQueries({
          queryKey: ["ApplicantsCountAdmin", selectedJob._id],
        });
      })
      .catch((err) => {
        setSnackbarMessage(
          err?.response?.data?.message || "Failed to update candidate status"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setUpdatingApplicantId(null);
      });
  };

  const handleOpenCandidates = (job) => {
    setSelectedJob(job);
    setCandidateStatus("Response");
    setSearchParams(
      (prev) => {
        prev.set("pageNo", "1");
        prev.set("limit", "30");
        return prev;
      },
      { replace: true }
    );
  };

  const handleBackToHirings = () => {
    setSelectedJob(null);
    setSearchParams(
      (prev) => {
        prev.set("pageNo", "1");
        prev.set("limit", "30");
        return prev;
      },
      { replace: true }
    );
  };

  const rawStatusCounts = Array.isArray(applicantsCountQuery.data)
    ? applicantsCountQuery.data
    : [];
  const statusCounts = rawStatusCounts.reduce((acc, item) => {
    if (item?.status) {
      acc[item.status] = item.count || 0;
    }
    return acc;
  }, {});

  if (!isAuthorized) {
    return <Page404 />;
  }

  return (
    <div className="referral-admin-layout">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Hirings | Admin Panel</title>
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
            className="referral-sidebar-btn active"
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
        <div className="hiring-admin-page">
          <section>
            {!selectedJob ? (
              /* --- HIRINGS LIST VIEW --- */
              <>
                <div className="hiring-admin-header">
                  <div className="hiring-admin-title-row">
                    <div>
                      <h1 className="body-lg-semibold">
                        Check platform hirings & responses
                      </h1>
                    </div>

                    <div className="search-input-wrapper">
                      <FiSearch />
                      <input
                        type="text"
                        placeholder="Search positions or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Segment Tabs: Jobs | Internships */}
                  <div className="hiring-segments-tabs">
                    <button
                      className={`hiring-segment-btn ${
                        activeSegment === "Jobs" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveSegment("Jobs");
                        setSearchParams(
                          (prev) => {
                            prev.set("pageNo", "1");
                            return prev;
                          },
                          { replace: true }
                        );
                      }}
                    >
                      <FiBriefcase style={{ marginRight: "6px" }} />
                      Jobs
                    </button>
                    <button
                      className={`hiring-segment-btn ${
                        activeSegment === "Internships" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveSegment("Internships");
                        setSearchParams(
                          (prev) => {
                            prev.set("pageNo", "1");
                            return prev;
                          },
                          { replace: true }
                        );
                      }}
                    >
                      <FiAward style={{ marginRight: "6px" }} />
                      Internships
                    </button>
                  </div>
                </div>

                {/* Loading state */}
                {hiringsQuery.isLoading && <Loading />}

                {/* Hirings Grid */}
                {!hiringsQuery.isLoading && easyApplyHirings.length > 0 && (
                  <>
                    <div className="hiring-cards-grid">
                      {easyApplyHirings.map((job) => (
                        <div key={job._id} className="hiring-card">
                          <div>
                            <div className="hiring-card-top">
                              <p className="hiring-card-org">
                                {job.organisationName ||
                                  job.organizationName ||
                                  "Company"}
                              </p>
                            </div>

                            {job.organisationLogo && (
                              <img
                                src={job.organisationLogo}
                                alt={job.organisationName || "Logo"}
                                className="hiring-card-logo"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            )}

                            <h3 className="hiring-card-title">
                              {job.opportunityName}
                            </h3>

                            <div className="hiring-card-details">
                              <div className="hiring-card-detail-item">
                                <span>📍</span>
                                <span>
                                  {job.city ? `${job.city} ` : ""}
                                  ({job.opportunityLocation || "On-Site"})
                                </span>
                              </div>
                              <div className="hiring-card-detail-item">
                                <span>💰</span>
                                <span>
                                  {job.showSalary
                                    ? job.salaryDisclosure || "Disclosed"
                                    : "Salary Not Disclosed"}
                                </span>
                              </div>
                              <div className="hiring-card-detail-item">
                                <span>💼</span>
                                <span>
                                  {job.isForFreshers
                                    ? "Fresher"
                                    : `${job.minExperience || 0}-${
                                        job.maxExperience || 2
                                      } Years`}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="hiring-card-divider"></div>
                            <div className="hiring-card-footer">
                              <button
                                className="btn-view-candidates-admin"
                                onClick={() => handleOpenCandidates(job)}
                              >
                                <FiEye /> View Candidates
                              </button>
                              <div className="hiring-card-views">
                                <FaRegEye />
                                <span>{job.views || 0}</span>
                              </div>
                              <span className="hiring-card-apps-count">
                                {job.totalAppliedUsers || 0} Applications
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: "2rem" }}>
                      <PaginationBarWithSearchParams
                        pageCount={hiringsPageCount}
                      />
                    </div>
                  </>
                )}

                {/* Empty State */}
                {!hiringsQuery.isLoading && easyApplyHirings.length === 0 && (
                  <div className="empty-state-container">
                    <FiBriefcase />
                    <h3>No Easy Apply {activeSegment} Found</h3>
                    <p>
                      There are no active easy apply {activeSegment.toLowerCase()}{" "}
                      matching your parameters at the moment.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* --- CANDIDATE RESPONSES VIEW FOR SELECTED JOB --- */
              <div className="admin-response-view">
                <button
                  className="btn-back-to-hirings"
                  onClick={handleBackToHirings}
                >
                  <FiArrowLeft /> Back to {activeSegment}
                </button>

                <div className="admin-response-header">
                  <div className="admin-job-info-summary">
                    <div>
                      <h2>{selectedJob.opportunityName}</h2>
                      <p>
                        {selectedJob.organisationName ||
                          selectedJob.organizationName ||
                          "Organization"}{" "}
                        • {selectedJob.city || "Location"} (
                        {selectedJob.opportunityLocation || "On-Site"})
                      </p>
                    </div>

                    <span
                      className={`response-status-badge ${
                        selectedJobDetailQuery.data?.isServiceOff === true
                          ? "closed"
                          : "accepting"
                      }`}
                    >
                      {selectedJobDetailQuery.data?.isServiceOff === true
                        ? "Responses Closed"
                        : "Accepting Responses"}
                    </span>
                  </div>

                  {/* Status filter tabs */}
                  <div className="response-filter-tabs">
                    {[
                      { key: "Response", label: "Responses" },
                      { key: "Shortlisted", label: "Shortlisted" },
                      { key: "Rejected", label: "Rejected" },
                      { key: "", label: "All Candidates" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        className={`response-filter-tab ${
                          candidateStatus === tab.key ? "active" : ""
                        }`}
                        onClick={() => {
                          setCandidateStatus(tab.key);
                          setSearchParams(
                            (prev) => {
                              prev.set("pageNo", "1");
                              return prev;
                            },
                            { replace: true }
                          );
                        }}
                      >
                        {tab.label}
                        {tab.key !== "" && (
                          <span className="badge-count">
                            {statusCounts[tab.key] || 0}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Candidate Table Section */}
                {candidatesQuery.isLoading && <Loading />}

                {!candidatesQuery.isLoading && candidatesList.length > 0 && (
                  <>
                    <div className="admin-candidates-table-container">
                      <table className="admin-candidates-table">
                        <thead>
                          <tr>
                            <th>Candidate Name</th>
                            <th>Skills</th>
                            <th>College / University</th>
                            <th>Batch</th>
                            <th>Experience</th>
                            <th>Resume</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidatesList.map((candidate) => {
                            const fullName = `${candidate.firstName || ""}${
                              candidate.lastName ? ` ${candidate.lastName}` : ""
                            }`.trim();
                            const isUpdatingThis =
                              updatingApplicantId === candidate._id;

                            return (
                              <tr key={candidate._id}>
                                <td className="candidate-name-cell">
                                  {fullName || "N/A"}
                                </td>
                                <td
                                  className="skills-cell"
                                  title={candidate.skills || ""}
                                >
                                  {candidate.skills || "-"}
                                </td>
                                <td>{candidate.college || "-"}</td>
                                <td>{candidate.batch || "-"}</td>
                                <td>
                                  {candidate.experience > 0
                                    ? candidate.experience === 1
                                      ? "1 year"
                                      : `${candidate.experience} years`
                                    : "Fresher / 0"}
                                </td>
                                <td>
                                  {candidate.resumeUrl ? (
                                    <a
                                      href={candidate.resumeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="resume-view-link"
                                    >
                                      View <FiExternalLink />
                                    </a>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`applicant-status-tag ${
                                      candidate.status || "Response"
                                    }`}
                                  >
                                    {candidate.status || "Response"}
                                  </span>
                                </td>
                                <td>
                                  {isUpdatingThis ? (
                                    <span style={{ fontSize: "0.8rem", color: "#138382" }}>
                                      Updating...
                                    </span>
                                  ) : (
                                    <div className="applicant-action-btns">
                                      {candidate.status !== "Shortlisted" && (
                                        <button
                                          className="action-icon-btn-small shortlist"
                                          title="Shortlist Candidate"
                                          onClick={() =>
                                            handleUpdateStatus(
                                              candidate._id,
                                              "Shortlisted"
                                            )
                                          }
                                        >
                                          <FiUserCheck />
                                        </button>
                                      )}
                                      {candidate.status !== "Rejected" && (
                                        <button
                                          className="action-icon-btn-small reject"
                                          title="Reject Candidate"
                                          onClick={() =>
                                            handleUpdateStatus(
                                              candidate._id,
                                              "Rejected"
                                            )
                                          }
                                        >
                                          <FiUserX />
                                        </button>
                                      )}
                                      {candidate.status !== "Response" && (
                                        <button
                                          className="action-icon-btn-small"
                                          title="Reset to Response"
                                          onClick={() =>
                                            handleUpdateStatus(
                                              candidate._id,
                                              "Response"
                                            )
                                          }
                                        >
                                          <FiRotateCcw />
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginTop: "1.5rem" }}>
                      <PaginationBarWithSearchParams
                        pageCount={candidatesPageCount}
                      />
                    </div>
                  </>
                )}

                {!candidatesQuery.isLoading && candidatesList.length === 0 && (
                  <div className="empty-state-container">
                    <FiBriefcase />
                    <h3>No Candidate Applications Found</h3>
                    <p>
                      There are no candidate applications under "{candidateStatus || "All"}"{" "}
                      for this position.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
