import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CommunityPage from "./pages/Community/CommunityPage";
import ProjectPage from "./pages/Community/Project/ProjectsPage";
import BlogsPage from "./pages/Community/Blogs/BlogsPage";
import EventsPage from "./pages/Community/Events/EventsPage";
import SidebarProvider from "./contexts/SidebarContext";
import ChatPage from "./pages/Community/Chat/ChatPage";
import Navbar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Events from "./Components/Company/Events/events";
import Jobs from "./Components/Company/Jobs/jobs";
import Company from "./Components/Company/Company";

function App() {
  return (
    <>
      <Navbar />
      <SidebarProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/community">
            <Route path="domains" element={<CommunityPage path="domains" />} />
            <Route path="projects">
              <Route path=":id" element={<ProjectPage path="projects" />} />
            </Route>
            <Route path="blogs">
              <Route path=":id" element={<BlogsPage path="blogs" />} />
            </Route>
            <Route path="events">
              <Route path=":id" element={<EventsPage path="events" />} />
            </Route>
            <Route path="chat">
              <Route path=":id" element={<ChatPage path="chat" />} />
            </Route>
          </Route>
          <Route path="/campus" element={<>Campus page</>} />
          <Route path="/company">
            <Route path="" element={<Company />} />
            <Route path="jobs">
              <Route path="" element={<Jobs />} />
              <Route path=":jobId" element={<Jobs />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path="hackathons/:hackId" element={<Events />} />
              <Route path="competitions/:competeId" element={<Events />} />
            </Route>
          </Route>
          <Route path="/login" element={<>Login page</>} />
        </Routes>
      </SidebarProvider>
      <Footer />
    </>
  );
}
export default App;
