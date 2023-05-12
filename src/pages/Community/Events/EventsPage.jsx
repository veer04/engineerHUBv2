import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { controller, getEvents } from "../../../services/APIConfig";
import EventCard from "../../../components/EventCard/EventCard";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
// import EventModal from "../../../components/EventModal/EventModal";
import "./EventsPage.css";
import { MdCancel } from "react-icons/md";

export default function EventsPage({ path }) {
  const { id } = useParams();

  const [isEventOpen, setIsEventOpen] = useState(false);
  const [eventOpened, setEventOpened] = useState(undefined);

  const [events, setEvents] = useState(
    sessionStorage.getItem(`${id} events`)
      ? JSON.parse(sessionStorage.getItem(`${id} events`))
      : []
  );

  useEffect(() => {
    getEvents(setEvents, id);
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(`${id} events`, JSON.stringify(events));
  }, [events]);

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
    <>
      <MobileSidebar path={path} />
      {/* {showModal && modal} */}
      <div className="project-page">
        <div className="community__subpage__heading">
          <span>Events</span>
        </div>
        <div className="community__subpage__content">
          <Sidebar path={path} />
          <div className="project__content">
            {/* <div className="project__searchbar__container">
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
            </div> */}
            <div className="project__list__container">
              <div
                className={`project__list ${
                  isEventOpen && "project__list--collapsed"
                }`}
              >
                {events.map((event) => (
                  <EventCard
                    setEventOpened={setEventOpened}
                    setIsEventOpen={setIsEventOpen}
                    key={event._id}
                    {...event}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
