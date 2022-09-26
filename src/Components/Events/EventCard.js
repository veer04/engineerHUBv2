import React from "react";
import "./EventCard.css";
import backImage from "../Magzine/backimg.png";

const EventCard = ({
  eventTitle1,
  eventTitle2,
  lastDate,
  mentorName,
  company,
  eventDescription
}) => {
  return (
    <>
      <div className="event-card-body">
        <div>
          {" "}
          <img
            src={backImage}
            alt="particular-events"
            className="event-image"
          />
        </div>

        <div className="d-flex event--btns">
          <div className=" event-name">
            {" "}
            {eventTitle1} {eventTitle2}
          </div>
          <button className="Prize">Prize</button>
        </div>
        <div className="event-details">{eventDescription}</div>
        <div>
          <div
            style={{ backgroundColor: "#0d718c" }}
            className="event-register"
          >
            Join
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
