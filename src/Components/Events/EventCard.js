import React from "react";
import "./EventCard.css";


const EventCard = ({
  eventTitle1,
  eventTitle2,
  lastDate,
  mentorName,
  cardImage,
  company,
  eventDescription,
}) => {
  return (
    <>
      <div className="event-card-body">
        <div>
          {" "}
          <img
            src={require(`${cardImage}`)}
            alt="particular-events"
            className="event-image"
            width={258}
            height={147}
          />
        </div>

        <div className="d-flex event--btns">
          <div className=" event-name">
            {" "}
            {eventTitle1} {eventTitle2}
          </div>
          <a href="https://discord.gg/ZMZAEZ5NfA">
            {" "}
            <button className="Prize">Join</button>
          </a>
        </div>
        <div className="event-details">{eventDescription}</div>
        <div>
          {/* <div
            style={{ backgroundColor: "#0d718c" }}
            className="event-register"
          >
            Join
          </div> */}
        </div>
      </div>
    </>
  );
};

export default EventCard;
