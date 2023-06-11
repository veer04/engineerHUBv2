import React from "react";
import "./ClubProfilePage";
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

export default function EditClubData() {
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
    if (!newWebsiteURL) {
      newErrors.website = "Website URL is required";
      valid = false;
    }
    if (!newDescription) {
      newErrors.description = "Description is required";
      valid = false;
    }
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

  useEffect(() => {
    console.log(response);
    if (response) {
      if (response.status >= 200 && response.status < 300) {
        setIsUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Data updated successfully!",
        });
      } else {
        setIsUpdating(false);
        alert(response.message);
      }
    }
  }, [response]);

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
      patchClubData(clubId, data, setResponse);
    } else {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <p>Change Profile Picture</p>
      <div className="profile-picture-container">
        {/* <div
          style={{
            backgroundImage: `url(${
              newImage
                ? () => URL.createObjectURL(newImage)
                : profile.image
                ? profile.image
                : defaultPoster
            })`,
          }}
          className="profile-picture"
        ></div> */}
        <input
          type="file"
          name="profile"
          id="student-profile-image"
          className="mb-4"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <p className="text-danger mb-1">{errors.image}</p>
      </div>
      <TextField
        name="websiteURL"
        label="Website URL"
        variant="outlined"
        value={newWebsiteURL}
        onChange={(e) => setNewWebsiteURL(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.website}
        helperText={errors.website}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description}
      />

      <div className="mt-3">
        <button
          className="logBtn me-3 logout-btn"
          style={{
            textAlign: "center",
          }}
          onClick={handleSubmit}
        >
          Update
        </button>
        {isUpdating && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
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
