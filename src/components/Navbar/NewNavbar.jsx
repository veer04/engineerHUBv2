import "./NewNavbar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bucket_URL } from "../../services/APIUtils";
import { IoIosArrowDown } from "react-icons/io";
import {
  getUserFullName,
  getUserImage,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import useNavbar from "../../hooks/use-navbar";
import { useScrollDirection } from "../../features/scrollDirection";

export default function NewNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();

  const bucket = `${Bucket_URL}frontend/navbar/`;

  useEffect(() => {
    setUserImage(getUserImage());
    setIsLoggedIn(isUserLoggedIn());
    setName(getUserFullName());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => setWidth(window.innerWidth);

  // this adjustment is done for screen sizes above 1920px (or root div's max-width) to make the navbar go full stretch on bigger screens. You can comment our the style attribute on nav tag to see how this works.
  const adjustmentPadding =
    width >= 1920
      ? `${(width - 1920) / 2 + 166.56}px`
      : "var(--section-padding)";

  return (
    <nav
      style={{
        paddingLeft: adjustmentPadding,
        paddingRight: adjustmentPadding,
      }}
      id="navbar"
      className={`${
        useScrollDirection() === "down" ? "--is-hidden" : "--is-shown"
      }`}
    >
      <Link to="/" className="navbar-logo">
        <img src={`${bucket}logo.svg`} alt="engineerHUB logo" loading="lazy" />
      </Link>
      <div className="pages">
        <Link
          onClick={() => setSelectedPageNavbar("community")}
          to="/community"
        >
          <button
            className={`${
              selectedPageNavbar === "community" ? "--is-active" : ""
            }`}
          >
            Community
          </button>
        </Link>
        <Link onClick={() => setSelectedPageNavbar("campus")} to="/campus">
          <button
            className={`${
              selectedPageNavbar === "campus" ? "--is-active" : ""
            }`}
          >
            Campus
          </button>
        </Link>
        <Link onClick={() => setSelectedPageNavbar("company")} to="/company">
          <button
            className={`${
              selectedPageNavbar === "company" ? "--is-active" : ""
            }`}
          >
            Company
          </button>
        </Link>
        <div className="dropdown">
          <Link onClick={() => setSelectedPageNavbar("host")} to="/host">
            <button
              className={`${
                selectedPageNavbar === "host" ? "--is-active" : ""
              }`}
            >
              Host
            </button>
          </Link>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="login-options">
          <Link to="/login" className="nav-link">
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/select-role" className="nav-link">
            <button className="join-us-btn">Join Us</button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="logged-in-container"
        >
          <div className="profile-picture-container">
            <img
              src={userImage}
              alt={`${name}'s profile picture`}
              loading="lazy"
            />
          </div>
          <span className="user-full-name">{name}</span>
        </div>
      )}
    </nav>
  );
}
