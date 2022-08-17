import React from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import cybersecurityimg from "./cybersecurityimg.png";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Card() {
  return (
    <div
      className="card custom-card"
      style={{
        padding: "10px",
        margin: "10px",
        height:"620px"
      }}
    >
      <div className="card-body">
        <img src={cybersecurityimg} style={{ margin: "0px 0px 10px 0px",height:"50%", background:"cover"}} className="card-img-top" alt="..." />
        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title"
            style={{
              margin:"0",
              padding: 0,
              font: "poppins",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "32px",
              paddingTop: "0",
              color:"#1b5b62"
            }}
          >
            CyberSecurity
          </h5>
          <div>
            <ShareOutlinedIcon
              className="share-icon"
              style={{ fontSize: "22px", marginRight: "0px" }}
            />
          </div>
        </div>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, eget
          suspendisse nunc duis non eget est.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Arcu, eget suspendisse nunc duis non eget
          est.
        </p>
        <div className="btn-container d-flex justify-content-between align-items-baseline">
          <a href="#" className="btn" style={{ backgroundColor: "#0094FF",borderRadius: "20px"}}>
            <span style={{ color: "white", fontSize:"15px" ,borderRadius: "20px"}}>Tap to Open</span>
          </a>
          <p className="btn" style={{ backgroundColor: "#FFC700" ,borderRadius: "20px"}}>
            <span style={{ color: "white", fontSize:"15px" , }}><VisibilityOutlinedIcon/>  1,000 </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
