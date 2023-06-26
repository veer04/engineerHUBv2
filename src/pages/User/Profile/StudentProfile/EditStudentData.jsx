import React from "react";
import "./StudentProfilePage";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import defaultPoster from "../../../../assets/defaultPoster";
import { TextField } from "@mui/material";
import { patchProfilePicture } from "../../../../services/APIConfig";
import { set } from "react-hook-form";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function EditStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const [errors, setErrors] = useState({
    image: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
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
    };
    if (newImage === undefined || newImage === null || newImage === "") {
      newErrors.image = "Image is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    console.log(response);
    if (response) {
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
  }, [response]);

  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const file = new FormData();
      file.append("profileImage", newImage);
      // const form = new FormData();
      // form.append("profileImage", newImage);
      // form.append("techStack", profile.techStack);
      // form.append("state", profile.state);
      // form.append("city", profile.city);
      // form.append("country", profile.country);
      // form.append("socialMedia", profile.socialMediaLinks);

      patchProfilePicture(userId, file, setResponse);
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
        <p className="text-danger mb-1">{errors.image}</p>
        <input
          type="file"
          name="profile"
          id="student-profile-image"
          className="mb-4"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
      </div>
      {/* <TextField
        name="name"
        label="Full Name"
        variant="outlined"
        value={profile.name}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="name"
        label="Full Name"
        variant="outlined"
        value={profile.name}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={profile.email}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="mobile"
        label="Phone Number"
        variant="outlined"
        value={profile.mobile}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="campus"
        label="Campus"
        variant="outlined"
        value={profile.institutionName.collegeName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />

      <TextField
        name="branch"
        label="Branch"
        variant="outlined"
        value={profile.branch}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
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
