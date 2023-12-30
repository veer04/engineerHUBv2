import React, { useState, useEffect, useMemo } from "react";
import JobCards from "./JobCards";
import "./JobDetails.css";
import JobDescription from "./JobDescription";
import { controller, getAllJobs2, getJobs } from "../../../services/APIConfig";
import colorWheel from "../../../assets/colorWheel";
import LoadingPage from "../../../components/Loader/LoadingPage";
import { useSearchParams } from "react-router-dom";
const JobDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const [allJobsData, setAllJobsData] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobs(setAllJobsData, 1, 20);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  useEffect(() => {
    if (Object.keys(allJobsData).length > 0)
      setAllJobs(allJobsData?.data?.data);
  }, [allJobsData]);

  useEffect(() => {
    if (searchedProjects.length > 0) {
      setFilteredProjects(searchedProjects);
    } else {
      setFilteredProjects([]);
    }
  }, [searchedProjects]);

  const filteredData = useMemo(() => {
    return allJobs.filter((value) => {
      return (
        value.opportunityName?.toLowerCase().includes(q.toLowerCase()) ||
        value.amount?.toLowerCase().includes(q.toLowerCase()) ||
        value.opportunityLocation?.toLowerCase().includes(q.toLowerCase()) ||
        value.domainName?.toLowerCase().includes(q.toLowerCase()) ||
        value.skillsRequired?.some((tag) =>
          tag.toLowerCase().includes(q.toLowerCase())
        ) ||
        value.organisationName?.toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [allJobs, q]);

  useEffect(() => {
    setSearchedProjects(filteredData);
  }, [q, filteredData]);

  const JobDetails = (
    <div className="CompanyJobDetails">
      <h2>Job Hiring</h2>
      <div className="Jobs">
        <div className="JobTiles job-tiles-container">
          <div className="project__searchbar__container company_searchbar_container__aside">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={q}
                onChange={(e) => {
                  setSearchParams(
                    (prev) => {
                      prev.set("q", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              />

              <span className="input-group-text" id="basic-addon2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z"
                    fill="#3C3C43"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
            </div>
          </div>
          {filteredProjects.map((item, index) => {
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

  return Object.keys(allJobs).length !== 0 ? JobDetails : <LoadingPage />;
};

export default JobDetails;
