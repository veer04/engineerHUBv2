import React from "react";
import "./ClubCard.css";

export default function ClubCard({
  name,
  clubLogo,
  collegeName,
  websiteUrl,
  description,
}) {
  return (
    <a href={websiteUrl}>
      <div className="club-card__container">
        <div className="main__container">
          <img src={clubLogo} alt="Club" />
          <div className="main__text">
            <h3>{name}</h3>
            <p>{collegeName}</p>
          </div>
        </div>
        <div className="description">{description}</div>
      </div>
    </a>
  );
}
