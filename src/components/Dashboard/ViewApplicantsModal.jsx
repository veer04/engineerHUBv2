import React from "react";
import "./ViewApplicantsModal.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { BsUpload } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export default function ViewApplicantsModal({
  jobId,
  applicantsCount,
  setToggleModal,
}) {
  const navigate = useNavigate();

  //function to find out window current scroll position
  function getScrollPosition() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return { top, left };
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        top: getScrollPosition().top,
        left: getScrollPosition().left,
      }}
      id="edit-modal"
    >
      {true ? (
        <div className="modal-container modal-padding view-applicants-container">
          <div
            onClick={() => {
              setToggleModal(false);
            }}
            className="modal-cancel-button-container"
          >
            <RxCross2 className="modal-cancel-button" />
          </div>
          <h2 className="modal-header">View Applicants</h2>
          {!!applicantsCount && (
            <span className="title">
              You have {applicantsCount} applications on this job!!
            </span>
          )}
          {!!!applicantsCount && (
            <span className="title">
              You may have some applications on this job!!
            </span>
          )}
          <span className="content">
            Connect with us to know more about received job applications.
          </span>
          <a
            href={`https://wa.me/919354647032?text=I%20want%20the%20details%20of%20the%20applicants%20of%20job%20id%20${jobId}`}
          >
            <button className="submit-button">Connect with us!</button>
          </a>
        </div>
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>,
    document.querySelector("#modal")
  );
}
