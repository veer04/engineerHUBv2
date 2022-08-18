import React from "react";
import MentorCard from "./MentorCard";
import "./Mentor.css";
const Mentor = ({ courses = "Mentors for DSA", about , so_icons }) => {
  return (
    <div className="mentor-container">
      <div className="heading">{courses}</div>
      <div className="texthire">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>
      <div className="card-section">
        <MentorCard so_icons={so_icons}/>
        <MentorCard so_icons={so_icons}/>
        <MentorCard so_icons={so_icons}/>
      </div>
    </div>
  );
};

export default Mentor;
