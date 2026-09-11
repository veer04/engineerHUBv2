import React, { useState } from "react";
import { Check, Lock, X, Zap, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import PlanComparison from "./PlanComparison";
import { comparisonMatrix } from "../../../../config/plansConfig";
import "../PricingPage.css";

export default function PricingSection({
  plans,
  currentPlanId,
  onSelectPlan,
}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section className="pricing-section" id="self-service-plans">
      <div className="section-title-wrap">
        <div className="section-pill-badge">PLANS FOR EVERY HIRING STAGE</div>
        <h2 className="section-title">Hire by yourself</h2>
        <p className="section-subtitle">
          Everything you need to run your hiring process from one platform.
        </p>
      </div>

      {/* Billing Toggle: Monthly vs Annual */}
      <div className="billing-toggle-wrap">
        <span
          className={`billing-toggle-lbl ${!isAnnual ? "active" : ""}`}
          onClick={() => setIsAnnual(false)}
        >
          Monthly Billing
        </span>

        <div
          className={`billing-switch ${isAnnual ? "on" : ""}`}
          onClick={() => setIsAnnual(!isAnnual)}
          role="button"
          tabIndex={0}
          aria-label="Toggle annual billing"
        >
          <div className="billing-slider" />
        </div>

        <span
          className={`billing-toggle-lbl ${isAnnual ? "active" : ""}`}
          onClick={() => setIsAnnual(true)}
        >
          Annual Billing
        </span>

        <span className="discount-badge">Save up to 20%</span>
      </div>

      {/* Major Pricing Container Grid */}
      <div className="pricing-cards-grid">
        {plans.map((plan) => {
          const normCurrent = (currentPlanId || "free").toLowerCase();
          const normPlan = plan.id.toLowerCase();
          const isCurrent =
            normCurrent === normPlan ||
            (normPlan === "pro" && normCurrent === "professional") ||
            (normPlan === "professional" && normCurrent === "pro");

          const isPro = plan.isRecommended;
          const price = isAnnual
            ? plan.priceDisplayAnnual
            : plan.priceDisplayMonthly;

          return (
            <div
              key={plan.id}
              className={`pricing-card ${isPro ? "recommended-card" : ""} ${
                isCurrent ? "current-active-plan-card" : ""
              }`}
              onClick={() => onSelectPlan(plan, isAnnual ? "annual" : "monthly")}
              style={{ cursor: "pointer" }}
            >
              {isCurrent ? (
                <div className="popular-ribbon active-plan-ribbon">YOUR CURRENT PLAN</div>
              ) : (
                plan.badge && <div className="popular-ribbon">{plan.badge}</div>
              )}

              <div className="pricing-card-top">
                <h3 className="plan-card-name">{plan.name}</h3>
                <p className="plan-card-desc">{plan.description}</p>

                <div className="plan-card-price-wrap">
                  <span className="plan-price-num">{price}</span>
                  <div className="plan-price-cycle">{plan.billingCycleText}</div>
                </div>

                {/* Integrated AI Credit Allowance */}
                <div className="plan-credit-highlight">
                  <Zap size={16} className="credit-zap-icon" />
                  <div>
                    <div className="credit-main-text">{plan.creditsDisplay}</div>
                    <div className="credit-sub-text">
                      Use across AI Sorting, AI Assessment & AI Interview
                    </div>
                  </div>
                </div>

                <div className="plan-features-divider">Platform & AI Capabilities</div>

                <div className="plan-features-list">
                  {plan.features.map((feat, fIdx) => {
                    let IconComp = <Check className="feature-icon-chk" size={16} />;
                    if (feat.locked) {
                      IconComp = <Lock className="feature-icon-lock" size={16} />;
                    } else if (!feat.included) {
                      IconComp = <X className="feature-icon-cross" size={16} />;
                    }

                    return (
                      <div
                        key={fIdx}
                        className={`plan-feature-item ${
                          !feat.included ? "disabled" : ""
                        }`}
                      >
                        {IconComp}
                        <span>
                          {feat.text}
                          {feat.badge && (
                            <span className={`feat-inline-badge feat-badge-${feat.badge.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                              {feat.badge}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pricing-card-bottom">
                <button
                  type="button"
                  className={`btn-plan-cta ${
                    isCurrent
                      ? "btn-plan-secondary btn-plan-active-current"
                      : plan.ctaVariant === "primary"
                      ? "btn-plan-primary"
                      : plan.ctaVariant === "outline"
                      ? "btn-plan-outline"
                      : "btn-plan-dark"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlan(plan, isAnnual ? "annual" : "monthly");
                  }}
                >
                  {isCurrent
                    ? "✓ Current Plan"
                    : plan.ctaText || `Choose ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Toggle Button */}
      <div className="comparison-toggle-bar">
        <button
          className="btn-toggle-comparison"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? (
            <>
              Hide Detailed Plan Comparison <ChevronUp size={16} />
            </>
          ) : (
            <>
              Compare All Plan Features & SLAs <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {/* Full Comparison Matrix */}
      {showComparison && (
        <div className="comparison-wrapper-box">
          <PlanComparison matrix={comparisonMatrix} />
        </div>
      )}
    </section>
  );
}
