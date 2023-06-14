import React from "react";
import { Link } from "react-router-dom";
import "./RecentActivitiesSection.css";

export default function RecentActivitiesSection() {
  const activities = [
    {
      id: 1,
      date: "Few days ago",
      title: "Coding Contest | IIT BHUEngineer’s Munch || engineerHUB",
      description:
        "Are you an aspiring engineer looking to expand your Network and connect with like-minded individuals? If so, I'd like to invite you to join us at the Engineer's मंच event! As it's clear from name , every Engineer will have their own मंच (platform) where they will have their own audience who would love to hear them .",
      link: "https://www.google.com",
    },
    {
      id: 2,
      date: "5 days ago",
      title: "Programming Challenge || IIT Jodhpur",
      description:
        "This will be a coding contest round! This round will be conducted on codeforces . Prometeo is the largest Technical and Entrepreneurial Fest in North-Western India and it received a huge participant registration of approximately 5,000 individuals from all across the nation in its previous online editions.",
      link: "https://www.google.com",
    },
    {
      id: 3,
      date: "15 days ago",
      title: "Shaastra Programming Contest || IIT Chennai",
      description:
        "Are you excited to solve challenging, algorithmic puzzles against the clock? We’ve got your back with some of the most unique and innovative problems encompassing various programming techniques. Who will rise to the challenge and emerge as the champion of programming?",
      link: "https://www.google.com",
    },
    {
      id: 4,
      date: "A month ago",
      title: "Logo Designing Contest || Cred8Gred * engineerHUB",
      description:
        "Unlock your Creativity and use your designer’s mindset to craft a Logo. Best 3 logo designers will be awarded with Cash Prizes.",
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
      <h3 className="text-crop-1">{activity.title}</h3>
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
