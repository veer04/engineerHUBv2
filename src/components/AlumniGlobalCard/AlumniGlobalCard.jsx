import React from "react";
import "./AlumniGlobalCard.css";
import { useNavigate } from "react-router-dom";

export default function AlumniGlobalCard({
  _id,
  name,
  currentProfile,
  campus,
  batch,
  image,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/campus/${campus._id}/almas/${_id}`)}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="alumni-global-card image alumni-global-card-dimension"
    >
      <div className="card-transition alumni-global-card-dimension">
        <p className="sub-heading">
          {campus?.collegeName} ({batch})
        </p>
        <p className="heading">{name}</p>
        <p className="sub-heading">{currentProfile}</p>
      </div>
    </div>
  );
}
