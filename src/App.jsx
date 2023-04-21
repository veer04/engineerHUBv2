import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import CommunityPage from "./pages/Community/CommunityPage";
import ProjectPage from "./pages/Community/Project/ProjectsPage";
import BlogsPage from "./pages/Community/Blogs/BlogsPage";
import EventsPage from "./pages/Community/Events/EventsPage";
import SidebarProvider from "./contexts/SidebarContext";
import ChatPage from "./pages/Community/Chat/ChatPage";
import CampusPage from "./pages/Campus/CampusPage";
import Mentorship from "./Components/1-1Mentorship/Mentorship";
import MentorChat from "./Components/1-1Mentorship/Mentorchat";

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
          <Route path="/mentorChat" element={<MentorChat/>}/>
          <Route path="/campus" element={<CampusPage />} />
          <Route path="/company" element={<>Company page</>} />
          <Route path="/login" element={<>Login page</>} />
          <Route path="/mentorship" element={<Mentorship />} />
        </Routes>
      </SidebarProvider>
      <Footer />
    </>
  );
}
export default App;
