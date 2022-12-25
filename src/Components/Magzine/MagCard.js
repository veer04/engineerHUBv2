import React from "react";
// import { Link } from "react-router-dom";

import "./MagazineCourse.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";

function MagazineCard({
    bookTitle, description,img,pdfUrl
}) {
  return (
    <>
      <div
        className="card default-card"
        style={{
          padding: "0px",
          margin: "10px",
          maxHeight:"450px"
        }}
      >
        <div className="card-body default-card-body">
          <img
            width="100%"
            height={157}
            src={img}
            style={{
              margin: "0px 0px 10px 0px",
              borderRadius: "10px 10px 0 0",
            }}
            className="card-img-top"
            alt="..."
          />

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "0px 7px 2px 8px" }}
          >
            <h5
              className="card-title magc"
              style={{
                padding: 0,
                font: "poppins",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "20px",
                paddingTop: "0",
                color: "rgba(255, 199, 0, 1)",
              }}
            >
              {bookTitle}
            </h5>

            <div>
              <RWebShare
                data={{
                  url: `${pdfUrl}`,
                  title: "Share this",
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
          <div className="cutoff-text textcut">
          <p
            className="card-text"
            style={{ fontSize: "12px", padding: "0 7px 0 7px", maxHeight:"200px" }}
          >
            {description}
          </p>
          </div>
          {/* <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6> */}
          <div
            className="btn-container d-flex justify-content-between align-items-baseline"
            style={{ padding: "0px 3px 8px 6px" , marginTop:"10px"}}
          >
            {/* <Link to={"/pdf"}> */}
            <a href={pdfUrl} target="_blank" rel="noreferrer">
                <div
                  className="default-btn"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    alignContent: "center ",
                    backgroundColor: "rgba(255, 199, 0, 1)",
                  }}
                >
                  Open
                </div>
            </a>
            {/* </Link> */}

            {/* <p
              className="d-flex card-date fst-normal align-items-center justify-content-center"
              style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}
            >
              Last date: {lastDate}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MagazineCard;
