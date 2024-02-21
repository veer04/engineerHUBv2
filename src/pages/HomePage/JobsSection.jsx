import { useEffect, useState } from "react";
import "./JobsSection.css";
import arrow from "./svg/jobs-btn.svg";
import { Bucket_URL } from "../../services/APIUtils";
import { useNavigate } from "react-router-dom";
import { controller, getAllJobs2, getJobs } from "../../services/APIConfig";

export default function JobsSection() {
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/homepage/jobssection/`;
  const [jobsData, setJobsData] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs(setJobsData,1,5);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (Object.keys(jobsData).length > 0) setJobs(jobsData?.data?.data);
  }, [jobsData]);

  function createJobs(jobs) {
    return jobs?.map((job) => (
      <div
        onClick={() => navigate(`/company/jobs/${job._id}`)}
        key={job._id}
        className={`jobs-section-card jobs-section-card-${job._id}`}
      >
        <div className="job-company">
          <img src={job.organisationLogo} alt="Company Logo" />
          <span className="text-crop-1 overflow-hidden">
            {job.organisationName}
          </span>
        </div>
        <div className="job-title text-crop-1 overflow-hidden">
          {job.opportunityName}
        </div>
        <div className="job-skills">
          {job.skillsRequired?.map((skill, index) => (
            <div key={`${job.id}${index}`}>{skill}</div>
          ))}
          {job.skillsRequired?.length > 3 ? (
            <div className="job-skills-more">
              +{job.skillsRequired?.length - 3}
            </div>
          ) : null}
        </div>
      </div>
    ));
  }

  return (
    <div className="jobs-section">
      <div className="jobs-section-title-container">
        <div className="jobs-section-title">
          <div className="jobs-section-subtitle">Search for</div>
          <div className="jobs-section-main-title">
            <div>Latest Jobs</div>
            <img src={`${bucket}magnifying_glass.svg`} alt="Magnifying Glass" />
          </div>
        </div>
        <img src={`${bucket}search_job.png`} alt="Search Job" />
      </div>
      <div className="jobs-section-content">
        <div className="jobs-section-row jobs-section-row-1">
          {createJobs(jobs)}
        </div>
        <div className="jobs-section-row jobs-section-row-2">
          {createJobs(jobs)}
        </div>
        <div className="jobs-section-row jobs-section-row-3 justify-content-around">
          {createJobs(jobs)}
        </div>
      </div>
      <div className="jobs-btn">
        <button
          onClick={() => navigate("company/jobs")}
          className="look-for-jobs"
        >
          Look for Jobs
          <img src={arrow} alt="Arrow" />
        </button>
      </div>
    </div>
  );
}
