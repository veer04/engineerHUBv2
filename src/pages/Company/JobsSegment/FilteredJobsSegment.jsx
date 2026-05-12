import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import JobCardsNew from "../Jobs/JobCardsNew";
import Loading from "../../../components/Loader/Loading";
import "./JobsSegment.css";
import "./FilteredJobsSegment.css";
import { ChevronRight } from "react-feather";

/**
 * Same visual structure as JobsSegment: header + 3 cards + See All.
 * Fetches jobs with an extra filter (isForFreshers, isRemote, isEasyApply, isMaang).
 */
const FilteredJobsSegment = ({ title, filterKey, tintIndex = 1 }) => {
  const tintClass = `for-you-tint--${tintIndex}`;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);

  const seeAllTo = `/career/jobs?pageNo=1&limit=24&${filterKey}=1`;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = {
          opportunityType: "Job",
          pageNo: 1,
          limit: 3,
          sortBy: "createdAt",
          sortOrder: "desc",
          isActive: true,
          isServiceOff: false,
          [filterKey]: 1,
        };

        const response = await axios.get(
          `${API_URL}api/v1/getHiringByOpportunityType/`,
          { params }
        );

        const payload = response.data;
        const list = Array.isArray(payload.data) ? payload.data : [];
        if (payload.success) {
          setJobs(list);
          setTotalJobs(payload.pageSize ?? list.length);
        } else if (list.length === 0) {
          setJobs([]);
          setTotalJobs(0);
        } else {
          setError("Failed to fetch jobs");
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filterKey]);

  if (isLoading) {
    return (
      <div className={`jobs-segment-loading ${tintClass}`}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`jobs-segment-error ${tintClass}`}>
        <p>Failed to load jobs. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className={`jobs-segment ${tintClass}`}>
      <div className="jobs-segment-header">
        <h2 className="segment-heading">{title}</h2>
        <span className="openings-count">{totalJobs}+ Openings</span>
      </div>

      <div className="jobs-cards-container">
        {jobs.length > 0 ? (
          <div className="jobs-cards-grid">
            {jobs.map((job, index) => (
              <JobCardsNew key={job._id || index} details={job} />
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#666",
              margin: "1rem 0 0",
              padding: "0 0.5rem",
            }}
          >
            No listings in this category right now. Check back soon.
          </p>
        )}
        <Link to={seeAllTo} className="see-all-link">
          See All
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default FilteredJobsSegment;
