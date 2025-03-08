import React, { useState } from "react";
import "./newcompanydashboardheader.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CoverImageModal from "../../../../components/Dashboard/CoverImageModal";
const NewCompanyDashboardHeader = ({ isUserAdmin, organization }) => {
  const navigate = useNavigate();
  const [showCoverImageModal, setShowCoverImageModal] = useState(false);

  return (
    <div className="main-div-header-company-dashboard">
      <div className="banner-div-main">
        {organization?.imagePoster && (
          <img src={organization?.imagePoster} alt="banner_img" />
        )}

        {!organization?.imagePoster && (
          <img
            src={`${Bucket_URL}newcompanydashboard/new-company-banner.png`}
            alt="banner_img"
          />
        )}

        {isUserAdmin && (
          <button
            onClick={() => navigate("edit-cover-image")}
            // onClick={() => setShowCoverImageModal(true)}
            className="edit-btn-main"
          >
            <FiEdit />
          </button>
        )}

        {/* {showCoverImageModal && (
          <CoverImageModal  />
        )} */}
      </div>

      <div className="header-content-section">
        <div className="logo-and-social-section">
          {organization?.image && (
            <img
              src={
                organization?.image ||
                `${Bucket_URL}newcompanydashboard/image.png`
              }
              className="logo-main-image"
              alt="banner_img"
            />
          )}

          {!organization?.image && (
            <img
              src={`${Bucket_URL}newcompanydashboard/image.png`}
              className=""
              alt="banner_img"
            />
          )}

          <div className="social-icon-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_3251_34119)">
                <path
                  d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
                  fill="#719BA5"
                />
                <path
                  d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
                  fill="#719BA5"
                />
                <path
                  d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z"
                  fill="#719BA5"
                />
              </g>
              <defs>
                <clipPath id="clip0_3251_34119">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_3251_34120)">
                <path
                  d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                  fill="#719BA5"
                />
              </g>
              <defs>
                <clipPath id="clip0_3251_34120">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.3263 1.90393H21.6998L14.3297 10.3274L23 21.7899H16.2112L10.894 14.838L4.80995 21.7899H1.43443L9.31743 12.78L1 1.90393H7.96111L12.7674 8.25826L18.3263 1.90393ZM17.1423 19.7707H19.0116L6.94539 3.81706H4.93946L17.1423 19.7707Z"
                fill="#719BA5"
              />
            </svg>
          </div>
        </div>

        <div className="detail-content-section">
          <div className="content-and-edit-post-main">
            <div>
              <h4
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: "32px",
                  color: "#002B36",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {organization?.name || "engineerHUB"}
              </h4>

              <h5
                className="text-crop-1 overflow-hidden"
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#002B36",
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                {organization?.subHeading ? (
                  organization?.subHeading
                ) : (
                  <i
                    style={{ color: "grey" }}
                    className="text-crop-1 overflow-hidden"
                  >
                    Subheading not available
                  </i>
                )}
              </h5>

              {organization?.organisationType ? (
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#547178",
                      marginBottom: 0,
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {organization?.organisationType}
                  </h4>
                  <div
                    style={{
                      width: "1.4px",
                      height: "14px",
                      background: "#547178",
                      color: "#002B36",
                    }}
                  ></div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#547178",
                      marginBottom: 0,
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {organization?.country}
                  </h4>
                </div>
              ) : (
                <i
                  style={{ color: "grey" }}
                  className="text-crop-1 overflow-hidden"
                >
                  Organization type not available
                </i>
              )}
            </div>

            <div className="main-edit-create-post-btn">
              <div>
                <button
                  onClick={() => navigate("edit-profile")}
                  className="edit-btn"
                >
                  Edit Profile
                </button>
              </div>
              <div>
                <button
                  className="create-post"
                  onClick={() => navigate("/host")}
                >
                  <span style={{ marginBottom: 2 }}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M7.5 1V13M13.5 7H1.5"
                        stroke="#138382"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Create Post
                </button>
              </div>
            </div>
          </div>
          {organization?.aboutUs && (
            <p
              className="more-about-sect"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "20px",
                color: "#002B36",
                marginBottom: 0,
                fontFamily: "'Lato', sans-serif",
              }}
            >
              {organization?.aboutUs ||
                `Community | Campus | Company. engineerHUB is one stop solution for
            engineers ! A platform to learn in community, explore campuses & get
            placed in dream companies.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCompanyDashboardHeader;
