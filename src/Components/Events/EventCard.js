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
          <div className=" event-name">Hackathons DEV</div>
          <button className="Prize">Prize</button>
        </div>
        <div className="event-details">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
          consequat consequat at fermentum sollicitudin pellentesque tortor..
        </div>
        <div className="event-register">Join</div>
      </div>
    </>
  );
};

export default EventCard;
