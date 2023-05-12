import React from "react";
import "./Modal.css";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { controller, getParticularEvent } from "../../services/APIConfig";
import { useState } from "react";

export default function Modal({ handleClose, setShowModal }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(
    sessionStorage.getItem(`event details ${eventId}`)
      ? JSON.parse(sessionStorage.getItem(`event details ${eventId}`))
      : {}
  );
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    getParticularEvent(setEvent, eventId);

    return () => {
      controller.abort();
    };
  }, [eventId]);

  useEffect(() => {
    sessionStorage.setItem(`event details ${eventId}`, JSON.stringify(event));
  }, [event]);

  return ReactDOM.createPortal(
    <div id="event-modal-container">
      {event.eventName ? (
        <div className="event-modal">
          <div className="close-btn">
            <div
              onClick={() => {
                handleClose();
                navigate(-1);
              }}
            >
              <MdCancel />
            </div>
          </div>
          <div className="event-type">
            <div>{event.eventType}</div>
          </div>
          <div className="event-title">
            <div>{event.eventName}</div>
          </div>
          {event.eventTags && (
            <div className="tags">
              {event.eventTags.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>
          )}
          <div className="event-description">
            <div>{event.description}</div>
          </div>
          <div className="divider"></div>
          <div className="event-data">
            <div className="poster-container">
              <div>Event Poster</div>
              <img src={event.eventPoster} alt="event poster" />
            </div>
            <div className="features-container">
              <div>Key Features</div>
              <div className="features">
                <ul>
                  <li>
                    Master DSA by building 100 projects in 100 days. Learn data
                    science, automation, build websites, games and apps!
                  </li>
                  <li>
                    Master DSA by building 100 projects in 100 days. Learn data
                    science, automation, build websites, games and apps!
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="details-container">
            <div className="details">
              <div>Logistics</div>
              <div>Sunday / 31st July / 06:00 PM</div>
            </div>
            <a href={event.applyLink}>
              <div
                onClick={() => {
                  handleClose();
                  // navigate(-1);
                }}
                className="link"
              >
                Event Link
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>,
    document.querySelector("#event-modal")
  );
}
