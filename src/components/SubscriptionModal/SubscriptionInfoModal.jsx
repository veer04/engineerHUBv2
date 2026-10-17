import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Info,
  Calendar,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  RefreshCw,
  AlertTriangle,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { API_URL } from "../../services/APIUtils";
import {
  getAccessToken,
  getUserId,
  getUserRole,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import "./SubscriptionInfoModal.css";

/**
 * SubscriptionInfoModal
 * Fixed bottom-right information icon (ⓘ) and modal for organization & alumni admin dashboards.
 * Displays subscription status, auto-renewal settings, and enables cancellation of auto-renewal.
 * Visible ONLY to authenticated admins (Organization or Alumni) on their own account.
 */
export default function SubscriptionInfoModal({
  organizationId,
  onStatusChange,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  hideFloatingTrigger = false,
}) {
  const navigate = useNavigate();
  const isControlled = typeof controlledIsOpen === "boolean";
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledSetIsOpen : setInternalIsOpen;

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [subscription, setSubscription] = useState(null);

  // Security & Permissions Check:
  // Must be logged in, must be Organization or Alumni, and if organizationId is passed, must match current user.
  const loggedIn = isUserLoggedIn();
  const currentUserId = loggedIn ? getUserId() : null;
  const role = loggedIn ? getUserRole() : null;
  const isAuthorizedAdmin =
    loggedIn &&
    (role === "Organization" || role === "Alumni") &&
    (!organizationId || organizationId === currentUserId);

  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;

  const fetchSubscription = useCallback(async () => {
    if (!isAuthorizedAdmin) return;
    const token = getAccessToken();
    if (!token) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}api/v1/plans/my-subscription`, {
        withCredentials: true,
        headers: {
          accesstoken: token,
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.success && res.data?.data) {
        const {
          wallet = {},
          activeSubscription,
          latestSubscription,
          subscriptionState = "none",
          effectiveStatus,
        } = res.data.data;

        const sub = activeSubscription || latestSubscription;
        const plan = (wallet.plan || sub?.planId || "free").toLowerCase();

        let planName = "Free Plan";
        if (plan === "starter") planName = "Starter Plan";
        else if (plan === "ultra") planName = "Ultra Plan";
        else if (plan.includes("pro")) planName = "Professional Plan";

        const expiresAt = activeSubscription?.expiresAt || latestSubscription?.expiresAt;
        const startDate = activeSubscription?.startDate || latestSubscription?.startDate;

        const formattedExpiryDate = expiresAt
          ? new Date(expiresAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : null;

        const formattedStartDate = startDate
          ? new Date(startDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : null;

        const renewsInDays = expiresAt
          ? Math.max(0, Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
          : null;

        const cancelAtPeriodEnd = Boolean(
          activeSubscription?.cancelAtPeriodEnd || wallet.cancelAtPeriodEnd
        );
        const autoRenew = activeSubscription
          ? Boolean(activeSubscription.autoRenew)
          : false;

        const dataObj = {
          planId: plan,
          planName,
          status: wallet.subscriptionStatus || "active",
          effectiveStatus: effectiveStatus || (cancelAtPeriodEnd ? "cancels_at_period_end" : "active"),
          subscriptionState, // 'active' | 'cancellation_scheduled' | 'expired' | 'none'
          autoRenew,
          cancelAtPeriodEnd,
          startDate,
          expiresAt,
          formattedStartDate,
          formattedExpiryDate,
          renewsInDays,
          creditsTotal: Number(wallet.totalPurchased) || 0,
          creditsUsed: Number(wallet.totalConsumed) || 0,
          creditsRemaining: Number(wallet.availableCredits) || 0,
          rawSub: sub,
        };

        setSubscription(dataObj);
        if (onStatusChange) {
          onStatusChange(dataObj);
        }
      }
    } catch (err) {
      console.error("Error fetching subscription info:", err);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, onStatusChange]);

  useEffect(() => {
    fetchSubscription();

    const handleSubUpdated = () => {
      fetchSubscription();
    };

    window.addEventListener("subscription-updated", handleSubUpdated);
    return () => {
      window.removeEventListener("subscription-updated", handleSubUpdated);
    };
  }, [fetchSubscription]);

  // Listen for open-subscription-info-modal event dispatched by inline buttons
  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      fetchSubscription();
    };
    window.addEventListener("open-subscription-info-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-subscription-info-modal", handleOpenModal);
    };
  }, [setIsOpen, fetchSubscription]);

  // Handle escape key to close modal or confirm dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showConfirm) {
          setShowConfirm(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showConfirm]);

  const handleCancelAutoRenewal = async () => {
    const token = getAccessToken();
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    try {
      setIsCancelling(true);
      const res = await axios.post(
        `${baseUrl}api/v1/plans/cancel-auto-renewal`,
        { organizationId },
        {
          withCredentials: true,
          headers: {
            accesstoken: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            `Auto-renewal cancelled. Your plan remains active until ${
              subscription?.formattedExpiryDate || "its expiration date"
            }.`,
          { position: "top-right", autoClose: 5000 }
        );

        setShowConfirm(false);
        // Refresh local subscription state immediately
        await fetchSubscription();

        // Broadcast to other components on dashboard
        window.dispatchEvent(
          new CustomEvent("subscription-updated", {
            detail: res.data.data,
          })
        );
      } else {
        toast.error(res.data?.message || "Failed to cancel auto-renewal. Please try again.");
      }
    } catch (err) {
      console.error("Cancel auto-renewal error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred while cancelling auto-renewal. Please retry.";
      toast.error(errorMsg, { position: "top-right" });
    } finally {
      setIsCancelling(false);
    }
  };

  const isFree = !subscription || subscription.planId === "free";
  const state = subscription?.subscriptionState || "none";
  const isCancellationScheduled =
    state === "cancellation_scheduled" || subscription?.cancelAtPeriodEnd;
  const isExpired = state === "expired";
  const isActive = state === "active" && !isCancellationScheduled && !isFree;

  // Determine state banner message
  let stateMessage = "";
  if (isActive) {
    stateMessage = "Your subscription is active and will renew according to your current plan.";
  } else if (isCancellationScheduled) {
    stateMessage = `Auto-renewal is cancelled. Your plan remains active until ${
      subscription?.formattedExpiryDate || "its expiration date"
    }.`;
  } else if (isExpired) {
    stateMessage =
      "Your subscription has expired. Purchase a new plan to continue using subscription-based features.";
  } else {
    stateMessage = "You don't have an active subscription. Choose a plan to get started.";
  }

  // Credit usage percent
  const creditsTotal = subscription?.creditsTotal || 0;
  const creditsUsed = subscription?.creditsUsed || 0;
  const usagePercent =
    creditsTotal > 0 ? Math.min(Math.round((creditsUsed / creditsTotal) * 100), 100) : 0;

  if (!isAuthorizedAdmin) {
    return null;
  }

  return (
    <>
      {/* 1. Floating Fixed Bottom-Right Information Icon Button (ⓘ) */}
      {!hideFloatingTrigger && (
        <button
          type="button"
          className="sub-info-floating-trigger"
          onClick={() => {
            setIsOpen(true);
            fetchSubscription();
          }}
          aria-label="View subscription status and renewal details"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          title="Subscription & Renewal Details"
        >
          <div className="trigger-icon-wrap">
            <Info size={22} strokeWidth={2.4} />
            {isActive && <span className="trigger-status-dot" />}
            {isCancellationScheduled && <span className="trigger-status-dot dot-amber" />}
            {isExpired && <span className="trigger-status-dot dot-rose" />}
          </div>
          <span className="sub-info-tooltip">Subscription & Renewal (ⓘ)</span>
        </button>
      )}

      {/* 2. Modal Dialog */}
      {isOpen && (
        <div
          className="sub-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isCancelling) {
              setIsOpen(false);
              setShowConfirm(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sub-modal-title"
        >
          <div className="sub-modal-dialog">
            {/* Confirmation Dialog Step */}
            {showConfirm ? (
              <div className="sub-confirm-dialog-wrap">
                <div className="sub-confirm-icon-box">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="sub-confirm-title">Cancel Auto-Renewal?</h3>
                <p className="sub-confirm-desc">
                  Are you sure you want to disable automatic renewal for your subscription?
                </p>

                <div className="sub-confirm-highlight-box">
                  <strong>Important:</strong> Your{" "}
                  <strong>{subscription?.planName || "current plan"}</strong> will remain fully
                  active with all entitlements and remaining AI credits until{" "}
                  <strong>{subscription?.formattedExpiryDate || "its expiration date"}</strong>. You
                  will not be charged on the next billing date.
                </div>

                <div className="sub-confirm-actions">
                  <button
                    type="button"
                    className="btn-confirm-go-back"
                    onClick={() => setShowConfirm(false)}
                    disabled={isCancelling}
                  >
                    Go Back / Keep Plan
                  </button>
                  <button
                    type="button"
                    className="btn-confirm-execute"
                    onClick={handleCancelAutoRenewal}
                    disabled={isCancelling}
                  >
                    {isCancelling ? (
                      <>
                        <RefreshCw size={15} className="sub-spinner" />
                        Cancelling...
                      </>
                    ) : (
                      "Confirm Cancellation"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Subscription Info View */
              <>
                {/* Header */}
                <div className="sub-modal-header">
                  <div className="sub-modal-header-left">
                    <div className="sub-modal-icon-badge">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h2 className="sub-modal-title" id="sub-modal-title">
                        Subscription & Renewal
                      </h2>
                      <p className="sub-modal-subtitle">
                        Subscription plan details & auto-renewal settings
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="sub-modal-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="sub-modal-body">
                  {/* Plan & Status Hero Card */}
                  <div
                    className={`sub-plan-hero-card ${
                      isActive
                        ? "theme-active"
                        : isCancellationScheduled
                        ? "theme-cancelling"
                        : isExpired
                        ? "theme-expired"
                        : ""
                    }`}
                  >
                    <div className="sub-plan-hero-info">
                      <span className="sub-plan-hero-label">Current Active Plan</span>
                      <span className="sub-plan-hero-name">
                        {subscription?.planName || "Free Plan"}
                      </span>
                    </div>

                    <div className="sub-plan-hero-status">
                      {isActive && (
                        <span className="sub-status-pill pill-active">
                          <span className="sub-status-dot-inner" /> Active
                        </span>
                      )}
                      {isCancellationScheduled && (
                        <span className="sub-status-pill pill-cancelling">
                          <Clock size={12} /> Cancels at Period End
                        </span>
                      )}
                      {isExpired && (
                        <span className="sub-status-pill pill-expired">
                          <AlertCircle size={12} /> Expired
                        </span>
                      )}
                      {isFree && (
                        <span className="sub-status-pill pill-free">
                          <span className="sub-status-dot-inner" /> Free Plan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User-Friendly State Message Banner */}
                  <div
                    className={`sub-state-notice ${
                      isActive
                        ? "notice-active"
                        : isCancellationScheduled
                        ? "notice-cancelling"
                        : isExpired
                        ? "notice-expired"
                        : "notice-free"
                    }`}
                  >
                    {isActive && <CheckCircle2 size={18} className="notice-icon" />}
                    {isCancellationScheduled && <Clock size={18} className="notice-icon" />}
                    {isExpired && <AlertCircle size={18} className="notice-icon" />}
                    {isFree && <Info size={18} className="notice-icon" />}
                    <p>{stateMessage}</p>
                  </div>

                  {/* Metadata Key-Value Grid */}
                  <div className="sub-details-grid">
                    <div className="sub-detail-cell">
                      <span className="sub-detail-label">Subscription Status</span>
                      <span className="sub-detail-value">
                        {isActive
                          ? "Active"
                          : isCancellationScheduled
                          ? "Cancellation Scheduled"
                          : isExpired
                          ? "Expired"
                          : "No Active Subscription"}
                      </span>
                    </div>

                    <div className="sub-detail-cell">
                      <span className="sub-detail-label">Auto-Renewal</span>
                      <span
                        className={`sub-detail-value ${
                          isActive
                            ? "val-renew-enabled"
                            : isCancellationScheduled
                            ? "val-renew-disabled"
                            : ""
                        }`}
                      >
                        {isActive
                          ? "Enabled (Auto)"
                          : isCancellationScheduled
                          ? "Cancelled (Disabled)"
                          : "Disabled"}
                      </span>
                    </div>

                    <div className="sub-detail-cell">
                      <span className="sub-detail-label">Start Date</span>
                      <span className="sub-detail-value">
                        <Calendar size={14} />
                        {subscription?.formattedStartDate || "Not available"}
                      </span>
                    </div>

                    <div className="sub-detail-cell">
                      <span className="sub-detail-label">
                        {isActive ? "Next Renewal Date" : "Expiration Date"}
                      </span>
                      <span className="sub-detail-value">
                        <Clock size={14} />
                        {subscription?.formattedExpiryDate || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* AI Credits Overview */}
                  {!isFree && creditsTotal > 0 && (
                    <div className="sub-credits-bar-box">
                      <div className="sub-credits-header">
                        <span>
                          <Sparkles size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                          AI Credits Balance
                        </span>
                        <span className="sub-credits-val">
                          {subscription?.creditsRemaining?.toLocaleString() || 0} /{" "}
                          {creditsTotal?.toLocaleString() || 0} available ({usagePercent}% used)
                        </span>
                      </div>
                      <div className="sub-progress-track">
                        <div
                          className="sub-progress-fill"
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="sub-modal-footer">
                  {/* Cancel Auto-Renewal Button (Only shown if active and not already cancelled) */}
                  {isActive && (
                    <button
                      type="button"
                      className="btn-cancel-renewal-trigger"
                      onClick={() => setShowConfirm(true)}
                      disabled={isLoading}
                    >
                      Cancel Auto-Renewal
                    </button>
                  )}

                  {/* Replaced status notice when cancelled */}
                  {isCancellationScheduled && (
                    <div className="renewal-cancelled-badge-box">
                      <CheckCircle2 size={15} />
                      <span>Auto-renewal cancelled</span>
                    </div>
                  )}

                  {/* Upgrade / Change Plan */}
                  <button
                    type="button"
                    className="btn-manage-upgrade"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/pricing");
                    }}
                  >
                    {isFree || isExpired ? "Choose a Plan" : "Upgrade / Change Plan"}{" "}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
