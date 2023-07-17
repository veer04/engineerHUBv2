import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import '../Signup/StudentSignup.css';
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      setError('');
    };

    const handleSubmit = async () => {
      if (!email) {
        setError('Please enter an email address.');
        return;
      }
  
      try {
        // Replace 'API_ENDPOINT' with your actual API endpoint
        const response = await axios.post(`${API_URL}api/v1/forgotPassword`, { email }).then((res)=>{
            if(res.status===200)
            {
              Cookies.set("ForgotId",res.data._id);
              Cookies.set("ForgotRole",res.data.role);
            }
        });
        console.log(response.data); // Do something with the API response
        setEmail('');
      } catch (error) {
        console.error(error);
        setError('An error occurred. Please try again later.');
      }
    };
  

  
  return (
    <main>
            <div className="cont-head">
              <div
                className="my-form-head"
                style={{
                  color: "#0a3f51",
                  padding: "0px 0px 30px 0px",
                }}
              >
                Forgot Password
              </div>
            </div>

       <TextField
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  )
}
