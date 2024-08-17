import React from "react";
import "./digitalcard.css";

const DigitalCards = () => {
  return (
    <>
      <div className="digi-main-container">
        <div>
          <img src={"/digitalcard.png"} alt="" />
        </div>

        <div className="digi-content-container">
          <h2 className="digi-h2">
            Resume Building+Career Guidance | Referral for Job
          </h2>

          <h4 className="digi-h4">
            Resume Building+Career Guidance | Referral for Job
          </h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div>
              <h5 style={{ fontSize: "12px", color: "#000" }}>Amount</h5>
              <h5
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginTop: "-5px",
                }}
              >
                ₹399
              </h5>
            </div>

            <div className="purchase-btn">
              <button>Purchase Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalCards;
