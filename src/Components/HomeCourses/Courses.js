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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            natus. Nihil molestias culpa quibusdam quaerat ea neque velit fugit
            officia amet eligendi! Quis quos animi officia explicabo accusamus
            obcaecati totam.
          </h5>
          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
          <CoursesCard/>
          <CoursesCard/>
          <CoursesCard/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
