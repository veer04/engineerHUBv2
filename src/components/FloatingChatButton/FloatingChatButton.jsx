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
      location.pathname.includes("/profile/user") ||
      location.pathname.includes("/profile/organization")
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
            borderRadius: !isChatOpen ? "50px 50px 0 50px" : "0",
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
            {/* <IoIosArrowUp /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M29.3346 15.4226C29.3346 22.4669 23.3642 28.1782 16.0013 28.1782C15.1356 28.1794 14.2722 28.0993 13.4218 27.9397C12.8097 27.8246 12.5037 27.7671 12.29 27.7998C12.0763 27.8325 11.7735 27.9934 11.168 28.3155C9.45482 29.2266 7.45724 29.5483 5.53612 29.191C6.26629 28.2929 6.76497 27.2153 6.98501 26.0601C7.11834 25.3534 6.78797 24.667 6.29316 24.1645C4.04574 21.8823 2.66797 18.8071 2.66797 15.4226C2.66797 8.37842 8.63834 2.66699 16.0013 2.66699C23.3642 2.66699 29.3346 8.37842 29.3346 15.4226Z"
                fill="white"
              />
              <path
                d="M15.9953 16H16.0073M21.3226 16H21.3346M10.668 16H10.6799"
                stroke="#138382"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      );
}
