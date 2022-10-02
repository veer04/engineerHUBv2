import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import gg from "./svg/google.svg";
// import fve from "./svg/fve.svg";
import "./Register.css";
import "./Signup.css";
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [flag, setFlag] = useState(0);

  var checkStatus = false;
var captcha =false;
  const [formUserName, setFormUserName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formInstitutionName, setFormInstitutionName] = useState("");
  const [formBranch, setFormBranch] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    // console.log(formErrors);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   // console.log(formdata);
    // }
    if (Object.keys(formUserName).length === 0 && isSubmit) {
    }
  }, [formUserName, isSubmit]);

  const handleUser = (e) => {
    setFocused(true);
    setFormUserName(validateUserName(userName));
  };

  const handleEmail = (e) => {
    setFocused(true);
    setFormEmail(validateEmail(email));
  };

  const handleMobile = (e) => {
    setFocused(true);
    setFormMobile(validateMobile(mobile));
  };

  const handleInstName = (e) => {
    setFocused(true);
    setFormInstitutionName(validateInstName(institutionName));
  };

  const handleBranch = (e) => {
    setFocused(true);
    setFormBranch(validateBranch(branch));
  };

  const handlePassword = (e) => {
    setFocused(true);
    setFormPassword(validatePassword(password));
  };

  const handleConPassword = (e) => {
    setFocused(true);
    setFormConfirmPassword(validateConPassword(confirmPassword));
  };
  function captchaValid(value) {
    console.log("Captcha value:", value);
    captcha=true;
  
  }
  const submit = async (e) => {
    e.preventDefault();
    setUserName(validateUserName(userName));
    setEmail(validateEmail(email));
    setMobile(validateMobile(mobile));
    setInstitutionName(validateInstName(institutionName));
    setBranch(validateBranch(branch));
    setConfirmPassword(validateConPassword(confirmPassword));
    setPassword(validatePassword(password));
    setIsSubmit(true);

    if (userName && email && mobile) {
      const newEntry = {
        userName: userName,
        email: email,
        mobile: mobile,
        institutionName: institutionName,
        branch: branch,
        password: password,
        confirmPassword: confirmPassword,
      };
      if (checkStatus === true) {
        console.log(newEntry);
      }
      axios
        .post("https://ehubbackend.herokuapp.com/api/v1/signup", newEntry)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            if(captcha===true)
          Navigate("/");
          else{
            window.alert("captcha required!!!");
          }
          }
        })
        .catch((err) => {
          console.log(err);

          window.alert("Invalid Credentials or user already exists!!!");
        });
    } else if (
      !(
        userName &&
        email &&
        mobile &&
        institutionName &&
        branch &&
        password &&
        confirmPassword
      )
    ) {
      window.alert("Enter Data in all Fields");
    }
  };

  const validateUserName = (value) => {
    const errors = {};
    let regex = new RegExp("^[A-Za-z ]{3,29}$");
    if (!value) {
      errors.userName = "Name is required!";
    } else if (!regex.test(value)) {
      errors.userName = "Name should only include alphabets";
    } else {
      checkStatus = true;
    }
    return errors;
  };

  const validateEmail = (value) => {
    const errors = {};
    let regex = new RegExp("[a-z0-9]+@gmail.com");

    if (!value) {
      errors.email = "email is required!";
    } else if (!regex.test(value)) {
      errors.email = "This is not a valid email format!";
    } else {
      checkStatus = true;
    }
    return errors;
  };

  const validateMobile = (value) => {
    const errors = {};

    let regexi = new RegExp("^[0-9]{10}$");
    if (!value) {
      errors.mobile = "Contact  number is required!";
    } else if (!regexi.test(value)) {
      errors.mobile = "Contact  number should only be numeric and of 10 digits";
    } else {
      checkStatus = true;
    }
    return errors;
  };

  const validateInstName = (value) => {
    const errors = {};
    if (!value) {
      errors.institutionName = "institution name is required!!";
    }
    return errors;
  };

  const validateBranch = (value) => {
    const errors = {};
    if (!value) {
      errors.branch = "Branch is required!!";
    }
    return errors;
  };

  const validatePassword = (value) => {
    const errors = {};
    if (!value) {
      errors.password = "First letter of password should be capital!!";
    }
    return errors;
  };

  const validateConPassword = (value) => {
    const errors = {};
    if (!value) {
      errors.confirmPassword = "First letter of password should be capital!!";
    } else if (value !== password) {
      errors.confirmPassword = "password not matched!!";
    }
    return errors;
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
          Create your Account
        </div>
      </div>
      <form action="">
        <div className="my-form registerForm">
          <div className="row">
            <div className="form-cont col-lg-6">
              <input
                required="required"
                type="text"
                name="userName"
                className="reg-input"
                placeholder="UserName"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={handleUser}
                focused={focused.toString()}
                inputProps={{ style: { fontSize: 15 } }} // font size of input text
                InputplaceholderProps={{ style: { fontSize: 15 } }}
              />
              <span className="error_msg">{formUserName.userName}</span>
            </div>

            <div className="form-cont col-lg-6">
              <input
                required="required"
                variant="outlined"
                type="email"
                name="email"
                placeholder="Email"
                className="reg-input"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmail}
                focused={focused.toString()}
              />
              <span className="error_msg">{formEmail.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="form-cont  col-lg-6">
              <input
                required="required"
                autoComplete="off"
                type="text"
                name="mobile"
                placeholder="Phone"
                className="reg-input"
                onChange={(e) => setMobile(e.target.value)}
                onBlur={handleMobile}
                focused={focused.toString()}
              />
              <span className="error_msg">{formMobile.mobile}</span>
            </div>
            <div className="form-cont col-lg-6">
              <input
                required="required"
                autoComplete="off"
                type="text"
                name="institutionName"
                placeholder="Institution"
                className="reg-input"
                onChange={(e) => setInstitutionName(e.target.value)}
                onBlur={handleInstName}
                focused={focused.toString()}
              />
              <span className="error_msg">
                {formInstitutionName.institutionName}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="form-cont col-lg-6">
              <input
                required="required"
                autoComplete="off"
                type="text"
                name="branch"
                placeholder="Branch"
                className="reg-input"
                onChange={(e) => setBranch(e.target.value)}
                onBlur={handleBranch}
                focused={focused.toString()}
              />
              <span className="error_msg">{formBranch.branch}</span>
            </div>
            <div className="form-cont col-lg-6">
              <input
                required="required"
                autoComplete="off"
                type="password"
                name="password"
                placeholder="password"
                className="reg-input"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePassword}
                focused={focused.toString()}
              />
              <span className="error_msg">{formPassword.password}</span>
            </div>
          </div>
          <div className="row">
            <div className="form-cont cpf col-lg-6">
              <input
                required="required"
                autoComplete="off"
                type="password"
                name="confirm password"
                placeholder="confirm password"
                className="reg-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConPassword}
                focused={focused.toString()}
              />
              <span className="error_msg">
                {formConfirmPassword.confirmPassword}
              </span>
            </div>
            <div className="form-cont captchaf col-lg-6">
            <ReCAPTCHA
    sitekey="6Ldv4UsiAAAAALeiqiOLARiczFwe-twQHsgrz9Us"
    onChange={captchaValid}
  />
            </div>
          </div>

          <div className="form-opt">
            <button className="my-btn reg-si" type="button" onClick={submit}>
              Join the Comuunity
            </button>
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
          <div className="sign-opt ">
          <img src={gg} alt="google" />
          Continue with Google
        </div>
          </div>

          <div className="my-item-cont">
            <div>Already have an account?</div>
            <Link to="/login" className="f-p ">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
