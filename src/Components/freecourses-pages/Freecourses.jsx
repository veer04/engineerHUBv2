import React from "react";
import "./freecourses.css";
import Full from "../freecourses-pages/Full";

const Freecourses = () => {
  return (
    <div className="container-hiring">
      <div className="heading">Explore Courses</div>

      <div className="texthire">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>

      <div 
      style={{ marginBottom: "40px"}}
      className="d-flex row justify-content-evenly courses-cont">
        <Full />
        <Full />
        <Full />
      </div>
      <div className="d-flex row justify-content-evenly courses-cont">
        <Full />
        <Full />
        <Full />
      </div>
    </div>
  );
};

export default Freecourses;
