import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision";
import { SEO } from "../../../components/SEO/SEO.jsx";
import {
  FiClock,
  FiDownload,
  FiGlobe,
  FiHelpCircle,
  FiMic,
  FiMinimize,
  FiPhoneOff,
  FiSend,
  FiSliders,
  FiTrendingUp,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { io } from "socket.io-client";
import { API_URL } from "../../../services/APIUtils";
import { fetchAIInterviewSessionApi, fetchAIInterviewTranscriptApi, endAIInterviewSessionApi } from "../../../services/aiInterviewApi";
import { sanitizeTranscriptText } from "./utils/turnManager";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import ProctoringFullscreenPrompt from "../Assessment/ProctoringFullscreenPrompt";
import ClientVAD from "./utils/clientVAD.js";
import TurnManager from "./utils/turnManager.js";
import { TURN_STATES } from "./config/turnManagerConfig.js";
import "./CandidateAIInterviewRoom.css";

const DUMMY_TRANSCRIPT = [
  {
    id: "m1",
    sender: "ai",
    senderLabel: "Sanya",
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
    senderLabel: "Sanya",
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
    senderLabel: "Sanya",
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
    senderLabel: "Sanya",
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
  const isRecognizingRef = useRef(false);
  const lastAIQuestionTextRef = useRef("");
  const vadRef = useRef(null);
  const turnManagerRef = useRef(null);
  // Chirp 3 HD audio refs — track active HTML5 Audio element & whether server audio is active
  const chirpAudioElementRef = useRef(null);  // Current playing HTML5 Audio object
  const chirpAudioActiveRef = useRef(false);  // True when Chirp audio arrived & is playing/pending
  const fallbackTTSTimerRef = useRef(null);   // Holds the browser TTS fallback timeout ID so ai_audio can cancel it

  // Question counter: only counts real technical turns (not opening/closing/exit_confirmation)
  const [currentTechQuestionCount, setCurrentTechQuestionCount] = useState(0);

  // Typewriter effect state: tracks which transcript entry is being typed out
  // Format: { id: string, fullText: string, displayedText: string }
  const [typewriterState, setTypewriterState] = useState(null);
  const typewriterTimerRef = useRef(null);

  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState(2700); // 45 mins default
  const [isMuted, setIsMuted] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState("Listening...");
  const [aiStatus, setAiStatus] = useState("Listening...");
  const [activeSpeaker, setActiveSpeaker] = useState("none"); // "ai" | "candidate" | "none"

  const transcriptScrollRef = useRef(null);

  // 1. Initialize Candidate Webcam, Microphone Stream, VAD & Turn Manager
  useEffect(() => {
    let activeStream = null;

    // Instantiate TurnManager
    const turnManager = new TurnManager({
      onStateChange: (newState) => {
        if (newState === TURN_STATES.CANDIDATE_SPEAKING) {
          setCandidateStatus("Speaking...");
          setActiveSpeaker("candidate");
        } else if (newState === TURN_STATES.POSSIBLE_END_OF_TURN) {
          setCandidateStatus("Thinking...");
        } else if (newState === TURN_STATES.LISTENING) {
          setCandidateStatus("Listening...");
        }
      },
      onSpeechStart: () => {
        if (isAISpeakingRef.current) {
          // Interrupt Chirp HTML5 audio if playing
          if (chirpAudioElementRef.current) {
            try {
              chirpAudioElementRef.current.pause();
              chirpAudioElementRef.current.currentTime = 0;
            } catch (_e) {}
            chirpAudioElementRef.current = null;
          }
          chirpAudioActiveRef.current = false;
          // Interrupt browser fallback TTS if active
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          isAISpeakingRef.current = false;
          setActiveSpeaker("candidate");
          setAiStatus("Listening...");
        }
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:speech_started", { inviteToken });
          socketRef.current.emit("ai_interview:candidate_speaking", { inviteToken, speaking: true });
        }
      },
      onSpeechStop: ({ silenceDuration }) => {
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:speech_stopped", { inviteToken, silenceDuration });
          socketRef.current.emit("ai_interview:candidate_speaking", { inviteToken, speaking: false });
        }
      },
      onTurnComplete: ({ transcript }) => {
        if (transcript && transcript.trim() && !isAISpeakingRef.current) {
          submitCandidateSpeech(transcript);
        }
      },
      onInactivity: () => {
        setCandidateStatus("Listening...");
      },
    });
    turnManagerRef.current = turnManager;

    // Instantiate ClientVAD
    const vad = new ClientVAD({
      onSpeechStart: (data) => {
        turnManagerRef.current?.handleSpeechStart(data);
      },
      onSpeechStop: (data) => {
        turnManagerRef.current?.handleSpeechStop(data);
      },
    });
    vadRef.current = vad;

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

        // Start client-side Voice Activity Detection
        vad.start(stream);
      } catch (err) {
        console.warn("Camera/Mic access error or denied:", err);
      }
    };

    startMedia();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
      vad.destroy();
      turnManager.destroy();
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

  const [liveCandidateText, setLiveCandidateText] = useState("");
  const [textInputValue, setTextInputValue] = useState("");

  // Submit candidate answer (via Turn Manager turn completion or manual Send button)
  const submitCandidateSpeech = (textToSend) => {
    const rawText = (textToSend || textInputValue || liveCandidateText || "").trim();
    const text = sanitizeTranscriptText(rawText);
    if (!text || isAISpeakingRef.current) return;

    // Suppress Echo if text repeats last AI question
    const lastAIQ = (lastAIQuestionTextRef.current || "").toLowerCase();
    const candT = text.toLowerCase();
    const isEcho =
      (lastAIQ.length > 10 && candT.includes(lastAIQ.slice(0, 25))) ||
      (candT.length > 10 && lastAIQ.includes(candT.slice(0, 25)));

    if (isEcho) {
      console.warn("Ignored duplicate AI question echo in candidate transcript:", text);
      setLiveCandidateText("");
      setTextInputValue("");
      turnManagerRef.current?.resetTurnBuffer();
      return;
    }

    console.log("[TurnManager] Emitting candidate turn to socket:", text);

    // Append candidate turn to UI transcript chat list (with deduplication)
    setTranscripts((prev) => {
      const trimmed = text.trim();
      const exists = prev.some((t) => t.sender === "candidate" && t.text.trim() === trimmed);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: `turn_candidate_${Date.now()}`,
          sender: "candidate",
          senderLabel: sessionInfo?.candidateName || "Candidate",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: text,
        },
      ];
    });

    setLiveCandidateText("");
    setTextInputValue("");
    setCandidateStatus("Listening...");
    setActiveSpeaker("none");
    turnManagerRef.current?.resetTurnBuffer();

    if (socketRef.current) {
      socketRef.current.emit("ai_interview:audio_chunk", {
        inviteToken,
        transcriptText: text,
      });
    }
  };

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

    recognition.onstart = () => {
      setCandidateStatus("Listening...");
    };

    recognition.onspeechstart = () => {
      if (isAISpeakingRef.current) return;
      turnManagerRef.current?.handleSpeechStart();
    };

    recognition.onresult = (event) => {
      if (isAISpeakingRef.current) return;
      let interimText = "";
      let finalText = "";

      for (let i = 0; i < event.results.length; ++i) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += (finalText ? " " : "") + text;
        } else {
          interimText += (interimText ? " " : "") + text;
        }
      }

      turnManagerRef.current?.handleSTTResult({ interimText, finalText });

      const fullTurnText = turnManagerRef.current ? turnManagerRef.current.getFullTranscriptText() : (finalText || interimText);
      if (fullTurnText) {
        setLiveCandidateText(fullTurnText);
        setTextInputValue(fullTurnText);
      }
    };

    recognition.onerror = (e) => {
      isRecognizingRef.current = false;
      if (e.error !== "no-speech" && e.error !== "aborted") {
        console.warn("Speech recognition error:", e.error);
      }
      setTimeout(() => {
        if (isMicOn && !isAISpeakingRef.current && !isRecognizingRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (_e) {}
        }
      }, 300);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      turnManagerRef.current?.savePriorSessionText();
      setTimeout(() => {
        if (isMicOn && !isAISpeakingRef.current && !isRecognizingRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (_e) {}
        }
      }, 250);
    };

    if (isMicOn && !isAISpeakingRef.current) {
      try {
        recognition.start();
      } catch (_e) {}
    }

    return () => {
      isRecognizingRef.current = false;
      try {
        recognition.stop();
      } catch (_e) {}
    };
  // NOTE: Intentionally omitting isMicOn from deps — recognition initializes once per session.
  // isMicOn toggling is handled via mediaStreamRef track.enabled (see Effect 3) so recognition
  // never re-initializes mid-interview which caused STT restart gaps.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteToken]);

  // 5. Socket.IO Integration Effect
  useEffect(() => {
    if (!inviteToken) return;

    // Fetch initial session metadata and transcript history
    // If session is already COMPLETED, redirect immediately — prevent re-entry
    Promise.all([
      fetchAIInterviewSessionApi(inviteToken),
      fetchAIInterviewTranscriptApi(inviteToken).catch(() => null),
    ])
      .then(([sessionRes, transcriptRes]) => {
        if (sessionRes?.success && sessionRes?.data) {
          const sessionData = sessionRes.data;
          setSessionInfo(sessionData);

          // ── Block re-entry into completed/ended interviews ──
          if (
            sessionData.status === "COMPLETED" ||
            sessionData.status === "CANCELLED" ||
            !sessionData.isActive
          ) {
            navigate(`/ai-interview/${inviteToken}/submitted`);
            return;
          }

          if (sessionData.secondsRemaining) {
            setSecondsRemaining(sessionData.secondsRemaining);
          } else if (sessionData.aiConfig?.durationMinutes) {
            setSecondsRemaining(sessionData.aiConfig.durationMinutes * 60);
          }
        }
        if (transcriptRes?.data?.transcripts && Array.isArray(transcriptRes.data.transcripts)) {
          const formatted = transcriptRes.data.transcripts.map((t) => ({
            id: t._id || `turn_${t.turnIndex}`,
            sender: t.speaker || "ai",
            senderLabel: t.speakerLabel || (t.speaker === "ai" ? "Sanya" : "Candidate"),
            time: new Date(t.timestamp || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: t.text,
            questionType: t.questionType,
          }));
          setTranscripts(formatted);
          // Restore tech question count from loaded transcript
          const techCount = formatted.filter(
            (t) => t.sender === "ai" &&
              t.questionType !== "opening" &&
              t.questionType !== "closing" &&
              t.questionType !== "exit_confirmation"
          ).length;
          setCurrentTechQuestionCount(techCount);
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

    // Handle server-sent errors — specifically block re-entry into completed sessions
    socket.on("error", (err) => {
      if (err?.code === "SESSION_COMPLETED") {
        console.warn("[Interview] Session already completed — redirecting to submitted page.");
        socket.disconnect();
        navigate(`/ai-interview/${inviteToken}/submitted`);
      }
    });

    socket.on("ai_interview:started", (data) => {
      setSnackbarMessage("AI Technical Interview Session Started.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    });

    socket.on("ai_interview:timer_update", (data) => {
      if (data && typeof data.secondsRemaining === "number") {
        setSecondsRemaining(data.secondsRemaining);
      }
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
      } else if (currentState === "EXIT_CONFIRMATION_PENDING") {
        setAiStatus("Awaiting Exit Confirmation...");
      } else if (currentState === "EXIT_PENDING" || currentState === "ENDING") {
        setAiStatus("Concluding Interview...");
      }
    });

    socket.on("ai_interview:exit_warning", (data) => {
      if (data?.message) {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
      }
    });

    socket.on("ai_interview:exit_confirmation", (data) => {
      if (data?.message) {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      }
    });

    socket.on("ai_interview:ending", (data) => {
      setSnackbarMessage("Interview concluding... Thank you.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    });

    socket.on("ai_interview:question", (data) => {
      const isVertex = data?.questionSource?.includes("VERTEX") || data?.questionSource?.includes("DYNAMIC");
      const sourceTag = isVertex ? "⚡ VERTEX_AI_AGENT_PLATFORM" : "📌 CONTEXT_SYNTHESIZER";
      console.log(`🤖 [SOCKET RECV] Question Turn ${data?.turnIndex} [Source: ${sourceTag}] (${data?.questionSource || "Unknown"}) -> "${data?.text}"`);
      if (data?.text) {
        const turnId = `turn_${data.turnIndex || Date.now()}`;
        const questionType = data.questionType || "technical_core";
        lastAIQuestionTextRef.current = data.text;

        // Increment technical question counter — skip opening, closing, exit_confirmation
        const isTechnicalTurn =
          questionType !== "opening" &&
          questionType !== "closing" &&
          questionType !== "exit_confirmation";
        if (isTechnicalTurn) {
          setCurrentTechQuestionCount((prev) => prev + 1);
        }

        // Add to transcript with empty text initially — typewriter will fill it in
        setTranscripts((prev) => [
          ...prev,
          {
            id: turnId,
            sender: "ai",
            senderLabel: data.speakerLabel || "Sanya",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: "",           // Start empty — typewriter will fill this in
            questionType,
          },
        ]);

        // Start typewriter animation for this turn
        if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
        const fullText = data.text;
        const charDelayMs = Math.max(18, Math.min(38, Math.round(60000 / (fullText.length * 4 || 1))));
        let charIndex = 0;
        typewriterTimerRef.current = setInterval(() => {
          charIndex++;
          const partial = fullText.slice(0, charIndex);
          setTranscripts((prev) =>
            prev.map((t) => (t.id === turnId ? { ...t, text: partial } : t))
          );
          if (charIndex >= fullText.length) {
            clearInterval(typewriterTimerRef.current);
            typewriterTimerRef.current = null;
          }
        }, charDelayMs);

        // Reset Chirp audio flag — backend will send ai_interview:ai_audio shortly
        chirpAudioActiveRef.current = false;

        // ── Browser TTS Fallback DISABLED ──────────────────────────────────────
        // Chirp 3 HD (server-side) is now the sole TTS provider.
        // The fallback block below is intentionally commented out to prevent the
        // 1-2s browser voice overlap that occurred while Chirp was synthesizing.
        //
        // Re-enable ONLY if Chirp is completely unavailable (e.g. no GCP credentials):
        //
        // if (!isMuted) {
        //   fallbackTTSTimerRef.current = setTimeout(() => {
        //     if (chirpAudioActiveRef.current) return; // Chirp took over — abort
        //     if (!("speechSynthesis" in window)) return;
        //     console.warn("[Chirp TTS] No server audio received within 1.5s — activating browser TTS fallback");
        //     window.speechSynthesis.cancel();
        //     window.speechSynthesis.resume();
        //     const cleanSpokenText = (data.text || "")
        //       .replace(/```[a-z]*\n?/gi, "")
        //       .replace(/```/g, "")
        //       .replace(/`/g, "")
        //       .replace(/\*/g, "")
        //       .trim();
        //     const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
        //     utterance.rate = 0.95;
        //     utterance.pitch = 1.0;
        //     const speechTimeout = setTimeout(() => {
        //       if (isAISpeakingRef.current) {
        //         isAISpeakingRef.current = false;
        //         setActiveSpeaker("none");
        //         setAiStatus("Listening...");
        //         if (recognitionRef.current && isMicOn) { try { recognitionRef.current.start(); } catch (_e) {} }
        //       }
        //     }, 12000);
        //     utterance.onstart = () => { isAISpeakingRef.current = true; setActiveSpeaker("ai"); setAiStatus("Speaking..."); if (recognitionRef.current) { try { recognitionRef.current.abort(); } catch (_e) {} } };
        //     utterance.onend = () => { clearTimeout(speechTimeout); isAISpeakingRef.current = false; setActiveSpeaker("none"); setAiStatus("Listening..."); setTimeout(() => { if (recognitionRef.current && isMicOn) { try { recognitionRef.current.start(); } catch (_e) {} } }, 300); };
        //     utterance.onerror = () => { clearTimeout(speechTimeout); isAISpeakingRef.current = false; setActiveSpeaker("none"); setAiStatus("Listening..."); setTimeout(() => { if (recognitionRef.current && isMicOn) { try { recognitionRef.current.start(); } catch (_e) {} } }, 300); };
        //     window.speechSynthesis.speak(utterance);
        //   }, 1500);
        // }
        // ── End of Browser TTS Fallback ──────────────────────────────────────
      }
    });

    // ── Google Chirp 3 HD Audio Player ──────────────────────────────────────────
    // Receives Base64-encoded MP3 from the backend Chirp TTS service.
    // Plays via HTML5 Audio API → works identically on Chrome, Safari, Firefox,
    // macOS, Ubuntu, iOS, and Android with the same Indian female voice.
    socket.on("ai_interview:ai_audio", (data) => {
      if (!data?.audioBase64 || isMuted) return;

      // Cancel any pending browser TTS fallback timer — Chirp audio has arrived
      if (fallbackTTSTimerRef.current) {
        clearTimeout(fallbackTTSTimerRef.current);
        fallbackTTSTimerRef.current = null;
      }
      // Cancel any lingering browser TTS that might have slipped through
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      // Mark Chirp audio as active — suppresses browser TTS fallback
      chirpAudioActiveRef.current = true;

      try {
        // Stop any previous Chirp audio that is still playing
        if (chirpAudioElementRef.current) {
          try {
            chirpAudioElementRef.current.pause();
            chirpAudioElementRef.current.currentTime = 0;
          } catch (_e) {}
          chirpAudioElementRef.current = null;
        }
        // Also cancel any lingering browser TTS
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }

        // Decode Base64 MP3 → Blob URL → HTML5 Audio
        const byteCharacters = atob(data.audioBase64);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }
        const audioBlob = new Blob([byteArray], { type: data.mimeType || "audio/mpeg" });
        const audioBlobUrl = URL.createObjectURL(audioBlob);

        const audioEl = new Audio(audioBlobUrl);
        chirpAudioElementRef.current = audioEl;

        audioEl.onplay = () => {
          isAISpeakingRef.current = true;
          setActiveSpeaker("ai");
          setAiStatus("Speaking...");
          // Stop candidate speech recognition while Sanya is speaking
          if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch (_e) {}
          }
          console.log("🔊 [Chirp 3 HD] Sanya audio playback started");
        };

        audioEl.onended = () => {
          isAISpeakingRef.current = false;
          chirpAudioActiveRef.current = false;
          chirpAudioElementRef.current = null;
          setActiveSpeaker("none");
          setAiStatus("Listening...");
          URL.revokeObjectURL(audioBlobUrl); // Free Blob URL memory
          // Restart speech recognition for candidate
          setTimeout(() => {
            if (recognitionRef.current && isMicOn) {
              try { recognitionRef.current.start(); } catch (_e) {}
            }
          }, 300);
          console.log("🔇 [Chirp 3 HD] Sanya audio playback ended — resuming candidate mic");
        };

        audioEl.onerror = (e) => {
          console.warn("[Chirp 3 HD] Audio playback error:", e);
          isAISpeakingRef.current = false;
          chirpAudioActiveRef.current = false;
          chirpAudioElementRef.current = null;
          setActiveSpeaker("none");
          setAiStatus("Listening...");
          URL.revokeObjectURL(audioBlobUrl);
          setTimeout(() => {
            if (recognitionRef.current && isMicOn) {
              try { recognitionRef.current.start(); } catch (_e) {}
            }
          }, 300);
        };

        // .play() should always succeed since the interview was started by user gesture.
        // On any failure, log a warning and recover state — no browser TTS degradation
        // (keeping voice consistent across all devices is the primary goal).
        audioEl.play().catch((err) => {
          console.warn("[Chirp 3 HD] Audio play() blocked:", err.message);
          // ── Safari/browser TTS degradation DISABLED ──────────────────────────
          // Keeping this commented so we don't regress to OS-level voice inconsistency.
          // Re-enable only if confirmed Chirp is completely broken in production.
          //
          // chirpAudioActiveRef.current = false;
          // if ("speechSynthesis" in window && data.text) {
          //   const utterance = new SpeechSynthesisUtterance(
          //     (data.text || "").replace(/```[\s\S]*?```/g, "").replace(/[`*#]/g, "").trim()
          //   );
          //   utterance.rate = 0.95;
          //   utterance.onstart = () => { isAISpeakingRef.current = true; setActiveSpeaker("ai"); setAiStatus("Speaking..."); };
          //   utterance.onend = () => { isAISpeakingRef.current = false; setActiveSpeaker("none"); setAiStatus("Listening..."); setTimeout(() => { if (recognitionRef.current && isMicOn) { try { recognitionRef.current.start(); } catch (_e) {} } }, 300); };
          //   window.speechSynthesis.speak(utterance);
          // }
          // ── End browser TTS degradation ──────────────────────────────────────

          // Recover state so interview doesn't get stuck
          isAISpeakingRef.current = false;
          chirpAudioActiveRef.current = false;
          chirpAudioElementRef.current = null;
          setActiveSpeaker("none");
          setAiStatus("Listening...");
          URL.revokeObjectURL(audioBlobUrl);
          setTimeout(() => {
            if (recognitionRef.current && isMicOn) {
              try { recognitionRef.current.start(); } catch (_e) {}
            }
          }, 300);
        });
      } catch (err) {
        console.warn("[Chirp 3 HD] Failed to decode/play audio:", err.message);
        chirpAudioActiveRef.current = false;
      }
    });

    socket.on("ai_interview:transcript", (data) => {
      if (data?.text) {
        setTranscripts((prev) => {
          const trimmed = data.text.trim();
          const exists = prev.some(
            (t) =>
              t.id === `turn_cand_${data.turnIndex}` ||
              t.id === `turn_${data.turnIndex}` ||
              (t.sender === "candidate" && t.text.trim() === trimmed)
          );
          if (exists) return prev;
          return [
            ...prev,
            {
              id: `turn_cand_${data.turnIndex || Date.now()}`,
              sender: "candidate",
              senderLabel: data.speakerLabel || sessionInfo?.candidateName || "Candidate",
              time: new Date(data.timestamp || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              text: trimmed,
            },
          ];
        });
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
      // Suppress generic 5s/12s/25s silence popups to prevent distracting the candidate
      if (data?.promptType && data.promptType.startsWith("silence_")) {
        return;
      }
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
      // Clear typewriter timer if still running (e.g. navigating away mid-animation)
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }

    };
  }, [inviteToken, isMuted]);

  // Fullscreen & Security Listener Effect
  const [showEndConfirmationModal, setShowEndConfirmationModal] = useState(false);
  const isEndingInterviewRef = useRef(false);

  // MediaPipe Face Detector refs
  const detectorRef = useRef(null);
  const isMediaPipeLoadingRef = useRef(false);

  // Initialize MediaPipe FaceDetector (with GPU -> CPU fallback)
  useEffect(() => {
    let isMounted = true;
    const initFaceDetector = async () => {
      if (detectorRef.current || isMediaPipeLoadingRef.current) return;
      isMediaPipeLoadingRef.current = true;
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
        );
        let detector = null;
        try {
          detector = await FaceDetector.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
              delegate: "GPU",
            },
            runningMode: "IMAGE",
          });
        } catch (gpuErr) {
          console.warn("[CandidateAIInterviewRoom] MediaPipe GPU delegate failed, falling back to CPU:", gpuErr);
          detector = await FaceDetector.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
              delegate: "CPU",
            },
            runningMode: "IMAGE",
          });
        }
        if (isMounted) {
          detectorRef.current = detector;
          console.log("🟢 MediaPipe FaceDetector initialized successfully in AI Interview room.");
        } else if (detector) {
          detector.close();
        }
      } catch (err) {
        console.error("[CandidateAIInterviewRoom] MediaPipe FaceDetector init error:", err);
      } finally {
        isMediaPipeLoadingRef.current = false;
      }
    };

    initFaceDetector();

    return () => {
      isMounted = false;
      if (detectorRef.current) {
        try {
          detectorRef.current.close();
        } catch (_e) {}
        detectorRef.current = null;
      }
    };
  }, []);

  const captureSnapshot = useCallback(() => {
    const video = candidateVideoRef.current;
    if (!video || video.readyState < 2) return null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.65);
    } catch (err) {
      console.error("Webcam snapshot capture error:", err);
      return null;
    }
  }, []);

  // Perform MediaPipe Face Detection + Stream status check
  const performWebcamProctorCheck = useCallback(async () => {
    if (isEndingInterviewRef.current || !inviteToken) return;

    const stream = mediaStreamRef.current;
    const video = candidateVideoRef.current;
    const detector = detectorRef.current;

    if (!stream || !stream.active) {
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "CAMERA_STREAM_LOST",
          clientTimestamp: new Date(),
          metadata: {},
        });
      }
      return;
    }

    const tracks = stream.getVideoTracks();
    if (!tracks.length || tracks[0].readyState === "ended") {
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "CAMERA_STREAM_LOST",
          clientTimestamp: new Date(),
          metadata: {},
        });
      }
      return;
    }

    const track = tracks[0];
    if (!track.enabled || !isCameraOn) {
      const snapshot = captureSnapshot();
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "CAMERA_DISABLED",
          clientTimestamp: new Date(),
          metadata: snapshot ? { snapshot } : {},
        });
      }
      return;
    }

    const snapshot = captureSnapshot();

    // If detector is ready and video is playing, perform face detection via MediaPipe
    if (detector && video && video.readyState >= 2) {
      try {
        const detections = detector.detect(video);
        const faceCount = detections?.detections?.length || 0;

        let eventType = "WEBCAM_CHECK";
        if (faceCount === 0) {
          eventType = "NO_FACE_DETECTED";
        } else if (faceCount > 1) {
          eventType = "MULTIPLE_FACES_DETECTED";
        }

        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType,
            clientTimestamp: new Date(),
            metadata: {
              faceCount,
              ...(snapshot ? { snapshot } : {}),
            },
          });
        }
        return;
      } catch (err) {
        console.error("[CandidateAIInterviewRoom] Face detection error:", err);
      }
    }

    // Fallback snapshot check if MediaPipe detector is loading
    if (snapshot && socketRef.current) {
      socketRef.current.emit("ai_interview:proctor_event", {
        inviteToken,
        eventType: "WEBCAM_CHECK",
        clientTimestamp: new Date(),
        metadata: { snapshot },
      });
    }
  }, [inviteToken, isCameraOn, captureSnapshot]);

  // Periodic Webcam Proctoring & Face Detection Check (Every 15s)
  useEffect(() => {
    if (!inviteToken) return;

    // Initial check after 3 seconds
    const initTimer = setTimeout(() => {
      performWebcamProctorCheck();
    }, 3000);

    // Periodic check every 15 seconds
    const interval = setInterval(() => {
      performWebcamProctorCheck();
    }, 15000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, [inviteToken, performWebcamProctorCheck]);

  // Browser Anti-Cheat Security Event Listeners (Copy, Paste, Right Click, Tab Switch, Blur, Focus, Fullscreen)
  useEffect(() => {
    if (!inviteToken) return undefined;

    const handleCopy = () => {
      if (isEndingInterviewRef.current) return;
      const snapshot = captureSnapshot();
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "COPY_ATTEMPT",
          clientTimestamp: new Date(),
          metadata: snapshot ? { snapshot } : {},
        });
      }
    };

    const handlePaste = () => {
      if (isEndingInterviewRef.current) return;
      const snapshot = captureSnapshot();
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "PASTE_ATTEMPT",
          clientTimestamp: new Date(),
          metadata: snapshot ? { snapshot } : {},
        });
      }
    };

    const handleContextMenu = (e) => {
      if (isEndingInterviewRef.current) return;
      e.preventDefault();
      const snapshot = captureSnapshot();
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "RIGHT_CLICK_ATTEMPT",
          clientTimestamp: new Date(),
          metadata: snapshot ? { snapshot } : {},
        });
      }
    };

    const handleVisibilityChange = () => {
      if (isEndingInterviewRef.current) return;
      const snapshot = captureSnapshot();
      if (document.hidden) {
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType: "TAB_SWITCH",
            clientTimestamp: new Date(),
            metadata: snapshot ? { snapshot } : {},
          });
        }
      } else {
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType: "TAB_RETURN",
            clientTimestamp: new Date(),
            metadata: snapshot ? { snapshot } : {},
          });
        }
      }
    };

    const handleBlur = () => {
      if (isEndingInterviewRef.current) return;
      const snapshot = captureSnapshot();
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "WINDOW_BLUR",
          clientTimestamp: new Date(),
          metadata: snapshot ? { snapshot } : {},
        });
      }
    };

    const handleFocus = () => {
      if (isEndingInterviewRef.current) return;
      if (socketRef.current) {
        socketRef.current.emit("ai_interview:proctor_event", {
          inviteToken,
          eventType: "WINDOW_FOCUS",
          clientTimestamp: new Date(),
          metadata: {},
        });
      }
    };

    const handleFullscreenChange = () => {
      if (isEndingInterviewRef.current) return;
      const fsEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      const snapshot = captureSnapshot();
      if (!fsEl) {
        setIsExitWarning(true);
        setShowFullscreenPrompt(true);
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType: "FULLSCREEN_EXIT",
            clientTimestamp: new Date(),
            metadata: snapshot ? { snapshot } : {},
          });
        }
      } else {
        setShowFullscreenPrompt(false);
        if (socketRef.current) {
          socketRef.current.emit("ai_interview:proctor_event", {
            inviteToken,
            eventType: "FULLSCREEN_ENTER",
            clientTimestamp: new Date(),
            metadata: {},
          });
        }
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [inviteToken, captureSnapshot]);

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

  const [showAudioSettingsModal, setShowAudioSettingsModal] = useState(false);

  const handleRaiseHand = () => {
    if (socketRef.current) {
      socketRef.current.emit("ai_interview:raise_hand", {
        inviteToken,
        candidateName: sessionInfo?.candidateName || "Candidate",
      });
    }
    setSnackbarMessage("Hand raised. Notification sent to live HR & AI observers.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleToggleMuteAI = () => {
    setIsMuted((prev) => {
      const nextMute = !prev;
      if (nextMute && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (_e) {}
      }
      setSnackbarMessage(nextMute ? "AI Speech Output Muted" : "AI Speech Output Unmuted");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      return nextMute;
    });
  };

  const handleAudioSettings = () => {
    setShowAudioSettingsModal(true);
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
        setSnackbarMessage("Exited Fullscreen mode.");
      } else {
        await requestRoomFullscreen();
        setSnackbarMessage("Entered Fullscreen mode.");
      }
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const handleEndInterviewClick = () => {
    setShowEndConfirmationModal(true);
  };

  const confirmForceExitInterview = async () => {
    isEndingInterviewRef.current = true;
    setShowEndConfirmationModal(false);
    setShowFullscreenPrompt(false);

    // 1. Immediately cancel all Web Speech Synthesis & Speech Recognition
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_e) {}
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_e) {}
    }
    if (turnManagerRef.current) {
      try {
        turnManagerRef.current.stopListening();
      } catch (_e) {}
    }

    // 2. Immediately stop all MediaStream tracks (Camera & Microphone)
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      } catch (_e) {}
    }
    if (candidateVideoRef.current?.srcObject) {
      try {
        const stream = candidateVideoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        candidateVideoRef.current.srcObject = null;
      } catch (_e) {}
    }

    // 3. Immediately emit socket end session event and disconnect socket
    if (socketRef.current) {
      try {
        socketRef.current.emit("ai_interview:end", { inviteToken });
        socketRef.current.disconnect();
      } catch (_e) {}
    }

    // 4. Instantly exit fullscreen if active (non-blocking)
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch (_e) {}
    }

    // 5. Trigger end session API asynchronously non-blocking
    endAIInterviewSessionApi(inviteToken).catch((err) => {
      console.warn("End session API non-blocking error:", err);
    });

    // 6. Instantly navigate to submitted page without delay!
    setSnackbarMessage("AI Interview successfully ended & submitted.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate(`/ai-interview/${inviteToken}/submitted`);
  };

  return (
    <SEO title="Live AI Interview Session - engineerHUB" noIndex={true}>
      <div className="ai-room-page">

      {/* ── Professional End Interview Confirmation Modal ───────────────────── */}
      {showEndConfirmationModal && (
        <div className="ai-modal-overlay">
          <div className="ai-modal-card confirm-end-modal-card">
            <div className="confirm-end-icon-wrapper">
              <FiPhoneOff />
            </div>
            <h3 className="confirm-end-title">End AI Interview Session?</h3>
            <p className="confirm-end-desc">
              Are you sure you want to conclude your technical interview now? Your recorded spoken answers and evaluation data will be submitted for recruiter report generation.
            </p>
            <div className="confirm-end-actions">
              <button
                type="button"
                className="btn-modal-action --secondary"
                onClick={() => setShowEndConfirmationModal(false)}
              >
                Continue Interview
              </button>
              <button
                type="button"
                className="btn-modal-action confirm-exit-btn"
                onClick={confirmForceExitInterview}
              >
                Yes, End Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Audio Settings Modal ─────────────────── */}
      {showAudioSettingsModal && (
        <div className="ai-modal-overlay">
          <div className="ai-modal-card" style={{ maxWidth: "450px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiSliders style={{ color: "#138382" }} /> Audio Input &amp; Output Settings
              </h3>
              <button
                type="button"
                className="ai-modal-close-btn"
                onClick={() => setShowAudioSettingsModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#64748b" }}
              >
                <FiX />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", display: "block", marginBottom: "0.4rem" }}>
                  Microphone Input Device
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f172a", fontSize: "0.88rem" }}>
                  <FiMic style={{ color: "#10b981" }} />
                  <span>Default Microphone (Built-in Audio)</span>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", display: "block", marginBottom: "0.4rem" }}>
                  Speech Output Synthesis
                </label>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", color: "#0f172a" }}>
                    AI Voice Output: <strong>{isMuted ? "Muted" : "Active (100%)"}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleMuteAI}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}
                  >
                    {isMuted ? "Unmute AI" : "Mute AI"}
                  </button>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", display: "block", marginBottom: "0.4rem" }}>
                  Audio Test Signal
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if ("speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      const synth = new SpeechSynthesisUtterance("Audio output test successful.");
                      synth.volume = 1;
                      window.speechSynthesis.speak(synth);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    background: "#138382",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.85rem"
                  }}
                >
                  🔊 Test Audio Output
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAudioSettingsModal(false)}
              style={{
                width: "100%",
                marginTop: "1.25rem",
                padding: "0.6rem",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5e1",
                background: "#f1f5f9",
                color: "#334155",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

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
                  : typeof sessionInfo?.aiConfig?.topics === "string" && sessionInfo.aiConfig.topics.trim()
                  ? sessionInfo.aiConfig.topics
                  : "Technical Assessment"}
              </span>
            </div>

            {(() => {
              const totalQ = sessionInfo?.aiConfig?.totalQuestions ||
                Math.max(4, Math.round(((sessionInfo?.aiConfig?.durationMinutes || 15) / 1.6667)));
              // Use the live technical question counter (excludes opening/closing/exit turns)
              // Both currentQ and displayTotal grow dynamically if AI asks more questions than configured
              const currentQ = currentTechQuestionCount;
              const displayTotal = currentTechQuestionCount > totalQ ? currentTechQuestionCount : totalQ;
              const percent = Math.min(100, Math.round((currentTechQuestionCount / displayTotal) * 100));
              return (
                <div className="sidebar-progress-box">
                  <div className="ai-progress-meta" style={{ display: "flex", flexDirection: "column", gap: "0.2rem", width: "100%", marginBottom: "6px" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1e293b" }}>
                      {currentTechQuestionCount === 0
                        ? "Welcome"
                        : `Question ${currentQ} of ${displayTotal}`}
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#64748b" }}>
                      {currentTechQuestionCount === 0 ? "Introduction" : `${percent}% Complete`}
                    </div>
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
            {/* <button type="button" className="sidebar-ctrl-btn" onClick={handleAudioSettings} title="Audio Settings">
              <FiSliders />
              <span>Audio Settings</span>
            </button> */}
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
          <button type="button" className="btn-end-interview-sidebar" onClick={handleEndInterviewClick} title="End Call">
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
                  src="https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/banners/sanya.png"
                  alt="Sanya Avatar"
                />
              </div>
            </div>

            <div className="ai-name-title">
              <h2>Sanya</h2>
              <p>{sessionInfo?.aiConfig?.roleTitle ? `${sessionInfo.aiConfig.roleTitle} AI Evaluator` : "AI Technical Interviewer"}</p>
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

          {/* Interactive Candidate Response Bar (Live Mic Preview & Text Fallback) */}
          <div className="transcript-input-bar">
            {liveCandidateText && (
              <div className="live-speech-preview">
                <FiMic className="live-mic-pulse" /> Live Speech: "{liveCandidateText}"
              </div>
            )}
            <div className="input-action-row">
              <input
                type="text"
                className="transcript-input-field"
                placeholder={isMicOn ? "Speak into your mic or type your answer..." : "Mic is muted. Type your answer here..."}
                value={textInputValue}
                onChange={(e) => setTextInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && textInputValue.trim()) {
                    submitCandidateSpeech(textInputValue);
                  }
                }}
              />
              <button
                type="button"
                className="btn-send-answer"
                onClick={() => submitCandidateSpeech(textInputValue || liveCandidateText)}
                disabled={!textInputValue.trim() && !liveCandidateText.trim()}
              >
                <FiSend /> Send Answer
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </SEO>
);
}
