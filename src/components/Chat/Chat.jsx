import React, { useEffect, useState } from "react";
import "./Chat.css";
import mentor from "./svg/mentor.svg";
import submit from "./svg/submit.svg";
import Message from "./Message";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// const GuidelineAlert = ({ guideline }) => {
//   return (
//     <Card variant="outlined">
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Community Guidelines Alert
//         </Typography>
//         <Typography variant="body1">
//           {guideline}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

export default function Chat({ className }) {
  // const navigate = useNavigate();
  const [messages, setMessages] = useState([
    // {
    //   _id: 1,
    //   userId: 1001,
    //   userName: "Manish Rai",
    //   isVerified: true,
    //   time: "12:00 PM",
    //   tags: ["Mentor"],
    //   message: "Lorem ipsum dolor sit amet",
    //   avatar: `https://source.unsplash.com/random?query=${
    //     Math.random() * 1000
    //   }`,
    // },
    // {
    //   _id: 2,
    //   userId: 1002,
    //   userName: "Yash Vardhan",
    //   isVerified: false,
    //   time: "12:15 PM",
    //   message:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam debitis porro velit dicta, nesciunt aperiam sequi consectetur eum, dignissimos obcaecati eos voluptatibus blanditiis impedit expedita suscipit similique ea doloremque.",
    //   avatar: `https://source.unsplash.com/random?query=${
    //     Math.random() * 2000
    //   }`,
    // },
    {
      _id: 3,
      userId: 1003,
      userName: "Ayush Gupta",
      isVerified: true,
      time: "12:30 PM",
      tags: ["Mentor", "Head"],
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: `https://source.unsplash.com/random?query=${
        Math.random() * 3000
      }`,
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

  const [input, setInput] = useState("");

  useEffect(() => {
    document.getElementsByClassName("chat-display")[0].scrollTo(0, 999999999);
  }, [messages]);

  function handleSubmit() {
    setComingSoon(true);
    return;
    if (input) {
      setMessages([
        ...messages,
        {
          _id: messages.length + 1,
          userId: 2001,
          userName: "Swapnil Raj",
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
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const [isGuidelineAccepted, setIsGuidelineAccepted] = useState(false);

  const [comingSoon, setComingSoon] = useState(false);

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
        {renderedMessages}
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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

// const ChatApp = () => {
//   const [showGuidelineAlert, setShowGuidelineAlert] = useState(true);
//   const [communityGuidelines, setCommunityGuidelines] = useState('');

//   const handleCloseGuidelineAlert = () => {
//     setShowGuidelineAlert(false);
//   };

//   useEffect(() => {
//     // code to fetch community guidelines from server
//     setCommunityGuidelines('Be respectful to others and follow the terms of service.');
//   }, []);

//   return (
//     <div>
//       {showGuidelineAlert && (
//         <GuidelineAlert guideline={communityGuidelines} handleClose={handleCloseGuidelineAlert} />
//       )}
//       // code to display chat messages and input field
//     </div>
//   );
// };
