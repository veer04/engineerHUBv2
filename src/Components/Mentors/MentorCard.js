import React from "react";
import "./MentorCard.css";
import {Link} from "react-router-dom";
import mentorImage from "./MediaIcons/Ment-img.jpg";
import mentorLinkedin from "./MediaIcons/icon-linkedin.png";
import mentorGmail from "./MediaIcons/icon-gmail.png";
import mentorWp from "./MediaIcons/icon-wp.png";
const MentorCard = ({ Profession, Name, Company, LinkedIn }) => {
  return (
    <div className="Ment-container">
      <div className="Ment-image">
        <img src={mentorImage} alt="Mentor-Img" />
      </div>
      <div>
        <div className="Ment-prof">{Profession}</div>
        <div className="Ment-name">{Name}</div>
        <div className="Ment-contact">
          <span>{Company}</span>
        </div>
      </div>

      <div className="Ment-about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie eget
        mattis gravida aliquam eget facilisis nibh.
      </div>
      <a target="_blank" href={LinkedIn} className="Ment-button">Connect</a>
    </div>
  );
};

export default MentorCard;
