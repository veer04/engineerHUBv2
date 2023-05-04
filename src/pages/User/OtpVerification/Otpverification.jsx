import "../Signup/Signup.css";
import "./Otpverification.css";
import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from "axios";
import Cookies from 'js-cookie';

const OTP = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [otp, setOtp] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const Result = {
        email: email,
        role: role, 
        OTP: otp
      };
  
      axios.patch("https://e-hub-backend-production-9545.up.railway.app/api/v1/signup/verify", Result)
        .then(response =>{
            // Store the access token and refresh token in cookies
            Cookies.set('access_token', response.data.accessToken);
            Cookies.set('refresh_token', response.data.refreshToken);
        
            // Proceed to login page or do other stuff
          })
        .catch(error => console.error(error));
            
    };

 
  return (
    <>
    <div className="Login">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 sideMenuLogin">
    <p className="sidemenuBarHeaderLogin">
        For Users

    </p>
    <div className="formSideMenuBar">
        <div className="sideMenuList">
        Registraions
        </div>
        <div className="sideMenuList">
        Watchlist
        </div>
        <div className="sideMenuList">
        Recently viewed
        </div>
        <div className="sideMenuList">
        Mentor Sessions
        </div>
        <div className="sideMenuList">
        Courses
        </div>
        <div className="sideMenuList">
        Liked domains
        </div>
        <div className="sideMenuList">
        Prizes/Rewards
        </div>
        <div className="sideMenuList">
       Notifications
        </div>
    </div>
    <p className="sidemenuBarHeaderLogin">
        For Organizations

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
       Manage Lists
        </div>
         <div className="sideMenuList">
       My Events
        </div> 
       
    </div>
    <p className="sidemenuBarHeaderLogin">
        For Mentors

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
      Mentor Profile
        </div>
    
    </div>
                </div>
                <div className="col-lg-9">
                   <p className="headerOtpVerification">
                    Verify YourSelf

                   </p>
                   <div className="container otpBox">
                    <div className="otpVbox">
                    <form onSubmit={handleSubmit}>
                            <label>
                                Email:
                                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </label>
                            <label>
                                Role:
                                <select value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="User">User</option>
                                <option value="Mentor">Mentor</option>
                                <option value="Organization">Organization</option>
                                </select>
                            </label>
                            <label>
                                OTP:
                                <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            maxLength={6}
                            pattern="[0-9]*" 
                            required 
                        />
                            </label>
                            <button type="submit">Submit</button>
                    </form>

                    </div>
                   </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )


  };
export default OTP







