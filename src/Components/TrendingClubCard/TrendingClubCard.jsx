import React from "react";
import "./TrendingClubCard.css";
import { Link } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";

export default function TrendingClubCard({
  _id,
  name,
  clubLogo,
  image,
  followers,
  events,
  websiteUrl,
}) {
  return (
    <a href={websiteUrl}>
      <div
        style={{
          // backgroundImage: `url(${image})`,
          backgroundImage: `url(${defaultPoster})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "15.5rem",
          height: "8.6875rem",
          cursor: "pointer",
        }}
        className="trending-club-card"
      >
        <div className="details">
          <img src={clubLogo} alt="logo" />
          <div>
            <div>{name}</div>
            <div>
              <span>Followers: {followers}</span>
              <span>Events: {events}+</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
