import React from "react";
import { Laptop, Sparkles, Users, ArrowRight } from "lucide-react";
import "../PricingPage.css";


export default function ThreeHiringModes({
  onSelectSelf,
  onSelectAI,
  onSelectVirtual,
}) {
  const modes = [
    {
      id: "diy",
      number: "01",
      title: "DO IT YOURSELF",
      desc: "Use the platform and manage hiring yourself.",
      icon: <Laptop size={22} className="mode-icon-diy" />,
      colorClass: "mode-card-diy",
      action: onSelectSelf,
      buttonText: "Explore Self-Service",
    },
    {
      id: "ai",
      number: "02",
      title: "AI-POWERED",
      desc: "Use AI Sorting, AI Assessments and Sanya AI Interviews to accelerate hiring.",
      icon: <Sparkles size={22} className="mode-icon-ai" />,
      colorClass: "mode-card-ai",
      action: onSelectAI,
      buttonText: "View AI Capabilities",
    },
    {
      id: "virtual",
      number: "03",
      title: "VIRTUAL HR",
      desc: "Let our team manage hiring end-to-end.",
      icon: <Users size={22} className="mode-icon-virtual" />,
      colorClass: "mode-card-virtual",
      action: onSelectVirtual,
      buttonText: "Connect With Virtual HR",
    },
  ];

  return (
    <section className="three-modes-section">
      <div className="section-title-wrap">
        <div className="section-pill-badge">SUMMARY OF SOLUTIONS</div>
        <h2 className="section-title">Three ways to hire with engineerHUB</h2>
        <p className="section-subtitle">
          Flexibility to choose the level of platform support and automation that fits your organization.
        </p>
      </div>

      <div className="three-modes-grid">
        {modes.map((mode) => (
          <div key={mode.id} className={`three-mode-card ${mode.colorClass}`}>
            <div className="mode-card-header">
              <div className="mode-card-icon">{mode.icon}</div>
              <span className="mode-card-num">{mode.number}</span>
            </div>

            <h3 className="mode-card-title">{mode.title}</h3>
            <p className="mode-card-desc">{mode.desc}</p>

            <button className="btn-mode-cta" onClick={mode.action}>
              {mode.buttonText} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
