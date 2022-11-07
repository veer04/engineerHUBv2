import React, { useState, useEffect } from "react";
import axios from "axios";
import MentorCard from "./MentorCard";
import "./Mentor.css";
import {
  COMPANYMEMBER_LID1,
  COMPANYMEMBER_LID2,
  COMPANYMEMBER_LID3,
} from "../../config/StaticLinks";

import Img4 from "../shared/ProfilePic/pic4.jpg";
import Img5 from "../shared/ProfilePic/pic5.png";
import Img7 from "../shared/ProfilePic/img7.jpg";

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
      mentorImage: `${Img7}`,
    },
  ],
}) => {
  const [mentorArr, setMentorArr] = useState();
  useEffect(() => {
    let subscribed = true;
    const getMentors = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/mentor`
      );
      console.log(res);
    };

    if (subscribed) {
      getMentors();
    }

    return () => {
      subscribed = false;
    };
  }, []);

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
          mentorImage={Img7}
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
