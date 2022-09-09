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
          <div className=" courses-name">Frontend <br/>Development</div>
          <button className="Free">Free</button>
        </div>
        <div className="courses-details">
          {" "}
          We help you build your skills by offering free Frontend development material 
          to gain fundamental knowledge of Html5, CSS, JS and more
        </div>
        <div className="courses-register">Register</div>
      </div>
      <div className="courses-card-body">
        <div>
          {" "}
          <img src={backImage} className="courses-image"  alt="courses"/>
        </div>

        <div className="d-flex courses--btns">
          <div className=" courses-name">Machine <br/>Learning</div>
          <button className="Free">Free</button>
        </div>
        <div className="courses-details">
          {" "}
          We help you achieve the most remarkable results & elevate your expertise by 
          offering various materials covering fundamentals & advanced topics of AI and ML.
        </div>
        <div className="courses-register">Register</div>
      </div>
      <div className="courses-card-body">
        <div>
          {" "}
          <img src={backImage} className="courses-image"  alt="courses"/>
        </div>

        <div className="d-flex courses--btns">
          <div className=" courses-name">Python <br/>Programming</div>
          <button className="Free">Free</button>
        </div>
        <div className="courses-details">
          {" "}
          We offer free python courses to get you started on your journey on the path of Data 
          Analysis and Visualization by offering ample content on fundamentals and advanced
        </div>
        <div className="courses-register">Register</div>
      </div>
    </>
  );
};

export default CoursesCard;
