import React from "react";
import { Link } from "react-router-dom";

import "./MagazineCourse.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import cp from "../pdf/cp.pdf";
// import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";


function MagazineCard({
  courseTitle1,
  courseTitle2,
  courseDescription,
  lastDate,
  cardImage,
  id,
  state,
}) {
  return (
    <>
      <div
        className="card default-card"
        style={{
          padding: "0px",
          margin: "10px",
        }}
      >
        <div className="card-body default-card-body">
          <img
            width="100%"
            height={147}
            src={require(`${cardImage}`)}
            style={{ margin: "0px 0px 10px 0px" ,borderRadius: "10px 10px 0 0",}}
            className="card-img-top"
            alt="..."
          />

          <div className="d-flex justify-content-between align-items-center" style={{padding: "0px 7px 2px 8px"}}>
            <h5
              className="card-title magc"
              style={{
                padding: 0,
                font: "poppins",
                fontWeight: 800,
                fontSize: "18px",
                lineHeight: "32px",
                paddingTop: "0",
                color: "rgba(255, 199, 0, 1)",
              }}
            >
              {courseTitle1} {courseTitle2}
            </h5>
            
            <div>
            <RWebShare
        data={{
          url: "https://simplebooklet.com/ux",
          title: "Share this"
        }}
        onClick={() => console.info("Shared successfully!")}
      >
              <ShareOutlinedIcon
                className="share-icon"
                style={{ fontSize: "18px", marginRight: "0px" }}
              />
              </RWebShare>
            </div>
          </div>
          <p className="card-text" style={{ fontSize: "12px" ,padding:"0 7px 0 7px"}}>
            {courseDescription}
          </p>
          {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
          <div className="btn-container d-flex justify-content-between align-items-baseline" style={{padding:"0px 3px 8px 6px"}}>
           <Link to={"/pdf"}>
              <a
                href={cp}
                target="_blank"
                rel="noreferrer"
                className="default-btn"
                style={{ backgroundColor: "rgba(255, 199, 0, 1)" }}
              >
                <div style={{ color: "#000000", fontWeight: 400 , alignContent:"center "}}>
                  Open
                </div>
              </a>
              </Link>
       
            <p
              className="d-flex card-date fst-normal align-items-center justify-content-center"
              style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}
            >
              Last date: {lastDate}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MagazineCard;
