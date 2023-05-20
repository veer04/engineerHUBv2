import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { controller, getEvents } from "../../../services/APIConfig";

import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import EventCard from "../../../components/EventCard/EventCard";
import EventModal from "../../../components/EventModal/EventModal";
import "./EventsPage.css";
import { MdCancel } from "react-icons/md";
import useNavbar from "../../../hooks/use-navbar";

export default function EventsPage({ path }) {
  const { setSelectedPageNavbar } = useNavbar();
  setSelectedPageNavbar("community");

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

// import React from "react";
// import "../Project/ProjectsPage.css";
// import { IoPeopleOutline } from "react-icons/io5";
// import useSidebar from "../../../hooks/use-sidebar";
// import defaultPoster from "../../../assets/defaultPoster";

// export default function ProjectCard({
//   projectImage,
//   _id,
//   projectName,
//   description,
//   techStack,
//   organizationLogo,
//   organization,
//   people,
//   setProjectOpened,
//   setIsProjectOpen,
// }) {
//   const bgColors = [
//     "rgb(247, 215, 127, 0.36)",
//     "rgb(178, 232, 135, 0.3)",
//     "rgb(232, 186, 152, 0.35)",
//     "rgb(130, 55, 253, 0.15)",
//   ];

//   const textColors = [
//     "rgb(255,187,0)",
//     "rgb(36,255,0)",
//     "rgb(243,46,79)",
//     "rgb(97,22,219)",
//   ];

//   const { setIsCollapsed } = useSidebar();

//   return (
//     <div
//       onClick={() => {
//         setProjectOpened(_id);
//         setIsProjectOpen(true);
//         setIsCollapsed(true);
//       }}
//       className="project__list__item"
//     >
//       {
//         <div
//           style={{
//             width: "100%",
//             height: "12rem",
//             backgroundImage: `url(${
//               projectImage ? projectImage : defaultPoster
//             })`,
//             backgroundSize: "cover",
//             backgroundColor: "rgb(238,255,255)",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//           className="poster"
//         ></div>
//       }
//       <div className="title">{projectName}</div>
//       <div className="description">{description}</div>
//       <div className="tags">
//         {techStack.map((tag, index) => (
//           <div
//             key={tag}
//             style={{
//               backgroundColor: bgColors[index % bgColors.length],
//               color: textColors[index % textColors.length],
//             }}
//             className="tag"
//           >
//             {tag}
//           </div>
//         ))}
//       </div>
//       <div className="details">
//         <div className="company__details">
//           <div
//             style={{
//               width: "2rem",
//               height: "2rem",
//               backgroundImage: `url(${organizationLogo})`,
//               backgroundColor: "grey",
//               borderRadius: "50%",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//             className="logo"
//           ></div>
//           <div className="name">{organization}</div>
//         </div>
//         {/* <div className="people">
//           <div className="people__icon">
//             <IoPeopleOutline />
//           </div>
//           <div className="people__number">100</div>
//         </div> */}
//       </div>
//     </div>
//   );
// }
