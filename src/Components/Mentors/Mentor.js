import React, { useState, useEffect } from "react";
import axios from "axios";
import MentorCard from "./MentorCard";
import "./Mentor.css";
// import {
//   COMPANYMEMBER_LID1,
//   COMPANYMEMBER_LID2,
//   COMPANYMEMBER_LID3,
// } from "../../config/StaticLinks";

// import Img4 from "../shared/ProfilePic/pic4.jpg";
// import Img5 from "../shared/ProfilePic/pic5.png";
// import Img7 from "../shared/ProfilePic/img7.jpg";

export default function Mentor(){

  const [mentorArr, setMentorArr] = useState([]);
  useEffect(() => {
    let subscribed = true;
    const getMentors = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/mentor`
      );
      // console.log(res);
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
        {mentorArr.map((men) => {
            return <MentorCard mentorImage={men.mentorImage} name={men.mentorName} domain={men.mentorDomain} LinkedIn={men.linkedinUrl}/>;
          })}
        {/* <MentorCard
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
        /> */}
      </div>
      </div>
    </div>
  );
};

// export default Mentor;
