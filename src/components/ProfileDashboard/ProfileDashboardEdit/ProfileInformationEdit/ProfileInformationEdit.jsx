import React from "react";
import "./profileinformationedit.css";
import PersonalInformationModal from "./PersonalInformationModal";

const ProfileInformationEdit = () => {
  return (
    <>
      <PersonalInformationModal />
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
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "20px",
                  marginBottom: 0,
                  color: "#547178",
                }}
              >
                Add a summary of your resume to introduce yourself to recruiters
              </h4>
            </div>

            <div className="personal-i-right">
              <h3
                data-bs-toggle="modal"
                data-bs-target="#personalInformationModal"
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
              Add your name
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
              Add your DOB
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
              Add your Email
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
              Add your Mobile Number
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformationEdit;
