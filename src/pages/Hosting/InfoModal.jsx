import React from "react";
import ReactDOM from "react-dom";
import "./InfoModal.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { controller, getPostById } from "../../services/APIConfig";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { RWebShare } from "react-web-share";
import { FRONTEND_URL } from "../../services/APIUtils";
import { MdOutlineCancel } from "react-icons/md";
import { Fragment } from "react";
import { HashLink } from "react-router-hash-link";
import { RxCross2 } from "react-icons/rx";

export default function InfoModal({ setState }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  function getScrollPosition() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return { top, left };
  }

  return ReactDOM.createPortal(
    <div
      style={{
        top: getScrollPosition().top,
        left: getScrollPosition().left,
      }}
      id="info-modal-container"
    >
      <>
        <div id="info-container" >
          <div
            onClick={() => {
              setState(false);
            }}
            className="position-absolute post-cancel-button-container"
          >
            <RxCross2 className="post-cancel-button" />
          </div>
          <h1>Oops! Bad Luck</h1>
          <span>
            Post feature is only available for <u>Alumni</u>, <u>Clubs</u> and{" "}
            <u>Companies</u>. However you can host <u>Technical Events</u>,{" "}
            <u>Cultural Events</u>, <u>Webinars</u> and <u>Hackathons</u>.
          </span>
          <HashLink to={`/host/#create-events`}>
            <button
              onClick={() => {
                setState(false);
                navigate("");
              }}
            >
              Explore Events
            </button>
          </HashLink>
        </div>
      </>
      {/* <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> */}
    </div>,
    document.querySelector("#post-modal")
  );
}
