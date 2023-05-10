import React from "react";
import "./JobsSection.css";
import arrow from "./svg/jobs-btn.svg";
import { Bucket_URL } from "../../services/APIUtils";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";

export default function JobsSection() {
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/homepage/jobssection/`;
  const jobs = [
    {
      id: 1,
      companyLogo: defaultPoster,
      companyName: "Google, India",
      jobTitle: "Looking for Creative Designer???",
      skills: ["Figma", "UI/UX", "Creative"],
    },
    {
      id: 2,
      companyLogo: defaultPoster,
      companyName: "Google, India",
      jobTitle: "Looking for Creative Designer???",
      skills: ["Figma", "UI/UX", "Creative"],
    },
    {
      id: 3,
      companyLogo: defaultPoster,
      companyName: "Google, India",
      jobTitle: "Looking for Creative Designer???",
      skills: ["Figma", "UI/UX", "Creative"],
    },
    {
      id: 4,
      companyLogo: defaultPoster,
      companyName: "Google, India",
      jobTitle: "Looking for Creative Designer???",
      skills: ["Figma", "UI/UX", "Creative"],
    },
    {
      id: 5,
      companyLogo: defaultPoster,
      companyName: "Google, India",
      jobTitle: "Looking for Creative Designer???",
      skills: ["Figma", "UI/UX", "Creative"],
    },
  ];

  function createJobs(jobs) {
    return jobs.map((job) => (
      <div
        key={job.id}
        className={`jobs-section-card jobs-section-card-${job.id}`}
      >
        <div className="job-company">
          <img src={job.companyLogo} alt="Company Logo" />
          <div>{job.companyName}</div>
        </div>
        <div className="job-title">{job.jobTitle}</div>
        <div className="job-skills">
          {job.skills.map((skill, index) => (
            <div key={`${job.id}${index}`}>{skill}</div>
          ))}
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
