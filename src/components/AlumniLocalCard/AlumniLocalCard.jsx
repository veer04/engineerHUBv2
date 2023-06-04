import React from "react";
import "./AlumniLocalCard.css";
import { useNavigate } from "react-router-dom";

export default function AlumniLocalCard({
  _id,
  image,
  name,
  currentProfile,
  batch,
  companyName,
  color,
  campus,
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
      className="alumni-local-card image alumni-local-card-dimension card-hover"
    >
      <div style={{ backgroundColor: color }} className="details-container">
        <div className="details">
          {batch && <p className="sub-heading-2">Batch ({batch})</p>}
          <p className="heading">{name}</p>
          <p className="sub-heading-1">{currentProfile}</p>
        </div>
        {/* {companyName && (
          <div className="company">
            <img src={companyName} alt={companyName} />
          </div>
        )} */}
      </div>
    </div>
  );
}
