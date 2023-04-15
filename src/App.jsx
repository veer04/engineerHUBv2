import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import CommunityPage from "./pages/Community/CommunityPage";
import ProjectPage from "./pages/Community/Project/ProjectsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/community">
          <Route path="domains" element={<CommunityPage />} />
          <Route path="project">
            <Route path=":id" element={<ProjectPage />} />
          </Route>
        </Route>
        <Route path="/campus" element={<>Campus page</>} />
        <Route path="/company" element={<>Company page</>} />
        <Route path="/login" element={<>Login page</>} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
