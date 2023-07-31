import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDesc from "./ProjectDesc";
import ProjectCards from "./ProjectCards";
import "./ProjectDetail.css";
import {
  controller,
  getProjectData,
  getProjectDataById,
} from "../../../services/APIConfig";
import { useEffect } from "react";
const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [projectData, setProjectData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProjectData(setProjectData);
    getProjectDataById(setProject, projectId);
    return () => {
      controller.abort();
    };
  }, [projectId]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <div className="ProjectDetail">
      <div className="ProjectTiles">
        <h1>Projects</h1>
        {projectData?.map((item, index) => {
          return <ProjectCards data={item} key={index} />;
        })}
      </div>
      <div className="ProjectDescContainer">
        {projectId === undefined ? (
          <div></div>
        ) : (
          <ProjectDesc
            data={{ ...project?.detailFound }}
            isApplied={project?.applied}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
