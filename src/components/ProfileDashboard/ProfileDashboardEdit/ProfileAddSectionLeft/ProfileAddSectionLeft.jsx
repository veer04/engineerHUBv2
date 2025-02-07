import React, { useEffect, useRef, useState } from "react";
import "./profileaddsectionleft.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getUserId } from "../../../../features/User/UserDetails";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { patchProfilePicture } from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";

const ProfileAddSectionLeft = ({ profileData, setProfileData }) => {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(profileData?.image || null);
  const [newImage, setNewImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // console.log(profileData.image);

  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);

        const file = new FormData();
        file.append("profileImage", newImage);

        patchProfilePicture(getUserId(), file, (response) => {
          setIsImageLoading(false);
          if (response?.status === 200) {
            toast("🥳 Profile has been Updated Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });

            const imageUrl =
              response.data.imageUrl || URL.createObjectURL(newImage);
            setProfilePhoto(imageUrl);

            setProfileData((prevProfileData) => ({
              ...prevProfileData,
              image: imageUrl,
            }));
          } else {
            toast.error("Failed to upload profile photo.");
            console.error("Upload error:", response);
          }
        });

        setNewImage(null);
      } else {
        toast.error("Please choose an image file only.");
        setNewImage(null);
      }
    }
  }, [newImage, setProfileData]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  return (
    <div className="profile-add-section-main">
      <div className="image-section">
        {!profileData || isImageLoading ? (
          <div className="loader-main-div">
            <span class="loader-new"></span>
          </div>
        ) : (
          <img
            src={(profileData && profileData?.image) || "/g2.svg"}
            className="g2-img-left"
            alt="Profile"
            width={100}
            height={100}
          />
        )}
        <div onClick={handleUploadClick}>
          <img
            src={`${Bucket_URL}UserViewDashboard/add-circle.svg`}
            className="add-circle"
            alt="Upload Profile"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
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

      <h2
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "22px",
          color: "#002B36",
        }}
      >
        {profileData?.aboutMe
          ? profileData.aboutMe
          : profileData?.educationDetails?.some((edu) => {
              const currentDate = new Date();
              const graduationDate = new Date(edu.endYear, edu.endMonth - 1);
              return currentDate < graduationDate;
            })
          ? "Student"
          : "Alma"}
      </h2>

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
