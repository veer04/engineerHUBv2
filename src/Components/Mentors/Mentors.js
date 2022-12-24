import React, { useState, useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";
import { getMentors, cancelToken } from "../../services/APIConfig";
import MentorCard from "./MentorCard";
import "./Mentor.css";

export default function Mentors() {
  const { domain } = useParams();

  const [mentorData, setMentorData] = useState([]);

  const filteredMentors = useMemo(
    () =>
      mentorData.filter(
        (mentor) => mentor.mentorDomain.toLowerCase() === domain.toLowerCase()
      ),
    [mentorData, domain]
  );

  useEffect(() => {
    getMentors(setMentorData);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="mentor-container">
      <div className="heading">Our Mentors</div>
      <div className="texthire"></div>
      <div className="card-section">
        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {filteredMentors.map((men) => {
            return (
              <MentorCard
                mentorImage={men.mentorImage}
                name={men.mentorName}
                domain={men.mentorDomain}
                LinkedIn={men.linkedinUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// export default Mentor;
