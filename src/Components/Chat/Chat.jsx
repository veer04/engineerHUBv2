import React, { useState } from "react";
import "./Chat.css";
import mentor from "./svg/mentor.svg";
import submit from "./svg/submit.svg";
import Message from "./Message";

export default function Chat({ className }) {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      userId: 1001,
      userName: "Manish Rai",
      isVerified: true,
      time: "12:00 PM",
      tags: ["Mentor"],
      message: "Lorem ipsum dolor sit amet",
      avatar: "https://source.unsplash.com/random/",
    },
    {
      _id: 2,
      userId: 1002,
      userName: "Yash Vardhan",
      isVerified: false,
      time: "12:15 PM",
      message:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam debitis porro velit dicta, nesciunt aperiam sequi consectetur eum, dignissimos obcaecati eos voluptatibus blanditiis impedit expedita suscipit similique ea doloremque.",
      avatar: "https://source.unsplash.com/random/",
    },
    {
      _id: 3,
      userId: 1003,
      userName: "Ayush Gupta",
      isVerified: true,
      time: "12:30 PM",
      tags: ["Mentor", "Head"],
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: "https://source.unsplash.com/random/",
    },
    {
      _id: 4,
      userId: 2001,
      userName: "Swapnil Raj",
      time: "12:45 PM",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet",
      avatar: "https://source.unsplash.com/random/",
    },
  ]);

  const renderedMessages = messages.map((message) => {
    return <Message key={message._id} {...message} />;
  });

  function handleSubmit() {
    const input = document.getElementById("chat-input");
    if (input.value) {
      setMessages([
        ...messages,
        {
          _id: messages.length + 1,
          userId: 2001,
          userName: "Swapnil Raj",
          time: "12:45 PM",
          message: input.value,
          avatar: "https://source.unsplash.com/random/",
        },
      ]);
      input.value = "";
    }
    document.getElementByClasses("chat-display").scrollTo(0, 999999999);
  }

  return (
    <div className={`chat-container ${className ? className : ""}`}>
      <div className="chat-header">
        <div className="heading">Community Chat</div>
        <div className="mentor-btn">
          <img src={mentor} alt="Connect to mentor" />
        </div>
      </div>
      <div className="chat-display">{renderedMessages}</div>
      <div className="chat-input">
        <input
          id="chat-input"
          className="input"
          placeholder="New Message"
          type="text"
        />
        <div className="submit-button__container">
          <div onClick={handleSubmit} className="submit-button">
            <img src={submit} alt="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
