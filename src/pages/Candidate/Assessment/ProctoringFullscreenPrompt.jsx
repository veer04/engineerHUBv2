import { useEffect, useRef, useState } from "react";
import "./ProctoringFullscreenPrompt.css";

/**
 * ProctoringFullscreenPrompt
 *
 * Shown when the assessment starts (or when the candidate exits fullscreen).
 * Non-blocking: it appears as an overlay with a single CTA button.
 *
 * @param {Object} props
 * @param {boolean}   props.show              - Whether to show the prompt
 * @param {boolean}   props.isExitWarning     - true if shown after exiting fullscreen
 * @param {Function}  props.onEnterFullscreen - Callback to request fullscreen
 * @param {Function}  props.onDismiss         - Optional dismiss without fullscreen (dev/fallback)
 */
export default function ProctoringFullscreenPrompt({
  show,
  isExitWarning = false,
  onEnterFullscreen,
  onDismiss,
}) {
  const [exiting, setExiting] = useState(false);
  const prevShow = useRef(false);

  useEffect(() => {
    if (!show && prevShow.current) {
      setExiting(true);
      const t = setTimeout(() => setExiting(false), 300);
      return () => clearTimeout(t);
    }
    prevShow.current = show;
  }, [show]);

  if (!show && !exiting) return null;

  return (
    <div className={`pfp-backdrop ${exiting ? "pfp-fade-out" : "pfp-fade-in"}`}>
      <div className={`pfp-card ${exiting ? "pfp-slide-out" : "pfp-slide-in"}`}>
        {/* Shield icon */}
        <div className="pfp-icon-ring">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pfp-shield-icon"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        <h2 className="pfp-title">
          {isExitWarning ? "Fullscreen Required" : "Proctored Assessment"}
        </h2>

        <p className="pfp-subtitle">
          {isExitWarning
            ? "You exited fullscreen mode. Please return to fullscreen to continue your assessment."
            : "This assessment is monitored. Please enter fullscreen mode to begin. Tab switches, copy/paste, and right-clicks are tracked."}
        </p>

        <ul className="pfp-rules">
          <li>
            <span className="pfp-rule-icon pfp-rule-icon--warn">⚠</span>
            Do not switch tabs or windows
          </li>
          <li>
            <span className="pfp-rule-icon pfp-rule-icon--warn">⚠</span>
            Do not copy or paste content
          </li>
          <li>
            <span className="pfp-rule-icon pfp-rule-icon--warn">⚠</span>
            Maintain fullscreen throughout
          </li>
          <li>
            <span className="pfp-rule-icon pfp-rule-icon--info">ℹ</span>
            All activity is logged and reviewed
          </li>
        </ul>

        <div className="pfp-actions">
          <button
            id="pfp-enter-fullscreen-btn"
            type="button"
            className="pfp-btn pfp-btn--primary"
            onClick={onEnterFullscreen}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pfp-btn-icon"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Enter Fullscreen &amp; Begin
          </button>

          {onDismiss && (
            <button
              type="button"
              className="pfp-btn pfp-btn--ghost"
              onClick={onDismiss}
            >
              Continue without fullscreen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
