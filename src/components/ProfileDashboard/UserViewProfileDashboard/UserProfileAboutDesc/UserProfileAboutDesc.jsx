import React from "react";
import "./userprofileaboutdesc.css";

const UserProfileAboutDesc = ({ DashboardAdminData }) => {
  return (
    <div className="user-profile-about-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
        }}
      >
        About
      </h3>

      <p
        style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
          color: "#547178",
          marginBottom: 0,
        }}
      >
        {(DashboardAdminData && DashboardAdminData.bio) || "No Bio Added."}
      </p>
    </div>
  );
};

export default UserProfileAboutDesc;
