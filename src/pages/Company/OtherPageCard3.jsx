import React from "react";
import "./otherpagecard3.css";

const OtherPageCard3 = ({ image, link }) => {
  const handleClick = () => {
    window.open(link, "_blank");
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
