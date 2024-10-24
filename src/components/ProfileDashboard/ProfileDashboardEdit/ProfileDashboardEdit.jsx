import React from "react";
import "./profiledashboardedit.css";
import ProfileAddSectionLeft from "./ProfileAddSectionLeft/ProfileAddSectionLeft";
import ProfileCompletionEditSection from "./profileCompletionEditSection/ProfileCompletionEditSection";
import ProfileInformationEdit from "./ProfileInformationEdit/ProfileInformationEdit";
import SocialLinksProfile from "./SocialLinksProfile/SocialLinksProfile";

const ProfileDashboardEdit = () => {
  return (
    <main className="profile-dashboard-edit-start-div">
      <div className="profile-dashboard-edit-left-div">
        <ProfileAddSectionLeft />

        <ProfileCompletionEditSection />
      </div>
      <div className="profile-dashboard-edit-right-div">
        <ProfileInformationEdit />
        <SocialLinksProfile />
      </div>
    </main>
  );
};

export default ProfileDashboardEdit;
