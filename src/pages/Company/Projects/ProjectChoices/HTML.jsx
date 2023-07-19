import React, { useEffect, useState } from "react";
import ProjectCards from "../ProjectCards";
import "./HTML.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import { controller, getProjectData } from "../../../../services/APIConfig";
import { useParams } from "react-router-dom";
const HTML = () => {
  const bucket = `${Bucket_URL}frontend/company/`;
  const bucket2 = `${Bucket_URL}frontend/global/`;
  // const projectId=useParams;
  const [project, setProject] = useState([]);
  useEffect(() => {
    getProjectData(setProject);

    return () => {
      controller.abort();
    };
  }, [project]);

  return (
    <div className="HTML">
      {project?.map((entry, index) => {
        return <ProjectCards data={entry} key={index} />;
      })}
    </div>
  );
};

export default HTML;
