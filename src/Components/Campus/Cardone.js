import React from "react";
import "./Card.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";


function Cardone({
  paid = false,
  card_head = "Conference on emergent phenomenon in Quantum materials. ",
  cName = "card custom-card ",
  cDate = "14-12-2022"
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
        On the occasion of their175 years of completion, IIT Roorkee is organising a conference to cover the recently observed emergent phenomena in the area of quantum materials. These materials pose the most exciting and challenging research problems in condensed matter physics. 
        </p>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Organizer: IIT Roorkee
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href="https://www.iitr.ac.in/epqm/" className="btnc" style={{ backgroundColor: "#002a36" , borderRadius: "10px"}}>
            <span style={{ color: "white", fontSize: "0.9rem", padding: "12px 24px" , }}>
              View More !
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

export default Cardone;
