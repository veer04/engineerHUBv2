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
import { SEO } from "../../components/SEO/SEO.jsx";

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

const CareerSEOContent = () => (
  <section className="career-seo-content">
    <div className="career-seo-intro">
      <h1>Career Opportunities with engineerHUB</h1>
      <p>
        Discover a single destination for every stage of your professional journey.
        engineerHUB connects ambitious students, recent graduates, and experienced engineers
        with curated job openings, paid internships, referral programs, placement stories,
        and career services crafted by hiring experts.
      </p>
    </div>

    <div className="career-seo-grid">
      <article>
        <h2>Jobs & Experienced Hiring</h2>
        <p>
          Explore full-time roles across product companies, startups, SaaS teams, and enterprises.
          Filter opportunities by experience, tech stack, location, work mode, and compensation bands
          to find roles that match your career goals.
        </p>
        <ul>
          <li>Latest openings in product, software, data, DevOps, and design</li>
          <li>Remote, hybrid, on-site, MAANG, and referral-based roles</li>
          <li>Insights on hiring timelines, interview format, and salary benchmarks</li>
        </ul>
      </article>

      <article>
        <h2>Internships & Early Talent</h2>
        <p>
          Access verified internships for freshmen, pre-final, and final-year students with transparent
          stipends, project scope, mentorship details, and conversion opportunities.
        </p>
        <ul>
          <li>Paid internships in software engineering, analytics, and product</li>
          <li>Virtual and on-site programs with rapid application links</li>
          <li>Guidance on resumes, project portfolios, and interview readiness</li>
        </ul>
      </article>

      <article>
        <h2>Referral & Placement </h2>
        <p>
          Leverage alumni-backed referrals, mentorship circles, and success stories from placed students
          to shortcut your application process and learn what top recruiters expect.
        </p>
        <ul>
          <li>Referral drives and hiring events powered by community partners</li>
          <li>Case studies on placed candidates and their preparation tactics</li>
          <li>Career services: mock interviews, profile reviews, and salary insights</li>
        </ul>
      </article>
    </div>

    <div className="career-seo-footer">
      <h3>Why engineerHUB ranks high for career growth?</h3>
      <p>
      We publish fresh opportunities every day, verify each listing with hiring teams, and provide helpful guidance for job seekers and recruiters alike. Bookmark this career page to stay updated with jobs, internships, events, and community-powered learning resources that help you stay ahead of the competition.
      </p>
    </div>
  </section>
);

const CompanyNew = () => {
  const metaTitle = "Career Opportunities | engineerHUB Jobs & Internships";
  const metaDescription =
    "Browse curated jobs, internships, referral drives, and placement services on engineerHUB—built for students and experienced engineers across India.";
  const metaKeywords = [
    "tech jobs india",
    "software internships",
    "referral program",
    "career services",
    "placement stories",
    "hiring platform","engineerHUB career page", "tech jobs", "software internships", "referral program", "placed students stories", "fresher jobs", "remote jobs", "product hiring", "career services", "career opportunities", "jobs", "internships", "referral programs", "career services", "placed students success stories", "fresher jobs", "remote jobs", "product hiring", "career opportunities", "engineerHUB", "software internships", "placed students stories"
  ];
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://engineerhub.in/career";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    url: currentUrl,
    publisher: {
      "@type": "Organization",
      name: "engineerHUB",
      url: "https://engineerhub.in",
    },
    about: [
      "Jobs",
      "Internships",
      "Referral program",
      "Career services",
      "Placed students success stories",
    ],
    hasPart: [
      {
        "@type": "CollectionPage",
        name: "Jobs Segment",
        description: "Curated full-time opportunities for engineers and product teams.",
      },
      {
        "@type": "CollectionPage",
        name: "Internship Segment",
        description: "Verified internships with stipends, tech stacks, and conversion details.",
      },
      {
        "@type": "CollectionPage",
        name: "Services Segment",
        description: "Career services, mentorship, and referral support programs.",
      },
    ],
  };

  return (
    <SEO
      title={metaTitle}
      description={metaDescription}
      keywords={metaKeywords}
      canonical={currentUrl}
      openGraph={{
        type: "website",
        site_name: "engineerHUB",
        url: currentUrl,
        title: metaTitle,
        description: metaDescription,
      }}
      twitter={{
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        url: currentUrl,
      }}
      structuredData={structuredData}
    >
      <main className="company-new">
        <SearchSection />

        <JobsSegment />
        {/* AD-1 */}
        <AdsenseComp adSlot="2075126233" />

        <InternshipSegment />
        {/* AD-2 */}
        <AdsenseComp adSlot="4766701351" />

        <JobsForYouFilterComp />
        <ServicesSegment />
        
        {/* AD-3 
        <AdsenseComp adSlot="9608720063" />
*/}
        <ExploreOtherPages />
        {/* AD-4 
        <AdsenseComp adSlot="3771351287" />
*/}
        <TestimonialsSection />
        <CareerSEOContent />

        {/* AD-7 display 
        <AdsenseComp adSlot="2618267316" />
        */}
      </main>

    </SEO>
  );
};

export default CompanyNew;
