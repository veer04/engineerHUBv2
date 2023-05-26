import React, { useState } from "react";
import "./ClubActivity.css";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";

export default function ClubActivity({
  _id,
  postedBy,
  clubId,
  postLogo,
  description,
  shareLink,
}) {
  const [isShownMore, setIsShownMore] = useState(false);
  return (
    <div className="clubs-page-activity-card">
      <div className="details">
        <img src={clubId.image} alt="logo" />
        {clubId.name}
      </div>
      <div className="poster">
        <img src={postLogo} alt="poster" />
      </div>
      <div className="options">
        <div className="like">
          <FaRegHeart />
        </div>
        <div className="share">
          <GrShareOption />
        </div>
      </div>
      <div
        className={`description text-crop-2 ${
          isShownMore ? "no-text-crop" : ""
        }`}
      >
        {description}
      </div>
      {!isShownMore && (
        <div onClick={() => setIsShownMore(true)} className="see-more">
          See More
        </div>
      )}
    </div>
  );
}
