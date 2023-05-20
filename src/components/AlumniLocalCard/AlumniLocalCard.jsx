import React from "react";
import "./AlumniLocalCard.css";

export default function AlumniLocalCard({
  image,
  name,
  designation,
  batch,
  company,
  color,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="alumni-local-card image alumni-local-card-dimension card-hover"
    >
      <div style={{ backgroundColor: color }} className="details-container">
        <div className="details">
          <p className="sub-heading-2">Batch ({batch})</p>
          <p className="heading">{name}</p>
          <p className="sub-heading-1">{designation}</p>
        </div>
        <div className="company">
          <img src={company} alt="company" />
        </div>
      </div>
    </div>
  );
}
