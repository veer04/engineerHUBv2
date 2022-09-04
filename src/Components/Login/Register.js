import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import gg from "./svg/google.svg";
import fve from "./svg/fve.svg";
const Register = () => {
  return (
    <div className="cont">
      <div className="cont-head">
        <div
          className="my-form-head"
          style={{
            padding: "0px 0px 30px 0px",
          }}
        >
          Login to your <br />
          Account
        </div>
      </div>

      <div className="my-form">
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Email"
            type="text"
            required
          />
        </div>
        <div className="form-cont">
          <input
            className="reg-input"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-opt">
          <div className="my-btn reg-si">Sign in</div>
          <div className="d-flex justify-content-center">
            <div className="f-p">Forgot Password ?</div>
            <div className="f-p ">Reset Now </div>
          </div>
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
          <div>Didn't have an account?</div>
          <Link to="/signup" className="f-p ">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
