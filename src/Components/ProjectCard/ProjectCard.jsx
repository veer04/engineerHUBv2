import React from "react";
import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";
import useSidebar from "../../hooks/use-sidebar";
import defaultPoster from "../../assets/defaultPoster";

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
  const bgColors = [
    "rgb(247, 215, 127, 0.36)",
    "rgb(178, 232, 135, 0.3)",
    "rgb(232, 186, 152, 0.35)",
    "rgb(130, 55, 253, 0.15)",
  ];

  const textColors = [
    "rgb(255,187,0)",
    "rgb(36,255,0)",
    "rgb(243,46,79)",
    "rgb(97,22,219)",
  ];

  const { setIsCollapsed } = useSidebar();

  return (
    <div
      onClick={() => {
        setProjectOpened(_id);
        setIsProjectOpen(true);
        setIsCollapsed(true);
      }}
      className="project__list__item"
    >
      {
        <div
          style={{
            width: "100%",
            height: "12rem",
            backgroundImage: `url(${
              projectImage ? projectImage : defaultPoster
            })`,
            backgroundSize: "cover",
            backgroundColor: "rgb(238,255,255)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="poster"
        ></div>
      }
      <div className="title">{projectName}</div>
      <div className="description">{description}</div>
      <div className="tags">
        {techStack.map((tag, index) => (
          <div
            key={tag}
            style={{
              backgroundColor: bgColors[index % bgColors.length],
              color: textColors[index % textColors.length],
            }}
            className="tag"
          >
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
        {/* <div className="people">
          <div className="people__icon">
            <IoPeopleOutline />
          </div>
          <div className="people__number">100</div>
        </div> */}
      </div>
    </div>
  );
}
