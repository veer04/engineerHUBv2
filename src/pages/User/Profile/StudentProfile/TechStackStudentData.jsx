import { useState } from "react";
import "./StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { patchStudentData } from "../../../../services/APIConfig";

export default function TechStackStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [newTechStack, setNewTechStack] = useState([]);
  const [currentTechStack, setCurrentTechStack] = useState("");
  const [errors, setErrors] = useState({
    techStack: "",
  });

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

  const handleSubmit = async () => {
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
      patchStudentData(userId, data);
      // setLoading(true);
    }
  };

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

      {newTechStack.map((tech, index) => (
        <div key={index} className="tech-stack">
          <p>{tech}</p>
        </div>
      ))}

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
