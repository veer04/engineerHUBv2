import React from "react";
import "./Chat.css";
import mentor from "./svg/mentor.svg";
import submit from "./svg/submit.svg";
import Message from "./Message";

export default function Chat({ className }) {
  return (
    <div className={`chat-container ${className ? className : ""}`}>
      <div className="chat-header">
        <div className="heading">Community Chat</div>
        <div className="mentor-btn">
          <img src={mentor} alt="Connect to mentor" />
        </div>
      </div>
      <div className="chat-display">
        <Message />
      </div>
      <div className="chat-input">
        <input className="input" placeholder="New Message" type="text" />
        <div className="submit-button__container">
          <div className="submit-button">
            <img src={submit} alt="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
