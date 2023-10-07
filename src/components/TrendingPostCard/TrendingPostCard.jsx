import "./TrendingPostCard.css";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import defaultPoster from "../../assets/defaultPoster";
import { FiShare2 } from "react-icons/fi";
import { useState } from "react";

export default function TrendingPostCard() {
  //   const [post, setPost] = useState({});

  const post = {
    id: 1,
    name: "GDSC, Navi Mumbai",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit tenetur, totam ea ullam eum rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit tenetur, totam ea ullam eum rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit tenetur, totam ea ullam eum rem!",
    logo: defaultPoster,
    image: defaultPoster,
    likes: 56,
    isLiked: false,
    isSaved: false,
  };

  return (
    <div className="post-card-container">
      <div className="header">
        <div className="details">
          <div className="logo">
            <img src={post.logo} alt="logo" />
          </div>
          <div className="name">
            <span>{post.name}</span>
          </div>
        </div>
        <div className="follow-btn">
          <button>Follow</button>
        </div>
      </div>
      <div className="post-image-container">
        <img src={post.image} alt="" />
      </div>
      <div className="impressions-container">
        <div className="left">
          <div className="heart">
            <FaRegHeart />
            {/* <FaHeart /> */}
          </div>
          <div className="share">
            <FiShare2 />
          </div>
        </div>
        <div className="right">
          <div className="save">
            <FaRegBookmark />
            {/* <FaBookmark /> */}
          </div>
        </div>
      </div>
      <div className="likes">
        <span>{post.likes} likes</span>
      </div>
      <span className={`caption ${`text-crop-1`}`}>{post.description}</span>
    </div>
  );
}
