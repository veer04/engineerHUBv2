import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonRounded from "../Buttons/ButtonRounded";
import { Bucket_URL } from "../../services/APIUtils";
import Cookies from "js-cookie";
import useNavbar from "../../hooks/use-navbar";

export default function Navbar() {
  const bucket = `${Bucket_URL}frontend/navbar/`;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    // Check if user is logged in by checking for the 'userName' cookie
    const storedUsername = getCookie("userName");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  function handleLogout() {
    // Remove all cookies and log out the user
    const cookiesToRemove = [
      "userName",
      "refresh_token",
      "access_token",
      "email",
      "institutionName",
    ];
    cookiesToRemove.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${window.location.hostname};`;
    });
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  }


  function getCookie(name) {
    // Get the value of a cookie by name
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  //fetch user data from backend
  const thumbnail = "https://source.unsplash.com/random";
  // const userName =   ;

  // const usernameLoginInButton = (
  //   <ButtonRounded className="nav-logged-in-btn nav-login-btn">
  //     <img className="nav-user-thumbnail" src={thumbnail} alt="user" />
  //     <span className="nav-username">Hi, {username}</span>
  //   </ButtonRounded>
  // );

  // const loginInButton = (
  //   <ButtonRounded className="nav-login-btn">Login/Signup</ButtonRounded>
  // );

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

  const handleLogin = () => {
    navigate("/login");
    window.location.reload(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    console.log(isClicked);
  };
  
  const adjustmentPadding =
    width >= 1920
      ? `${(width - 1920) / 2 + 166.56}px`
      : "var(--section-padding)";

  return (
    <nav
      className="navbar navbar-expand-md bg-body-tertiary"
      style={{
        paddingLeft: adjustmentPadding,
        paddingRight: adjustmentPadding,
      }}
    >
      <div className="container-fluid d-flex justify-content-between flex-row ">
        <Link to="/" className="navbar-brand">
          <img className="logo" src={`${bucket}logo.svg`} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="nav-link"
              onClick={() => setSelectedPageNavbar("community")}
              to="/community/domains"
            >
              <ButtonRounded
                className={`nav-middle-items ${
                  selectedPageNavbar === "community" ? "--is-active" : ""
                }`}
              >
                Community
              </ButtonRounded>
            </Link>
            <Link
              className="nav-link"
              onClick={() => setSelectedPageNavbar("campus")}
              to="/campus"
            >
              <ButtonRounded
                className={`nav-middle-items ${
                  selectedPageNavbar === "campus" ? "--is-active" : ""
                }`}
              >
                Campus
              </ButtonRounded>
            </Link>
            <Link
              className="nav-link"
              onClick={() => setSelectedPageNavbar("company")}
              to="/company"
            >
              <ButtonRounded
                className={`nav-middle-items ${
                  selectedPageNavbar === "company" ? "--is-active" : ""
                }`}
              >
                Company
              </ButtonRounded>
            </Link>
            <Link
              className="nav-link"
              onClick={() => setSelectedPageNavbar("host")}
              to="/hosting"
            >
              <ButtonRounded
                className={`nav-middle-items host-btn ${
                  selectedPageNavbar === "host" ? "--is-active" : ""
                }`}
              >
                Host
              </ButtonRounded>
            </Link>
          </div>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="logBtn">
              Hi, {username} | <span onClick={handleLogout}>Logout</span>
              {/* <button className="nav-logged-in-btn nav-login-btn">
                <img
                  className="nav-user-thumbnail"
                  src={thumbnail}
                  alt="user"
                />
                <span className="nav-username">
                  Hi, {username}|
                  <button onClick={handleLogout}>Log out</button>
                </span>
              </button> */}
            </div>
          ) : (
            <div>
              <Link to="/login">
                {" "}
                <button className="nav-login-btn logBtn" onClick={handleLogin}>
                  Login/Signup
                </button>{" "}
              </Link>
            </div>
          )}
        </div>

        {/* <Link className="nav-link" to="/login">
          {isLoggedIn ? username : loginInButton}
        </Link> */}
      </div>
    </nav>
  );
}
