import React, { useState } from "react";
import "./moreaboutyourcollegesection.css";
import UserViewStudentFollow from "../UserViewStudentFollow/UserViewStudentFollow";
import UserStudentFollowInMoreAbout from "../UserViewStudentFollow/UserStudentFollowInMoreAbout";

const MoreAboutYourCollegeSection = () => {
  const [actionButton, setActionButton] = useState("About");
  const handleButtonClick = (buttonName) => {
    setActionButton(actionButton === buttonName ? null : buttonName);
  };

  return (
    <div className="more-about-college-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        More about “AKGCE”
      </h3>

      <div style={{ marginTop: 10 }}>
        {["About", "Clubs", "Almas"].map((buttonName, index) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            style={{
              padding: "4px 16px",
              borderRadius: "10px",
              background: actionButton === buttonName ? "#138382" : "#f2f4f5",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: actionButton === buttonName ? "white" : "black",
              border: "none",
              marginLeft: index === 0 ? 0 : 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>

      {actionButton === "About" && (
        <div
          style={{
            marginTop: 16,
          }}
        >
          <h4
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#002B36",
              marginBottom: 0,
              textAlign: "justify",
            }}
          >
            The college was established in 1998 and offers B.Tech Courses in all
            major disciplines of Engineering. The college also offers M.Tech in
            Electronics & Communication Engineering, Computer Science,
            Electrical and Electronics Engineering and Mechanical Engineering.
            The college has been consistently maintaining excellent academic
            results and placements. The college has the distinction of being the
            first and only college in UP to receive the Acedemic Excellence
            Award for the Best Engineering College in UPTU from H.E. the
            Governor of UP for two successive years.
          </h4>
        </div>
      )}

      {actionButton === "Clubs" && <UserStudentFollowInMoreAbout />}

      {actionButton === "Almas" && <UserViewStudentFollow />}
    </div>
  );
};

export default MoreAboutYourCollegeSection;
