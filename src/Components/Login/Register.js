import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import gg from "./svg/google.svg";
import fve from "./svg/fve.svg";
const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Submit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    const result = await axios.post(
      "https://ehubbackend.herokuapp.com/api/v1/signin",
      data
    );
    console.log(result);
    // var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyZmQ0MTBmMGY2OTAyMmZiM2U0YTg0ZCIsInVzZXJOYW1lIjoiUGFya2hpIiwiaW5zdGl0dXRpb25OYW1lIjoiQUtHRUMgR2hhemlhYmFkIiwiYnJhbmNoIjoiQ1NJVCIsImVtYWlsIjoicGFya2hpZ2FyZzMwMkBnbWFpbC5jb20iLCJtb2JpbGUiOiI3NjY4MDQzNjkxIiwicGFzc3dvcmQiOiIkMmIkMTAkUi41VkpZTDdMRm92azFrS2xNSFdUdWYvNjZabXpNdU9lMUVrTUlnOUk4cXZmeGtTVE5TZVciLCJjb25maXJtUGFzc3dvcmQiOiIkMmIkMTAkUi41VkpZTDdMRm92azFrS2xNSFdUdWYvNjZabXpNdU9lMUVrTUlnOUk4cXZmeGtTVE5TZVciLCJpc1ZlcmlmaWVkIjpmYWxzZSwib3RwdXNlciI6MjkyMDY2LCJfX3YiOjB9LCJpYXQiOjE2NjA4MDE1NzcsImV4cCI6MTY2MTQwNjM3N30.EBEaL_8HNqp-u5kkmNOa-Tq7Bv7sXx8IxXz9sMi6PIA"

    // const result2 =await axios.post("https://ehubbackend.herokuapp.com/api/v1/refresh",token);
  };

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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-cont">
          <input
            className="reg-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-opt">
          <div className="my-btn reg-si" onClick={Submit}>
            Sign in
          </div>
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
