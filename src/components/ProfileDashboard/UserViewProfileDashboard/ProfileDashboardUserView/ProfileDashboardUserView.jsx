import React from "react";
import "./profiledashboarduserview.css";
import ProfileWithFollowAndMail from "../ProfileWithFollowAndMail/ProfileWithFollowAndMail";
import UserStatsSection from "../UserStatsSection/UserStatsSection";

const ProfileDashboardUserView = () => {
  return (
    <>
      <div className="profile-dashboard-user-view-main">
        <div className="left-profile-dashboard-user">
          <ProfileWithFollowAndMail />

          <div style={{ marginTop: 10 }}>
            <UserStatsSection />
          </div>
        </div>

        <div className="right-profile-dashboard-user">hello right</div>
      </div>
    </>
  );
};

export default ProfileDashboardUserView;
