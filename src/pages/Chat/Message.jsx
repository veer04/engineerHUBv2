import React, { useEffect } from "react";
import "./Message.css";
import verifiedIcon from "./svg/verified.svg";
import options from "./svg/options.svg";
import defaultPoster from "../../assets/defaultPoster";

export default function Message({
  messages,
  index,
  sender,
  isVerified,
  tags,
  content,
  clientId,
  createdAt,
  position,
}) {
  const date = new Date(createdAt);
  //function to convert date to a readable format in the concept of chats
  function convertDate(date) {
    const now = new Date();
    const timeDiff = now - date;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${day} ${month} ${year}`;
    }
  }

  const MY_USER_ID = clientId;
  const isMyMessage = sender?._id === MY_USER_ID;

  const isSameSender = messages[index - 1]?.sender?._id === sender?._id;

  const chatMessageClasses = `chat-message ${
    isMyMessage ? "chat-message--flipped" : ""
  }`;

  const messageContainerClasses = `message-container ${
    isMyMessage ? "message-container--flipped" : ""
  } ${
    isSameSender && !isMyMessage && content && sender?.firstName
      ? "message-container--horizontal-oriental"
      : ""
  }`;

  const messageHeaderClasses = `message-header ${
    isMyMessage ? "message-header--flipped" : ""
  }`;

  const messageBodyClasses = `message-body ${
    isMyMessage ? "message-body--flipped" : ""
  }`;

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

  const checkForLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <span key={index} className="link-margin mx-1">
            <a
              style={{ color: "rgb(124, 170, 243)" }}
              className="text-break"
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          </span>
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
    <div
      style={{
        marginTop: isSameSender ? "0rem" : ".75rem",
      }}
      className={chatMessageClasses}
    >
      {!isMyMessage && (
        <div className="avatar-container">
          {(!isSameSender || (content && !sender?.firstName)) && (
            <img
              className="avatar"
              src={sender?.image ? sender?.image : defaultPoster}
              alt="avatar"
            />
          )}
        </div>
      )}
      <div className={messageContainerClasses}>
        <div className={messageHeaderClasses}>
          {content && !sender?.firstName ? (
            <i className="name">Deleted User</i>
          ) : isMyMessage ? (
            ""
          ) : isSameSender ? (
            content && !sender?.firstName ? (
              <i className="name">Deleted User</i>
            ) : (
              ""
            )
          ) : (
            <div className="name">{`${sender?.firstName} ${
              sender?.lastName ? sender?.lastName : ""
            }`}</div>
          )}
          {/* {!isMyMessage && !isSameSender && content && !sender?.firstName ? (
            <i className="name">Deleted User</i>
          ) : (
            <div className="name">{sender?.firstName}</div>
          )} */}
          {/* {content && !sender?.firstName && <i className="name">Deleted User</i>} */}
          {sender?.verifiedByEhub && !isMyMessage && !isSameSender && (
            <img src={verifiedIcon} alt="verified" />
          )}
        </div>
        {!isSameSender && !isMyMessage && (
          <div className="tags">
            {
              sender?.role &&
                (sender?.role === "Alumni" ||
                  sender?.role === "Mentor" ||
                  sender?.role === "Admin") && (
                  // sender.role?.map((tag) => {
                  //   return (
                  <div key={sender?.role} className="tag">
                    {sender?.role === "Admin" ? "Moderator" : sender?.role}
                  </div>
                )
              // );
              // }
              // )
            }
          </div>
        )}
        <div className={messageBodyClasses}>
          <div className="message-content text-break d-flex">
            {renderMessageContent(content)}
          </div>
          {/* <div
            style={{ lineBreak: "anywhere" }}
            className="message text-break d-flex"
          >
            {checkForLink(content)}
          </div> */}
          <div className="time">{convertDate(date)}</div>
        </div>
      </div>
    </div>
  );
}
