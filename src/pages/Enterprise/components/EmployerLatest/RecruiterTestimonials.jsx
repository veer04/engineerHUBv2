import React, { useState } from "react";
import styles from "./RecruiterTestimonials.module.css";
import { UserCheck, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Mr. RB Mouli",
    title: "Placement Head",
    institution: "Birla Campus",
    quote:
      "engineerHUB improved our hiring process by reducing time by 40%, using ATS scoring, bulk actions, and advanced filtering, saving countless hours and effort efficiently.",
    avatar: "RM",
  },
  {
    name: "Mr. Rakesh Singh",
    title: "Placement Cell",
    institution: "NIET",
    quote:
      "Assessments, interview scheduling, and automated notifications from EngineerHUB ensure a smooth recruitment process, simplifying coding rounds, aptitude tests, and enhancing team productivity.",
    avatar: "RS",
  },
  {
    name: "Mrs. Sonal",
    title: "Human Resource",
    institution: "TCS",
    quote:
      "Role-based access allows secure workflows, while analytics tools provide actionable insights, enabling our team to refine strategies and achieve recruitment goals faster than expected.",
    avatar: "S",
  },
  {
    name: "Mrs. Rashmi Sharma",
    title: "Associate HR",
    institution: "Infosys",
    quote:
      "EngineerHUB automated updates, interview rescheduling, and pre-placement talks improve candidate engagement, boosting feedback and employer branding, ensuring a better recruitment experience overall.",
    avatar: "RS",
  },
];

export default function RecruiterTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <Sparkles size={12} className={styles.pillIcon} />
            <span>AUTHENTIC EXPERIENCES</span>
          </div>
          <h2 className={styles.title}>Trusted by Hiring Teams</h2>
          <p className={styles.subtitle}>
            Hear how placement directors and enterprise recruitment leaders transform their campus workflows.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className={styles.cardsGrid}>
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIconWrap}>
                <Quote size={20} className={styles.quoteIcon} />
              </div>

              <p className={styles.quoteText}>"{item.quote}"</p>

              <div className={styles.authorRow}>
                <div className={styles.avatarCircle}>{item.avatar}</div>
                <div className={styles.authorMeta}>
                  <strong className={styles.authorName}>{item.name}</strong>
                  <span className={styles.authorTitle}>
                    {item.title}, {item.institution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
