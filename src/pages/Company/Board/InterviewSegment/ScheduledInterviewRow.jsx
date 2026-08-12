import React from "react";
import { FiExternalLink, FiPlus, FiCalendar, FiClock, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function ProctoringCell({ proctoringCounts, proctoringSummary }) {
  const counts = proctoringCounts || {
    TAB_SWITCH: proctoringSummary?.tabSwitches || 0,
    FULLSCREEN_EXIT: proctoringSummary?.fullscreenExits || 0,
    WINDOW_BLUR: proctoringSummary?.warningCount || 0,
  };

  const getRiskBandFromCounts = (c = {}) => {
    const pts =
      (c.TAB_SWITCH || 0) * 2 +
      (c.WINDOW_BLUR || 0) * 1 +
      (c.FULLSCREEN_EXIT || 0) * 3 +
      (c.COPY_ATTEMPT || 0) * 4 +
      (c.PASTE_ATTEMPT || 0) * 4 +
      (c.RIGHT_CLICK_ATTEMPT || 0) * 2 +
      (c.NO_FACE_DETECTED || 0) * 5 +
      (c.MULTIPLE_FACES_DETECTED || 0) * 10 +
      (c.CAMERA_DISABLED || 0) * 15 +
      (c.CAMERA_STREAM_LOST || 0) * 15 +
      (c.CAMERA_PERMISSION_DENIED || 0) * 20;
    if (pts >= 25) return "High";
    if (pts >= 10) return "Medium";
    return "Low";
  };

  const band = getRiskBandFromCounts(counts);
  const tabSwitches = counts.TAB_SWITCH || 0;
  const copies = (counts.COPY_ATTEMPT || 0) + (counts.PASTE_ATTEMPT || 0);
  const fsExits = counts.FULLSCREEN_EXIT || 0;
  const camDisabled = counts.CAMERA_DISABLED || 0;
  const camLost = counts.CAMERA_STREAM_LOST || 0;
  const camDenied = counts.CAMERA_PERMISSION_DENIED || 0;
  const noFace = counts.NO_FACE_DETECTED || 0;
  const multiFace = counts.MULTIPLE_FACES_DETECTED || 0;

  const hasAnyHint = tabSwitches > 0 || copies > 0 || fsExits > 0 || camDisabled > 0 || camLost > 0 || camDenied > 0 || noFace > 0 || multiFace > 0;

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
          <span className="proctor-hint">🔌 Stream ({camLost})</span>
        )}
        {camDenied > 0 && (
          <span className="proctor-hint">🚫 Denied ({camDenied})</span>
        )}
        {noFace > 0 && (
          <span className="proctor-hint">👤 No Face ({noFace})</span>
        )}
        {multiFace > 0 && (
          <span className="proctor-hint">👥 Multi ({multiFace})</span>
        )}
        {!hasAnyHint && (
          <span className="proctor-hint" style={{ opacity: 0.6 }}>Clean</span>
        )}
      </div>
    </div>
  );
}

export default function ScheduledInterviewRow({
  data,
  selectedRows,
  setSelectedRows,
  onReschedule,
  onCancel,
  onJoinMeeting,
  onAddRemark
}) {
  const navigate = useNavigate();
  // Use timeStatus from backend if available, otherwise calculate locally
  const getTimeStatus = () => {
    if (data.timeStatus) {
      return data.timeStatus;
    }
    
    // Fallback local calculation
    const now = moment();
    const interviewStartTime = moment(`${moment.utc(data.scheduledDate).format('YYYY-MM-DD')} ${data.startTime}`, "YYYY-MM-DD HH:mm");
    const interviewEndTime = moment(`${moment.utc(data.scheduledDate).format('YYYY-MM-DD')} ${data.endTime}`, "YYYY-MM-DD HH:mm");
    
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
            <span className="date">{moment.utc(data.scheduledDate).format("DD MMM YYYY")}</span>
          </div>
          <div className="time-section">
            <FiClock className="time-icon" />
            <span className="time">{moment(data.startTime, "HH:mm").format("h:mm A")} - {moment(data.endTime, "HH:mm").format("h:mm A")}</span>
          </div>
        </div>
      </div>
      
      <div className="table-cell round-cell">
        <div className="round-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {data.interviewType === "AI" ? (
              <>
                <span className="round-badge ai-round">R{data.interviewRound}</span>
                <span className="type-chip ai-type">AI</span>
              </>
            ) : (
              <>
                <span className="round-badge manual-round">R{data.interviewRound}</span>
                <span className="type-chip manual-type">Manual</span>
              </>
            )}
          </div>
          {/*
          {data.interviewSubject && 
           data.interviewSubject !== `Round ${data.interviewRound}` &&
           !data.interviewSubject.includes('undefined') && (
            <span className="interview-subject-badge">{data.interviewSubject}</span>
          )}
          */}
        </div>
      </div>
      
      <div className="table-cell actions-cell">
        {data.interviewType === "AI" ? (
          timeStatus === "expired" ? (
            <button
              className="join-meeting-btn expired"
              disabled
              title="Interview time has passed"
            >
              <FiClock />
              Expired
            </button>
          ) : (timeStatus === "ongoing" || timeStatus === "approaching") ? (
            <button
              className="join-meeting-btn ai-monitor-btn"
              onClick={() => {
                const hiringId = data.hiringId || "mock_hiring_id";
                const inviteId = data._id || "mock_invite_id";
                const basePath = window.location.pathname;
                navigate(`/ai-interview-proctor/${hiringId}/${inviteId}/report?returnPath=${encodeURIComponent(basePath)}`);
              }}
              title="Monitor AI proctoring live"
            >
              <FiShield />
              Monitor
            </button>
          ) : (
            <button
              className="join-meeting-btn upcoming"
              disabled
              title="Interview is upcoming"
            >
              <FiCalendar />
              Upcoming
            </button>
          )
        ) : (
          timeStatus === "expired" ? (
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
              title="Interview is ongoing - Join now"
            >
              <FiExternalLink />
              Join
            </button>
          ) : timeStatus === "approaching" ? (
            <button
              className="join-meeting-btn approaching"
              onClick={onJoinMeeting}
              title="Interview starting soon - Join"
            >
              <FiExternalLink />
              Join
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
          )
        )}
      </div>
      
      <div className="table-cell remark-cell">
        {data.interviewType === "AI" ? (
          <ProctoringCell
            proctoringCounts={data.proctoringCounts}
            proctoringSummary={data.proctoringSummary}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}
