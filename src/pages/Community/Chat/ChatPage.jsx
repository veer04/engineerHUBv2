import React, { useEffect } from "react";
import "./ChatPage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Chat from "../../../components/Chat/Chat";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";

export default function ChatPage({ path }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MobileSidebar path={path} />
      <div className="chat-page">
        <div className="chat-section">
          <Sidebar path="chat" />
          <Chat />
        </div>
      </div>
    </>
  );
}
