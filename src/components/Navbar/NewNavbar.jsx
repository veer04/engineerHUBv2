import "./NewNavbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bucket_URL } from "../../services/APIUtils";
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

  // this adjustment is done for screen sizes above 1920px (or root div's max-width) to make the navbar go full stretch on bigger screens. You can comment out the style attribute on nav tag to see how this works.
  const adjustmentPadding =
    width >= 1920
      ? `${(width - 1920) / 2 + 166.56}px`
      : "var(--section-padding)";

  const HostSvg = (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.7021 11C21.7021 5.47715 17.2249 1 11.7021 1C6.1793 1 1.70215 5.47715 1.70215 11C1.70215 16.5228 6.1793 21 11.7021 21C17.2249 21 21.7021 16.5228 21.7021 11Z"
        fill="white"
        stroke="#138382"
        stroke-width="1.5"
      />
      <path
        d="M11.7011 7V15M15.7011 11H7.70105"
        stroke="#138382"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

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
        <Link onClick={() => setSelectedPageNavbar("career")} to="/career">
          <button
            className={`${
              selectedPageNavbar === "career" ? "--is-active" : ""
            }`}
          >
            Career
          </button>
        </Link>
        <Link onClick={() => setSelectedPageNavbar("services")} to="/referrals">
          <button
            className={`${
              selectedPageNavbar === "services" ? "--is-active" : ""
            } services-btn`}
          >
            Referrals
            {/* <span
              className={`${
                selectedPageNavbar === "services" ? "--is-active" : ""
              } new-badge`}
            >
              New
            </span> */}
          </button>
        </Link>
      </div>
      {!isLoggedIn && (
        <div className="login-options">
          <Link to="/host" className="nav-link">
            <button className="host-btn">{HostSvg} Host</button>
          </Link>
          <div className="divider"></div>
          <Link to="/login" className="nav-link">
            <button className="login-btn">Login</button>
          </Link>
          {/* <Link to="/select-role" className="nav-link">
            <button className="join-us-btn">Join Us</button>
          </Link> */}
        </div>
      )}
      {isLoggedIn && (
        <div className="d-flex align-items-center justify-content-center gap-2 flex-row">
          <div className="login-options ">
            <Link to="/host" className="nav-link d-flex flex-row flex-nowrap">
              <button style={{ marginRight: "24px" }} className="host-btn">
                {HostSvg} Host
              </button>
              <div style={{ marginRight: "18px" }} className="divider"></div>
            </Link>
          </div>
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
            {/* <span className="user-full-name">{name}</span> */}
          </div>
        </div>
      )}
      <div className="pages" style ={{ display :  "flex"}}>
      <Link onClick={() => setSelectedPageNavbar("enterprise")} to="/enterprise">
      <button
        className={`${
          selectedPageNavbar === "enterprise" ? "--is-active" : ""
        } services-btn`}
      >
        For Employers
        {/* <span
          className={`${
            selectedPageNavbar === "services" ? "--is-active" : ""
          } new-badge`}
        >
          New
        </span> */}
      </button>
    </Link>
    </div>
    </nav>
  );
}
