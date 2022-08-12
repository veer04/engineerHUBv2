import React from "react";
import "./freecourses.css";
import Full from "../freecourses-pages/Full";

const Freecourses = () => {
  return (
    <div className="container-hir">
      <div className="heading">Explore Courses</div>

      <div className="texthire">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex row justify-content-center " style={{marginTop:"0px" , gap: "40px", paddingBottom:"80px"}}>
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