import React, { useState } from "react";
import "./profileCompletionEditSection.css";
import SocialLinksModal from "../SocialLinksProfile/SocialLinksModal";

const ProfileCompletionEditSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <SocialLinksModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="profile-completion-edit-main-section">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            fontStyle: "normal",
            color: "#002B36",
          }}
        >
          Profile Completion{" "}
        </h3>

        <div className="percentage-and-completed-section">
          <h3
            style={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: "20px",
              fontStyle: "normal",
              color: "#002B36",
              marginBottom: 0,
              // color: "#DA1E28",
              textAlign: "center",
              marginTop: 5,
            }}
          >
            43%
          </h3>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Profile Completed
            </h3>

            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                fontStyle: "normal",
                color: "#002B36",
              }}
            >
              Recruiters Notice you from 70%
            </h3>
          </div>
        </div>

        <div className="progress-container-main">
          <div className="progress-bar-sub" style={{ width: "40%" }}></div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Social Links
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div onClick={openModal}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Resume
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
              }}
            >
              Upload
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Personal Details
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Upload Picture
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
              }}
            >
              Upload
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Skills
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              About
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              10%
            </h4>
          </div>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
              }}
            >
              Upload
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCompletionEditSection;
