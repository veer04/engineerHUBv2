import React, { useEffect, useRef, useState } from "react";
import "./profileaddsectionleft.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getUserId, getUserFullName } from "../../../../features/User/UserDetails";
import { getInitials, isCustomProfileImage } from "../../../../features/User/avatarUtils";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { patchProfilePicture } from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import Cookies from "js-cookie";
import { MdAddAPhoto } from "react-icons/md";

const ProfileAddSectionLeft = ({ profileData, setProfileData }) => {
  const DEFAULT_PROFILE_IMAGE =
    "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/banners/Student.png";
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(profileData?.image || null);
  const [newImage, setNewImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const fullName = profileData
    ? `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim()
    : getUserFullName();
  const profileInitials = getInitials(fullName);

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

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
            Cookies.set("image", imageUrl, { expires: 400 });
            window.dispatchEvent(new Event("user-image-updated"));

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
            <span className="loader-new"></span>
          </div>
        ) : isCustomProfileImage(profileData?.image || profilePhoto) && !imageBroken ? (
          <img
            src={profileData?.image || profilePhoto}
            className="g2-img-left"
            alt="Profile"
            width={100}
            height={100}
            onError={() => setImageBroken(true)}
          />
        ) : (
          <div
            className="g2-img-left-initials-fallback"
            role="img"
            aria-label="Profile Initials"
          >
            {profileInitials}
          </div>
        )}
        <div
          onClick={handleUploadClick}
          className="add-circle-btn"
          role="button"
          aria-label="Upload Profile"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleUploadClick();
            }
          }}
        >
          <MdAddAPhoto className="add-circle-icon" />
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
        {userRole}
      </h2>

      <h3
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          color: "#002B36",
        }}
      >
        {profileData?.aboutMe ? `${profileData?.aboutMe}` : "Your Designation"}
      </h3>
    </div>
  );
};

export default ProfileAddSectionLeft;
