import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "../../../components/SEO/SEO.jsx";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCpu,
  FiHelpCircle,
  FiInfo,
  FiMic,
  FiMonitor,
  FiPlay,
  FiShield,
  FiVideo,
  FiWifi,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import "./CandidateAIInterviewEntry.css";

import { fetchAIInterviewSessionApi } from "../../../services/aiInterviewApi";
import { isUserLoggedIn, getUserEmail, getUserFullName, getUserImage } from "../../../features/User/UserDetails";
import { handleLogout } from "../../../features/logout";
import { FiChevronDown, FiLogOut, FiLogIn } from "react-icons/fi";

export default function CandidateAIInterviewEntry() {
  const navigate = useNavigate();
  const { inviteToken = "demo-ai-interview" } = useParams();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 = Consent, 2 = Permission Request, 3 = Connected Preview
  const [errorMsg, setErrorMsg] = useState(null);
  
  // User Dropdown State & Ref
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userMenuRef = useRef(null);
  
  // Live API Session state
  const [sessionData, setSessionData] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // Media streams
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useGlobalSnackbar();

  const loggedIn = isUserLoggedIn();
  const loggedInEmail = getUserEmail();
  const loggedInName = getUserFullName() || sessionData?.candidateName || "Candidate";
  const loggedInImage = getUserImage();
  const candidateEmail = sessionData?.candidateEmail || "";

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const emailMismatch = Boolean(
    loggedIn &&
    candidateEmail &&
    loggedInEmail &&
    loggedInEmail.toLowerCase().trim() !== candidateEmail.toLowerCase().trim()
  );

  const isSubmitted = Boolean(
    sessionData?.status === "Completed" ||
    sessionData?.status === "Submitted" ||
    sessionData?.isSubmitted
  );

  const isExpired = Boolean(
    sessionData?.status === "Expired" ||
    sessionData?.isExpired
  );

  const canStartInterview = Boolean(
    loggedIn &&
    !emailMismatch &&
    !isSubmitted &&
    !isExpired &&
    !loadingSession
  );

  useEffect(() => {
    const loadSession = async () => {
      if (!inviteToken || inviteToken === "demo-ai-interview") {
        setLoadingSession(false);
        return;
      }
      try {
        setLoadingSession(true);
        const res = await fetchAIInterviewSessionApi(inviteToken);
        if (res?.success && res?.data) {
          setSessionData(res.data);
          if (res.data.status === "Completed") {
            setSnackbarMessage("This AI Interview session has already been completed.");
            setSnackbarSeverity("info");
            setSnackbarOpen(true);
          }
        }
      } catch (err) {
        console.warn("Error fetching AI session metadata:", err);
        setSessionError(err.response?.data?.message || "Failed to load session details.");
      } finally {
        setLoadingSession(false);
      }
    };

    loadSession();
  }, [inviteToken]);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, modalStep]);

  const stopMediaTracks = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopMediaTracks();
    };
  }, []);

  const requestHardwarePermissions = async () => {
    setErrorMsg(null);
    setModalStep(2);
    try {
      // Request BOTH Camera and Microphone access as required for AI Interview
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: true,
      });
      setMediaStream(stream);
      setModalStep(3);
    } catch (err) {
      console.error("Hardware permission error:", err);
      setErrorMsg(
        "Camera or Microphone access was denied. Please allow microphone and camera access in your browser settings to proceed with the AI Interview."
      );
      setModalStep(2);
    }
  };

  const closeModal = () => {
    stopMediaTracks();
    setShowModal(false);
  };

  const handleStartInterviewClick = () => {
    if (!loggedIn) {
      setSnackbarMessage("You must be logged in to join this AI Interview. Please log in first.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    if (emailMismatch) {
      setSnackbarMessage(`Email Mismatch: You are logged in as ${loggedInEmail}, but this interview was scheduled for ${candidateEmail}.`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (isSubmitted) {
      setSnackbarMessage("This AI interview has already been completed and submitted.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      return;
    }
    if (isExpired) {
      setSnackbarMessage("The scheduled time window for this AI interview has expired.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    if (!termsAccepted) {
      setSnackbarMessage("Please read and accept the protocol instructions before starting.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    // Open hardware permission setup
    setShowModal(true);
    setModalStep(1);
  };

  const proceedToInterviewRoom = () => {
    stopMediaTracks();
    navigate(`/ai-interview/${inviteToken}/attempt`);
  };

  return (
    <SEO title="AI Interview Lobby - engineerHUB" noIndex={true}>
      <div className="candidate-ai-entry-page">

      {/* Header */}
      <header className="ai-entry-header">
        <div className="ai-entry-header-inner">
          <div className="ai-entry-brand">
            <span>engineerHUB</span>
            <span className="ai-entry-brand-badge">AI Interview</span>
          </div>

          <div className="ai-entry-header-actions">
            <span className="ai-entry-live-badge --live">
              <span className="dot" /> Live Room Ready
            </span>

            {/* Logged-in Candidate User Chip with Dropdown */}
            {loggedIn ? (
              <div className="assessment-user-chip-container" ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  type="button"
                  className="assessment-user-chip"
                  title={loggedInEmail}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "2rem",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#0f172a"
                  }}
                >
                  <div className="ai-entry-user-avatar" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#138382", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>
                    {loggedInName ? loggedInName.slice(0, 2).toUpperCase() : "AC"}
                  </div>
                  <span>{loggedInName || loggedInEmail}</span>
                  <FiChevronDown style={{ transform: showUserDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
                </button>

                {showUserDropdown && (
                  <div
                    className="assessment-user-dropdown"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 6px)",
                      width: "240px",
                      background: "#ffffff",
                      borderRadius: "0.5rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                      border: "1px solid #e2e8f0",
                      zIndex: 100,
                      padding: "0.75rem"
                    }}
                  >
                    <div style={{ paddingBottom: "0.5rem", marginBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>{loggedInName}</p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{loggedInEmail}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        window.location.reload();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: "none",
                        background: "#fef2f2",
                        color: "#dc2626",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer"
                      }}
                    >
                      <FiLogOut />
                      <span>Logout &amp; Switch Account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const returnPath = `${window.location.pathname}${window.location.search}`;
                  sessionStorage.setItem("redirectToAuth", "true");
                  sessionStorage.setItem("redirectToAuthLink", returnPath);
                  navigate("/login");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "2rem",
                  border: "none",
                  background: "#138382",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer"
                }}
              >
                <FiLogIn />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="ai-entry-main">
        <article className="ai-entry-card">
          
          {/* Hero */}
          <section className="ai-entry-hero">
            <div className="ai-entry-title-box">
              <h1>{sessionData?.aiConfig?.roleTitle || "Technical Developer"} - Round {sessionData?.aiConfig?.interviewRound || 1} AI Interview</h1>
              <p>Autonomous AI Technical Evaluation Session</p>
            </div>
          </section>

          {/* Stat Grid */}
          <section className="ai-entry-stat-grid">
            <div className="ai-entry-stat-item">
              <label>Duration</label>
              <div className="ai-entry-stat-val">
                <FiClock /> {sessionData?.aiConfig?.durationMinutes || sessionData?.durationMinutes || 45} Minutes
              </div>
            </div>

            <div className="ai-entry-stat-item">
              <label>Total Questions</label>
              <div className="ai-entry-stat-val">
                <FiHelpCircle /> {sessionData?.aiConfig?.totalQuestions || sessionData?.totalQuestions || Math.max(4, Math.round(((sessionData?.aiConfig?.durationMinutes || sessionData?.durationMinutes || 30) / 2.5)))} Questions
              </div>
            </div>

            <div className="ai-entry-stat-item">
              <label>Interviewer Mode</label>
              <div className="ai-entry-stat-val">
                <FiCpu /> Conversational AI
              </div>
            </div>

            <div className="ai-entry-stat-item">
              <label>Focus Areas</label>
              <div className="ai-entry-stat-val">
                <FiCode /> {
                  Array.isArray(sessionData?.aiConfig?.topics) && sessionData.aiConfig.topics.length > 0
                    ? sessionData.aiConfig.topics.join(", ")
                    : typeof sessionData?.aiConfig?.topics === "string" && sessionData.aiConfig.topics.trim()
                    ? sessionData.aiConfig.topics
                    : "Technical Assessment"
                }
              </div>
            </div>
          </section>

          {/* Grid Content */}
          <section className="ai-entry-grid">
            
            {/* Left Column: Protocols */}
            <div>
              <h2 className="ai-section-title">
                <FiInfo /> Interview Protocol & Guidelines
              </h2>
              <ul className="ai-instruction-list">
                <li className="ai-instruction-item">
                  <div className="ai-instruction-icon">
                    <FiMic />
                  </div>
                  <div>
                    <h4>Active Microphone & Speech Input</h4>
                    <p>
                      Speak clearly into your microphone when answering. The AI interviewer will automatically listen and process your spoken responses in real-time.
                    </p>
                  </div>
                </li>

                <li className="ai-instruction-item">
                  <div className="ai-instruction-icon">
                    <FiVideo />
                  </div>
                  <div>
                    <h4>Continuous Webcam Proctoring</h4>
                    <p>
                      Keep your webcam turned on and remain centered in the video frame throughout the session.
                    </p>
                  </div>
                </li>

                <li className="ai-instruction-item">
                  <div className="ai-instruction-icon">
                    <FiShield />
                  </div>
                  <div>
                    <h4>Strict Anti-Cheat Policy</h4>
                    <p>
                      Tab switching, window blurs, and external device usage are continuously logged and reported to the recruiting team.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Hardware Checks */}
            <div>
              <h2 className="ai-section-title">
                <FiCheckCircle /> System Integrity Readiness
              </h2>
              <div className="ai-system-grid">
                <div className="ai-system-card">
                  <div className="ai-system-card-left">
                    <FiVideo /> Camera Check
                  </div>
                  <FiCheckCircle className="ai-system-status-icon" />
                </div>

                <div className="ai-system-card">
                  <div className="ai-system-card-left">
                    <FiMic /> Microphone Check
                  </div>
                  <FiCheckCircle className="ai-system-status-icon" />
                </div>

                <div className="ai-system-card">
                  <div className="ai-system-card-left">
                    <FiMonitor /> Screen Display
                  </div>
                  <FiCheckCircle className="ai-system-status-icon" />
                </div>

                <div className="ai-system-card">
                  <div className="ai-system-card-left">
                    <FiWifi /> Network Latency
                  </div>
                  <FiCheckCircle className="ai-system-status-icon" />
                </div>
              </div>
            </div>
          </section>

          {/* Security & Access Status Alerts */}
          {!loggedIn && (
            <div style={{ background: "#fff7ed", border: "1px solid #fdba74", padding: "1rem", borderRadius: "0.5rem", margin: "1rem 1.5rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FiAlertCircle style={{ color: "#ea580c", fontSize: "1.35rem", flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#9a3412", display: "block", fontSize: "0.95rem" }}>Authentication Required</strong>
                <span style={{ color: "#c2410c", fontSize: "0.85rem" }}>
                  You must be logged in to join this interview session. Please log in to your candidate account.
                </span>
              </div>
            </div>
          )}

          {emailMismatch && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "1rem 1.25rem", borderRadius: "0.5rem", margin: "1rem 1.5rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FiAlertCircle style={{ color: "#dc2626", fontSize: "1.5rem", flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#991b1b", display: "block", fontSize: "0.95rem" }}>Email Account Mismatch</strong>
                  <span style={{ color: "#b91c1c", fontSize: "0.85rem" }}>
                    You are currently logged in as <strong>{loggedInEmail}</strong>, but this interview link was issued to <strong>{candidateEmail}</strong>.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  window.location.reload();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                <FiLogOut />
                Switch Account
              </button>
            </div>
          )}

          {isSubmitted && (
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", padding: "1rem", borderRadius: "0.5rem", margin: "1rem 1.5rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FiCheckCircle style={{ color: "#2563eb", fontSize: "1.35rem", flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#1e40af", display: "block", fontSize: "0.95rem" }}>Interview Completed &amp; Submitted</strong>
                <span style={{ color: "#1d4ed8", fontSize: "0.85rem" }}>
                  This AI interview session has already been completed and submitted. Re-joining is disabled.
                </span>
              </div>
            </div>
          )}

          {isExpired && (
            <div style={{ background: "#fffbe6", border: "1px solid #ffe58f", padding: "1rem", borderRadius: "0.5rem", margin: "1rem 1.5rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FiAlertTriangle style={{ color: "#d97706", fontSize: "1.35rem", flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#b45309", display: "block", fontSize: "0.95rem" }}>Interview Link Expired</strong>
                <span style={{ color: "#d97706", fontSize: "0.85rem" }}>
                  The scheduled time window for this AI interview session has passed and expired.
                </span>
              </div>
            </div>
          )}

          {/* Footer CTA */}
          <footer className="ai-entry-cta">
            <label htmlFor="ai-terms-check" className="ai-entry-terms">
              <input
                id="ai-terms-check"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                disabled={!canStartInterview}
              />
              <span>
                I agree to the interview guidelines, camera/microphone proctoring rules, and am ready to join the AI interview room.
              </span>
            </label>

            <button
              type="button"
              className="btn-start-ai-interview"
              onClick={handleStartInterviewClick}
              disabled={!termsAccepted || !canStartInterview}
              style={{
                opacity: !termsAccepted || !canStartInterview ? 0.6 : 1,
                cursor: !termsAccepted || !canStartInterview ? "not-allowed" : "pointer"
              }}
            >
              <span>Join AI Interview Room</span>
              <FiPlay />
            </button>
          </footer>

        </article>
      </main>

      {/* ── Hardware Permission & Proctoring Warning Modal ─────────────────── */}
      {showModal && (
        <div className="ai-modal-overlay">
          <div className="ai-modal-card">
            <div className="ai-modal-header">
              <h3>Camera &amp; Microphone Integrity Verification</h3>
              <button type="button" className="ai-modal-close-btn" onClick={closeModal}>
                <FiX />
              </button>
            </div>

            <div className="ai-modal-body">
              
              {/* Step 1: Warning & Consent */}
              {modalStep === 1 && (
                <div>
                  <div className="ai-proctor-warning-box">
                    <FiAlertTriangle />
                    <div>
                      <h4>Proctoring Protocol Active</h4>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "#b45309" }}>
                        Both Camera and Microphone permissions are required to enter the AI interview room.
                      </p>
                    </div>
                  </div>

                  <ul className="ai-proctor-rules-list">
                    <li>
                      <FiAlertCircle />
                      <span><strong>Camera Access:</strong> Must remain enabled to verify candidate identity and presence.</span>
                    </li>
                    <li>
                      <FiAlertCircle />
                      <span><strong>Microphone Access:</strong> Must be active for real-time speech input with the AI interviewer.</span>
                    </li>
                    <li>
                      <FiAlertCircle />
                      <span><strong>Behavioral Logging:</strong> Tab switches, window blurs, and face disappearances are tracked.</span>
                    </li>
                  </ul>

                  <div className="ai-modal-actions">
                    <button
                      type="button"
                      className="btn-modal-action --primary"
                      onClick={requestHardwarePermissions}
                    >
                      Allow Camera &amp; Microphone
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Requesting Access / Retry Error */}
              {modalStep === 2 && (
                <div>
                  {errorMsg ? (
                    <div style={{ textAlign: "center", padding: "1rem" }}>
                      <FiAlertCircle style={{ fontSize: "2.5rem", color: "#ef4444", marginBottom: "0.75rem" }} />
                      <p style={{ fontSize: "0.9rem", color: "#dc2626", fontWeight: "600" }}>{errorMsg}</p>
                      <button
                        type="button"
                        className="btn-modal-action --primary"
                        onClick={requestHardwarePermissions}
                        style={{ marginTop: "1rem" }}
                      >
                        Retry Hardware Permission
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                      <FiCpu style={{ fontSize: "2.5rem", color: "#138382", marginBottom: "1rem" }} />
                      <p style={{ fontSize: "1rem", fontWeight: "700", color: "#0b1c30" }}>
                        Requesting Microphone &amp; Camera Access...
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        Please click "Allow" in your browser popup prompt.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Connected Live Preview */}
              {modalStep === 3 && (
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#3e4948", marginBottom: "0.75rem", fontWeight: "600" }}>
                    Hardware connected successfully! Ensure your face is centered and speak a few test words into your microphone.
                  </p>

                  <div className="ai-preview-frame">
                    <video ref={videoRef} autoPlay playsInline muted className="ai-preview-video" />
                    <div className="ai-audio-visualizer-bar">
                      <div style={{ display: "flex", items: "center", gap: "0.4rem" }}>
                        <FiMic style={{ color: "#10b981" }} />
                        <span>Microphone Signal Active</span>
                      </div>
                      <div className="mic-wave-dots">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>

                  <div className="ai-modal-actions">
                    <button
                      type="button"
                      className="btn-modal-action --primary"
                      onClick={proceedToInterviewRoom}
                    >
                      Enter AI Interview Room
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
    </SEO>
  );
}
