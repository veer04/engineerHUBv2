import React, { useEffect, useState } from "react";
import "./recommendedsection.css";
import { FaRegHandshake } from "react-icons/fa";
import RecommendationCard1 from "./RecommendationCard1";
import RecommendedCard2 from "./RecommendedSection2";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/getCookieValues";

const RecommendedSection = () => {
  const [recommendationData, setRecommendationData] = useState([]);

  return (
    <>
      <div className="recommended-main-section-div">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <FaRegHandshake size={18} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Recommendations for you
          </h3>
        </div>

        <div className="recommendation-cards-saif">
          <RecommendationCard1 />
          <RecommendedCard2 />
          <RecommendationCard1 />
        </div>
      </div>
    </>
  );
};

export default RecommendedSection;
