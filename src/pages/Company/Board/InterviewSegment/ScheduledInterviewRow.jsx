import React from "react";
import { FiExternalLink, FiPlus, FiCalendar, FiClock } from "react-icons/fi";
import moment from "moment";

export default function ScheduledInterviewRow({
  data,
  selectedRows,
  setSelectedRows,
  onReschedule,
  onCancel,
  onJoinMeeting,
  onAddRemark
}) {
  // Use timeStatus from backend if available, otherwise calculate locally
  const getTimeStatus = () => {
    if (data.timeStatus) {
      return data.timeStatus;
    }
    
    // Fallback local calculation
    const now = moment();
    const interviewStartTime = moment(`${moment(data.scheduledDate).format('YYYY-MM-DD')} ${data.startTime}`, "YYYY-MM-DD HH:mm");
    const interviewEndTime = moment(`${moment(data.scheduledDate).format('YYYY-MM-DD')} ${data.endTime}`, "YYYY-MM-DD HH:mm");
    
    if (now.isAfter(interviewEndTime)) {
      return "expired";
    } else if (now.isBetween(interviewStartTime, interviewEndTime, null, '[]')) {
      return "ongoing";
    } else if (now.isBetween(interviewStartTime.clone().subtract(15, 'minutes'), interviewStartTime, null, '[]')) {
      return "approaching";
    } else {
      return "scheduled";
    }
  };

  const timeStatus = getTimeStatus();
  const handleCheckboxChange = () => {
    if (selectedRows.find((row) => row._id === data._id)) {
      setSelectedRows(selectedRows.filter((row) => row._id !== data._id));
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  };

  const formatDateTime = (date, startTime, endTime) => {
    const formattedDate = moment(date).format("DD/MM/YY");
    const startTimeFormatted = moment(startTime, "HH:mm").format("h:mm A");
    const endTimeFormatted = moment(endTime, "HH:mm").format("h:mm A");
    return `${formattedDate} ${startTimeFormatted} - ${endTimeFormatted}`;
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

  const handleAddRemark = () => {
    // TODO: Implement add remark functionality
    console.log("Add remark for:", data.candidateName);
  };

  return (
    <div className="table-row scheduled-row">
      <div className="table-cell checkbox-cell">
        <input
          type="checkbox"
          checked={selectedRows.find((row) => row._id === data._id)}
          onChange={handleCheckboxChange}
        />
      </div>
      
      <div className="table-cell name-cell">
        <span className="candidate-name">{data.candidateName}</span>
      </div>
      
      <div className="table-cell mobile-cell">
        <span className="mobile-number">{data.candidatePhone}</span>
      </div>
      
      <div className="table-cell resume-cell">
        <button 
          className="resume-link"
          onClick={handleResumeClick}
        >
          view
        </button>
      </div>
      
      <div className="table-cell datetime-cell">
        <div className="datetime-info">
          <div className="date-section">
            <FiCalendar className="date-icon" />
            <span className="date">{moment(data.scheduledDate).format("DD MMM YYYY")}</span>
          </div>
          <div className="time-section">
            <FiClock className="time-icon" />
            <span className="time">{moment(data.startTime, "HH:mm").format("h:mm A")} - {moment(data.endTime, "HH:mm").format("h:mm A")}</span>
          </div>
        </div>
      </div>
      
      <div className="table-cell round-cell">
        <div className="round-info">
          <span className="round-badge">R{data.interviewRound}</span>
          {data.interviewSubject && 
           data.interviewSubject !== `Round ${data.interviewRound}` &&
           !data.interviewSubject.includes('undefined') && (
            <span className="interview-subject-badge">{data.interviewSubject}</span>
          )}
        </div>
      </div>
      
      <div className="table-cell actions-cell">
        {timeStatus === "expired" ? (
          <button
            className="join-meeting-btn expired"
            disabled
            title="Interview time has passed"
          >
            <FiClock />
            Expired
          </button>
        ) : timeStatus === "ongoing" ? (
          <button
            className="join-meeting-btn ongoing"
            onClick={onJoinMeeting}
            title="Interview is ongoing - Join now!"
          >
            <FiExternalLink />
            Join Now
          </button>
        ) : timeStatus === "approaching" ? (
          <button
            className="join-meeting-btn approaching"
            onClick={onJoinMeeting}
            title="Interview starting soon - Join early"
          >
            <FiExternalLink />
            Join Early
          </button>
        ) : (
          <button
            className="join-meeting-btn"
            onClick={onJoinMeeting}
            title="Join Meeting"
          >
            <FiExternalLink />
            Join
          </button>
        )}
      </div>
      
      <div className="table-cell remark-cell">
        <button
          className={`add-remark-btn ${data.remark ? 'has-remark' : ''}`}
          onClick={onAddRemark}
          title={data.remark ? `Edit Remark: ${data.remark.substring(0, 50)}${data.remark.length > 50 ? '...' : ''}` : "Add Remark"}
        >
          {data.remark ? (
            <span className="remark-indicator">✓</span>
          ) : (
            <FiPlus />
          )}
        </button>
      </div>
    </div>
  );
}
