import React from "react";
import "./MentorCard.css";
import mentorImage from "./MediaIcons/Ment-img.jpg";
import mentorLinkedin from "./MediaIcons/icon-linkedin.png";
import mentorGmail from "./MediaIcons/icon-gmail.png";
import mentorWp from "./MediaIcons/icon-wp.png";
const MentorCard = ({so_icons = "true"}) => {
  return (
    <div className="Ment-container">
      <div className="Ment-image">
        <img src={mentorImage} alt="Mentor-Img" />
      </div>
      <div>
        <div className="Ment-prof">Mentor Profession</div>
        <div className="Ment-name">Name Surname</div>
        <div className="Ment-contact">
          Contact No: <span>99999 99999</span>
        </div>
      </div>
      {so_icons && <div className="Ment-social">
        <img src={mentorWp} alt="Mentor-wp" />
        <img src={mentorGmail} alt="Mentor-gmail" />
        <img src={mentorLinkedin} alt="Mentor-linkedin" />
      </div>}
      <div className="Ment-about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie eget
        mattis gravida aliquam eget facilisis nibh.
      </div>
      <div className="Ment-button">Connect</div>
    </div>
  );
};

export default MentorCard;
