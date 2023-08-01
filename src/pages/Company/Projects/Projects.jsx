import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import HTML from "./ProjectChoices/HTML";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="Projects">
      <h1>Projects</h1>
      <div className="ChoicesSelection">
        <HTML />
      </div>
    </div>
  );
};

export default Projects;
