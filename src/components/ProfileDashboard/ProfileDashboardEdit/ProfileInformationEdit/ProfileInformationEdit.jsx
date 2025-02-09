import React, { useEffect, useState } from "react";
import "./profileinformationedit.css";
import PersonalInformationModal from "./PersonalInformationModal";
import { getUserId } from "../../../../features/User/UserDetails";

import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import moment from "moment";

const ProfileInformationEdit = ({ profileData, setProfileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(profileData?.aboutMe, "aboutmain");

  const modalData = profileData
    ? {
        firstName: profileData?.firstName,
        lastName: profileData?.lastName,
        email: profileData?.email,
        mobile: profileData?.mobile,
        dateOfBirth: moment(profileData?.dateOfBirth).format("DD/MM/YYYY"),
        gender: profileData?.gender,
        aboutMe: profileData?.aboutMe,
      }
    : {};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <PersonalInformationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={modalData}
        setProfileData={setProfileData}
      />
      <div className="profile-information-edit-main">
        <div className="personal-information-section">
          <div className="personal-i-sub">
            <div className="personal-i-left">
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: "24px",
                  marginBottom: 0,
                  color: "#002B36",
                }}
              >
                Personal Information
              </h3>
              {!profileData && (
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    marginBottom: 0,
                    color: "#547178",
                  }}
                >
                  Add a summary of your resume to introduce yourself to
                  recruiters
                </h4>
              )}
            </div>

            <div className="personal-i-right">
              {profileData ? (
                <div onClick={openModal} style={{ cursor: "pointer" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M11.4106 4.48679L12.4619 3.43547C13.0425 2.85484 13.9839 2.85484 14.5645 3.43547C15.1451 4.0161 15.1451 4.95748 14.5645 5.53811L13.5132 6.58943M11.4106 4.48679L5.23517 10.6622C4.4512 11.4462 4.05919 11.8381 3.79228 12.3158C3.52535 12.7935 3.2568 13.9214 3 15C4.07857 14.7432 5.20649 14.4746 5.68417 14.2077C6.16184 13.9408 6.55383 13.5488 7.33781 12.7648L13.5132 6.58943M11.4106 4.48679L13.5132 6.58943"
                      stroke="#547178"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 15H12.75"
                      stroke="#547178"
                      stroke-width="1.2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              ) : (
                <h3
                  onClick={openModal}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: "24px",
                    marginBottom: 0,
                    color: "#138382",
                    cursor: "pointer",
                  }}
                >
                  Add
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="name-date-of-birth">
          <div className="name-date-of-birth-left">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              Full Name
            </h3>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              {profileData
                ? `${profileData.firstName} ${profileData.lastName}`
                : "Add your name"}
            </h3>
          </div>
          <div className="name-date-of-birth-right">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              Date of Birth
            </h3>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              {profileData
                ? moment(profileData.dateOfBirth).format("DD/MM/YYYY")
                : "Add your DOB"}
            </h3>
          </div>
        </div>

        <div className="name-date-of-birth">
          <div className="name-date-of-birth-left">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              Email
            </h3>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              {profileData ? `${profileData.email}` : "Add your email"}
            </h3>
          </div>
          <div className="name-date-of-birth-right">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              Mobile Number
            </h3>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                fontStyle: "normal",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              {profileData ? `${profileData.mobile}` : "Add your Mobile Number"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformationEdit;
