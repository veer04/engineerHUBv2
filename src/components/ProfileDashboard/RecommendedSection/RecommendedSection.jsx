import React, { useEffect, useState } from "react";
import "./recommendedsection.css";
import { FaRegHandshake } from "react-icons/fa";
import RecommendationCard1 from "./RecommendationCard1";
import RecommendedCard2 from "./RecommendedSection2";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/getCookieValues";

const RecommendedSection = () => {
  const [recommendationData, setRecommendationData] = useState([]);

  // console.log(recommendationData, "recomsaif");

  const fetchRecommendationData = async () => {
    try {
      const response = await fetch(
        `${API_URL}api/v1/userDashboard/recommendation-area`,
        {
          method: "GET",
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );

      const data = await response.json();
      // console.log(data, "responsedatarecommended");
      setRecommendationData(data.data);
    } catch (error) {
      console.error("Error getting the data", error);
      setRecommendationData([]);
    }
  };

  useEffect(() => {
    fetchRecommendationData();
  }, []);

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
          {recommendationData?.job && (
            <RecommendationCard1 data={recommendationData.job} />
          )}

          {recommendationData?.meet && (
            <RecommendedCard2 data={recommendationData.meet} />
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendedSection;
