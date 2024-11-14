import React, { useState } from "react";
import "./sociallinksprofile.css";
import SocialLinksModal from "./SocialLinksModal";

const SocialLinksProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <SocialLinksModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="social-links-main-div-edit">
        <div className="social-links-section">
          <div className="social-l-sub">
            <div className="social-l-left">
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: "24px",
                  marginBottom: 0,
                  color: "#002B36",
                }}
              >
                Social Links
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

            <div className="social-l-right">
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
            </div>
          </div>
        </div>

        <div className="linkedin-id-and-github">
          <div className="linkedin-id-and-github-left">
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
              Linkedin
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
              Add Username
            </h3>
          </div>
          <div className="linkedin-id-and-github-right">
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
              Github
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
              Add Username
            </h3>
          </div>
        </div>

        <div className="linkedin-id-and-github">
          <div className="linkedin-id-and-github-left">
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
              Portfolio
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
              Portfolio
            </h3>
          </div>
          <div className="linkedin-id-and-github-right">
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
              Profile Link
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
              Profile Link
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLinksProfile;
