import React, { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  FileCheck,
  Video,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "../PricingPage.css";

const SHUFFLE_KEYWORDS = ["Recruiters", "Founders", "Startups", "Companies", "HRs"];

export default function PlansHero({ onPostJob, onPostInternship, onTalkToTeam }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentFullWord = SHUFFLE_KEYWORDS[wordIndex % SHUFFLE_KEYWORDS.length];
    let timer;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullWord.substring(0, displayedText.length - 1));
        }, 50); // Speed of backspacing
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % SHUFFLE_KEYWORDS.length);
      }
    } else {
      if (displayedText.length < currentFullWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullWord.substring(0, displayedText.length + 1));
        }, 100); // Speed of typing
      } else {
        // Pause when word is completely typed out
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  const journeySteps = [
    {
      id: "source",
      title: "SOURCE",
      subtitle: "Find relevant engineering talent",
      icon: <Users className="journey-step-icon" size={20} />,
      badgeColor: "teal",
    },
    {
      id: "engage",
      title: "ENGAGE",
      subtitle: "Reach and manage candidates",
      icon: <MessageSquare className="journey-step-icon" size={20} />,
      badgeColor: "blue",
    },
    {
      id: "assess",
      title: "ASSESS",
      subtitle: "Evaluate skills with AI-powered assessments",
      icon: <FileCheck className="journey-step-icon" size={20} />,
      badgeColor: "purple",
    },
    {
      id: "interview",
      title: "INTERVIEW",
      subtitle: "Conduct manual or AI interviews",
      icon: <Video className="journey-step-icon" size={20} />,
      badgeColor: "violet",
    },
    {
      id: "hire",
      title: "HIRE",
      subtitle: "Shortlist, communicate and close candidates",
      icon: <CheckCircle2 className="journey-step-icon" size={20} />,
      badgeColor: "emerald",
    },
  ];

  return (
    <section className="plans-hero-section">

      {/* <div className="plans-hero-badge">
        <Sparkles size={15} />
        <span>HIRING SOLUTIONS & PLATFORM</span>
      </div> */}

      <h1 className="plans-hero-headline">
        One-stop hiring solution for{" "}
        <span className="typewriter-word">{displayedText}</span>
        <span className="typewriter-cursor">|</span>
      </h1>

      {/* <p className="plans-hero-tagline">
        Source, engage, assess, interview and hire - all from one platform.
      </p> */}

      <p className="plans-hero-description">
        engineerHUB combines a powerful hiring platform with AI-powered recruitment
        tools and an expert hiring team, helping companies manage the entire hiring
        journey without relying on multiple recruitment tools.
      </p>

      {/* <div className="plans-hero-actions">
        <button className="btn-hero-primary" onClick={onStartHiring}>
          Start Hiring <ArrowRight size={18} />
        </button>
        <button className="btn-hero-secondary" onClick={onTalkToTeam}>
          Talk to Our Hiring Team
        </button>
      </div> */}

      {/* Hiring Journey Connected Visual */}
      <div className="hiring-journey-visual">
        <div className="journey-header-label">END-TO-END HIRING WORKFLOW</div>
        <div className="journey-steps-grid">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className={`journey-step-card step-color-${step.badgeColor}`}>
                <div className="step-icon-wrap">{step.icon}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-subtitle">{step.subtitle}</p>
              </div>
              {idx < journeySteps.length - 1 && (
                <div className="journey-connector-arrow">
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
