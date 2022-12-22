import React, { useState, useEffect } from "react";

import TeamCard from "./TeamCard";
import { cancelToken, getTeam } from "../../services/APIConfig";
// import Mentor from "../Mentors/Mentor";
// import {
//   COMPANYMEMBER_LID1,
//   COMPANYMEMBER_LID2,
//   COMPANYMEMBER_LID3,
// } from "../../config/StaticLinks";
// const teamMembers = [
//   {
//     Profession: "Frontend Developer",
//     Name: "Rahul KM",
//     Company: "@EngineerHUB",

//     LinkedIn: COMPANYMEMBER_LID1,
//   },
//   {
//     Profession: "Frontend Developer",
//     Name: "Manish KR",
//     Company: "@EngineerHUB",
//     Desc: "HTML, CSS, JavaScript and ReactJS",
//     LinkedIn: COMPANYMEMBER_LID3,
//   },
//   {
//     Profession: "Frontend Developer",
//     Name: " Aditi JS",
//     Company: "@EngineerHUB",
//     Desc: "HTML, CSS, JavaScript and ReactJS",
//     LinkedIn: COMPANYMEMBER_LID2,
//   },
// ];

export default function Team() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    getTeam(setTeamData);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="mentor-container">
      <div className="heading">Our Team</div>
      <div className="texthire">
        engineerhub is equipped with skilled and cheerful team members:
      </div>
      <div className="card-section">
        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {teamData.map((team) => {
            return (
              <TeamCard
                image={team.image}
                name={team.name}
                domain={team.position}
                linkedIn={team.linkedinUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
