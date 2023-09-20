import React from "react";
import "./TrendingClubCard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";

export default function TrendingClubCard({
  _id,
  name,
  clubLogo,
  clubPhoto,
  image,
  followers,
  events,
  websiteUrl,
  clubType,
  color,
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
      onClick={() => navigate(`/profile/club/${_id}`)}
      style={{
        // backgroundImage: `url(${image})`,
        backgroundImage: `url(${clubPhoto[0]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "15.5rem",
        height: "8.6875rem",
        cursor: "pointer",
      }}
      className="trending-club-card on-hover-scale"
    >
      <div
        style={{
          backgroundColor: color,
        }}
        className="details"
      >
        <img src={image} alt="logo" />
        <div>
          <div>{name}</div>
          <div>
            {/* <span>Followers: {followers}</span> */}
            <span>Events: {events}+</span>
          </div>
        </div>
      </div>
    </div>
    // </a>
  );
}
