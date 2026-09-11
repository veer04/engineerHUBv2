import React from "react";
import { ArrowRight, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import "../PricingPage.css";

export default function PlansFooterCTA({ onPostJob, onPostInternship, onTalkToTeam }) {
  return (
    <section className="plans-footer-banner" id="ready-to-hire-banner">
      <div className="footer-banner-badge">
        <Sparkles size={14} /> GET STARTED TODAY
      </div>
      <h2>Ready to hire smarter?</h2>
      <p>
        Whether you want the tools or want us to manage the process, engineerHUB
        has you covered.
      </p>

      <div className="banner-buttons-wrap">
        <button className="btn-banner-primary" onClick={onPostJob}>
          <Briefcase size={18} /> Post Job
        </button>
        <button className="btn-banner-primary btn-banner-internship" onClick={onPostInternship}>
          <GraduationCap size={18} /> Post Internship
        </button>
        <button className="btn-banner-secondary" onClick={onTalkToTeam}>
          Talk to Our Team
        </button>
      </div>
    </section>
  );
}
