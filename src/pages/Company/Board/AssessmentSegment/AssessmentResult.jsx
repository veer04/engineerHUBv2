import { useEffect, useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiSend,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/User/UserDetails";
import AssessmentResultRow from "./AssessmentResultRow";

const ATTEMPT_FILTER_OPTIONS = ["All", "Upcoming", "Attempting", "Evaluated", "Expired"];
const SCORE_FILTER_OPTIONS = [
  { value: "all", label: "All Scores" },
  { value: "high", label: "High (80+)" },
  { value: "medium", label: "Medium (60-79)" },
  { value: "low", label: "Low (<60)" },
  { value: "pending", label: "Pending Score" },
];

function formatPreviewDateTime(dateStr) {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return "the scheduled day and time";
  return parsed.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const PAGE_SIZE = 10;

const DEFAULT_STATS = {
  totalAssessmentsSent: 0,
  inProgress: 0,
  completed: 0,
  pendingMissed: 0,
};

export default function AssessmentResult() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [attemptFilter, setAttemptFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMailRow, setActiveMailRow] = useState(null);
  const [activeBlockRow, setActiveBlockRow] = useState(null);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailCc, setEmailCc] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmailStatus, setIsSendingEmailStatus] = useState(false);

  const {
    setSnackbarDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
  } = useGlobalSnackbar();

  useEffect(() => {
    if (activeMailRow) {
      const candidateName = activeMailRow.candidateName || "Candidate";
      const dateStr = activeMailRow.scheduledAt ? formatPreviewDateTime(activeMailRow.scheduledAt) : "the scheduled day and time";
      
      setEmailSubject(`Assessment Schedule Update - ${activeMailRow.assessmentName || "Assessment"}`);
      setEmailCc("");
      setEmailMessage(`Dear ${candidateName},\n\nYour assessment for ${activeMailRow.assessmentName || "the position"} is supposed to happen on ${dateStr}. Stay ready. Soon you will receive the assessment details.\n\nBest regards,\nHiring Team`);
    }
  }, [activeMailRow]);

  const handleSendCrmEmailForResult = async () => {
    if (!activeMailRow) return;
    try {
      setIsSendingEmailStatus(true);
      await axios.post(
        `${API_URL}api/v1/hiringDashboard/sendCrmEmail`,
        {
          hiringId: id,
          subject: emailSubject,
          text: emailMessage,
          registration_ids: [activeMailRow.candidateRegistrationId],
          senderEmail: emailCc,
        },
        config
      );
      
      setSnackbarMessage(`Email sent successfully to ${activeMailRow.candidateName}!`);
      setSnackbarSeverity("success");
      setSnackbarDuration(2500);
      setSnackbarOpen(true);
      setActiveMailRow(null);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to send email."
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    } finally {
      setIsSendingEmailStatus(false);
    }
  };

  const config = useMemo(
    () => ({
      headers: {
        accesstoken: getAccessToken(),
      },
    }),
    []
  );

  const resultStatsQuery = useQuery({
    queryKey: ["assessment-result-stats", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/assessment-results/stats?hiringId=${id}`,
        config
      );
      return response?.data?.data || DEFAULT_STATS;
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });

  const resultRowsQuery = useQuery({
    queryKey: [
      "assessment-results",
      id,
      currentPage,
      searchTerm,
      attemptFilter,
      scoreFilter,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        hiringId: id,
        page: String(currentPage),
        limit: String(PAGE_SIZE),
        attemptStatus: attemptFilter,
        scoreFilter,
      });
      if (searchTerm.trim()) {
        params.set("text", searchTerm.trim());
      }

      const response = await axios.get(
        `${API_URL}api/v1/assessment-results?${params.toString()}`,
        config
      );
      return response?.data?.data || {};
    },
    enabled: !!id,
    staleTime: 1000 * 30,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, attemptFilter, scoreFilter]);

  const rows = Array.isArray(resultRowsQuery?.data?.rows)
    ? resultRowsQuery.data.rows
    : [];
  const pagination = resultRowsQuery?.data?.pagination || {
    currentPage,
    totalPages: 1,
    itemsPerPage: PAGE_SIZE,
    totalItems: 0,
  };

  const totalPages = Math.max(1, Number(pagination.totalPages || 1));
  const totalItems = Number(pagination.totalItems || 0);
  const currentPageFromApi = Number(pagination.currentPage || currentPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showingStart = totalItems === 0 ? 0 : (currentPageFromApi - 1) * PAGE_SIZE + 1;
  const showingEnd = totalItems === 0 ? 0 : Math.min(currentPageFromApi * PAGE_SIZE, totalItems);

  const visiblePages = useMemo(() => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageFromApi - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    return Array.from(
      { length: Math.max(0, endPage - startPage + 1) },
      (_, index) => startPage + index
    );
  }, [currentPageFromApi, totalPages]);

  const summaryStats = useMemo(() => {
    const statData = resultStatsQuery?.data || DEFAULT_STATS;

    return [
      {
        id: "sent",
        icon: FiSend,
        label: "Total Assessments Sent",
        value: String(statData.totalAssessmentsSent || 0),
        trendTone: "positive",
      },
      {
        id: "in-progress",
        icon: FiTrendingUp,
        label: "In Progress",
        value: String(statData.inProgress || 0),
        trendTone: "info",
      },
      {
        id: "completed",
        icon: FiCheckCircle,
        label: "Completed",
        value: String(statData.completed || 0),
        trendTone: "positive",
      },
      {
        id: "pending",
        icon: FiXCircle,
        label: "Pending / Missed",
        value: String(statData.pendingMissed || 0),
        trendTone: "danger",
      },
    ];
  }, [resultStatsQuery?.data]);

  const notify = (message, severity = "info", duration = 2500) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarDuration(duration);
    setSnackbarOpen(true);
  };

  const refreshResultQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["assessment-results", id] });
    queryClient.invalidateQueries({ queryKey: ["assessment-result-stats", id] });
    queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
    queryClient.invalidateQueries({ queryKey: ["Jobs", "board"] });
    queryClient.invalidateQueries({ queryKey: ["Interview", "lobby"] });
    queryClient.invalidateQueries({ queryKey: ["interview-segment-counts"] });
  };

  const handleMonitor = async (row) => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/assessment-results/${row.id}/monitor`,
        {
          hiringId: id,
        },
        config
      );
      notify(
        response?.data?.message || `Monitoring activity for ${row.candidateName}.`,
        "info"
      );
      refreshResultQueries();
    } catch (error) {
      notify(
        error?.response?.data?.message ||
          `Unable to monitor ${row.candidateName} right now.`,
        "error"
      );
    }
  };

  const handleSendMail = async (row) => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/assessment-results/${row.id}/send-mail`,
        {
          hiringId: id,
        },
        config
      );
      notify(
        response?.data?.message || `Mail action opened for ${row.candidateName}.`,
        "success"
      );
      refreshResultQueries();
    } catch (error) {
      notify(
        error?.response?.data?.message ||
          `Unable to send mail to ${row.candidateName}.`,
        "error"
      );
    }
  };

  const handleMarkInterview = async (row) => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/assessment-results/${row.id}/interview`,
        {
          hiringId: id,
        },
        config
      );
      notify(
        response?.data?.message || `${row.candidateName} moved to interview round.`,
        "success"
      );
      refreshResultQueries();
    } catch (error) {
      notify(
        error?.response?.data?.message ||
          `Failed to move ${row.candidateName} to interview round.`,
        "error"
      );
    }
  };

  const handleBlockCandidate = async (row) => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/assessment-results/${row.id}/block`,
        {
          hiringId: id,
          reason: "Blocked from assessment result panel",
        },
        config
      );
      notify(
        response?.data?.message || `${row.candidateName} blocked from this process.`,
        "warning"
      );
      refreshResultQueries();
    } catch (error) {
      notify(
        error?.response?.data?.message ||
          `Failed to block ${row.candidateName}.`,
        "error"
      );
    }
  };

  return (
    <section className="assessment-result-view">
      <section className="assessment-result-stats-grid">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.id}
              className={`assessment-result-stat-card --${stat.id}`}
            >
              <div className="assessment-result-stat-head">
                <span className="icon-wrap">
                  <Icon />
                </span>
                <span className={`trend-badge --${stat.trendTone}`}>{stat.value}</span>
              </div>
              <p className="label">{stat.label}</p>
              <h3>{stat.value}</h3>
            </article>
          );
        })}
      </section>

      <section className="assessment-result-table-card">
        <div className="assessment-result-table-head">
          <div>
            <h2>Live Candidate Assessment Status</h2>
          </div>
          <div className="assessment-result-controls">
            <input
              type="text"
              placeholder="Search candidate, email, skills..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select
              value={attemptFilter}
              onChange={(event) => setAttemptFilter(event.target.value)}
            >
              {ATTEMPT_FILTER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={scoreFilter}
              onChange={(event) => setScoreFilter(event.target.value)}
            >
              {SCORE_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              title="Open advanced filters"
              onClick={() =>
                notify("Advanced result filters will be connected in upcoming iteration.")
              }
            >
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="assessment-result-table-wrap">
          <table className="assessment-result-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Assessment</th>
                <th>Attempt Status</th>
                <th>Live Activity</th>
                <th>Phone Number</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resultRowsQuery.isLoading ? (
                <tr>
                  <td colSpan={7} className="assessment-result-empty-state">
                    Loading assessment results...
                  </td>
                </tr>
              ) : resultRowsQuery.isError ? (
                <tr>
                  <td colSpan={7} className="assessment-result-empty-state">
                    Failed to fetch assessment results. Please refresh.
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="assessment-result-empty-state">
                    No assessment result data found for selected filters.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <AssessmentResultRow
                    key={row.id}
                    row={row}
                    onMonitor={handleMonitor}
                    onSendMail={(r) => setActiveMailRow(r)}
                    onMarkInterview={handleMarkInterview}
                    onBlockCandidate={(r) => setActiveBlockRow(r)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="assessment-result-pagination">
          <p>
            Showing {showingStart}-{showingEnd} of {totalItems} active candidates
          </p>
          <div className="page-controls">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPageFromApi === 1}
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>

            {visiblePages.map((page) => (
              <button
                type="button"
                key={page}
                className={page === currentPageFromApi ? "--active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPageFromApi === totalPages}
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      {/* Email Preview Modal */}
      {activeMailRow && (
        <div className="assessment-modal-overlay">
          <div className="assessment-modal-card" style={{ maxWidth: "650px" }}>
            <div className="assessment-modal-header">
              <h3>Send Email to {activeMailRow.candidateName || "Candidate"}</h3>
              <button 
                type="button" 
                className="assessment-modal-close-btn"
                onClick={() => setActiveMailRow(null)}
              >
                ✕
              </button>
            </div>
            <div className="assessment-modal-body">
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Email Subject</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject"
                    style={{ 
                      padding: "0.5rem", 
                      fontSize: "0.875rem", 
                      border: "1px solid #cbd5e1", 
                      borderRadius: "0.375rem",
                      width: "100%"
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Additional CC</label>
                  <input 
                    type="text" 
                    value={emailCc}
                    onChange={(e) => setEmailCc(e.target.value)}
                    placeholder="e.g. hr@company.com"
                    style={{ 
                      padding: "0.5rem", 
                      fontSize: "0.875rem", 
                      border: "1px solid #cbd5e1", 
                      borderRadius: "0.375rem",
                      width: "100%"
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Email Message</label>
                <textarea 
                  rows={8}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  style={{ 
                    padding: "0.75rem", 
                    fontSize: "0.875rem", 
                    border: "1px solid #cbd5e1", 
                    borderRadius: "0.375rem",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                    width: "100%",
                    resize: "vertical"
                  }}
                />
              </div>
            </div>
            <div className="assessment-modal-footer">
              <button 
                type="button" 
                className="assessment-modal-btn --secondary"
                onClick={() => setActiveMailRow(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="assessment-modal-btn --primary"
                disabled={isSendingEmailStatus}
                onClick={handleSendCrmEmailForResult}
              >
                {isSendingEmailStatus ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Candidate Confirmation Modal */}
      {activeBlockRow && (
        <div className="assessment-modal-overlay">
          <div className="assessment-modal-card">
            <div className="assessment-modal-header">
              <h3>Block Candidate</h3>
              <button 
                type="button" 
                className="assessment-modal-close-btn"
                onClick={() => setActiveBlockRow(null)}
              >
                ✕
              </button>
            </div>
            <div className="assessment-modal-body">
              <p>
                Are you sure you want to block <strong>{activeBlockRow.candidateName}</strong>?
              </p>
              <p>
                This will reject the candidate, cancel any active invitations/attempts, and remove them from the pipeline.
              </p>
            </div>
            <div className="assessment-modal-footer">
              <button 
                type="button" 
                className="assessment-modal-btn --secondary"
                onClick={() => setActiveBlockRow(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="assessment-modal-btn --danger"
                onClick={() => {
                  handleBlockCandidate(activeBlockRow);
                  setActiveBlockRow(null);
                }}
              >
                Block Candidate
              </button>
            </div>
          </div>
        </div>
      )}
      </section>
    </section>
  );
}
