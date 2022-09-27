import React from "react";
import MentorCard from "./MentorCard";
import "./Mentor.css";
import {
  COMPANYMEMBER_LID1,
  COMPANYMEMBER_LID2,
  COMPANYMEMBER_LID3,
} from "../../config/StaticLinks";
import Img2 from "../shared/ProfilePic/pic2.png";

import Img4 from "../shared/ProfilePic/pic4.png";
import Img5 from "../shared/ProfilePic/pic5.png";

const Mentor = ({
  coursesDes = "engineerhub is equipped with skilled industrialists: ",
  courses = "Mentors for DSA",
  teamMembers = [
    {
      Profession: "Frontend Developer",
      Name: "Rahul KM",
      Company: "@EngineerHUB",
      Desc: "HTML, CSS, JavaScript, ReactJS",
      LinkedIn: COMPANYMEMBER_LID1,
      mentorImage: `${Img4}`,
    },
    {
      Profession: "Frontend Developer",
      Name: "Manish KR",
      Company: "@EngineerHUB",
      Desc: "HTML, CSS, JavaScript, ReactJS",
      LinkedIn: COMPANYMEMBER_LID3,
      mentorImage: `${Img5}`,
    },
    {
      Profession: "Frontend Developer",
      Name: " Aditi JS",
      Company: "@EngineerHUB",
      Desc: "HTML, CSS, JavaScript, ReactJS",
      LinkedIn: COMPANYMEMBER_LID2,
      mentorImage: `${Img2}`,
    },
  ],
}) => {
  return (
    <div className="mentor-container">
      <div className="heading">{courses}</div>
      <div className="texthire">{coursesDes}</div>
      <div className="card-section">
        {/* {teamMembers.map((member) => {
          return (
            <MentorCard
              mentorImage={member.mentorImage}
              Profession={member.Profession}
              Name={member.Name}
              Company={member.Company}
              Desc={member.Desc}
              LinkedIn={member.LinkedIn}
            />
          );
        })} */}
        <MentorCard
          mentorImage={Img4}
          Profession={"Frontend Developer"}
          Name={"Rahul KM"}
          Company={"@engineerHUB"}
          Desc={"HTML, CSS, JavaScript, ReactJS"}
          LinkedIn={COMPANYMEMBER_LID1}
        />
        <MentorCard
          mentorImage={Img5}
          Profession={"Frontend Developer"}
          Name={"Manish KR"}
          Company={"@engineerHUB"}
          Desc={"HTML, CSS, JavaScript, ReactJS"}
          LinkedIn={COMPANYMEMBER_LID3}
        />
        <MentorCard
          mentorImage={Img2}
          Profession={"Frontend Developer"}
          Name={"Aditi JS"}
          Company={"@engineerHUB"}
          Desc={"HTML, CSS, JavaScript, ReactJS"}
          LinkedIn={COMPANYMEMBER_LID2}
        />
      </div>
    </div>
  );
};

export default Mentor;
