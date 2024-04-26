import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignIn } from "react-auth-kit";
import GoogleButton from "react-google-button";
// import LoginLeft from "./LoginLeft.png";
import CustomSnackbar from "./CustomSnackbar";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import gg from "./svg/google.svg";
import "./Login.css";
import axios, { AxiosError } from "axios";
import useNavbar from "../../../hooks/use-navbar";
// import { set } from "react-hook-form";
import { API_URL, API_URLT, FRONTEND_URL } from "../../../services/APIUtils";
import FormInputDropdown from "../../../components/FormInputs/FormInputDropdown";

const Register = () => {
  const loginLeft =
    "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/auth/loginLeft.png";
  if (Cookies.get("name")) {
    let path = "";
    if (Cookies.get("role") === "User") {
      path = "user";
    } else if (Cookies.get("role") === "Alumni") {
      path = "user";
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
    document.title = "Login | engineerHUB";
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
  const [role, setRole] = useState({
    label: "Student",
    value: "User",
  });

  const allRole = [
    {
      label: "Student",
      value: "User",
    },
    {
      label: "Alumni",
      value: "Alumni",
    },
    {
      label: "Club",
      value: "Club",
    },
    {
      label: "Company",
      value: "Organization",
    },
  ];

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
      const val = role.value;
      const response = await axios
        .post(`${API_URL}api/v1/login`, { ...values, role: val })
        .then((response) => {
          Cookies.set("access_token", response.data.accessToken, {
            expires: 400,
          });
          const token = response.data.accessToken;
          const decoded = jwt_decode(token);
          Cookies.set("role", decoded.role, { expires: 400 });
          Cookies.set("name", response.data.name, { expires: 400 });
          if (decoded.role === "User" || decoded.role === "Alumni") {
            Cookies.set("firstName", decoded.firstName, { expires: 400 });
            Cookies.set("lastName", decoded.lastName, { expires: 400 });
            Cookies.set(
              "name",
              decoded.firstName.concat(" ", decoded.lastName),
              { expires: 400 }
            );
          }
          Cookies.set("image", decoded.image, { expires: 400 });
          Cookies.set("isVerified", decoded.isVerified, { expires: 400 });
          Cookies.set("verifiedByEhub", decoded.verifiedByEhub, {
            expires: 400,
          });
          Cookies.set("mobile", decoded.mobile, { expires: 400 });
          Cookies.set("_id", decoded._id, { expires: 400 });
          Cookies.set("refresh_token", response.data.refreshToken, {
            expires: 400,
          });
          Cookies.set("userName", response.data.userName, { expires: 400 });
          Cookies.set("institutionName", response.data.institutionName, {
            expires: 400,
          });
          Cookies.set("email", response.data.email, { expires: 400 });
          Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain), {
            expires: 400,
          });
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202 ||
            response.status === 203 ||
            response.status === 204
          ) {
            setLoading(false);
            if (sessionStorage.getItem("redirectToAuth") === "true") {
              sessionStorage.removeItem("redirectToAuth");
              navigate(sessionStorage.getItem("redirectToAuthLink"));
              sessionStorage.removeItem("redirectToAuthLink");
            } else navigate("/");
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
    const dynamicRedirectUrl = `${FRONTEND_URL}success`;
    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    googleAuthUrl.searchParams.append(
      "client_id",
      "191366106902-f0pbl6ncfs9h2iicor5vm5viq94snf6l.apps.googleusercontent.com"
    );
    googleAuthUrl.searchParams.append(
      "redirect_uri",
      `${API_URLT}api/v1/auth/google/user/redirect`
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
    <main className="Login">
      {/* <div
            className="col-lg-6 login-left-container"
            style={{
              borderRadius: "7px",
              background: "#fff",
              marginBottom: "2%",
            }}
          >
            <div className="cont-head">
              <div
                className="my-form-head"
                style={{
                  color: "var(--Primary-500, #002B36)",
                  fontFamily: "Gotham Black",
                  padding: "30px",
                  fontWeight: "800",
                }}
              >
                Join the India’s{" "}
                <span style={{ textDecoration: "line-through" }}> largest</span>{" "}
                <br />
                coolest community of engineers
              </div>
              <img src={loginLeft} alt="" />
            </div>
          </div> */}
      <div
        className="cont col-lg-3 login-right-container"
        style={{
          borderRadius: "7px",
          background: "#fff",
          marginBottom: "2%",
          marginLeft: "20px",
        }}
      >
        <div className="cont-head">
          <div
            className="my-form-head"
            style={{
              color: "#0a3f51",
              padding: "0px 0px 8px 0px",
              letterSpacing: "-1px",
              textAlign: "center",
              width: "100%",
              lineHeight: "1.2",
              fontSize: "36px",
            }}
          >
            Hey, Welcome back
          </div>
          {/* <div
            className="my-form-head"
            style={{
              color: "#0a3f51",
              padding: "0px 0px 30px 0px",
              fontWeight: "500",
              textAlign: "start",
              width: "100%",
              lineHeight: "1.2",
              fontSize: "16px",
            }}
          >
            Community.Campus.Company
          </div> */}
        </div>

        <form className="my-form custom-form-input" onSubmit={handleSubmit}>
          <div className="form-cont ">
            <input
              className="reg-input custom-input custom-text"
              placeholder="Email"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              required
              onBlur={validateEmail}
            />
          </div>
          <div style={{ marginBottom: "5px" }} className="form-cont ">
            <FormInputDropdown
              // label="Office Location"
              id="opportunityCountry"
              name="opportunityCountry"
              required
              placeholder="Select your role"
              value={role}
              setValue={setRole}
              options={allRole}
              style={{ fontWeight: "500", fontSize: "1rem" }}
              // helperText={errors.opportunityCountry}
              // disabled={!allCountriesCopy.length}
              // className="mb-4"
            />
            {/* <select
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
                  <option value="Club">Club</option>
                  <option value="Organization">Company</option>
                </select> */}
          </div>
          <div className="form-cont passwordContainer">
            <input
              autoComplete="off"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={values.password}
              className="reg-input custom-input custom-text"
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
            <p style={{ width: "100%", marginTop: ".5rem", marginBottom: "0" }}>
              <span className="f-p" onClick={NavigateForgot}>
                Forgot Password ?
              </span>
            </p>
            <button
              style={{ marginTop: "14px" }}
              className="my-btn reg-si registerSSS "
              type="submit"
              // onClick={navigation}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>
          <div className="form-opt">
            <div className="d-flex justify-content-center">
              {/* <div className="f-p "onClick={gauth}>Reset Now </div> */}
            </div>
          </div>
          <div className="divisor d-flex justify-content-center w-100">
            <hr
              style={{
                borderColor: "rgb(163, 163, 163)",
                borderWidth: "1px",
                height: "1px",
              }}
            />
            <span className="d-flex justify-content-center p-2">or</span>
            <hr
              style={{
                borderColor: "rgb(163, 163, 163)",
                borderWidth: "1px",
                height: "1px",
              }}
            />
          </div>

          <div className="sign-field reg-field">
            {/* <div className="sign-opt "> */}
            {/* <div> */}
            {/* <GoogleButton onClick={handleLogin}>
              Sign in with Google
            </GoogleButton> */}
            <button className="my-btn google-btn" onClick={handleLogin}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M3.15308 7.3455L6.43858 9.755C7.32758 7.554 9.48058 6 12.0001 6C13.5296 6 14.9211 6.577 15.9806 7.5195L18.8091 4.691C17.0231 3.0265 14.6341 2 12.0001 2C8.15908 2 4.82808 4.1685 3.15308 7.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M11.9999 22.0003C14.5829 22.0003 16.9299 21.0118 18.7044 19.4043L15.6094 16.7853C14.6054 17.5458 13.3574 18.0003 11.9999 18.0003C9.39891 18.0003 7.19041 16.3418 6.35841 14.0273L3.09741 16.5398C4.75241 19.7783 8.11341 22.0003 11.9999 22.0003Z"
                  fill="#4CAF50"
                />
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#1976D2"
                />
              </svg>
              Sign in with Google
            </button>
            {/* </div> */}
            {/* </div> */}
          </div>

          <div className="my-item-cont">
            <div>Don't have an account?</div>
            <Link to="/select-role" className="f-p">
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
    </main>
  );
};

export default Register;
