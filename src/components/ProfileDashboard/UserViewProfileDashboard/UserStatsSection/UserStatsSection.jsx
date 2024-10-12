import React from "react";
import "./userstats.css";
import { ImStatsBars2 } from "react-icons/im";

const UserStatsSection = () => {
  return (
    <div className="main-user-stats-secttion">
      <div className="user-stats-title-section">
        <ImStatsBars2 />
        <h3
          style={{
            fontSize: 18,
            color: "#002B36",
            fontWeight: 700,
            lineHeight: "24px",
            marginBottom: 0,
          }}
        >
          Girish's Stats
        </h3>
      </div>

      <div className="jobs-events-projects-posts-div">
        <div className="jobs-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Jobs Applied
          </h3>
        </div>
        <div className="events-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Jobs Applied
          </h3>
        </div>
        <div className="projects-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Jobs Applied
          </h3>
        </div>
        <div className="posts-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Jobs Applied
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserStatsSection;
