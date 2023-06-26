import React from "react";
import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import defaultPoster from "../../../../assets/defaultPoster";
import { TextField } from "@mui/material";
import {
  patchOrganizationData,
  patchProfilePicture,
} from "../../../../services/APIConfig";
import { set } from "react-hook-form";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function EditOrganizationData() {
  const { organizationId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const [newWebsiteURL, setNewWebsiteURL] = useState("");
  const [errors, setErrors] = useState({
    image: "",
    website: "",
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
    };
    if (newImage === undefined || newImage === null || newImage === "") {
      newErrors.image = "Image is required";
      valid = false;
    }
    // if (!newWebsiteURL) {
    //   newErrors.website = "Website URL is required";
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
        alert(profileResponse.data.message);
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
  //       alert(response.data.message);
  //     }
  //   }
  // }, [response]);

  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const file = new FormData();
      file.append("profileImage", newImage);

      const data = {
        country: profile.country,
        state: profile.state,
        city: profile.city,
        websiteURL: newWebsiteURL,
      };

      patchProfilePicture(organizationId, file, setProfileResponse);
      // patchOrganizationData(organizationId, data, setResponse);
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
      {/* <TextField
        name="websiteURL"
        label="Website URL"
        variant="outlined"
        value={newWebsiteURL}
        onChange={(e) => setNewWebsiteURL(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.website}
        helperText={errors.website}
      /> */}

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
