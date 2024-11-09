import { useEffect, useState } from "react";
import CommunityChatGroupListGroup from "./CommunityChatGroupListGroup";
import { getDomains } from "../../services/APIConfig";

export default function CommunityChatGroupList() {
  const [domainData, setDomainData] = useState(
    sessionStorage.getItem("domainData")
      ? JSON.parse(sessionStorage.getItem("domainData"))
      : []
  );
  useEffect(() => {
    if (sessionStorage.getItem("domainData")) {
      setDomainData(JSON.parse(sessionStorage.getItem("domainData")));
    } else {
      getDomains(setDomainData);
    }
  }, []);

  useEffect(() => {
    if (domainData.length > 0) {
      sessionStorage.setItem("domainData", JSON.stringify(domainData));
    }
  }, [domainData]);

  // const [groups, setGroups] = useState([
  //   {
  //     id: 1,
  //     name: "Tech engineerHUB",
  //     lastMessage: "Good night, see you tomorrow",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Design engineerHUB",
  //     lastMessage: "Let's finalize the logo",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  //   {
  //     id: 3,
  //     name: "Marketing engineerHUB",
  //     lastMessage: "Campaign starts next week",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  //   {
  //     id: 4,
  //     name: "HR engineerHUB",
  //     lastMessage: "Meeting at 10 AM",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  //   {
  //     id: 5,
  //     name: "Finance engineerHUB",
  //     lastMessage: "Budget review tomorrow",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  //   {
  //     id: 6,
  //     name: "Operations engineerHUB",
  //     lastMessage: "Weekly report submitted",
  //     hasUnreadMessages: Math.random() < 0.5,
  //     icon: `https://via.placeholder.com/160?text=DE`,
  //     numberOfUnreadMessages: Math.floor(125 * Math.random()) + 1,
  //     membersCount: Math.floor(25 * Math.random()) + 1,
  //   },
  // ]);
  return (
    <aside id="chat-selector">
      <p className="heading body-md-regular">Groups</p>
      <div className="group-list">
        {domainData
          .filter((group) => group.domain !== "Non-Technical")
          .map((group) => (
            <CommunityChatGroupListGroup key={group._id} group={group} />
          ))}
      </div>
    </aside>
  );
}
