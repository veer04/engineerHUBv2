/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import JobCards from "./InternshipCard";
import "./Internship.css";
import JobDescription from "./InternshipDesc";
import { Bucket_URL } from "../../../services/APIUtils";
import colorWheel from "../../../assets/colorWheel";
import { controller, getHiringData } from "../../../services/APIConfig";

const Jobs = () => {
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const bucket2 = `${Bucket_URL}frontend/company/`;
  const [search, setSearch] = useState("");

  const [hiring, setHiring] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringData(setHiring);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  return (
    <div className="CompanyJob">
      <h2>Intern Hiring</h2>
      <p>
        Apply for the Intership of your interest and get the offer letter in the next
        step.
      </p>

      <div className="Jobs">
        <div className="JobTiles">
          {hiring
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
      </div>
    </div>
  );
};

export default Jobs;
