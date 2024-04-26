import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignIn } from "react-auth-kit";
import GoogleButton from "react-google-button";
// import LoginLeft from "../Login/LoginLeft.png";
import CustomSnackbar from "../Login/CustomSnackbar";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
// import gg from "./svg/google.svg";
import "../Login/Login.css";
import axios, { AxiosError } from "axios";
import useNavbar from "../../../hooks/use-navbar";
// import { set } from "react-hook-form";
import { API_URL, API_URLT, FRONTEND_URL } from "../../../services/APIUtils";

const SignupUser = () => {
  const loginLeft =
    "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/auth/loginLeft.png";
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
    document.title = "Sign Up | engineerHUB";
    setSelectedPageNavbar("login");
    window.scrollTo(0, 0);
  }, []);

  const signIn = useSignIn();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  // const [formPassword, setFormPassword] = useState("");
  // const [focused, setFocused] = useState(false);
  // const[cookieValue,setCookieValue]=useContext(cookieDa);
  const [values, setValues] = useState({
    confirmPassword:"",
    password: "",
    role: "User",
    firstName: "",
    lastName:"",
    email:"",
    // accessToken: accessToken,
    // refreshToken: refreshToken,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
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
    // handlePassword();
    // handleConfirmPassword();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const element = values[key];
          console.log(element);
          if (!Boolean(element)) {
            setSnackbarValues({
              severity: "error",
              message: "Please fill all the fields!",
            });
            setOpen(true);
            return;
          }
        }
      }
      if (values.password !== values.confirmPassword) {
        setSnackbarValues({
          severity: "error",
          message: "Password and confirm password must be same!",
        });
        setOpen(true);
        return;
      }
      const response = await axios
        .post(`${API_URL}api/v1/user/signup`, values)
        .then((response) => {
          console.log(response)
          // Cookies.set("access_token", response.data.accessToken);
          // const token = response.data.accessToken;
          // const decoded = jwt_decode(token);
          Cookies.set("role", response.data.role, { expires: 1 / 24 / 4 });
          // Cookies.set("image", decoded.image);
          // Cookies.set("isVerified", decoded.isVerified);
          // Cookies.set("verifiedByEhub", decoded.verifiedByEhub);
          // Cookies.set("mobile", decoded.mobile);
          // Cookies.set("_id", decoded._id);
          // Cookies.set("name", response.data.name);
          // Cookies.set("refresh_token", response.data.refreshToken);
          Cookies.set("userName", response.data.userName, { expires: 1 / 24 / 4 });
          // Cookies.set("institutionName", response.data.institutionName);
          Cookies.set("email", response.data.email, { expires: 1 / 24 / 4 });
          // Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain));
          sessionStorage.setItem("OtpRoute", true);
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202 ||
            response.status === 203 ||
            response.status === 204
          ) {
            setLoading(false);
            window.location.href = `/otp-verification`;
            // if (sessionStorage.getItem("redirectToAuth") === "true") {
            //   sessionStorage.removeItem("redirectToAuth");
            //   navigate(sessionStorage.getItem("redirectToAuthLink"));
            //   sessionStorage.removeItem("redirectToAuthLink");
            // } else navigate("/");
            // window.location.reload(true);
          }
        })
        .catch((error) => {
          setSnackbarValues({
            severity: "error",
            message: error?.response?.data?.message || "Something went wrong",
          });
          setOpen(true);
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
      // if (err && err instanceof AxiosError)
      //   setError(err.response?.data.message);
      // else if (err && err instanceof Error) setError(err.message);
      // setSnackbarValues({
      //   severity: "error",
      //   message: "Invalid Credentials!",
      // });
      // setOpen(true);
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

  const validateConfirmPassword = () => {
    let errorMessage = "";
    // let allErrors = [];
    if(values.confirmPassword!== values.password)
    {
      errorMessage = "confirm password not matched"
    }
    // if (values.confirmPassword.length < 8) {
    //   allErrors.push(" 8 characters");
    //   // errors.password = "Password must be at least 8 characters long.";
    // }
    // if (!/[A-Z]/.test(values.confirmPassword)) {
    //   allErrors.push(" 1 uppercase character");
    //   // errors.password =
    //   //   "Password must contain at least one uppercase character.";
    // }
    // if (!/[a-z]/.test(values.confirmPassword)) {
    //   allErrors.push(" 1 lowercase character");
    //   // errors.password =
    //   //   "Password must contain at least one lowercase character.";
    // }
    // if (!/\d/.test(values.confirmPassword)) {
    //   allErrors.push(" 1 numeric character");
    //   // errors.password = "Password must contain at least one numeric character.";
    // }
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.confirmPassword)) {
    //   allErrors.push(" 1 special character");
    //   // errors.password = "Password must contain at least one special character.";
    // }
    // if (allErrors.length > 0) {
    //   errorMessage += allErrors.join(",");
    //   errorMessage += ".";
    // }
     else {
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
  const handleConfirmPassword =()=>{
    let checkPassword = validateConfirmPassword();
    if (checkPassword.length !== 0 && values.password !== "")
    {
      setSnackbarValues({
        severity: "error",
        message: checkPassword,
      });
      setOpen(true);
    }
  }

  const validateRole = () => {
    if (!values.role)
      setSnackbarValues({
        severity: "error",
        message: "Please select a role",
      });
    setOpen(true);
  };
  const validateFirstName=()=>{
    const firstNameRegex=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,27}$/;
    if(firstNameRegex.test(values.firstName)===false && values.firstName!=="")
    {
      setSnackbarValues({
        severity: "error",
        message: "Please enter a valid first Name!",
      })
      setOpen(true);
    }
  };
  const validateLastName=()=>{
    const LastNameRegex=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,27}$/;
    if(LastNameRegex.test(values.lastName)===false && values.lastName!=="")
    {
      setSnackbarValues({
        severity: "error",
        message: "Please enter a valid Last Name!",
      })
      setOpen(true);
    }
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
      <div className="container">
        <div className="row d-flex justify-content-center">
          {/* <div
            className="col-lg-7 login-left-container"
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
                  padding: "0px 0px 30px 0px",
                }}
              >
                Sign Up
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
                <input
                  className="reg-input"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={validateFirstName}
                  required
                />
              </div>
              <div className="form-cont ">
                <input
                  className="reg-input"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  required
                  onBlur={validateLastName}
                />
              </div>
              <div className="form-cont ">
          
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
                  onBlur={handlePassword}
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
              <div className="form-cont passwordContainer">
                <input
                  autoComplete="off"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  className="reg-input"
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleConfirmPassword}
                  // focused={focused.toString()}
                  required
                />
                <div>
                  <IconButton
                    onClick={() => handleClickShowConfirmPassword()}
                    className="positionRelBottom"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>
              <div className="form-cont">
                <button
                  className="my-btn reg-si registerSSS"
                  type="submit"
                  // onClick={navigation}
                >
                  {loading ? "Loading..." : "Sign up"}
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
                <span className="d-flex justify-content-center p-2" style={{textWrap:"nowrap"}}>or</span>
                <hr />
              </div>

              <div className="sign-field reg-field">
                {/* <div className="sign-opt "> */}
                  {/* <div> */}
                    <GoogleButton onClick={handleLogin}>
                      Sign Up with Google
                    </GoogleButton>
                  {/* </div> */}
                {/* </div> */}
              </div>

              <div className="my-item-cont">
                <div>Already have an account?</div>
                <Link
                  to="/login
              "
                  className="f-p "
                >
                  Sign In
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
    </main>
  );
};

export default SignupUser;
