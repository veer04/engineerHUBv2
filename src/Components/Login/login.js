import React from "react";
import "./login.css";
import google from "./svg/google.svg";
import fb from "./svg/fb.svg";

import Ehub from "./svg/Ehub.svg";
const login = () => {
  return (
    <div className="cont">
      <div className="cont-head">
        <img src={Ehub} alt="Ehub" />
        <div className="my-form-head">Let's you in</div>
      </div>

      <div className="sign-field">
        <div className="sign-opt ">
          <img src={google} alt="google" />
          Continue with Google
        </div>
        <div className="sign-opt ">
          <img src={fb} alt="Facebook" />
          Continue with Facebook
        </div>
      </div>
      <div className="divisor">
        <hr style={{color:"#6c757d"}}/>
        <span className="d-flex justify-content-center">OR</span>
        <hr/>
      </div>
      <div className="my-form">
        {/* <div className="form-cont">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="form-cont">
          <label>Password</label>
          <input type="password" />
        </div> */}
        {/* <div className="f-p">Forgot Password ?</div> */}
        <div className="form-opt">
          <div className="my-btn si">Sign in with Password</div>
          <div className="my-item-cont">
            <div>Didn't have an account?</div>
            <div className="f-p ">Sign up</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
