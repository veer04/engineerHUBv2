import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCard from "./TeamCard";
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

export default function Team () {
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
    
      <div className="mentor-container">
      <div className="heading">Our Team</div>
      <div className="texthire"></div>
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
        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
    >
        {teamsObj.map((team) => {
            return <TeamCard mentorImage={team.mentorImage} name={team.mentorName} domain={team.mentorDomain} LinkedIn={team.linkedinUrl}/>;
          })}
          </div>
          </div>
          </div>
  );
};

{/* export default Team; */}
