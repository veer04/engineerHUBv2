import React, { useState, useEffect } from "react";
import "./NewCommunitySectionHomePage.css";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getEvents, controller } from "../../services/APIConfig";
import { eHUBLogo, defaultEventPoster } from "../../assets/defaultPoster";
import NewEventCard from "../../components/NewEventCard/NewEventCard";
import Ellipse from "../../../src/assets/Ellipse.png";
import logoMainPage from "../../../src/assets/logoMainPage.png";
const NewHostHomePage = () => {
  const { id, eventId } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [eventsData, setEventsData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // window.scrollTo(0, 0);
    getEvents(setEventsData, id);

    return () => {
      controller.abort();
      setEventsData({});
    };
  }, [id]);
  useEffect(() => {
    if (searchedEvents.length > 0) {
      setFilteredEvents(searchedEvents);
    } else {
      setFilteredEvents([]);
    }
  }, [searchedEvents]);
  const data = [
    {
      _id: "658d2fc47db76e8f91ee34c0",
      creatorId: {
        _id: "64ae7a54586afe9e0caa7531",
        image:
          "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae7a54586afe9e0caa75311702452095008.jpg",
        firstName: "Kunwar Vidya",
        lastName: "Niwas",
      },
      eventModeType: "Workshop",
      eventPoster:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/community/events/level_up_with_mern1703751618762.jpg",
      eventName: "Level Up with MERN",
      domainName: "Web Development",
      campusId: [
        {
          _id: "64df1cedcbacbe6b7e5e6568",
          collegeName: "MMMUT",
          collegeLogo:
            "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/college/collegeLogo3/CAMLOGO254.jpeg",
        },
      ],
      eventType: "Technical",
      tags: [],
      mode: false,
      description:
        "Calling all software developers! Elevate your skills with the MERN stack at engineerHUB. Join us on December 1st at 1:00 PM for an invaluable session that will take your proficiency to the next level. Learn, network, and grow with experienced professionals and fellow students. Don't miss out on this opportunity to boost your career!",
      applyLink: "https://meet.google.com/sfm-pdtt-xga",
      status: "Upcoming",
      eventStartTime: "2023-12-30T07:30:00.000Z",
      eventEndTime: "2023-12-30T07:30:00.000Z",
      policy:
        "Our policy at engineerHUB emphasizes respectful behavior, active participation, inclusivity, diversity, and professionalism. Clear instructions will be provided regarding expectations, engagement opportunities, and feedback channels for all attendees.",
      isFeatured: false,
      creatorModel: "User",
    },
  ];

  return (
    <>
      <div className="mainContainer">
        <div className="container">
          <div className="boxCommunity row" style={{ background: "#e9fcfc" }}>
            <div className="col-md-6">
              <div className="container">
                <div className="textContainer">
                  <p>Are you a company/HR?</p>
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textContent"
                  >
                    <span
                      style={{
                        backgroundColor: "#91F0EF",
                      }}
                    >
                      Host
                    </span>{" "}
                    events, jobs, webinars and projects{" "}
                    <span
                      style={{
                        backgroundColor: "#91F0EF",
                      }}
                    >
                      to engage audience
                    </span>
                  </p>
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textDesc"
                  >
                    Host events to engage your target audience and create Jobs
                    for the right talent.
                  </p>
                  <div className="wrapButton">
                    <div
                      onClick={() => navigate("/host")}
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
                        Host
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
              <div className="container" style={{}}>
                <div
                  className=" image-container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 50,
                  }}
                >
                  <img src={logoMainPage} alt="" width={"350"} height={"350"} />
                </div>

                <div className="row">
                  <img src={Ellipse} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHostHomePage;
