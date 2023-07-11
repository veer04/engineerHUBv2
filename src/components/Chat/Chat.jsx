import React, { useEffect, useState } from "react";
import "./Chat.css";
import mentor from "./svg/mentor.svg";
import submit from "./svg/submit.svg";
import Message from "./Message";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import { io } from "socket.io-client";
const ENDPOINT = API_URL;
var socket;

export default function Chat({ className, data, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const clientId = getCookie("_id")[2];

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        accesstoken: getAccessToken(),
      },
    };
    if (Object.keys(data).length === 0) {
      return;
    } else {
      axios
        .get(
          `${API_URL}api/v1/chatMessage/${encodeURIComponent(data._id)}`, //change api route after discussion with backend
          config
        )
        .then((res) => {
          setMessages(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      socket.emit("join chat", encodeURIComponent(data._id));
    }
  }, [data]);

  // const renderedMessages =
  //   messages.length !== 0
  //     ? messages?.map((message) => {
  //         return <Message key={message._id} {...message} />;
  //       })
  //     : null;

  useEffect(() => {
    document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
  }, [messages]);

  function handleSubmit() {
    // setComingSoon(true);
    // return;

    console.log(getCookie("_id")[2]);

    if (input) {
      setMessages([
        ...messages,
        {
          // _id: getCookie("_id")[2],
          _id: getCookie("_id")[2],
          sender: { name: "Swapnil Raj" },
          time: "12:45 PM",
          message: input,
          avatar: "https://source.unsplash.com/random/",
        },
      ]);
      setInput("");
    }
    setTimeout(() => {
      document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
    }, 100);
  }

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" ||
      e.keyCode === 13 ||
      e.which === 13 ||
      e.key === "NumpadEnter" ||
      e.code === "Enter" ||
      e.code === "NumpadEnter"
    ) {
      sendMessage();
    }
  };

  const [isGuidelineAccepted, setIsGuidelineAccepted] = useState(false);

  const [comingSoon, setComingSoon] = useState(false);

  const sendMessage = async (event) => {
    if (input) {
      socket.emit("stop typing", encodeURIComponent(data._id));
      // event.preventDefault();
      try {
        const config = {
          headers: {
            accesstoken: getAccessToken(),
          },
        };
        setInput("");
        const newData = await axios
          .post(
            `${API_URL}api/v1/chatMessage`,
            {
              content: input,
              chatId: encodeURIComponent(data._id),
            },
            config
          )
          .then((res) => {
            socket.emit("new message", res.data);
            console.log(res.data.data);
            setMessages([...messages, res.data.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on("message received", (inputReceived) => {
      setMessages((prev) => [...prev, inputReceived]);
    });
    return () => socket.off("message received");
  }, [socket]);

  // const typingHandler = async (e) => {
  //   setInput(e.target.value);

  //   if (!socketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.emit("typing", encodeURIComponent(data._id));
  //   }
  //   let lastTypingTime = new Date().getTime();
  //   var timerLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       socket.emit("stop typing", encodeURIComponent(data._id));
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // };

  return (
    <div className={`chat-container ${className ? className : ""}`}>
      <div className="chat-header">
        <div className="heading">Community Chat</div>
        <Link to="/mentorship">
          <div className="mentor-btn" style={{ cursor: "pointer" }}>
            <img src={mentor} alt="Connect to mentor" />
          </div>
        </Link>
      </div>
      <div className="chat-display">
        {messages.length !== 0 ? (
          messages?.map((message) => {
            return (
              <Message key={message._id} {...message} clientId={clientId} />
            );
          })
        ) : (
          <div className="no-message">
            <div className="heading">No messages yet</div>
            <div className="text">
              Be the first one to start the conversation
            </div>
          </div>
        )}
        {!isGuidelineAccepted && (
          <div className="chat-guidelines">
            <div className="content">
              <div className="heading">Community Chat Guidelines</div>
              <div className="text">
                <ol>
                  <li>
                    Follow code of conduct: Users should abide by the website's
                    code of conduct and report any violations they encounter.
                    This helps to maintain a safe and respectful community chat
                    environment for everyone.
                  </li>
                  <li>
                    Don't engage in illegal activities: Users should not engage
                    in any illegal activities, including hacking, pirating, or
                    sharing illegal content. Any illegal activity will not be
                    tolerated and may lead to legal consequences.
                  </li>
                  <li>
                    Don't promote products or services: Users should not use
                    community chat to promote products or services. This can be
                    seen as spamming and can lead to user complaints or
                    moderator intervention.
                  </li>
                  <li>
                    Follow website policies: Users should familiarize themselves
                    with the website's policies and guidelines and abide by
                    them. Failure to follow website policies may result in
                    warnings or bans from the community chat.
                  </li>
                </ol>
              </div>
              <div
                onClick={() => setIsGuidelineAccepted(true)}
                className="button"
              >
                I Accept
              </div>
            </div>
          </div>
        )}
        {comingSoon && (
          <div className="chat-guidelines">
            <div className="content">
              <div className="chat-coming-soon">
                Chat will be available soon
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          id="chat-input"
          className="input"
          placeholder="New Message"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e) => handleKeyDown(e)}
        />
        <div className="submit-button__container">
          <div onClick={sendMessage} className="submit-button">
            <img src={submit} alt="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
