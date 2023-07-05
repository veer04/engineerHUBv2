import React, { useState } from "react";
import "./EventCard.css";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate, useParams } from "react-router-dom";

export default function EventCard({
  _id,
  description,
  eventPoster,
  setEventOpened,
  eventName,
  eventType,
  domainName,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/community/events/${encodeURIComponent(domainName)}/${_id}`);
        // setEventOpened(_id);
      }}
      className="project__list__item event__list__item on-hover-scale"
    >
      {
        <div
          style={{
            aspectRatio: "1/1",
            backgroundImage: `url(${
              eventPoster ? eventPoster : defaultPoster
            })`,
            backgroundSize: "cover",
            backgroundColor: "var(--primary-color-green)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="poster"
        ></div>
      }
      <div className="heading">{eventType}</div>
      <div className="title text-crop-2">{eventName}</div>
      <div className="description">{description}</div>
    </div>
  );
}
