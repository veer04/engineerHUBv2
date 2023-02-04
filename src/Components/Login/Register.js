import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { API_URL } from "../../services/APIUtils";
import { useSignIn } from "react-auth-kit";


import CustomSnackbar from "./CustomSnackbar";



import "./Register.css";
import axios, { AxiosError } from "axios";
import gg from "./svg/google.svg";

const Register = () => {
  const signIn=useSignIn();
  const navigate=useNavigate();
  // const[cookieValue,setCookieValue]=useContext(cookieDa);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [open, setOpen] = useState(false);
  const [validation, setValidation]= useState(false);
  const [error, setError] = useState("");
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}api/v1/signin`,
        values
      );

      signIn({
        token: response.data.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { m:values.email },
      });
      setValidation(true);
      setOpen(true);
      setSnackbarValues({
        severity: "success",
        message: "SuccessFully Logged in",
      });
      // setCookieValue(Cookies.get('_auth_state').slice(6,Cookies.get('_auth_state').length-12));
    } catch (err) {
      setSnackbarValues({
        severity: "error",
        message: "User doesn't exist or already signed in!",
      });
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      setOpen(true);
    }


  };
  const navigation=()=>{
   
    if (validation===true)
    { 
      navigate("/courses");
      window.location.reload(true);
      
    }
    
  }
  const gauth=()=>{
    window.alert("will be updated soon!!!")
  }

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
          <button className="my-btn reg-si" type="submit" onClick={navigation}>
            Sign in
          </button>
          <div className="d-flex justify-content-center">
            <div className="f-p" onClick={gauth}>Forgot Password ?</div>
            <div className="f-p "onClick={gauth}>Reset Now </div>
          </div>
        </div>
        <div className="divisor d-flex justify-content-center">
          <hr style={{ color: "#6c757d" }} />
          <span className="d-flex justify-content-center p-2">or</span>
          <hr />
        </div>
        <div className="sign-field reg-field">
          <div className="sign-opt "onClick={gauth}>
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
