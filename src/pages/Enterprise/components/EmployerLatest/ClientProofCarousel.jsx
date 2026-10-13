import React, { useState } from "react";
import styles from "./ClientProofCarousel.module.css";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Bucket_URL } from "../../../../services/APIUtils";

const FEATURED_STORIES = [
  {
    company: "Baazi Games",
    logo: `${Bucket_URL}static/clientele/baazigames.png`,
    tagline: "Baazi Games: Campus Hiring at Scale",
    stat: "40% Time Saved",
    highlight: "Sourced and evaluated campus engineers with automated ATS scoring.",
  },
  {
    company: "Instabase",
    logo: `${Bucket_URL}static/clientele/instabase.png`,
    tagline: "Instabase: Fast-Track Tech Talent",
    stat: "Zero Interview Delays",
    highlight: "Conducted seamless coding rounds and aptitude tests with AI proctoring.",
  },
  {
    company: "BluSmart",
    logo: `${Bucket_URL}static/clientele/blusmart.png`,
    tagline: "BluSmart: Rapid Tech Scaling",
    stat: "3-Day Turnaround",
    highlight: "Pre-screened engineering candidates directly from tier-1 & tier-2 institutions.",
  },
  {
    company: "OpsLyft",
    logo: `${Bucket_URL}static/clientele/opslyft.png`,
    tagline: "OpsLyft: Multi-Campus Evaluation",
    stat: "High Quality Hires",
    highlight: "Custom assessments prepared in 30 seconds with proctored environments.",
  },
  {
    company: "TrulyMadly",
    logo: `${Bucket_URL}static/clientele/trulymadly.jpg`,
    tagline: "TrulyMadly: Core Developer Recruitment",
    stat: "Top 5% Developers",
    highlight: "Autonomous screening and skill evaluation from 300,000+ talent pool.",
  },
  {
    company: "Motherson",
    logo: `${Bucket_URL}static/clientele/motherson.png`,
    tagline: "Motherson: Precision Campus Drives",
    stat: "80% Screening Cut",
    highlight: "Unified candidate CRM and bulk status tracking from one dashboard.",
  },
];

const ALL_CLIENT_LOGOS = [
  `${Bucket_URL}static/clientele/acciojobs.png`,
  `${Bucket_URL}static/clientele/asbl.jpg`,
  `${Bucket_URL}static/clientele/baazigames.png`,
  `${Bucket_URL}static/clientele/blusmart.png`,
  `${Bucket_URL}static/clientele/garaaz.jpeg`,
  `${Bucket_URL}static/clientele/motherson.png`,
  `${Bucket_URL}static/clientele/opslyft.png`,
  `${Bucket_URL}static/clientele/proxgy.png`,
  `${Bucket_URL}static/clientele/Recruit.png`,
  `${Bucket_URL}static/clientele/responsenet.png`,
  `${Bucket_URL}static/clientele/serri.png`,
  `${Bucket_URL}static/clientele/superkalam.png`,
  `${Bucket_URL}static/clientele/trulymadly.jpg`,
  `${Bucket_URL}static/clientele/calix.png`,
  `${Bucket_URL}static/clientele/gururo.png`,
  `${Bucket_URL}static/clientele/infor.jpeg`,
  `${Bucket_URL}static/clientele/supermoney.jpg`,
  `${Bucket_URL}static/clientele/instabase.png`,
];

export default function ClientProofCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % FEATURED_STORIES.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + FEATURED_STORIES.length) % FEATURED_STORIES.length);
  };

  // Get current slice of 3 items (with wrap around)
  const displayedCards = [];
  for (let i = 0; i < visibleCount; i++) {
    const idx = (startIndex + i) % FEATURED_STORIES.length;
    displayedCards.push(FEATURED_STORIES[idx]);
  }

  const currentDisplayNumber = String(startIndex + 1).padStart(2, "0");
  const totalDisplayNumber = String(FEATURED_STORIES.length).padStart(2, "0");

  return (
    <section className={styles.proofSection}>
      <div className={styles.proofContainer}>
        {/* Top Split Header */}
        <div className={styles.splitHeader}>
          <div className={styles.leftCol}>
            <div className={styles.smallPill}>
              <Sparkles size={12} className={styles.pillIcon} />
              <span>Proven Enterprise Scale</span>
            </div>
            <h2 className={styles.boldTitle}>
              One Platform. <br />
              <span className={styles.subTitleLight}>Every Hiring Need.</span>
            </h2>
          </div>

          {/* <div className={styles.rightCol}>
            <p className={styles.headerDescription}>
              Project-based evaluations and skill-verified candidates across 800+ campuses in India.
              Over <strong>800+ top companies & startups</strong> have hired talent through engineerHUB.
            </p>
          </div> */}
        </div>

        {/* Featured Story Cards */}
        <div className={styles.cardsGrid}>
          {displayedCards.map((item, index) => (
            <div key={`${item.company}-${index}`} className={styles.storyCard}>
              <div className={styles.cardHeader}>
                <div className={styles.logoBox}>
                  <img src={item.logo} alt={item.company} className={styles.clientLogo} />
                </div>
                <span className={styles.statBadge}>{item.stat}</span>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.cardHighlight}>{item.highlight}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.taglineText}>{item.tagline}</span>
                <div className={styles.arrowIconWrap}>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination & Arrows Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.paginationIndicator}>
            <span className={styles.currentNum}>{currentDisplayNumber}</span>
            <span className={styles.slash}>/</span>
            <span className={styles.totalNum}>{totalDisplayNumber}</span>
          </div>

          <div className={styles.navButtons}>
            <button
              className={styles.navBtn}
              onClick={handlePrev}
              aria-label="Previous story"
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className={`${styles.navBtn} ${styles.navBtnActive}`}
              onClick={handleNext}
              aria-label="Next story"
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Continuous Client Logo Strip */}
        <div className={styles.clienteleMarqueeWrapper}>
          <div className={styles.marqueeHeader}>
            <span>TRUSTED BY 800+ HIRING TEAMS NATIONWIDE</span>
          </div>
          <div className={styles.marqueeTrack}>
            {[...ALL_CLIENT_LOGOS, ...ALL_CLIENT_LOGOS].map((logoUrl, i) => (
              <div key={i} className={styles.marqueeItem}>
                <img
                  src={logoUrl}
                  alt="Client"
                  className={styles.marqueeLogo}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
