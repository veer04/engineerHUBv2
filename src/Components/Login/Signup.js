import React from "react";
import "./Register.css";
import gg from "./svg/google.svg";
import fve from "./svg/fve.svg";
const Signup = () => {
  return (
    <div className="cont">
      <div className="cont-head">
        <div
          className="my-form-head"
          style={{
            padding: "0px 0px 30px 0px",
          }}
        >
          Create your <br />
          Account
        </div>
      </div>

      <div className="my-form">
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Username"
            type="text"
            required
          />
        </div>
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Email"
            type="email"
            required
          />
        </div>
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Mobile"
            type="phone"
            required
          />
        </div>
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Institution Name"
            type="text"
            required
          />
        </div>
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Branch"
            type="text"
            required
          />
        </div>
        <div className="form-cont">
          <input
            className="reg-input"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div
          className="form-cont"
          style={{
            padding: "0px 0px 40px 0px",
          }}
        >
          <input
            className="reg-input"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-opt">
          <div className="my-btn reg-si">Join the Community</div>
          {/* <div className="d-flex justify-content-center">
          <div className="f-p">Forgot Password ?</div>
          <div className="f-p ">Reset Now </div>
        </div> */}
        </div>
        <div className="divisor d-flex justify-content-center">
          <hr style={{ color: "#6c757d" }} />
          <span className="d-flex justify-content-center p-2">or</span>
          <hr />
        </div>
        <div className="sign-field reg-field">
          <div className="sign-opt reg">
            <img src={gg} alt="google" />
          </div>
          <div className="sign-opt reg">
            <img src={fve} alt="Facebook" />
          </div>
        </div>

        <div className="my-item-cont">
          <div>Already have an account?</div>
          <div className="f-p ">Sign in</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
