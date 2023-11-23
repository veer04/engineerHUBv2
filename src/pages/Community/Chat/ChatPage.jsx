import React, { useEffect } from "react";
import "./ChatPage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Chat from "../../../components/Chat/Chat";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import useNavbar from "../../../hooks/use-navbar";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import Page404 from "../../Maintenance/Page404";
import { redirectToAuth } from "../../../features/redirectToAuth";
import NewSidebar from "../../../components/NewSidebar/NewSidebar";

export default function ChatPage({ path, setIsChatOpen }) {
  const { id } = useParams();
  const { setSelectedPageNavbar } = useNavbar();
  const [chat, setChat] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    setIsChatOpen(true);

    return () => {
      setIsChatOpen(false);
    };
  }, [chat]);

  const user = getAccessToken();
  if (user === "" || user === null || user === undefined) {
    redirectToAuth("/login");
  }

  if (
    getCookie("role")[2] === "Club" ||
    getCookie("role")[2] === "Organization"
  ) {
    return <Page404 />;
  }

  const [chatAccess, setChatAccess] = useState(
    !getCookie("chatDomain")
      ? {}
      : JSON.parse(decodeURIComponent(getCookie("chatDomain")[2]))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("community");
    const config = {
      headers: {
        accesstoken: getAccessToken(),
      },
    };
    axios
      .get(
        `${API_URL}api/v1/chat/${encodeURIComponent(id)}`, //change api route after discussion with backend
        config
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (
          err.response.data.message !== "Sorry, you are not in this chat room."
        )
          console.log(err);
      });
  }, []);

  return (
    <>
      <MobileSidebar path={path} />
      <main className="chat-page">
        <div className="chat-section">
          <NewSidebar />
          <Chat
            data={data}
            user={user}
            chatAccess={chatAccess}
            setChatAccess={setChatAccess}
          />
        </div>
      </main>
    </>
  );
}
