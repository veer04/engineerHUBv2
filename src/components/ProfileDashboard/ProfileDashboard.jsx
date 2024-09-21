import React from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";
import ProfileCompletionSection from "./ProfileCompletionSection/ProfileCompletionSection";

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
          <div
            style={{ border: "1px solid gray" }}
            className="main-profile-dashboard-right"
          >
            right bar
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileDashboard;
