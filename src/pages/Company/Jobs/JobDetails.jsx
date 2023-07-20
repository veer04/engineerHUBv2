import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import "./JobDetails.css";
import JobDescription from "./JobDescription";
import { controller, getHiringData } from "../../../services/APIConfig";
import colorWheel from "../../../assets/colorWheel";
import LoadingPage from "../../../components/Loader/LoadingPage";
const JobDetails = () => {
  const [allJobsData, setAllJobsData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringData(setAllJobsData);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  const JobDetails = (
    <div className="CompanyJobDetails">
      <h2>Job Hiring</h2>
      <div className="Jobs">
        <div className="JobTiles">
          {allJobsData
            .filter((res) => res.opportunityType === "Job")
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

  return Object.keys(allJobsData).length !== 0 ? JobDetails : <LoadingPage />;
};

export default JobDetails;
