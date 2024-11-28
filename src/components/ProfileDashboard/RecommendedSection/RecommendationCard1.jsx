import React, { useState } from "react";
import "./recommendationcard1.css";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";

const RecommendationCard1 = ({ data }) => {
  // console.log(data, "jokbdata");
  const [isEyeVisible, setIsEyeVisible] = useState(false);

  const toggleAmountShow = () => {
    setIsEyeVisible(!isEyeVisible);
  };

  const {
    opportunityName = "Unknown Position",
    city = "Unknown City",
    opportunityLocation = "Remote",
    minExperience = 0,
    maxExperience = 0,
    isForFreshers = false,
    organisationLogo = "./amazon.png",
    organisationName = "Unknown Organisation",
    showSalary = false,
    salaryDisclosure = "Not Disclosed",
  } = data || {};

  return (
    <>
      <div className="recommendation-card1-main">
        <div>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            {organisationName}
          </h4>

          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            {opportunityName}
          </h3>
        </div>
        {/* //recommendation profile data */}
        <div style={{ marginTop: 5 }} className="icon-section-recommended-1">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div>
              <img src="./location3.svg" alt="" />
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "#002B36",
                marginBottom: 0,
                marginTop: 3,
              }}
            >
              {city} ({opportunityLocation})
            </h3>
          </div>

          <div></div>
        </div>
        <div style={{ marginTop: 3 }} className="icon-section-recommended-1">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div>
              <img src="./salary.svg" alt="" />
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "#002B36",
                marginBottom: 0,
                marginTop: 3,
              }}
            >
              {showSalary ? salaryDisclosure : "Salary Not Disclosed"}
            </h3>
          </div>

          <div></div>
        </div>
        <div style={{ marginTop: 3 }} className="icon-section-recommended-1">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div>
              <img src="./experience.svg" alt="" />
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "#002B36",
                marginBottom: 0,
                marginTop: 3,
              }}
            >
              {isForFreshers
                ? "Fresher"
                : `${minExperience}-${maxExperience} Years`}
            </h3>
          </div>

          <div className="absolute-position-amazon">
            <img
              style={{ borderRadius: "50%" }}
              src={organisationLogo}
              width={48}
              height={48}
              alt=""
            />
          </div>
        </div>

        {/* //recommendation profile data end */}

        <div
          style={{
            height: 1,
            background: "#B0B0B0",
            alignSelf: "stretch",
            marginTop: 10,
          }}
        ></div>

        {/* //border end */}

        {/* //button div */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {/* <button
            style={{
              background: "#feebe3",
              border: "1px solid #FF3737",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              padding: "4px 4px",
              borderRadius: 5,
            }}
          >
            Closed
          </button> */}

          <button
            style={{
              background: "#eaf7e2",
              border: "1px solid #69d578",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              padding: "4px 4px",
              borderRadius: 5,
            }}
          >
            New Opening
          </button>

          {/* //eye div saif */}
          <div style={{ display: "flex", gap: 3 }}>
            {isEyeVisible ? (
              <FaRegEye
                onClick={toggleAmountShow}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <IoEyeOffOutline
                onClick={toggleAmountShow}
                style={{ cursor: "pointer" }}
              />
            )}

            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              {isEyeVisible ? "1200" : "xxxx"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationCard1;
