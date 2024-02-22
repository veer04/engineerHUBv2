import React, { useState, useEffect } from "react";
import "./NewCommunitySectionHomePage.css";
import { useNavigate } from "react-router-dom";
import { getEvents, controller } from "../../services/APIConfig";
import { ehubLogo, defaultEventPoster } from "../../assets/defaultPoster";
import Apply from "../../assets/Apply.png";
import jobs from "../../assets/jobs.png";
import Login from "../../assets/Login.png";
import { Link } from "react-router-dom";

const NewCompanyHomePage = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [loading, setLoading] = useState([true, false, false]);
  // const [rightContent, setRightContent] = useState(null);
  const [isScreenBelow768, setIsScreenBelow768] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelow768(window.innerWidth < 768);
    };

    // Initial check on mount
    handleResize();

    handleExploreClick();

    const interval = setInterval(() => {
      handleExploreClick();
    }, 4000);

    // Add event listener to handle resizing
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleExploreClick = () => {
    setSelectedSection((prevSection) => (prevSection + 1) % 3);
    // const newLoading = [...loading];
    // newLoading[selectedSection] = true;
    // setLoading(newLoading);

    // setTimeout(() => {
    // newLoading[selectedSection] = false;
    // setLoading(newLoading);

    // setSelectedSection((prevSection) => (prevSection + 1) % 3);
    // setRightContent(getRightContentForSection(selectedSection));3
    // }, 1000);
  };

  // const getRightContentForSection = (section) => {
  //   switch (section) {
  //     case 0:
  //       return (
  //         <div id="1" >
  //           <img id="1" className="imageHome" src={Login} alt="" />
  //         </div>
  //       );
  //     case 1:
  //       return (
  //         <div id="2" >
  //           <img id="2" className="imageHome" src={jobs} alt="" />
  //         </div>
  //       );
  //     case 2:
  //       return (
  //         <div id="3" >
  //           <img id="3" className="imageHome" src={Apply} alt="" />
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      <div className="mainContainer">
        <div className="container">
          <div className="boxCommunity row">
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
                    Now{" "}
                    <span
                      style={{
                        backgroundColor: "#E8BA98",
                      }}
                    >
                      Companies are just few clicks away
                    </span>
                  </p>
                  <p
                    style={{
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                    className="textDesc"
                  >
                    Finding it difficult to connect to companies? Here is the
                    easy 3-step solution curated for you
                  </p>

                  <div>
                    {isScreenBelow768 ? (
                      <div className={isScreenBelow768 ? "horizontal-mode" : ""}>
  <input
    type="radio"
    name="section"
    checked={selectedSection === 0}
    readOnly
  />
  <span className={`circle ${selectedSection === 0 ? "filled" : ""}`}>
  <span className="fontStylingSmallScreen">Login</span>  
  </span>
  {isScreenBelow768 && <><div className="horizontalDash"></div>
  
  <div className="horizontalDash"></div>
  <div className="horizontalDash"></div></>}

  <input
    type="radio"
    name="section"
    checked={selectedSection === 1}
    readOnly
  />
  <span className={`circle ${selectedSection === 1 ? "filled" : ""}`}>
  <span className="fontStylingSmallScreen">  Jobs / Internships</span>  
 
  </span>
  {isScreenBelow768 && <><div className="horizontalDash"></div>
  
  <div className="horizontalDash"></div>
  <div className="horizontalDash"></div></>}

  <input
    type="radio"
    name="section"
    checked={selectedSection === 2}
    readOnly
  />
  <span className={`circle ${selectedSection === 2 ? "filled" : ""}`}>
  <span className="fontStylingSmallScreen"> Apply</span>  
  </span>
</div>

                    ) : (
                      <div>
                        <input
                          type="radio"
                          name="section"
                          checked={selectedSection === 0}
                          readOnly
                        />
                        <span
                          className={`circle ${
                            selectedSection === 0 ? "filled" : ""
                          }`}
                        >
                          Login
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
                          className={`circle ${
                            selectedSection === 1 ? "filled" : ""
                          }`}
                        >
                          Jobs / Internships
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
                          checked={selectedSection === 2}
                          readOnly
                        />
                        <span
                          className={`circle ${
                            selectedSection === 2 ? "filled" : ""
                          }`}
                        >
                          Apply
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="wrapButton">
                    <div
                      onClick={()=>navigate("/company")}
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
                  {/* {rightContent} */}
                  {selectedSection === 0 ? (
                    <Link to="/company">
                      <div>
                        <img className="imageHome" src={Login} alt="" />
                      </div>
                    </Link>
                  ) : selectedSection === 1 ? (
                    <Link to="/company">
                      <div>
                        <img className="imageHome" src={jobs} alt="" />
                      </div>
                    </Link>
                  ) : (
                    <Link to="/company">
                      <div>
                        <img className="imageHome" src={Apply} alt="" />
                      </div>
                    </Link>
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

export default NewCompanyHomePage;
