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
    >
      <Link to="/" className="navbar-logo">
        <img src={`${bucket}logo.svg`} alt="" />
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
          <button
            className={`${selectedPageNavbar === "host" ? "--is-active" : ""}`}
            data-bs-toggle="dropdown"
          >
            Host <IoIosArrowDown />
          </button>
          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item dropdown-heading">
                To engage your audience
              </span>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Cultural Event
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Technical Event
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Hackathons
              </Link>
            </li>
            <li style={{ marginBottom: "0" }}>
              <Link className="dropdown-item" to="/">
                Webinars
              </Link>
            </li>
            <li style={{ margin: ".75rem 0" }}>
              <hr className="dropdown-divider" />
            </li>
            <li style={{ marginTop: "0" }}>
              <span className="dropdown-item dropdown-heading">
                Create jobs for right talent
              </span>
            </li>
            <li>
              <Link
                onClick={() => setSelectedPageNavbar("host")}
                className="dropdown-item"
                to="/host/job"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSelectedPageNavbar("host")}
                className="dropdown-item"
                to="/host/internship"
              >
                Internships
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSelectedPageNavbar("host")}
                className="dropdown-item"
                to="/host/project"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSelectedPageNavbar("host")}
                className="dropdown-item"
                to="/host/event"
              >
                Event Hiring
              </Link>
            </li>
          </ul>
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
            <img src={userImage} alt="" />
          </div>
          <span className="user-full-name">{name}</span>
        </div>
      )}
    </nav>
  );
}
