import React from "react";
import "./Message.css";

export default function MessageSending() {
  const chatMessageClasses = `chat-message chat-message--flipped`;

  const messageContainerClasses = `message-container message-container--flipped`;

  const messageBodyClasses = `message-body message-body--flipped`;

  const renderMessageContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            style={{ color: "rgb(124, 170, 243)" }}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }
      return (
        <span key={index} className="text-content">
          {part}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        marginTop: ".75rem",
      }}
      className={chatMessageClasses}
    >
      <div className={messageContainerClasses}>
        <div className={messageBodyClasses}>
          <div className="message-content text-break d-flex">
            <div className="message-sending-loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
