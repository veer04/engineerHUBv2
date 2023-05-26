import React from "react";
import "./ClubCard.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ClubCard({
  _id,
  name,
  image,
  collegeName,
  // websiteUrl,
  description,
  clubType,
}) {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const typeOfClub =
    clubType === "Technical"
      ? "technical-clubs"
      : clubType === "Cultural"
      ? "cultural-clubs"
      : "technical-clubs";
  return (
    // <a href={websiteUrl}>
    <div
      onClick={() => {
        navigate(`/campus/${collegeId}/${typeOfClub}/${_id}`);
      }}
      className="club-card__container on-hover-scale"
    >
      <div className="main__container">
        <img src={image} alt="Club" />
        <div className="main__text">
          <h3>{name}</h3>
          <p>{collegeName}</p>
        </div>
      </div>
      <div className="description">{description}</div>
    </div>
    // </a>
  );
}
