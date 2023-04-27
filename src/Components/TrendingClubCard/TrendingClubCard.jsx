import React from "react";
import "./TrendingClubCard.css";

export default function TrendingClubCard({
  _id,
  name,
  logo,
  image,
  followers,
  events,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "15.5rem",
        height: "8.6875rem",
      }}
      className="trending-club-card"
    >
      <div className="details">
        <img src={logo} alt="logo" />
        <div>
          <div>{name}</div>
          <div>
            <span>Followers: {followers}</span>
            <span>Events: {events}+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
