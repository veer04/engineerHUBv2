import React, { useState } from "react";
import "./EventCard.css";
// import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import EventModal from "../EventModal/EventModal";
import defaultPoster from "../../assets/defaultPoster";

export default function EventCard({
  _id,
  description,
  eventPoster,
  setEventOpened,
  setIsProjectOpen,
  eventName,
  eventType,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    console.log("card clicked");
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const actionBar = (
    <div>
      <MdCancel onClick={handleClose} />
    </div>
  );
  const modal = <EventModal onClose={handleClose} actionBar={actionBar} />;

  return (
    <div
      onClick={() => {
        console.log("clicked");
        // handleClick();
        setEventOpened(_id);
        console.log(_id);
      }}
      className="project__list__item event__list__item"
    >
      {showModal && modal}
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
