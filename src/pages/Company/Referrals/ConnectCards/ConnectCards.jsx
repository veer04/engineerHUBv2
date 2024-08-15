import React from "react";
import "./connectcard.css";
import { useNavigate } from "react-router-dom";

const ConnectCards = ({ id, title, desc, duration, price, type }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/referrals/book-now/${id}`);
  };
  return (
    <>
      <div className="connect-card-main">
        <div className="connect-card-sub">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: "55px",
              height: "32px",
              padding: "4px 12px",
              gap: 3,
              borderRadius: 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>5</h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>

          <div
            style={{
              backgroundColor: "white",
              width: "72px",
              height: "32px",
              padding: "4px 12px",
              gap: 3,
              borderRadius: 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h5 style={{ fontSize: "13px", marginTop: "5px" }}>Popular</h5>
          </div>
        </div>

        {/* //heading resume saif */}
        <div style={{ marginTop: "10px" }}>
          <h5 className="resume-title">{title}</h5>
        </div>

        <div className="meeting-duration">
          <div className="m-left-duration">
            <h5 style={{ fontSize: "12px", color: "#547178" }}>
              Meeting Duration
            </h5>
            <h5
              style={{ fontSize: "20px", fontWeight: "600", marginTop: "-5px" }}
            >
              {duration}
            </h5>
          </div>

          <div className="stick"></div>

          <div className="m-right-duration">
            <h5 style={{ fontSize: "12px", color: "#547178" }}>Amount</h5>
            <h5
              style={{ fontSize: "20px", fontWeight: "600", marginTop: "-5px" }}
            >
              {price}
            </h5>
          </div>
        </div>

        <div className="btn-book-now">
          <button onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </>
  );
};

export default ConnectCards;
