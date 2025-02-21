import React from "react";

import "./companydashboardnew.css";
import NewCompanyDashboardHeader from "./NewCompanyDashboardHeader/NewCompanyDashboardHeader";
import HostPageForProfileDashboard from "../../../components/ProfileDashboard/HostpageForProfileDashboard/HostPageForProfileDashboard";
import AboutCompNewCompany from "./AboutCompNewCompany/AboutCompNewCompany";
import NewCompanyThirdAndFourthSec from "./SectionThreeAndFourNewCompany/NewCompanyThirdAndFourthSec";
import { Bucket_URL } from "../../../services/APIUtils";
import YourCompanyActivitySection from "./NewCompanyDashboardHeader/YourCompanyActivitySection";

const CompanyDashboardNew = () => {
  return (
    <main className="main-company-new-dashbooard-div">
      <div style={{ marginBottom: 20 }}>
        <NewCompanyDashboardHeader />
      </div>

      <div className="about-comp-main" style={{ marginBottom: 20 }}>
        <AboutCompNewCompany />
      </div>

      <div style={{ marginBottom: 20 }}>
        <HostPageForProfileDashboard />
      </div>

      <div style={{ marginBottom: 20 }}>
        <YourCompanyActivitySection />
      </div>

      <div style={{ marginBottom: 20 }}>
        <NewCompanyThirdAndFourthSec
          title={"4x your campus placements"}
          desc={
            "From connecting with 5 lakh+ engineers to assessments, virtual interviews, advanced analytics, and ATS-powered shortlisting—our platform automates and streamlines every step of the recruitment journey."
          }
          bgColor={"#E8BA9826"}
          btn={"For Companies"}
          btnLink={"/about"}
          rightImage={`${Bucket_URL}newcompanydashboard/right_frame1.png`}
        />
      </div>

      <div style={{ marginBottom: 40 }}>
        <NewCompanyThirdAndFourthSec
          title={"70% less screening time"}
          desc={
            "Accelerate your hiring process with our streamlined platform—connect, assess, and onboard top talent within 72 hours, ensuring efficiency and quality every step of the way."
          }
          bgColor={"#8FC8E826"}
          btn={"For HRs"}
          btnLink={"/about"}
          rightImage={`${Bucket_URL}newcompanydashboard/right_frame2.png`}
        />
      </div>
    </main>
  );
};

export default CompanyDashboardNew;
