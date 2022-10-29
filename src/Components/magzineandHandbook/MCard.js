import React from "react";
import "./MCard.css";

// import cybersecurityimg from "./cybersecurityimg.png";

// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
// import cp from "../pdf/cp.pdf";
// import cpp from "./Images/cpp.jpg";

function Card({ bookTitle, pdfUrl, cardImage }) {
  return (
    <div
      className="card custom-card-2 container-mag"
      style={{
        padding: "0px",
        margin: "10px",
        height: "fit-content",
      }}
    >
      <div className="card-body custom-card-body-2 ">
        <img
          src={cardImage}
          style={{
            borderRadius: "16px",

            width: "100%",
            background: "cover",
          }}
          className="card-img-top"
          alt="..."
        />
        <div className="overlay">
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
                color: "#ffc107",
              }}
            >
              {bookTitle}
            </h5>
          </div>
          <p
            className="card-text custom-card-text-2 dark-bg"
            style={{ textColor: "white" }}
          >
            Our developers aim at providing students with the best knowledge to
            help them create high-performing & user-friendly apps through a
            strategic IT framework.
          </p>
          <div className="btn-container d-flex justify-content-between align-items-baseline">
            <Link to="/pdf">
              <div
                className="btn custom-card-btn-2"
                style={{ backgroundColor: "#0094FF", borderRadius: "20px" }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "20px",
                  }}
                  // onClick={Viewer}
                >
                  Tap to Open
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
