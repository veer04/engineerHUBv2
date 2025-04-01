import React from "react";
import "./mentorcard.css";
import { LinkedinIcon } from "../../../../../components/SvgsIconsComps/SvgsComps";

const MentorCard = ({ data, index }) => {
  const {
    position,
    name,
    desc,
    totalSession,
    totalSessionHours,
    studentsMentored,
    linkedinLink,
    mentorImage,
  } = data;

  const handleLink = () => {
    window.open(linkedinLink, "_blank");
  };

  return (
    <div className="mentor-card-main">
      <div className="top-main-div">
        <div className="mentor-head-and-linkedin">
          <div>
            <h4 className="position-h4">{position}</h4>

            <h4 className="mentor-name">{name}</h4>
          </div>

          {/* <div style={{ cursor: "pointer" }} onClick={() => handleLink()}>
            <LinkedinIcon />
          </div> */}
        </div>

        <div className="desc-div">
          <p className="desc-p">{desc}</p>
        </div>
      </div>

      <div className="bottom-main-div">
        <div className="bottom-main-sub-div">
          <div>
            <h3 className="session-value-h3">{totalSession}</h3>
            <h4 className="total-session-h4">Total Session</h4>
          </div>

          <div>
            <h3 className="session-value-h3">{totalSessionHours}</h3>
            <h4 className="total-session-h4"> Total Session hours</h4>
          </div>

          <div>
            <h3 className="session-value-h3">{studentsMentored}</h3>
            <h4 className="total-session-h4">Students Mentored </h4>
          </div>
        </div>
        <div>
          {" "}
          <img src={mentorImage} alt="mentor_image" />
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
