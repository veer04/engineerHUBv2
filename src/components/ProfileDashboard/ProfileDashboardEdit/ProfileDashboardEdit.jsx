import React, { useState } from "react";
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
import SuccessfullyUpdatedModal from "./ModalUpdatedAndDeleted/SuccessfullyUpdatedModal";
import DeleteModal from "./ModalUpdatedAndDeleted/DeleteModal";
import DeleteModalOK from "./ModalUpdatedAndDeleted/DeleteModalOk";

const ProfileDashboardEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOkModalDeleteOpen, setIsOkModalDeleteOpen] = useState(false);

  const openDeleteModal = () => {
    console.log("click");
    setIsModalDeleteOpen(true);
  };

  const openDeleteOkModal = () => {
    setIsOkModalDeleteOpen(true);
  };

  const closeOkDeleteModal = () => {
    setIsOkModalDeleteOpen(false);
  };

  const closeDeleteModal = () => setIsModalDeleteOpen(false);

  const openModal = () => {
    console.log("click");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <SuccessfullyUpdatedModal
        isOpenSuccess={isModalOpen}
        onClose={closeModal}
      />

      <DeleteModal
        isOpenDeleted={isModalDeleteOpen}
        onClose={closeDeleteModal}
      />

      <DeleteModalOK
        isOpenDeleted={isOkModalDeleteOpen}
        onClose={closeOkDeleteModal}
      />

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

          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={openModal}>Open Success Modal</button>
            <button onClick={openDeleteModal}>Open Delete Modal</button>
            <button onClick={openDeleteOkModal}>Open Ok Delete Modal</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileDashboardEdit;
