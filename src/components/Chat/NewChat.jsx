import React, { useEffect, useState } from "react";
import "./NewChat.css";
import mentor from "./svg/mentor.svg";
import submit from "./svg/submit.svg";
import Message from "./Message";
import { Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, API_URLT } from "../../services/APIUtils";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import { io } from "socket.io-client";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import LoadingPage from "../Loader/LoadingPage";
import {
  TbLayoutBottombarCollapseFilled,
  TbLayoutNavbarCollapseFilled,
} from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const ENDPOINT = API_URLT;
var socket;

export default function NewChat({
  className,
  data,
  user,
  chatAccess,
  setChatAccess,
  mobile,
  collapsed,
  setCollapsed,
}) {
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const clientId = getCookie("_id")[2];

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (width <= 768) {
        if (
          document
            .getElementById("mobile-sidebar")
            .className.includes("translate")
        ) {
          document.getElementById("chat-container").style.maxHeight =
            "calc(100dvh - 6.7rem - 63px)";
        } else {
          document
            .getElementById("chat-container")
            .style.removeProperty("max-height");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
  }, [chatAccess]);

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
          `${ENDPOINT}api/v1/chatMessage/${encodeURIComponent(data._id)}`, //change api route after discussion with backend
          config
        )
        .then((res) => {
          setMessages(res.data.data);
        })
        .catch((err) => {
          // if (
          //   err.response.data.message !==
          //   "Sorry, you are not in this chat room."
          // )
          // console.log(err);
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
    if (!(chatAccess[id] === "waiting" || !!!chatAccess[id]))
      document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
  }, [messages]);

  // function handleSubmit() {
  //   console.log(getCookie("_id")[2]);

  //   if (input) {
  //     setMessages([
  //       ...messages,
  //       {
  //         // _id: getCookie("_id")[2],
  //         _id: getCookie("_id")[2],
  //         sender: { name: "Swapnil Raj" },
  //         time: "12:45 PM",
  //         message: input,
  //         avatar: "https://source.unsplash.com/random/",
  //       },
  //     ]);
  //     setInput("");
  //   }
  //   setTimeout(() => {
  //     document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
  //   }, 100);
  // }

  const handleKeyDown = (e) => {
    //check if the shift enter was pressed then do not send the message
    if (
      e.key === "Enter" ||
      e.keyCode === 13 ||
      e.which === 13 ||
      e.key === "NumpadEnter" ||
      e.code === "Enter" ||
      e.code === "NumpadEnter"
    ) {
      if (e.shiftKey) {
        return;
      }
    }

    if (
      e.key === "Enter" ||
      e.keyCode === 13 ||
      e.which === 13 ||
      e.key === "NumpadEnter" ||
      e.code === "Enter" ||
      e.code === "NumpadEnter"
    ) {
      sendMessageWithAttachments();
    }
  };

  const [isGuidelineAccepted, setIsGuidelineAccepted] = useState(false);

  const handlePdfUpload = async (event) => {
    console.log('PDF upload triggered');
    const file = event.target.files[0];
    console.log('Selected file:', file);
    
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      console.log('Invalid file type:', file.type);
      alert("Please select a PDF file");
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size);
      alert("File size must be less than 10MB");
      return;
    }

    console.log('File validation passed, starting upload');
    setIsUploadingPdf(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const config = {
        headers: {
          accesstoken: getAccessToken(),
          "Content-Type": "multipart/form-data",
        },
      };

      console.log('Sending PDF to backend...');
      const response = await axios.post(
        `${ENDPOINT}api/v1/chatMessage/upload-pdf`,
        formData,
        config
      );

      console.log('PDF upload response:', response.data);

      if (response.data.success) {
        console.log('PDF uploaded successfully, adding to attachments');
        setAttachments(prev => {
          const newAttachments = [...prev, response.data.data];
          console.log('Updated attachments:', newAttachments);
          return newAttachments;
        });
      } else {
        console.log('PDF upload failed:', response.data.message);
        alert("Failed to upload PDF: " + response.data.message);
      }
    } catch (error) {
      console.error("PDF upload error:", error);
      alert("Failed to upload PDF. Please try again.");
    } finally {
      setIsUploadingPdf(false);
      // Reset file input
      event.target.value = "";
    }
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessageWithAttachments = async () => {
    console.log('sendMessageWithAttachments called with:', { input: input.trim(), attachments: attachments.length });
    
    if (!input.trim() && attachments.length === 0) {
      console.log('Early return: no input and no attachments');
      return;
    }

    socket.emit("stop typing", encodeURIComponent(data._id));
    const inputCopy = input;
    const attachmentsCopy = [...attachments];
    
    console.log('Proceeding to send message with attachments:', attachmentsCopy);
    
    setInput("");
    setAttachments([]);

    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };
      
      // Prepare message payload
      const messagePayload = {
        content: inputCopy || "",
        chat_id: encodeURIComponent(data._id),
      };

      // Add attachments if present
      if (attachmentsCopy.length > 0) {
        messagePayload.attachments = attachmentsCopy;
      }
      
      const newData = await axios
        .post(
          `${ENDPOINT}api/v1/chatMessage`,
          messagePayload,
          config
        )
        .then((res) => {
          console.log('Message sent response:', res.data);
          console.log('Message data:', res.data.data);
          console.log('Attachments in response:', res.data.data.attachments);
          socket.emit("new message", res.data);
          setMessages((prev) => [...prev, res.data.data]);
          // Scroll to bottom after sending a message
          setTimeout(() => {
            document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
          }, 100);
        })
        .catch((err) => {
          console.error('Message send error:', err);
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (event) => {
    if (input.trim()) {
      socket.emit("stop typing", encodeURIComponent(data._id));
      // event.preventDefault();
      try {
        const config = {
          headers: {
            accesstoken: getAccessToken(),
          },
        };
        setInput("");
        // console.log(input);
        const newData = await axios
          .post(
            `${ENDPOINT}api/v1/chatMessage`,
            {
              content: input,
              chat_id: encodeURIComponent(data._id),
            },
            config
          )
          .then((res) => {
            socket.emit("new message", res.data);
            // console.log(res.data);
            // setMessages([...messages, res.data.data]);
            setMessages((prev) => [...prev, res.data.data]);
          })
          .catch((err) => {
            // console.log(err);
          });
      } catch (error) {
        // console.log(error);
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

  async function handleAccept() {
    setIsGuidelineAccepted(true);

    const config = {
      headers: {
        accesstoken: getAccessToken(),
      },
    };
    setInput("");
    const newData = await axios
      .put(
        `${ENDPOINT}api/v1/chat/addToUserByOwn/${encodeURIComponent(id)}`,
        {},
        config
      )
      .then((res) => {
        Cookies.set(
          "chatDomain",
          JSON.stringify({ ...chatAccess, [id]: "allowed" }),
          { expires: 400 }
        );
        setChatAccess({ ...chatAccess, [id]: "allowed" });
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  const [loader, setLoader] = useState(false);

  return (
    <div
      id="chat-container"
      className={`chat-container ${className ? className : ""} ${
        !!mobile ? "mobile" : ""
      } ${collapsed ? "collapsed" : ""}`}
    >
      <div className="chat-header">
        <div className="heading">{id}</div>
        <div
          onClick={() => setCollapsed((prev) => !prev)}
          style={{
            fontSize: "1rem",
            color: "black",
            backgroundColor: "white",
            borderRadius: ".5rem",
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".25rem",
            cursor: "pointer",
            // make text not selectable
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            KhtmlUserSelect: "none",
            OUserSelect: "none",
          }}
          className="switch"
        >
          {!collapsed ? "Expand" : "Collapse"}
          {!collapsed ? (
            <TbLayoutNavbarCollapseFilled />
          ) : (
            <TbLayoutBottombarCollapseFilled />
          )}
        </div>
        {/* <Link to="/mentorship">
          <div className="mentor-btn" style={{ cursor: "pointer" }}>
            <img src={mentor} alt="Connect to mentor" />
          </div>
        </Link> */}
      </div>
      <div
        style={{
          overflow:
            chatAccess[id] === "waiting" || !!!chatAccess[id]
              ? "hidden"
              : "auto",
        }}
        className="chat-display"
      >
        {socketConnected && messages.length !== 0 ? (
          messages?.map((message, index) => {
            return (
              <Message
                key={message._id}
                index={index}
                messages={messages}
                {...message}
                clientId={clientId}
              />
            );
          })
        ) : (
          <div
            style={{
              minHeight: "50vh",
            }}
            className="w-100 h-100 d-flex justify-content-center align-items-center flex-column"
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-2">
              {!socketConnected && (
                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  Connecting...
                </span>
              )}
              {socketConnected && (
                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  Loading Messages...
                </span>
              )}
            </div>
          </div>
        )}
        {(chatAccess[id] === "waiting" || !!!chatAccess[id]) && (
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
              <button
                onClick={() => {
                  setLoader(true);
                  handleAccept();
                }}
                className="button border-0"
              >
                {loader ? (
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only"></span>
                  </div>
                ) : (
                  "I Accept"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {chatAccess[id] !== "waiting" &&
        messages.length !== 0 &&
        socketConnected && (
          <div className="chat-input">
            {attachments.length > 0 && (
              <div className="attachments-preview">
                <div className="attachments-header">
                  <span>Attachments ({attachments.length})</span>
                </div>
                <div className="attachments-list">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="attachment-item">
                      <div className="attachment-info">
                        <div className="attachment-icon">
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div className="attachment-details">
                          <div className="attachment-name">{attachment.originalName}</div>
                          <div className="attachment-size">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        className="remove-attachment"
                        onClick={() => removeAttachment(index)}
                      >
                        <RxCross1 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="input-row">
              <div className="attachment-container">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  style={{ display: "none" }}
                  id="pdf-upload"
                  disabled={isUploadingPdf}
                />
                <label htmlFor="pdf-upload" className="attachment">
                  {isUploadingPdf ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Uploading...</span>
                    </div>
                  ) : (
                    <FaPlus />
                  )}
                </label>
              </div>
              <textarea
                id="chat-input"
                className="input"
                placeholder="New Message"
                type="text"
                value={input}
                autoComplete="off"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyUp={(e) => handleKeyDown(e)}
              />
              <div className="submit-button__container">
                <div onClick={sendMessageWithAttachments} className="submit-button">
                  <img src={submit} alt="Submit" />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
