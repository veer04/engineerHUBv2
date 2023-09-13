import React, { useState, useEffect } from "react";
import "./ClubPostCard.css";
import defaultPoster from "../../assets/defaultPoster";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { RWebShare } from "react-web-share";
import { API_URL, FRONTEND_URL } from "../../services/APIUtils";
import { useNavigate, useParams } from "react-router-dom";

export default function ClubPostCard({ _id, postLogo, likes }) {
  const navigate = useNavigate();
  const { collegeId, clubId } = useParams();
  const [isLiked, setIsLiked] = useState(
    sessionStorage.getItem(`${_id} isLiked`) !== null
      ? JSON.parse(sessionStorage.getItem(`${_id} isLiked`))
      : false
  );

  // let likesCount = isLiked ? likes + 1 : likes;

  return (
    <div
      onClick={() => navigate(`/profile/club/${clubId}/posts/${_id}`)}
      className="club-post-card card-hover"
    >
      <div
        style={{
          backgroundImage: `url(${postLogo || defaultPoster})`,
        }}
        className="poster"
      ></div>
      <div className="options">
        {/* <div className="likes">Liked by {isLiked &&  likes + 1 : likes}</div> */}
        <div>
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
              url: `${FRONTEND_URL}campus/${collegeId}/technical-clubs/${clubId}/posts/${_id}`,
              title: "Check out this post at engineerHUB",
            }}
          >
            <div className="share">
              <GrShareOption />
            </div>
          </RWebShare>
        </div>
      </div>
    </div>
  );
}
