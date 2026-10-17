import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ShieldCheck,
  X,
  Search,
  CheckCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  CreditCard,
  User,
  Building,
  RefreshCw,
  Zap,
  Clock,
  Info,
} from "lucide-react";
import { API_URL } from "../../services/APIUtils";
import { getAccessToken } from "../../features/User/UserDetails";
import "./AdminSubscriptionModal.css";

/**
 * AdminSubscriptionModal
 * Allows authorized admins to manually assign, renew, or expire subscriptions
 * for Alumni and Organizations, bypassing payment and directly syncing with the DB.
 */
export default function AdminSubscriptionModal({ isOpen, onClose, onSuccess }) {
  const [accountType, setAccountType] = useState("Alumni");
  const [email, setEmail] = useState("");
  const [planId, setPlanId] = useState("starter");
  const [status, setStatus] = useState("active");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [suggestedType, setSuggestedType] = useState(null);

  if (!isOpen) return null;

  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;

  // Quick lookup helper to verify account details
  const handleLookup = async (emailToLookup, typeToUse) => {
    const targetEmail = (emailToLookup || email).trim();
    const type = typeToUse || accountType;
    if (!targetEmail) return;

    try {
      setIsLookingUp(true);
      setLookupError("");
      setSuggestedType(null);
      const token = getAccessToken();
      const res = await axios.get(
        `${baseUrl}api/v1/plans/admin/lookup-account?accountType=${type}&email=${encodeURIComponent(
          targetEmail
        )}`,
        {
          headers: {
            accessToken: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success && res.data?.data) {
        if (res.data.data.exists) {
          const acc = res.data.data.account;
          setAccountInfo({
            ...acc,
            warning: res.data.data.warning || null,
          });
          setLookupError("");
          setSuggestedType(null);

          // If the account has an active or previous subscription plan, default the plan selection
          if (
            acc.currentPlan &&
            acc.currentPlan !== "free" &&
            ["starter", "ultra", "professional"].includes(acc.currentPlan.toLowerCase())
          ) {
            setPlanId(acc.currentPlan.toLowerCase());
          }
        } else {
          setAccountInfo(null);
          setLookupError(res.data.data.warning || `No ${type} found with email "${targetEmail}".`);
          setSuggestedType(res.data.data.suggestedAccountType || null);
        }
      }
    } catch (err) {
      console.error("Account lookup error:", err);
      const msg = err.response?.data?.message || "Failed to verify account. Please check email and try again.";
      setAccountInfo(null);
      setLookupError(msg);
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      toast.error("Please enter a valid account email.", { position: "top-right" });
      return;
    }

    if (!accountInfo) {
      toast.warning("Please click 'Verify' to validate this account before proceeding.", {
        position: "top-right",
      });
      return;
    }

    if (lookupError) {
      toast.error(lookupError, { position: "top-right" });
      return;
    }

    if (status === "cancel_renewal") {
      if (
        accountInfo.isExpired ||
        accountInfo.currentPlan === "free" ||
        accountInfo.subscriptionState === "none"
      ) {
        toast.warning(
          "This account does not currently have an active subscription to cancel auto-renewal.",
          { position: "top-right" }
        );
        return;
      }
      if (accountInfo.autoRenew === false || accountInfo.cancelAtPeriodEnd) {
        toast.info(
          `Auto-renewal is already OFF for this account. Plan remains active until ${accountInfo.formattedExpiresAt}.`,
          { position: "top-right" }
        );
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const token = getAccessToken();

      const payload = {
        accountType,
        email: cleanEmail,
        planId,
        status,
        billingCycle,
      };

      const res = await axios.post(
        `${baseUrl}api/v1/plans/admin/assign-subscription`,
        payload,
        {
          headers: {
            accessToken: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Subscription updated successfully!", {
          position: "top-right",
        });

        // Trigger parent refresh
        if (onSuccess) {
          onSuccess(res.data.data);
        }

        // Close modal
        onClose();
      } else {
        toast.error(res.data?.message || "Failed to update subscription.", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Admin assign subscription error:", err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred while updating the subscription.";
      toast.error(msg, { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-sub-modal-overlay" onClick={onClose}>
      <div
        className="admin-sub-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="admin-sub-modal-header">
          <div>
            <h2 className="admin-sub-header-title">
              <ShieldCheck size={22} color="#34d399" />
              Admin Subscription Override
              <span className="admin-sub-header-badge">Direct Sync</span>
            </h2>
            <p className="admin-sub-header-sub">
              Bypasses payment and directly activates or expires a plan in the database.
            </p>
          </div>
          <button
            type="button"
            className="admin-sub-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="admin-sub-modal-body">
          {/* 1. Account Type Selection */}
          <div className="admin-sub-form-group">
            <label className="admin-sub-label">
              {accountType === "Alumni" ? <User size={15} /> : <Building size={15} />}
              Account Type
            </label>
            <select
              className="admin-sub-select"
              value={accountType}
              onChange={(e) => {
                const newType = e.target.value;
                setAccountType(newType);
                setAccountInfo(null);
                setLookupError("");
                setSuggestedType(null);
                if (email.trim()) {
                  handleLookup(email, newType);
                }
              }}
            >
              <option value="Alumni">Alumni Account</option>
              <option value="Organization">Organization / Employer Account</option>
            </select>
          </div>

          {/* 2. Email of the Account */}
          <div className="admin-sub-form-group">
            <label className="admin-sub-label">Account Email (One at a time)</label>
            <div className="admin-sub-email-input-wrapper">
              <input
                type="email"
                className="admin-sub-input"
                placeholder={`Enter registered ${accountType === "Alumni" ? "alumni" : "employer / organization"} email`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAccountInfo(null);
                  setLookupError("");
                  setSuggestedType(null);
                }}
                onBlur={() => {
                  if (email.trim() && !accountInfo) {
                    handleLookup(email);
                  }
                }}
                required
              />
              <button
                type="button"
                className="admin-sub-lookup-btn"
                onClick={() => handleLookup(email)}
                disabled={isLookingUp || !email.trim()}
              >
                {isLookingUp ? <RefreshCw size={14} className="spin" /> : <Search size={14} />}
                Verify
              </button>
            </div>
          </div>

          {/* Account Lookup Preview Card */}
          {accountInfo && (
            <div className="admin-sub-account-preview">
              {/* Header: Name, Account Type Pill, Dynamic Status Badge */}
              <div className="admin-sub-preview-header">
                <div className="admin-sub-preview-user-info">
                  <span className="admin-sub-preview-name">{accountInfo.name}</span>
                  <span className="admin-sub-preview-type-pill">
                    {accountInfo.accountType === "Organization" ? (
                      <Building size={12} />
                    ) : (
                      <User size={12} />
                    )}
                    {accountInfo.accountType} Profile
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                  <div
                    className={`admin-sub-preview-status-badge ${
                      accountInfo.statusBadgeType ||
                      (accountInfo.subscriptionState === "active"
                        ? "active"
                        : accountInfo.subscriptionState === "expiring_soon"
                        ? "expiring"
                        : accountInfo.subscriptionState === "cancellation_scheduled"
                        ? "cancelling"
                        : accountInfo.subscriptionState === "expired"
                        ? "expired"
                        : "none")
                    }`}
                  >
                    {accountInfo.statusBadgeType === "active" && <CheckCircle2 size={12} />}
                    {(accountInfo.statusBadgeType === "expiring_soon" ||
                      accountInfo.subscriptionState === "expiring_soon") && <Clock size={12} />}
                    {(accountInfo.statusBadgeType === "cancelling" ||
                      accountInfo.subscriptionState === "cancellation_scheduled") && (
                      <AlertTriangle size={12} />
                    )}
                    {accountInfo.statusBadgeType === "expired" && <AlertTriangle size={12} />}
                    <span>
                      {accountInfo.statusBadgeText ||
                        (accountInfo.subscriptionState === "active"
                          ? "Active Plan"
                          : accountInfo.subscriptionState === "expired"
                          ? "Expired"
                          : "Free Tier")}
                    </span>
                  </div>

                  {/* Auto-Renew ON/OFF Indicator Badge */}
                  {accountInfo.currentPlan !== "free" && !accountInfo.isExpired && (
                    <div
                      className={`admin-sub-autorenew-pill ${
                        accountInfo.autoRenew ? "autorenew-on" : "autorenew-off"
                      }`}
                      title={
                        accountInfo.autoRenew
                          ? "Auto-renewal is active. Plan will renew automatically."
                          : "Auto-renewal is cancelled (OFF). Plan will expire on expiry date."
                      }
                    >
                      {accountInfo.autoRenew ? (
                        <>
                          <RefreshCw size={11} className="spin-slow" />
                          <span>Auto-Renew: ON</span>
                        </>
                      ) : (
                        <>
                          <X size={11} />
                          <span>Auto-Renew: OFF</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Metric Stats Grid */}
              <div className="admin-sub-stats-grid">
                {/* 1. Current Plan */}
                <div className="admin-sub-stat-card highlight">
                  <span className="admin-sub-stat-label">
                    <Sparkles size={13} color="#0e7490" /> Current Plan
                  </span>
                  <span className="admin-sub-stat-val">
                    {accountInfo.planName || accountInfo.currentPlan?.toUpperCase() || "FREE"}
                  </span>
                  <span className="admin-sub-stat-sub">
                    {accountInfo.currentPlan !== "free" &&
                    accountInfo.subscriptionState !== "expired"
                      ? accountInfo.billingCycle === "annual"
                        ? "Billed Annually"
                        : "Monthly Billing"
                      : accountInfo.previousPlan
                      ? `Previously: ${accountInfo.previousPlan.toUpperCase()}`
                      : "Default Free Tier"}
                  </span>
                </div>

                {/* 2. Credits Left */}
                <div className="admin-sub-stat-card">
                  <span className="admin-sub-stat-label">
                    <Zap size={13} color="#059669" /> Credit Left
                  </span>
                  <span
                    className={`admin-sub-stat-val ${
                      accountInfo.isExpired ||
                      (accountInfo.availableCredits ?? accountInfo.credits ?? 0) === 0
                        ? ""
                        : "green"
                    }`}
                  >
                    {(
                      accountInfo.availableCredits ??
                      accountInfo.credits ??
                      0
                    ).toLocaleString()}{" "}
                    AI
                  </span>
                  <span className="admin-sub-stat-sub">
                    {accountInfo.isExpired
                      ? "Reset on expiration"
                      : `${(accountInfo.creditsUsed ?? 0).toLocaleString()} used / ${(
                          accountInfo.planCredits ??
                          accountInfo.totalPurchasedCredits ??
                          accountInfo.credits ??
                          0
                        ).toLocaleString()} total`}
                  </span>
                </div>

                {/* 3. Expiry / Renewal Date */}
                <div className="admin-sub-stat-card">
                  <span className="admin-sub-stat-label">
                    <Calendar size={13} color="#d97706" /> Renewal / Expiry
                  </span>
                  <span
                    className={`admin-sub-stat-val ${
                      accountInfo.isExpired
                        ? "red"
                        : accountInfo.isExpiringSoon
                        ? "amber"
                        : ""
                    }`}
                  >
                    {accountInfo.formattedExpiresAt ||
                      (accountInfo.expiresAt
                        ? new Date(accountInfo.expiresAt).toLocaleDateString("en-IN")
                        : "No Expiry")}
                  </span>
                  <span className="admin-sub-stat-sub">
                    {accountInfo.isExpired ? (
                      "Subscription Ended"
                    ) : accountInfo.daysRemaining !== null &&
                      accountInfo.daysRemaining !== undefined ? (
                      <span>
                        {accountInfo.daysRemaining === 0
                          ? "Expires today"
                          : `${accountInfo.daysRemaining}d left`}
                        {" • Auto-Renew: "}
                        <strong
                          style={{
                            color: accountInfo.autoRenew ? "#047857" : "#c2410c",
                            fontWeight: 700,
                          }}
                        >
                          {accountInfo.autoRenew ? "ON" : "OFF"}
                        </strong>
                      </span>
                    ) : (
                      "Free plan"
                    )}
                  </span>
                </div>
              </div>

              {/* Status Alert Notices */}
              {accountInfo.isExpiringSoon && !accountInfo.isExpired && (
                <div className="admin-sub-stat-notice warning">
                  <Clock size={15} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Expiring Soon:</strong> This client's plan will expire in{" "}
                    <strong>{accountInfo.daysRemaining} days</strong> (
                    {accountInfo.formattedExpiresAt}). Renew or change plan below.
                  </span>
                </div>
              )}

              {accountInfo.isExpired && (
                <div className="admin-sub-stat-notice danger">
                  <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Expired:</strong> Subscription expired on{" "}
                    <strong>{accountInfo.formattedExpiresAt}</strong>. Account is now on Free
                    tier.
                  </span>
                </div>
              )}

              {accountInfo.subscriptionState === "cancellation_scheduled" &&
                !accountInfo.isExpired && (
                  <div className="admin-sub-stat-notice info">
                    <Info size={15} style={{ flexShrink: 0 }} />
                    <span>
                      <strong>Cancellation Scheduled:</strong> Auto-renewal is cancelled. Plan
                      remains active until <strong>{accountInfo.formattedExpiresAt}</strong>.
                    </span>
                  </div>
                )}

              {accountInfo.warning && (
                <div className="admin-sub-warning-banner">
                  <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: "1px" }} />
                  <span>{accountInfo.warning}</span>
                </div>
              )}
            </div>
          )}

          {lookupError && (
            <div className="admin-sub-account-preview not-found">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <AlertTriangle size={17} color="#b45309" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ color: "#92400e", fontSize: "0.825rem", fontWeight: 600, lineHeight: 1.4 }}>
                    {lookupError}
                  </span>
                </div>
                {suggestedType && (
                  <button
                    type="button"
                    className="admin-sub-switch-btn"
                    onClick={() => {
                      const nextType = suggestedType;
                      setAccountType(nextType);
                      setLookupError("");
                      setSuggestedType(null);
                      handleLookup(email, nextType);
                    }}
                  >
                    Switch to {suggestedType} Account & Verify
                  </button>
                )}
              </div>
            </div>
          )}

          {!accountInfo && !lookupError && email.trim() && (
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontStyle: "italic" }}>
              Click <strong>Verify</strong> to check account profile type before updating subscription.
            </div>
          )}

          {/* 3. Plan Selection (starter, ultra, professional) */}
          <div className="admin-sub-form-group">
            <label className="admin-sub-label">
              <Sparkles size={15} />
              Select Plan
            </label>
            <select
              className="admin-sub-select"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              disabled={status === "expired" || status === "cancel_renewal"}
            >
              <option value="starter">Starter Plan (200 AI Credits • ₹99)</option>
              <option value="ultra">Ultra Plan (1,500 AI Credits • ₹999)</option>
              <option value="professional">Professional Plan (10,000 AI Credits • ₹4,999)</option>
            </select>
            {status === "cancel_renewal" && (
              <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                Cancelling auto-renewal applies to the current active plan ({accountInfo?.planName || planId.toUpperCase()}).
              </span>
            )}
          </div>

          {/* 4. Plan Action / Status Dropdown (Active, Cancel Auto-Renew, Expired) */}
          <div className="admin-sub-form-group">
            <label className="admin-sub-label">
              <CreditCard size={15} />
              Plan Action / Status
            </label>
            <select
              className="admin-sub-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active (Assign / Renew Plan)</option>
              <option value="cancel_renewal">Cancel the auto renew (Stays valid until expiry, no renewal)</option>
              <option value="expired">Expired (Make Current Plan Expire)</option>
            </select>
          </div>

          {/* 5. Billing Cycle (if Active) */}
          {status === "active" && (
            <div className="admin-sub-form-group">
              <label className="admin-sub-label">
                <Calendar size={15} />
                Billing Cycle / Duration
              </label>
              <select
                className="admin-sub-select"
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
              >
                <option value="monthly">Monthly Cycle (30 Days)</option>
                <option value="annual">Annual Cycle (365 Days)</option>
              </select>
            </div>
          )}

          {/* Contextual Notice for Cancel Auto-Renew */}
          {status === "cancel_renewal" && (
            <div className="admin-sub-action-notice cancel-renewal-notice">
              <Clock size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>Cancel Auto-Renewal:</strong> Current plan and remaining AI credits will stay active until{" "}
                <strong>{accountInfo?.formattedExpiresAt || "the expiration date"}</strong>, but the plan will NOT renew automatically.
              </span>
            </div>
          )}

          {/* Notice Box */}
          <div className="admin-sub-notice-box">
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>
              <strong>Active Sync:</strong> Bypasses payment gateway and immediately updates the
              HiringSubscription table and unified AI credit wallet. The user will see their active
              entitlements instantly on their dashboard modal.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="admin-sub-modal-footer">
            <button
              type="button"
              className="admin-sub-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`admin-sub-submit-btn ${
                status === "expired"
                  ? "expire"
                  : status === "cancel_renewal"
                  ? "cancel-renewal"
                  : "active"
              }`}
              disabled={isSubmitting || isLookingUp || !accountInfo || Boolean(lookupError)}
              title={
                !accountInfo || lookupError
                  ? "Verify a valid matching account to enable"
                  : undefined
              }
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={15} className="spin" />
                  Updating...
                </>
              ) : status === "expired" ? (
                "Expire Plan Now"
              ) : status === "cancel_renewal" ? (
                "Cancel Auto-Renewal Now"
              ) : (
                "Activate / Renew Plan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
