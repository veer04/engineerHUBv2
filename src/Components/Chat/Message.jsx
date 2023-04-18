import React from "react";
import "./Message.css";
import verified from "./svg/verified.svg";
import options from "./svg/options.svg";

export default function Message() {
  return (
    <div className="chat-message">
      <div className="avatar-container">
        <img
          className="avatar"
          src="https://source.unsplash.com/random/"
          alt="avatar"
        />
      </div>
      <div className="message-container">
        <div className="message-header">
          <div className="name">John Doe</div>
          <img src={verified} alt="verified" />
          <div className="time">12:00 PM</div>
        </div>
        <div className="tags">
          <div className="tag">Mentor</div>
          <div className="tag">Head</div>
        </div>
        <div className="message-body">
          <div className="message">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
            eveniet?
          </div>
          <div className="options">
            <img src={options} alt="options" />
          </div>
        </div>
      </div>
    </div>
  );
}
