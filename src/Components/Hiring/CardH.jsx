import React from "react";
import "./CardH.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import moment from 'moment';


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
      className={cName}
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <div className="card-body">
        {/* {paid && (
          <h6
            className="d-flex justify-content-end"
            style={{ color: "rgba(0,0.5,0.5,0.2)" }}
          >
            Paid
          </h6>
        )} */}
        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title h-effect"
            style={{
              padding: 0,
              font: "poppins",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "32px",
              paddingTop: "0",
              color: "#1b5b62"
            }}
          >
            {card_head}
          </h5>
          <div>
            <ShareOutlinedIcon
              className="share-icon"
              style={{ fontSize: "22px", marginRight: "0px" }}
            />
          </div>
        </div>
        <div className="d-flex">
        <h6 style={{ fontWeight: 700 , fontSize:"0.8rem" ,paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          TechStack: {tech}
        </h6>
        <h6 style={{ fontWeight: 700, fontSize:"0.8rem", paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Experience: {exp}
        </h6>
        <h6 style={{ fontWeight: 700, fontSize:"0.8rem",  paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Eligibility: {elg}
        </h6>
        </div> 
        <p className="card-text" style={{color:"#002A36", fontWeight:"500"}}>
        {desc}
        </p>
        
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
          {/* <p
            className="d-flex fst-normal align-items-baseline campus--date"
            // style={{ marginLeft: "4.4rem" }}
          >
            Last date: {cDate}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default CardH;
