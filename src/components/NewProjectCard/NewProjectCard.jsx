import React from "react";
import "./NewProjectCard.css";
import defaultPoster, {
  defaultProjectPoster,
} from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";

export default function NewProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`${project._id}`)}
      className="project-card"
    >
      <div className="poster-container">
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProjectPoster;
          }}
          src={project?.projectImage}
          alt={`${project.projectName} poster`}
        />
        <div className="tags">
          {project?.techStack?.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {project?.techStack?.length > 2 && (
            <span className="tag">+{project?.techStack?.length - 2}</span>
          )}
        </div>
      </div>
      <p className="heading text-crop-2" title={`${project.projectName}`}>
        {project.projectName}
      </p>
      <p className="description text-crop-1">{project.description}</p>
      <div className="info-container">
        <div className="logo">
          <img
            onError={(e) => {
              // e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
            src={project.organizationLogo}
            alt={`${project.organization ? project.organization : ""} logo`}
            loading="lazy"
          />
        </div>
        <div className="details">
          <span className="title">Created By</span>
          <span className="name text-crop-1">engineerHUB</span>
        </div>
      </div>
    </article>
  );
}
