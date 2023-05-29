import React, { useEffect } from "react";
import "./ChatPage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Chat from "../../../components/Chat/Chat";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import useNavbar from "../../../hooks/use-navbar";

export default function ChatPage({ path }) {
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("community");
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
