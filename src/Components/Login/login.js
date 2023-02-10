// import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../../services/APIUtils";
// import google from "./svg/google.svg";
// import { cancelToken, gAuth } from "../../services/APIConfig";
// import fb from "./svg/fb.svg";

import Ehub from "./svg/Ehub.svg";


const login = () => {



  // const gauth=()=>{
  //   window.alert("Will be updated soon!!!")
  //   axios
  //   .get(`${API_URL}api/v1/auth/google`)
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  return (
    <div className="cont">
      <div className="cont-head">
        <img src={Ehub} alt="Ehub" />
        <div className="my-form-head">Let's you in</div>
      </div>

      {/* <div className="sign-field">
         <div className="sign-opt "onClick={gauth}>
          <img src={google} alt="google" />
          Continue with Google
        </div> */}
        
        {/* <div className="sign-opt ">
          <img src={fb} alt="Facebook" />
          Continue with Facebook
        </div> */}
      {/* </div> */}
      <div className="divisor d-flex justify-content-center">
        <hr style={{ color: "#6c757d" }} />
        <span className="d-flex justify-content-center">OR</span>
        <hr />
      </div>
      <div className="my-form">
        <div className="form-opt">
          <Link to="/register" className="my-btn si">Sign in with Password</Link>
          <div className="my-item-cont">
            <div>Didn't have an account?</div>
            <Link to="/signup" className="f-p ">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
