import React from "react";
import "./ClubMemberCard.css";

export default function ClubMemberCard({ name, designation, image }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="club-member-card image club-member-card-dimension"
    >
      <div className="card-transition club-member-card-dimension">
        <p className="heading">{name}</p>
        <p className="sub-heading">{designation}</p>
      </div>
    </div>
  );
}
