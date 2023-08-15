import React, { useState, useEffect } from "react";
import "../StudentProfile/StudentProfilePage.css";
import useNavbar from "../../../../hooks/use-navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import { controller, getClubProfileById } from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import jwt_decode from "jwt-decode";
import { AiOutlineEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePlace } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { RiListOrdered } from "react-icons/ri";
import { HiOutlinePhoto } from "react-icons/hi2";

export default function ClubProfilePage() {
  const { clubId } = useParams();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("general");
  const { setSelectedPageNavbar } = useNavbar();
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  let isLoggedIn = false;
  const token = getAccessToken();
  if (token === undefined || token === null || token === "") {
    isLoggedIn = false;
  } else {
    const loggedInId = jwt_decode(token)._id;
    isLoggedIn = loggedInId === clubId;
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
    getClubProfileById(setProfile, clubId);

    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

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
    } else if (window.location.pathname.split("/").includes("cover-photo")) {
      setChoice("cover-photo");
    }
    else if (window.location.pathname.split("/").includes("edit-post")) {
      setChoice("edit-post");
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
            </>
          )}
          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate(`cover-photo`);
                }}
                className={`option ${
                  choice === "cover-photo" ? "--is-selected" : ""
                }`}
              >
                {width <= 768 ? <HiOutlinePhoto /> : "Edit Cover Photos"}
              </button>
              <button
                onClick={() => {
                  navigate(`edit-post`);
                }}
                className={`option ${
                  choice === "edit-post" ? "--is-selected" : ""
                }`}
              >
                {width <= 768 ? <HiOutlinePhoto /> : "Edit Posts"}
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
