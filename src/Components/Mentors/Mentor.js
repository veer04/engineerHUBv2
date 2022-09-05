import React from "react";
import MentorCard from "./MentorCard";
import "./Mentor.css";
import {
  COMPANYMEMBER_LID1,
  COMPANYMEMBER_LID2,
  COMPANYMEMBER_LID3,
} from "../../config/StaticLinks";
const Mentor = ({
  courses = "Mentors for DSA",
  teamMembers = [
    {
      Profession: "Frontend Developer",
      Name: "Rahul KM",
      Company: "@EngineerHUB",
      LinkedIn: COMPANYMEMBER_LID1,
    },
    {
      Profession: "Frontend Developer",
      Name: "Manish KR",
      Company: "@EngineerHUB",
      LinkedIn: COMPANYMEMBER_LID3,
    },
    {
      Profession: "Frontend Developer",
      Name: " Aditi JS",
      Company: "@EngineerHUB",
      LinkedIn: COMPANYMEMBER_LID2,
    },
  ],
}) => {
  return (
    <div className="mentor-container">
      <div className="heading">{courses}</div>
      <div className="texthire">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>
      <div className="card-section">
        {teamMembers.map((member) => {
          return (
            <MentorCard
              Profession={member.Profession}
              Name={member.Name}
              Company={member.Company}
              LinkedIn={member.LinkedIn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mentor;
