import { useState, useEffect } from "react";
import "./NewCommunitySectionHomePage.css";
import { useNavigate } from "react-router-dom";
import { getEventByMode } from "../../services/APIConfig";
import NewEventCard from "../../components/NewEventCard/NewEventCard";

const NewCommunitySection = () => {
  const [eventsData, setEventsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEventByMode(setEventsData, "Workshop");
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div
          style={{
            height: "100%",
          }}
          className="container"
        >
          <div
            style={{
              height: "100%",
            }}
            className="boxCommunity row"
          >
            <div className="col-md-6">
              <div className="container">
                <div className="textContainer">
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textContent"
                  >
                    Get access to{" "}
                    <span
                      style={{
                        backgroundColor: "#F9E19F",
                      }}
                    >
                      community of niche domains
                    </span>
                  </p>
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textDesc"
                  >
                    connect with like minded people,read blogs, built projects
                    and attend live sessions for free.
                  </p>
                  <div className="wrapButton">
                    <div
                      onClick={() => navigate("/community")}
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
                        Explore community
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
                  className="alignMid"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1.5rem",
                  }}
                >
                  {eventsData?.length > 0 && (
                    <NewEventCard data={eventsData[0]} />
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

export default NewCommunitySection;
