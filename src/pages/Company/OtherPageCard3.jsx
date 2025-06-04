import React from "react";
import { useNavigate } from "react-router-dom";
import "./otherpagecard3.css";

const OtherPageCard3 = ({ image, link }) => {
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
    <div className="main-other-page-comp-div-3" onClick={handleClick}>
      <img src={image} alt="" className="image-div" />

      <h3
        style={{
          position: "absolute",
          fontSize: 14.2,
          fontWeight: 600,
          letterSpacing: -0.4,
          fontFamily: "Inter",
          color: "#f2f2f2",
          textAlign: "center",
          top: 12,
          left: 10,
        }}
      >
        Download Notes
      </h3>
    </div>
  );
};

export default OtherPageCard3;
