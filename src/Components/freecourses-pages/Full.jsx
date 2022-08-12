import React from "react";
import "./freecourses.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import backImage from "./backimg.png";
import cybersecurityimg from "../magzineandHandbook/cybersecurityimg.png";

function Card() {
  return (
    <div
      className="card custom-card"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <div className="card-body">
        <img src={backImage} style={{ margin: "0px 0px 10px 0px" }} className="card-img-top" alt="..." />

        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title"
            style={{
              padding: 0,
              font: "poppins",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "32px",
              paddingTop: "0",
            }}
          >
            Frontend Development
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
        {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
        <div className="btn-container d-flex justify-content-between align-items-baseline">
          <a href="#" className="btn" style={{ backgroundColor: "#0094FF" }}>
            <span style={{ color: "white" }}>Register</span>
          </a>
          <p
            className="d-flex fst-normal align-items-center justify-content-center"
            // style={{ marginLeft: "4.4rem" }}
          >
            Last date: dd/mm/yy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
