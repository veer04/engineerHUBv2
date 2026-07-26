import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "../../../components/SEO/SEO.jsx";
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
import { io } from "socket.io-client";
import { API_URL } from "../../../services/APIUtils";
import { fetchAIInterviewSessionApi, fetchAIInterviewTranscriptApi, endAIInterviewSessionApi } from "../../../services/aiInterviewApi";
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

  // Live session & Socket state
  const [sessionInfo, setSessionInfo] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const socketRef = useRef(null);

  // Camera & Mic state
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const candidateVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const isAISpeakingRef = useRef(false);
  const lastAIQuestionTextRef = useRef("");

  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState(2700); // 45 mins default
  const [isMuted, setIsMuted] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState("Listening...");
  const [aiStatus, setAiStatus] = useState("Listening...");
  const [activeSpeaker, setActiveSpeaker] = useState("none"); // "ai" | "candidate" | "none"

  const transcriptScrollRef = useRef(null);

  // 1. Initialize Candidate Webcam & Microphone Stream
  useEffect(() => {
    let activeStream = null;
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        activeStream = stream;
        mediaStreamRef.current = stream;
        if (candidateVideoRef.current) {
          candidateVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Camera/Mic access error or denied:", err);
      }
    };

    startMedia();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // 2. Synchronize Camera Stream on Toggle
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = isCameraOn;
      });
    }
  }, [isCameraOn]);

  // 3. Synchronize Microphone Stream on Toggle
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMicOn;
      });
    }
  }, [isMicOn]);

  // 4. Initialize Web Speech Recognition for Candidate Spoken Answers
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    let finalTranscriptText = "";

    recognition.onstart = () => {
      setCandidateStatus("Listening...");
    };

    recognition.onspeechstart = () => {
      if (isAISpeakingRef.current) return;
      setActiveSpeaker("candidate");
      setCandidateStatus("Speaking...");
    };

    recognition.onresult = (event) => {
      if (isAISpeakingRef.current) return;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptText += " " + event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
    };

    recognition.onspeechend = () => {
      if (isAISpeakingRef.current) return;
      setActiveSpeaker("none");
      setCandidateStatus("Listening...");
      if (finalTranscriptText.trim() && socketRef.current) {
        const textToSend = finalTranscriptText.trim();
        finalTranscriptText = "";

        // Echo Suppression Check: Compare against last AI Question
        const lastAIQ = (lastAIQuestionTextRef.current || "").toLowerCase();
        const candT = textToSend.toLowerCase();
        
        const isEcho =
          (lastAIQ.length > 10 && candT.includes(lastAIQ.slice(0, 25))) ||
          (candT.length > 10 && lastAIQ.includes(candT.slice(0, 25)));

        if (!isEcho) {
          socketRef.current.emit("ai_interview:audio_chunk", {
            inviteToken,
            transcriptText: textToSend,
          });
        } else {
          console.warn("🔇 Ignored duplicate AI question echo in candidate transcript:", textToSend);
        }
      }
    };

    recognition.onerror = (e) => {
      if (e.error !== "no-speech") {
        console.warn("Speech recognition error:", e.error);
      }
    };

    if (isMicOn) {
      try {
        recognition.start();
      } catch (_e) {}
    }

    return () => {
      try {
        recognition.stop();
      } catch (_e) {}
    };
  }, [inviteToken, isMicOn]);

  // 5. Socket.IO Integration Effect
  useEffect(() => {
    if (!inviteToken) return;

    // Fetch initial session metadata and transcript history
    Promise.all([
      fetchAIInterviewSessionApi(inviteToken),
      fetchAIInterviewTranscriptApi(inviteToken).catch(() => null),
    ])
      .then(([sessionRes, transcriptRes]) => {
        if (sessionRes?.success && sessionRes?.data) {
          setSessionInfo(sessionRes.data);
          if (sessionRes.data.secondsRemaining) {
            setSecondsRemaining(sessionRes.data.secondsRemaining);
          } else if (sessionRes.data.aiConfig?.durationMinutes) {
            setSecondsRemaining(sessionRes.data.aiConfig.durationMinutes * 60);
          }
        }
        if (transcriptRes?.data?.transcripts && Array.isArray(transcriptRes.data.transcripts)) {
          const formatted = transcriptRes.data.transcripts.map((t) => ({
            id: t._id || `turn_${t.turnIndex}`,
            sender: t.speaker || "ai",
            senderLabel: t.speakerLabel || (t.speaker === "ai" ? "AI Interviewer" : "Candidate"),
            time: new Date(t.timestamp || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: t.text,
          }));
          setTranscripts(formatted);
        }
      })
      .catch((err) => console.warn("Session fetch error:", err));

    // Connect Socket.IO client (sanitize API_URL trailing slash)
    const socketUrl = API_URL ? API_URL.replace(/\/+$/, "") : window.location.origin;
    const socket = io(socketUrl, {
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Connected to AI Interview Socket:", socket.id);
      socket.emit("ai_interview:join", { inviteToken, role: "candidate" });
      socket.emit("ai_interview:start", { inviteToken });
    });

    socket.on("ai_interview:started", (data) => {
      setSnackbarMessage("AI Technical Interview Session Started.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    });

    socket.on("ai_interview:state_change", (data) => {
      const { currentState } = data || {};
      if (currentState === "PROCESSING_RESPONSE") {
        setAiStatus("Evaluating Answer...");
      } else if (currentState === "AI_SPEAKING") {
        setAiStatus("Speaking...");
      } else if (currentState === "LISTENING") {
        setAiStatus("Listening...");
        setCandidateStatus("Listening...");
      } else if (currentState === "FOLLOW_UP" || currentState === "NEXT_QUESTION") {
        setAiStatus("Formulating Question...");
      }
    });

    socket.on("ai_interview:question", (data) => {
      if (data?.text) {
        lastAIQuestionTextRef.current = data.text;
        setTranscripts((prev) => [
          ...prev,
          {
            id: `turn_${data.turnIndex || Date.now()}`,
            sender: "ai",
            senderLabel: "AI Interviewer",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: data.text,
          },
        ]);

        // Synthesize AI spoken response via Web Speech API TTS
        if ("speechSynthesis" in window && !isMuted) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(data.text);
          utterance.onstart = () => {
            isAISpeakingRef.current = true;
            setActiveSpeaker("ai");
            setAiStatus("Speaking...");
            if (recognitionRef.current) {
              try { recognitionRef.current.abort(); } catch (_e) {}
            }
          };
          utterance.onend = () => {
            isAISpeakingRef.current = false;
            setActiveSpeaker("none");
            setAiStatus("Listening...");
            setTimeout(() => {
              if (recognitionRef.current && isMicOn) {
                try { recognitionRef.current.start(); } catch (_e) {}
              }
            }, 300);
          };
          utterance.onerror = () => {
            isAISpeakingRef.current = false;
            setActiveSpeaker("none");
            setAiStatus("Listening...");
            setTimeout(() => {
              if (recognitionRef.current && isMicOn) {
                try { recognitionRef.current.start(); } catch (_e) {}
              }
            }, 300);
          };
          window.speechSynthesis.speak(utterance);
        }
      }
    });

    socket.on("ai_interview:transcript", (data) => {
      if (data?.text) {
        setTranscripts((prev) => [
          ...prev,
          {
            id: `turn_cand_${data.turnIndex || Date.now()}`,
            sender: "candidate",
            senderLabel: sessionInfo?.candidateName || "Candidate",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: data.text,
          },
        ]);
      }
    });

    socket.on("ai_interview:ai_speaking", (data) => {
      if (data?.speaking) {
        setActiveSpeaker("ai");
        setAiStatus("Speaking...");
        setCandidateStatus("Listening...");
      } else {
        if (activeSpeaker === "ai") setActiveSpeaker("none");
        setAiStatus("Listening...");
      }
    });

    socket.on("ai_interview:candidate_speaking", (data) => {
      if (data?.speaking) {
        setActiveSpeaker("candidate");
        setCandidateStatus("Speaking...");
        setAiStatus("Listening...");
      } else {
        if (activeSpeaker === "candidate") setActiveSpeaker("none");
        setCandidateStatus("Listening...");
      }
    });

    socket.on("ai_interview:warning", (data) => {
      if (data?.message) {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
      }
    });

    socket.on("ai_interview:completed", () => {
      setSnackbarMessage("AI Interview Session Completed.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate(`/ai-interview/${inviteToken}/submitted`);
    });

    return () => {
      socket.disconnect();
    };
  }, [inviteToken, isMuted]);

  // Fullscreen & Security Listener Effect
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
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType: "FULLSCREEN_EXIT",
            clientTimestamp: new Date(),
          });
        }
      } else {
        setShowFullscreenPrompt(false);
      }
    };

    const handleBlur = () => {
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "WINDOW_BLUR",
          clientTimestamp: new Date(),
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [inviteToken]);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcripts]);

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

  const handleEndInterview = async () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (socketRef.current) {
      socketRef.current.emit("ai_interview:end", { inviteToken });
    }
    try {
      await endAIInterviewSessionApi(inviteToken);
    } catch (err) {
      console.warn("End session API error:", err);
    }
    navigate(`/ai-interview/${inviteToken}/submitted`);
  };

  return (
    <SEO title="Live AI Interview Session - engineerHUB" noIndex={true}>
      <div className="ai-room-page">

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
              {sessionInfo?.aiConfig?.roleTitle || "Technical"} Round {sessionInfo?.aiConfig?.interviewRound || 1}
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
                <span>{sessionInfo?.aiConfig?.language?.toUpperCase() || "EN-US"}</span>
              </div>
            </div>

            <div className="sidebar-topic-box">
              <span className="sidebar-topic-label">Current Topic</span>
              <span className="sidebar-topic-val">
                {Array.isArray(sessionInfo?.aiConfig?.topics) && sessionInfo.aiConfig.topics.length > 0
                  ? sessionInfo.aiConfig.topics.join(", ")
                  : "Technical Assessment"}
              </span>
            </div>

            {(() => {
              const totalQ = sessionInfo?.aiConfig?.totalQuestions || 10;
              const currentQ = transcripts.filter((t) => t.sender === "ai").length;
              const percent = Math.min(100, Math.round((currentQ / totalQ) * 100));
              return (
                <div className="sidebar-progress-box">
                  <div className="ai-progress-meta">
                    <span>Progress: {currentQ}/{totalQ}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="ai-progress-bar-track">
                    <div className="ai-progress-bar-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })()}
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
              <p>{sessionInfo?.aiConfig?.roleTitle ? `${sessionInfo.aiConfig.roleTitle} AI Evaluator` : "Senior AI Evaluator"}</p>
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
                {isCameraOn ? (
                  <video
                    ref={candidateVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Candidate Avatar"
                  />
                )}
              </div>
            </div>

            <div className="candidate-name-title">
              <h2>{sessionInfo?.candidateName || "Candidate"}</h2>
              <p>{sessionInfo?.aiConfig?.roleTitle || "Software Engineer Candidate"}</p>
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
            {transcripts.map((msg) => (
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
    </SEO>
  );
}
