import React from "react";
import "./newcompanythirdandfourth.css";
import { useNavigate } from "react-router-dom";

const NewCompanyThirdAndFourthSec = ({
  title,
  desc,
  bgColor,
  btn,
  btnLink,
  rightImage,
  adminView,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`${btnLink}`);
  };
  
  if (!adminView) {
    return null;
  }
  
  return (
    <div className="main-div-campus-screening" style={{ background: bgColor }}>
      <div className="inner-sub-div">
        <div className="inner-div-content">
          <h4>{title}</h4>
          <p>{desc}</p>

          <button onClick={() => handleButtonClick()}>{btn}</button>
        </div>
        <div className="inner-div-image">
          <img src={rightImage} alt="right_image" />
        </div>
      </div>
    </div>
  );
};

export default NewCompanyThirdAndFourthSec;
