/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import JobCards from "./JobCards";
import "./JobDetails.css";
import JobDescription from "./JobDescription";
import { Bucket_URL } from "../../../services/APIUtils";
import {
  controller,
  getHiringDataById,
  getHiringData,
} from "../../../services/APIConfig";
import colorWheel from "../../../assets/colorWheel";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
const JobDetails = () => {
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const bucket2 = `${Bucket_URL}frontend/company/`;
  const { hiringId } = useParams();
  const [search, setSearch] = useState("");

  const [hiring, setHiring] = useState({});
  const [hiringData, setHiringData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringDataById(setHiring, hiringId);
    getHiringData(setHiringData);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  const JobDetails = (
    <div className="CompanyJobDetails">
      <h2>Job Hiring</h2>
      <p></p>
      {/* <div className="search">
    <span>
      <BsSearch />
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </span>
    <div className="filters">
      <MdTune />
    </div>
  </div> */}
      <div className="Jobs">
        <div className="JobTiles">
          {hiringData
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
          <JobDescription details={{ ...hiring }} />
        </div>
      </div>
    </div>
  );

  if (hiring.success === false) return <Page404 />;

  return Object.keys(hiring).length !== 0 ? JobDetails : <LoadingPage />;
};

export default JobDetails;
