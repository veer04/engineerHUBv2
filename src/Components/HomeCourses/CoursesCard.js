import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesCard.css";

import { useEffect} from "react";

const CoursesCard = ({
  courseTitle1,
  courseTitle2,
  courseDescription,
  cardImage,
  id,
  state,
  img,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(cardImage);
  });

  return (
    <>
      <div className="courses-card-body">
        <div>
          {" "}
          <img
            width="100%"
            height={147}
            src={`${cardImage}`}
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
        {/* to={`/userpage/${id}`} state={state} */}
          <div className="btn--link"onClick={()=>navigate("/modal")}>
            Register
          </div>{" "}
        </div>
      </div>
  
    </>
  );
};

export default CoursesCard;
