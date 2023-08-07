import React from "react";
import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import {
  patchClubData,
  patchOrganizationData,
  patchProfilePicture,
} from "../../../../services/APIConfig";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";
import ImageCarousel2 from "../../../../components/ImageCarousel2/ImageCarousel2";
import ClubCoverPhoto from "../../../../components/ClubCoverPhoto/ClubCoverPhoto";
import { useRef } from "react";

export default function CoverPhotoClubData() {
  const { clubId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const [newWebsiteURL, setNewWebsiteURL] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [errors, setErrors] = useState({
    image: "",
    website: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileResponse, setProfileResponse] = useState(null);
  const [response, setResponse] = useState(null);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const fileInput = useRef(null);

  const validateInput = () => {
    let valid = true;
    const newErrors = {
      image: "",
      website: "",
      description: "",
    };
    if (newImage === undefined || newImage === null || newImage === "") {
      newErrors.image = "Image is required";
      valid = false;
    }
    // if (!newWebsiteURL) {
    //   newErrors.website = "Website URL is required";
    //   valid = false;
    // }
    // if (!newDescription) {
    //   newErrors.description = "Description is required";
    //   valid = false;
    // }
    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    console.log(profileResponse);
    if (profileResponse) {
      if (profileResponse.status >= 200 && profileResponse.status < 300) {
        setIsUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Profile picture updated successfully!",
        });
      } else {
        setIsUpdating(false);
        alert(profileResponse.message);
      }
    }
  }, [profileResponse]);

  // useEffect(() => {
  //   console.log(response);
  //   if (response) {
  //     if (response.status >= 200 && response.status < 300) {
  //       setIsUpdating(false);
  //       setOpen(true);
  //       setSnackbarValues({
  //         severity: "success",
  //         message: "Data updated successfully!",
  //       });
  //     } else {
  //       setIsUpdating(false);
  //       alert(response.message);
  //     }
  //   }
  // }, [response]);

  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const file = new FormData();
      file.append("profileImage", newImage);

      const data = {
        description: newDescription,
        websiteUrl: newWebsiteURL,
      };

      patchProfilePicture(clubId, file, setProfileResponse);
      // patchClubData(clubId, data, setResponse);
    } else {
      setIsUpdating(false);
    }
  };

  const [newCoverPhotos, setNewCoverPhotos] = useState([]);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);

  return (
    <>
      <p>Change Cover Photos</p>
      <div className="profile-picture-container cover-photo-container">
        <input
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            setNewCoverPhotos((prev) => [...prev, e.target.files[0]]);
          }}
          ref={fileInput}
        />
        {profile?.clubPhoto.map((photo, index) => {
          return <ClubCoverPhoto key={index} index={index} imageUrl={photo} />;
        })}
        {newCoverPhotos.map((photo, index) => {
          return (
            <ClubCoverPhoto
              addOption
              index={profile?.clubPhoto.length + index}
              key={index}
              imageUrl={photo}
            />
          );
        })}
        <div
          onClick={() => {
            fileInput.current.click();
          }}
          className="cover-photo-edit-container add-option"
        >
          +
        </div>
      </div>
      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
        />
      )}
    </>
  );
}
