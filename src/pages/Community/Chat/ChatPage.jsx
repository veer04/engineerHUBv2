import React, { useEffect } from "react";
import "./ChatPage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Chat from "../../../components/Chat/Chat";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import useNavbar from "../../../hooks/use-navbar";
import { getAccessToken } from "../../../features/getCookieValues";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";

export default function ChatPage({ path }) {
  const { id } = useParams();
  const { setSelectedPageNavbar } = useNavbar();
  const [chat, setChat] = useState({});
  const [data, setData] = useState({});

  const user = getAccessToken();
  if (user === "" || user === null || user === undefined) {
    window.location.href = "/login";
  }

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
        `${API_URL}api/v1/chat/${id}`, //change api route after discussion with backend
        config
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MobileSidebar path={path} />
      <div className="chat-page">
        <div className="chat-section">
          <Sidebar path="chat" />
          <Chat data={data} user={user} />
        </div>
      </div>
    </>
  );
}
