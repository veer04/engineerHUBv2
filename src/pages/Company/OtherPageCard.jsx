import React from "react";
import { useNavigate } from "react-router-dom";
import "./otherpagecard.css";

const OtherPageCard = ({ image, link, showText }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Check if it's an internal or external link
    if (link.startsWith('https://engineerhub.in')) {
      // For internal links, use navigate
      const path = link.replace('https://engineerhub.in', '');
      navigate(path);
    } else {
      // For external links, use window.open
      window.open(link, "_blank");
    }
  };

  return (
    <div className="main-other-page-comp-div" onClick={handleClick}>
      <img src={image} alt="" className="image-div" />

      {showText && (
        <h3
          style={{
            position: "absolute",
            fontSize: 14.2,
            fontWeight: 600,
            letterSpacing: -0.4,
            fontFamily: "Inter",
            color: "#002B36",
            textAlign: "center",
            top: 12,
            left: 10,
          }}
        >
          Host Jobs
        </h3>
      )}
    </div>
  );
};

export default OtherPageCard;
