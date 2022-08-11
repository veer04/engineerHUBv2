import React from "react";
// import Hire from "./Hire";
import "./Hiring.css";
import Card from "../Campus/Card";

const Hiring = () => {
  return (
    <div className="container-hiring">
      <div className="heading">We are Hiring !!</div>

      <div className="texthire">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex flex-wrap justify-content-center " style={{marginTop:"0px" , columnGap: "70px" , rowGap: "70px"}}>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        <Card paid={true} card_head={"Hiring Mentors for Domain"}/>
        
      </div>
    </div>
  );
};

export default Hiring;