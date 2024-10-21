import React from "react";
import "./profileaddsectionleft.css";
import { Bucket_URL } from "../../../../services/APIUtils";

const ProfileAddSectionLeft = () => {
  return (
    <div className="profile-add-section-main">
      <div className="image-section">
        <img src="/g2.svg" className="g2-img-left" alt="g2_img" />
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
        Girish Shedge
      </h3>

      <h3
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          color: "#002B36",
        }}
      >
        Associate Software engineer at company name
      </h3>
    </div>
  );
};

export default ProfileAddSectionLeft;
