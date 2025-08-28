import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default function InterviewLobbyRow({
  data,
  selectedRows,
  setSelectedRows,
  onScheduleInterview
}) {
  const handleCheckboxChange = () => {
    if (selectedRows.find((row) => row._id === data._id)) {
      setSelectedRows(selectedRows.filter((row) => row._id !== data._id));
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  };

  const handleResumeClick = () => {
    if (data.resumeUrl) {
      // Check if the resume link is ending with doc or docx then add to the starting this link "http://docs.google.com/gview?url=" else open the link
      const resumeUrl = data.resumeUrl.endsWith("doc") || data.resumeUrl.endsWith("docx")
        ? `http://docs.google.com/gview?url=${data.resumeUrl}`
        : data.resumeUrl;
      
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    } else {
      console.log("No resume URL available for:", data.candidateName);
    }
  };

  const getScoreColor = (score) => {
    if (!score || score === 0) return "#6b7280"; // Gray for N/A
    if (score >= 80) return "#059669"; // Green
    if (score >= 60) return "#d97706"; // Orange
    return "#dc2626"; // Red
  };

  const getScoreBackground = (score) => {
    if (!score || score === 0) return "#f3f4f6"; // Light gray for N/A
    if (score >= 80) return "#dcfce7"; // Light green
    if (score >= 60) return "#fef3c7"; // Light orange
    return "#fee2e2"; // Light red
  };

  return (
    <div className="table-row">
      <div className="table-cell checkbox-cell">
        <input
          type="checkbox"
          checked={selectedRows.find((row) => row._id === data._id)}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="table-cell name-cell">
        <div className="candidate-name">
          {data.candidateName}
        </div>
      </div>
      <div className="table-cell email-cell">
        <div className="candidate-email">
          {data.candidateEmail}
        </div>
      </div>
      <div className="table-cell phone-cell">
        <div className="candidate-phone">
          {data.candidatePhone}
        </div>
      </div>
      <div className="table-cell resume-cell">
        <button
          className="resume-link"
          onClick={handleResumeClick}
          title="View Resume"
        >
          <span>view</span>
          <FiExternalLink />
        </button>
      </div>
      <div className="table-cell score-cell">
        <div className="ai-score">
          <span
            className="score-badge"
            style={{
              backgroundColor: getScoreBackground(data.aiScore || 0),
              color: getScoreColor(data.aiScore || 0),
              border: `1px solid ${getScoreColor(data.aiScore || 0)}`
            }}
          >
            {data.aiScore && data.aiScore > 0 ? `${data.aiScore}/100` : "N/A"}
          </span>
        </div>
      </div>
      <div className="table-cell actions-cell">
        <div className="action-buttons">
          <button
            className="schedule-btn"
            onClick={() => onScheduleInterview(data)}
            title={`Schedule Round ${data.interviewRound || 1} Interview`}
          >
            Schedule R{data.interviewRound || 1}
          </button>
        </div>
      </div>
    </div>
  );
}
