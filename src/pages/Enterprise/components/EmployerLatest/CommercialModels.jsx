import React from "react";
import styles from "./CommercialModels.module.css";
import { Laptop, Users, ArrowRight, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CommercialModels() {
  const navigate = useNavigate();

  const handleSelfService = () => {
    navigate("/pricing#self-service-plans");
  };

  const handleVirtualHR = () => {
    navigate("/pricing#virtual-hr-section");
  };

  return (
    <section className={styles.commercialSection} id="commercial-options-section">
      <div className={styles.commercialContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <Sparkles size={12} className={styles.pillIcon} />
            <span>COMMERCIAL OPTIONS</span>
          </div>
          <h2 className={styles.sectionTitle}>Choose how you hire</h2>
          <p className={styles.sectionSubtitle}>
            Use engineerHUB yourself or let our dedicated team manage hiring for you.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className={styles.optionsGrid}>
          {/* Card 1: Self-Service Platform */}
          <div className={`${styles.optionCard} ${styles.cardSelfService}`}>
            <div className={styles.cardHeader}>
              <span className={styles.tagBadgeSelf}>SELF-SERVICE PLATFORM</span>
              <div className={styles.iconCircleSelf}>
                <Laptop size={22} />
              </div>
            </div>

            <h3 className={styles.cardTitle}>Hire by yourself</h3>
            <p className={styles.cardTagline}>Use engineerHUB's complete hiring platform.</p>
            <p className={styles.cardDesc}>
              Get the tools you need to source, manage, assess and interview candidates
              yourself from one unified recruiter workspace.
            </p>

            <ul className={styles.featureList}>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>Quick Opportunity Posting</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>Integrated Candidate CRM & Automated Outreach</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>AI-Powered Resume Screening & Assessments</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>AI Interview & Google Meet Integration</span>
              </li>
            </ul>

            <button
              className={styles.btnCtaSelf}
              onClick={handleSelfService}
              type="button"
            >
              <span>Explore Plans</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Managed Virtual HR */}
          <div className={`${styles.optionCard} ${styles.cardVirtualHR}`}>
            <div className={styles.cardHeader}>
              <span className={styles.tagBadgeVirtual}>MANAGED HIRING SERVICE</span>
              <div className={styles.iconCircleVirtual}>
                <Users size={22} />
              </div>
            </div>

            <h3 className={styles.cardTitle}>Virtual HR</h3>
            <p className={styles.cardTagline}>Let engineerHUB manage hiring for you.</p>
            <p className={styles.cardDesc}>
              From sourcing and candidate engagement to screening, interviews and final offer
              coordination, our team manages the hiring process end-to-end.
            </p>

            <ul className={styles.featureList}>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>Dedicated Hiring Specialist & Talent Pool</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>End-to-End Candidate Sourcing & Screening</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>Custom Assessment & Interview Coordination</span>
              </li>
              <li>
                <div className={styles.checkWrap}><Check size={14} /></div>
                <span>Final Shortlisting & Offer Management</span>
              </li>
            </ul>

            <button
              className={styles.btnCtaVirtual}
              onClick={handleVirtualHR}
              type="button"
            >
              <span>Explore More</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
