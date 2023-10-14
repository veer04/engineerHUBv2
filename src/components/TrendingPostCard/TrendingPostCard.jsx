import "./TrendingPostCard.css";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

export default function TrendingPostCard({ post }) {
  return (
    <div className="post-card-container">
      <div className="header">
        <div className="details">
          <div className="logo">
            <img loading="lazy" src={post?.clubData[0]?.image} alt="logo" />
          </div>
          <div className="name">
            <span>{post?.clubData[0]?.name}</span>
          </div>
        </div>
        <div className="follow-btn">
          <button>Follow</button>
        </div>
      </div>
      <div className="post-image-container">
        <img src={post?.postLogo} alt="" />
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
