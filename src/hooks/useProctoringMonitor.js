import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
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

export default function useProctoringMonitor({ inviteToken, isActive }) {
  // Stable refs — no re-renders needed for proctoring state
  const queueRef = useRef([]);
  const isFlushingRef = useRef(false);
  const retryCountRef = useRef(0);
  const flushTimerRef = useRef(null);
  const tabSwitchCountRef = useRef(0);
  const hasStartedRef = useRef(false);

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
