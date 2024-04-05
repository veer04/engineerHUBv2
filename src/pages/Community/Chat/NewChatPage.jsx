import React, { useEffect, useState } from "react";
import "./NewChatPage.css";
import { useParams } from "react-router-dom";
import { controller } from "../../../services/APIConfig";
import useNavbar from "../../../hooks/use-navbar";
import NewSidebar from "../../../components/NewSidebar/NewSidebar";
import DomainSwitcher from "../../../components/DomainSwitcher/DomainSwitcher";
import useSidebar from "../../../hooks/use-sidebar";
import Page404 from "../../Maintenance/Page404";
import { redirectToAuth } from "../../../features/redirectToAuth";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import { API_URL } from "../../../services/APIUtils";
import axios from "axios";
import NewChat from "../../../components/Chat/NewChat";
import DomainSwitcherMobileChatPage from "../../../components/DomainSwitcher/DomainSwitcherMobileChatPage";
import NewSidebarMobile from "../../../components/NewSidebarMobile/NewSidebarMobile";
import NewSidebarMobileChatPage from "../../../components/NewSidebarMobile/NewSidebarMobileChatPage";

export default function NewChatPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const { id } = useParams();
  const { setSelectedItem } = useSidebar();

  const [data, setData] = useState({});
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    document.title = `Chat | ${id} | engineerHUB`;
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
    setSelectedItem("chat");
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
  }, [id]);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* <DomainSwitcherMobile /> */}
      {width <= 820 ? (
        <div className="chat-mobile-container">
          <DomainSwitcherMobileChatPage collapsed={collapsed} />
          <NewSidebarMobileChatPage collapsed={collapsed} />
          <NewChat
            key={id}
            data={data}
            user={user}
            chatAccess={chatAccess}
            setChatAccess={setChatAccess}
            mobile
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>
      ) : (
        <main className="chat-page">
          <div className="main-container">
            <aside className="options-container">
              <DomainSwitcher />
              <NewSidebar />
            </aside>
            <div className="content-container">
              <NewChat
                key={id}
                data={data}
                user={user}
                chatAccess={chatAccess}
                setChatAccess={setChatAccess}
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
