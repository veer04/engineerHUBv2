import React, { useState, useEffect } from "react";
import TeamCard from "../Teams/TeamCard";
import { cancelToken, getIndustry } from "../../services/APIConfig";

export default function IndustryPersona() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getIndustry(setData);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="mentor-container">
      <div className="heading">Industry Personalities</div>
      <div className="texthire">
 
      </div>
      <div className="card-section">
        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px", maxWidth: "1050px" }}
        >
          {data.map((industry) => {
            return (
              <TeamCard
                image={industry.image}
                name={industry.name}
                domain={industry.position}
                linkedIn={industry.linkedinUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
