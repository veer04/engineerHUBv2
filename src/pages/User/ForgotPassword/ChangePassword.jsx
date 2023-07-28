import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Signup/StudentSignup.css";
import getCookie from '../../../features/getCookieValues';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../services/APIUtils';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "./ForgotPassword.css";
import SimpleInputField from '../../../components/SimpleInputField/SimpleInputField';
const UpdateUserForm = () => {
  const [role, setRole] = useState('');
  const [_id, setId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [OTP, setOTP] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const storedRole = getCookie('ForgotRole');
    const storedId   = getCookie('ForgotId');
    if (storedRole && storedId) {
      setRole(storedRole[2]);
      setId(storedId[2]);
      console.log(role);
      console.log(_id);

    }
  }, []);

  const handleRoleChange = (event) => {
    // setRole(event.target.value);
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
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleOTPChange = (event) => {
    setOTP(event.target.value);
    setError('');
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleSubmit = async () => {
    const otpAsNumber = parseInt(OTP, 10);
    if ( !newPassword) {
      setError('Please fill in all the fields.');
      return;
    }

    try {
      // Replace 'API_ENDPOINT' with your actual API endpoint
      const response = await axios.patch(`${API_URL}api/v1/forgotPasswordVerify`, {
        role,
        _id,
        newPassword,
        OTP:otpAsNumber,
      }).then((res)=>{
        window.location.href = "/";
        console.log(response);
        if (res.status===200) {
          changeRouteValue();
          setLoading(false);
          window.location.href = "/";
        }
      });
      console.log(response); // Do something with the API response

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
     <div className="cont-head">
        <div
         className="my-form-head forgotPassHeader"
          style={{
          color: "#0a3f51",
          padding: "0px 0px 30px 0px",
           }}
           >
          Change Password
              </div>
            </div>
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
      <div className='InputFieldFpass'>
      {/* <TextField
        fullWidth
        label="Role"
        variant="outlined"
        className='mt-2'
        value={role}
        onChange={handleRoleChange}
        error={!!error}
        helperText={error}
      /> */}
      <br />
      </div>
      <div className='InputFieldFpass'>
      {/* <TextField
        fullWidth
        label="ID"
        className='mt-2'
        variant="outlined"
        value={_id}
        onChange={handleIdChange}
        error={!!error}
        helperText={error}
      /> */}
      <br />
      </div>
      <div className='InputFieldFpass'>
      <TextField
      id="student-signup-outlined-adornment-confirm-password"
        fullWidth
        label="New Password"
        className='mt-2'
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        variant="outlined"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowConfirmPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={newPassword}
        onChange={handleNewPasswordChange}
        error={!!error}
        helperText={error}
      />
      <br />
      </div>
      <div className='InputFieldFpass'>
      <SimpleInputField
            placeholder='Enter the six digit OTP'
            fullWidth
            value={OTP}
            className='mt-2'
            setValue={setOTP}
            type="text"
            maxLength={6}
            pattern="[0-9]*"
            required
            id="otp"
       />
      </div>
      <div className='InputFieldFpass'>
      <Button variant="contained"  onClick={handleSubmit}>
        Submit
      </Button>
      </div>
      </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default UpdateUserForm;
