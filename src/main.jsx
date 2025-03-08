import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import SidebarProvider from "./contexts/SidebarContext";
import NavbarProvider from "./contexts/NavbarContext";
import { EventModalProvider } from "./contexts/EventModalContext";
import GlobalSnackbarProvider from "./contexts/GlobalSnackbarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CommunityChatProvider } from "./contexts/CommunityChatContext";
import AppProvider from "./components/AppProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <GlobalSnackbarProvider>
            <CommunityChatProvider>
              <EventModalProvider>
                <NavbarProvider>
                  <SidebarProvider>
                    <AppProvider>
                      <App />
                    </AppProvider>
                    {/* <ReactQueryDevtools /> */}
                  </SidebarProvider>
                </NavbarProvider>
              </EventModalProvider>
            </CommunityChatProvider>
          </GlobalSnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
