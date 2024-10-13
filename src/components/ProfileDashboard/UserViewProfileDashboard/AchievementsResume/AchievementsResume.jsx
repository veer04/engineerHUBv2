import React from "react";
import "./achievementsresume.css";

const AchievementsResume = () => {
  return (
    <div className="achievements-resume-main">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Achievements
      </h3>

      <div style={{ marginTop: 10 }}>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Rank 4 at Product Hunt by IIMB
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
          Result-oriented and confident professional with over 3 years of
          hands-on experience in PHP, CakePHP, and Laravel frameworks. My aim is
          to leverage my technical expertise and strong problem-solving skills
          to contribute effectively to a dynamic organization.
        </h3>
      </div>
    </div>
  );
};

export default AchievementsResume;
