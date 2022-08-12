import React from "react";
import "./Hiring.css";
import Card from "../Campus/Card";

const Hiring = () => {
  return (
    <div className="container-hiring">
      <div className="heading">We are Hiring !!</div>

      <div className="texthire">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit nunc duis dui, dui hendrerit suscipit.</div>

      <div className="d-flex row justify-content-center " style={{marginTop:"0px" , gap: "40px", paddingBottom:"80px"}}>
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