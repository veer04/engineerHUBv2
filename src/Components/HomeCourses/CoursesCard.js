import React from "react";
import "./CoursesCard.css";
import backImage from "../Magzine/backimg.png";
const CoursesCard = () => {
  return (
    <>
      <div className="courses-card-body">
        <div>
          {" "}
          <img src={backImage} alt="particular-courses" className="courses-image" />
        </div>

        <div className="d-flex courses--btns">
          <div className="courses-name">Frontend <br/>Development</div>
          <button className="Prize">Free</button>
        </div>
        <div className="courses-details">
          {" "}
          We help you build your skills by offering free Frontend development material 
          to gain fundamental knowledge of Html5, CSS, JS and more
        </div>
        <div className="courses-register">Register</div>
      </div>

        
    </>
  );
};

export default CoursesCard;
