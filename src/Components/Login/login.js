import React from "react";
import "./login.css";
import google from "./svg/google.svg";
import github from "./svg/github.svg";
import linkedin from "./svg/linkedin.svg";
import LefImg from "./left-img.jpg";
const login = () => {
  return (
    <div className="cont">
    
        <div className="mytagContainer">engineerHUB</div>
        <h5 className="myheaderbelow">Students . Campus . Industries</h5>

        <div className="my-form">
          <div className="form-cont">
            <label>Username</label>
            <input type="text" />
          </div>
          <div className="form-cont">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="f-p">Forgot Password ?</div>
          <div className="form-opt">
            <div className="my-btn si">Log in</div>
          </div>
        </div>
        <div className="divisor">OR</div>
        <div className="sign-field">
          <div className="sign-opt gh">
            <img src={github} alt="github" />
            Github
          </div>
          <div className="sign-opt gg">
            <img src={google} alt="google" />
            Google
          </div>
          <div className="sign-opt lin">
            <img src={linkedin} alt="linkedin" />
            Linkedin
          </div>
        </div>

        <div className="my-border"></div>
 
    </div>
  );
};

export default login;
