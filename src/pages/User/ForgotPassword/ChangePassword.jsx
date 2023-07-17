import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import getCookie from '../../../features/getCookieValues';
import { API_URL } from '../../../services/APIUtils';
const UpdateUserForm = () => {
  const [role, setRole] = useState('');
  const [_id, setId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [OTP, setOTP] = useState(423473);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedRole = getCookie('ForgotRole');
    const storedId   = getCookie('ForgotId');
    if (storedRole && storedId) {
      setRole(storedRole);
      setId(storedId);
    }
  }, []);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setError('');
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
    setError('');
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setError('');
  };

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (!role || !_id || !newPassword || !OTP) {
      setError('Please fill in all the fields.');
      return;
    }

    try {
      // Replace 'API_ENDPOINT' with your actual API endpoint
      const response = await axios.patch(`${API_URL}api/v1/forgotPasswordVerify`, {
        role,
        _id,
        newPassword,
        OTP,
      });
      console.log(response.data); // Do something with the API response
      setRole('');
      setId('');
      setNewPassword('');
      setOTP('');
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <TextField
        label="Role"
        variant="outlined"
        value={role}
        onChange={handleRoleChange}
        error={!!error}
        helperText={error}
      />
      <TextField
        label="ID"
        variant="outlined"
        value={_id}
        onChange={handleIdChange}
        error={!!error}
        helperText={error}
      />
      <TextField
        label="New Password"
        variant="outlined"
        value={newPassword}
        onChange={handleNewPasswordChange}
        error={!!error}
        helperText={error}
      />
      <input
        label="OTP"
        type="number"
        variant="outlined"
        value={OTP}
        onChange={handleOTPChange}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default UpdateUserForm;
