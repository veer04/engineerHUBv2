import React from "react";
import "./CampusEventCard.css";

export default function CampusEventCard({
  title,
  studentActivity,
  ongoingEvents,
  color,
}) {
  return (
    <div style={{ backgroundColor: color }} className="campus-event__card">
      <div className="header">
        <h2>{title}</h2>
      </div>
      <div className="content">
        <div className="student-activity">
          <span>{studentActivity}</span>
          <span>
            Students Actively
            <br />
            Participating
          </span>
        </div>
        <div className="ongoing-events">
          <span>{ongoingEvents}</span>
          <span>Ongoing Events</span>
        </div>
      </div>
    </div>
  );
}
