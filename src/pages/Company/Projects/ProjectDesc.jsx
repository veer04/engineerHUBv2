import React from "react";
import "./ProjectDesc.css";

const ProjectDesc = ({ data }) => {
  console.log(data);
  return (
    <div className="ProjectDesc">
      <div className="ProjectDescHeader">
        <span className="logoIcon">
          <img src={data.organization.logo} />
        </span>
        <h1>{data.name}</h1>
      </div>
      <div className="ProjectDescImage">
        <img src={data.img} alt="Project" />
      </div>
      <div className="ProjectDescription">
        <h5>Description</h5>
        <p>{data.desc}</p>
      </div>
      <div className="ProjectTags">
        <h5>Project Tags</h5>
        <span className="tag">
          {data.tags.map((tag, index) => {
            return <span key={index}>{tag}</span>;
          })}
        </span>
      </div>
      <div className="ProjectPrerequisite">
        <div className="prerequisite">
          <h5>Prequsites</h5>
          <ul>
            {data.prerequisites.map((prereq) => {
              return <li>{prereq}</li>;
            })}
          </ul>
        </div>
        <div className="software">
          <h5>Software Used</h5>
          <ul>
            {data.software.map((softw) => {
              return <li>{softw}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="AdditionalInfo">
        <div className="AdditionalInfoChip">
          <h5>Salary/Stipend</h5>
          <p>{data.info.salary}/-</p>
        </div>
        <div className="AdditionalInfoChip">
          <h5>Work Availability</h5>
          <p>{data.info.availability}hr/day</p>
        </div>
      </div>
      <div className="ApplyNowBtn">Apply Now</div>
    </div>
  );
};

export default ProjectDesc;
