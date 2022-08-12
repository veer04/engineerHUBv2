import React from "react";
import "./Card.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Card({ paid = false , card_head="Hackathons for Developers"}) {
  return (
    <div
      className="card custom-card"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <div className="card-body">
        {paid && (
          <h6
            className="d-flex justify-content-end"
            style={{ color: "rgba(0,0.5,0.5,0.2)" }}
          >
            Paid
          </h6>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <h5
            className="card-title h-effect"
            style={{
              padding: 0,
              font: "poppins",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "32px",
              paddingTop: "0",
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
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, eget
          suspendisse nunc duis non eget est.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Arcu, eget suspendisse nunc duis non eget
          est.
        </p>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Organizer: IIT Delhi
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href="#" className="btn" style={{ backgroundColor: "#0094FF"}}>
            <span style={{ color: "white",fontSize:"0.9rem" }}>Apply Now !</span>
          </a>
          <p
            className="d-flex fst-normal align-items-baseline"
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
