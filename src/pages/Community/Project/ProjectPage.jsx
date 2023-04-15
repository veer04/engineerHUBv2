import React, { useEffect, useState, useMemo } from "react";
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import filter from "./img/filter-icon.png";
import image from "./img/image.png";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { RxCross1 } from "react-icons/rx";
import ProjectWindow from "../../../components/ProjectWindow/ProjectWindow";

export default function ProjectPage() {
  const { id } = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectOpened, setProjectOpened] = useState(undefined);

  const [currentFilters, setCurrentFilters] = useState([]);

  const filters = [
    {
      id: 1,
      name: "HTML",
    },
    {
      id: 2,
      name: "JavaScript",
    },
    {
      id: 3,
      name: "CSS",
    },
  ];

  const projects = [
    {
      id: 1,
      poster: undefined,
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "CSS", "JavaScript"],
      companyLogo: image,
      companyName: "Company 1",
      people: 5,
    },
    {
      id: 2,
      poster: undefined,
      title: "Project 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["CSS", "JavaScript"],
      companyLogo: image,
      companyName: "Company 2",
      people: 5,
    },
    {
      id: 3,
      poster: image,
      title: "Project 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "CSS", "JavaScript"],
      companyLogo: image,
      companyName: "Company 3",
      people: 5,
    },
    {
      id: 4,
      poster: undefined,
      title: "Project 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "CSS"],
      companyLogo: image,
      companyName: "Company 4",
      people: 5,
    },
  ];
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [column3, setColumn3] = useState([]);

  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) => {
        if (currentFilters.length === 0) {
          return true;
        } else {
          return project.tags.some((tag) => currentFilters.includes(tag));
        }
      })
    );
  }, [currentFilters]);

  return (
    <div className="project-page">
      <div className="community__subpage__heading">Projects</div>
      <div className="community__subpage__content">
        <Sidebar />
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
                <img src={filter} alt="filter" />
              </span>
            </div>
          </div>
          <div className="project__chips__container">
            {filters.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (currentFilters.includes(item.name)) {
                    const newFilters = currentFilters.filter(
                      (filter) => filter !== item.name
                    );
                    setCurrentFilters(newFilters);
                  } else {
                    setCurrentFilters((prevValue) => {
                      return [...prevValue, item.name];
                    });
                  }
                }}
                className={`project__chip ${
                  currentFilters.includes(item.name) && "project__chip--active"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="project__list__container">
            <div
              className={`project__list ${
                isProjectOpen && "project__list--collapsed"
              }`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  setProjectOpened={setProjectOpened}
                  setIsProjectOpen={setIsProjectOpen}
                  key={project.id}
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
