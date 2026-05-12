import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
import JobCardsNew from '../../Company/Jobs/JobCardsNew';
import Loading from '../../../components/Loader/Loading';
import './JobsSegment.css';
import { ChevronRight } from 'react-feather';
import ReferralPageBanner from '../Referrals/ReferralPageBanner.png';

/** Same doodle/teal art as Referrals landing (`Referrals.jsx` hero). */
const mainListingHeroStyle = {
  backgroundColor: '#138382',
  backgroundImage: `url(${ReferralPageBanner})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const JobsSegment = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);

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
          isServiceOff: false
        };

        const response = await axios.get(
          `${API_URL}api/v1/getHiringByOpportunityType/`,
          { params }
        );

        if (response.data.success) {
          setJobs(response.data.data || []);
          setTotalJobs(response.data.pageSize || 0);
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
  }, []);

  if (isLoading) {
    return (
      <div
        className="jobs-segment-loading jobs-segment-loading--main-listing"
        style={mainListingHeroStyle}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="jobs-segment-error jobs-segment-error--main-listing"
        style={mainListingHeroStyle}
      >
        <p>Failed to load jobs. Please try again later.</p>
      </div>
    );
  }

  return (
    <section
      className="jobs-segment jobs-segment--main-listing"
      style={mainListingHeroStyle}
    >
      <div className="jobs-segment-header">
        <h2 className="segment-heading">Jobs</h2>
        <span className="openings-count">{totalJobs}+ Openings</span>
      </div>

      <div className="jobs-cards-container">
        <div className="jobs-cards-grid">
          {jobs.map((job, index) => (
            <JobCardsNew
              key={job._id || index}
              details={job}
            />
          ))}
        </div>
        <Link to="/career/jobs" className="see-all-link">
          See All
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default JobsSegment; 