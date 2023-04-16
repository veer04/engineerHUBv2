import React, { useEffect, useState, useMemo } from "react";
// import "./ProjectsPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import filter from "./img/filter-icon.png";
import image from "./img/image.png";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { RxCross1 } from "react-icons/rx";
import ProjectWindow from "../../../components/ProjectWindow/ProjectWindow";
import { controller, getEvents } from "../../../services/APIConfig";
import EventCard from "../../../components/EventCard/EventCard";
import EventWindow from "../../../components/EventWindow/EventWindow";
import useSidebar from "../../../hooks/use-sidebar";

export default function EventsPage({ path }) {
  const { id } = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectOpened, setProjectOpened] = useState(undefined);

  //   const [currentFilters, setCurrentFilters] = useState([]);

  //   const filters = [
  //     {
  //       id: 1,
  //       name: "HTML",
  //     },
  //     {
  //       id: 2,
  //       name: "JavaScript",
  //     },
  //     {
  //       id: 3,
  //       name: "CSS",
  //     },
  //     {
  //       id: 4,
  //       name: "Reactive native",
  //     },
  //     {
  //       id: 5,
  //       name: "Firebase",
  //     },
  //   ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents(setEvents, id);

    return () => {
      controller.abort();
    };
  }, [id]);

  console.log(events);

  //   const [filteredProjects, setFilteredProjects] = useState([]);

  //   useEffect(() => {
  //     if (projects.length > 0) {
  //       setFilteredProjects(
  //         projects.filter((project) => {
  //           if (currentFilters.length === 0) {
  //             return true;
  //           } else {
  //             return project.techStack.some((tag) =>
  //               currentFilters.includes(tag)
  //             );
  //           }
  //         })
  //       );
  //     }
  //   }, [currentFilters, projects]);

  return (
    <div className="project-page">
      <div className="community__subpage__heading">Events</div>
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
          <div className="project__list__container">
            <div
              className={`project__list ${
                isProjectOpen && "project__list--collapsed"
              }`}
            >
              {events.map((event) => (
                <EventCard
                  setProjectOpened={setProjectOpened}
                  setIsProjectOpen={setIsProjectOpen}
                  key={event._id}
                  {...event}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
