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

  const handleTechStacksChange = (event) => {
    setTechStacks(event.target.value.split(',').map((tech) => tech.trim()));
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
    <div className="formRegistration">
    <form noValidate autoComplete="off" 
   
    onSubmit={handleSubmit}>
      <div>
        <Typography variant="h6">Registration Form</Typography>
      </div>
      <div>
        <TextField
          error={error && firstName === ''}
          required
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          margin="normal"
        
        />
        <TextField
          error={error && lastName === ''}
          required
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          margin="normal"

        />
      </div>
      <div>
        <TextField
          error={error && email === ''}
          required
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
        />
        <TextField
          error={error && contact === ''}
          required
          id="contact"
          label="Contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          error={error && address === ''}
          required
          id="address"
          label="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          id="techStacks"
          label="Tech Stacks (comma-separated)"
          value={techStacks.join(', ')}
          onChange={handleTechStacksChange}
          margin="normal"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
    </div>
  );
}
