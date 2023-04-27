import React from "react";
import "./ClubCard.css";

export default function ClubCard({
  name,
  image,
  college,
  websiteLink,
  description,
}) {
  return (
    <a href={websiteLink}>
      <div className="club-card__container">
        <div className="main__container">
          <img src={image} alt="Club" />
          <div className="main__text">
            <h3>{name}</h3>
            <p>{college}</p>
          </div>
        </div>
        <div className="description">{description}</div>
      </div>
    </a>
  );
}
