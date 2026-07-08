import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision";
import { API_URL } from "../services/APIUtils";

/**
 * useProctoringMonitor
 *
 * Self-contained proctoring hook. Attaches all DOM listeners, queues events,
 * and flushes them to the backend every FLUSH_INTERVAL_MS or when the queue
 * exceeds MAX_QUEUE_SIZE. Retries on network failure with exponential backoff.
 *
 * @param {Object} options
 * @param {string}  options.inviteToken  - The current assessment invite token
 * @param {boolean} options.isActive     - Only start monitoring when session is hydrated
 *
 * @returns {{
 *   isFullscreen: () => boolean,
 *   requestFullscreen: () => Promise<void>,
 * }}
 */

const FLUSH_INTERVAL_MS = 10_000; // flush every 10 seconds
const MAX_QUEUE_SIZE = 20;        // flush early if queue grows large
const MAX_RETRY_ATTEMPTS = 3;

function useSupportsFullscreen() {
  return (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
}

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  );
}

export default function useProctoringMonitor({ inviteToken, isActive, activeProctoring }) {
  // Stable refs — no re-renders needed for proctoring state
  const queueRef = useRef([]);
  const isFlushingRef = useRef(false);
  const retryCountRef = useRef(0);
  const flushTimerRef = useRef(null);
  const tabSwitchCountRef = useRef(0);
  const hasStartedRef = useRef(false);

  // Webcam proctoring refs
  const streamRef = useRef(null);
  const videoElementRef = useRef(null);
  const detectorRef = useRef(null);
  const webcamIntervalRef = useRef(null);
  const consecutiveNoFaceRef = useRef(0);
  const hasCapturedFirstRef = useRef(false);

  /* ── Build and enqueue an event ─────────────────────────────────────── */
  const enqueue = useCallback(
    (eventType, metadata = {}) => {
      queueRef.current.push({
        eventType,
        clientTimestamp: new Date().toISOString(),
        metadata,
      });

      // Flush early if queue is full
      if (queueRef.current.length >= MAX_QUEUE_SIZE) {
        flushQueue();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* ── Flush queue to backend ─────────────────────────────────────────── */
  const flushQueue = useCallback(async () => {
    if (isFlushingRef.current) return;
    if (!queueRef.current.length) return;
    if (!inviteToken) return;

    const batch = queueRef.current.splice(0, queueRef.current.length);
    isFlushingRef.current = true;

    const attemptSend = async (attempt) => {
      try {
        await axios.post(
          `${API_URL}api/v1/candidate-assessment/${inviteToken}/proctor-events`,
          { events: batch }
        );
        retryCountRef.current = 0;
      } catch {
        if (attempt < MAX_RETRY_ATTEMPTS) {
          const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          await new Promise((r) => setTimeout(r, delay));
          return attemptSend(attempt + 1);
        }
        // Give up — put events back so they get retried next flush
        queueRef.current.unshift(...batch);
      }
    };

    await attemptSend(1);
    isFlushingRef.current = false;
  }, [inviteToken]);

  /* ── Start periodic flush timer ────────────────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    flushTimerRef.current = setInterval(() => {
      flushQueue();
    }, FLUSH_INTERVAL_MS);

    return () => {
      clearInterval(flushTimerRef.current);
    };
  }, [isActive, inviteToken, flushQueue]);

  /* ── Send ASSESSMENT_START once session is hydrated ─────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken || hasStartedRef.current) return;
    hasStartedRef.current = true;
    enqueue("ASSESSMENT_START");
  }, [isActive, inviteToken, enqueue]);

  /* ── Tab visibility (Page Visibility API) ───────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCountRef.current += 1;
        enqueue("TAB_SWITCH", { tabSwitchCount: tabSwitchCountRef.current });
      } else {
        enqueue("TAB_RETURN", { tabSwitchCount: tabSwitchCountRef.current });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, inviteToken, enqueue]);

  /* ── Window blur / focus ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    const handleBlur = () => enqueue("WINDOW_BLUR");
    const handleFocus = () => enqueue("WINDOW_FOCUS");

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isActive, inviteToken, enqueue]);

  /* ── Fullscreen change ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    const handleFullscreenChange = () => {
      if (!getFullscreenElement()) {
        enqueue("FULLSCREEN_EXIT");
      } else {
        enqueue("FULLSCREEN_ENTER");
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
  }, [isActive, inviteToken, enqueue]);

  /* ── Copy / Paste detection ──────────────────────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    const handleCopy = () => enqueue("COPY_ATTEMPT");
    const handlePaste = () => enqueue("PASTE_ATTEMPT");

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
    };
  }, [isActive, inviteToken, enqueue]);

  /* ── Right-click suppression ─────────────────────────────────────────── */
  useEffect(() => {
    if (!isActive || !inviteToken) return undefined;

    const handleContextMenu = (e) => {
      e.preventDefault();
      enqueue("RIGHT_CLICK_ATTEMPT");
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, [isActive, inviteToken, enqueue]);

  /* ── Flush on unmount / submission ──────────────────────────────────── */
  useEffect(() => {
    if (!inviteToken) return undefined;

    return () => {
      // Send ASSESSMENT_END + flush any remaining events before component tears down
      if (hasStartedRef.current) {
        queueRef.current.push({
          eventType: "ASSESSMENT_END",
          clientTimestamp: new Date().toISOString(),
          metadata: {},
        });
      }
      // Best-effort fire-and-forget on unmount
      const remaining = queueRef.current.splice(0);
      if (remaining.length > 0) {
        navigator.sendBeacon
          ? navigator.sendBeacon(
              `${API_URL}api/v1/candidate-assessment/${inviteToken}/proctor-events`,
              new Blob([JSON.stringify({ events: remaining })], { type: "application/json" })
            )
          : axios
              .post(
                `${API_URL}api/v1/candidate-assessment/${inviteToken}/proctor-events`,
                { events: remaining }
              )
              .catch(() => {});
      }
    };
  }, [inviteToken]);

  /* ── Webcam Proctoring ──────────────────────────────────────────────── */
  const captureSnapshot = useCallback(() => {
    const video = videoElementRef.current;
    if (!video || video.readyState < 2) return null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      // Optional: mirror the image
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.65);
    } catch (err) {
      console.error("[useProctoringMonitor] Snapshot capture failed:", err);
      return null;
    }
  }, []);

  const performWebcamCheck = useCallback(async () => {
    const stream = streamRef.current;
    const video = videoElementRef.current;
    const detector = detectorRef.current;

    if (!stream || !stream.active) {
      enqueue("CAMERA_STREAM_LOST");
      return;
    }

    const tracks = stream.getVideoTracks();
    if (!tracks.length) {
      enqueue("CAMERA_STREAM_LOST");
      return;
    }

    const track = tracks[0];
    if (track.readyState === "ended") {
      enqueue("CAMERA_STREAM_LOST");
      return;
    }

    if (!track.enabled) {
      const snapshot = captureSnapshot();
      enqueue("CAMERA_DISABLED", snapshot ? { snapshot } : {});
      return;
    }

    if (!video || !detector || video.readyState < 2) {
      return; // Video not playing or detector not loaded yet
    }

    try {
      const detections = detector.detect(video);
      const faceCount = detections.detections?.length || 0;
      const snapshot = captureSnapshot();

      if (faceCount === 0) {
        consecutiveNoFaceRef.current += 1;
        if (consecutiveNoFaceRef.current >= 3) {
          enqueue("NO_FACE_DETECTED", {
            failureCount: consecutiveNoFaceRef.current,
            ...(snapshot ? { snapshot } : {}),
          });
        } else {
          // Upload snapshot for intermediate checks when face is temporarily missing
          enqueue("WEBCAM_CHECK", snapshot ? { snapshot } : {});
        }
      } else {
        consecutiveNoFaceRef.current = 0;
      }

      if (faceCount > 1) {
        enqueue("MULTIPLE_FACES_DETECTED", {
          faceCount,
          ...(snapshot ? { snapshot } : {}),
        });
      }

      // Enforce snapshot capturing on every single normal check check (faceCount === 1)
      if (faceCount === 1) {
        hasCapturedFirstRef.current = true;
        enqueue("WEBCAM_CHECK", snapshot ? { snapshot } : {});
      }
    } catch (err) {
      console.error("[useProctoringMonitor] Face detection error:", err);
    }
  }, [enqueue, captureSnapshot]);
  const startWebcamMonitoring = useCallback(async () => {
    let stream = null;
    let attempts = 0;
    const maxAttempts = 3;

    // 1. Acquire the camera stream (with retries for hardware releasing)
    while (attempts < maxAttempts) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user"
          }
        });
        break; // Success!
      } catch (err) {
        attempts++;
        console.warn(`[useProctoringMonitor] Webcam acquisition attempt ${attempts} failed:`, err);
        if (attempts >= maxAttempts) {
          console.error("[useProctoringMonitor] Webcam acquisition failed after maximum retries:", err);
          enqueue("CAMERA_PERMISSION_DENIED", { error: err?.message || "Permission Denied" });
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }

    // 2. Initialize video element
    try {
      streamRef.current = stream;

      const video = document.createElement("video");
      video.width = 640;
      video.height = 480;
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      video.srcObject = stream;
      videoElementRef.current = video;

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play().then(resolve).catch(resolve);
        };
      });
    } catch (err) {
      console.error("[useProctoringMonitor] Video element initialization failed:", err);
      enqueue("CAMERA_STREAM_LOST", { error: err?.message || "Video setup failed" });
      return;
    }

    // 3. Initialize Face Detector
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
      );
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU"
        },
        runningMode: "IMAGE"
      });
      detectorRef.current = detector;

      // Attach ended listener
      if (stream.getVideoTracks().length > 0) {
        stream.getVideoTracks()[0].addEventListener("ended", () => {
          enqueue("CAMERA_STREAM_LOST");
        });
      }

      // Perform initial check once camera and model are fully loaded
      await performWebcamCheck();

      // Start loop
      const runCheckingLoop = () => {
        const nextInterval = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
        webcamIntervalRef.current = setTimeout(async () => {
          await performWebcamCheck();
          runCheckingLoop();
        }, nextInterval);
      };
      runCheckingLoop();
    } catch (err) {
      console.error("[useProctoringMonitor] Face detector model initialization failed:", err);
      // If face detector fails (e.g. CDN down), we don't flag CAMERA_PERMISSION_DENIED.
      // We can just log it or flag model loading failure, so browser events still run smoothly.
    }
  }, [enqueue, performWebcamCheck]);
  const stopWebcamMonitoring = useCallback(() => {
    if (webcamIntervalRef.current) {
      clearTimeout(webcamIntervalRef.current);
      webcamIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null;
      videoElementRef.current = null;
    }
    if (detectorRef.current) {
      detectorRef.current.close();
      detectorRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive || !inviteToken || !activeProctoring) return undefined;

    startWebcamMonitoring();

    return () => {
      stopWebcamMonitoring();
    };
  }, [isActive, inviteToken, activeProctoring, startWebcamMonitoring, stopWebcamMonitoring]);

  /* ── Public API ─────────────────────────────────────────────────────── */
  const isFullscreen = useCallback(() => Boolean(getFullscreenElement()), []);

  const requestFullscreen = useCallback(async () => {
    if (!useSupportsFullscreen()) return;
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch {
      // Fullscreen may be denied if triggered outside user gesture — ignore
    }
  }, []);

  return { isFullscreen, requestFullscreen };
}
