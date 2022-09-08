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
          <img src={backImage} className="event-image" />
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
        <div className="event-register">Join</div>
      </div>
      <div className="event-card-body">
        <div>
          {" "}
          <img src={backImage} className="event-image" />
        </div>

        <div className="d-flex event--btns">
          {" "}
          <div className=" event-name">Workshops</div>
          <button className="Prize">Prize</button>
        </div>
        <div className="event-details">
          {" "}
          We organise various workshops to guide students by giving them a basic framework of technical subjects by skilled mentors.
        </div>
        <div className="event-register">Join</div>
      </div>
      <div className="event-card-body">
        <div>
          {" "}
          <img src={backImage} className="event-image" />
        </div>

        <div className="d-flex event--btns">
          {" "}
          <div className=" event-name">Weekend with Us</div>
          <button className="Prize">Prize</button>
        </div>
        <div className="event-details">
          {" "}
          A weekly event named "Weekend with us " Is organised to give a live interactive session by mentors/ professionals to give an overview of the placements
           & train the students accordingly.
        </div>
        <div className="event-register">Join</div>
      </div>
    </>
  );
};

export default EventCard;
