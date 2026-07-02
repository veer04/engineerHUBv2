import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCpu,
  FiEye,
  FiHelpCircle,
  FiInfo,
  FiMonitor,
  FiPlay,
  FiTrendingUp,
  FiUpload,
  FiWifi,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { API_URL } from "../../../services/APIUtils";
import "./CandidateAssessmentEntry.css";

function getInitials(name) {
  const words = String(name || "")
    .trim()
    .split(" ")
    .filter(Boolean);

  if (words.length === 0) return "NA";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function formatCountdown(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((item) => String(item).padStart(2, "0"))
    .join(":");
}

function formatDateTime(dateValue) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "TBD";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const INSTRUCTION_ICON_MAP = {
  clock: FiClock,
  upload: FiUpload,
  wifi: FiWifi,
  eye: FiEye,
};

const SYSTEM_ICON_MAP = {
  monitor: FiMonitor,
  wifi: FiWifi,
  cpu: FiCpu,
};

export default function CandidateAssessmentEntry() {
  const navigate = useNavigate();
  const { inviteToken } = useParams();
  const [searchParams] = useSearchParams();
  const startAtOverride = searchParams.get("startAt");
  const [entryProgress, setEntryProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isStartingAssessment, setIsStartingAssessment] = useState(false);

  const {
    setSnackbarDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
  } = useGlobalSnackbar();

  const entryQuery = useQuery({
    queryKey: ["candidate-assessment-entry", inviteToken],
    enabled: Boolean(inviteToken),
    retry: 1,
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/candidate-assessment/${inviteToken}/entry`
      );
      return response.data;
    },
  });

  const inviteData = entryQuery.data?.data;

  const startAtMs = useMemo(() => {
    const parsed = new Date(inviteData?.startsAt).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }, [inviteData?.startsAt]);

  const millisecondsUntilStart = Math.max(0, startAtMs - currentTime);
  const isLive = millisecondsUntilStart === 0;
  const canStartAssessment = Boolean(
    isLive && !inviteData?.isSubmitted && !inviteData?.isCancelled
  );

  const statCards = useMemo(
    () => [
      {
        id: "duration",
        label: "Duration",
        value: `${inviteData?.durationMinutes || 0} Minutes`,
        Icon: FiClock,
      },
      {
        id: "questions",
        label: "Total Questions",
        value: `${inviteData?.totalQuestions || 0} Questions`,
        Icon: FiHelpCircle,
      },
      {
        id: "difficulty",
        label: "Difficulty",
        value: inviteData?.difficultyLabel || "TBD",
        Icon: FiTrendingUp,
      },
      {
        id: "focus",
        label: "Focus Areas",
        value: inviteData?.focusAreasLabel || "TBD",
        Icon: FiCode,
      },
    ],
    [inviteData]
  );

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setEntryProgress(100);
    }, 120);

    return () => clearTimeout(progressTimer);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const notify = (message, severity = "info", duration = 2800) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarDuration(duration);
    setSnackbarOpen(true);
  };

  const handleSupportClick = () => {
    notify("Candidate support flow will be connected in next iteration.");
  };

  const handleStartAssessment = () => {
    if (!termsAccepted) {
      notify("Please accept the instructions before starting.", "warning");
      return;
    }

    if (!canStartAssessment) {
      notify(`Assessment unlocks at ${formatDateTime(inviteData.startsAt)}.`, "warning");
      return;
    }

    if (!inviteData?.inviteToken) {
      notify("Assessment invite is unavailable. Please reload.", "error");
      return;
    }

    setIsInitializing(true);
    setIsStartingAssessment(true);

    axios
      .post(`${API_URL}api/v1/candidate-assessment/${inviteData.inviteToken}/start`)
      .then(({ data }) => {
        if (data?.data?.alreadySubmitted) {
          const submittedPath = startAtOverride
            ? `/assessment/${inviteData.inviteToken}/submitted?startAt=${encodeURIComponent(startAtOverride)}`
            : `/assessment/${inviteData.inviteToken}/submitted`;
          navigate(submittedPath, {
            state: { submissionSummary: data?.data?.submissionSummary },
          });
          return;
        }

        const attemptPath = startAtOverride
          ? `/assessment/${inviteData.inviteToken}/attempt?startAt=${encodeURIComponent(startAtOverride)}`
          : `/assessment/${inviteData.inviteToken}/attempt`;
        navigate(attemptPath, {
          state: { attemptSession: data?.data?.session || null },
        });
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message || "Unable to start assessment right now.";
        notify(message, "error");
      })
      .finally(() => {
        setIsInitializing(false);
        setIsStartingAssessment(false);
      });
  };

  if (entryQuery.isError) {
    return (
      <div className="candidate-assessment-entry-page">
        <main className="candidate-entry-main">
          <div className="candidate-entry-container">
            <article className="candidate-entry-card">
              <section className="candidate-entry-hero">
                <div>
                  <h1>Unable to load assessment</h1>
                  <p>
                    {entryQuery.error?.response?.data?.message ||
                      "This invite may be invalid or no longer active."}
                  </p>
                </div>
              </section>
            </article>
          </div>
        </main>
      </div>
    );
  }

  if (entryQuery.isLoading || !inviteData) {
    return (
      <div className="candidate-assessment-entry-page">
        <main className="candidate-entry-main">
          <div className="candidate-entry-container">
            <article className="candidate-entry-card">
              <section className="candidate-entry-hero">
                <div>
                  <h1>Loading assessment invite...</h1>
                  <p>Please wait while we verify your assessment link.</p>
                </div>
              </section>
            </article>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="candidate-assessment-entry-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{`engineerHUB | ${inviteData?.assessmentTitle || "Assessment"}`}</title>
      </Helmet>

      <div className="candidate-entry-progress-track">
        <div className="candidate-entry-progress-fill" style={{ width: `${entryProgress}%` }} />
      </div>

      <header className="candidate-entry-header">
        <div className="candidate-entry-header-inner">
          <p className="candidate-entry-brand">engineerHUB</p>
          <div className="candidate-entry-header-actions">
            <span
              className={
                isLive
                  ? "candidate-entry-live-badge candidate-entry-live-badge--live"
                  : "candidate-entry-live-badge candidate-entry-live-badge--scheduled"
              }
            >
              <span className="dot" />
              {isLive ? "Live Now" : `Starts in ${formatCountdown(millisecondsUntilStart)}`}
            </span>
            <button type="button" className="candidate-entry-icon-btn" aria-label="View timer help">
              <FiClock />
            </button>
            <button type="button" className="candidate-entry-icon-btn" aria-label="Assessment help">
              <FiHelpCircle />
            </button>
          </div>
        </div>
      </header>

      <main className="candidate-entry-main">
        <div className="candidate-entry-pattern" aria-hidden="true" />
        <div className="candidate-entry-container">
          <article className="candidate-entry-card">
            <section className="candidate-entry-hero">
              <div>
                <nav className="candidate-entry-breadcrumb">
                  {(inviteData?.breadcrumbTrail || []).map((crumb, index) => (
                    <span key={crumb} className="candidate-entry-breadcrumb-item">
                      {index > 0 ? <FiArrowRight className="separator" /> : null}
                      {crumb}
                    </span>
                  ))}
                </nav>
                <h1>{inviteData?.assessmentTitle}</h1>
                <p>{inviteData?.assessmentSubtitle}</p>
              </div>
              <div className="candidate-entry-user-chip">
                <span className="avatar">{getInitials(inviteData?.candidateName)}</span>
                <span>{`${inviteData?.candidateName || "Candidate"} (${inviteData?.candidateRoleLabel || "Candidate"})`}</span>
              </div>
            </section>

            <section className="candidate-entry-stat-grid">
              {statCards.map((item) => (
                <div key={item.id} className="candidate-entry-stat-item">
                  <p>{item.label}</p>
                  <div>
                    <item.Icon />
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="candidate-entry-content-grid">
              <div className="candidate-entry-left-column">
                <section>
                  <h2>
                    <FiInfo />
                    Instructions & Protocol
                  </h2>
                  <div className="candidate-entry-instruction-box">
                    <ul>
                      {(inviteData?.instructions || []).map((instruction) => {
                        const Icon = INSTRUCTION_ICON_MAP[instruction.icon] || FiInfo;
                        return (
                          <li key={instruction.id}>
                            <span className="icon-box">
                              <Icon />
                            </span>
                            <div>
                              <p>{instruction.title}</p>
                              <span>{instruction.description}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2>
                    <FiCheckCircle />
                    System Integrity Verification
                  </h2>
                  <div className="candidate-entry-system-grid">
                    {(inviteData?.systemChecks || []).map((check) => {
                      const Icon = SYSTEM_ICON_MAP[check.icon] || FiMonitor;
                      return (
                        <div key={check.id} className="candidate-entry-system-card">
                          <div>
                            <Icon />
                            <span>{check.label}</span>
                          </div>
                          <FiCheckCircle className="status-icon" />
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className="candidate-entry-right-column">
                <section>
                  <h2>Exam Structure</h2>
                  <div className="candidate-entry-section-list">
                    {(inviteData?.sections || []).map((section) => (
                      <article key={section.id} className="candidate-entry-section-card">
                        <div className="candidate-entry-section-top">
                          <span>{section.label}</span>
                          <p>{`${section.questionCount} Questions`}</p>
                        </div>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
                <div className="candidate-entry-note">
                  <p>{`"${inviteData?.evaluatorNote || ""}"`}</p>
                </div>
              </aside>
            </section>

            <footer className="candidate-entry-cta">
              <div className="candidate-entry-cta-left">
                <label htmlFor="candidate-assessment-terms">
                  <input
                    id="candidate-assessment-terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                  />
                  I have read the instructions and I am ready to begin the assessment.
                </label>
                <p className={canStartAssessment ? "is-live" : "is-locked"}>
                  {inviteData?.isSubmitted ? (
                    "This assessment has already been submitted."
                  ) : inviteData?.isCancelled ? (
                    "This assessment invite is no longer active."
                  ) : canStartAssessment ? (
                    "Timer begins immediately after clicking Start Assessment."
                  ) : (
                    <>
                      <FiAlertCircle />
                      {`Assessment unlocks at ${formatDateTime(inviteData.startsAt)}.`}
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartAssessment}
                disabled={
                  !termsAccepted ||
                  !canStartAssessment ||
                  isInitializing ||
                  isStartingAssessment
                }
              >
                {isInitializing || isStartingAssessment ? "Initializing..." : "Start Assessment"}
                <FiPlay />
              </button>
            </footer>
          </article>
        </div>
      </main>

      <footer className="candidate-entry-bottom-footer">
        <div className="candidate-entry-footer-inner">
          <span>engineerHUB Suite</span>
          <p>© 2024 engineerHUB Technical Assessment Suite. Precision-engineered for excellence.</p>
          <div className="candidate-entry-footer-links">
            <Link to="/terms-and-conditions">Privacy Policy</Link>
            <button type="button" onClick={handleSupportClick}>
              Candidate Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
