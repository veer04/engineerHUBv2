import React from "react";
import { Link } from "react-router-dom";
import "./RecentActivitiesSection.css";

export default function RecentActivitiesSection() {
  const activities = [
    {
      id: 1,
      date: "Few days ago",
      title: "Coding Contest | IIT BHU",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci dolore sint voluptas explicabo nobis asperiores omnis perspiciatis alias hic.",
      link: "https://www.google.com",
    },
    {
      id: 2,
      date: "5 days ago",
      title: "Design Contest | AKGEC",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci dolore sint voluptas explicabo nobis asperiores omnis perspiciatis alias hic.",
      link: "https://www.google.com",
    },
    {
      id: 3,
      date: "15 days ago",
      title: "Hackathon | NIT Agartala",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci dolore sint voluptas explicabo nobis asperiores omnis perspiciatis alias hic.",
      link: "https://www.google.com",
    },
    {
      id: 4,
      date: "A month ago",
      title: "Code-a-thon | GFG",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci dolore sint voluptas explicabo nobis asperiores omnis perspiciatis alias hic.",
      link: "https://www.google.com",
    },
  ];

  const colors = ["#E8BA98", "#F7D77F", "#B2E887"];

  const handleClick = (id) => {
    //open the link in new tab
    window.open(activities[id - 1].link, "_blank");
  };

  const activityItems = activities.map((activity) => (
    <div
      onClick={() => handleClick(activity.id)}
      style={{ backgroundColor: colors[activity.id % colors.length] }}
      className="recent-activities-section-item"
      key={activity.id}
    >
      <p>{activity.date}</p>
      <h3>{activity.title}</h3>
      <span>{activity.description}</span>
    </div>
  ));

  return (
    <div className="recent-activities-section">
      <h1 className="recent-activities-section-title heading-3">
        Recent Activities
      </h1>
      <div className="recent-activities-section-container">{activityItems}</div>
    </div>
  );
}
