import React from "react";
import "./profiledashboardedit.css";
import ProfileAddSectionLeft from "./ProfileAddSectionLeft/ProfileAddSectionLeft";
import ProfileCompletionEditSection from "./profileCompletionEditSection/ProfileCompletionEditSection";
import ProfileInformationEdit from "./ProfileInformationEdit/ProfileInformationEdit";
import SocialLinksProfile from "./SocialLinksProfile/SocialLinksProfile";
import UploadResumeEdit from "./UploadResumeEdit/UploadResumeEdit";
import AddHeadlineEdit from "./AddHeadlineEdit/AddHeadlineEdit";
import AddAboutEdit from "./AddAboutEdit/AddAboutEdit";
import AddExperienceEdit from "./AddExperienceEdit/AddExperienceEdit";
import AddProjectsEdit from "./AddProjectsEdit/AddProjectsEdit";
import AddAchievements from "./AddAchievementsEdit/AddAchievements";
import AddCertifications from "./AddCertifications/AddCertifications";

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
        <UploadResumeEdit />
        <AddHeadlineEdit />
        <AddAboutEdit />
        <AddExperienceEdit />
        <AddProjectsEdit />
        <AddAchievements />
        <AddCertifications />
      </div>
    </main>
  );
};

export default ProfileDashboardEdit;
