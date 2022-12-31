import React, { useState, useEffect } from "react";

import TeamCard from "./TeamCard";
import { cancelToken, getTeam } from "../../services/APIConfig";

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
          style={{
            marginTop: "0px",
            gap: "40px",
            paddingBottom: "80px",
            maxWidth: "1050px",
          }}
        >
          {teamData.reverse().map((team, i) => {
            return (
              <TeamCard
                key={`${team.name}${i}`}
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
