import { useEffect, useState } from "react";
import "./JobsSection.css";
import arrow from "./svg/jobs-btn.svg";
import { Bucket_URL } from "../../services/APIUtils";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";
import { controller, getAllJobs } from "../../services/APIConfig";

export default function JobsSection() {
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/homepage/jobssection/`;
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getAllJobs(setJobs);

    return () => {
      controller.abort();
    };
  }, []);
  function createJobs(jobs) {
    return jobs?.map((job) => (
      <div
        onClick={() => navigate(`/company/jobs/${job._id}`)}
        key={job._id}
        className={`jobs-section-card jobs-section-card-${job._id}`}
      >
        <div className="job-company">
          <img src={job.OrganisationPoster} alt="Company Logo" />
          <span className="text-crop-1 overflow-hidden">
            {job.Organisation ? job.Organisation : job.Organization}
          </span>
        </div>
        <div className="job-title text-crop-1 overflow-hidden">
          {job.OpportunityPosition}
        </div>
        <div className="job-skills">
          {job.skillsRequired?.slice(0, 3).map((skill, index) => (
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
          {createJobs(jobs.slice(0, 1))}
        </div>
        <div className="jobs-section-row jobs-section-row-2">
          {createJobs(jobs.slice(1, 3))}
        </div>
        <div className="jobs-section-row jobs-section-row-3">
          {createJobs(jobs.slice(3, 5))}
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
