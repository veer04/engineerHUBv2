import React, { useState, useEffect } from "react";
import "./ClubProfilePage.css";
import useNavbar from "../../../../hooks/use-navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import { controller, getClubProfileById } from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import jwt_decode from "jwt-decode";

export default function ClubProfilePage() {
  const { clubId } = useParams();
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
    isLoggedIn = loggedInId === clubId;
  }

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
