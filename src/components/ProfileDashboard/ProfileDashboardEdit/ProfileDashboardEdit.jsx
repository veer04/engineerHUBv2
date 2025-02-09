import React, { useEffect, useState } from "react";
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
import { getUserId } from "../../../features/User/UserDetails";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import AddSkill from "./AddSkill/AddSkill";
import { getAccessToken } from "../../../features/getCookieValues";
import { useQuery } from "@tanstack/react-query";
import {
  getUserProfileById,
  getUserProfileByIdPrivate,
} from "../../../services/APIConfig";

const ProfileDashboardEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOkModalDeleteOpen, setIsOkModalDeleteOpen] = useState(false);
  const userId = getUserId();
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
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const [profileData, setProfileData] = useState(null);
  const [privateDashboardData, setPrivateDashboardData] = useState(null);
  const [fetchResponse, setFetchResponse] = useState({});

  function fetchData() {
    const token = getAccessToken();

    if (userId !== getUserId()) {
      getUserProfileById(setProfileData, userId, setFetchResponse);
    } else {
      getUserProfileByIdPrivate(setProfileData, token, setFetchResponse);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  // if (profileDataQuery.isSuccess) {
  //   console.log(profileDataQuery.data, "kjhgf");
  // }

  // const getProfileData = async () => {
  //   const userId = getUserId();

  //   try {
  //     console.log("Fetching profile data...");
  //     const response = await axios.get(
  //       `${API_URL}api/v1/getUserWithId/${userId}`
  //     );

  //     if (response.status === 200) {
  //       console.log("Profile data retrieved successfully:", response.data);

  //       const data = response.data;
  //       setProfileData(data.data);
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error fetching profile data:",
  //       error.response || error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getProfileData();
  // }, []);

  const getPrivateDashboardData = async () => {
    try {
      console.log("Fetching Public data...");
      const config = {
        accessToken: getAccessToken(),
      };
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/private`,

        {
          headers: config,
        }
      );

      if (response.status === 200) {
        console.log("Public data retrieved successfully:", response.data);

        const data = response.data;
        setPrivateDashboardData(data.data.profileStatus);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error(
        "Error fetching Public data:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    getPrivateDashboardData();
  }, []);
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
          <ProfileAddSectionLeft
            profileData={profileData}
            setProfileData={setProfileData}
          />

          <ProfileCompletionEditSection
            privateDashboardData={privateDashboardData}
          />
        </div>
        <div className="profile-dashboard-edit-right-div">
          <ProfileInformationEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <SocialLinksProfile
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <UploadResumeEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />

          <AddSkill profileData={profileData} setProfileData={setProfileData} />

          <AddHeadlineEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <AddAboutEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <AddExperienceEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />

          <AddProjectsEdit
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <AddAchievements
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <AddCertifications
            profileData={profileData}
            setProfileData={setProfileData}
          />
          {/* <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={openModal}>Open Success Modal</button>
            <button onClick={openDeleteModal}>Open Delete Modal</button>
            <button onClick={openDeleteOkModal}>Open Ok Delete Modal</button>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default ProfileDashboardEdit;
