import React, { useState } from "react";
import "./ClubActivity.css";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { FRONTEND_URL } from "../../services/APIUtils";
import { RWebShare } from "react-web-share";

export default function ClubActivity({
  _id,
  postedBy,
  clubId,
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
        <img src={clubId.image} alt="logo" />
        {clubId.name}
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
            url: `${FRONTEND_URL}campus/${collegeId}/technical-clubs/${clubId._id}/posts/${_id}}`,
            title: "Check out this post at engineerHUB",
          }}
          onClick={() => console.info("shared successfully")}
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
