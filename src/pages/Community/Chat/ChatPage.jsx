import React, { useEffect } from "react";
import "./ChatPage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Chat from "../../../components/Chat/Chat";

export default function ChatPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-section">
        <Sidebar path="chat" />
        <Chat />
      </div>
    </div>
  );
}
