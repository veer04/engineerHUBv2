import React from "react";
import "./referralratings.css";
import ReviewSlide from "./ReviewSlide/ReviewSlide";

const ReferralRatings = () => {
  return (
    <div className="main-container-ratings">
      <div className="referral-sub">
        <div className="rating-title-main">
          <h4 className="rating-h4">Ratings & Feedback</h4>

          <div className="rating-cards-btn">
            <button>All</button>
            <button>1:1 Connect</button>
            <button>Digital Products</button>
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
