import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const GoogleAuthButton = () => {
  const [me, setMe] = useState(null);

  const handleLogin = async () => {
    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    googleAuthUrl.searchParams.append(
      "client_id",
      "111727756822-c6nh6mvi2acqcm51t59r5ummd3tc8j42.apps.googleusercontent.com"
    );
    googleAuthUrl.searchParams.append(
      "redirect_uri",
      `https://engineerhub-yash.onrender.com/api/v1/auth/google/user/redirect`
    );
    googleAuthUrl.searchParams.append("response_type", "code");
    // googleAuthUrl.searchParams.append("state", dynamicRedirectUrl);
    googleAuthUrl.searchParams.append("scope", "profile email");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "consent");

    // Open the Google login window
    const googleLoginWindow = window.open(googleAuthUrl.toString(), "_blank");

    // Listen for messages from the Google login window
    window.addEventListener("message", async (event) => {
      if (event.origin === window.location.origin) {
        const { type, token } = event.data;

        if (type === "google_login_success" && token) {
          // Close the Google login window
          googleLoginWindow.close();

          // Fetch user details and set cookies
          try {
            const response = await axios.get("https://engineerhub-yash.onrender.com/api/v1/auth/details", {
              withCredentials: true,
            });

            console.log(response.data);
            setMe(response.data);

            if (response.data.success === true) {
              const decoded = jwt_decode(response.data.accessToken);
              const _id = decoded._id;
              Cookies.set("access_token", response.data.accessToken);
              Cookies.set("name", decoded.name);
              Cookies.set("userName", decoded.userName);
              Cookies.set("email", decoded.email);
              Cookies.set("_id", _id);
              Cookies.set("image", decoded.image);
              Cookies.set("role", decoded.role);
              Cookies.set("mobile", decoded.mobile);
              console.log(response.data);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    });
  };

  if (me) {
    return <p>hi {JSON.stringify(me)}</p>;
  }

  return (
    <div className="App">
      <button onClick={handleLogin}>LOGIN WITH GOOGLE</button>
    </div>
  );
};

export default GoogleAuthButton;