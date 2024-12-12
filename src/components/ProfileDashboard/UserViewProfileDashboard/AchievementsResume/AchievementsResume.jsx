import React from "react";
import "./achievementsresume.css";

const AchievementsResume = ({ DashboardAdminData }) => {
  return (
    <div className="achievements-resume-main">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Achievements
      </h3>

      {DashboardAdminData &&
        DashboardAdminData.achievementDetails.map((achieve, index) => (
          <>
            <div style={{ marginTop: 10 }}>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                {achieve.achievementName}
              </h4>

              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "#547178",
                  marginBottom: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {achieve.description}
              </h3>
            </div>

            {index !== DashboardAdminData.achievementDetails.length - 1 && (
              <div
                style={{
                  height: "2px",
                  background: "#D1D1D1",
                  borderRadius: "26px",
                  margin: "12px 0px",
                  alignSelf: "stretch",
                }}
              ></div>
            )}
          </>
        ))}
    </div>
  );
};

export default AchievementsResume;
