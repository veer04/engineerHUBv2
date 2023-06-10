import React, { useState, useEffect } from "react";
import "./StudentProfilePage.css";
import useNavbar from "../../../../hooks/use-navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import { controller, getUserProfileById } from "../../../../services/APIConfig";

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("general");
  const { setSelectedPageNavbar } = useNavbar();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("profile");
    getUserProfileById(setProfile, userId);

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
            User Profile
          </button>
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
              navigate(`address`);
            }}
            className={`option ${choice === "address" ? "--is-selected" : ""}`}
          >
            Change Address
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
          <button
            onClick={() => {
              navigate(`tech-stack`);
            }}
            className={`option ${
              choice === "tech-stack" ? "--is-selected" : ""
            }`}
          >
            Tech Stack
          </button>
        </aside>
        <div className="details-container">
          <Outlet context={[profile]} />
        </div>
      </section>
    </main>
  );

  return isLoading ? <LoadingPage /> : profilePage;
}
