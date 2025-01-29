import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useNavbar from "../../hooks/use-navbar";
import { API_URL, API_URLT } from "../../services/APIUtils";

const Success = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [me, setMe] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Redirecting | engineerHUB";
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URLT}api/v1/auth/details`, {
          withCredentials: true,
        });

        console.log(response.data);
        console.log(response.data.success);
        setMe(response.data);

        if (response.data.success === true) {
          const decoded = jwt_decode(response.data.accessToken);
          const _id = decoded._id;
          const firstName = decoded.firstName;
          const lastName = decoded.lastName;
          const name = firstName.concat(" ", lastName);

          Cookies.set("access_token", response.data.accessToken, { expires: 400 });
          Cookies.set("name", name, { expires: 400 });
          Cookies.set("firstName", firstName, { expires: 400 });
          Cookies.set("lastName", lastName, { expires: 400 });
          Cookies.set("userName", decoded.userName, { expires: 400 });
          Cookies.set("email", decoded.email, { expires: 400 });
          Cookies.set("_id", _id, { expires: 400 });
          Cookies.set("image", decoded.image, { expires: 400 });
          Cookies.set("role", decoded.role, { expires: 400 });
          Cookies.set("mobile", decoded.mobile, { expires: 400 });
          Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain), { expires: 400 });

          if (sessionStorage.getItem("redirectToAuth") === "true") {
            sessionStorage.removeItem("redirectToAuth");
            window.location.href = sessionStorage.getItem("redirectToAuthLink");
            sessionStorage.removeItem("redirectToAuthLink");
          } else {
            window.location.href = `/profile/user/${_id}`;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Polling logic
    let attempts = 0;
    const intervalId = setInterval(() => {
      if (attempts < 4) {
        attempts++;
        fetchData();
      } else {
        clearInterval(intervalId);
        setErrorMessage("OOPs! Login failed due to network error try again.");
      }
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "600",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "-4rem",
        }}
      >
        {errorMessage ? (
          <div style={{ color: "" }}>{errorMessage}</div>
        ) : (
          <>
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>
              You’re being redirected to another page, this may take a few seconds
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Success;
