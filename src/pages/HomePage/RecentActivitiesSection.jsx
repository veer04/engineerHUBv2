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
      title: "Chatbot using python(CHAT GPT API) WORKSHOP 2023",
      description:
        "About Event 1. INTRODUCTION TO ANACONDA, JUPYTER NOTEBOOK.2. VARIABLES AND DATA TYPES3. PYTHON OPERATORS4. LIST, TUPLE, DICTIONARY5. CONDITIONAL & LOOPS STATEMENTS IN PYTHON6. IMPORTING THE OPEN AI CHATGPT 3.5 TURBO AND CREATING A CUSTOM INTERFACE.7. CREATING CUSTOM RESPONSES FOR SPECIFIC QUESTIONS8. WORKSHOP CONCLUSION**NOTE: LAPTOP IS MANDATORY, SINCE HANDS-ON SESSIONS NEEDS PROGRAMMING",
      link: "https://rzp.io/l/MB7dsu0uN9",
      time:
        computeTime("2023-08-05T18:30:00.000Z").charAt(0).toUpperCase() +
        computeTime("2023-08-05T18:30:00.000Z").slice(1),
    },
    {
      id: 2,
      title: "Embedded System Design Workshop 2023",
      description:
        "INTRODUCTION EMBEDDED SYSTEM BASIC ELECTRONICS ARDUINO PROGRAMMING DIGITAL INPUTS / OUTPUTS LED BLINKING SWITCH INTERFACING PROGRAMMING SERIAL COMMUNICATION PROGRAMMING ANALOG INPUTS ANALOG SENSOR INTERFACING PROGRAMMING ANALOG OUTPUTS RGB LED INTERFACING SERVO MOTOR INTERFACING **NOTE: LAPTOP IS MANDATORY, SINCE HANDS-ON SESSIONS NEEDS PROGRAMMING ",
      link: "https://rzp.io/l/xIyajVG",
      time:
        computeTime("2023-08-06T18:30:00.000Z").charAt(0).toUpperCase() +
        computeTime("2023-08-06T18:30:00.000Z").slice(1),
    },
    {
      id: 3,
      title:
        "Machine Learning || Exploratory data analysis (EDA) using Python @ engineerHUB",
      description:
        "Before you start any Machine learning project, it's EDA which ensures readiness of data. Without a proper EDA, Machine learning work suffer from accuracy issues and many times, algos won't work.",
      link: "https://youtube.com/live/9XdZqzHzyGY",
      time:
        computeTime("2023-03-21T18:30:00.000Z").charAt(0).toUpperCase() +
        computeTime("2023-03-21T18:30:00.000Z").slice(1),
    },
    {
      id: 4,
      title:
        "No need for SDE-1 level engineers?? || Insights by a Googler || @engineerHUB1",
      description:
        "In this session you'll be getting insights about the chat GPT by Mr. Abhishek Sharma SDE  @Google . When Chat GPT comes then it brings a lot of queries and I assure you guys that after attending the session all your queries will get resolved.",
      link: "https://youtube.com/live/5hbYb33F1zQ",
      time:
        computeTime("2023-03-05T18:30:00.000Z").charAt(0).toUpperCase() +
        computeTime("2023-03-05T18:30:00.000Z").slice(1),
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
