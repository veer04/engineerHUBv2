import React, { useState } from "react";
import "./EventCard.css";
// import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import EventModal from "../EventModal/EventModal";
import defaultPoster from "../../assets/defaultPoster";
import Modal from "../EventModal/Modal";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ReactDom from "react-dom/client";

export default function EventCard({
  _id,
  description,
  eventPoster,
  setEventOpened,
  setIsProjectOpen,
  eventName,
  eventType,
  domainName,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/community/events/${domainName}/${_id}`);
        setEventOpened(_id);
      }}
      className="project__list__item event__list__item"
    >
      {/* {showModal && modal} */}
      {
        <div
          style={{
            // width: "100%",
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
      <div className="title">{eventName}</div>
      <div className="description">{description}</div>
    </div>
  );
}
