import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
import InternshipCardNew from '../../Company/Internship/InternshipCardNew';
import Loading from '../../../components/Loader/Loading';
import './InternshipSegment.css';
import { ChevronRight } from 'react-feather';
import ReferralPageBanner from '../Referrals/ReferralPageBanner.png';

/** Same doodle/teal art as Referrals landing and JobsSegment (`ReferralPageBanner.png`). */
const mainListingHeroStyle = {
  backgroundColor: '#138382',
  backgroundImage: `url(${ReferralPageBanner})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const InternshipSegment = () => {
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalInternships, setTotalInternships] = useState(0);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const params = {
          opportunityType: "Internship",
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
          setInternships(response.data.data || []);
          setTotalInternships(response.data.pageSize || 0);
        } else {
          setError("Failed to fetch internships");
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (isLoading) {
    return (
      <div
        className="internships-segment-loading internships-segment-loading--main-listing"
        style={mainListingHeroStyle}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="internships-segment-error internships-segment-error--main-listing"
        style={mainListingHeroStyle}
      >
        <p>Failed to load internships. Please try again later.</p>
      </div>
    );
  }

  return (
    <section
      className="internships-segment internships-segment--main-listing"
      style={mainListingHeroStyle}
    >
      <div className="internships-segment-header">
        <h2 className="segment-heading">Internships</h2>
        <span className="openings-count">{totalInternships}+ Openings</span>
      </div>

      <div className="internships-cards-container">
        <div className="internships-cards-grid">
          {internships.map((internship, index) => (
            <InternshipCardNew
              key={internship._id || index}
              details={internship}
            />
          ))}
        </div>
        <Link to="/career/internships" className="see-all-link">
          See All
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default InternshipSegment; 