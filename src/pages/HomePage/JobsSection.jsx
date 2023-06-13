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
      companyLogo:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/company/jobs/uber.svg",
      companyName: "Uber",
      jobTitle: "Looking for Senior UI Developer",
      skills: ["Figma", "UI/UX", "Creative"],
      link: "company/jobs/1234",
    },
    {
      id: 2,
      companyLogo:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/company/jobs/google.svg",
      companyName: "Google",
      jobTitle: "Looking for Senior Backend Engineer",
      skills: ["Developer", "Engineer"],
      link: "company/jobs/1233",
    },
    {
      id: 3,
      companyLogo:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/company/jobs/microsoft.svg",
      companyName: "Microsoft",
      jobTitle: "Looking for Azure Data Engineer",
      skills: ["Data Analyst", "Data Science"],
      link: "company/jobs/1232",
    },
    {
      id: 4,
      companyLogo:
        "https://logodownload.org/wp-content/uploads/2020/02/zomato-logo-1.png",
      companyName: "Zomato",
      jobTitle: "Looking for Frontend Developer",
      skills: ["Frontend", "Creative", "React"],
    },
    {
      id: 5,
      companyLogo:
        "https://en.wikichip.org/w/images/thumb/e/ec/oracle_logo.svg/663px-oracle_logo.svg.png",
      companyName: "Oracle",
      jobTitle: "Looking for Java Developers",
      skills: ["Java", "Spring", "Backend"],
    },
  ];

  function createJobs(jobs) {
    return jobs.map((job) => (
      <div
        onClick={() => navigate(job.link)}
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
