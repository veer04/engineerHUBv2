import React from "react";
import Hire from "./Hire";
import "./Hiring.css";

const Hiring = () => {
  return (
    <div className="container">
      <div className="heading">We are Hiring !!</div>

      <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div>
        <Hire />
        <Hire />
        <Hire />
        <Hire />
      </div>
    </div>
  );
};

export default Hiring;