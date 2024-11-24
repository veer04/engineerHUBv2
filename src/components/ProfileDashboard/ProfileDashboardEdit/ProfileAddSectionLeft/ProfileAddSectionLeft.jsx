import React, { useEffect, useState } from "react";
import "./profileaddsectionleft.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getUserId } from "../../../../features/User/UserDetails";
import axios from "axios";

const ProfileAddSectionLeft = ({ profileData }) => {
  return (
    <div className="profile-add-section-main">
      <div className="image-section">
        <img
          src={profileData ? profileData.image : "/g2.svg"}
          className="g2-img-left"
          alt="g2_img"
          width={100}
          height={100}
        />
        <img
          src={`${Bucket_URL}UserViewDashboard/add-circle.svg`}
          className="add-circle"
          alt="g2_img"
        />
      </div>

      <h3
        style={{
          marginTop: 10,
          fontWeight: 600,
          fontSize: 24,
          lineHeight: "28px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        {profileData
          ? `${profileData.firstName} ${profileData.lastName}`
          : "Your Name"}
      </h3>

      <h3
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          color: "#002B36",
        }}
      >
        {profileData
          ? `${profileData.aboutMe}`
          : "Associate Software engineer at company name"}
      </h3>
    </div>
  );
};

export default ProfileAddSectionLeft;
