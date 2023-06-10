import React from "react";
import "./AlumniProfilePage";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { patchAlumniData } from "../../../../services/APIConfig";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function SocialMediaAlumniData() {
  const { alumniId } = useParams();
  const [profile] = useOutletContext();
  const [newSocialMedia, setNewSocialMedia] = useState({
    instagram: "",
    linkedIn: "",
    twitter: "",
  });
  const [errors, setErrors] = useState({
    instagram: "",
    linkedIn: "",
    twitter: "",
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
      instagram: "",
      linkedIn: "",
      twitter: "",
    };

    if (!newSocialMedia.instagram) {
      newErrors.instagram = "Instagram is required";
      valid = false;
    }
    if (!newSocialMedia.linkedIn) {
      newErrors.linkedIn = "linkedIn is required";
      valid = false;
    }
    if (!newSocialMedia.twitter) {
      newErrors.twitter = "Twitter is required";
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
          message: "Social Media updated successfully!",
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
      const data = {
        companyName: profile.companyName,
        currentProfile: profile.currentProfile,
        aboutMe: profile.aboutMe,
        batch: profile.batch,
        socialMedia: newSocialMedia,
      };
      patchAlumniData(alumniId, data, setResponse);
    } else {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <TextField
        name="instagram"
        label="Instagram"
        variant="outlined"
        value={newSocialMedia?.instagram}
        placeholder="Enter your Instagram link"
        onChange={(e) =>
          setNewSocialMedia((prev) => ({
            ...prev,
            instagram: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
        error={!!errors.instagram}
        helperText={errors.instagram}
      />

      <TextField
        name="linkedIn"
        label="linkedIn"
        variant="outlined"
        value={newSocialMedia?.linkedIn}
        placeholder="Enter your linkedIn link"
        onChange={(e) =>
          setNewSocialMedia((prev) => ({
            ...prev,
            linkedIn: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
        error={!!errors.linkedIn}
        helperText={errors.linkedIn}
      />
      <TextField
        name="linkedIn"
        label="Twitter"
        variant="outlined"
        value={newSocialMedia?.twitter}
        placeholder="Enter your linkedIn link"
        onChange={(e) =>
          setNewSocialMedia((prev) => ({
            ...prev,
            twitter: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
        error={!!errors.twitter}
        helperText={errors.twitter}
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
