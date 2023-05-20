import React, { useEffect, useState, useMemo } from "react";
import "./ProjectsPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import ProjectWindow from "../../../components/ProjectWindow/ProjectWindow";
import {
  controller,
  getProjectTags,
  getProjects,
} from "../../../services/APIConfig";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import useNavbar from "../../../hooks/use-navbar";

export default function ProjectPage({ path }) {
  const { setSelectedPageNavbar } = useNavbar();

  const { id } = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectOpened, setProjectOpened] = useState(undefined);

  const [currentFilters, setCurrentFilters] = useState([]);

  const [tags, setTags] = useState(
    sessionStorage.getItem(`${id} tags`)
      ? JSON.parse(sessionStorage.getItem(`${id} tags`))
      : []
  );

  const [projects, setProjects] = useState(
    sessionStorage.getItem(`${id} projects`)
      ? JSON.parse(sessionStorage.getItem(`${id} projects`))
      : []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjects(setProjects, id);
    getProjectTags(setTags, id);
    setSelectedPageNavbar("community");


    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(`${id} tags`, JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    sessionStorage.setItem(`${id} projects`, JSON.stringify(projects));
  }, [projects]);

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

  const [searchedProjects, setSearchedProjects] = useState([]);

  const handleResult = (result) => {
    setSearchedProjects(result);
  };

  useEffect(() => {
    if (searchedProjects.length > 0) {
      setFilteredProjects(searchedProjects);
    } else {
      setFilteredProjects([]);
    }
  }, [searchedProjects]);

  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    return projects.filter((value) => {
      return (
        value.projectName.toLowerCase().includes(query.toLowerCase()) ||
        value.techStack.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
      );
    });
  }, [projects, query]);

  useEffect(() => {
    setSearchedProjects(filteredData);
  }, [query, filteredData]);

  const handleFilter = (tag) => {
    if (currentFilters.includes(tag)) {
      setCurrentFilters(currentFilters.filter((item) => item !== tag));
    } else {
      setCurrentFilters([...currentFilters, tag]);
    }
  };

  const handleProjectOpen = (project) => {
    setProjectOpened(project);
    setIsProjectOpen(true);
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <>
      <MobileSidebar path={path} />
      <div className="project-page">
        <div className="community__subpage__heading">
          <span>Projects</span>
        </div>
        <div className="community__subpage__content">
          <Sidebar path={path} />
          <div className="project__content">
            <div className="project__searchbar__container">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />

                <span className="input-group-text" id="basic-addon2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z"
                      fill="#3C3C43"
                      fillOpacity="0.6"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {width > 768 && (
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
                      currentFilters.includes(item._id) &&
                      "project__chip--active"
                    }`}
                  >
                    {item._id}
                  </div>
                ))}
              </div>
            )}
            <div
              className={`project__list__container project__list_container--window-open `}
            >
              <div
                className={`project__list ${
                  isProjectOpen ? "project__list--collapsed" : ""
                } ${width <= 1000 && isProjectOpen ? "--no-display" : ""}`}
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
    </>
  );
}
