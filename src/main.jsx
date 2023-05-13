import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import MobileNavbarProvider from "./contexts/MobileNavbarContext";
import SidebarProvider from "./contexts/SidebarContext";
import NavbarProvider from "./contexts/NavbarContext";
import { EventModalProvider } from "./contexts/EventModalContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <EventModalProvider>
          <MobileNavbarProvider>
            <NavbarProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </NavbarProvider>
          </MobileNavbarProvider>
        </EventModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
