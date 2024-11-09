import { IoIosArrowForward } from "react-icons/io";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";
import useCommunityChat from "../../hooks/useCommunityChat";

export default function CommunityChatGroupListGroup({ group }) {
  const navigate = useNavigate();
  const { setStep } = useCommunityChat();
  const handleClick = () => {
    setStep(2);
    navigate(`/chat/${encodeURIComponent(group.domain)}`);
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
          src={group.domainImage}
          alt={group.domain}
          onError={(e) => {
            e.target.src = defaultPoster;
          }}
        />
      </div>
      <div className="content">
        <p title={group.domain} className="group-name label-sm text-crop-1">
          {group.domain}
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
