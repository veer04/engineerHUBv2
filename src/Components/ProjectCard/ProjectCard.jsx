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
}) {
  return (
    <div className="project__list__item">
      {poster && (
        <div
          style={{
            width: "100%",
            height: "10rem",
            //   backgroundImage: `url(${poster})`,
            backgroundColor: "grey",
          }}
          className="poster"
        ></div>
      )}
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
