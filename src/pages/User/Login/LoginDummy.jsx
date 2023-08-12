import React, { useState, useEffect } from "react";
import axios from "axios";
function LoginDummy() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function getMe() {
      try {
        const response = await axios.get("https://engineerhub-yash.onrender.com/api/v1/auth/details", {
          withCredentials: true,
        });
        // console.log(response.data);
        setMe(response.data);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getMe();
  }, []);

  const handleLogin = () => {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.append("client_id", "111727756822-c6nh6mvi2acqcm51t59r5ummd3tc8j42.apps.googleusercontent.com");
    googleAuthUrl.searchParams.append("redirect_uri", "https://engineerhub-yash.onrender.com/api/v1/auth/google/user/redirect");
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("state", dynamicRedirectUrl);
    googleAuthUrl.searchParams.append("scope", "profile email");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "consent");

    window.location.href = googleAuthUrl.toString();
  };

  if (me) {
    return <p>hi {JSON.stringify(me)}</p>;
  }

  return (
    <>
    </>
    // <div className="App">
    //   <button onClick={handleLogin}>LOGIN WITH GOOGLE</button>
    // </div>
  );
}

export default LoginDummy;