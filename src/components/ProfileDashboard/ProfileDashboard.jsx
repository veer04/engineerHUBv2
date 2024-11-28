import React, { useEffect, useState } from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";
import ProfileCompletionSection from "./ProfileCompletionSection/ProfileCompletionSection";
import RecommendedSection from "./RecommendedSection/RecommendedSection";
import PerformanceSection from "./PerformanceSection/PerformanceSection";
import HostPageForProfileDashboard from "./HostpageForProfileDashboard/HostPageForProfileDashboard";
import YourActivitySection from "./YourActivitySection/YourActivitySection";
import ProfileWithFollowAndMail from "./UserViewProfileDashboard/ProfileWithFollowAndMail/ProfileWithFollowAndMail";
import UserStatsSection from "./UserViewProfileDashboard/UserStatsSection/UserStatsSection";

const ProfileDashboard = () => {
  return (
    <>
      <main className="main-profile-dashboard">
        <div className="main-profile-dashboard-panel">
          <div className="main-profile-dashboard-left">
            <ProfileWithPostEditShare />
            <div style={{ marginTop: 20 }}>
              <ProfileCompletionSection />
            </div>
            <img
              className="profile-dashboard-rectangle-img-1"
              style={{ marginTop: 20, borderRadius: 8 }}
              src="./rectangle-img.png"
              alt="We are live poster"
            />
          </div>

          <div className="main-profile-dashboard-right">
            <RecommendedSection />
            <div style={{ marginTop: 15 }}>
              <PerformanceSection />
            </div>

            <div style={{ marginTop: 15 }}>
              <HostPageForProfileDashboard />
            </div>

            <div style={{ marginTop: 15 }}>
              <YourActivitySection />
            </div>
          </div>
        </div>

        <img
          style={{
            marginTop: 20,
            padding: "10px",
            borderRadius: 8,
            marginBottom: 20,
          }}
          className="profile-dashboard-rectangle-img-2"
          src="./rectangle-img.png"
          alt="We are live poster"
        />
      </main>
    </>
  );
};

export default ProfileDashboard;
