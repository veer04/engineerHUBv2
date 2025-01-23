import { useEffect, useState } from "react";
import "./FloatingChatButton.css";
import { IoIosArrowUp } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import useCommunityChat from "../../hooks/useCommunityChat";

export default function FloatingChatButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isChatOpen, setIsChatOpen, setNavigateBackTo, lastOpenChat } =
    useCommunityChat();
  const [width, setWidth] = useState(window.innerWidth);
  const [displayChatButton, setDisplayChatButton] = useState(true);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isChatOpen && !location.pathname.includes("/chat")) {
      setTimeout(() => {
        navigate(
          `/chat/${encodeURIComponent(
            lastOpenChat ? lastOpenChat : `Announcements & Updates`
          )}`
        );
        if (document.getElementById("floating-chat-button")) {
          document.getElementById("floating-chat-button").style.display =
            "none";
        }
      }, 250);
    } else {
      if (document.getElementById("floating-chat-button")) {
        document.getElementById("floating-chat-button").style.display = "flex";
      }
    }
  }, [isChatOpen, navigate]);

  useEffect(() => {
    setIsChatOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname.includes("referrals") ||
      location.pathname.includes("host") ||
      location.pathname.includes("/profiledashboard")
    ) {
      setDisplayChatButton(false);
    } else setDisplayChatButton(true);
  }, [location]);

  const handleOpenChat = () => {
    setNavigateBackTo(location.pathname + location.search);
    setIsChatOpen(true);
  };

  return location.pathname.includes("/chat/")
    ? null
    : displayChatButton && (
        <button
          id="floating-chat-button"
          onClick={handleOpenChat}
          className="body-lg-regular"
          style={{
            position: "fixed",
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
            opacity: !isChatOpen ? 1 : 0,
            bottom: !isChatOpen ? (width > 820 ? "1rem" : "4.25rem") : "0",
            right: !isChatOpen ? (width > 820 ? "1rem" : ".25rem") : "0",
            height: !isChatOpen ? "60px" : "100vh",
            width: !isChatOpen ? (width > 820 ? "252px" : "108px") : "100vw",
            borderRadius: !isChatOpen ? "24px 24px 0 24px" : "0",
            boxShadow: !isChatOpen ? "0 0 10px 0 rgba(0, 0, 0, 0.1)" : "none",
            padding: "1rem",
            backgroundColor: "#138382",
            color: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {width > 820 ? "Community Chat" : "Chat"}
          <div className="chat-button-icon">
            <IoIosArrowUp />
          </div>
        </button>
      );
}
