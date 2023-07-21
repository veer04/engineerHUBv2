import React, { useState, useEffect } from "react";
import JobCards from "./InternshipCard";
import "./InternshipDetails.css";
import JobDescription from "./InternshipDesc";
import { controller, getHiringData } from "../../../services/APIConfig";
import colorWheel from "../../../assets/colorWheel";
import LoadingPage from "../../../components/Loader/LoadingPage";
const InternshipDetails = () => {
  const [allJobsData, setAllJobsData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringData(setAllJobsData);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  const InternshipDetails = (
    <div className="CompanyJobDetails">
      <h2>Intern Hiring</h2>
      <div className="Jobs">
        <div className="JobTiles">
          {allJobsData
            .filter((res) => res.opportunityType === "Internship")
            .map((item, index) => {
              return (
                <JobCards
                  details={item}
                  color={colorWheel[index % colorWheel.length]}
                  key={index}
                />
              );
            })}
        </div>
        <div className="JobDetail">
          <JobDescription />
        </div>
      </div>
    </div>
  );

  return Object.keys(allJobsData).length !== 0 ? InternshipDetails : <LoadingPage />;
};

export default InternshipDetails;
