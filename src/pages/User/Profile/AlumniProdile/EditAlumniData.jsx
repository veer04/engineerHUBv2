import React from "react";
import "./AlumniProfilePage";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import defaultPoster from "../../../../assets/defaultPoster";
import { TextField } from "@mui/material";
import {
  patchAlumniData,
  patchProfilePicture,
} from "../../../../services/APIConfig";
import { set } from "react-hook-form";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function EditAlumniData() {
  const { alumniId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const [newCompany, setNewCompany] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newAboutMe, setNewAboutMe] = useState("");
  const [newBatch, setNewBatch] = useState("");
  const [errors, setErrors] = useState({
    image: "",
    company: "",
    designation: "",
    aboutMe: "",
    batch: "",
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
      company: "",
      designation: "",
      aboutMe: "",
      batch: "",
    };
    if (newImage === undefined || newImage === null || newImage === "") {
      newErrors.image = "Image is required";
      valid = false;
    }
    if (!newCompany) {
      newErrors.company = "Company is required";
      valid = false;
    }
    if (!newDesignation) {
      newErrors.designation = "Designation is required";
      valid = false;
    }
    if (!newAboutMe) {
      newErrors.aboutMe = "About Me is required";
      valid = false;
    }
    if (!newBatch) {
      newErrors.batch = "Batch is required";
      valid = false;
    } else if (
      !/^(19[6-9][0-9]|20[0-2][0-9]|2030)-(19[6-9][0-9]|20[0-2][0-9]|2030)\s*$/.test(
        newBatch
      )
    ) {
      newErrors.batch = "Batch must me like 2002-2004";
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
        alert(profileResponse.data.message);
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
        console.log(response);
        alert(response.data.message);
      }
    }
  }, [response]);

  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const file = new FormData();
      file.append("profileImage", newImage);

      const data = {
        companyName: newCompany,
        currentProfile: newDesignation,
        aboutMe: newAboutMe,
        batch: newBatch,
        socialMedia: profile.socialMedia,
      };
      patchProfilePicture(alumniId, file, setProfileResponse);
      patchAlumniData(alumniId, data, setResponse);
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
                ? URL.createObjectURL(newImage)
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
        <p className="text-danger my-1">{errors.image}</p>
      </div>
      <TextField
        name="batch"
        label="Batch"
        variant="outlined"
        value={newBatch}
        onChange={(e) => setNewBatch(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.batch}
        helperText={errors.batch}
      />
      <TextField
        name="company"
        label="Company"
        variant="outlined"
        value={newCompany}
        onChange={(e) => setNewCompany(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.company}
        helperText={errors.company}
      />
      <TextField
        name="designation"
        label="Designation"
        variant="outlined"
        value={newDesignation}
        onChange={(e) => setNewDesignation(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.designation}
        helperText={errors.designation}
      />
      <TextField
        name="about"
        label="About Me"
        variant="outlined"
        value={newAboutMe}
        onChange={(e) => setNewAboutMe(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={!!errors.aboutMe}
        helperText={errors.aboutMe}
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
