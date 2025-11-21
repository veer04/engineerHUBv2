import { useNavigate, useParams } from "react-router-dom";
import { redirectToAuth } from "../../features/redirectToAuth";
import { getUserRole, isUserLoggedIn } from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./CommunityChat.css";
import useCommunityChat from "../../hooks/useCommunityChat";
import LoadingPage from "../../components/Loader/LoadingPage";
import { useEffect, useState } from "react";
import CommunityChatHeader from "./CommunityChatHeader";
import CommunityChatGroupList from "./CommunityChatGroupList";
import Chat from "./Chat";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useChatNotifications from "../../hooks/useChatNotifications";
import { SEO } from "../../components/SEO/SEO.jsx";

export default function CommunityChat() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return <LoadingPage />;
  }
  const role = getUserRole();
  if (role === "Club" || role === "Organization") {
    return <Page404 />;
  }
  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };
  const user = getAccessToken();
  const { chatId } = useParams();
  const [data, setData] = useState({});
  const [chatAccess, setChatAccess] = useState(
    !getCookie("chatDomain")
      ? {}
      : JSON.parse(decodeURIComponent(getCookie("chatDomain")[2]))
  );
  const [width, setWidth] = useState(window.innerWidth);
  const { step, setStep } = useCommunityChat();
  const { clearNavbarBadge } = useChatNotifications();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // Clear navbar badge when user enters community chat (acknowledges notifications)
    clearNavbarBadge();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [clearNavbarBadge]);

  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/chat/${encodeURIComponent(chatId)}`, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (
          err.response.data.message !== "Sorry, you are not in this chat room."
        )
          console.log(err);
      });
  }, [chatId]);

  const chatScreen = (
    <section className="chat-window">
      <Chat
        key={chatId}
        data={data}
        user={user}
        chatAccess={chatAccess}
        setChatAccess={setChatAccess}
      />
    </section>
  );

  const decodedChatId = chatId ? decodeURIComponent(chatId) : "Community";
  const chatMetaTitle = `${decodedChatId} Chat | engineerHUB Community`;
  const chatMetaDescription = `Join the ${decodedChatId} room on engineerHUB to discuss jobs, referrals, interviews, and industry news with peers and mentors.`;

  return (
    <SEO
      title={chatMetaTitle}
      description={chatMetaDescription}
      keywords={[
        "engineerhub chat",
        "career community",
        "referral support",
        "tech discussions",
        "interview help",
      ]}
    >
      <main id="chat-page">
        {width > 820 && <CommunityChatHeader />}
        <div className="chat-container">
          {width > 820 ? (
            <CommunityChatGroupList />
          ) : (
            step === 1 && <CommunityChatGroupList />
          )}
          {width > 820 ? chatScreen : step === 2 && chatScreen}
        </div>
      </main>
    </SEO>
  );
}
