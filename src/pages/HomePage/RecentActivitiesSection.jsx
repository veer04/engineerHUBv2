import React from "react";
import { Link } from "react-router-dom";
import "./RecentActivitiesSection.css";

export default function RecentActivitiesSection() {
  // function computeTime(givenDate) {
  //   const date = new Date(givenDate);
  //   let days = date.getTime() - new Date().getTime();
  //   days = Math.floor(days / (1000 * 3600 * 24));
  //   const formatter = new Intl.RelativeTimeFormat(undefined, {
  //     numeric: "auto",
  //   });
  //   const parts = formatter.formatToParts(days, "days");
  //   if (parts.length > 1 && parts[1].type === "integer") {
  //     parts[0].value = "";
  //     parts[2].value = " days left";
  //   }
  //   const time = parts.map((part) => part.value).join("");
  //   return time;
  // }

  // const currDate1 = new Date().getFullYear();
  // const currDate2 = new Date().getMonth() + 1;
  // const currDate3 = new Date().getDate();

  const activities = [
    {
      id: 1,
      title: "engineer मंच",
      description:
        "Are you an aspiring engineer looking to expand your Network and connect with like-minded individuals? If so, I'd like to invite you to join us at the Engineer's मंच event! As it's clear from name , every Engineer will have their own मंच (platform) where they will have their own audience who would love to hear them.",
      link: "https://meet.google.com/ket-xnbz-pxa",
      // time:
      //   computeTime(`${currDate1}-${currDate2}-${currDate3}T21:30:00.000Z`)
      //     .charAt(0)
      //     .toUpperCase() +
      //   computeTime(
      //     `${currDate1}-${currDate2}-${currDate3}T21:30:00.000Z`
      //   ).slice(1),
    },
    {
      id: 2,
      title: "Crack Top Product Based Company with Android Development",
      description:
        "Join us for an upcoming session on 'Cracking Top Product Based Companies with Android Development'! on 29Oct , 5pm with Kapil Yadav , Android Developer @Glance. Don't miss this golden opportunity to unlock the secrets of success and pave your way to a rewarding career in the world of Android development!",
      link: "https://www.engineerhub.in/community/events/App%20Development/653b570a2a4dedf014ce3353",
      // time:
      //   computeTime("2023-10-29T17:00:00.000Z").charAt(0).toUpperCase() +
      //   computeTime("2023-10-29T17:00:00.000Z").slice(1),
    },
    {
      id: 3,
      title:
        "Open QnA Session with a GOOGLER",
      description:
        "We're thrilled to offer our participants an exclusive opportunity to connect directly with our guest lecturer, Miss Dhruvi Shah, through a live Google Meet session. You can bring your questions and doubts for her to address during this interactive session.",
      link: "https://www.youtube.com/live/TQLzHE3NwIU?si=FSZKj26QitpCNwvv",
      // time:
      //   computeTime("2023-10-22T17:00:00.000Z").charAt(0).toUpperCase() +
      //   computeTime("2023-10-22T17:00:00.000Z").slice(1),
    },
    {
      id: 4,
      title:
        "Prep2Crack",
      description:
        "Are you a student, a coding enthusiast, or someone looking to level up their programming skills? If you are, then mark the calendar for \"Prep2Crack\". Here's why attending this event is crucial for your coding journey: ▪️Elevate Your Coding Skills ▪️ Real-world Problem Solving: ▪️ Competition and Collaboration ▪️ Recognition and Prizes Join us for \"Prep2Crack\" on the HackerRank platform and unlock your potential as a coder.",
      link: "https://www.engineerhub.in/community/events/Data%20Structures%20%26%20Algorithms/652d89588db725f8bac07a1e",
      // time:
      //   computeTime("2023-10-18T17:00:00.000Z").charAt(0).toUpperCase() +
      //   computeTime("2023-10-18T17:00:00.000Z").slice(1),
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
      {/* <p>{activity.time}</p> */}
      <h3 className="text-crop-1">{activity.title}</h3>
      <span>{activity.description}</span>
    </div>
  ));

  return (
    <div className="recent-activities-section">
      <h1 className="recent-activities-section-title heading-3">
        {/* Recent Activities */}
        Activities
      </h1>
      <div className="recent-activities-section-container">{activityItems}</div>
    </div>
  );
}
