import React from "react";
import "./CoursesCard.css";
import backImage from "../Magzine/backimg.png";
const CoursesCard = () => {
  return (
    <>
      <div className="courses-card-body">
        <div>
          {" "}
          <img src={backImage} className="courses-image" />
        </div>

        <div className="d-flex courses--btns">
          <div className=" courses-name">Frontend <br/>Development</div>
          <button className="Free">Free</button>
        </div>
        <div className="courses-details">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
          consequat consequat at fermentum sollicitudin pellentesque tortor..
        </div>
        <div className="courses-register">Register</div>
      </div>
    </>
  );
};

export default CoursesCard;
