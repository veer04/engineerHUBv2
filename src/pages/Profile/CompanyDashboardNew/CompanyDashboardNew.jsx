import React from "react";

import "./companydashboardnew.css";
import NewCompanyDashboardHeader from "./NewCompanyDashboardHeader/NewCompanyDashboardHeader";
import HostPageForProfileDashboard from "../../../components/ProfileDashboard/HostpageForProfileDashboard/HostPageForProfileDashboard";
import AboutCompNewCompany from "./AboutCompNewCompany/AboutCompNewCompany";

const CompanyDashboardNew = () => {
  return (
    <main className="main-company-new-dashbooard-div">
      <div style={{ marginBottom: 20 }}>
        <NewCompanyDashboardHeader />
      </div>

      <div className="about-comp-main" style={{ marginBottom: 20 }}>
        <AboutCompNewCompany />
      </div>

      <div>
        <HostPageForProfileDashboard />
      </div>
    </main>
  );
};

export default CompanyDashboardNew;
