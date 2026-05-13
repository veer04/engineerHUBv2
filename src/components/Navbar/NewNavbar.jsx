import "./NewNavbar.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bucket_URL } from "../../services/APIUtils";
import {
  getUserFullName,
  getUserImage,
  getUserRole,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import useNavbar from "../../hooks/use-navbar";
import { useScrollDirection } from "../../features/scrollDirection";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import useChatNotifications from "../../hooks/useChatNotifications";
import { ENABLE_COMMUNITY_CHAT } from "../../config/featureFlags";
import { FaUserTie } from "react-icons/fa";

export default function NewNavbar() {
  const DEFAULT_PROFILE_IMAGE = `${Bucket_URL}ui/banners/Student.png`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [userRole, setUserRole] = useState(null);

  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();
  const { notificationData } = useChatNotifications();
  const location = useLocation();
  const isEmployerRoute = location.pathname.startsWith("/employer");
  const isLoginRoute = location.pathname.startsWith("/login");
  const isSignupRoute =
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/select-role") ||
    location.pathname.startsWith("/club-signup") ||
    location.pathname.startsWith("/organization-signup");

  const [profilePhotoBroken, setProfilePhotoBroken] = useState(false);

  const handleResize = () => setWidth(window.innerWidth);

  const profilePhotoAlt = name?.trim()
    ? `${name} profile photo`
    : "Your profile photo";

  const profileInitials = (() => {
    const t = name?.trim();
    if (!t) return "?";
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return t.slice(0, 2).toUpperCase();
  })();

  //const bucket = `${Bucket_URL}frontend/navbar/`;

  useEffect(() => {
    const updateUserImage = () => {
      setProfilePhotoBroken(false);
      const cookieImage = getUserImage();
      setUserImage(
        cookieImage &&
          cookieImage !== "undefined" &&
          cookieImage !== "null" &&
          cookieImage.trim() !== ""
          ? cookieImage
          : DEFAULT_PROFILE_IMAGE
      );
    };

    updateUserImage();
    setIsLoggedIn(isUserLoggedIn());
    setName(getUserFullName());
    setUserRole(getUserRole());
    window.addEventListener("resize", handleResize);
    window.addEventListener("user-image-updated", updateUserImage);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("user-image-updated", updateUserImage);
    };
  }, [DEFAULT_PROFILE_IMAGE]);

  useEffect(() => {
    const p = location.pathname;
    if (p.startsWith("/employer")) {
      setSelectedPageNavbar("enterprise");
    } else if (p.startsWith("/login")) {
      setSelectedPageNavbar("auth-login");
    } else if (
      p.startsWith("/signup") ||
      p.startsWith("/select-role") ||
      p.startsWith("/club-signup") ||
      p.startsWith("/organization-signup")
    ) {
      setSelectedPageNavbar("auth-register");
    }
  }, [location.pathname, setSelectedPageNavbar]);

  useEffect(() => {
    setProfilePhotoBroken(false);
  }, [isLoggedIn]);

  const handleCommunityChatClick = () => {
    setSelectedPageNavbar("community chat");
    // Don't clear navbar badge immediately - let user see which groups have notifications
    // The badge will be cleared when they click on a specific group
  };

  // this adjustment is done for screen sizes above 1920px (or root div's max-width) to make the navbar go full stretch on bigger screens. You can comment out the style attribute on nav tag to see how this works.
  const adjustmentPadding =
    width >= 1920
      ? `${(width - 1920) / 2 + 166.56}px`
      : "var(--section-padding)";

  const adjustmentPaddingRight =
    width <= 820 ? "max(0.5rem, env(safe-area-inset-right, 0px))" : adjustmentPadding;

  // const HostSvg = (
  //   <svg
  //     width="23"
  //     height="22"
  //     viewBox="0 0 23 22"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M21.7021 11C21.7021 5.47715 17.2249 1 11.7021 1C6.1793 1 1.70215 5.47715 1.70215 11C1.70215 16.5228 6.1793 21 11.7021 21C17.2249 21 21.7021 16.5228 21.7021 11Z"
  //       fill="white"
  //       stroke="#138382"
  //       stroke-width="1.5"
  //     />
  //     <path
  //       d="M11.7011 7V15M15.7011 11H7.70105"
  //       stroke="#138382"
  //       stroke-width="1.5"
  //       stroke-linecap="round"
  //       stroke-linejoin="round"
  //     />
  //   </svg>
  // );

  return (
    <nav
      style={{
        paddingLeft: adjustmentPadding,
        paddingRight: adjustmentPaddingRight,
      }}
      id="navbar"
      className={`${
        useScrollDirection() === "down" ? "--is-hidden" : "--is-shown"
      }`}
    >
      <Link to="/" className="navbar-logo">
        <img src={`${Bucket_URL}ui/icons/engineerhub_logo.svg`} alt="engineerHUB logo" loading="lazy" />
      </Link>
      <div className="pages">
        {ENABLE_COMMUNITY_CHAT &&
          userRole !== "Organization" &&
          userRole !== "Club" && (
          <Link
            onClick={handleCommunityChatClick}
            to="/Chat"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button
              className={`${
                selectedPageNavbar === "community" ? "--is-active" : ""
              }`}
            >
              Community Chat
            </button>
            <NotificationBadge 
              count={notificationData.count}
              type={notificationData.type}
            />
          </Link>
        )}
        {/*
        <Link onClick={() => setSelectedPageNavbar("campus")} to="/campus">
          <button
            className={`${
              selectedPageNavbar === "campus" ? "--is-active" : ""
            }`}
          >
            Campus
          </button>
        </Link>
        */}
        
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
      <div className="navbar-trailing">
        <div className="navbar-trailing-auth navbar-trailing-auth--desktop">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="navbar-auth-link"
                onClick={() => setSelectedPageNavbar("auth-login")}
              >
                <button
                  type="button"
                  className={`navbar-auth-chip ${
                    isLoginRoute ? "navbar-auth-chip--active" : ""
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link
                to="/select-role"
                className="navbar-auth-link"
                onClick={() => setSelectedPageNavbar("auth-register")}
              >
                <button
                  type="button"
                  className={`navbar-auth-chip ${
                    isSignupRoute ? "navbar-auth-chip--active" : ""
                  }`}
                >
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              className="logged-in-container navbar-trailing-profile"
            >
              <div className="profile-picture-container">
                {!profilePhotoBroken ? (
                  <img
                    src={userImage}
                    alt={profilePhotoAlt}
                    title={profilePhotoAlt}
                    loading="lazy"
                    onError={() => {
                      setProfilePhotoBroken(true);
                    }}
                  />
                ) : (
                  <span
                    className="navbar-profile-fallback"
                    role="img"
                    aria-label={profilePhotoAlt}
                    title={profilePhotoAlt}
                  >
                    {profileInitials}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className="navbar-trailing-divider navbar-trailing-divider--desktop"
          aria-hidden
        />
        <div className="navbar-employer-wrap">
          <Link
            className="navbar-employer-link"
            onClick={() => setSelectedPageNavbar("enterprise")}
            to="/employer"
          >
            <button
              type="button"
              className={`navbar-employer-btn ${
                isEmployerRoute ? "navbar-employer-btn--active" : ""
              }`}
            >
              <FaUserTie className="navbar-employer-icon" aria-hidden />
              <span>{width < 600 ? "Employer" : "For Employers"}</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
