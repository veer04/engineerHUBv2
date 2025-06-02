/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import JobCardsNew from "./JobCardsNew";
import "./JobsNew.css";
import { getJobs } from "../../../services/APIConfig";
import { useSearchParams } from "react-router-dom";
import ButtonRounded from "../../../components/Buttons/ButtonRounded";
import PaginationBar from "../../../components/PaginationBar/PaginationBar";
import Loading from "../../../components/Loader/Loading";
import { changeDocumentTitle } from "../../../features/changeDocumentTitle";
import { BiSearch } from "react-icons/bi";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const [hiringData, setHiringData] = useState({});
  const [hiring, setHiring] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [filterParam, setFilterParam] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(21);
  const [pageCount, setPageCount] = useState(1);

  changeDocumentTitle("Jobs | Career | engineerHUB");

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobs(setHiringData, currentPage, limit);
    return () => {
      setHiring([]);
    };
  }, [window.location.pathname, currentPage, limit]);

  useEffect(() => {
    if (Object.keys(hiringData).length > 0) {
      if (hiringData?.status >= 200 && hiringData?.status < 300)
        setHiring(hiringData?.data?.data);
      else setHiring([]);
    }
  }, [hiringData]);

  useEffect(() => {
    if (searchedProjects.length > 0) {
      setFilteredProjects(searchedProjects);
    } else {
      setFilteredProjects([]);
    }
  }, [searchedProjects]);

  useEffect(() => {
    if (filterParam === 0) {
      setPageCount(
        Math.ceil(
          (!!hiringData?.data?.pageSize ? hiringData?.data?.pageSize : 1) /
            limit
        )
      );
    } else if (filterParam === 1) {
      setPageCount(
        Math.ceil(
          (!!filteredProjects.filter((job) => Boolean(job.applyLink)).length
            ? filteredProjects.filter((job) => Boolean(job.applyLink)).length
            : 1) / limit
        )
      );
    } else if (filterParam === 2) {
      setPageCount(
        Math.ceil(
          (!!filteredProjects.filter(
            (job) => new Date(job.applicationStartTime) >= Date.now() - 6048e5
          ).length
            ? filteredProjects.filter(
                (job) =>
                  new Date(job.applicationStartTime) >= Date.now() - 6048e5
              ).length
            : 1) / limit
        )
      );
    } else if (filterParam === 3) {
      setPageCount(
        Math.ceil(
          (!!filteredProjects.filter((job) => !Boolean(job.applyLink)).length
            ? filteredProjects.filter((job) => !Boolean(job.applyLink)).length
            : 1) / limit
        )
      );
    }
  }, [hiringData, limit, filterParam]);

  const filteredData = useMemo(() => {
    return hiring.filter((value) => {
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
  }, [hiring, q]);

  useEffect(() => {
    setSearchedProjects(filteredData);
  }, [q, filteredData]);

  return (
    <div className="jobs-new-container">
      <div className="jobs-new-header">
        <h1>Find Your Dream Job</h1>
        <p>Discover opportunities that match your career goals</p>
        
        <div className="search-container">
          <div className="search-box">
            <BiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
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
          </div>
        </div>

        {Boolean(filteredProjects.length) && (
          <div className="filter-tags">
            <ButtonRounded
              onClick={() => {
                filterParam !== 1 ? setFilterParam(1) : setFilterParam(0);
              }}
              className={`filter-tag ${filterParam === 1 ? "active" : ""}`}
            >
              Jobs by engineerHUB
            </ButtonRounded>
            <ButtonRounded
              onClick={() => {
                filterParam !== 2 ? setFilterParam(2) : setFilterParam(0);
              }}
              style={{
                display: hiring.some(
                  (job) =>
                    new Date(job.applicationStartTime) >= Date.now() - 6048e5
                )
                  ? "block"
                  : "none",
              }}
              className={`filter-tag ${filterParam === 2 ? "active" : ""}`}
            >
              Recent Jobs
            </ButtonRounded>
            <ButtonRounded
              onClick={() => {
                filterParam !== 3 ? setFilterParam(3) : setFilterParam(0);
              }}
              className={`filter-tag ${filterParam === 3 ? "active" : ""}`}
            >
              Job Updates
            </ButtonRounded>
          </div>
        )}
      </div>

      <div className="jobs-grid">
        {filteredProjects
          .filter((job) => {
            if (filterParam === 1) {
              return Boolean(job.applyLink);
            } else if (filterParam === 2) {
              return new Date(job.applicationStartTime) >= Date.now() - 6048e5;
            } else if (filterParam === 3) {
              return !Boolean(job.applyLink);
            } else {
              return true;
            }
          })
          .map((item, index) => (
            <JobCardsNew
              key={item._id || index}
              details={item}
              className="job-card-item"
            />
          ))}

        {hiring.length === 0 && hiringData?.status >= 200 && hiringData?.status < 300 && (
          <div className="loading-container">
            <Loading />
          </div>
        )}
        
        {hiring.length === 0 && Object.keys(hiringData).length === 0 && (
          <div className="loading-container">
            <Loading />
          </div>
        )}

        {hiring.length === 0 &&
          Object.keys(hiringData).length !== 0 &&
          !(hiringData?.status >= 200 && hiringData?.status < 300) && (
            <div className="error-message">
              Something went wrong. Please try again later.
            </div>
          )}
      </div>

      {hiring.length !== 0 && (
        <div className="pagination-container">
          <PaginationBar
            pages={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Jobs;
