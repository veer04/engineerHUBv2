import React from "react";
import "./MCard.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import cybersecurityimg from "./cybersecurityimg.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Card({ bookTitle, pdfUrl }) {
  return (
    <div
      className="card custom-card-2"
      style={{
        padding: "10px",
        margin: "10px",
        height: "fit-content",
      }}
    >
      <div className="card-body custom-card-body-2">
        <img
          src={cybersecurityimg}
          style={{
            margin: "0px 0px 10px 0px",
            width: "100%",
            background: "cover",
          }}
          className="card-img-top"
          alt="..."
        />
        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title"
            style={{
              margin: "0",
              padding: "0 0px 10px 0px",
              font: "poppins",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "capitalize",
              color: "#1b5b62",
            }}
          >
            {bookTitle}
          </h5>
          <div>
            <ShareOutlinedIcon
              className="share-icon"
              style={{ fontSize: "22px", marginRight: "0px" }}
            />
          </div>
        </div>
        <p className="card-text custom-card-text-2">
          Our developers aim at providing students with the best knowledge to
          help them create high-performing & user-friendly apps through a
          strategic IT framework.
        </p>
        <div className="btn-container d-flex justify-content-between align-items-baseline">
          <a
            href={pdfUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="btn custom-card-btn-2"
            style={{ backgroundColor: "#0094FF", borderRadius: "20px" }}
          >
            <span
              style={{ color: "white", fontSize: "12px", borderRadius: "20px" }}
            >
              Tap to Open
            </span>
          </a>
          <p
            className="btn custom-card-btn-2"
            style={{ backgroundColor: "#FFC700", borderRadius: "20px" }}
          >
            <span style={{ color: "white", fontSize: "12px" }}>
              <VisibilityOutlinedIcon /> 1,000{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
