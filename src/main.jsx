import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider
authType={"cookie"}
authName={"_auth"}
cookieDomain={window.location.hostname}
cookieSecure={false}
>

<App />
</AuthProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
