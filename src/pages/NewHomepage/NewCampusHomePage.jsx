import React, { useState, useEffect } from "react";
import "./NewCommunitySectionHomePage.css";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  getEvents,
  controller,
  getFeaturedEvents,
} from "../../services/APIConfig";
import { eHUBLogo, defaultEventPoster } from "../../assets/defaultPoster";
import NewEventCard from "../../components/NewEventCard/NewEventCard";
import HomeEventsCard from "./HomeEventsCard";
import HomeAlmaCards from "./HomeAlmaCards";
import HomeClubCards from "./HomeClubCards";

const NewCampusHomePage = ({ list, clubs }) => {
  const { id, eventId } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [buttonColors, setButtonColors] = useState(["light", "light", "light"]);
  const [activeCard, setActiveCard] = useState(1);
  const handleButtonClick = (cardNumber, index) => {
    setActiveCard(cardNumber);

    // Update button colors based on the clicked button
    const newColors = buttonColors.map((color, i) =>
      i === index ? "dark" : "light"
    );
    setButtonColors(newColors);
  };
  const navigate = useNavigate();
  const handleHover = (index) => {
    const newColors = buttonColors.map((color, i) =>
      i === index ? "dark" : "light"
    );
    setButtonColors(newColors);
  };

  const handleMouseLeave = () => {
    setButtonColors(["light", "light", "light"]);
  };

  const buttonNames = ["Almas", "Events", "Clubs"];

  useEffect(() => {
    // window.scrollTo(0, 0);
    // getEvents(setEventsData, id);
    getFeaturedEvents(setEventsData);

    return () => {
      controller.abort();
      setEventsData([]);
    };
  }, [id]);
  useEffect(() => {
    if (searchedEvents.length > 0) {
      setFilteredEvents(searchedEvents);
    } else {
      setFilteredEvents([]);
    }
  }, [searchedEvents]);
  // const data = [
  //   {
  //     _id: "658d2fc47db76e8f91ee34c0",
  //     creatorId: {
  //       _id: "64ae7a54586afe9e0caa7531",
  //       image:
  //         "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae7a54586afe9e0caa75311702452095008.jpg",
  //       firstName: "Kunwar Vidya",
  //       lastName: "Niwas",
  //     },
  //     eventModeType: "Workshop",
  //     eventPoster:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/community/events/level_up_with_mern1703751618762.jpg",
  //     eventName: "Level Up with MERN",
  //     domainName: "Web Development",
  //     campusId: [
  //       {
  //         _id: "64df1cedcbacbe6b7e5e6568",
  //         collegeName: "MMMUT",
  //         collegeLogo:
  //           "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/college/collegeLogo3/CAMLOGO254.jpeg",
  //       },
  //     ],
  //     eventType: "Technical",
  //     tags: [],
  //     mode: false,
  //     description:
  //       "Calling all software developers! Elevate your skills with the MERN stack at engineerHUB. Join us on December 1st at 1:00 PM for an invaluable session that will take your proficiency to the next level. Learn, network, and grow with experienced professionals and fellow students. Don't miss out on this opportunity to boost your career!",
  //     applyLink: "https://meet.google.com/sfm-pdtt-xga",
  //     status: "Upcoming",
  //     eventStartTime: "2023-12-30T07:30:00.000Z",
  //     eventEndTime: "2023-12-30T07:30:00.000Z",
  //     policy:
  //       "Our policy at engineerHUB emphasizes respectful behavior, active participation, inclusivity, diversity, and professionalism. Clear instructions will be provided regarding expectations, engagement opportunities, and feedback channels for all attendees.",
  //     isFeatured: false,
  //     creatorModel: "User",
  //   },
  // ];

  return (
    <>
      <div className="mainContainer">
        <div className="container">
          <div
            className="boxCommunity row"
            style={{
              background: "#f1fbea",
              // height: "550px",
            }}
          >
            <div className="col-md-6">
              <div className="container">
                <div className="textContainer">
                  <p>Want to explore engineering colleges in India?</p>
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textContent"
                  >
                    Break the{" "}
                    <span
                      style={{
                        backgroundColor: "#B2E887",
                      }}
                    >
                      boundaries of your campus
                    </span>
                  </p>
                  {/* <p style={{fontSize:"2rem",fontWeight:"700",lineHeight:"1.6rem",color:"#002b36",marginBottom:"5%"}}>
                            domains
                        </p> */}
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textDesc"
                  >
                    Explore Events, Clubs and alms beyond your campus
                    boundaries. Connect, engage and participate.
                  </p>
                  <div className="wrapButton">
                    <div
                      onClick={() => navigate("/campus")}
                      style={{
                        width: "220px",
                        borderRadius: "50px",
                        border: "1px solid #002b36 ",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        color: "#002b36 ",
                        marginTop: "5%",
                        cursor: "pointer",
                        height: "51.6px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          display: "flex",
                        }}
                      >
                        Explore campus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="container"
                style={{
                  padding: "1.5rem 0",
                }}
              >
                <div
                  className="row"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    gap: "10px",
                    marginBottom: 10,
                  }}
                >
                  {buttonColors.map((color, index) => (
                    <span
                      key={index}
                      onClick={() => handleButtonClick(index + 1, index)}
                      // onMouseEnter={() => handleHover(index)}
                      // onMouseLeave={handleMouseLeave}
                      className="buttonSwitch"
                      style={{
                        background:
                          activeCard === index + 1 ? "#002b36" : "#86989e",
                        // on hover it should be #002b36
                      }}
                    >
                      {buttonNames[index]}
                    </span>
                  ))}
                </div>
                {/* <span style={{marginLeft:"25%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Events</span>
                        <span style={{marginLeft:"10%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Almas</span>
                        <span style={{marginLeft:"10%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Clubs</span> */}
                <div
                  className="alignMid "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    maxWdith: "14.75rem",
                    height: 400,
                  }}
                >
                  {activeCard === 1 && (
                    <div className="almaCardHomePage">
                      {" "}
                      <HomeAlmaCards
                        list={list}
                        className="event-card-homePage"
                      />
                    </div>
                  )}
                  {activeCard === 2 && (
                    <div className="eventCardHomeCampus">
                      {eventsData?.length > 0 && (
                        <NewEventCard data={eventsData[5]} />
                      )}
                    </div>
                  )}
                  {activeCard === 3 && (
                    <HomeClubCards
                      clubs={clubs}
                      className="event-card-homePage"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCampusHomePage;
