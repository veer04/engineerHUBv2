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
    Company: "@engineerHUB",
    Desc:"Co-Founder of engineerHUB",
    LinkedIn: HEADMEMBER_LID1,
  },
  {
    Profession: "Senior Coordinator",
    Name: "Swapnil RJ",
    Company: "@engineerHUB",
    Desc:"Senior Coordinator of engineerHUB",
    LinkedIn: HEADMEMBER_LID3,
  },
  {
    Profession: "Founder",
    Name: "Rishabh SH",
    Company: "@EngineerHUB",
    Desc:"Founder of engineerHUB",
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
