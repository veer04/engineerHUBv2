import React from "react";
import "./StudentProfilePage";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import defaultPoster from "../../../../assets/defaultPoster";
import { TextField } from "@mui/material";
import { patchProfilePicture } from "../../../../services/APIConfig";

export default function EditStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [newImage, setNewImage] = useState(null);
  const [errors, setErrors] = useState({
    image: "",
  });

  const validateInput = () => {
    let valid = true;
    const newErrors = {
      image: "",
    };
    if (newImage === undefined || newImage === null || newImage === "") {
      newErrors.image = "Image is required";
      valid = false;
    }
    console.log(newErrors);
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
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

      patchProfilePicture(userId, file);
    }
  };

  return (
    <>
      <p>Change Profile Picture</p>
      <div className="profile-picture-container">
        <div
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
        ></div>
        <p className="text-danger mb-1">{errors.image}</p>
        <input
          type="file"
          name="profile"
          id="student-profile-image"
          className="mb-4"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
      </div>
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
      />

      <button
        className="logBtn mt-3 logout-btn"
        style={{
          textAlign: "center",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}
