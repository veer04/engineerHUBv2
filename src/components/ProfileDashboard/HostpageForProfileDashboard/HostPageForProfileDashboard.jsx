import React from "react";
import "./hostpageforprofiledashboard.css";

import { FaBullhorn } from "react-icons/fa";
import CreatePostCard from "./CreatePostCard";
import CreateJobCard from "./CreateJobCard";
import CreateInternshipCard from "./CreateInternshipCard";
import Createprojects from "./CreateProjects";
import CreateEventHiring from "./CreateEventHiring";
import TechnicalEventComp from "./TechnicalEventComp";
import CulturalEventComp from "./CulturalEventComp";

const HostPageForProfileDashboard = () => {
  return (
    <div className="host-page-main-profile-dashboard">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <FaBullhorn size={18} />
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Host
        </h3>
      </div>

      <div className="post-create-main-sub">
        {/* <CreatePostCard /> */}
        <CreateJobCard />
        <TechnicalEventComp />
        <CulturalEventComp />
        <CreateInternshipCard />
        {/* <Createprojects /> */}
        <CreateEventHiring />
      </div>
    </div>
  );
};

export default HostPageForProfileDashboard;
