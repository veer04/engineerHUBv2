import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiClock,
  FiDownload,
  FiGlobe,
  FiHelpCircle,
  FiMic,
  FiMinimize,
  FiPhoneOff,
  FiSliders,
  FiTrendingUp,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import ProctoringFullscreenPrompt from "../Assessment/ProctoringFullscreenPrompt";
import "./CandidateAIInterviewRoom.css";

const DUMMY_TRANSCRIPT = [
  {
    id: "m1",
    sender: "ai",
    senderLabel: "AI Interviewer",
    time: "10:40 AM",
    text: "Hello Alex! Welcome to Round 2 of your Frontend Engineering Technical Assessment. Let's begin by discussing React's core rendering mechanism. Could you explain how the Virtual DOM works and how React updates the real DOM?",
  },
  {
    id: "m2",
    sender: "candidate",
    senderLabel: "Candidate (Alex Chen)",
    time: "10:41 AM",
    text: "React maintains an in-memory lightweight representation of the UI called the Virtual DOM. When component state updates, React creates a new Virtual DOM tree, compares it against the snapshot of the previous tree using its Diffing algorithm (Reconciliation), and efficiently updates only the modified DOM nodes in the real DOM.",
  },
  {
    id: "m3",
    sender: "ai",
    senderLabel: "AI Interviewer",
    time: "10:42 AM",
    text: "That's a solid explanation of the Virtual DOM. Moving on, could you explain the rules of Hooks and why we can't call them inside loops or conditional statements?",
  },
  {
    id: "m4",
    sender: "candidate",
    senderLabel: "Candidate (Alex Chen)",
    time: "10:43 AM",
    text: "React Hooks rely on the order in which they are called across consecutive renders. React maintains an internal ordered list of hook states for every component instance. If we call a hook inside a condition or loop, the call order changes between renders, causing React to misidentify state variables and throw runtime errors.",
  },
  {
    id: "m5",
    sender: "ai",
    senderLabel: "AI Interviewer",
    time: "10:44 AM",
    text: "Correct. Now, focusing on performance, how does useMemo differ from useCallback in practical scenarios?",
  },
  {
    id: "m6",
    sender: "candidate",
    senderLabel: "Candidate (Alex Chen)",
    time: "10:45 AM",
    text: "useMemo caches the calculated return value of an expensive computation, whereas useCallback caches the function instance itself. We use useCallback when passing callback functions to memoized child components to prevent unnecessary child re-renders.",
  },
  {
    id: "m7",
    sender: "ai",
    senderLabel: "AI Interviewer",
    time: "10:46 AM",
    text: "Great distinction. For large-scale web apps, how would you optimize Core Web Vitals, specifically LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) in React?",
  },
];

