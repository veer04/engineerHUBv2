import React from "react";
import "./userprofileaboutdesc.css";

const UserProfileAboutDesc = () => {
  return (
    <div className="user-profile-about-main-div">
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
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
        Result-oriented and confident professional with over 3 years of hands-on
        experience in PHP, CakePHP, and Laravel frameworks. My aim is to
        leverage my technical expertise and strong problem-solving skills to
        contribute effectively to a dynamic organization.
      </p>
    </div>
  );
};

export default UserProfileAboutDesc;
