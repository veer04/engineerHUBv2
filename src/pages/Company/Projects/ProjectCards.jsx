import React from "react";
import "./ProjectCards.css";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";

const ProjectCards = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="ProjectCard"
      onClick={() => {
        navigate(`/company/projects/${data._id}`);
      }}
    >
      <div className="ProjectCardTile">
        {data.projectImage ? (
          <div
            style={{ backgroundImage: `url(${data.projectImage})` }}
            className="imageBanner"
            alt="Image"
          />
        ) : (
          <>
            <div
              style={{ backgroundImage: `url(${defaultPoster})` }}
              className="imageBanner"
              alt="Image"
            />
          </>
        )}
        <div className="ProjectCardContent">
          <h1 className="text-crop-2 overflow-hidden">{data.projectName}</h1>
          <p className="text-crop-3 overflow-hidden">{data.description}</p>
          <div className="tags">
            {data.techStack?.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {data.techStack?.length > 3 ? (
              <span className="tag">+{data.techStack?.length - 3}</span>
            ) : null}
          </div>
          <br />
          <div className="organization">
            <div className="logo">
              <img src={data.organizationLogo} alt="logo" className="logoImg" />
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
