import React from "react";
import "./recommendedcard2.css";

const RecommendedCard2 = () => {
  return (
    <>
      <div className="recommendation-card-main2">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            color: "#002B36",

            width: "65px",
            height: "32px",
            padding: "4px 12px",
            gap: 3,
            borderRadius: 10,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h5 style={{ fontSize: "13px", marginTop: "10px" }}>4.5</h5>
          <img src={"/star.svg"} alt="" width={16} height={16} />
        </div>

        <div style={{ marginTop: 5 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Resume Building+Career Guidance | Referral for Job
          </h3>
        </div>

        <div className="call-duration-div">
          <div>
            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Call Duration
            </h3>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              30 mins
            </h4>
          </div>

          <div>
            <button
              style={{
                padding: 10,
                width: "130px",
                height: "40px",
                background: "white",
                border: "0",
                borderRadius: 8,
              }}
            >
              {" "}
              &#8377;399
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedCard2;
