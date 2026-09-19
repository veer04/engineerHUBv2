import React from "react";
import { CheckCircle2, Clock, Sparkles, Filter, FileCheck, Mic, ArrowRight } from "lucide-react";
import "./CurrentPlanCard.css";

export default function CurrentPlanCard({ subscription, onManagePlan }) {
  const {
    planId = "free",
    planName = "Free",
    status = "active",
    creditsTotal = 0,
    creditsUsed = 0,
    creditsRemaining = 0,
    renewsInDays = 30,
  } = subscription || {};

  const isFreePlan = planId.toLowerCase() === "free" || creditsTotal === 0;

  const usagePercent = creditsTotal > 0
    ? Math.min(Math.round((creditsUsed / creditsTotal) * 100), 100)
    : 0;

  // Dynamic capability estimates based on remaining credits
  const sortingCount = Math.max(Math.floor(creditsRemaining / 1), 0);
  const assessmentCount = Math.max(Math.floor(creditsRemaining / 5), 0);
  const interviewCount = Math.max(Math.floor(creditsRemaining / 10), 0);

  const planTiers = [
    { id: "starter", name: "Starter", price: "₹99/mo" },
    { id: "ultra", name: "Ultra", price: "₹999/mo" },
    { id: "pro", name: "Professional", price: "₹4,999/mo" },
  ];

  const isCurrentPlan = (id) => {
    const norm = (planId || "").toLowerCase();
    return norm.includes(id);
  };

  return (
    <div className="current-plan-section">
      {/* 1. Plan Chips Header Bar */}
      <div className="plan-chips-header-bar">
        <div className="plan-chips-intro">
          <span className="plan-chips-label">SUBSCRIPTION PLAN TIERS</span>
          <span className="plan-chips-subtext">Highlighting active recruiter plan tier</span>
        </div>
        <div className="plan-chips-grid">
          {planTiers.map((tier) => {
            const active = isCurrentPlan(tier.id);
            return (
              <button
                key={tier.id}
                type="button"
                className={`plan-tier-chip ${active ? "chip-active" : "chip-inactive"}`}
                onClick={onManagePlan}
              >
                <div className="chip-content-wrap">
                  <span className="chip-name">{tier.name}</span>
                  <span className="chip-price">({tier.price})</span>
                </div>
                {active ? (
                  <span className="chip-badge chip-badge-active">
                    <CheckCircle2 size={12} /> Active Plan
                  </span>
                ) : (
                  <span className="chip-badge chip-badge-upgrade">
                    Upgrade <ArrowRight size={11} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Subscription Card */}
      <div className={`current-plan-card ${isFreePlan ? "free-plan-card" : ""}`}>
        <div className="current-plan-info">
          <div className="current-plan-header-row">
            <span className="current-plan-badge-tag">YOUR ACTIVE SUBSCRIPTION</span>
            <span className="active-status-dot"><span className="dot-pulse" /> Active</span>
          </div>

          <h2 className="current-plan-header-title">{planName} Plan</h2>
          
          {isFreePlan ? (
            <p className="current-plan-subtext free-plan-subtext">
              No AI credits included in Free Plan
            </p>
          ) : (
            <p className="current-plan-subtext">
              {creditsRemaining.toLocaleString()} AI Credits Remaining of {creditsTotal.toLocaleString()} total credits
            </p>
          )}

          {/* Usage Section */}
          {!isFreePlan && creditsTotal > 0 && (
            <div className="credit-progress-wrap">
              <div className="credit-progress-header">
                <span className="credit-progress-title">
                  {creditsUsed.toLocaleString()} used of {creditsTotal.toLocaleString()} credits
                </span>
                <span className="credit-progress-val">{usagePercent}% Used</span>
              </div>
              <div className="credit-progress-track">
                <div
                  className="credit-progress-fill"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="current-plan-actions">
          <div className="renew-status-chip">
            <Clock size={14} />
            <span>
              {status === "active"
                ? `Renews in ${renewsInDays} days`
                : "Plan Active"}
            </span>
          </div>

          <button
            className={`btn-manage-plan ${isFreePlan ? "btn-upgrade-highlight" : ""}`}
            onClick={onManagePlan}
          >
            {isFreePlan ? "Upgrade Plan" : "Manage Plan"} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3. Capability Calculations Breakdown */}
      <div className="credits-capability-breakdown">
        <div className="capability-header">
          <div className="capability-title">
            <Sparkles size={16} className="sparkle-icon-animated" />{" "}
            {isFreePlan ? (
              <span>Upgrade your plan to unlock AI features:</span>
            ) : (
              <span>What you can do with your remaining <strong>{creditsRemaining.toLocaleString()} AI credits</strong>:</span>
            )}
          </div>
        </div>

        {isFreePlan && (
          <div className="zero-credits-alert-banner">
            <span>
              You are currently on the <strong>Free Plan</strong> with 0 AI credits. Upgrade to Starter, Ultra, or Professional to enable AI candidate ranking, proctored assessments, and automated interviews.
            </span>
            <button
              type="button"
              className="zero-credits-upgrade-btn"
              onClick={onManagePlan}
            >
              Upgrade Now <ArrowRight size={13} />
            </button>
          </div>
        )}

        <div className="capability-cards-grid">
          {/* Capability 1: AI Resume Sorting */}
          <div className="capability-card card-sorting">
            <div className="capability-icon-box box-sorting">
              <Filter size={20} />
            </div>
            <div className="capability-info">
              <span className="capability-number">~{sortingCount.toLocaleString()}</span>
              <span className="capability-label">Resumes Screened</span>
              <p className="capability-desc">AI-powered resume sorting & instant candidate ranking</p>
            </div>
            <span className="capability-pill pill-sorting">1 Credit / Resume</span>
          </div>

          {/* Capability 2: AI Skill Assessments */}
          <div className="capability-card card-assessment">
            <div className="capability-icon-box box-assessment">
              <FileCheck size={20} />
            </div>
            <div className="capability-info">
              <span className="capability-number">~{assessmentCount.toLocaleString()}</span>
              <span className="capability-label">AI Assessments</span>
              <p className="capability-desc">Automated skill tests with AI proctoring & detailed reports</p>
            </div>
            <span className="capability-pill pill-assessment">5 Credits / Assessment</span>
          </div>

          {/* Capability 3: AI Voice & Video Interviews */}
          <div className="capability-card card-interview">
            <div className="capability-icon-box box-interview">
              <Mic size={20} />
            </div>
            <div className="capability-info">
              <span className="capability-number">~{interviewCount.toLocaleString()}</span>
              <span className="capability-label">AI Interviews</span>
              <p className="capability-desc">Autonomous recruiter Sanya conducting 1-on-1 interviews</p>
            </div>
            <span className="capability-pill pill-interview">10 Credits / Interview</span>
          </div>
        </div>
      </div>
    </div>
  );
}

