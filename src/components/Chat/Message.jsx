import React from "react";
import "./Message.css";
import verifiedIcon from "./svg/verified.svg";
import options from "./svg/options.svg";

export default function Message({
  _id,
  userId,
  avatar,
  userName,
  isVerified,
  time,
  tags,
  message,
}) {
  const MY_USER_ID = 2001;

  const chatMessageClasses = `chat-message ${
    userId === MY_USER_ID && "chat-message--flipped"
  }`;

  if (userId === 2001) {
  }

  const messageContainerClasses = `message-container ${
    userId === MY_USER_ID && "message-container--flipped"
  }`;

  if (userId === 2001) {
  }

  const messageHeaderClasses = `message-header ${
    userId === MY_USER_ID && "message-header--flipped"
  }`;

  const messageBodyClasses = `message-body ${
    userId === MY_USER_ID && "message-body--flipped"
  }`;

  return (
    <div className={chatMessageClasses}>
      <div className="avatar-container">
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className={messageContainerClasses}>
        <div className={messageHeaderClasses}>
          <div className="name">{userName}</div>
          {isVerified && <img src={verifiedIcon} alt="verified" />}
          <div className="time">{time}</div>
        </div>
        <div className="tags">
          {tags &&
            tags.map((tag) => {
              return (
                <div key={tag} className="tag">
                  {tag}
                </div>
              );
            })}
        </div>
        <div className={messageBodyClasses}>
          <div className="message">{message}</div>
          <div className="options">
            <img src={options} alt="options" />
          </div>
        </div>
      </div>
    </div>
  );
}
