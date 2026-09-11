import React from "react";
import { Filter, FileCheck, Mic, Lock, CheckCircle, Sparkles } from "lucide-react";
import "../PricingPage.css";

export default function CreditWallet({ rates, currentPlanId, onUpgradeClick }) {
  const isFreePlan = currentPlanId === "free";

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "sorting":
        return <Filter size={22} />;
      case "assessment":
        return <FileCheck size={22} />;
      case "interview":
        return <Mic size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section className="credit-wallet-section">
      <div className="section-title-wrap">
        <div className="section-pill-badge">
          <Sparkles size={14} /> AI CREDIT WALLET
        </div>
        <h2 className="section-title">One balance. Three AI hiring tools.</h2>
        <p className="section-subtitle">
          Your subscription provides a unified pool of AI Credits. Allocate them dynamically across any of our AI recruitment tools based on your active hiring needs.
        </p>
      </div>

      <div className="wallet-cards-grid">
        {rates.map((item) => {
          const isInterview = item.id === "interview";
          const isLockedForUser = isInterview && isFreePlan;

          return (
            <div
              key={item.id}
              className={`wallet-card ${
                isInterview ? "wallet-card-ai-interview" : ""
              }`}
            >
              <div className="wallet-card-top">
                <div className="wallet-card-header">
                  <div
                    className={`wallet-icon-box wallet-icon-${item.iconType}`}
                  >
                    {renderIcon(item.iconType)}
                  </div>

                  <span
                    className={`wallet-rate-badge ${
                      isInterview ? "purple-rate" : ""
                    }`}
                  >
                    {item.rate}
                  </span>
                </div>

                <h3 className="wallet-card-title">{item.title}</h3>
                <div className="wallet-card-subtitle">{item.subtitle}</div>
                <p className="wallet-card-desc">{item.description}</p>
              </div>

              <div className="wallet-card-footer">
                {isLockedForUser ? (
                  <div className="lock-status-free">
                    <Lock size={14} />
                    <span>Paid Plan Only</span>
                  </div>
                ) : (
                  <div className="access-status-active">
                    <CheckCircle size={15} />
                    <span>Available with Credits</span>
                  </div>
                )}
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  {item.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* If User is on Free plan, show prominent Sanya Upgrade Banner */}
      {isFreePlan && (
        <div className="sanya-lock-banner">
          <div className="sanya-banner-text">
            <div className="sanya-avatar-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="sanya-banner-title">
                Ready for conversational AI interviews?
              </div>
              <div className="sanya-banner-desc">
                AI Voice Recruiter Sanya is available on Starter, Professional & Enterprise plans.
              </div>
            </div>
          </div>
          <button className="btn-unlock-sanya" onClick={onUpgradeClick}>
            Upgrade to unlock Sanya
          </button>
        </div>
      )}
    </section>
  );
}
