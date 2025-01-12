import React from "react";
import "./NewBlogCard.css";
import defaultPoster, {
  defaultBlogPoster,
  defaultProjectPoster,
  eHUBLogo,
} from "../../assets/defaultPoster";
import { useNavigate, useParams } from "react-router-dom";

export default function NewBlogCard({ blog }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <article onClick={() => navigate(`${blog._id}`)} className="blog-card">
      <div className="poster-container">
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultBlogPoster;
          }}
          src={blog?.postIcon}
          alt={`${blog.title} poster`}
        />
        <div className="tags">
          {blog?.techStack?.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {blog?.techStack?.length > 2 && (
            <span className="tag">+{blog?.techStack?.length - 2}</span>
          )}
        </div>
      </div>
      <p className="heading text-crop-2" title={`${blog?.title}`}>
        {blog?.title}
      </p>
      {/* <p
        className="description text-crop-1"
        dangerouslySetInnerHTML={{
          __html: blog?.postArea,
        }}
      /> */}
      <div className="info-container">
        <div className="logo">
          <img
            onError={(e) => {
              // e.target.onerror = null;
              e.target.src = eHUBLogo;
            }}
            src={id === "General" ? eHUBLogo : blog?.creatorId?.image}
            alt={`${blog?.creatorId?.name ? blog?.creatorId?.name : ""} logo`}
            loading="lazy"
          />
        </div>
        <div className="details">
          <span className="title">Created By</span>
          <span className="name text-crop-1">
            {id === "General"
              ? "engineerHUB"
              : blog?.creatorId?.firstName
              ? `${blog?.creatorId?.firstName} ${
                  blog?.creatorId?.lastName ? blog?.creatorId?.lastName : ""
                }`
              : "engineerHUB"}
          </span>
        </div>
      </div>
    </article>
  );
}
