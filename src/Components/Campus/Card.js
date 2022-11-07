import React from "react";
import "./Card.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";


function Card({
  card_head ,
  
  clgphoto,
  desc,
  clgname,
  evtdate,
  link
}) {
  return (
    <div className="cont-camp">
    <div style={{ 
      backgroundImage: `linear-gradient(
        15deg,
        rgba(146, 146, 146, 0.252),
        rgb(255 255 255)
      ),url(${clgphoto})`,
      borderRadius:"20px",
      overflow:"hidden"
    }}>
    <div
      className="card custom-card"
      style={{
        padding: "10px",
        margin: "10px",
        background:"#ffffff3b",
        
        
        
      }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center overflow-hidden">
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
        <p className="card-text" style={{color:"#002A36", fontWeight:"500"}}>
        {desc}
        </p>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Organizer: {clgname}
        </h6>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Event Date: {evtdate="12-10-2022"}
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href={link} className="btnc" style={{ backgroundColor: "#002a36" , borderRadius: "10px"}} target="_blank">
            <span style={{ color: "white", fontSize: "0.9rem", padding: "12px 24px" , }}>
              View More !
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
     </div>
     </div>
  );
}

export default Card;
