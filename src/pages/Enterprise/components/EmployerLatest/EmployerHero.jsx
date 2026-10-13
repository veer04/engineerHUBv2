import React, { useRef } from "react";
import styles from "./EmployerHero.module.css";
import { ArrowRight, Sparkles, Building2, Users, Rocket, Clock } from "lucide-react";
import DoodleBackground from "./DoodleBackground";

export default function EmployerHero({ onHostOpportunityClick, onConnectWithUsClick }) {
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className={styles.heroSection}>
      {/* 1st Child: Interactive Doodle Icon Background */}
      <DoodleBackground heroRef={heroRef} />

      {/* Side diagonal hatch pattern gutters */}
      <div className={styles.leftGutter} aria-hidden="true" />
      <div className={styles.rightGutter} aria-hidden="true" />

      <div className={styles.heroContainer}>
        {/* Top Pill Badge */}
        <div className={styles.pillBadgeWrapper}>
          <div className={styles.pillBadge}>
            <span className={styles.pillPulseDot} />
            <span className={styles.pillText}>
              Trusted by 800+ Recruiters
            </span>
          </div>
        </div>

        {/* Editorial Main Headline */}
        <h1 className={styles.mainHeadline}>
          <span className={styles.sayGoodbyeText}>One stop hiring solution</span> <br className={styles.desktopBr} />
          <span className={styles.highlightWord}>
            <span
              className={styles.blinkWord}
              style={{
                "--blink-delay": "0s",
                "--blink-color": "#2e7d5b", /* Soft Muted Sage Green */
                "--blink-glow": "rgba(46, 125, 91, 0.18)",
              }}
            >
              Source
            </span>
            <span className={styles.blinkDot}>.</span>
            <span
              className={styles.blinkWord}
              style={{
                "--blink-delay": "1.3s",
                "--blink-color": "#a85d26", /* Soft Warm Terracotta/Amber */
                "--blink-glow": "rgba(168, 93, 38, 0.18)",
              }}
            >
              Engage
            </span>
            <span className={styles.blinkDot}>.</span>
            <span
              className={styles.blinkWord}
              style={{
                "--blink-delay": "2.6s",
                "--blink-color": "#6d5ba8", /* Soft Dusty Lavender */
                "--blink-glow": "rgba(109, 91, 168, 0.18)",
              }}
            >
              Hire
            </span>
          </span>
        </h1>

        {/* Crisp Story Subheadline */}
        <p className={styles.subHeadline}>
          engineerHUB is an AI-powered, end-to-end hiring platform that enables recruiters to source,
          assess, interview, and hire candidates efficiently without relying on multiple recruitment tools.
        </p>

        {/* Mission Affirmation */}
        <div className={styles.affirmationBanner}>
          <span>We streamline hiring so you can <strong>focus on growing!</strong></span>
        </div>

        {/* Action CTAs */}
        <div className={styles.ctaButtonGroup}>
          <button
            className={styles.primaryBtn}
            onClick={onHostOpportunityClick}
            type="button"
          >
            <span>Host Opportunity</span>
            <ArrowRight size={16} className={styles.btnIcon} />
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={onConnectWithUsClick}
            type="button"
          >
            <Sparkles size={16} className={styles.sparkleIcon} />
            <span>Connect with us</span>
          </button>
        </div>

        {/* Quick Trust Metric Strip */}
        <div className={styles.metricsStrip}>
          <div className={styles.metricItem}>
            <Users size={16} className={styles.metricIcon} />
            <span><strong>325,000+</strong> Candidates Monthly</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <Building2 size={16} className={styles.metricIcon} />
            <span><strong>1000+</strong> Colleges Across India</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <Clock size={16} className={styles.metricIcon} />
            <span><strong>80%</strong> Faster Resume Screening</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <Rocket size={16} className={styles.metricIcon} />
            <span><strong>&lt; 30s</strong> AI Custom Tests</span>
          </div>
        </div>
      </div>
    </section>
  );
}
