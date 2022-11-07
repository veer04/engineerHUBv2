import React from "react";
import axios from "axios";
import "./freecourses.css";
import Full from "./Full";
import { coursesData } from "../HomeCourses/Courses";
import { useEffect, useState } from "react";

const Freecourses = ({ closeModal }) => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    let subscribed = true;
    const getCourseDetails = async () => {
      const response = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/course`
      );
      
      setCourseData(response.data);
      console.log(response);
    };
    if (subscribed) {
      getCourseDetails();
     
    }
    return () => {
      subscribed = false;
    };
  }, []);

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
        {coursesData.map((c, i) => {
          return (
            <Full
              key={i}
              id={i * 2}
              state={c}
              cardImage={c.cardImage}
              courseTitle1={c.courseTitle1}
              courseTitle2={c.courseTitle2}
              courseDescription={c.courseDescription}
              lastDate={c.lastDate}
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
