import React from "react";
import "./profiledashboardedit.css";
import ProfileAddSectionLeft from "./ProfileAddSectionLeft/ProfileAddSectionLeft";
import ProfileCompletionEditSection from "./profileCompletionEditSection/ProfileCompletionEditSection";
import ProfileInformationEdit from "./ProfileInformationEdit/ProfileInformationEdit";

const ProfileDashboardEdit = () => {
  return (
    <main className="profile-dashboard-edit-start-div">
      <div className="profile-dashboard-edit-left-div">
        <ProfileAddSectionLeft />

        <ProfileCompletionEditSection />
      </div>
      <div className="profile-dashboard-edit-right-div">
        <ProfileInformationEdit />
      </div>
    </main>
  );
};

export default ProfileDashboardEdit;
