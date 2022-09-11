import React from "react";
import "./EventCard.css";
import backImage from "../Magzine/backimg.png";

const EventCard = ({
  eventName,
  dateTime,
  mentorName,
  company,
  description,
}) => {
  return (
    <>
      <div className="event-card-body">
        <div>
          {" "}
          <img src={backImage} alt="particular-events" className="event-image" />
        </div>

        <div className="d-flex event--btns">
          {" "}
          <div className=" event-name">Coding Contests</div>
          <button className="Prize">Prize</button>
        </div>
        <div className="event-details">
          {" "}
          Various Coding Contests are organised to help students evaluate their coding skills and test their abilities.
        </div>
        <div>
        <div style={{ backgroundColor: "#0d718c" }} className="event-register">Join</div>
        </div>
      </div>
      
    </>
  );
};

export default EventCard;
