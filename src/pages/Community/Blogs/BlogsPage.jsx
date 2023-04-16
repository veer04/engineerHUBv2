import React, { useEffect, useState, useMemo } from "react";
// import "./ProjectsPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import filter from "./img/filter-icon.png";
import image from "./img/image.png";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { RxCross1 } from "react-icons/rx";
import ProjectWindow from "../../../components/ProjectWindow/ProjectWindow";
import { controller, getBlogs } from "../../../services/APIConfig";
import BlogCard from "../../../components/BlogCard/BlogCard";
import BlogWindow from "../../../components/BlogWindow/BlogWindow";
import useSidebar from "../../../hooks/use-sidebar";

export default function BlogsPage({ path }) {
  const { id } = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectOpened, setProjectOpened] = useState(undefined);

  const [currentFilters, setCurrentFilters] = useState([]);

  const [projects, setProjects] = useState([]);

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
    {
      id: 4,
      name: "Reactive native",
    },
    {
      id: 5,
      name: "Firebase",
    },
  ];

  useEffect(() => {
    getBlogs(setProjects, id);

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
      <div className="community__subpage__heading">Blogs</div>
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
                <img src={filter} alt="filter" />
              </span>
            </div>
          </div>
          {/* <div className="project__chips__container">
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
          </div> */}
          <div className="project__list__container">
            <div
              className={`project__list ${
                isProjectOpen && "project__list--collapsed"
              }`}
            >
              {filteredProjects.map((project) => (
                <BlogCard
                  setProjectOpened={setProjectOpened}
                  setIsProjectOpen={setIsProjectOpen}
                  key={project._id}
                  {...project}
                />
              ))}
            </div>
            {isProjectOpen && (
              <BlogWindow
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
