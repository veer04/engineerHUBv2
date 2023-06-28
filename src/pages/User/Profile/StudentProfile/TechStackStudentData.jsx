import { useState } from "react";
import "./StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { patchStudentData } from "../../../../services/APIConfig";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";

export default function TechStackStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [newTechStack, setNewTechStack] = useState([...profile.techStack]);
  const [currentTechStack, setCurrentTechStack] = useState("");
  const [errors, setErrors] = useState({
    techStack: "",
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
      techStack: "",
    };

    if (newTechStack.length === 0) {
      newErrors.techStack = "Tech Stack is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    if (response) {
      if (response.status >= 200 && response.status < 300) {
        setIsUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Tech Stack updated successfully!",
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
      const data = {
        techStack: newTechStack,
        state: profile.state,
        city: profile.city,
        country: profile.country,
        socialMedia: {
          instagram: profile.socialMedia.instagram,
          linkedIn: profile.socialMedia.linkedIn,
        },
      };
      patchStudentData(userId, data, setResponse);
      // setLoading(true);
    } else {
      setIsUpdating(false);
    }
  };

  function handleDelete(tech) {
    setNewTechStack(newTechStack.filter((item) => item !== tech));
  }

  return (
    <>
      <TextField
        name="tech-stack"
        label="Tech Stack"
        variant="outlined"
        value={currentTechStack}
        placeholder="Enter your tech stack"
        onChange={(e) => setCurrentTechStack(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.techStack}
        helperText={errors.techStack}
      />

      {newTechStack.length > 0 && (
        <div className="new-tech-stack-container">
          {newTechStack.map((tech, index) => (
            <div key={index} className="tech-stack">
              {tech}
              <div onClick={() => handleDelete(tech)}>
                <RxCross2 />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          if (currentTechStack === "") {
            return;
          }
          setNewTechStack((prev) => [...prev, currentTechStack]);
          setCurrentTechStack("");
        }}
        className="add-tech-stack-btn"
      >
        + Add
      </button>

      {
        <div className="mt-4">
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
      }
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
