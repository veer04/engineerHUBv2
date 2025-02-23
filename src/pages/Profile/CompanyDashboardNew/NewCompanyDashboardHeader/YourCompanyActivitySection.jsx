import React, { useState } from "react";
import "./yourcompanyactivitysection.css";
import { GoStopwatch } from "react-icons/go";

const YourCompanyActivitySection = () => {
  const [actionButton, setActionButton] = useState("Posts");

  const handleButtonClick = (buttonName) => {
    setActionButton(actionButton === buttonName ? null : buttonName);
  };

  return (
    <div className="your-company-activity-section">
      <div className="title-main-div">
        <GoStopwatch size={18} />
        <h3 className="h3-act">Activities</h3>
      </div>

      <div className="main-btn-divs">
        {["Posts", "Jobs", "Internships", "Hackathons", "Projects"].map(
          (buttonName, index) => (
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
                // marginLeft: index === 0 ? 0 : 10,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              {buttonName}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default YourCompanyActivitySection;
