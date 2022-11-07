import React from "react";
import "../Mentors/MentorCard.css";

const MentorCard = ({
  Profession,
  Name,
  Company,
  Desc,
  LinkedIn,
  mentorImage,
}) => {
  return (
    <div className="Ment-container">
      <div className="Ment-image">
        <img src={require(`${mentorImage}`)} alt="Mentor" />
      </div>
      <div>
        {/* <div className="Ment-prof">{Profession}</div> */}
        <div className="Ment-name">{Name}</div>
        <div className="Ment-contact">
          <span>
            {Profession}
            {Company}
          </span>
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
