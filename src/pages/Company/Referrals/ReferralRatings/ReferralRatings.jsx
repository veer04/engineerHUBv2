import React, { useState } from "react";
import "./referralratings.css";
import ReviewSlide from "./ReviewSlide/ReviewSlide";

const ReferralRatings = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };
  return (
    <div className="main-container-ratings">
      <div className="referral-sub">
        <div className="rating-title-main">
          <h4 className="rating-h4">Ratings & Feedback</h4>

          <div className="rating-cards-btn">
            <span style={{ color: "#138382", fontSize: "16px" }}>
              Here are some feedbacks from our users.
            </span>
            {/* <button
              style={{
                backgroundColor: activeFilter === "All" ? "#138382" : "#f2f4f5",
                color: activeFilter === "All" ? "white" : "#002b36",
                padding: "4px 16px",
                borderRadius: "10px",
                border: "none",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              onClick={() => handleFilter("All")}
            >
              All
            </button>
            <button
              style={{
                backgroundColor:
                  activeFilter === "1:1 Connect" ? "#138382" : "#f2f4f5",
                color: activeFilter === "1:1 Connect" ? "white" : "#002b36",
                padding: "4px 16px",
                borderRadius: "10px",
                border: "none",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              onClick={() => handleFilter("1:1 Connect")}
            >
              1:1 Connect
            </button>
            <button
              style={{
                backgroundColor:
                  activeFilter === "Digital Products" ? "#138382" : "#f2f4f5",
                color:
                  activeFilter === "Digital Products" ? "white" : "#002b36",
                padding: "4px 16px",
                borderRadius: "10px",
                border: "none",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              onClick={() => handleFilter("Digital Products")}
            >
              Digital Products
            </button> */}
          </div>
        </div>
        <div className="rating-slider-main">
          <ReviewSlide />
        </div>
      </div>
    </div>
  );
};

export default ReferralRatings;
