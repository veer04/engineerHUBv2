import React from "react";
import "./Message.css";
import verifiedIcon from "./svg/verified.svg";
import options from "./svg/options.svg";

export default function Message({
  sender,
  isVerified,
  tags,
  content,
  clientId,
  createdAt,
}) {
  const MY_USER_ID = clientId;

  const chatMessageClasses = `chat-message ${
    sender._id === MY_USER_ID && "chat-message--flipped"
  }`;

  const messageContainerClasses = `message-container ${
    sender._id === MY_USER_ID && "message-container--flipped"
  }`;

  const messageHeaderClasses = `message-header ${
    sender._id === MY_USER_ID && "message-header--flipped"
  }`;

  const messageBodyClasses = `message-body ${
    sender._id === MY_USER_ID && "message-body--flipped"
  }`;

  const checkForLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          // <pre>
          <span key={index} className="link-margin mx-1">
            <a
              style={{ color: "rgb(138,180,248)", lineBreak: "anywhere" }}
              className="text-break"
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          </span>
          // </pre>
        );
      } else {
        return (
          <span key={index} className="text-content">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className={chatMessageClasses}>
      <div className="avatar-container">
        <img className="avatar" src={sender?.image} alt="avatar" />
      </div>
      <div className={messageContainerClasses}>
        <div className={messageHeaderClasses}>
          <div className="name">{sender?.name}</div>
          {isVerified && <img src={verifiedIcon} alt="verified" />}
          <div className="time">{createdAt}</div>
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
          <div
            style={{ lineBreak: "anywhere" }}
            className="message text-break d-flex"
          >
            {checkForLink(content)}
          </div>
        </div>
      </div>
    </div>
  );
}
