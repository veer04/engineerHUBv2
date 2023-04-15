import React from "react";
import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";

export default function ProjectCard({
  projectImage,
  _id,
  projectName,
  description,
  techStack,
  organizationLogo,
  organization,
  people,
  setProjectOpened,
  setIsProjectOpen,
}) {
  return (
    <div
      onClick={() => {
        setProjectOpened(_id), setIsProjectOpen(true);
        console.log(_id);
      }}
      className="project__list__item"
    >
      {
        <div
          style={{
            width: "100%",
            height: "12rem",
            backgroundImage: `url(${projectImage})`,
            backgroundSize: "contain",
            backgroundColor: "var(--primary-color-green)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="poster"
        ></div>
      }
      <div className="title">{projectName}</div>
      <div className="description">{description}</div>
      <div className="tags">
        {techStack.map((tag) => (
          <div key={tag} className="tag">
            {tag}
          </div>
        ))}
      </div>
      <div className="details">
        <div className="company__details">
          <div
            style={{
              width: "2rem",
              height: "2rem",
              backgroundImage: `url(${organizationLogo})`,
              backgroundColor: "grey",
              borderRadius: "50%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="logo"
          ></div>
          <div className="name">{organization}</div>
        </div>
        <div className="people">
          <div className="people__icon">
            <IoPeopleOutline />
          </div>
          <div className="people__number">100</div>
        </div>
      </div>
    </div>
  );
}
