import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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

export default function CandidateAIInterviewEntry() {
  const navigate = useNavigate();
  const { inviteToken = "demo-ai-interview" } = useParams();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 = Consent, 2 = Permission Request, 3 = Connected Preview
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Media streams
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useGlobalSnackbar();

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
    <div className="candidate-ai-entry-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>AI Interview Lobby — engineerHUB</title>
      </Helmet>

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
            <div className="ai-entry-user-chip">
              <div className="ai-entry-user-avatar">AC</div>
              <span>Alex Chen (Candidate)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="ai-entry-main">
        <article className="ai-entry-card">
          
          {/* Hero */}
          <section className="ai-entry-hero">
            <div className="ai-entry-title-box">
              <h1>Frontend Developer Round 2 - AI Interview</h1>
              <p>Autonomous AI Technical Evaluation Session</p>
            </div>
          </section>

          {/* Stat Grid */}
          <section className="ai-entry-stat-grid">
            <div className="ai-entry-stat-item">
              <label>Duration</label>
              <div className="ai-entry-stat-val">
                <FiClock /> 45 Minutes
              </div>
            </div>

            <div className="ai-entry-stat-item">
              <label>Total Questions</label>
              <div className="ai-entry-stat-val">
                <FiHelpCircle /> 10 Questions
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
                <FiCode /> React & System Design
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

          {/* Footer CTA */}
          <footer className="ai-entry-cta">
            <label htmlFor="ai-terms-check" className="ai-entry-terms">
              <input
                id="ai-terms-check"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                I agree to the interview guidelines, camera/microphone proctoring rules, and am ready to join the AI interview room.
              </span>
            </label>

            <button
              type="button"
              className="btn-start-ai-interview"
              onClick={handleStartInterviewClick}
              disabled={!termsAccepted}
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
  );
}
