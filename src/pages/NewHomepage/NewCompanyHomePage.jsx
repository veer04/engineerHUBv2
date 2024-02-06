import React, { useState, useEffect } from "react";
import "./NewCommunitySectionHomePage.css";
import { useNavigate } from "react-router-dom";
import { getEvents, controller } from "../../services/APIConfig";
import { ehubLogo, defaultEventPoster } from "../../assets/defaultPoster";
import Apply from "../../assets/Apply.png";
import jobs from "../../assets/jobs.png";
import Login from "../../assets/Login.png";

const NewCompanyHomePage = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [loading, setLoading] = useState([true, false, false]);
  const [rightContent, setRightContent] = useState(null);
  const [isScreenBelow768, setIsScreenBelow768] = useState(false);
  const navigate =useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelow768(window.innerWidth < 768);
    };

    // Initial check on mount
    handleResize();

    // Add event listener to handle resizing
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExploreClick = () => {
    const newLoading = [...loading];
    newLoading[selectedSection] = true;
    setLoading(newLoading);

    setTimeout(() => {
      newLoading[selectedSection] = false;
      setLoading(newLoading);

      setSelectedSection((prevSection) => (prevSection + 1) % 3);
      setRightContent(getRightContentForSection(selectedSection));
    }, 1000);
  };

  const getRightContentForSection = (section) => {
    switch (section) {
      case 0:
        return (
          <div>
            <img className="imageHome" src={Login} alt="" />
          </div>
        );
      case 1:
        return (
          <div>
            <img className="imageHome" src={jobs} alt="" />
          </div>
        );
      case 2:
        return (
          <div>
            <img  className="imageHome" src={Apply} alt="" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="container">
          <div className="boxCommunity row">
            <div className="col-md-6">
              <div className="container">
                <div className="textContainer">
                  <p className="textContent">Now Companies are just few clicks</p>
                  <p className="textContent">away</p>
                  <p className="textDesc">Finding it difficult to connect to companies?{" "}</p>
                  <p className="textDesc">Here is the easy 3-step solution curated for you</p>

                  <div>
                    {isScreenBelow768 ? null : (
                      <div>
                        <input
                          type="radio"
                          name="section"
                          checked={selectedSection === 0}
                          readOnly
                        />
                        <span
                          className={`circle ${selectedSection === 0 ? "filled" : ""}`}
                        >
                          Job
                        </span>
                        <div className="verticalDash"></div>
                        <div className="verticalDash"></div>
                        <div className="verticalDash"></div>
                      </div>
                    )}

                    {isScreenBelow768 ? null : (
                      <div>
                        <input
                          type="radio"
                          name="section"
                          checked={selectedSection === 1}
                          readOnly
                        />
                        <span
                          className={`circle ${selectedSection === 1 ? "filled" : ""}`}
                        >
                          Events
                        </span>
                        <div className="verticalDash"></div>
                        <div className="verticalDash"></div>
                        <div className="verticalDash"></div>
                      </div>
                    )}

                    <div>
                      <input
                        type="radio"
                        name="section"
                        checked={selectedSection === 2}
                        readOnly
                      />
                      <span
                        className={`circle ${selectedSection === 2 ? "filled" : ""}`}
                      >
                        Apply
                      </span>
                    </div>
                  </div>

                  <div className="wrapButton">
                    <div
                      onClick={handleExploreClick}
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
                      }}
                    >
                      <p
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        Explore companies
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
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {rightContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCompanyHomePage;
