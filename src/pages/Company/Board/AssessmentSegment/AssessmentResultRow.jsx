import React from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiMail,
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
  const attemptMeta = getAttemptStatusMeta(row.attemptStatus);
  const isExpired = row.attemptStatus === "Expired";

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
        <div className="assessment-result-actions assessment-result-actions--full">
          <button
            type="button"
            className="assessment-result-action-btn --monitor"
            disabled={true}
            title="Will be added in next iteration."
            onClick={() => onMonitor(row)}
          >
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
