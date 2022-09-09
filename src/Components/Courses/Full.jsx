import React from "react";
import { Link } from "react-router-dom";                                    
import "./freecourses.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import backImage from "./backimg.png";

function Card() {


  return (
    <>
    <div
      className="card default-card"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <div className="card-body default-card-body">
        <img
          src={backImage}
          style={{ margin: "0px 0px 10px 0px" }}
          className="card-img-top"
          alt="..."
        />

        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title magc"
            style={{
              padding: 0,
              font: "poppins",
              fontWeight: 800,
              fontSize: "18px",
              lineHeight: "32px",
              paddingTop: "0",
              color: "#1b5b62",
            }}
          >
            App Development
          </h5>
          <div>
            <ShareOutlinedIcon
              className="share-icon"
              style={{ fontSize: "18px", marginRight: "0px" }}
            />
          </div>
        </div>
        <p className="card-text" style={{ fontSize: "12px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, eget
          suspendisse nunc duis non eget est.Lorem ipsum dolor sit amet.
        </p>
        {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
        <div className="btn-container d-flex justify-content-between align-items-baseline">
          <Link
            to="/userpage"
            className="default-btn"
            style={{ backgroundColor: "#0d718c" }}
          >
            <div style={{ color: "white" }}>Register</div>
          </Link>
          <p
            className="d-flex fst-normal align-items-center justify-content-center"
            style={{ fontSize: "14px", color:"#1b5b62", fontWeight:"bold" }}
          >
            Last date: dd/mm/yy
          </p>
        </div>
      </div>
      
    </div>
    <div
    className="card default-card"
    style={{
      padding: "10px",
      margin: "10px",
    }}
  >
    <div className="card-body default-card-body">
      <img src={backImage} style={{ margin: "0px 0px 10px 0px" }} className="card-img-top" alt="..." />

      <div className="d-flex justify-content-between align-items-center">
        <h5
          className="card-title magc"
          style={{
            padding: 0,
            font: "poppins",
            fontWeight: 800,
            fontSize: "18px",
            lineHeight: "32px",
            paddingTop: "0",
            color:"#1b5b62"
          }}
        >
          UI/UX design
        </h5>
        <div>
          <ShareOutlinedIcon
            className="share-icon"
            style={{ fontSize: "18px", marginRight: "0px" }}
          />
        </div>
      </div>
      <p className="card-text" style={{ fontSize: "12px"}}>
      We provide effective learning sessions from skilled mentors to help 
      students gain relevant knowledge and effective road maps on UI/UX design.
      </p>
      {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
      <div className="btn-container d-flex justify-content-between align-items-baseline">
        <div className="default-btn" style={{ backgroundColor: "#0094FF" }}>
          <div style={{ color: "white" }}>Register</div>
        </div>
        <p
          className="d-flex fst-normal align-items-center justify-content-center"
           style={{ fontSize: "14px" }}
        >
          Last date: dd/mm/yy
        </p>
      </div>
    </div>
    
  </div>
  <div
    className="card default-card"
    style={{
      padding: "10px",
      margin: "10px",
    }}
  >
    <div className="card-body default-card-body">
      <img src={backImage} style={{ margin: "0px 0px 10px 0px" }} className="card-img-top" alt="..." />

      <div className="d-flex justify-content-between align-items-center">
        <h5
          className="card-title magc"
          style={{
            padding: 0,
            font: "poppins",
            fontWeight: 800,
            fontSize: "18px",
            lineHeight: "32px",
            paddingTop: "0",
            color:"#1b5b62"
          }}
        >
          Web development
        </h5>
        <div>
          <ShareOutlinedIcon
            className="share-icon"
            style={{ fontSize: "18px", marginRight: "0px" }}
          />
        </div>
      </div>
      <p className="card-text" style={{ fontSize: "12px"}}>
      We help students master Web development by covering fundamentals as well as advanced topics & 
      technical strategies from mentors having great expertise in their fields.
      </p>
      {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
      <div className="btn-container d-flex justify-content-between align-items-baseline">
        <div className="default-btn" style={{ backgroundColor: "#0094FF" }}>
          <div style={{ color: "white" }}>Register</div>
        </div>
        <p
          className="d-flex fst-normal align-items-center justify-content-center"
           style={{ fontSize: "14px" }}
        >
          Last date: dd/mm/yy
        </p>
      </div>
    </div>
    
  </div>
  <div
    className="card default-card"
    style={{
      padding: "10px",
      margin: "10px",
    }}
  >
    <div className="card-body default-card-body">
      <img src={backImage} style={{ margin: "0px 0px 10px 0px" }} className="card-img-top" alt="..." />

      <div className="d-flex justify-content-between align-items-center">
        <h5
          className="card-title magc"
          style={{
            padding: 0,
            font: "poppins",
            fontWeight: 800,
            fontSize: "18px",
            lineHeight: "32px",
            paddingTop: "0",
            color:"#1b5b62"
          }}
        >
          Cyber Security
        </h5>
        <div>
          <ShareOutlinedIcon
            className="share-icon"
            style={{ fontSize: "18px", marginRight: "0px" }}
          />
        </div>
      </div>
      <p className="card-text" style={{ fontSize: "12px"}}>
      We provide students with the best courses to improve their cyber security knowledge and 
      assess the current threat landscape & how to protect against it.
      </p>
      {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
      <div className="btn-container d-flex justify-content-between align-items-baseline">
        <div className="default-btn" style={{ backgroundColor: "#0094FF" }}>
          <div style={{ color: "white" }}>Register</div>
        </div>
        <p
          className="d-flex fst-normal align-items-center justify-content-center"
           style={{ fontSize: "14px" }}
        >
          Last date: dd/mm/yy
        </p>
      </div>
    </div>
    
  </div>
  </>
  );
}

export default Card;
