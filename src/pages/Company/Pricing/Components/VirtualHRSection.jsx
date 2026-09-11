import React from "react";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Headphones,
  Sparkles,
} from "lucide-react";
import "../PricingPage.css";


export default function VirtualHRSection({ onConnectWithUs, onTalkToExpert }) {
  const processSteps = [
    {
      num: "01",
      title: "UNDERSTAND",
      desc: "Understand your role, requirements and hiring goals.",
    },
    {
      num: "02",
      title: "SOURCE",
      desc: "Identify and source relevant candidates from our network.",
    },
    {
      num: "03",
      title: "SCREEN",
      desc: "Review, shortlist and evaluate candidates.",
    },
    {
      num: "04",
      title: "ASSESS",
      desc: "Use role-specific assessments and AI-powered evaluation where required.",
    },
    {
      num: "05",
      title: "INTERVIEW",
      desc: "Coordinate manual interviews or AI interviews based on your process.",
    },
    {
      num: "06",
      title: "SHORTLIST",
      desc: "Present qualified candidates to your hiring team.",
    },
    {
      num: "07",
      title: "OFFER",
      desc: "Support the final hiring and offer process.",
    },
  ];

  return (
    <section className="virtual-hr-section" id="virtual-hr-section">
      <div className="virtual-hr-container">
        {/* Header Header */}
        <div className="virtual-hr-header">
          <div className="virtual-hr-badge">
            <Users size={15} /> MANAGED HIRING SERVICES
          </div>

          <div className="virtual-hr-question">
            Don't want to manage hiring yourself?
          </div>

          <h2 className="virtual-hr-headline">
            Let our Virtual HR team handle it for you.
          </h2>

          <p className="virtual-hr-description">
            From sourcing the right candidates to coordinating interviews and moving
            shortlisted candidates toward the final offer, our team manages the hiring
            process around your requirements.
          </p>
        </div>

        {/* Process Flow 7 Steps Timeline */}
        <div className="virtual-hr-process-wrap">
          <div className="process-header-title">THE VIRTUAL HR PROCESS</div>
          <div className="process-flow-grid">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="process-step-card">
                <div className="process-step-num">{step.num}</div>
                <h4 className="process-step-title">{step.title}</h4>
                <p className="process-step-desc">{step.desc}</p>
                {idx < processSteps.length - 1 && (
                  <div className="process-flow-arrow">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Virtual HR Bottom Lead Card */}
        <div className="virtual-hr-lead-card">
          <div className="lead-card-left">
            <div className="lead-icon-box">
              <Headphones size={26} />
            </div>
            <div>
              <h3 className="lead-card-title">Have a hiring requirement?</h3>
              <p className="lead-card-subtitle">
                Tell us what you're hiring for. We'll take it from there.
              </p>
            </div>
          </div>

          <div className="lead-card-actions">
            <button className="btn-lead-primary" onClick={onConnectWithUs}>
              Connect With Us <ArrowRight size={16} />
            </button>
            <button className="btn-lead-secondary" onClick={onTalkToExpert}>
              Talk to a Hiring Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
