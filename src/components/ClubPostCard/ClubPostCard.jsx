import React from "react";
import "./ClubPostCard.css";
import defaultPoster from "../../assets/defaultPoster";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";

export default function ClubPostCard() {
  return (
    <div className="club-post-card card-hover">
      <div
        style={{
          backgroundImage: `url(${defaultPoster})`,
        }}
        className="poster"
      ></div>
      <div className="options">
        <div className="like">
          <FaRegHeart />
        </div>
        <div className="share">
          <GrShareOption />
        </div>
      </div>
    </div>
  );
}
