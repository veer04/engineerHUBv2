import React, { useState } from "react";
import "./sociallinksprofile.css";
import SocialLinksModal from "./SocialLinksModal";

const SocialLinksProfile = ({ profileData, setProfileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialData, setSocialData] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
    cpLink: "",
  });

  const openModal = () => {
    const mappedSocialData = {
      linkedin:
        profileData?.socialMediaDetails.find((item) => item.type === "LinkedIn")
          ?.mediaLink || "",
      github:
        profileData?.socialMediaDetails.find((item) => item.type === "GitHub")
          ?.mediaLink || "",
      portfolio:
        profileData?.socialMediaDetails.find(
          (item) => item.type === "Portfolio"
        )?.mediaLink || "",
      cpLink:
        profileData?.socialMediaDetails.find((item) => item.type === "CP")
          ?.mediaLink || "",
    };
    setSocialData(mappedSocialData);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <SocialLinksModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={socialData}
        setProfileData={setProfileData}
      />

      <div className="social-links-main-div-edit" id="add-social-links">
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
              {profileData &&
              profileData.socialMediaDetails &&
              profileData.socialMediaDetails.length > 0 ? (
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

        {(!profileData ||
          (profileData.socialMediaDetails &&
            profileData.socialMediaDetails.length === 0)) && (
          <>
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
                  Add Linkedin Link
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
                  Add Github Link
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
          </>
        )}

        {profileData &&
          profileData?.socialMediaDetails?.map((social, index) => (
            <>
              <div key={social._id} className="linkedin-id-and-github">
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
                    {social.type}
                  </h3>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: "24px",
                      fontStyle: "normal",
                      color: "#547178",
                      marginBottom: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    {social.mediaLink || "Not Added the Link"}
                  </h3>
                </div>
                {/* <div className="linkedin-id-and-github-right">
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
                    {social.mediaLink}
                  </h3>
                </div> */}
              </div>

              {/* <div className="linkedin-id-and-github">
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
                    {social.mediaLink}
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
                    {social.mediaLink}
                  </h3>
                </div>
              </div> */}
            </>
          ))}
      </div>
    </>
  );
};

export default SocialLinksProfile;
