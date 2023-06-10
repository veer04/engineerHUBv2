import { useState } from "react";
import "./StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { patchStudentData } from "../../../../services/APIConfig";
import CustomSnackbar from "../../Login/CustomSnackbar";
import { useEffect } from "react";
import { set } from "react-hook-form";

export default function SocialMediaStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [newSocialMedia, setNewSocialMedia] = useState({
    instagram: profile.socialMedia?.instagram,
    linkedIn: profile.socialMedia?.linkedIn,
  });
  const [errors, setErrors] = useState({
    instagram: "",
    linkedIn: "",
  });
  const [response, setResponse] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (response) {
      if (response.status >= 200 && response.status < 300) {
        setIsUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Social media updated successfully!",
        });
      } else {
        setIsUpdating(false);
        alert(response.data.message);
      }
    }
  }, [response]);

  const validateInput = () => {
    let valid = true;
    const newErrors = {
      instagram: "",
      linkedIn: "",
    };

    if (!newSocialMedia.instagram) {
      newErrors.instagram = "Instagram is required";
      valid = false;
    }
    if (!newSocialMedia.linkedIn) {
      newErrors.linkedIn = "linkedIn is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    if (validateInput() === true) {
      const data = {
        techStack: profile.techStack,
        state: profile.state,
        city: profile.city,
        country: profile.country,
        socialMedia: {
          instagram: newSocialMedia.instagram,
          linkedIn: newSocialMedia.linkedIn,
        },
      };
      patchStudentData(userId, data, setResponse);
      // setLoading(true);
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
