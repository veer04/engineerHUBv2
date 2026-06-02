import React from "react";
import { FiSend } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";

export default function AssessmentCandidateRow({
  candidate,
  isSelected,
  onToggleSelect,
  onSendAssessment,
  onSendEmail,
  onMoveToResponse,
}) {
  const candidateName =
    candidate?.name ||
    `${candidate?.firstName || ""} ${candidate?.lastName || ""}`.trim() ||
    "Candidate";
  const candidateEmail = candidate?.email || "Not available";
  const candidateCollege = candidate?.college || "Not available";
  const skills = Array.isArray(candidate?.skills) ? candidate.skills : [];
  const aiMatch =
    typeof candidate?.aiMatch === "number" ? Math.max(0, Math.min(100, candidate.aiMatch)) : 0;

  return (
    <tr className="assessment-candidate-row">
      <td className="assessment-cell assessment-cell-name">
        <div className="assessment-candidate-profile">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            aria-label={`Select ${candidateName}`}
          />
          <div className="assessment-candidate-meta">
            <p className="assessment-candidate-name">{candidateName}</p>
            <p className="assessment-candidate-email">{candidateEmail}</p>
          </div>
        </div>
      </td>
      <td className="assessment-cell">{candidateCollege}</td>
      <td className="assessment-cell">
        <div className="assessment-skills-text">
          {skills.length > 0 ? (
            skills.join(", ")
          ) : (
            <span className="assessment-empty-text">No skills listed</span>
          )}
        </div>
      </td>
      <td className="assessment-cell assessment-cell-center">
        <div className="assessment-match-wrapper">
          <div className="assessment-match-track">
            <div className="assessment-match-fill" style={{ width: `${aiMatch}%` }} />
          </div>
          <span className="assessment-match-value">{aiMatch}%</span>
        </div>
      </td>
      <td className="assessment-cell assessment-cell-actions">
        <button
          type="button"
          className="assessment-action-btn assessment-send-btn"
          onClick={onSendAssessment}
        >
          <FiSend />
          Send Assessment
        </button>
        <button
          type="button"
          className="assessment-action-btn assessment-icon-btn"
          onClick={onSendEmail}
          title="Send email"
        >
          <MdMailOutline />
        </button>
        <button
          type="button"
          className="assessment-action-btn assessment-icon-btn"
          onClick={onMoveToResponse}
          title="Move to Response"
        >
          <RiInboxArchiveLine />
        </button>
      </td>
    </tr>
  );
}
