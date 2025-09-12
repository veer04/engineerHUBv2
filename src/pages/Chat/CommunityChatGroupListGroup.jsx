import { IoIosArrowForward } from "react-icons/io";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";
import useCommunityChat from "../../hooks/useCommunityChat";
import useChatNotifications from "../../hooks/useChatNotifications";

export default function CommunityChatGroupListGroup({ group }) {
  const navigate = useNavigate();
  const { setStep, setLastOpenChat } = useCommunityChat();
  const { clearNotifications, clearNavbarBadge } = useChatNotifications();
  
  const handleClick = () => {
    setStep(2);
    setLastOpenChat(group.chatName);
    
    // Clear notifications for this specific group only
    // Do NOT clear navbar badge here - it should only be cleared when user leaves community chat
    if (group._id) {
      clearNotifications(group._id);
    }
    
    navigate(`/chat/${encodeURIComponent(group.chatName)}`);
  };
  return (
    <button
      onClick={() => handleClick()}
      className="group"
      style={{
        alignItems: group?.hasUnreadMessages ? "flex-end" : "center",
      }}
    >
      <div className="icon">
        <img
          src={group.image}
          alt={group.chatName}
          onError={(e) => {
            e.target.src = defaultPoster;
          }}
        />
      </div>
      <div className="content">
        <p title={group.chatName} className="group-name label-sm text-crop-1">
          {group.chatName}
        </p>
        {/* <p
          title={group?.lastMessage}
          className="group-info label-xsm text-crop-1"
        >
          {group?.hasUnreadMessages
            ? group?.lastMessage
            : `${group?.membersCount} Members`}
        </p> */}
      </div>
      <div className="right">
        {group?.hasUnreadMessages && (
          <p className="unread-message">{group?.numberOfUnreadMessages}</p>
        )}
        {!group?.hasUnreadMessages && (
          <p className="arrow">
            <IoIosArrowForward style={{ fontSize: "1.5rem" }} />
          </p>
        )}
      </div>
    </button>
  );
}
