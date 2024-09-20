import React from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";

const ProfileDashboard = () => {
  return (
    <>
      <main>
        <div className="main-profile-dashboard-panel">
          <div className="main-profile-dashboard-left">
            <ProfileWithPostEditShare />
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
