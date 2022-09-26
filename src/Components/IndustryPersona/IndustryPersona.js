import React from "react";
import Mentor from "../Mentors/Mentor";
import {
  HEADMEMBER_LID1,
  HEADMEMBER_LID2,
  HEADMEMBER_LID3,
} from "../../config/StaticLinks";
const industryMembers = [
  {
    Profession: "Co-Founder",
    Name: "Karan V.S.",
    Company: "@EngineerHUB",
    LinkedIn: HEADMEMBER_LID1,
  },
  {
    Profession: "Senior Coordinator",
    Name: "Swapnil RJ",
    Company: "@EngineerHUB",
    LinkedIn: HEADMEMBER_LID3,
  },
  {
    Profession: "Co-Founder",
    Name: "Rishabh SH",
    Company: "@EngineerHUB",
    LinkedIn: HEADMEMBER_LID2,
  },
];
const IndustryPersona = () => {
  return (
    <div>
      <Mentor
        coursesDes={"engineerhub is equipped with skilled industrialists: "}
        courses={"Industry Personalities"}
        teamMembers={industryMembers}
      />
    </div>
  );
};

export default IndustryPersona;
