import React from "react";
import { Link } from "react-router-dom";
import "./MagazineCourse.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import backImage from "./backimg.png";

function MagazineCard({
  courseTitle1,
  courseTitle2,
  courseDescription,
  lastDate,
  id,
  state,
}) {
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
                color: "rgba(255, 199, 0, 1)",
              }}
            >
              {courseTitle1} {courseTitle2}
            </h5>
            <div>
              <ShareOutlinedIcon
                className="share-icon"
                style={{ fontSize: "18px", marginRight: "0px" }}
              />
            </div>
          </div>
          <p className="card-text" style={{ fontSize: "12px" }}>
            {courseDescription}
          </p>
          {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
          <div className="btn-container d-flex justify-content-between align-items-baseline">
            <Link
              to={`/userpage/${id}`}
              
              className="default-btn"
              style={{ backgroundColor: "rgba(255, 199, 0, 1)" }}
            >
              <div style={{ color: "#000000", fontWeight: 400 }}>Register</div>
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
