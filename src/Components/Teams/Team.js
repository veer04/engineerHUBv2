import React from "react";
import Mentor from "../Mentors/Mentor";
import {
  COMPANYMEMBER_LID1,
  COMPANYMEMBER_LID2,
  COMPANYMEMBER_LID3,
} from "../../config/StaticLinks";
const teamMembers = [
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
];
const Team = () => {
  return (
    <Mentor courses={"Frontend Team EngineerHUB"} teamMembers={teamMembers} />
  );
};

export default Team;
