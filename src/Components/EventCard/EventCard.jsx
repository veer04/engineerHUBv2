import React from "react";
import "./EventCard.css";
// import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";

export default function EventCard({
  _id,
  description,
  eventPoster,
  setEventOpened,
  setIsProjectOpen,
  eventName,
  eventType,
}) {
  return (
    <div
      onClick={() => {
        setEventOpened(_id);
        console.log(_id);
      }}
      className="project__list__item event__list__item"
    >
      {
        <div
          style={{
            // width: "100%",
            height: "19rem",
            aspectRatio: "1/1",
            backgroundImage: `url(${eventPoster})`,
            backgroundSize: "cover",
            backgroundColor: "var(--primary-color-green)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="poster"
        ></div>
      }
      <div className="heading">{eventType}</div>
      <div className="title">{eventName}</div>
      <div className="description">{description}</div>
    </div>
  );
}
