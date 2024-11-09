import { useNavigate } from "react-router-dom";
import useCommunityChat from "../../hooks/useCommunityChat";
import { CrossIcon, OnlineGroupIcon } from "./icons";

export default function CommunityChatHeader({ onlineCount }) {
  const navigate = useNavigate();
  const { setIsChatOpen, navigateBackTo, setNavigateBackTo } =
    useCommunityChat();
  const handleCloseChat = () => {
    setIsChatOpen(false);
    navigate(navigateBackTo ? navigateBackTo : "/");
    setNavigateBackTo("");
  };

  return (
    <div className="header">
      <h1 className="body-lg-semibold">Community Chats</h1>
      <div className="right">
        <button className="online label-sm">
          {OnlineGroupIcon} Online: {onlineCount}
        </button>
        <button className="cancel" onClick={handleCloseChat}>
          {CrossIcon}
        </button>
      </div>
    </div>
  );
}
