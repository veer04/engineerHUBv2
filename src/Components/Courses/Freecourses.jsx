import React from "react";
import "./freecourses.css";
import Full from "./Full";

const Freecourses = () => {
  return (
    <div className="container-hiring">
      <div className="heading">Explore Courses</div>

      <div className="texthire">
      engineerhub aims to provide several free courses to students to provide necessary material with utmost ease. 
      </div>

      <div 
      style={{ margin: "0px 35px 40px"}}
      className="d-flex row justify-content-evenly courses-cont">
        <Full />
        <Full />
        <Full />
      </div>
      <div 
       style={{ margin: "0px 35px 40px"}}
      className="d-flex row justify-content-evenly courses-cont">
        <Full />
        <Full />
        <Full />
      </div>
    </div>
  );
};

export default Freecourses;
