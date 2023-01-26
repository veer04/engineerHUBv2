import React from "react";
import "./CardH.css";
import moment from 'moment';
import ehub from './ehub.svg';

function CardH({
  card_head,
  cName = "card custom-cardH ",
  lastDate,
  desc,
  loc,
  tech,
  exp,
  elg
}) {
  const url={link1:"https://docs.google.com/forms/d/e/1FAIpQLSc_wMzc-inR7E0CVDbse-fKYP4DioUXj5tRBIIR-ZXOMzLotA/viewform",
  link2:" https://docs.google.com/forms/d/e/1FAIpQLSfQeSMW8JIUTw4SuFZOQB7EgYlMEoEL-x8iW1oMF6iNT6mTQw/viewform"}
  return (
    <div
      className="hiringmainC"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <img src={ehub} alt="" />
      <div className="ttxt">
        @engineerHUB
      </div>
      <div className="card-body">
        <div className=" ">
          <div
            className="card-title h-effect"
            style={{
              padding: 0,
              font: "poppins",
              fontWeight: 500,
              fontSize: "1.3rem",
              lineHeight: "2.3rem",
              paddingTop: "0",
              color: "#002b36"
            }}
          >
            {card_head}
          </div>
         
        </div>
        <div className="d-flex">
          <ul>
            <li>
        <h6 style={{ fontWeight: 400  ,paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          TechStack: {tech}
        </h6>
            </li>
            <li>
            <h6 style={{ fontWeight: 400, paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Experience: {exp}
        </h6>

            </li>
            <li>
            <h6 style={{ fontWeight: 400,  paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Eligibility: {elg}
        </h6>
            </li>
          </ul>
        </div> 
        {/* <p className="card-text" style={{color:"#002A36", fontWeight:"500"}}>
        {desc}
        </p> */}
        
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Location: {loc}
        </h6>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Last Date: {moment(new Date(lastDate)).format("DD-MM-YYYY")}
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href={url.link1} className="btnc" style={{ backgroundColor: "#002a36" , borderRadius: "10px"}}>
            <span style={{ color: "white", fontSize: "0.9rem", padding: "12px 24px" , }}>
              Apply
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardH;
