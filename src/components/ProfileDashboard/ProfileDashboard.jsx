import React, { useEffect, useState } from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";
import ProfileCompletionSection from "./ProfileCompletionSection/ProfileCompletionSection";
import RecommendedSection from "./RecommendedSection/RecommendedSection";
import PerformanceSection from "./PerformanceSection/PerformanceSection";
import HostPageForProfileDashboard from "./HostpageForProfileDashboard/HostPageForProfileDashboard";
import YourActivitySection from "./YourActivitySection/YourActivitySection";
import ProfileWithFollowAndMail from "./UserViewProfileDashboard/ProfileWithFollowAndMail/ProfileWithFollowAndMail";

const ProfileDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main>
        <div className="main-profile-dashboard-panel">
          <div className="main-profile-dashboard-left">
            <ProfileWithPostEditShare />
            <div style={{ marginTop: 20 }}>
              <ProfileWithFollowAndMail />
            </div>
            <ProfileCompletionSection />

            {!isMobile && (
              <div style={{ marginTop: 20, borderRadius: 8 }}>
                <img
                  style={{ borderRadius: 8 }}
                  src="./rectangle-img.png"
                  width={367}
                  height={367}
                  alt=""
                />
              </div>
            )}
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

        {isMobile && (
          <div
            style={{
              marginTop: -20,
              padding: "10px",
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <img
              style={{ borderRadius: 8 }}
              src="./rectangle-img.png"
              width={367}
              height={367}
              alt=""
            />
          </div>
        )}
      </main>
    </>
  );
};

export default ProfileDashboard;
