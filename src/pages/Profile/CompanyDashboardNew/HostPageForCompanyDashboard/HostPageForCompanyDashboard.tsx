import React from "react";
import "./hostpageforcompanydashboard.css";

import { FaBullhorn } from "react-icons/fa";
import WebinarCardSaif from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/WebinarCardSaif";
import CreateJobCard from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/CreateJobCard";
import TechnicalEventComp from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/TechnicalEventComp";
import CulturalEventComp from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/CulturalEventComp";
import CreateInternshipCard from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/CreateInternshipCard";
import CreateEventHiring from "../../../../components/ProfileDashboard/HostpageForProfileDashboard/CreateEventHiring";

const HostPageForComapnyDashboard = ({ adminView }) => {
  if (!adminView) {
    return null;
  }

  return (
    <div className="host-page-main-company-dashboard">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <FaBullhorn size={18} />
        <h3
          style={{
            fontSize: 18,
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
        <>
          
          <CreateJobCard />
          {/*
          <TechnicalEventComp />
          <WebinarCardSaif />
          <CulturalEventComp /> */}
          <CreateInternshipCard />
          <CreateEventHiring />
        </>
      </div>
    </div>
  );
};

export default HostPageForComapnyDashboard;
