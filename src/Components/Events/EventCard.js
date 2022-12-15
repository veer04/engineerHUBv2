import React from "react";
import "./EventCard.css";

const EventCard = ({
  tagline,
  eventDate,
  mentorName,
  posterUrl,
  company,
  position,
  description,
}) => {
  return (
    <>
      <div
        className="event-card-body"
        style={{
          padding: "0px",
          margin: "10px",
        }}
      >
        <div>
          {" "}
          <img
            src={posterUrl}
            alt="particular-events"
            className="event-image"
            width="100%"
            height={147}
          />
        </div>

        <div className="d-flex event--btns">
          <div className=" event-name"> {tagline}</div>
          <a href="https://discord.gg/ZMZAEZ5NfA">
            {" "}
            <button className="Prize">Join</button>
          </a>
        </div>
        <div className="event-details cutoff-text">{description}</div>
        <div></div>
      </div>
    </>
  );
};

export default EventCard;
