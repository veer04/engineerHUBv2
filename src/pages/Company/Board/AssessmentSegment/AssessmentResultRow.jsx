import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiMail,
  FiShield,
  FiSlash,
} from "react-icons/fi";

function getAttemptStatusMeta(status) {
  switch (status) {
    case "Evaluated":
      return {
        className: "assessment-result-status --evaluated",
        label: "Done",
      };
    case "Expired":
      return {
        className: "assessment-result-status --expired",
        label: "Expired",
      };
    case "Upcoming":
      return {
        className: "assessment-result-status --upcoming",
        label: "Upcoming",
      };
    case "Attempting":
    default:
      return {
        className: "assessment-result-status --attempting",
        label: "Attempting",
      };
  }
}

function formatAssessmentTimeRange(scheduledAt, durationInMinutes) {
  if (!scheduledAt) return "TBD";
  const start = new Date(scheduledAt);
  if (Number.isNaN(start.getTime())) return "TBD";
  const end = new Date(start.getTime() + (durationInMinutes || 0) * 60 * 1000);

  const startStr = start.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const endStr = end.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${startStr} - ${endStr} IST`;
}

/* ── Risk band derived from event counts ───────────────────────────────── */
function getRiskBandFromCounts(counts = {}) {
  if (!counts) return null;
  const pts =
    (counts.TAB_SWITCH || 0) * 2 +
    (counts.WINDOW_BLUR || 0) * 1 +
    (counts.FULLSCREEN_EXIT || 0) * 3 +
    (counts.COPY_ATTEMPT || 0) * 4 +
    (counts.PASTE_ATTEMPT || 0) * 4 +
    (counts.RIGHT_CLICK_ATTEMPT || 0) * 2 +
    (counts.NO_FACE_DETECTED || 0) * 5 +
    (counts.MULTIPLE_FACES_DETECTED || 0) * 10 +
    (counts.CAMERA_DISABLED || 0) * 15 +
    (counts.CAMERA_STREAM_LOST || 0) * 15 +
    (counts.CAMERA_PERMISSION_DENIED || 0) * 20;
  if (pts >= 25) return "High";
  if (pts >= 10) return "Medium";
  return "Low";
}

function ProctoringCell({ proctoringCounts, onMonitor }) {
  if (!proctoringCounts) {
    return (
      <div className="proctor-cell proctor-cell--none">
        <span>No data</span>
      </div>
    );
  }

  const band = getRiskBandFromCounts(proctoringCounts);
  const tabSwitches = proctoringCounts.TAB_SWITCH || 0;
  const copies = (proctoringCounts.COPY_ATTEMPT || 0) + (proctoringCounts.PASTE_ATTEMPT || 0);
  const fsExits = proctoringCounts.FULLSCREEN_EXIT || 0;
  const camDisabled = proctoringCounts.CAMERA_DISABLED || 0;
  const camLost = proctoringCounts.CAMERA_STREAM_LOST || 0;
  const camDenied = proctoringCounts.CAMERA_PERMISSION_DENIED || 0;
  const noFace = proctoringCounts.NO_FACE_DETECTED || 0;
  const multiFace = proctoringCounts.MULTIPLE_FACES_DETECTED || 0;

  return (
    <div className="proctor-cell">
      <span
        className={`proctor-risk-badge proctor-risk-badge--${
          band === "High" ? "high" : band === "Medium" ? "medium" : "low"
        }`}
      >
        {band === "High" ? "🔴" : band === "Medium" ? "🟡" : "🟢"} {band}
      </span>
      <div className="proctor-cell-hints">
        {tabSwitches > 0 && (
          <span className="proctor-hint">⇥ {tabSwitches} switch{tabSwitches !== 1 ? "es" : ""}</span>
        )}
        {copies > 0 && (
          <span className="proctor-hint">⎘ {copies} copy/paste</span>
        )}
        {fsExits > 0 && (
          <span className="proctor-hint">⛶ {fsExits} fullscreen</span>
        )}
        {camDisabled > 0 && (
          <span className="proctor-hint">📷 Disabled ({camDisabled})</span>
        )}
        {camLost > 0 && (
          <span className="proctor-hint">🔌 Stream Lost ({camLost})</span>
        )}
        {camDenied > 0 && (
          <span className="proctor-hint">🚫 Denied ({camDenied})</span>
        )}
        {noFace > 0 && (
          <span className="proctor-hint">👤 No Face ({noFace})</span>
        )}
        {multiFace > 0 && (
          <span className="proctor-hint">👥 Multi Faces ({multiFace})</span>
        )}
      </div>
    </div>
  );
}

function LiveActivityCell({ liveActivityType, liveActivityText }) {
  if (liveActivityType === "active") {
    return (
      <div className="assessment-live-indicator --active">
        <span className="dot" />
        <span>{liveActivityText || "Active now"}</span>
      </div>
    );
  }

  if (liveActivityType === "warning") {
    return (
      <div className="assessment-live-indicator --warning">
        <FiAlertTriangle />
        <span>{liveActivityText || "Tab switched"}</span>
      </div>
    );
  }

  if (liveActivityType === "suspicious") {
    return (
      <div className="assessment-live-indicator --suspicious">
        <FiAlertTriangle />
        <span>{liveActivityText || "Suspicious"}</span>
      </div>
    );
  }

  return (
    <span className="assessment-live-indicator --muted">
      {liveActivityText || "No activity"}
    </span>
  );
}

function ScoreCell({ score, isRealtime }) {
  if (typeof score === "number") {
    return (
      <div className="assessment-score-wrap">
        <span className="assessment-score-value">{score}/100</span>
      </div>
    );
  }

  return (
    <div className="assessment-score-wrap">
      {isRealtime ? (
        <span className="assessment-score-live-icon" title="AI score in progress">
          <FiActivity />
        </span>
      ) : null}
    </div>
  );
}

export default function AssessmentResultRow({
  row,
  onMonitor,
  onSendMail,
  onMarkInterview,
  onBlockCandidate,
}) {
  const navigate = useNavigate();
  const attemptMeta = getAttemptStatusMeta(row.attemptStatus);
  const isExpired = row.attemptStatus === "Expired";

  const handleMonitor = () => {
    // Navigate to the proctoring report page
    // Determine base path from current URL prefix
    const basePath = window.location.pathname.startsWith("/career")
      ? `/career/jobs/board/${row.hiringId}/assessment`
      : `/company/jobs/board/${row.hiringId}/assessment`;

    navigate(
      `/assessment-proctor/${row.hiringId}/${row.inviteId}/report?returnPath=${encodeURIComponent(basePath)}`
    );
    onMonitor(row);
  };

  return (
    <tr className={`assessment-result-row ${isExpired ? "--expired" : ""}`}>
      <td className="assessment-result-cell">
        <div className="assessment-result-candidate">
          <div className="assessment-result-candidate-meta">
            <p className="name">{row.candidateName}</p>
            <p className="email">{row.candidateEmail}</p>
          </div>
        </div>
      </td>

      <td className="assessment-result-cell">
        <p className="assessment-name">{row.assessmentName}</p>
        <p className="assessment-skills-text">
          {Array.isArray(row.skills) && row.skills.length > 0
            ? row.skills.join(", ")
            : "No skills"}
        </p>
        <p className="assessment-time-range-text" title="Scheduled assessment window (IST)">
          📅 {formatAssessmentTimeRange(row.scheduledAt, row.durationInMinutes)}
        </p>
      </td>

      <td className="assessment-result-cell">
        <span className={attemptMeta.className}>{attemptMeta.label}</span>
      </td>

      <td className="assessment-result-cell">
        <LiveActivityCell
          liveActivityType={row.liveActivityType}
          liveActivityText={row.liveActivityText}
        />
      </td>

      <td className="assessment-result-cell">
        <span className="assessment-phone-value">{row.candidatePhone || "Not available"}</span>
      </td>

      <td className="assessment-result-cell">
        <ScoreCell score={row.score} isRealtime={row.attemptStatus === "Attempting"} />
      </td>

      <td className="assessment-result-cell">
        <ProctoringCell
          proctoringCounts={row.proctoringCounts}
          onMonitor={handleMonitor}
        />
      </td>

      <td className="assessment-result-cell">
        <div className="assessment-result-actions assessment-result-actions--full">
          <button
            type="button"
            className="assessment-result-action-btn --monitor"
            title="View proctoring report"
            onClick={handleMonitor}
          >
            <FiShield style={{ marginRight: "0.3rem" }} />
            Monitor
          </button>
          <button
            type="button"
            className="icon-btn"
            title="Send mail"
            onClick={() => onSendMail(row)}
          >
            <FiMail />
          </button>
          <button
            type="button"
            className="icon-btn"
            title="Interview round"
            onClick={() => onMarkInterview(row)}
          >
            <FiCheckCircle />
          </button>
          <button
            type="button"
            className="icon-btn"
            title="Block candidate"
            onClick={() => onBlockCandidate(row)}
          >
            <FiSlash />
          </button>
        </div>
      </td>
    </tr>
  );
}
