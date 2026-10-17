import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ShieldCheck,
  X,
  Search,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Calendar,
  CreditCard,
  User,
  Building,
  RefreshCw,
} from "lucide-react";
import { API_URL, PAYMENT_API_URL } from "../../services/APIUtils";
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

  if (!isOpen) return null;

  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;

  // Quick lookup helper to verify account details
  const handleLookup = async (emailToLookup) => {
    const targetEmail = (emailToLookup || email).trim();
    if (!targetEmail) return;

    try {
      setIsLookingUp(true);
      setLookupError("");
      const token = getAccessToken();
      const res = await axios.get(
        `${baseUrl}api/v1/plans/admin/lookup-account?accountType=${accountType}&email=${encodeURIComponent(
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
          setAccountInfo(res.data.data.account);
          setLookupError("");
        } else {
          setAccountInfo(null);
          setLookupError(`No ${accountType} found with email "${targetEmail}".`);
        }
      }
    } catch (err) {
      console.error("Account lookup error:", err);
      setLookupError("Failed to verify account. Please check email and try again.");
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
                setAccountType(e.target.value);
                setAccountInfo(null);
                setLookupError("");
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
                placeholder={`Enter registered ${accountType.toLowerCase()} email`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAccountInfo(null);
                  setLookupError("");
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
              <div className="admin-sub-preview-header">
                <span className="admin-sub-preview-name">{accountInfo.name}</span>
                <span
                  className={`admin-sub-preview-status-badge ${
                    accountInfo.subscriptionState === "active"
                      ? "active"
                      : accountInfo.subscriptionState === "expired"
                      ? "expired"
                      : "none"
                  }`}
                >
                  {accountInfo.subscriptionState === "active"
                    ? "Active Plan"
                    : accountInfo.subscriptionState === "expired"
                    ? "Expired"
                    : "No Active Plan"}
                </span>
              </div>
              <div className="admin-sub-preview-details">
                <span>
                  <strong>Current:</strong> {accountInfo.currentPlan.toUpperCase()}
                </span>
                <span>
                  <strong>Credits:</strong> {accountInfo.credits}
                </span>
                {accountInfo.expiresAt && (
                  <span>
                    <strong>Expires:</strong>{" "}
                    {new Date(accountInfo.expiresAt).toLocaleDateString("en-IN")}
                  </span>
                )}
              </div>
            </div>
          )}

          {lookupError && (
            <div className="admin-sub-account-preview not-found">
              <span style={{ color: "#b45309", fontSize: "0.82rem", fontWeight: 600 }}>
                {lookupError}
              </span>
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
              disabled={status === "expired"}
            >
              <option value="starter">Starter Plan (200 AI Credits • ₹99)</option>
              <option value="ultra">Ultra Plan (1,500 AI Credits • ₹999)</option>
              <option value="professional">Professional Plan (10,000 AI Credits • ₹4,999)</option>
            </select>
          </div>

          {/* 4. Plan Action / Status Dropdown (Active, Expired) */}
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
              className="admin-sub-submit-btn"
              disabled={isSubmitting || !email.trim()}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={15} className="spin" />
                  Updating...
                </>
              ) : status === "expired" ? (
                "Expire Plan Now"
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
