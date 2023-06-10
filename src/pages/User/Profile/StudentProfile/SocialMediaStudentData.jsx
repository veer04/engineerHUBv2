import { useState } from "react";
import "./StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { patchStudentData } from "../../../../services/APIConfig";

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
      patchStudentData(userId, data);
      // setLoading(true);
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
