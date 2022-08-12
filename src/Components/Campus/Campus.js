import React from "react";
import Card from "./Card";
import "./Campus.css";

const Campus = () => {
  return (
    <div className="containerc">
      <div className="heading">Campus Activities</div>

      <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex row justify-content-center " style={{marginTop:"0px" , gap: "40px", paddingBottom:"80px"}}>
        <Card />   
        <Card />   
        <Card />   
        <Card />   
        <Card />   
        <Card />   
      </div>
    </div>
  );
};

export default Campus;