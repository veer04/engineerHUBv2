import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiCpu,
  FiDownload,
  FiLock,
  FiSave,
  FiSearch,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { API_URL } from "../../../services/APIUtils";
import "./CandidateAssessmentSubmitted.css";

function formatSubmissionTime(dateValue) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "TBD";
  return parsed.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatSubmissionDate(dateValue) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "TBD";
  return parsed.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getTimelineIcon(step) {
  if (step.id === "submitted") return FiCheck;
  if (step.id === "ai-review") return FiClock;
  if (step.id === "recruiter-review") return FiSearch;
  return FiCalendar;
}

function getActiveStepIndex(timelineSteps) {
  const foundIndex = timelineSteps.findIndex((step) => step.state === "active");
  return foundIndex >= 0 ? foundIndex : 0;
}

export default function CandidateAssessmentSubmitted() {
  const navigate = useNavigate();
  const location = useLocation();
  const { inviteToken } = useParams();

  const {
    setSnackbarDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
  } = useGlobalSnackbar();

  const initialSubmissionSummary = location.state?.submissionSummary || null;
  const submissionQuery = useQuery({
    queryKey: ["candidate-assessment-submission", inviteToken],
    enabled: Boolean(inviteToken) && !initialSubmissionSummary,
    retry: 1,
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/candidate-assessment/${inviteToken}/submission`
      );
      return response.data;
    },
  });

  const submissionData = useMemo(() => {
    if (initialSubmissionSummary) return initialSubmissionSummary;
    return submissionQuery.data?.data?.submissionSummary || null;
  }, [initialSubmissionSummary, submissionQuery.data]);

  const timelineSteps = submissionData?.timelineSteps || [];
  const activeStepIndex = getActiveStepIndex(timelineSteps);
  const submissionTimeLabel = formatSubmissionTime(submissionData?.submittedAtIso);
  const submissionDateLabel = formatSubmissionDate(submissionData?.submittedAtIso);

  const notify = (message, severity = "info", duration = 2600) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarDuration(duration);
    setSnackbarOpen(true);
  };

  const handleCloseWindow = () => {
    notify("You may safely close this window.", "success", 2200);
    window.setTimeout(() => {
      navigate("/");
    }, 350);
  };

  const handleDownloadReceipt = () => {
    if (!submissionData) {
      notify("Submission summary is not available yet.", "warning");
      return;
    }

    const receiptText = [
      "engineerHUB Assessment Submission Receipt",
      "----------------------------------------",
      `Submission ID: ${submissionData.submissionId}`,
      `Candidate: ${submissionData.candidateName}`,
      `Assessment: ${submissionData.assessmentTitle}`,
      `Company: ${submissionData.companyName}`,
      `Submission Time: ${submissionTimeLabel} (${submissionDateLabel})`,
      `Questions Attempted: ${submissionData.attemptedQuestions}/${submissionData.totalQuestions}`,
      `Duration Used: ${submissionData.durationUsedMinutes} mins`,
      `Status: ${submissionData.status}`,
    ].join("\n");

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `${submissionData.submissionId}-receipt.txt`;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);
    notify("Submission receipt downloaded.", "success", 2000);
  };

  const handleSupportClick = () => {
    notify("Support flow will be connected in upcoming iteration.");
  };

  if (submissionQuery.isError && !submissionData) {
    return (
      <div className="candidate-assessment-submitted-page">
        <main className="candidate-submitted-main">
          <article className="candidate-submitted-card">
            <section className="candidate-submitted-header">
              <h1>Unable to load submission summary</h1>
              <p>
                {submissionQuery.error?.response?.data?.message ||
                  "The submission details could not be fetched right now."}
              </p>
            </section>
          </article>
        </main>
      </div>
    );
  }

  if (submissionQuery.isLoading && !submissionData) {
    return (
      <div className="candidate-assessment-submitted-page">
        <main className="candidate-submitted-main">
          <article className="candidate-submitted-card">
            <section className="candidate-submitted-header">
              <h1>Loading submission summary...</h1>
              <p>Please wait while we fetch your assessment submission details.</p>
            </section>
          </article>
        </main>
      </div>
    );
  }

  if (!submissionData) {
    return (
      <div className="candidate-assessment-submitted-page">
        <main className="candidate-submitted-main">
          <article className="candidate-submitted-card">
            <section className="candidate-submitted-header">
              <h1>Submission not available</h1>
              <p>Your assessment has not been submitted yet.</p>
            </section>
          </article>
        </main>
      </div>
    );
  }

  const summaryItems = [
    { label: "Candidate", value: submissionData.candidateName },
    { label: "Assessment", value: submissionData.assessmentTitle },
    { label: "Company", value: submissionData.companyName },
    { label: "Submission Time", value: `${submissionTimeLabel}` },
    {
      label: "Questions Attempted",
      value: `${submissionData.attemptedQuestions} / ${submissionData.totalQuestions}`,
    },
    { label: "Duration Used", value: `${submissionData.durationUsedMinutes} mins` },
  ];

  return (
    <div className="candidate-assessment-submitted-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{`Assessment Submitted | ${submissionData.companyName}`}</title>
      </Helmet>

      <main className="candidate-submitted-main">
        <article className="candidate-submitted-card">
          <section className="candidate-submitted-header">
            <div className="candidate-submitted-icon-wrap">
              <FiCheck />
            </div>
            <h1>Assessment Submitted Successfully</h1>
            <p>Your responses have been securely recorded and submitted to the recruiter.</p>
          </section>

          <section className="candidate-submitted-content">
            <div className="candidate-submitted-summary-card">
              <h2>Submission Summary</h2>
              <div className="candidate-submitted-summary-list">
                {summaryItems.map((item) => (
                  <div key={item.label} className="summary-row">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
                <div className="summary-row status-row">
                  <span>Status</span>
                  <strong>
                    <FiCheck />
                    {submissionData.status}
                  </strong>
                </div>
              </div>
            </div>

            <div className="candidate-submitted-ai-card">
              <FiCpu />
              <div>
                <h3>{submissionData.evaluationStatus}</h3>
                <p>{submissionData.evaluationDescription}</p>
              </div>
            </div>

            <div className="candidate-submitted-timeline">
              {timelineSteps.map((step, index) => {
                const StepIcon = getTimelineIcon(step);
                return (
                  <div key={step.id} className="timeline-step-wrap">
                    <div className="timeline-step">
                      <div className={`timeline-node is-${step.state}`}>
                        <StepIcon />
                      </div>
                      <p>{step.label}</p>
                    </div>
                    {index < timelineSteps.length - 1 ? (
                      <div
                        className={
                          index < activeStepIndex ? "timeline-line is-active" : "timeline-line"
                        }
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="candidate-submitted-actions">
              <button type="button" className="close-btn" onClick={handleCloseWindow}>
                Close Window
              </button>
              <button type="button" className="receipt-btn" onClick={handleDownloadReceipt}>
                <FiDownload />
                Download Submission Receipt
              </button>
            </div>

            <div className="candidate-submitted-footnote">
              <span>
                <FiSave />
                Responses auto-saved
              </span>
              <strong>{`Submission ID: ${submissionData.submissionId}`}</strong>
              <span>
                <FiLock />
                Assessment locked
              </span>
            </div>
          </section>
        </article>
      </main>

      <footer className="candidate-submitted-footer">
        <div className="candidate-submitted-footer-inner">
          <h4>engineerHUB</h4>
          <p>© 2024 TechAssess Enterprise. All rights reserved.</p>
          <div className="candidate-submitted-footer-links">
            <Link to="/terms-and-conditions">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms of Service</Link>
            <button type="button" onClick={handleSupportClick}>
              Security
            </button>
            <button type="button" onClick={handleSupportClick}>
              Contact Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
