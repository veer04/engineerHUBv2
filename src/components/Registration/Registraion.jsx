import "./Registration.css";
import React, { useState } from 'react';
import { TextField, Button, Typography} from '@mui/material';
export default function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [techStacks, setTechStacks] = useState([]);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1);

  const handleTechStacksChange = (event) => {
    setTechStacks(event.target.value.split(',').map((tech) => tech.trim()));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || contact === '' || address === '') {
      setError(true);
      return;
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
      const response = await fetch('api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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



<div className="navigation-buttons__container">
          <div className="navigation-buttons">
            <div
              style={{
                borderColor: step > 1 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-1"
            ></div>
            <div
              style={{
                borderColor: step > 2 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-2"
            ></div>
            <div
              style={{
                backgroundColor:
                  step === 1 ? "var(--primary-color-dark-green)" : "#15CF74",
                color: "white",
                borderColor: step > 1 ? "#15CF74" : "",
              }}
              className="form-button"
            >
              Basic Details
            </div>
            <div
              style={{
                backgroundColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
                color: step === 2 ? "white" : step === 3 ? "white" : "",
                borderColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
              }}
              className="form-button"
            >
              Applicant Details
            </div>
            {/* <div
              style={{
                backgroundColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
                color: step === 3 ? "white" : "",
                borderColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
              }}
              className="form-button"
            >
              Publish
            </div> */}
          </div>
        </div>

    <form noValidate autoComplete="off" 
   className="formRegistration"
    onSubmit={handleSubmit}>
   
      {step === 1 && (
      <div>
      <div className="inputRegister">
        <TextField
          error={error && firstName === ''}
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
          error={error && lastName === ''}
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
          error={error && email === ''}
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
          error={error && contact === ''}
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
      </div>)}
    {step===2 && (
    <div>
      <div className="inputRegister">
        <TextField
          error={error && address === ''}
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
          value={techStacks.join(', ')}
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
             <br/>   
                <div>
        <Button variant="contained"

         color="primary"
         type="submit">
          Submit
        </Button>
      </div>
      </div>
      )}
    </form>
    </div>
  );
}
