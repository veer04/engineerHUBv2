import React, { useState,useEffect } from "react";
import "./Hiring.css";
import axios from "axios";
import Card from "../Campus/Card";


const Hiring = () => {

  const [card,setCard] = useState("");
  useEffect(() => {
    const getHiringDetails = async () => {
      const response = await axios.get(`https://ehubbackend.herokuapp.com/api/v1/hiring`)
     
      setCard(...response.data);
      
    }
    getHiringDetails();
   
  },[])
  
  return (
    <div className="container-hiring">
      <div className="heading">We are Hiring !!</div>

      <div className="texthire">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>

      <div
        className="d-flex row justify-content-center "
        style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
      >
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
        <Card paid={true} card_head={`Hiring for ${card.position}`} cDate={card.date} />
      
      </div>
    </div>
  );
};

export default Hiring;
