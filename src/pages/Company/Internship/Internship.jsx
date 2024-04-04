/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import JobCards from "./InternshipCard";
import "./Internship.css";
import colorWheel from "../../../assets/colorWheel";
import { getInternships } from "../../../services/APIConfig";
import { useSearchParams } from "react-router-dom";
import ButtonRounded from "../../../components/Buttons/ButtonRounded";
import PaginationBar from "../../../components/PaginationBar/PaginationBar";
import Loading from "../../../components/Loader/Loading";
import { changeDocumentTitle } from "../../../features/changeDocumentTitle";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const [hiringData, setHiringData] = useState({});
  const [hiring, setHiring] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [filterParam, setFilterParam] = useState(0); //filterParam can be 1 for jobs uploaded by engineerhub and 2 for recent jobs and 3 for job updates
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(21);
  const [pageCount, setPageCount] = useState(1);

  changeDocumentTitle("Internships | Company | engineerHUB");

  useEffect(() => {
    window.scrollTo(0, 0);
    getInternships(setHiringData, currentPage, limit);
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
    <div className="CompanyJob">
      <h2>Intern Hiring</h2>
      <p>
        Apply for the intership of your interest and get the offer letter in the
        next step.
      </p>
      <div className="project__searchbar__container company_searchbar_container mb-3">
        <div className="input-group">
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
      {/* <PaginationBar
        pages={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
      {Boolean(filteredProjects.length) && (
        <div className="job-tags">
          <ButtonRounded
            onClick={() => {
              filterParam !== 1 ? setFilterParam(1) : setFilterParam(0);
            }}
            className={`tag ${filterParam === 1 ? "--is-active" : ""}`}
          >
            Internships by engineerhub
          </ButtonRounded>
          <ButtonRounded
            onClick={() => {
              filterParam !== 2 ? setFilterParam(2) : setFilterParam(0);
            }}
            // if there is no recent internships then this tag will not be shown
            style={{
              display: hiring.some(
                (job) =>
                  new Date(job.applicationStartTime) >= Date.now() - 6048e5
              )
                ? "block"
                : "none",
            }}
            className={`tag ${filterParam === 2 ? "--is-active" : ""}`}
          >
            Recent Internships
          </ButtonRounded>
          <ButtonRounded
            onClick={() => {
              filterParam !== 3 ? setFilterParam(3) : setFilterParam(0);
            }}
            className={`tag ${filterParam === 3 ? "--is-active" : ""}`}
          >
            Internship Updates
          </ButtonRounded>
        </div>
      )}
      <div className="Jobs">
        <div className="JobTiles">
          {filteredProjects
            .filter((job) => {
              if (filterParam === 1) {
                return Boolean(job.applyLink);
              } else if (filterParam === 2) {
                return (
                  new Date(job.applicationStartTime) >= Date.now() - 6048e5
                );
              } else if (filterParam === 3) {
                return !Boolean(job.applyLink);
              } else {
                return true;
              }
            })
            .map((item, index) => {
              return (
                <JobCards
                  details={item}
                  color={colorWheel[index % colorWheel.length]}
                  key={index}
                />
              );
            })}
          {hiring.length === 0 &&
            hiringData?.status >= 200 &&
            hiringData?.status < 300 && (
              <div style={{ marginTop: "25dvh" }}>
                <Loading />
              </div>
            )}
          {hiring.length === 0 && Object.keys(hiringData).length === 0 && (
            <div style={{ marginTop: "25dvh" }}>
              <Loading />
            </div>
          )}
          {hiring.length === 0 &&
            Object.keys(hiringData).length !== 0 &&
            !(hiringData?.status >= 200 && hiringData?.status < 300) && (
              <div
                style={{
                  marginTop: "25dvh",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#3C3C43",
                  opacity: "0.6",
                }}
              >
                Something went wrong. Please try again later.
              </div>
            )}
        </div>
      </div>
      {hiring.length !== 0 && (
        <PaginationBar
          pages={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Jobs;
