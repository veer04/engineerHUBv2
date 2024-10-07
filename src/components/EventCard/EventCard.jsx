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
  className,
  trendingEvent,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (trendingEvent) navigate(`/trending/events/${_id}`);
        else
          navigate(
            `/community/events/${encodeURIComponent(domainName)}/${_id}`
          );
        // setEventOpened(_id);
      }}
      className={`project__list__item event__list__item on-hover-scale ${className}`}
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
      <div
        style={{
          //     font-size: 0.6rem;
          // font-weight: 400;
          // color: #fff;
          // margin: 0.5rem 0 0.2rem;
          // background-color: var(--primary-color-dark-green);
          // width: fit-content;
          // padding: 0.2rem 0.5rem;
          fontSize: "0.6rem",
          fontWeight: "400",
          color: "#fff",
          margin: "0.5rem 0 0.2rem",
          backgroundColor: "var(--primary-color-dark-green)",
          width: "fit-content",
          padding: "0.2rem 0.5rem",
        }}
        className="heading"
      >
        {eventType}
      </div>
      <div
        style={{
          fontSize: "1.1rem",
        }}
        className="title text-crop-2"
      >
        {eventName}
      </div>
      <div className="description text-crop-5">
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="hiring-styled-description"
        ></div>

        {/* {description} */}
      </div>
    </div>
  );
}
