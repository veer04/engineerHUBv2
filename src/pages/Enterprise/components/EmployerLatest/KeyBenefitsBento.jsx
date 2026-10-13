import React from "react";
import styles from "./KeyBenefitsBento.module.css";
import { Sparkles, Clock, Code2, Bot, Users, Check } from "lucide-react";

const BENEFITS = [
  {
    stat: "80%",
    accentBg: "#ffedd5",
    accentText: "#c2410c",
    accentBorder: "#fed7aa",
    icon: Clock,
    badgeText: "Resume Screening",
    headline: "Cut Screening Time by 80%",
    description:
      "Eliminate manual resume parsing. Gemini AI automatically matches student profiles against your job description requirements, scoring skills and experience objectively.",
    bullets: ["Zero manual keyword skimming", "Deep project & code validation", "Automated fitment rankings"],
  },
  {
    stat: "< 30s",
    accentBg: "#dbeafe",
    accentText: "#1d4ed8",
    accentBorder: "#bfdbfe",
    icon: Code2,
    badgeText: "AI Assessment",
    headline: "Instant Custom Technical Tests",
    description:
      "Prepare custom coding environments and CS aptitude assessments in under 30 seconds. Tailor difficulty to Junior, Mid, or Senior engineering levels.",
    bullets: ["Multi-language coding sandbox", "Dynamic AI question generation", "Anti-cheat proctoring checks"],
  },
  {
    stat: "24/7",
    accentBg: "#f3e8ff",
    accentText: "#7e22ce",
    accentBorder: "#e9d5ff",
    icon: Bot,
    badgeText: "Smart Interview",
    headline: "Autonomous Technical Interviews",
    description:
      "Fast-forward hiring cycles by letting our autonomous AI agent conduct preliminary technical rounds with live speech recognition, transcripts, and evaluation scorecards.",
    bullets: ["Google Meet calendar integration", "Objective question-by-question scoring", "Real-time webcam & audio proctoring"],
  },
  {
    stat: "300k+",
    accentBg: "#dcfce7",
    accentText: "#15803d",
    accentBorder: "#bbf7d0",
    icon: Users,
    badgeText: "Campus Reach",
    headline: "Direct Nationwide Sourcing",
    description:
      "Break free from geographical boundaries. Tap directly into 800+ engineering institutions across India with verified candidates visiting engineerHUB monthly.",
    bullets: ["Tier-1, 2, and 3 campus connectivity", "Pre-vetted project portfolios", "Direct batch & branch targeting"],
  },
];

export default function KeyBenefitsBento() {
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.benefitsContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <Sparkles size={12} className={styles.pillIcon} />
            <span>MEASURABLE RECRUITMENT ADVANTAGES</span>
          </div>
          <h2 className={styles.sectionTitle}>Key Benefits</h2>
          <p className={styles.sectionSubtitle}>
            Engineered to remove friction from every phase of your engineering recruitment lifecycle.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={styles.bentoCard}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.statPill}
                    style={{
                      backgroundColor: item.accentBg,
                      color: item.accentText,
                      borderColor: item.accentBorder,
                    }}
                  >
                    <Icon size={14} />
                    <span>{item.badgeText}</span>
                  </div>
                  <span className={styles.giantStat} style={{ color: item.accentText }}>
                    {item.stat}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{item.headline}</h3>
                <p className={styles.cardDescription}>{item.description}</p>

                <ul className={styles.bulletList}>
                  {item.bullets.map((b, i) => (
                    <li key={i}>
                      <Check size={13} style={{ color: item.accentText, flexShrink: 0 }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
