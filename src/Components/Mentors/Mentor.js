import React from "react";
import MentorCard from "./MentorCard";
import "./Mentor.css";
const Mentor = ({ courses, about }) => {
  return (
    <div className="mentor-container">
      <div className="mentor-heading">Mentors for DSA</div>
      <div className="about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>
      <div className="card-section">
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </div>
    </div>
  );
};

export default Mentor;
