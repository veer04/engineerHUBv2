import React from "react";
import "./AlumniGlobalCard.css";

export default function AlumniGlobalCard({
  name,
  designation,
  campus,
  batch,
  image,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="alumni-global-card image alumni-global-card-dimension"
    >
      <div className="card-transition alumni-global-card-dimension">
        <p className="sub-heading">
          {campus} ({batch})
        </p>
        <p className="heading">{name}</p>
        <p className="sub-heading">{designation}</p>
      </div>
    </div>
  );
}
