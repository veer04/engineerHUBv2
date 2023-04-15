import React from "react";
import "./ProjectCard.css";
import { IoPeopleOutline } from "react-icons/io5";

export default function ProjectCard({
  poster,
  id,
  title,
  description,
  tags,
  companyLogo,
  companyName,
  people,
  setProjectOpened,
  setIsProjectOpen,
}) {
  return (
    <div
      onClick={() => {
        setProjectOpened(id), setIsProjectOpen(true);
      }}
      className="project__list__item"
    >
      {
        <div
          style={{
            width: "100%",
            height: "12rem",
            //   backgroundImage: `url(${poster})`,
            backgroundImage: `url(${poster})`,
            backgroundSize: "contain",
            backgroundColor: "var(--primary-color-green)",
          }}
          className="poster"
        ></div>
      }
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="tags">
        {tags.map((tag) => (
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
              //   backgroundImage: `url(${companyLogo})`,
              backgroundColor: "grey",
              borderRadius: "50%",
            }}
            className="logo"
          ></div>
          <div className="name">{companyName}</div>
        </div>
        <div className="people">
          <div className="people__icon">
            <IoPeopleOutline />
          </div>
          <div className="people__number">{people}</div>
        </div>
      </div>
    </div>
  );
}
