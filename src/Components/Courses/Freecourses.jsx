import React from 'react'
import { useContext } from "react";
import "./freecourses.css";
import Full from "./Full";
import { CourseContext } from "../../context/CourseContext";
// import { coursesData } from "../HomeCourses/Courses";

const Freecourses = ({ closeModal }) => {
  const { courseData } = useContext(CourseContext);

  return (
    <div className="container-hiring">
      <div className="heading">Explore Courses</div>

      <div className="texthire">
        engineerhub aims to provide several free courses to students to provide
        necessary material with utmost ease.
      </div>

      <div
        style={{ margin: "0px 35px 40px" }}
        className="d-flex row justify-content-evenly courses-cont"
      >
        {courseData.map((c, i) => {
          return (
            <Full
              key={i}
              id={i * 2}
              state={c}
              cardImage={c.posterUrl}
              courseTitle1={c.title}
              courseDescription={c.about}
              lastDate={c.updatedAt.slice(0,10)}
              features={c.features}
            />
          );
        })}
      </div>
      <div
        style={{ margin: "0px 35px 40px" }}
        className="d-flex row justify-content-evenly courses-cont"
      >
        {/* {coursesData.map((c) => {
          <Full
            courseTitle1={c.courseTitle1}
            courseTitle2={c.courseTitle2}
            courseDescription={c.courseDescription}
            lastDate={c.lastDate}
          />;
        })} */}
      </div>
    </div>
  );
};

export default Freecourses;
