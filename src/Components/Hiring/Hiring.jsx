import React from "react";
// import Hire from "./Hire";
import "./Hiring.css";
import Card from "../Card/Card";

const Hiring = () => {
  return (
    <div className="container-hiring">
      <div className="heading" style={{paddingTop:"60px", paddingBottom:"0px"}}>We are Hiring !!</div>

      <div className="texthire">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex flex-wrap justify-content-center " style={{marginTop:"0px" , gap: "40px"}}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
};

export default Hiring;