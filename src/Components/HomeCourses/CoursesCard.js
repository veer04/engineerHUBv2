import React from "react";
import { Link } from "react-router-dom";
import "./CoursesCard.css";
import backImage from "../Magzine/backimg.png";
// import Appdev from "./app.jpg";
const CoursesCard = ({
  courseTitle1,
  courseTitle2,
  courseDescription,

  id,
  state,
  img,
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
          <Link className="btn--link" to={`/userpage/${id}`} state={state}>
            Register
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default CoursesCard;
