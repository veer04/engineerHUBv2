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
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("User");
  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    // Check if user is logged in by checking for the 'userName' cookie
    const storedName = getCookie("name");
    const storedUserID = getCookie("_id");
    const storedRole = getCookie("role");
    if (storedName) {
      setIsLoggedIn(true);
      setName(decodeURIComponent(storedName));
    }
    if (storedUserID) {
      setUserId(decodeURIComponent(storedUserID));
    }
    if (storedRole) {
      if (decodeURIComponent(storedRole) === "User") {
        setRole("student");
      } else if (decodeURIComponent(storedRole) === "Alumni") {
        setRole("alumni");
      } else if (decodeURIComponent(storedRole) === "Club") {
        setRole("club");
      } else {
        setRole("organization");
      }
    }
  }, []);

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

  const usernameLoginInButton = (
    <ButtonRounded
      onClick={() => {
        // navigate("/profile");
      }}
      className="nav-logged-in-btn nav-login-btn"
    >
      <img className="nav-user-thumbnail" src={thumbnail} alt="user" />
      <span className="nav-username">{name}</span>
    </ButtonRounded>
  );

  // const handleLogin = () => {
  //   navigate("/login");
  //   // window.location.reload(true);
  // };

  const loginInButton = (
    <ButtonRounded onClick={() => handleLogin()} className="nav-login-btn">
      Login
    </ButtonRounded>
  );

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

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
      id="bootstrap-overrides"
      className="navbar navbar-expand-md bg-body-tertiary"
      style={{
        paddingLeft: adjustmentPadding,
        paddingRight: adjustmentPadding,
      }}
    >
      <div className="container-fluid d-flex justify-content-between flex-row ">
        <a href="/" className="navbar-brand">
          <img className="logo" src={`${bucket}logo.svg`} alt="Logo" />
        </a>
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
              to="/host"
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

        <div className="login-btn-div">
          {isLoggedIn ? (
            <div>
              {/* <span>Hi, {name}</span>{" "}
              <div
                className="logBtn"
                style={{
                  textAlign: "center",
                }}
                onClick={handleLogout}
              >
                Logout
              </div> */}
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                className="nav-logged-in-btn nav-login-btn logBtn"
              >
                {/* <img
                  className="nav-user-thumbnail"
                  src={thumbnail}
                  alt="user"
                /> */}
                <span className="nav-username text-nowrap">
                  Hi, {name.split(" ")[0]}
                </span>
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="nav-login-btn logBtn">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
