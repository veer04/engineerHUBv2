import React from "react";
import { Link } from "react-router-dom";
import "./RecentActivitiesSection.css";

export default function RecentActivitiesSection() {
  function computeTime(givenDate) {
    const date = new Date(givenDate);
    let days = date.getTime() - new Date().getTime();
    days = Math.floor(days / (1000 * 3600 * 24));
    const formatter = new Intl.RelativeTimeFormat(undefined, {
      numeric: "auto",
    });
    const parts = formatter.formatToParts(days, "days");
    if (parts.length > 1 && parts[1].type === "integer") {
      parts[0].value = "";
      parts[2].value = " days left";
    }
    const time = parts.map((part) => part.value).join("");
    return time;
  }

  const activities = [
    {
      id: 1,
      date: "Few days ago",
      title: "Engineer’s Munch || engineerHUB ",
      description:
        "Are you an aspiring engineer looking to expand your Network and connect with like-minded individuals? If so, I'd like to invite you to join us at the Engineer's मंच event! As it's clear from name, every Engineer will have their own मंच (platform) where they will have their own audience who would love to hear them.",
      link: "https://discord.gg/xNcefnFEVu",
      time:
        computeTime("2023-06-14T18:30:00.000Z").charAt(0).toUpperCase() +
        computeTime("2023-06-14T18:30:00.000Z").slice(1),
    },
    {
      id: 2,
      date: "5 days ago",
      title: "Programming Challenge || IIT Jodhpur",
      description:
        "This will be a coding contest round! This round will be conducted on codeforces. Prometeo is the largest Technical and Entrepreneurial Fest in North-Western India and it received a huge participant registration of approximately 5,000 individuals from all across the nation in its previous online editions.",
      link: "https://codeforces.com/contests/421473",
      time: computeTime("2023-04-11T18:30:00.000Z"),
    },
    {
      id: 3,
      date: "15 days ago",
      title:
        "Machine Learning || Exploratory data analysis (EDA) using Python @ engineerHUB",
      description:
        "Before you start any Machine learning project, it's EDA which ensures readiness of data. Without a proper EDA, Machine learning work suffer from accuracy issues and many times, algos won't work.",
      link: "https://youtube.com/live/9XdZqzHzyGY",
      time: computeTime("2022-10-15T18:30:00.000Z"),
    },
    {
      id: 4,
      date: "A month ago",
      title: "IIT Kanpur Monthly Coding Contest ",
      description:
        "Participate in monthly coding contest to sharpen your problem solving skills.",
      link: "https://www.codechef.com/WPC1401",
      time: computeTime("2023-03-05T18:30:00.000Z"),
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
      <p>{activity.time}</p>
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
