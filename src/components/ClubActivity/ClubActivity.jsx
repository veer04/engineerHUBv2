import React from "react";
import "./ClubActivity.css";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";

export default function ClubActivity({
  _id,
  postedBy,
  logo,
  poster,
  description,
  shareLink,
}) {
  return (
    <div className="clubs-page-activity-card">
      <div className="details">
        <img src={logo} alt="logo" />
        {postedBy}
      </div>
      <div className="poster">
        <img src={poster} alt="poster" />
      </div>
      <div className="options">
        <div className="like">
          <FaRegHeart />
        </div>
        <div className="share">
          <GrShareOption />
        </div>
      </div>
      <div className="description">{description}</div>
    </div>
  );
}
