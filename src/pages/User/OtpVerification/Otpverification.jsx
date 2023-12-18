import "../Signup/Signup.css";
import "./Otpverification.css";
import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import useNavbar from "../../../hooks/use-navbar";
import { API_URL } from "../../../services/APIUtils";
import SimpleInputField from "../../../components/SimpleInputField/SimpleInputField";
import jwt_decode from "jwt-decode";
const OTP = () => {
  const { setSelectedPageNavbar } = useNavbar();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const [email, setEmail] = useState(
    Cookies.get("email") ? Cookies.get("email") : ""
  );
  // const[email, setEmail] =useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();

    const Result = {
      email: email,
      role: Cookies.get("role"), //get The role from the response of the backend
      OTP: otp,
    };
    console.log(Result);

    axios
      .patch(`${API_URL}api/v1/signup/verify`, Result)
      .then((response) => {
        Cookies.set("access_token", response.data.accessToken);
        const token = response.data.accessToken;
        const decoded = jwt_decode(token);
        Cookies.set("refresh_token", response.data.refreshToken);
        Cookies.set("userName", response.data.userName);
        Cookies.set("institutionName", response.data.institutionName);
        Cookies.set("email", response.data.email);
        Cookies.set("role", decoded.role);
        Cookies.set("image", decoded.image);
        Cookies.set("isVerified", "true");
        Cookies.set("verifiedByEhub", decoded.verifiedByEhub);
        Cookies.set("mobile", decoded.mobile);
        Cookies.set("name", response.data.name);
        if (decoded.role === "User" || decoded.role === "Alumni") {
          Cookies.set("firstName", decoded.firstName);
          Cookies.set("lastName", decoded.lastName);
          Cookies.set("name", decoded.firstName.concat(" ", decoded.lastName));
        }
        Cookies.set("_id", decoded._id);
        Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain));

        if (response.data.success) {
          changeRouteValue();
          setLoading(false);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Invalid OTP");
        console.error(error);
      });
  };
  const changeRouteValue = () => {
    sessionStorage.setItem("OtpRoute", "false");
  };

  return (
    <>
      <div className="Login">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-3 sideMenuLogin">
          <div className="row">
            {/* <div className="col-lg-3 sideMenuLogin">
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
                </div> */}
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <p className="headerOtpVerification">Verify Email</p>
              <div className="container otpBox">
                <div className="otpVbox">
                  <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <SimpleInputField
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      disabled
                    />
                    {/* <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      /> */}
                    {/* <label> */}
                    {/* Role:
                      <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                      >
                        <option value="User">Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Club">Club</option>
                        <option value="Organization">Organization</option>
                      </select> */}
                    {/* </label> */}
                    <label>OTP:</label>

                    <SimpleInputField
                      value={otp}
                      setValue={setOtp}
                      type="text"
                      maxLength={6}
                      pattern="[0-9]*"
                      required
                      id="otp"
                    />
                    {/* <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        maxLength={6}
                        pattern="[0-9]*"
                        required
                      /> */}
                    <button className="logBtn logout-btn" type="submit">
                      {loading ? "Loading..." : "Verify"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OTP;
