import React, { useState, useEffect } from "react";
import "./ClubPostCard2.css";
import defaultPoster from "../../assets/defaultPoster";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { RWebShare } from "react-web-share";
import { API_URL, FRONTEND_URL } from "../../services/APIUtils";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function ClubPostCard2({
  _id,
  postLogo,
  description,
  likes,
  handleDelete,
}) {
  const navigate = useNavigate();
  const { collegeId, clubId } = useParams();
  const [isLiked, setIsLiked] = useState(
    sessionStorage.getItem(`${_id} isLiked`) !== null
      ? JSON.parse(sessionStorage.getItem(`${_id} isLiked`))
      : false
  );
  const [status, setStatus] = useState("normal");

  return (
    <div
      style={{
        padding: `${status === "deleting" ? "0" : "0.4rem 0.4rem"}`,
        transition: `${
          status === "deleting" ? "none" : "all 0.2s ease-in-out"
        }}`,
      }}
      onClick={() => navigate(`/profile/club/${clubId}/manage-posts/${_id}`)}
      className="club-post-card-2 card-hover club-post-card-2-edit"
    >
      <div
        style={{
          backgroundImage: `url(${postLogo || defaultPoster})`,
        }}
        className="poster"
      ></div>
      <div className="description">{description}</div>
      <div
        onClick={(e) => {
          setStatus("deleting");
          handleDelete(_id, setStatus);
          // code to stop click event to propagate to parent
          if (!e) var e = window.event;
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
        }}
        className="delete-container"
      >
        <MdDelete />
      </div>
      {status === "deleting" && (
        <div className="loading-container">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
