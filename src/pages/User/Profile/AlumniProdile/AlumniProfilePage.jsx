import React, { useState, useEffect } from "react";
import "./AlumniProfilePage.css";
import useNavbar from "../../../../hooks/use-navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import {
  controller,
  getAlumniProfileById,
  getUserProfileById,
} from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import jwt_decode from "jwt-decode";

export default function AlumniProfilePage() {
  const { alumniId } = useParams();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("general");
  const { setSelectedPageNavbar } = useNavbar();
  const navigate = useNavigate();
  let isLoggedIn = false;
  const token = getAccessToken();
  if (token === undefined || token === null || token === "") {
    isLoggedIn = false;
  } else {
    const loggedInId = jwt_decode(token)._id;
    isLoggedIn = loggedInId === alumniId;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("profile");
    getAlumniProfileById(setProfile, alumniId);

    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setProfile({
        ...profile,
        isLoggedIn: isLoggedIn,
      });
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
    } else if (window.location.pathname.split("/").includes("social-media")) {
      setChoice("social-media");
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
            User Profile
          </button>
          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate(`edit`);
                }}
                className={`option ${choice === "edit" ? "--is-selected" : ""}`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  navigate(`social-media`);
                }}
                className={`option ${
                  choice === "social-media" ? "--is-selected" : ""
                }`}
              >
                Social Media Links
              </button>
            </>
          )}
        </aside>
        <div className="details-container">
          <Outlet context={[profile]} />
        </div>
      </section>
    </main>
  );

  return isLoading ? <LoadingPage /> : profilePage;
}
