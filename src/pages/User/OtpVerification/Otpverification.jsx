import "../Signup/Signup.css";
import "./Otpverification.css";
import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from "axios";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const OTP = () => {
    const url="http.google.com"
    const [otp, setOTP] = useState('');

    const handleChange = (event) => {
      setOTP(event.target.value);
    }
    const handleSubmit =()=>
    {
        e.preventdefault(url,otp);
        axios.post(url,otp).then((response)=>{
            console.log(response);
        },(error)=>{
            console.log(error);
        });
    }
    // axios.post('https://e-hub-backend-production-9545.up.railway.app/api/v1/user/signup',formData).then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });
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
                    <div>
                        <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="otp">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleChange}
                            maxLength={6}
                            pattern="[0-9]*" 
                            required 
                        />
                        <button type ="submit" className="btnSubmit">
                        Verify
                        </button>
                        </form>
                        </div>
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







