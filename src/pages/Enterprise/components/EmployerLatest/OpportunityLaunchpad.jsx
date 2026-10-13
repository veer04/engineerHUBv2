import React from "react";
import styles from "./OpportunityLaunchpad.module.css";
import { Briefcase, GraduationCap, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OpportunityLaunchpad({ isPaid = true }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className={styles.launchpadSection} id="hire-talent-section">
      <div className={styles.launchpadContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <Sparkles size={12} className={styles.pillIcon} />
            <span>DIRECT ACCESS TO TALENT</span>
          </div>
          <h2 className={styles.sectionTitle}>Hire Talent</h2>
          <p className={styles.sectionSubtitle}>
            Post opportunities and begin evaluating pre-vetted engineers across India immediately.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className={styles.launchpadGrid}>
          {/* Jobs Card */}
          <article
            className={styles.opportunityCard}
            onClick={() => handleNavigate("/host/job")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate("/host/job")}
          >
            <div className={styles.cardTopRow}>
              <div className={styles.iconBox}>
                <Briefcase size={24} />
              </div>
              {!isPaid && (
                <div className={styles.lockBadge}>
                  <Lock size={12} />
                  <span>Paid Plan</span>
                </div>
              )}
            </div>

            <div className={styles.titleRow}>
              <h3 className={styles.opportunityTitle}>Jobs</h3>
              <span className={styles.actionArrow}>
                Create Jobs <ArrowRight size={14} />
              </span>
            </div>

            <p className={styles.opportunityDesc}>
              Post jobs, discover skilled engineers, and streamline your hiring process
              from one unified recruiter workspace.
            </p>

            <div className={styles.cardFooterTag}>
              <span>Full-time Engineers · Graduating Batches 2024–2026</span>
            </div>
          </article>

          {/* Internships Card */}
          <article
            className={styles.opportunityCard}
            onClick={() => handleNavigate("/host/internship")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate("/host/internship")}
          >
            <div className={styles.cardTopRow}>
              <div className={styles.iconBox}>
                <GraduationCap size={24} />
              </div>
              {!isPaid && (
                <div className={styles.lockBadge}>
                  <Lock size={12} />
                  <span>Paid Plan</span>
                </div>
              )}
            </div>

            <div className={styles.titleRow}>
              <h3 className={styles.opportunityTitle}>Internships</h3>
              <span className={styles.actionArrow}>
                Create Internships <ArrowRight size={14} />
              </span>
            </div>

            <p className={styles.opportunityDesc}>
              Hire talented interns from a nationwide network of engineering students across 800+ colleges.
            </p>

            <div className={styles.cardFooterTag}>
              <span>Summer & Winter Internships · Pre-Placement Offers (PPOs)</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
