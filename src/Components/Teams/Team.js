import React, { useState, useEffect } from "react";
import axios from "axios";
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
    Desc: "HTML, CSS, JavaScript and ReactJS",
    LinkedIn: COMPANYMEMBER_LID1,
  },
  {
    Profession: "Frontend Developer",
    Name: "Manish KR",
    Company: "@EngineerHUB",
    Desc: "HTML, CSS, JavaScript and ReactJS",
    LinkedIn: COMPANYMEMBER_LID3,
  },
  {
    Profession: "Frontend Developer",
    Name: " Aditi JS",
    Company: "@EngineerHUB",
    Desc: "HTML, CSS, JavaScript and ReactJS",
    LinkedIn: COMPANYMEMBER_LID2,
  },
];

const Team = () => {
  const [teamsObj, setTeamsObj] = useState([]);

  useEffect(() => {
    let subscribed = true;
    const getTeams = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/team`
      );

      setTeamsObj(res.data);
  
    };

    if (subscribed) {
      getTeams();
    }
    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <>
      <Mentor courses={"Frontend Team EngineerHUB"} teamMembers={teamMembers} />
      <Mentor courses={"Backend Team EngineerHUB"} teamMembers={teamMembers} />
      <Mentor courses={"AppDev Team EngineerHUB"} teamMembers={teamMembers} />
      <Mentor courses={"DevOps Team EngineerHUB"} teamMembers={teamMembers} />
      <Mentor courses={"UI/UX Team EngineerHUB"} teamMembers={teamMembers} />
    </>
  );
};

export default Team;
