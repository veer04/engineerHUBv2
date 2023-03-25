import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CourseContextProvider } from "./context/CourseContext";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CourseContextProvider>
    <React.StrictMode>
<AuthProvider
authType={"cookie"}
authName={"_auth"}
cookieDomain={window.location.hostname}
cookieSecure={false}
>
<App />
</AuthProvider>
    </React.StrictMode>
  </CourseContextProvider>
 
);

reportWebVitals();
