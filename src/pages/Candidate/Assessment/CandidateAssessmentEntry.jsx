import { useEffect, useMemo, useState, useRef } from "react";
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
  FiLogIn,
  FiMonitor,
  FiPlay,
  FiTrendingUp,
  FiUpload,
  FiWifi,
  FiX,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { API_URL, API_URLT, FRONTEND_URL } from "../../../services/APIUtils";
import {
  isUserLoggedIn,
  getUserEmail,
  getUserFullName,
  getUserImage,
} from "../../../features/User/UserDetails";
import { handleLogout } from "../../../features/logout";
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
    timeZone: "Asia/Kolkata",
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userMenuRef = useRef(null);
  
  // Webcam proctoring state
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [webcamStep, setWebcamStep] = useState(1); // 1 = Consent, 2 = Permission Request/Retry, 3 = Connected Preview
  const [webcamError, setWebcamError] = useState(null);
  const [webcamStream, setWebcamStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (webcamStream && videoRef.current) {
      videoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream, webcamStep]);

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
  };

  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamStream]);

  const requestCameraPermission = async () => {
    setWebcamError(null);
    setWebcamStep(2);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });
      setWebcamStream(stream);
      setWebcamStep(3);
    } catch (err) {
      console.error("Camera access error:", err);
      setWebcamError(
        "Webcam access denied or unavailable. Please ensure your camera is connected and grant camera access in your browser settings to continue."
      );
      setWebcamStep(2);
    }
  };

  const closeWebcamModal = () => {
    stopWebcam();
    setShowWebcamModal(false);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auth state
  const loggedIn = isUserLoggedIn();
  const loggedInEmail = loggedIn ? getUserEmail() : "";
  const loggedInName = loggedIn ? getUserFullName() : "";
  const loggedInImage = loggedIn ? getUserImage() : "";

  const {
    setSnackbarDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
  } = useGlobalSnackbar();

  const entryQuery = useQuery({
    queryKey: ["candidate-assessment-entry", inviteToken],
    enabled: Boolean(inviteToken) && loggedIn,
    retry: 1,
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/candidate-assessment/${inviteToken}/entry`
      );
      return response.data;
    },
  });

  const inviteData = entryQuery.data?.data;

  // Email mismatch check — only show after invite loads
  const candidateEmail = inviteData?.candidateEmail || "";
  const emailMismatch =
    loggedIn &&
    candidateEmail &&
    loggedInEmail &&
    loggedInEmail.toLowerCase() !== candidateEmail.toLowerCase();

  const startAtMs = useMemo(() => {
    const parsed = new Date(inviteData?.startsAt).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }, [inviteData?.startsAt]);

  const millisecondsUntilStart = Math.max(0, startAtMs - currentTime);
  const isLive = millisecondsUntilStart === 0;
  const canStartAssessment = Boolean(
    isLive && !inviteData?.isSubmitted && !inviteData?.isCancelled && !emailMismatch
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

  // Google OAuth login — redirects back to this assessment page after auth
  const handleGoogleLogin = () => {
    const returnPath = `${window.location.pathname}${window.location.search}`;
    sessionStorage.setItem("redirectToAuth", "true");
    sessionStorage.setItem("redirectToAuthLink", returnPath);

    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.append(
      "client_id",
      "191366106902-f0pbl6ncfs9h2iicor5vm5viq94snf6l.apps.googleusercontent.com"
    );
    googleAuthUrl.searchParams.append(
      "redirect_uri",
      `${API_URLT}api/v1/auth/google/user/redirect`
    );
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("state", `${FRONTEND_URL}success`);
    googleAuthUrl.searchParams.append("scope", "profile email");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "consent");
    window.location.href = googleAuthUrl.toString();
  };

  const handleEhubLogin = () => {
    const returnPath = `${window.location.pathname}${window.location.search}`;
    sessionStorage.setItem("redirectToAuth", "true");
    sessionStorage.setItem("redirectToAuthLink", returnPath);
    navigate("/login");
  };

  const handleSupportClick = () => {
    notify("Candidate support flow will be connected in next iteration.");
  };



  // Show login modal if not logged in
  useEffect(() => {
    if (!loggedIn) {
      setShowLoginModal(true);
    }
  }, [loggedIn]);

  const handleStartAssessment = () => {
    if (!termsAccepted) {
      notify("Please accept the instructions before starting.", "warning");
      return;
    }

    if (emailMismatch) {
      notify("Access denied. Please log in with the correct email account to start the assessment.", "error");
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

    if (inviteData?.activeProctoring) {
      setShowWebcamModal(true);
      setWebcamStep(1);
      setWebcamError(null);
      return;
    }

    proceedToStartAssessment();
  };

  const proceedToStartAssessment = () => {
    stopWebcam();
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

  if (!loggedIn) {
    return (
      <div className="candidate-assessment-entry-page">
        <header className="candidate-entry-header">
          <div className="candidate-entry-header-inner">
            <p className="candidate-entry-brand">engineerHUB</p>
          </div>
        </header>

        {/* Login Modal Overlay */}
        <div className="assessment-auth-overlay">
          <div className="assessment-auth-modal">
            <div className="assessment-auth-modal-header">
              <div className="assessment-auth-logo">engineerHUB</div>
              <p className="assessment-auth-subtitle">
                Please sign in to access your assessment
              </p>
            </div>

            <div className="assessment-auth-note">
              <FiAlertCircle className="assessment-auth-note-icon" />
              <p>
                Use the <strong>same email address</strong> you used when applying for this opportunity.
              </p>
            </div>

            <div className="assessment-auth-actions">
              <button
                type="button"
                className="assessment-auth-google-btn"
                onClick={handleGoogleLogin}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                  <path d="M3.15308 7.3455L6.43858 9.755C7.32758 7.554 9.48058 6 12.0001 6C13.5296 6 14.9211 6.577 15.9806 7.5195L18.8091 4.691C17.0231 3.0265 14.6341 2 12.0001 2C8.15908 2 4.82808 4.1685 3.15308 7.3455Z" fill="#FF3D00"/>
                  <path d="M11.9999 22.0003C14.5829 22.0003 16.9299 21.0118 18.7044 19.4043L15.6094 16.7853C14.6054 17.5458 13.3574 18.0003 11.9999 18.0003C9.39891 18.0003 7.19041 16.3418 6.35841 14.0273L3.09741 16.5398C4.75241 19.7783 8.11341 22.0003 11.9999 22.0003Z" fill="#4CAF50"/>
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                </svg>
                Sign in with Google
              </button>

              <div className="assessment-auth-divider">
                <span>or</span>
              </div>

              <button
                type="button"
                className="assessment-auth-ehub-btn"
                onClick={handleEhubLogin}
              >
                <FiLogIn />
                Sign in with engineerHUB
              </button>
            </div>

            <p className="assessment-auth-footer">
              Don't have an account?{" "}
              <a href="/select-role">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

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

            {/* Logged-in user chip with dropdown */}
            <div className="assessment-user-chip-container" ref={userMenuRef}>
              <button
                type="button"
                className="assessment-user-chip"
                title={loggedInEmail}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
              >
                {loggedInImage ? (
                  <img
                    src={loggedInImage}
                    alt={loggedInName}
                    className="assessment-user-chip-avatar"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <span className="assessment-user-chip-initials">
                    {getInitials(loggedInName)}
                  </span>
                )}
                <span className="assessment-user-chip-name">{loggedInName || loggedInEmail}</span>
                <FiChevronDown className={`assessment-user-chip-chevron ${showUserDropdown ? 'active' : ''}`} />
              </button>

              {showUserDropdown && (
                <div className="assessment-user-dropdown">
                  <div className="assessment-dropdown-header">
                    <p className="assessment-dropdown-name">{loggedInName || 'Candidate'}</p>
                    <p className="assessment-dropdown-email">{loggedInEmail}</p>
                  </div>
                  <div className="assessment-dropdown-divider" />
                  <button
                    type="button"
                    className="assessment-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <span>Logout & Switch Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Email mismatch warning banner */}
      {emailMismatch && (
        <div className="assessment-email-mismatch-banner">
          <FiAlertCircle />
          <span>
            You are logged in as <strong>{loggedInEmail}</strong>, but this assessment was sent to{" "}
            <strong>{candidateEmail}</strong>. Please log in with the correct account.
          </span>
        </div>
      )}

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
                <p className={(canStartAssessment && !emailMismatch) ? "is-live" : "is-locked"}>
                  {inviteData?.isSubmitted ? (
                    "This assessment has already been submitted."
                  ) : inviteData?.isCancelled ? (
                    "This assessment invite is no longer active."
                  ) : emailMismatch ? (
                    "Access denied. Please log in with the correct email account."
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
      {/* ── Webcam Consent & Setup Modal ─────────────────── */}
      {showWebcamModal && (
        <div className="webcam-modal-overlay">
          <div className="webcam-modal-card">
            <div className="webcam-modal-header">
              <h3>Webcam Integrity Setup</h3>
              <button type="button" className="webcam-modal-close" onClick={closeWebcamModal} aria-label="Close modal">
                <FiX />
              </button>
            </div>

            <div className="webcam-modal-body">
              {webcamStep === 1 && (
                <div className="webcam-step-content">
                  <div className="webcam-alert-box">
                    <FiAlertCircle className="webcam-alert-icon" />
                    <h4>Webcam Required for Proctoring</h4>
                  </div>
                  <p className="webcam-instruction-text">
                    This assessment uses automated webcam proctoring (Level 2 AI Proctoring) to monitor the attempt environment.
                  </p>
                  <ul className="webcam-rules-list">
                    <li>Camera access is mandatory to start and complete the assessment.</li>
                    <li>The camera will monitor for integrity indicators (e.g. no face, multiple faces).</li>
                    <li><strong>Privacy Guard:</strong> No continuous video recording or raw webcam images/screenshots are stored or sent to our servers. Only numeric proctoring event logs are saved.</li>
                  </ul>
                  <div className="webcam-modal-actions">
                    <button type="button" className="webcam-btn --primary" onClick={requestCameraPermission}>
                      Allow Camera
                    </button>
                    <button type="button" className="webcam-btn --secondary" disabled>
                      Continue Assessment
                    </button>
                  </div>
                </div>
              )}

              {webcamStep === 2 && (
                <div className="webcam-step-content">
                  {webcamError ? (
                    <div className="webcam-error-box">
                      <FiAlertCircle className="webcam-error-icon" style={{ color: "#ef4448", fontSize: "2rem", marginBottom: "1rem" }} />
                      <p className="webcam-error-text">{webcamError}</p>
                      <button type="button" className="webcam-btn --primary" onClick={requestCameraPermission} style={{ marginTop: "1rem" }}>
                        Retry Connection
                      </button>
                    </div>
                  ) : (
                    <div className="webcam-loading-box">
                      <div className="webcam-spinner" />
                      <p>Requesting camera permission... Please select 'Allow' in your browser pop-up.</p>
                    </div>
                  )}
                </div>
              )}

              {webcamStep === 3 && (
                <div className="webcam-step-content">
                  <div className="webcam-success-box" style={{ marginBottom: "1rem", textAlign: "center" }}>
                    <span className="webcam-status-indicator --connected" style={{ color: "#10b981", fontWeight: "700", fontSize: "0.95rem" }}>● Camera Connected</span>
                  </div>
                  <div className="webcam-preview-container">
                    <video ref={videoRef} className="webcam-preview-video" autoPlay playsInline muted />
                  </div>
                  <p className="webcam-success-text">
                    Your camera is verified and active. Please keep the camera frame focused on your face throughout the entire assessment duration.
                  </p>
                  <div className="webcam-modal-actions">
                    <button type="button" className="webcam-btn --primary" onClick={proceedToStartAssessment}>
                      Continue Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
