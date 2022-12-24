import React from "react";
import "./MentorCard.css";

const MentorCard = ({
  Profession,
  name,
  domain,
  Desc,
  LinkedIn,
  mentorImage,
}) => {
  return (
    <div className="Ment-container">
      <div className="Ment-image">
        <img src={mentorImage} alt="Mentor" />
      </div>
      <div>
        <div className="Ment-name">{name}</div>
        <div className="Ment-contact">
          <span>{domain}</span>
        </div>
      </div>

      <a
        target="_blank"
        href={LinkedIn}
        rel="noopener noreferrer"
        className="Ment-button"
      >
        Connect
      </a>
    </div>
  );
};

export default MentorCard;
