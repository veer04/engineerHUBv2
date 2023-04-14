import React, { useEffect, useState, useMemo } from "react";
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import filter from "./img/filter-icon.png";
import image from "./img/image.png";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function ProjectPage() {
  const { id } = useParams();

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
      poster: image,
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
    {
      id: 5,
      poster: image,
      title: "Project 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 5",
      people: 5,
    },
    {
      id: 6,
      poster: image,
      title: "Project 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 6",
      people: 5,
    },
    {
      id: 7,
      poster: image,
      title: "Project 7",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 7",
      people: 5,
    },
    {
      id: 8,
      poster: image,
      title: "Project 8",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 8",
      people: 5,
    },
    {
      id: 9,
      poster: image,
      title: "Project 9",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 9",
      people: 5,
    },
    {
      id: 10,
      poster: image,
      title: "Project 10",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 10",
      people: 5,
    },
    {
      id: 11,
      poster: image,
      title: "Project 11",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 11",
      people: 5,
    },
    {
      id: 12,
      poster: image,
      title: "Project 12",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 12",
      people: 5,
    },
    {
      id: 13,
      poster: image,
      title: "Project 13",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 13",
      people: 5,
    },
    {
      id: 14,
      poster: image,
      title: "Project 14",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 14",
      people: 5,
    },
    {
      id: 15,
      poster: image,
      title: "Project 15",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["HTML", "JavaScript"],
      companyLogo: image,
      companyName: "Company 15",
      people: 5,
    },
  ];
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [column3, setColumn3] = useState([]);

  const [filteredProjects, setFilteredProjects] = useState([]);

  useMemo(() => {
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

  useEffect(() => {
    console.log(filteredProjects, "filteredProjects");
    filteredProjects.map((project, index) => {
      if (index % 3 === 0) {
        setColumn1(() => {
          console.log([...column1, project], "column1");
          return [...column1, project];
        });
      } else if (index % 3 === 1) {
        setColumn2([...column2, project]);
      } else {
        setColumn3([...column3, project]);
      }
    });
    // console.log(column1, "column1");
    // console.log(column2, "column2");
    // console.log(column3, "column3");
  }, [filteredProjects]);

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
                    setCurrentFilters([...currentFilters, item.name]);
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
            <div className="project__column project__column-1">
              {column1.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            <div className="project__column project__column-2">
              {column2.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            <div className="project__column project__column-3">
              {column3.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            {/* {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
