import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CustomSnackbar from "./CustomSnackbar";
import { signInFormSubmit } from "../../services/APIConfig";

import "./Register.css";
import gg from "./svg/google.svg";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [open, setOpen] = useState(false);

  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInFormSubmit(values, setSnackbarValues, setOpen);
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

      <form className="my-form" onSubmit={handleSubmit}>
        <div className="form-cont ">
          <input
            className="reg-input"
            placeholder="Email"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
            required
          />
        </div>
        <div className="form-cont passwordContainer">
          <input
            className="reg-input"
            style={{
              paddingRight: "50px",
            }}
            type={values.showPassword ? "text" : "password"}
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
            required
          />
          <div>
            <IconButton onClick={handleClickShowPassword}>
              {!values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        <div className="form-opt">
          <button className="my-btn reg-si" type="submit">
            Sign in
          </button>
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
          <div className="sign-opt ">
            <img src={gg} alt="google" />
            Continue with Google
          </div>
        </div>

        <div className="my-item-cont">
          <div>Didn't have an account?</div>
          <Link to="/signup" className="f-p ">
            Sign Up
          </Link>
          <CustomSnackbar
            setOpen={setOpen}
            open={open}
            message={snackbarValues.message}
            severity={snackbarValues.severity}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
