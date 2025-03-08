import React, { useEffect, useState } from "react";
import "./profilecompletionscore.css";
import { getUserRole } from "../../../features/User/UserDetails";

const ProfileCompletionScoreComp = ({ privateDashboardData }) => {
  const [profileCompletion, setProfileCompletion] = useState(0);
  let role = getUserRole();

  useEffect(() => {
    if (privateDashboardData) {
      const {
        achievementDetails = 0,
        educationDetails = 0,
        experienceDetails = 0,
        licenceDetails = 0,
        projectDetails = 0,
        resume = 0,
        skillsDetails = 0,
        socialMediaDetails = 0,
      } = privateDashboardData;

      const totalCompletion =
        achievementDetails +
        educationDetails +
        experienceDetails +
        licenceDetails +
        projectDetails +
        resume +
        skillsDetails +
        socialMediaDetails;

      const totalFields = 8;

      const averageCompletion = totalCompletion / totalFields;

      setProfileCompletion(totalCompletion);
    }
  }, [privateDashboardData]);

  return (
    <div className="profile-completion-score-main-div">
      <div className="profile-completion-score-sub-div">
        <div>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              fontStyle: "normal",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            {profileCompletion < 70
              ? "Incomplete Profile"
              : "Congrats!! Profile Completed"}
          </h3>

          <h4
            style={{
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "16px",
              fontStyle: "normal",
              color: "#547178",
            }}
          >
            {role === "User"
              ? "Recruiters Notice you from 70%"
              : "Companies Notice you from 70%"}
          </h4>
        </div>

        <div>
          <h4
            style={{
              fontSize: 26,
              fontWeight: 600,
              lineHeight: "20px",
              fontStyle: "normal",
              color: profileCompletion > 70 ? "#08E045" : "#DA1E28",
              marginBottom: 0,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {profileCompletion ? `${profileCompletion.toFixed(1)} %` : "0 %"}
          </h4>
        </div>
      </div>

      <div className="progress-container-main">
        <div
          className="progress-bar-sub"
          style={{
            width: `${profileCompletion}%`,
            backgroundColor: profileCompletion > 70 ? "#08E045" : "#DA1E28",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProfileCompletionScoreComp;
