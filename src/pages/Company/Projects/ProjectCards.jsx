import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import "./ProjectCards.css";

const ProjectCards = ({ data }) => {
  return (
    <a href={`/company/projects/${data.projectId}`}>
      <div className="ProjectCardTile">
        {data.img ? (
          <img src={data.img} className="imageBanner" alt="Image" />
        ) : (
          <></>
        )}
        <div className="ProjectCardContent">
          <h1>{data.name}</h1>
          <p>{data.desc}</p>
          <div className="tags">
            {data.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <br />
          <div className="organization">
            <div className="logo">
              {data.organization.logo ? (
                <img
                  src={data.organization.logo}
                  alt="logo"
                  className="logoImg"
                />
              ) : (
                <></>
              )}
            </div>
            <h5>{data.organization.name}</h5>
            <span>
              <span className="icon">
                <IoPeopleOutline />
              </span>
              <h6>{data.organization.submissions}</h6>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCards;
