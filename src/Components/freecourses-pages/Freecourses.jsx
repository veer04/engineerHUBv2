import React from "react";
import "./freecourses.css";
import Full from "../freecourses-pages/Full";

const Freecourses = () => {
  return (
    <div className="container-courses">
      <div className="heading" style={{paddingTop:"60px", paddingBottom:"0px"}}>Explore Courses</div>

      <div className="textcourses">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex flex-wrap justify-content-center " style={{marginTop:"0px" , gap: "40px"}}>
        <Full/>
        <Full/>
        <Full/>
        <Full/>
        <Full/>
        <Full/>
      </div>
    </div>
  );
};

export default Freecourses;