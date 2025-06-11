import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CompanyNew.css';
import JobsSegment from './JobsSegment/JobsSegment';
import InternshipSegment from './InternshipSegment/InternshipSegment';
import JobsForYouFilterComp from './JobsForYouFilterPage/JobsForYouFilterComp';
import ServicesSegment from './ServicesSegment/ServicesSegment';
import ExploreOtherPages from './ExploreOtherPages/ExploreOtherPages';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';
import AdsenseComp from "../../components/AdsenseComp/AdsenseComp";

// Search Section Component
const SearchSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/career/jobs?q=${searchQuery}&pageNo=1&limit=24`);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSearch} className="search-container">
        <button type="submit">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search for opportunities,company..etc"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="quick-links">
        <Link 
          to="/career/jobs" 
          className={`quick-link-btn ${isActive('/career/jobs') ? 'active' : ''}`}
        >
          Jobs
        </Link>
        <Link 
          to="/career/internships" 
          className={`quick-link-btn ${isActive('/career/internships') ? 'active' : ''}`}
        >
          Internships
        </Link>
        <Link 
          to="/career/events" 
          className={`quick-link-btn ${isActive('/career/events') ? 'active' : ''}`}
        >
          Event Hiring
        </Link>
      </div>
    </div>
  );
};

const CompanyNew = () => {
  return (
    <main className="company-new">
      <SearchSection />
      
      <JobsSegment />
      {/* AD-1 
      <div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="2075126233" />
      </div>*/}
    
      <InternshipSegment />
      {/* AD-2 */}
      <AdsenseComp adSlot="4766701351" />
     
      
      <JobsForYouFilterComp />
      <ServicesSegment />
      {/* AD-3 */}
      {/*<div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="9608720063" />
      </div>*/}
      
      <ExploreOtherPages />
      {/* AD-4 */}
      {/*<div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="3771351287" />
      </div>*/}
      
      <TestimonialsSection />
      {/* AD-5 */}
      {/*<div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="5248084515" />
      </div>*/}
      {/* AD-6 */}
      {/*<div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="6721817643" />
      </div>*/}
      {/* AD-7 */}
      {/* <div className="d-flex justify-content-center my-4">
        <AdsenseComp adSlot="2618267316" />
      </div>*/}

    </main>
  );
};

export default CompanyNew;
