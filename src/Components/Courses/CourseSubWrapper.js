import React from "react";
import { useLocation } from "react-router-dom";

import SyllabusWrapper from "./SyllabusWrapper";
import "./CourseSubWrapper.css";

// import CoursesC
const CourseWrapper = () => {
  const { state } = useLocation();

  return (
    <div className="row">
      <SyllabusWrapper
        courseName={`${state.title}`}
        syllabus={state.syllabus}
      />
    </div>
  );
};

export default CourseWrapper;
