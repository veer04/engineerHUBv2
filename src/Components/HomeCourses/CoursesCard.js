import React from "react";
import "./CoursesCard.css";
import backImage from "../Magzine/backimg.png";

const CoursesCard = ({
  courseTitle1,
  courseTitle2,
  courseDescription,
  lastDate,
}) => {
  return (
    <>
      <div className="courses-card-body">
        <div>
          {" "}
          <img
            src={backImage}
            alt="particular-courses"
            className="courses-image"
          />
        </div>

        <div className="d-flex courses--btns">
          <div className="courses-name">
            {courseTitle1} <br />
            {courseTitle2}
          </div>
          <button className="Prize">Free</button>
        </div>
        <div className="courses-details">{courseDescription}</div>
        <div className="courses-register">
          <a className="btn--link" href="/userpage" rel="noreferrer">
            Register
          </a>{" "}
        </div>
      </div>
    </>
  );
};

export default CoursesCard;
