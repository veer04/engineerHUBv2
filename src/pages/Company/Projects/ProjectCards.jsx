import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import "./ProjectCards.css";
import { useNavigate } from "react-router-dom";
const ProjectCards = ({ data }) => {
  const navigate= useNavigate();
  return (
    <div 
    className="ProjectCard"
    onClick={() => {
      navigate(`/company/projects/${data._id}`);
   }} 
    
    >
      <div className="ProjectCardTile">
        {data.projectImage? (
          <img src={data.projectImage} className="imageBanner" alt="Image" />
        ) : (
          <></>
        )}
        <div className="ProjectCardContent">
          <h1>{data.projectName}</h1>
          <p>{data.description}</p>
          <div className="tags">
            {data.techStack?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <br />
          <div className="organization">
            <div className="logo">
                <img
                  src={data.organizationLogo}
                  alt="logo"
                  className="logoImg"
                />
            
            </div>
            <h5>{data.organization}</h5>
            {/* <span>
              <span className="icon">
                <IoPeopleOutline />
              </span>
              <h6>{data.organization.submissions}</h6>
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
