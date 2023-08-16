import React from "react";
import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import defaultPoster from "../../../../assets/defaultPoster";
import { TextField } from "@mui/material";
import {
  patchAlumniData,
  patchResume,
  controller,
  patchProfilePicture,
  getAlumniProfileById,
} from "../../../../services/APIConfig";
import { set } from "react-hook-form";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function EditAlumniData() {
  const { alumniId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const[AlumniProfile , setAlumniProfile] = useState({});
  const [newResumeLink, setNewResumeLink] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [isResumeUpdating, setIsResumeUpdating] = useState(false);
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
  const [resumeRes, setResumeRes] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isResumeUpdated, setIsResumeUpdated] = useState(false);
  const [resumeErrors, setResumeErrors] = useState({
    resume: "",
  });
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
    // if (!newCompany) {
    //   newErrors.company = "Company is required";
    //   valid = false;
    // }
    // if (!newDesignation) {
    //   newErrors.designation = "Designation is required";
    //   valid = false;
    // }
    // if (!newAboutMe) {
    //   newErrors.aboutMe = "About Me is required";
    //   valid = false;
    // }
    // if (!newBatch) {
    //   newErrors.batch = "Batch is required";
    //   valid = false;
    // } else if (
    //   !/^(19[6-9][0-9]|20[0-4][0-9]|2050)-(19[6-9][0-9]|20[0-4][0-9]|2050)\s*$/.test(
    //     newBatch
    //   )
    // ) {
    //   newErrors.batch = "Batch must me like 2002-2004";
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

  const validateInputResume = () => {
    let valid = true;
    const newErrors = {
      resume: "",
    };
    if (resumeRes === undefined || resumeRes === null || resumeRes === "") {
      newErrors.resume = "Resume is required";
      valid = false;
    }
    setResumeErrors(newErrors);
    return valid;
  };
  useEffect(() => {
    getAlumniProfileById(setAlumniProfile, alumniId);
    return () => {
      controller.abort();
    };
  }, []);
  const handleResume = async () => {
    setIsResumeUpdating(true);
    if (validateInputResume() === true) {
      const file = new FormData();
      file.append("resume", resumeRes);
      patchResume(alumniId, file, setResumeRes);
    } else if (isResumeUpdating === true) {
      window.location.reload();
    } else {
      setIsResumeUpdating(false);
    }
  };
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
  //       console.log(response);
  //       alert(response.data.message);
  //     }
  //   }
  // }, [response]);
  useEffect(() => {
    if (!!response) {
      if (response.status >= 200 && response.status < 300) {
        setIsUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Profile picture updated successfully!",
        });
      } else {
        setIsUpdating(false);
        alert(response.data.message);
      }
    }
    if (!!resumeRes) {
      if (resumeRes.status >= 200 && resumeRes.status < 300) {
        setIsResumeUpdated(true);
        setNewResumeLink(resumeRes.data.data);
        setIsResumeUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Resume updated successfully!",
        });
      } else {
        setIsResumeUpdating(false);
        // alert(resumeRes.data.message);
      }
    }
  }, [response, resumeRes]);
  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const file = new FormData();
      file.append("profileImage", newImage);

      // const data = {
      //   companyName: newCompany,
      //   currentProfile: newDesignation,
      //   aboutMe: newAboutMe,
      //   batch: newBatch,
      //   socialMedia: profile.socialMedia,
      // };
      patchProfilePicture(alumniId, file, setProfileResponse);
      // patchAlumniData(alumniId, data, setResponse);
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
      {/* <TextField
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

      <p
        style={{
          marginTop: "10%",
          fontSize: "1.3rem",
          marginBottom: "5%",
          fontWeight: "600",
          color: "color: var(--text-color-dark-green);",
        }}
      >
        Add/Update Resume
      </p>
      <div className="profile-picture-container">
        <p className="text-danger mb-1">{resumeErrors.resume}</p>
        <input
          type="file"
          name="profile"
          id="student-profile-image"
          className="mb-4"
          onChange={(e) => setResumeRes(e.target.files[0])}
        />
      </div>
      <div className="mt-3">
        <button
          className="logBtn me-3 logout-btn"
          style={{
            textAlign: "center",
          }}
          onClick={handleResume}
        >
          {isResumeUpdating ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Update"
          )}
        </button>
        <a
          href={!isResumeUpdated ? AlumniProfile.resume : newResumeLink}
          target="_blank"
        >
          <button
            className="logBtn me-3 logout-btn"
            style={{
              textAlign: "center",
            }}
            disabled={isResumeUpdating}
          >
            View
          </button>
        </a>
      </div>

      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
        />
      )}

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
