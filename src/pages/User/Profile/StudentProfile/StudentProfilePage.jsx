import React, { useState, useEffect } from "react";
import "./StudentProfilePage.css";
import useNavbar from "../../../../hooks/use-navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import { controller, getUserProfileById } from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import jwt_decode from "jwt-decode";
import { AiOutlineEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePlace } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { RiListOrdered } from "react-icons/ri";

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("general");
  const [width, setWidth] = useState(window.innerWidth);
  const { setSelectedPageNavbar } = useNavbar();
  const navigate = useNavigate();
  let isLoggedIn = false;
  const token = getAccessToken();
  if (token === undefined || token === null || token === "") {
    isLoggedIn = false;
  } else {
    const loggedInId = jwt_decode(token)._id;
    isLoggedIn = loggedInId === userId;
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("profile");
    getUserProfileById(setProfile, userId);

    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [profile]);

  useEffect(() => {
    if (window.location.pathname.split("/").includes("general")) {
      setChoice("general");
    } else if (window.location.pathname.split("/").includes("edit")) {
      setChoice("edit");
    } else if (window.location.pathname.split("/").includes("address")) {
      setChoice("address");
    } else if (window.location.pathname.split("/").includes("social-media")) {
      setChoice("social-media");
    } else if (window.location.pathname.split("/").includes("tech-stack")) {
      setChoice("tech-stack");
    }
  }, [window.location.pathname]);

  const profilePage = (
    <main className="profile-page">
      <header className="heading-3">Profile</header>
      <section>
        <aside className="options-container">
          <button
            onClick={() => {
              if (choice !== "general") {
                navigate(`general`);
                window.location.reload();
              }
            }}
            className={`option ${choice === "general" ? "--is-selected" : ""}`}
          >
            {width <= 768 ? <CgProfile /> : "User Profile"}
          </button>
          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate(`edit`);
                }}
                className={`option ${choice === "edit" ? "--is-selected" : ""}`}
              >
                {width <= 768 ? <AiOutlineEdit /> : "Edit Profile"}
              </button>
              <button
                onClick={() => {
                  navigate(`address`);
                }}
                className={`option ${
                  choice === "address" ? "--is-selected" : ""
                }`}
              >
                {width <= 768 ? <MdOutlinePlace /> : "Change Address"}
              </button>
              <button
                onClick={() => {
                  navigate(`social-media`);
                }}
                className={`option ${
                  choice === "social-media" ? "--is-selected" : ""
                }`}
              >
                {width <= 768 ? <FiExternalLink /> : "Social Media Links"}
              </button>
              <button
                onClick={() => {
                  navigate(`tech-stack`);
                }}
                className={`option ${
                  choice === "tech-stack" ? "--is-selected" : ""
                }`}
              >
                {width <= 768 ? <RiListOrdered /> : "Tech Stack"}
              </button>
            </>
          )}
        </aside>
        <div className="details-container">
          <Outlet context={[profile, isLoggedIn]} />
        </div>
      </section>
    </main>
  );

  return isLoading ? <LoadingPage /> : profilePage;
}
