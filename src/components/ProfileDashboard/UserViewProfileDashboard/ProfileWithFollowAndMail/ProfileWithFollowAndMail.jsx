import React, { useState } from "react";
import "./profilewithfollowandmail.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import { FaThumbsUp } from "react-icons/fa";

const ProfileWithFollowAndMail = ({ DashboardAdminData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFollowActive, setFollowActive] = useState(false);
  const [isMailActive, setMailActive] = useState(false);

  const handleFollowClick = () => {
    setFollowActive(!isFollowActive);
  };

  const handleMailClick = () => {
    setMailActive(!isMailActive);
  };

  const handleThumbsUpClick = () => {
    setIsLiked(true);
    setLikeCount(likeCount + 1);
  };

  return (
    <div className="main-profile-with-follow-and-mail">
      <div className="img-share-div">
        <img
          src={(DashboardAdminData && DashboardAdminData.image) || "/g2.svg"}
          className="g2-img"
          alt="g2_img"
        />

        <div>
          <div onClick={handleThumbsUpClick} className="img-thumbsup-div">
            {isLiked ? (
              <FaThumbsUp
                className="thumbs-up-icon animate"
                color="#128381"
                size={22}
              />
            ) : (
              <FaRegThumbsUp
                className="thumbs-up-icon animate"
                color="#128381"
                size={22}
              />
            )}
          </div>
          <h4
            style={{
              fontSize: 12,
              marginTop: 5,
              color: "white",
              fontWeight: 400,
              marginLeft: 3,
            }}
          >
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </h4>
        </div>
      </div>

      <div className="name-desc-div">
        <h3 className="g-3-text">{`${
          DashboardAdminData && DashboardAdminData?.firstName
        } ${DashboardAdminData?.lastName}`}</h3>
        <h2
          style={{
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "22px",
            color: "#f3f3f3",
          }}
        >
          Associate Software engineer at company name
        </h2>
      </div>

      {DashboardAdminData && DashboardAdminData.educationDetails.length > 0 && (
        <div style={{ marginTop: 10 }} className="icon-div">
          <div>
            <FaGraduationCap size={22} color="white" />
          </div>
          <div>
            <h3
              style={{
                fontWeight: 400,
                fontSize: 14,

                lineHeight: "22px",
                color: "#f3f3f3",
                marginBottom: 0,
              }}
            >
              {DashboardAdminData.educationDetails[0].collegeId.collegeName ||
                " Ajay Kumar Garg Engineering College"}
            </h3>
          </div>
        </div>
      )}

      {DashboardAdminData &&
        DashboardAdminData.experienceDetails.length > 0 && (
          <div style={{ marginTop: 5 }} className="icon-div">
            <div>
              <HiOutlineBuildingOffice2 size={22} color="white" />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: 14,

                  lineHeight: "22px",
                  color: "#f3f3f3",
                  marginBottom: 0,
                }}
              >
                {DashboardAdminData.experienceDetails[0].organisationName ||
                  "engineerHub"}
              </h3>
            </div>
          </div>
        )}

      <div className="btn-siv-edit-post-share">
        <button
          onClick={handleFollowClick}
          className={isFollowActive ? "btn-active" : "btn-default"}
        >
          {isFollowActive ? "Following" : "Follow"}
        </button>
        <button
          onClick={handleMailClick}
          className={isMailActive ? "btn-active" : "btn-default"}
        >
          {isMailActive ? "Mailing" : "Mail"}
        </button>
      </div>

      <div className="score-update-view">
        <div
          style={{
            display: "flex ",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 16,
                marginLeft: 4,
                marginBottom: 0,
                fontWeight: 600,
              }}
            >
              Resume
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#F7D77F",
              padding: "4px 6px",
              borderRadius: 8,
            }}
          >
            <h3 style={{ fontSize: 12, marginBottom: 0, fontWeight: 500 }}>
              ATS Score: 80%
            </h3>
          </div>
          <div className="update-view-trash-download">
            <div className="update-view-btn">
              <button>View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWithFollowAndMail;
