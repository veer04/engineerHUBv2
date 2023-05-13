import React from "react";
import "./CampusEventCard.css";
import { Link } from "react-router-dom";

export default function CampusEventCard({
  title,
  studentActivity,
  ongoingEvents,
  color,
  link,
  image,
}) {
  return (
    <Link to={link} className="campus-event-card--responsive">
      <div
        style={{
          backgroundColor: color,
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "95% 20px",
        }}
        className="campus-event__card"
      >
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
    </Link>
  );
}
