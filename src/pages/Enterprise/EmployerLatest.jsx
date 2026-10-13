import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./EmployerLatest.module.css";
import { SEO } from "../../components/SEO/SEO.jsx";
import { hasActivePaidPlan } from "../../utils/checkJobPostingAccess";

// Modular Sub-components
import EmployerHero from "./components/EmployerLatest/EmployerHero";
import ClientProofCarousel from "./components/EmployerLatest/ClientProofCarousel";
import UnifiedHiringTimeline from "./components/EmployerLatest/UnifiedHiringTimeline";
import KeyBenefitsBento from "./components/EmployerLatest/KeyBenefitsBento";
import CommercialModels from "./components/EmployerLatest/CommercialModels";
import OpportunityLaunchpad from "./components/EmployerLatest/OpportunityLaunchpad";
import RecruiterTestimonials from "./components/EmployerLatest/RecruiterTestimonials";
import BookingModalAndCTA from "./components/EmployerLatest/BookingModalAndCTA";

/**
 * EmployerLatest Component
 * Fresh, high-contrast, professional employer landing page for engineerHUB.
 * Built with ShadCN/Uval.ai aesthetic tokens and #093341 primary theme.
 */
export default function EmployerLatest() {
  const location = useLocation();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const checkSub = async () => {
      try {
        const active = await hasActivePaidPlan();
        setIsPaid(Boolean(active));
      } catch (err) {
        setIsPaid(false);
      }
    };
    checkSub();
  }, []);

  // Handle URL hash navigation (e.g. #book-slot-section or #hire-talent-section)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const timer = window.setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [location.pathname, location.hash]);

  const scrollToHireTalent = () => {
    const elem = document.getElementById("hire-talent-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToBookSlot = () => {
    const elem = document.getElementById("book-slot-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SEO
      title="One Stop Hiring Solution for Companies | engineerHUB"
      description="engineerHUB is an AI-powered, end-to-end technical hiring platform enabling recruiters to source, screen, assess, and interview 300,000+ campus engineers across India from one unified workspace."
      keywords={[
        "hiring platform",
        "tech hiring",
        "campus recruitment",
        "ai resume screening",
        "coding assessment",
        "ai interview",
        "engineerHUB employer",
        "virtual hr",
        "campus placements",
      ]}
      canonical="https://www.engineerhub.in/employer"
    >
      <div className={styles.pageRoot}>
        {/* Main Content Sections */}
        <main className={styles.mainContent}>
          {/* 1. Hero Section */}
          <EmployerHero
            onHostOpportunityClick={scrollToHireTalent}
            onConnectWithUsClick={scrollToBookSlot}
          />

          {/* 2. Trust Proof & Case Studies ("Hire People; Not Resumes") */}
          <ClientProofCarousel />

          {/* 3. The 5-Step "All Under One Umbrella" Alternating Timeline */}
          <UnifiedHiringTimeline />

          {/* 4. Measurable Advantages Bento Grid */}
          <KeyBenefitsBento />

          {/* 5. Commercial Hiring Models (Self-Service vs Virtual HR) */}
          <CommercialModels />

          {/* 6. Direct Opportunity Launchpad (Jobs & Internships) */}
          <OpportunityLaunchpad isPaid={isPaid} />

          {/* 7. Verified Placement & Corporate Testimonials */}
          <RecruiterTestimonials />

          {/* 8. Bottom Booking & Direct Recruiter Helpline */}
          <BookingModalAndCTA />
        </main>
      </div>
    </SEO>
  );
}
