import "./Chat.css";
import { Bucket_URL } from "../../services/APIUtils";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { SendIcon } from "./icons";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import Message from "./Message";
import useCommunityChat from "../../hooks/useCommunityChat";
import { RxCross1 } from "react-icons/rx";
import MessageSending from "./MessageSending";
const ENDPOINT = API_URL;
var socket;

const bucket = `${Bucket_URL}frontend/navbar/`;

export default function Chat({ data, user, chatAccess, setChatAccess }) {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref for messages container
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [loader, setLoader] = useState(false);
  const clientId = getCookie("_id")[2];
  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };
  const { setIsChatOpen, navigateBackTo, setNavigateBackTo, step, setStep } =
    useCommunityChat();

  const handleBackButton = () => {
    setStep(1);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    navigate(navigateBackTo ? navigateBackTo : "/");
    setNavigateBackTo("");
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
  }, [chatAccess]);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return;
    } else {
      axios
        .get(
          `${ENDPOINT}api/v1/chatMessage?chat_id=${encodeURIComponent(
            data._id
          )}&page=${1}&limit=${limit}`, //change api route after discussion with backend
          config
        )
        .then((res) => {
          setMessages(res.data.data.messages.reverse());
          setPage(2);
          // Scroll to bottom after initial load
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
              messagesContainerRef.current.scrollHeight;
          }
        })
        .catch((err) => {
          // if (
          //   err.response.data.message !==
          //   "Sorry, you are not in this chat room."
          // )
          console.log(err);
        });
      socket.emit("join chat", encodeURIComponent(data._id));
    }
  }, [data]);

  const prevScrollHeightRef = useRef(0);
  const isPrependingRef = useRef(false);

  const loadMoreMessages = () => {
    if (isLoadingMoreMessages || !socketConnected || messages.length === 0)
      return;
    setIsLoadingMoreMessages(true);

    if (messagesContainerRef.current) {
      prevScrollHeightRef.current = messagesContainerRef.current.scrollHeight;
    }

    axios
      .get(
        `${ENDPOINT}api/v1/chatMessage?chat_id=${encodeURIComponent(
          data._id
        )}&page=${page}&limit=${limit}`, //change api route after discussion with backend
        config
      )
      .then((res) => {
        setMessages((prev) => [...res.data.data.messages.reverse(), ...prev]);
        setPage(page + 1);
        isPrependingRef.current = true;
      })
      .catch((err) => {
        // if (
        //   err.response.data.message !==
        //   "Sorry, you are not in this chat room."
        // )
        console.log(err);
      })
      .finally(() => {
        setIsLoadingMoreMessages(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current.scrollTop === 0) {
        loadMoreMessages();
      }
    };

    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messagesContainer) {
        messagesContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreMessages]);

  useLayoutEffect(() => {
    if (isPrependingRef.current && messagesContainerRef.current) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      const scrollDifference = newScrollHeight - prevScrollHeightRef.current;
      messagesContainerRef.current.scrollTop = scrollDifference;
      isPrependingRef.current = false;
    }
  }, [messages]);

  // const renderedMessages =
  //   messages.length !== 0
  //     ? messages?.map((message) => {
  //         return <Message key={message._id} {...message} />;
  //       })
  //     : null;

  useEffect(() => {
    setMessages([]);
  }, [chatId]);

  useEffect(() => {
    if (
      !(chatAccess[chatId] === "waiting" || !!!chatAccess[chatId]) &&
      (page === 1 || page === 2)
    )
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo(
          0,
          messagesContainerRef.current.scrollHeight
        );
      }
  }, [messages, chatAccess, chatId, page]);

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
      sendMessage();
    }
  };

  const [isGuidelineAccepted, setIsGuidelineAccepted] = useState(false);

  const sendMessage = async (event) => {
    if (input.trim()) {
      socket.emit("stop typing", encodeURIComponent(data._id));
      // event.preventDefault();
      const inputCopy = input;
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
      try {
        const config = {
          headers: {
            accesstoken: getAccessToken(),
          },
        };
        setIsSendingMessage(true);
        const newData = await axios
          .post(
            `${ENDPOINT}api/v1/chatMessage`,
            {
              content: inputCopy,
              chat_id: encodeURIComponent(data._id),
            },
            config
          )
          .then((res) => {
            socket.emit("new message", res.data);
            // setMessages([...messages, res.data.data]);
            setMessages((prev) => [...prev, res.data.data]);
            // Scroll to bottom after sending a message
            if (messagesContainerRef.current) {
              document
                .getElementsByClassName("messages-container")[0]
                .scrollTo(0, 999999999);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsSendingMessage(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on("message received", (inputReceived) => {
      setMessages((prev) => [...prev, inputReceived]);
      // Scroll to bottom when a new message is received
      // if (messagesContainerRef.current) {
      //   messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      // }
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
        `${ENDPOINT}api/v1/chat/addToUserByOwn/${encodeURIComponent(chatId)}`,
        {},
        config
      )
      .then((res) => {
        Cookies.set(
          "chatDomain",
          JSON.stringify({ ...chatAccess, [chatId]: "allowed" }),
          { expires: 400 }
        );
        setChatAccess({ ...chatAccess, [chatId]: "allowed" });
        // After accepting, scroll to bottom
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isSendingMessage) {
      document
        .getElementsByClassName("messages-container")[0]
        .scrollTo(0, 999999999);
    }
  }, [isSendingMessage]);

  return (
    <div id="chat">
      <div className="header-container">
        <div className="back">
          <button onClick={handleBackButton}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="icon">
          <img src={`${bucket}logo.svg`} alt="Group icon" />
        </div>
        <div className="group">
          <h3 className="text-crop-1">{data?.chatName}</h3>
          {/* <p className="text-crop-1">Click to view details</p> */}
        </div>
        <div className="cross-option">
          <button onClick={handleCloseChat} className="cross">
            <RxCross1 />
          </button>
        </div>
        {/* <div className="options">
          <button className="option">
            <SlOptionsVertical />
          </button>
        </div> */}
      </div>
      <div
        ref={messagesContainerRef} // Attach ref to messages container
        style={{
          backgroundImage: `url(https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/community/chat-background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="messages-container"
      >
        {isLoadingMoreMessages && (
          <div className="loading-more-messages d-flex justify-content-center align-items-center pt-2">
            <div
              className="spinner-border spinner-border-md text-primary"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        )}
        {chatAccess[chatId] === "allowed" &&
          (socketConnected && messages.length !== 0 ? (
            <>
              {messages?.map((message, index) => {
                return (
                  <Message
                    key={message._id}
                    index={index}
                    messages={messages}
                    {...message}
                    clientId={clientId}
                  />
                );
              })}
              {isSendingMessage && <MessageSending />}
            </>
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
                      color: "#002b36",
                    }}
                  >
                    Connecting...
                  </span>
                )}
                {socketConnected && (
                  <span
                    style={{
                      color: "#002b36",
                    }}
                  >
                    Loading Messages...
                  </span>
                )}
              </div>
            </div>
          ))}
        {(chatAccess[chatId] === "waiting" || !!!chatAccess[chatId]) && (
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
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "I Accept"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {chatAccess[chatId] !== "waiting" &&
        messages.length !== 0 &&
        socketConnected && (
          <div className="input-container">
            {/* <div className="attachment-container">
              <button className="attachment">
                <FaPlus />
              </button>
            </div> */}
            <textarea
              className="text-input"
              placeholder="Enter message"
              ref={inputRef}
              rows={1}
              style={{
                // marginLeft to be removed when attachment button is added
                marginLeft: "12px",
                overflowY: "auto",
                resize: "none",
                maxHeight: "120px", // Adjust this value based on your line-height to accommodate up to 5 rows
              }}
              value={input}
              onInput={(e) => {
                e.target.style.height = "auto";
                const lineHeight = 24; // Replace with your actual line-height in pixels
                const maxHeight = lineHeight * 5;
                e.target.style.height = `${Math.min(
                  e.target.scrollHeight,
                  maxHeight
                )}px`;
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              // onKeyDown={handleKeyDown}
            />
            <div className="send-container">
              <button onClick={sendMessage} className="send">
                {SendIcon}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
