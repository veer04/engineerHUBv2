import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import MentorCard from "./MentorCard";
import "./Mentor.css";

export default function Mentor() {
  const [mentorArr, setMentorArr] = useState([]);
  useEffect(() => {
    let subscribed = true;
    const getMentors = async () => {
      const res = await axios.get(
        `${API_URL}api/v1/mentor`
      );
      console.log(res.data[0]);
      setMentorArr(res.data);
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
      <div className="heading">Our Mentors</div>
      <div className="texthire"></div>
      <div className="card-section">
    
        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {mentorArr.map((men) => {
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
