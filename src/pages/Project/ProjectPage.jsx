import React from "react";
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ProjectPage() {
  const { id } = useParams();

  return (
    <div className="project-page">
      <Sidebar />
    </div>
  );
}
