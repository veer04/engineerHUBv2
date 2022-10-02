import React from "react";
import "./Card.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Card({
  paid = false,
  card_head = "Hackathons for Developers",
  cName = "card custom-card ",
  cDate = "12-05-2022"
}) {
  return (
    <div
      className={cName}
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
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "32px",
              paddingTop: "0",
              color: "#1b5b62"
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
        <p className="card-text dark-bg">
        we are hiring mentors to help guide students on their respective interests and lay a framework to help them ease the process. Interested Candidates can apply. 
        </p>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Organizer: IIT Delhi
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href="/#" className="btnc" style={{ backgroundColor: "#002a36" , borderRadius: "10px"}}>
            <span style={{ color: "white", fontSize: "0.9rem", padding: "12px 24px" , }}>
              Apply Now !
            </span>
          </a>
          {/* <p
            className="d-flex fst-normal align-items-baseline campus--date"
            // style={{ marginLeft: "4.4rem" }}
          >
            Last date: {cDate}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