export default function CandidateAIInterviewRoom() {
  const navigate = useNavigate();
  const { inviteToken = "demo-ai-interview" } = useParams();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useGlobalSnackbar();

  // Fullscreen & Proctoring state
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);
  const [isExitWarning, setIsExitWarning] = useState(false);

  // Timer state (18 mins 42 secs = 1122 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(1122);
  const [isMuted, setIsMuted] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState("Listening..."); // Listening..., Thinking..., Speaking...
  const [aiStatus, setAiStatus] = useState("Speaking..."); // Speaking..., Listening..., Analyzing...
  const [activeSpeaker, setActiveSpeaker] = useState("ai"); // "ai" | "candidate" | "none"

  const transcriptScrollRef = useRef(null);

  // Fullscreen helper
  const requestRoomFullscreen = async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        await docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        await docEl.msRequestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request error:", err);
    }
  };

  // Fullscreen listener effect
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fsEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      if (!fsEl) {
        setIsExitWarning(true);
        setShowFullscreenPrompt(true);
      } else {
        setShowFullscreenPrompt(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Status & Active Speaker Simulation Effect
  useEffect(() => {
    const states = [
      { ai: "Speaking...", candidate: "Listening...", speaker: "ai" },
      { ai: "Listening...", candidate: "Thinking...", speaker: "none" },
      { ai: "Listening...", candidate: "Speaking...", speaker: "candidate" },
      { ai: "Analyzing...", candidate: "Listening...", speaker: "none" },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length;
      setAiStatus(states[idx].ai);
      setCandidateStatus(states[idx].candidate);
      setActiveSpeaker(states[idx].speaker);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, []);

  const formatTimer = (totalSecs) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleExportTranscript = () => {
    setSnackbarMessage("Exporting AI Interview Transcript...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  const handleRaiseHand = () => {
    setSnackbarMessage("Hand raised. Notification sent to interview observers.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleToggleMuteAI = () => {
    setIsMuted(!isMuted);
    setSnackbarMessage(isMuted ? "AI Audio unmuted" : "AI Audio muted");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  const handleExitFullscreen = async () => {
    try {
      const fsEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      if (fsEl) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      } else {
        setSnackbarMessage("You are not currently in fullscreen mode.");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.warn("Fullscreen exit error:", err);
    }
  };

  const handleEndInterview = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    navigate(`/ai-interview/${inviteToken}/submitted`);
  };

  return (
    <div className="ai-room-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Live AI Interview Session — engineerHUB</title>
      </Helmet>

      {/* ── Proctoring Fullscreen Enforcement Prompt Overlay ─────────────────── */}
      <ProctoringFullscreenPrompt
        show={showFullscreenPrompt}
        isExitWarning={isExitWarning}
        onEnterFullscreen={async () => {
          await requestRoomFullscreen();
          setShowFullscreenPrompt(false);
        }}
      />

      {/* ── Fixed Left Sidebar (~290px) ──────────────────────────────────── */}
      <aside className="ai-room-sidebar">
        <div className="sidebar-top">
          {/* Brand & Round Title */}
          <div className="sidebar-brand">
            <span className="ai-room-logo">InterviewAI</span>
            <span className="ai-room-pill round-tag">
              Frontend Developer Round 2
            </span>
          </div>

          {/* Timer, Status, Language, Topic */}
          <div className="sidebar-meta-group">
            <div className="ai-timer-box">
              <FiClock />
              <span>{formatTimer(secondsRemaining)} Remaining</span>
            </div>

            <div className="sidebar-row-status">
              <div className="ai-status-connected">
                <span className="green-dot" />
                <span>Connected</span>
              </div>
              <div className="sidebar-lang-tag">
                <FiGlobe />
                <span>EN-US</span>
              </div>
            </div>

            <div className="sidebar-topic-box">
              <span className="sidebar-topic-label">Current Topic</span>
              <span className="sidebar-topic-val">React & System Architecture</span>
            </div>

            <div className="sidebar-progress-box">
              <div className="ai-progress-meta">
                <span>Progress: 4/10</span>
                <span>40%</span>
              </div>
              <div className="ai-progress-bar-track">
                <div className="ai-progress-bar-fill" style={{ width: "40%" }} />
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="sidebar-controls">
            <span className="sidebar-section-label">Controls</span>
            <button type="button" className="sidebar-ctrl-btn" onClick={handleToggleMuteAI} title="Toggle AI Mute">
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
              <span>{isMuted ? "Unmute AI" : "Mute AI"}</span>
            </button>
            <button type="button" className="sidebar-ctrl-btn" title="Audio Settings">
              <FiSliders />
              <span>Audio Settings</span>
            </button>
            <button type="button" className="sidebar-ctrl-btn" onClick={handleRaiseHand} title="Raise Hand">
              <FiMic />
              <span>Raise Hand</span>
            </button>
            <button type="button" className="sidebar-ctrl-btn" onClick={handleExitFullscreen} title="Exit Fullscreen">
              <FiMinimize />
              <span>Exit Fullscreen</span>
            </button>
          </div>

          {/* Observers Badge */}
          <div className="sidebar-observers">
            <div className="observer-avatars">
              <div className="observer-chip hr">HR</div>
              <div className="observer-chip ai">AI</div>
            </div>
            <span className="observer-text">Live Observers (2)</span>
          </div>
        </div>

        {/* End Interview Action at Sidebar Bottom */}
        <div className="sidebar-bottom">
          <button type="button" className="btn-end-interview-sidebar" onClick={handleEndInterview} title="End Call">
            <FiPhoneOff />
            <span>End Interview</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area (Right of Sidebar) ────────────────────────── */}
      <main className="ai-room-main-content">
        
        {/* Top Profiles Section (50% Vertical Split) */}
        <div className="ai-profiles-row">
          
          {/* AI Interviewer Card (Purple Accent) */}
          <aside className="profile-card">
            <div className="ai-interviewer-avatar-wrapper">
              {activeSpeaker === "ai" && (
                <>
                  <div className="pulse-ring-1" />
                  <div className="pulse-ring-2" />
                </>
              )}
              <div className={`ai-avatar-frame ${activeSpeaker === "ai" ? "speaking-active" : ""}`}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="AI Interviewer Avatar"
                />
              </div>
            </div>

            <div className="ai-name-title">
              <h2>AI Interviewer</h2>
              <p>Senior Frontend Interviewer</p>
            </div>

            {/* AI Status Indicator Card (Replaced progress bar) */}
            <div className="ai-status-card">
              <span className="ai-status-label">Status Indicator</span>
              <div className="ai-status-row">
                <FiVolume2 className="status-icon-anim" />
                <span className="status-text-live">{aiStatus}</span>
              </div>
            </div>
          </aside>

          {/* Candidate Card (Teal Accent) */}
          <aside className="profile-card">
            <div className="ai-interviewer-avatar-wrapper">
              {activeSpeaker === "candidate" && (
                <>
                  <div className="candidate-pulse-ring-1" />
                  <div className="candidate-pulse-ring-2" />
                </>
              )}
              <div className={`candidate-avatar-frame ${activeSpeaker === "candidate" ? "speaking-active" : ""}`}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Alex Chen Candidate Avatar"
                />
              </div>
            </div>

            <div className="candidate-name-title">
              <h2>Alex Chen</h2>
              <p>Full Stack Developer</p>
            </div>

            <div className="candidate-status-card">
              <span className="candidate-status-label">Status Indicator</span>
              <div className="candidate-status-row">
                <FiMic className="status-icon-anim" />
                <span className="status-text-live">{candidateStatus}</span>
              </div>
            </div>
          </aside>

        </div>

        {/* Live Conversation Transcript (50% Vertical Split - Scrollable) */}
        <section className="transcript-section">
          <div className="transcript-header">
            <h3>Interview Transcript</h3>
            <button
              type="button"
              className="btn-export-transcript"
              onClick={handleExportTranscript}
            >
              <FiDownload /> Export
            </button>
          </div>

          <div className="transcript-scroll-area" ref={transcriptScrollRef}>
            {DUMMY_TRANSCRIPT.map((msg) => (
              <div
                key={msg.id}
                className={`msg-row ${msg.sender === "ai" ? "ai-msg" : "candidate-msg"}`}
              >
                <div className="msg-sender-meta">
                  <span className="msg-sender-name">{msg.senderLabel}</span>
                  <span className="msg-timestamp">{msg.time}</span>
                </div>
                <div className="msg-body-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
