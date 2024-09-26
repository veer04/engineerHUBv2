import React from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";
import ProfileCompletionSection from "./ProfileCompletionSection/ProfileCompletionSection";
import RecommendedSection from "./RecommendedSection/RecommendedSection";
import PerformanceSection from "./PerformanceSection/PerformanceSection";
import HostPageForProfileDashboard from "./HostpageForProfileDashboard/HostPageForProfileDashboard";

const ProfileDashboard = () => {
  return (
    <>
      <main>
        <div className="main-profile-dashboard-panel">
          <div className="main-profile-dashboard-left">
            <ProfileWithPostEditShare />
            <ProfileCompletionSection />

            <div style={{ marginTop: 20, borderRadius: 8 }}>
              <img
                style={{ borderRadius: 8 }}
                src="./rectangle-img.png"
                width={367}
                height={367}
                alt=""
              />
            </div>
          </div>

          <div className="main-profile-dashboard-right">
            <RecommendedSection />
            <div style={{ marginTop: 15 }}>
              <PerformanceSection />
            </div>

            <div style={{ marginTop: 15 }}>
              <HostPageForProfileDashboard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileDashboard;
