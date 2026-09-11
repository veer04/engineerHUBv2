import React from "react";
import { useNavigate } from "react-router-dom";
import { Laptop, Users, ArrowRight, Check } from "lucide-react";
import "../PricingPage.css";

export default function ChooseHiringMode({ onExplorePlans, onExploreVirtualHR }) {
  const navigate = useNavigate();

  const handleSelfServiceClick = (e) => {
    if (onExplorePlans) {
      onExplorePlans(e);
    } else {
      navigate("/pricing#self-service-plans");
    }
  };

  const handleVirtualHRClick = (e) => {
    if (onExploreVirtualHR) {
      onExploreVirtualHR(e);
    } else {
      navigate("/pricing#virtual-hr-section");
    }
  };

  return (
    <section className="choose-hiring-mode-section">
      <div className="section-title-wrap">
        <div className="section-pill-badge">COMMERCIAL OPTIONS</div>
        <h2 className="section-title">Choose how you hire</h2>
        <p className="section-subtitle">
          Use engineerHUB yourself or let our team manage hiring for you.
        </p>
      </div>

      <div className="hiring-options-grid">
        {/* OPTION 1: HIRE BY YOURSELF (PURPLE RICH THEME) */}
        <div className="hiring-option-card option-self">
          <div className="option-badge-tag tag-self">SELF-SERVICE PLATFORM</div>

          <div className="option-header-wrap">
            <div className="option-icon-box box-self">
              <Laptop size={24} />
            </div>
            <div>
              <h3 className="option-title">Hire by yourself</h3>
              <p className="option-tagline">Use engineerHUB's complete hiring platform.</p>
            </div>
          </div>

          <p className="option-description">
            Get the tools you need to source, manage, assess and interview candidates
            yourself from one unified recruiter workspace.
          </p>

          <ul className="option-features-list">
            <li>
              <Check size={16} /> Quick Opportunity Posting
            </li>
            <li>
              <Check size={16} /> Integrated Candidate CRM & Automated Outreach
            </li>
            <li>
              <Check size={16} /> AI-Powered Resume Screening & Assessments
            </li>
            <li>
              <Check size={16} /> AI Interview & Google Meet Integration
            </li>
          </ul>

          <button className="btn-option-cta btn-cta-self" onClick={handleSelfServiceClick}>
            Explore Plans <ArrowRight size={16} />
          </button>
        </div>

        {/* OPTION 2: VIRTUAL HR (TRADITIONAL TEAL THEME) */}
        <div className="hiring-option-card option-virtual">
          <div className="option-badge-tag tag-virtual">MANAGED HIRING SERVICE</div>

          <div className="option-header-wrap">
            <div className="option-icon-box box-virtual">
              <Users size={24} />
            </div>
            <div>
              <h3 className="option-title">Virtual HR</h3>
              <p className="option-tagline">Let engineerHUB manage hiring for you.</p>
            </div>
          </div>

          <p className="option-description">
            From sourcing and candidate engagement to screening, interviews and final
            offer coordination, our team manages the hiring process end-to-end.
          </p>

          <ul className="option-features-list">
            <li>
              <Check size={16} /> Dedicated Hiring Specialist & Talent Pool
            </li>
            <li>
              <Check size={16} /> End-to-End Candidate Sourcing & Screening
            </li>
            <li>
              <Check size={16} /> Custom Assessment & Interview Coordination
            </li>
            <li>
              <Check size={16} /> Final Shortlisting & Offer Management
            </li>
          </ul>

          <button className="btn-option-cta btn-cta-virtual" onClick={handleVirtualHRClick}>
            Explore More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
