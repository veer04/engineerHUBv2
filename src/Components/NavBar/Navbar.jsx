import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ButtonRounded from "../Buttons/ButtonRounded";
import { Bucket_URL } from "../../services/APIUtils";

export default function Navbar() {
  const bucket = `${Bucket_URL}frontend/navbar/`;

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //fetch user data from backend
  const thumbnail = "https://source.unsplash.com/random";
  const userName = "John Doe";

  const usernameLoginInButton = (
    <ButtonRounded className="nav-logged-in-btn nav-login-btn">
      <img className="nav-user-thumbnail" src={thumbnail} alt="user" />
      <span className="nav-username">Hi, {userName}</span>
    </ButtonRounded>
  );

  const loginInButton = (
    <ButtonRounded className="nav-login-btn">Login/Signup</ButtonRounded>
  );

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <Link className="nav-link" to="/community/domains">
              <ButtonRounded className="nav-middle-items">
                Community
              </ButtonRounded>
            </Link>
            <Link className="nav-link" to="/campus">
              <ButtonRounded className="nav-middle-items">Campus</ButtonRounded>
            </Link>
            <Link className="nav-link" to="/company">
              <ButtonRounded className="nav-middle-items">
                Company
              </ButtonRounded>
            </Link>
          </div>
        </div>
        <Link className="nav-link" to="/login">
          {isLoggedIn ? usernameLoginInButton : loginInButton}
        </Link>
      </div>
    </nav>
  );
}
