import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignIn } from "react-auth-kit";
import GoogleButton from "react-google-button";

import CustomSnackbar from "./CustomSnackbar";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import gg from "./svg/google.svg";
import "./Login.css";
import axios, { AxiosError } from "axios";
import useNavbar from "../../../hooks/use-navbar";
// import { set } from "react-hook-form";
import { API_URL, API_URLT } from "../../../services/APIUtils";

const Register = () => {
  if (Cookies.get("name")) {
    let path = "";
    if (Cookies.get("role") === "User") {
      path = "student";
    } else if (Cookies.get("role") === "Alumni") {
      path = "alumni";
    } else if (Cookies.get("role") === "Club") {
      path = "club";
    } else if (Cookies.get("role") === "Organization") {
      path = "organization";
    }
    window.location.href = `/profile/${path}/${Cookies.get("_id")}`;
    return;
  }

  // const accessToken = Cookies.get('access_token');
  // const refreshToken = Cookies.get('refresh_token');
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    setSelectedPageNavbar("login");
    window.scrollTo(0, 0);
  }, []);

  const signIn = useSignIn();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  // const [formPassword, setFormPassword] = useState("");
  // const [focused, setFocused] = useState(false);
  // const[cookieValue,setCookieValue]=useContext(cookieDa);
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "User",
    // accessToken: accessToken,
    // refreshToken: refreshToken,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const [open, setOpen] = useState(false);
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    // const headers = {
    //   'Authorization': `Bearer ${accessToken}`,
    //   'x-refresh-token': refreshToken
    // };

    // const response = await axios.post(`${API_URL}api/v1/login`
    // ,values,

    // ).then
    // ( response=>{
    //   Cookies.set('access_token', response.data.accessToken);
    //   const token =response.data.accessToken;
    //   const decoded = jwt_decode(token);
    //   console.log(decoded);
    //   Cookies.set('refresh_token', response.data.refreshToken);
    //   Cookies.set('userName', response.data.userName);
    //   Cookies.set('institutionName',response.data.institutionName);
    //   Cookies.set('email', response.data.email);
    //   if(response.status===200||response.status===201||response.status===202||response.status===203||response.status===204)
    //   {
    //     setValidation(true);

    //   }
    // }

    // ).catch(
    //   error=>{
    //     console.error(error);
    //   }
    // );

    // console.log(response);

    try {
      const response = await axios
        .post(`${API_URL}api/v1/login`, values)
        .then((response) => {
          Cookies.set("access_token", response.data.accessToken);
          const token = response.data.accessToken;
          const decoded = jwt_decode(token);
          Cookies.set("role", decoded.role);
          Cookies.set("image", decoded.image);
          Cookies.set("isVerified", decoded.isVerified);
          Cookies.set("verifiedByEhub", decoded.verifiedByEhub);
          Cookies.set("mobile", decoded.mobile);
          Cookies.set("_id", decoded._id);
          Cookies.set("name", response.data.name);
          Cookies.set("refresh_token", response.data.refreshToken);
          Cookies.set("userName", response.data.userName);
          Cookies.set("institutionName", response.data.institutionName);
          Cookies.set("email", response.data.email);
          Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain));
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202 ||
            response.status === 203 ||
            response.status === 204
          ) {
            setLoading(false);
            navigate("/");
            window.location.reload(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setValues({ ...values, password: "" });
      // signIn({
      //   token: response.data.accessToken,
      //   expiresIn: 3600,
      //   tokenType: "Bearer",
      //   authState: { m:values.email },
      // });
      setValidation(true);
      setOpen(true);
      // setSnackbarValues({
      //   severity: "success",
      //   message: "Logged in Successfully!",
      // });
      setCookieValue(
        Cookies.get("_auth_state").slice(
          6,
          Cookies.get("_auth_state").length - 12
        )
      );
    } catch (err) {
      setLoading(false);
      // setSnackbarValues({
      //   severity: "error",
      //   message: "Wrong credentials!",
      // });
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      setSnackbarValues({
        severity: "error",
        message: "Invalid Credentials!",
      });
      setOpen(true);
    }
  }
  // const navigation=()=>{
  //  if(validation===true)
  //   {

  //   }
  // };

  const validatePassword = () => {
    let errorMessage = "Password must contain at least";
    let allErrors = [];
    if (values.password.length < 8) {
      allErrors.push(" 8 characters");
      // errors.password = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(values.password)) {
      allErrors.push(" 1 uppercase character");
      // errors.password =
      //   "Password must contain at least one uppercase character.";
    }
    if (!/[a-z]/.test(values.password)) {
      allErrors.push(" 1 lowercase character");
      // errors.password =
      //   "Password must contain at least one lowercase character.";
    }
    if (!/\d/.test(values.password)) {
      allErrors.push(" 1 numeric character");
      // errors.password = "Password must contain at least one numeric character.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
      allErrors.push(" 1 special character");
      // errors.password = "Password must contain at least one special character.";
    }
    if (allErrors.length > 0) {
      errorMessage += allErrors.join(",");
      errorMessage += ".";
    } else {
      errorMessage = "";
    }
    return errorMessage;
    // return errors;
  };
  const gauth = async () => {
    try {
      const response = await axios.get(`${API_URL}api/v1/auth/google/user`, {});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const NavigateForgot = () => {
    navigate("/forgot-password");
  };

  // Replace with the actual URL of your backend server

  // Function to perform the API call from the frontend
  const googleAuthTry = () => {
    window.open(
      `https://engineerhub-yash.onrender.com/api/v1/auth/google/user`,
      "_self"
    );
  };
  async function handleGoogleLoginSuccess() {
    try {
      // Make the initial request to the API endpoint
      const response = await axios.get(
        `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2Fbackend.ehubbusiness.com%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fuser%2Fredirect%2F&scope=profile%20email&client_id=111727756822-c6nh6mvi2acqcm51t59r5ummd3tc8j42.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow`
      );

      // If the response status is 200, the request was successful
      if (response.status === 200) {
        // Process the response data or do whatever you need to do with it
        console.log("API Response:", response.data);
      }
    } catch (error) {
      // If the request resulted in an error (e.g., 302 redirect)
      if (error.response) {
        // Check if the error status is 302 (redirect)
        if (error.response.status === 302) {
          // The server is redirecting the frontend, and the new location is provided in the "Location" header
          const redirectURL = error.response.headers["location"];

          // Now, you can make another request to the redirect URL
          try {
            const redirectedResponse = await axios.get(redirectURL);

            // If the response status is 200, the redirected request was successful
            if (redirectedResponse.status === 200) {
              // Process the response data or do whatever you need to do with it
              console.log("Redirected API Response:", redirectedResponse.data);
            }
          } catch (redirectError) {
            // Handle any errors that might occur during the redirected request
            console.error("Redirected API Request Error:", redirectError);
          }
        } else {
          // Handle other error statuses if needed
          console.error("API Request Error:", error);
        }
      } else {
        // Handle non-response related errors (e.g., network issues)
        console.error("API Request Error:", error);
      }
    }
  }

  // const [me, setMe] = useState(null);

  // useEffect(() => {
  //   async function getMe() {
  //     try {
  //       const response = await axios.get("https://engineerhub-yash.onrender.com/api/v1/auth/details", {
  //         withCredentials: true,
  //       });
  //       // console.log(response.data);
  //       setMe(response.data);

  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }

  //   getMe();
  // }, []);

  const handleLogin = () => {
    const dynamicRedirectUrl = "https://betatestserverv3.engineerhub.in/success";
    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    googleAuthUrl.searchParams.append(
      "client_id",
      "111727756822-c6nh6mvi2acqcm51t59r5ummd3tc8j42.apps.googleusercontent.com"
    );
    googleAuthUrl.searchParams.append(
      "redirect_uri",
      `${API_URL}api/v1/auth/google/user/redirect`
    );
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("state", dynamicRedirectUrl);
    googleAuthUrl.searchParams.append("scope", "profile email");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "consent");

    window.location.href = googleAuthUrl.toString();
  //  setTimeout(()=>{
  //     window.location.reload();
  //  },2000)
  };

  // Call the function to make the API request

  //   const gauth = useGoogleLogin({
  //     onSuccess: (codeResponse) => setUser(codeResponse),
  //     onError: (error) => console.log('Login Failed:', error)
  // });

  // useEffect(
  //     () => {
  //         if (user) {
  //             axios
  //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //                     headers: {
  //                         Authorization: `Bearer ${user.access_token}`,
  //                         Accept: 'application/json'
  //                     }
  //                 })
  //                 .then((res) => {
  //                     setProfile(res.data);
  //                 })
  //                 .catch((err) => console.log(err));
  //         }
  //     },
  //     [ user ]
  // );

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //     googleLogout();
  //     setProfile(null);
  // };

  // const [isEmailValid, setIsEmailValid] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePassword = () => {
    // setFocused(true);
    // setFormPassword(validatePassword(password).length > 0?);
    // setIsPasswordValid(validatePassword(password).length > 0?);
    let checkPassword = validatePassword();
    if (checkPassword.length !== 0 && values.password !== "") {
      setSnackbarValues({
        severity: "error",
        message: checkPassword,
      });
      setOpen(true);
    }
  };

  const validateRole = () => {
    if (!values.role)
      setSnackbarValues({
        severity: "error",
        message: "Please select a role",
      });
    setOpen(true);
  };
  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // setIsEmailValid(emailRegex.test(values.email));
    // console.log(isEmailValid);
    if (emailRegex.test(values.email) === false && values.email !== "") {
      setSnackbarValues({
        severity: "error",
        message: "Please enter a valid email address!",
      });
      setOpen(true);
    }
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-3 sideMenuLogin">
            <p className="sidemenuBarHeaderLogin">For Users</p>
            <div className="formSideMenuBar">
              <div className="sideMenuList">Registraions</div>
              <div className="sideMenuList">Watchlist</div>
              <div className="sideMenuList">Recently viewed</div>
              <div className="sideMenuList">Mentor Sessions</div>
              <div className="sideMenuList">Courses</div>
              <div className="sideMenuList">Liked domains</div>
              <div className="sideMenuList">Prizes/Rewards</div>
              <div className="sideMenuList">Notifications</div>
            </div>
            <p className="sidemenuBarHeaderLogin">For Organizations</p>
            <div className="formSideMenuBar">
              <div className="sideMenuList">Manage Lists</div>
              <div className="sideMenuList">My Events</div>
            </div>
            <p className="sidemenuBarHeaderLogin">For Mentors</p>
            <div className="formSideMenuBar">
              <div className="sideMenuList">Mentor Profile</div>
            </div>
          </div> */}
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
                  onBlur={validateEmail}
                />
              </div>
              <div className="form-cont ">
                <select
                  className="reg-input"
                  placeholder="role"
                  type="text"
                  name="role"
                  value={values.role}
                  onChange={handleChange("role")}
                  required
                  // onBlur={validateRole}
                >
                  <option value="User">Student</option>
                  <option value="Alumni">Alumni</option>
                  {/* <option value="Admin">Admin</option> */}
                  <option value="Club">Club</option>
                  <option value="Organization">Company</option>
                </select>
              </div>
              <div className="form-cont passwordContainer">
                <input
                  autoComplete="off"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={values.password}
                  className="reg-input"
                  onChange={handleChange("password")}
                  // onBlur={handlePassword}
                  // focused={focused.toString()}
                  required
                />
                <div>
                  <IconButton
                    onClick={() => handleClickShowPassword()}
                    className="positionRelBottom"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>
              <div className="form-opt">
                <button
                  className="my-btn reg-si registerSSS"
                  type="submit"
                  // onClick={navigation}
                >
                  {loading ? "Loading..." : "Sign in"}
                </button>

                <div className="d-flex justify-content-center">
                  <div className="f-p" onClick={NavigateForgot}>
                    Forgot Password ? Reset Now
                  </div>
                  {/* <div className="f-p "onClick={gauth}>Reset Now </div> */}
                </div>
              </div>
              <div className="divisor d-flex justify-content-center">
                <hr style={{ color: "#6c757d" }} />
                <span className="d-flex justify-content-center p-2">or</span>
                <hr />
              </div>

              <div className="sign-field reg-field">
                <div className="sign-opt ">
                  <div>
                    <GoogleButton onClick={handleLogin}>
                      Sign in with Google
                    </GoogleButton>
                  </div>
                </div>
              </div>

              <div className="my-item-cont">
                <div>Don't have an account?</div>
                <Link to="/selectRole" className="f-p ">
                  Sign Up
                </Link>
                {snackbarValues.severity !== "success" && (
                  <CustomSnackbar
                    setOpen={setOpen}
                    open={open}
                    message={snackbarValues.message}
                    severity={snackbarValues.severity}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
