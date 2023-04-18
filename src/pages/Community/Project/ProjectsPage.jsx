import React, { useEffect, useState, useMemo } from "react";
import "./ProjectsPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import filterImg from "./img/filter-icon.png";
import image from "./img/image.png";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { RxCross1 } from "react-icons/rx";
import ProjectWindow from "../../../components/ProjectWindow/ProjectWindow";
import {
  controller,
  getProjectTags,
  getProjects,
} from "../../../services/APIConfig";
import useSidebar from "../../../hooks/use-sidebar";

export default function ProjectPage({ path }) {
  const { id } = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectOpened, setProjectOpened] = useState(undefined);

  const [currentFilters, setCurrentFilters] = useState([]);

  const [tags, setTags] = useState([]);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(setProjects, id);
    getProjectTags(setTags);

    return () => {
      controller.abort();
    };
  }, [id]);

  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      setFilteredProjects(
        projects.filter((project) => {
          if (currentFilters.length === 0) {
            return true;
          } else {
            return project.techStack.some((tag) =>
              currentFilters.includes(tag)
            );
          }
        })
      );
    }
  }, [currentFilters, projects]);

  return (
    <div className="project-page">
      <div className="community__subpage__heading">Projects</div>
      <div className="community__subpage__content">
        <Sidebar path={path} />
        <div className="project__content">
          <div className="project__searchbar__container">
            <div className="project__searchbar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <img src={filterImg} alt="filter" />
              </span>
            </div>
          </div>
          <div className="project__chips__container">
            {tags.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  if (currentFilters.includes(item._id)) {
                    const newFilters = currentFilters.filter(
                      (filter) => filter !== item._id
                    );
                    setCurrentFilters(newFilters);
                  } else {
                    setCurrentFilters((prevValue) => {
                      return [...prevValue, item._id];
                    });
                  }
                }}
                className={`project__chip ${
                  currentFilters.includes(item._id) && "project__chip--active"
                }`}
              >
                {item._id}
              </div>
            ))}
          </div>
          <div className="project__list__container">
            <div
              className={`project__list ${
                isProjectOpen ? "project__list--collapsed" : ""
              }`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  setProjectOpened={setProjectOpened}
                  setIsProjectOpen={setIsProjectOpen}
                  key={project._id}
                  {...project}
                />
              ))}
            </div>
            {isProjectOpen && (
              <ProjectWindow
                projectOpened={projectOpened}
                setIsProjectOpen={setIsProjectOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
