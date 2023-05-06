import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignIn } from "react-auth-kit";


import CustomSnackbar from "./CustomSnackbar";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


import "./Login.css";
import axios, { AxiosError } from "axios";
import useMobileNavbar from "../../../hooks/use-mobileNavbar";


const Register = () => {
// const accessToken = Cookies.get('access_token');
// const refreshToken = Cookies.get('refresh_token');
  const {setSelectedPage} = useMobileNavbar();
  setSelectedPage("login");
  const signIn=useSignIn();
  const navigate=useNavigate();
  const [password, setPassword] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [focused, setFocused] = useState(false);
  // const[cookieValue,setCookieValue]=useContext(cookieDa);
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "User",
    // accessToken: accessToken,
    // refreshToken: refreshToken,
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
      
    });
  };
  const handlePassword = (e) => {
    setFocused(true);
    setFormPassword(validatePassword(password));
  };


  // const getAccessToken = () => {
  //   const access_token = getCookie('access_token');
  //   return access_token ? `Bearer ${access_token}` : null;
  //   console.log(access_token);
  // }
  
  // const getRefreshToken = () => {
  //   const refresh_token = getCookie('refresh_token');
  //   return refresh_token ? `Bearer ${refresh_token}` : null;
  //   console.log(refresh_token);
  // }




  async function handleSubmit(e) {
    e.preventDefault();


// const headers = {
//   'Authorization': `Bearer ${accessToken}`,
//   'x-refresh-token': refreshToken
// };
  

const response = await axios.post(`https://e-hub-backend-production-9545.up.railway.app/api/v1/login`
,values,
// {headers},

).then
( response=>{
  Cookies.set('access_token', response.data.accessToken);
  const token =response.data.accessToken;
  const decoded = jwt_decode(token);
  console.log(decoded); 
  Cookies.set('refresh_token', response.data.refreshToken);
  Cookies.set('userName', response.data.userName);
  Cookies.set('institutionName',response.data.institutionName);
  Cookies.set('email', response.data.email);
  if(response.status===200||response.status===201||response.status===202||response.status===203||response.status===204)
  {
    setValidation(true);
  }
}

).catch(
  error=>{
    console.error(error);
  }
);
console.log(response);



    // try {
    //   const response = await axios.post(
    //     `https://e-hub-backend-production-9545.up.railway.app/api/v1/login`,
    //     values,
    //   );

    //   signIn({
    //     token: response.data.accessToken,
    //     expiresIn: 3600,
    //     tokenType: "Bearer",
    //     authState: { m:values.email },
    //   });
    //   setValidation(true);
    //   setOpen(true);
    //   setSnackbarValues({
    //     severity: "success",
    //     message: "SuccessFully Logged in",
    //   });
    //   setCookieValue(Cookies.get('_auth_state').slice(6,Cookies.get('_auth_state').length-12));
    // } catch (err) {
    //   setSnackbarValues({
    //     severity: "error",
    //     message: "User doesn't exist or already signed in!",
    //   });
    //   if (err && err instanceof AxiosError)
    //     setError(err.response?.data.message);
    //   else if (err && err instanceof Error) setError(err.message);
    //   setOpen(true);
    // }


  };
  const navigation=()=>{
   if(validation===true)
    { 
      navigate("/profile");
      window.location.reload(true);
      
    }
    
  }


  const validatePassword = (value) => {
    let errors = {};

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase character.';
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase character.';
    } else if (!/\d/.test(password)) {
      errors.password = 'Password must contain at least one numeric character.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = 'Password must contain at least one special character.';
    }
     return errors;
  };


  return (
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
        <div className="cont col-lg-9">
      <div className="cont-head">
        <div
          className="my-form-head"
          style={{
            color: "#0a3f51",
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
                autoComplete="off"
                name="password"
                type={values.showPassword ? "text" : "password"}
               placeholder="Password"
               value={values.password}
               className="reg-input"
                onChange={handleChange("password")}
                onBlur={handlePassword}
                focused={focused.toString()}
               
                required
              />
          <div>
            <IconButton onClick={handleClickShowPassword} className="positionRelBottom">
              {!values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        <div className="form-opt">
          <button className="my-btn reg-si registerSSS" type="submit" onClick={navigation}>
            Sign in
          </button>

        </div>
        <div className="divisor d-flex justify-content-center">
          <hr style={{ color: "#6c757d" }} />
          <span className="d-flex justify-content-center p-2">or</span>
          <hr />
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
    </div>
</div>
</div>
  );
};

export default Register;
