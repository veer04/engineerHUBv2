import React from "react";
import "./VerificationModal.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { controller, getPostById } from "../../services/APIConfig";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { RWebShare } from "react-web-share";
import { FRONTEND_URL } from "../../services/APIUtils";

export default function VerificationModal() {
  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  useEffect(() => {
    left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [doc.scrollLeft, doc.scrollTop]);

  return ReactDOM.createPortal(
    <div
      style={{
        top: top,
        left: left,
      }}
      id="modal-container"
    >
      {true ? (
        <article>
          <h2>Mobile Number OTP</h2>
        </article>
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>,
    document.querySelector("#modal")
  );
}
