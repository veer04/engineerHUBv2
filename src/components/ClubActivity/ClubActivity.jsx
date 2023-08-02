import React, { useEffect, useState } from "react";
import "./ClubActivity.css";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { FRONTEND_URL } from "../../services/APIUtils";
import { RWebShare } from "react-web-share";

export default function ClubActivity({
  _id,
  postedBy,
  clubData,
  postLogo,
  description,
  shareLink,
}) {
  const { collegeId } = useParams();
  const [isShownMore, setIsShownMore] = useState(false);
  const [isLiked, setIsLiked] = useState(
    sessionStorage.getItem(`${_id} isLiked`) !== null
      ? JSON.parse(sessionStorage.getItem(`${_id} isLiked`))
      : false
  );
  return (
    <div className="clubs-page-activity-card">
      <div className="details">
        <img src={clubData[0]?.image} alt="logo" />
        {clubData[0]?.name}
      </div>
      <div className="poster">
        <img src={postLogo} alt="poster" />
      </div>
      <div className="options">
        <div
          onClick={() => {
            const currentStatus = isLiked;
            setIsLiked(!currentStatus);
            sessionStorage.setItem(
              `${_id} isLiked`,
              JSON.stringify(!currentStatus)
            );
          }}
          style={{
            backgroundColor: isLiked ? "#fec2cb" : "",
          }}
          className="like"
        >
          <FaRegHeart />
        </div>
        <RWebShare
          data={{
            text: `Check out this post`,
            url: `${FRONTEND_URL}campus/${collegeId}/technical-clubs/${clubData[0]?._id}/posts/${_id}`,
            title: "Check out this post at engineerHUB",
          }}
        >
          <div className="share">
            <GrShareOption />
          </div>
        </RWebShare>
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
