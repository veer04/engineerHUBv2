import React from "react";
import { Link } from "react-router-dom";
import "./freecourses.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Card({
  courseTitle1,
  courseTitle2,
  courseDescription,
  cardImage,
  lastDate,
  id,
  state,
}) {
  return (
    <>
      <div
        className="card default-card"
        style={{
          
          margin: "10px",
        }}
      >
        <div className="card-body default-card-body">
          <img
            width={258}
            height={147}
            src={require(`${cardImage}`)}
            style={{ margin: "0px 0px 10px 0px"}}
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
                padding:"8px" ,
                color: "rgba(255, 199, 0, 1)",
              }}
            >
              {courseTitle1} {courseTitle2}
            </h5>
            <div>
              <ShareOutlinedIcon
                className="share-icon"
                style={{ fontSize: "18px", marginRight: "0px",padding:"8px" , }}
              />
            </div>
          </div>
          <p className="card-text" style={{ fontSize: "12px",padding:"8px" , }}>
            {courseDescription}
          </p>
          {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
          <div className="btn-container d-flex justify-content-between align-items-baseline">
            <Link
              to={`/userpage/${id}`}
              state={state}
              className="default-btn"
              style={{ backgroundColor: "rgba(255, 199, 0, 1)" }}
            >
              <div style={{ color: "#000000", fontWeight: 400 }}>Register</div>
            </Link>
            <p
              className="d-flex card-date fst-normal align-items-center justify-content-center"
              style={{ fontSize: "12px", color: "#fff", fontWeight: "bold",padding:"8px" , }}
            >
              Last date: {lastDate}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
