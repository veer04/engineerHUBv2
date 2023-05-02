import React from "react";
import "./Modal.css";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Modal({ onClose, actionBar }) {
  return (
    <div className="event-modal">
      <div className="close-btn">{actionBar}</div>
      <div className="event-type">
        <div>Podcast</div>
      </div>
      <div className="event-title">
        <div>ALL IT TAKES IS $1</div>
      </div>
      <div className="tags">
        <div>Investing</div>
        <div>Money</div>
        <div>General</div>
        <div>Company Event</div>
      </div>
      <div className="event-description">
        <div>
          Master DSA by building 100 projects in 100 days. Learn data science,
          automation, build websites, games and apps!
        </div>
      </div>
      <div className="divider"></div>
      <div className="event-data">
        <div className="poster-container">
          <div>Event Poster</div>
          <img src="https://source.unsplash.com/random" alt="" />
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
        <div className="link">Event Link</div>
      </div>
    </div>
  );
}
