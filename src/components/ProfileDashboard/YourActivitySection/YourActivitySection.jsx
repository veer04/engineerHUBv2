import React, { useState } from "react";
import "./youractivitysection.css";
import { GoStopwatch } from "react-icons/go";
import ActivityCardsSaif from "./ActivityCardsSaif";
import PostCardActivity from "./PostCardActivity/PostCardActivity";
import RecommendationCard2Activity from "../RecommendedSection/RecommendationCard2Activity";

const YourActivitySection = ({
  streakData,
  jobData,
  internshipData,
  postData,
}) => {
  const [actionButton, setActionButton] = useState("Posts");

  const handleButtonClick = (buttonName) => {
    setActionButton(actionButton === buttonName ? null : buttonName);
  };

  console.log(jobData, "jobData");

  const activityCardArray = Array.from({ length: 12 }, (_, index) => index + 1);

  // const postCardActivityArray = Array.from(
  //   { length: 7 },
  //   (_, index) => index + 1
  // );

  return (
    <div className="your-activity-section-main">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <GoStopwatch size={18} />
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Activities
        </h3>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        {["Posts", "Jobs", "Internships"].map((buttonName, index) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            style={{
              padding: "4px 16px",
              borderRadius: "10px",
              background: actionButton === buttonName ? "#138382" : "#f2f4f5",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: actionButton === buttonName ? "white" : "black",
              border: "none",
              // marginLeft: index === 0 ? 0 : 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>

      {/* {actionButton === "Streak" && (
        <>
          <div className="grid-activity-section">
            {activityCardArray.map((card, index) => (
              <ActivityCardsSaif key={card} />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Latest Streak : 5 days
            </h3>

            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#002B36",
                }}
              >
                Less
              </span>
              <div
                style={{
                  width: "12.79px",
                  height: "12.79px",
                  background: "#39D3531A",
                  borderRadius: "3.2px",
                  flexShrink: 0,
                }}
              ></div>
              <div
                style={{
                  width: "12.79px",
                  height: "12.79px",
                  background: "#39D35380",
                  borderRadius: "3.2px",
                  flexShrink: 0,
                }}
              ></div>
              <div
                style={{
                  width: "12.79px",
                  height: "12.79px",
                  background: "#39D353",
                  borderRadius: "3.2px",
                  flexShrink: 0,
                }}
              ></div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#002B36",
                }}
              >
                More
              </span>
            </div>
          </div>
        </>
      )} */}

      {actionButton === "Posts" && (
        <>
          {postData && postData?.length > 0 ? (
            <div className="grid-post-card-activity">
              <PostCardActivity data={postData} />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <p style={{ margin: 0 }}>No Posts Added!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Jobs" && (
        <>
          {jobData && jobData?.length > 0 ? (
            <div className="grid-job-card-activity">
              <RecommendationCard2Activity data={jobData} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "30vh",
                padding: "20px",
              }}
            >
              <p style={{ margin: 0 }}>No Jobs Hosted!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Internships" && (
        <>
          {internshipData && internshipData?.length > 0 ? (
            <div className="grid-job-card-activity">
              <RecommendationCard2Activity data={internshipData} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "30vh",
                padding: "20px",
              }}
            >
              <p style={{ margin: 0 }}>No Internships Hosted!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourActivitySection;
