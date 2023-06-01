import "./Registration.css";
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HostEventTimeline from "../Timeline/HostEventTimeline";
export default function RegistrationForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1);

  const handleTechStacksChange = (event) => {
    setTechStacks(event.target.value.split(",").map((tech) => tech.trim()));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      contact === "" ||
      address === ""
    ) {
      setError(true);
      return;
    } else {
      navigate("/success");
    }
    const data = {
      firstName,
      lastName,
      email,
      contact,
      address,
      techStacks,
    };
    // Call API endpoint to submit data
    try {
      const response = await fetch("api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="">
      <HostEventTimeline step={step} numberOfCheckpoints={2} width="20rem" />
      <form
        noValidate
        autoComplete="off"
        className="formRegistration"
        onSubmit={handleSubmit}
      >
        {step === 1 && (
          <div>
            <div className="inputRegister">
              <TextField
                error={error && firstName === ""}
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                margin="normal"
                className="inputRegister"
                fullWidth
              />
              <TextField
                error={error && lastName === ""}
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                margin="normal"
                className="inputRegister"
                fullWidth
              />
            </div>
            <div className="inputRegister">
              <TextField
                error={error && email === ""}
                required
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                margin="normal"
                className="inputRegister"
                fullWidth
              />
              <TextField
                error={error && contact === ""}
                required
                id="contact"
                label="Contact"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                margin="normal"
                className="inputRegister"
                fullWidth
              />
            </div>
            <br />
            <button
              type="button"
              className="buttonOnHostingPage"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="inputRegister">
              <TextField
                error={error && address === ""}
                required
                id="address"
                label="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="inputRegister">
              <TextField
                id="techStacks"
                label="Tech Stacks (comma-separated)"
                value={techStacks.join(", ")}
                onChange={handleTechStacksChange}
                margin="normal"
                fullWidth
              />
            </div>

            <br />
            <button
              type="button"
              className="buttonOnHostingPage"
              onClick={handlePrev}
            >
              Previous
            </button>
            <br />
            <div>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
