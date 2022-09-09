import React from "react";
import "../Events/Events.css";
import "./Courses.css";

import CoursesCard from "./CoursesCard";

function Events() {
  return (
    <>
      <div className="content contentEvent ">
        <div className="container ">
          <h1 className="text1">Free Courses</h1>
          <h5 className="text2 text111 courses-box">
          Engineerhub aims to provide several free courses to students to provide necessary material with utmost ease. 
          </h5>
          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
          <CoursesCard/>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
