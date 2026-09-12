import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Zap, ShieldCheck, CheckCircle, X, Sparkles, ArrowRight, Lock, Phone, Mail } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/getCookieValues";
import { getUserRole } from "../../../features/User/UserDetails";
import "./PricingPage.css";

import {
  subscriptionPlans,
  creditRates,
} from "../../../config/plansConfig";

import PlansHero from "./Components/PlansHero";
import ChooseHiringMode from "./Components/ChooseHiringMode";
import PricingSection from "./Components/PricingSection";
import CreditWallet from "./Components/CreditWallet";
import PlatformFeatures from "./Components/PlatformFeatures";
import VirtualHRSection from "./Components/VirtualHRSection";
import PlansFooterCTA from "./Components/PlansFooterCTA";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    withCredentials: true,
    headers: {
      accesstoken: token,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi NCR",
  "Chandigarh",
  "Puducherry",
  "Other",
];

export default function PricingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPlanId, setCurrentPlanId] = useState("free");
  const [plans] = useState(subscriptionPlans);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // For Payment Preview Modal
  const [paymentSuccessData, setPaymentSuccessData] = useState(null); // For Post-Payment Success Popup
  const [showContactModal, setShowContactModal] = useState(false); // For Team Contact Info Popup
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", state: "" });
  const [billingForm, setBillingForm] = useState({ name: "", email: "", phone: "", state: "" });

  // Fetch current subscription from backend
  const fetchMySubscription = async () => {
    try {
      const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
      const res = await axios.get(`${baseUrl}api/v1/plans/my-subscription`, getAuthHeaders());
      if (res.data?.success && res.data?.data) {
        const wallet = res.data.data.wallet;
        const sub = res.data.data.activeSubscription;
        const u = res.data.data.user || {};
        
        if (wallet?.plan) {
          setCurrentPlanId(wallet.plan);
        } else if (sub?.planId) {
          setCurrentPlanId(sub.planId);
        }

        setUserData({
          name: String(u.name || ""),
          email: String(u.email || ""),
          phone: String(u.mobile || u.phone || ""),
          state: "",
        });
      }
    } catch (err) {
      console.log("Subscription status check (guest / default):", err?.message);
    }
  };

  useEffect(() => {
    fetchMySubscription();
    loadRazorpayScript();
  }, []);

  // Lock background body scroll when any modal popup is open
  useEffect(() => {
    if (selectedOrder || paymentSuccessData || showContactModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOrder, paymentSuccessData, showContactModal]);

  // Auto-scroll if location.hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const handleScrollToPricing = () => {
    const el = document.getElementById("self-service-plans");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToVirtualHR = () => {
    const el = document.getElementById("virtual-hr-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConnectWithUs = () => {
    setShowContactModal(true);
  };

  const handleTalkToTeam = () => {
    navigate("/connect");
  };

  const handlePostJob = () => {
    const fromPath = `${location.pathname}#ready-to-hire-banner`;
    navigate("/host/jobs", { state: { from: fromPath } });
  };

  const handlePostInternship = () => {
    const fromPath = `${location.pathname}#ready-to-hire-banner`;
    navigate("/host/internships", { state: { from: fromPath } });
  };

  const handleExploreTalent = () => {
    navigate("/candidatesdata");
  };

  const getPlanLevel = (id) => {
    const norm = (id || "").toLowerCase();
    if (norm === "professional" || norm === "pro") return 3;
    if (norm === "ultra") return 2;
    if (norm === "starter") return 1;
    if (norm === "enterprise") return 4;
    return 0; // free
  };

  // Subscription Plan Selection Handler -> Opens Payment Preview Modal with User Form
  const handleSelectPlan = (plan, billingCycle = "monthly") => {
    const currentLevel = getPlanLevel(currentPlanId);
    const targetLevel = getPlanLevel(plan.id);

    const currentPlanName = currentLevel === 3 ? "Professional" : currentLevel === 2 ? "Ultra" : currentLevel === 1 ? "Starter" : "Free";

    if (currentLevel >= targetLevel && targetLevel < 4) {
      toast.info(`You are already on the ${currentPlanName} Plan.`, {
        position: "top-right",
      });
      return;
    }

    if (plan.id === "enterprise") {
      toast.info("Enterprise sales team notified! Redirecting to team scheduler...", {
        position: "top-right",
      });
      navigate("/connect");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      toast.warning("Please log in to your recruiter account to choose a subscription plan.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    const role = getUserRole();
    const allowedRoles = ["Employer", "Organization", "Alumni"];

    if (!allowedRoles.includes(role)) {
      toast.warning(
        "Subscription plans are available exclusively for Employer and Alumni profiles.",
        {
          position: "top-right",
        }
      );
      return;
    }

    const planIdKey = plan.id === "pro" ? "professional" : plan.id;
    const priceAmount = billingCycle === "annual" ? (plan.annualPrice || 0) : (plan.monthlyPrice || 0);
    const creditsAllocated = plan.credits || 500;

    setBillingForm({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      state: userData.state || "Delhi NCR",
    });

    setSelectedOrder({
      plan,
      planIdKey,
      billingCycle,
      priceAmount,
      creditsAllocated,
    });
  };

  // Execute Razorpay Order & Standard Checkout Popup
  const handleProceedToPayment = async () => {
    if (!selectedOrder) return;
    const { plan, planIdKey, billingCycle } = selectedOrder;

    const token = getAccessToken();
    if (!token) {
      toast.warning("Please log in to your recruiter account to proceed with subscription checkout.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    // Cast all form values safely to String to prevent TypeError if phone is stored as Number
    const nameStr = String(billingForm.name || "").trim();
    const emailStr = String(billingForm.email || "").trim();
    const phoneStr = String(billingForm.phone || "").trim();
    const stateStr = String(billingForm.state || "").trim();

    // Validate Billing Form
    if (!nameStr || !emailStr || !phoneStr || !stateStr) {
      toast.error("Please fill in all required billing details (Name, Email, Phone Number, and State).", {
        position: "top-right",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || !window.Razorpay) {
        toast.error("Failed to load Razorpay payment gateway script. Please check your network connection.", {
          position: "top-right",
        });
        setIsProcessing(false);
        return;
      }

      const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;

      // 1. Create Razorpay order on backend
      const orderRes = await axios.post(
        `${baseUrl}api/v1/plans/create-order`,
        {
          planId: planIdKey,
          billingCycle,
          name: nameStr,
          email: emailStr,
          phone: phoneStr,
          state: stateStr,
        },
        getAuthHeaders()
      );

      if (!orderRes.data?.success || !orderRes.data?.data) {
        throw new Error(orderRes.data?.message || "Failed to create subscription order");
      }

      const orderData = orderRes.data.data;
      const razorpayKey = orderData.key || "rzp_test_RBJ57q2btu2o6z";

      // 2. Launch Razorpay Standard Checkout Modal
      const options = {
        key: razorpayKey,
        amount: Math.round(orderData.amount * 100),
        currency: orderData.currency || "INR",
        name: "engineerHUB",
        description: `${plan.name} Hiring Plan (${billingCycle})`,
        order_id: orderData.orderId,
        prefill: {
          name: nameStr,
          email: emailStr,
          contact: phoneStr,
        },
        notes: {
          customerState: stateStr,
        },
        handler: async function (response) {
          try {
            toast.info("Verifying payment transaction...", { position: "top-right" });
            const verifyRes = await axios.post(
              `${baseUrl}api/v1/plans/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: planIdKey,
                billingCycle,
              },
              getAuthHeaders()
            );

            if (verifyRes.data?.success) {
              const newCredits = verifyRes.data?.data?.wallet?.availableCredits;
              setCurrentPlanId(planIdKey);
              fetchMySubscription();
              
              // Close pre-payment modal & trigger Success Modal
              setSelectedOrder(null);
              setPaymentSuccessData({
                planName: plan.name,
                credits: newCredits || plan.credits || 500,
              });
            } else {
              toast.error(verifyRes.data?.message || "Payment verification failed", {
                position: "top-right",
              });
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            toast.error(
              verifyErr.response?.data?.message || "Payment verification failed",
              { position: "top-right" }
            );
          } finally {
            setIsProcessing(false);
          }
        },
        theme: {
          color: "#128381",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Razorpay Payment Failed:", response.error);
        toast.error(response.error?.description || "Payment failed or was cancelled.", {
          position: "top-right",
        });
        setIsProcessing(false);
      });

      // Open Razorpay gateway
      rzp.open();
      setTimeout(() => {
        setSelectedOrder(null);
        setIsProcessing(false);
      }, 200);
    } catch (err) {
      setIsProcessing(false);
      console.error("Select plan error:", err);
      const errMsg =
        err.response?.data?.message || err.message || "Failed to initiate checkout";
      toast.error(errMsg, { position: "top-right" });
    }
  };

  return (
    <div className="plans-page-container">
      <Helmet>
        <title>Hiring Solutions & Pricing | engineerHUB</title>
        <meta
          name="description"
          content="engineerHUB is a complete hiring platform offering self-service recruitment tools, AI Resume Sorting, AI Skill Assessments, Sanya Voice AI Interviews, and Virtual HR end-to-end managed hiring services."
        />
      </Helmet>

      <div className="plans-wrapper">
        {/* 1. Hero Landing Section + Hiring Journey Visual */}
        <PlansHero
          onPostJob={handlePostJob}
          onPostInternship={handlePostInternship}
          onTalkToTeam={handleTalkToTeam}
        />

        {/* 2. Commercial Options: Choose How You Hire */}
        <ChooseHiringMode
          onExplorePlans={handleScrollToPricing}
          onExploreVirtualHR={handleScrollToVirtualHR}
        />

        {/* 3. Hire By Yourself: Subscription Plans */}
        <PricingSection
          plans={plans}
          currentPlanId={currentPlanId}
          onSelectPlan={handleSelectPlan}
        />

        {/* 5. Virtual HR Managed Hiring Service + 7-Step Process Flow */}
        <VirtualHRSection
          onConnectWithUs={handleConnectWithUs}
          onTalkToExpert={handleTalkToTeam}
        />

        {/* 6. Complete Platform Capabilities & Workflow Positioning */}
        <PlatformFeatures onExploreTalent={handleExploreTalent} />

        {/* 7. Bottom Conversion Banner */}
        <PlansFooterCTA
          onPostJob={handlePostJob}
          onPostInternship={handlePostInternship}
          onTalkToTeam={handleTalkToTeam}
        />
      </div>

      {/* Payment Order Preview & Recruiter Info Modal */}
      {selectedOrder && (
        <div className="payment-order-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="payment-order-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-modal-close"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="payment-order-modal-scroll-body">
              <div className="modal-header-tag">
                <Sparkles size={16} /> ORDER SUMMARY & BILLING DETAILS
              </div>

              <h3 className="modal-plan-title">
                {selectedOrder.plan.name} Subscription Plan
              </h3>
              <p className="modal-plan-sub">
                {selectedOrder.billingCycle === "annual" ? "Annual Billed Subscription" : "Monthly Billed Subscription"}
              </p>

              <div className="modal-order-summary-box">
                <div className="summary-row">
                  <span className="summary-label">Plan Tier</span>
                  <span className="summary-val">{selectedOrder.plan.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Billing Cycle</span>
                  <span className="summary-val" style={{ textTransform: "capitalize" }}>
                    {selectedOrder.billingCycle}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Included AI Credits</span>
                  <span className="summary-val credit-highlight-val">
                    <Zap size={14} /> {selectedOrder.creditsAllocated.toLocaleString()} AI Credits / mo
                  </span>
                </div>
                <div className="summary-row total-row">
                  <span className="summary-label">Total Testing Amount</span>
                  <span className="summary-price">₹{selectedOrder.priceAmount} INR</span>
                </div>
              </div>

              {/* Recruiter Details Form */}
              <div className="modal-billing-form-section">
                <div className="preview-heading">Recruiter Details (Required for Billing):</div>
                <div className="billing-input-grid">
                  <div className="billing-field">
                    <label className="billing-label">Full Name *</label>
                    <input
                      type="text"
                      className="billing-input"
                      placeholder="Enter Full Name"
                      value={billingForm.name}
                      onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })}
                    />
                  </div>
                  <div className="billing-field">
                    <label className="billing-label">Email Address *</label>
                    <input
                      type="email"
                      className="billing-input"
                      placeholder="Enter Email Address"
                      value={billingForm.email}
                      onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                    />
                  </div>
                  <div className="billing-field">
                    <label className="billing-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="billing-input"
                      placeholder="Enter 10-digit Phone Number"
                      value={billingForm.phone}
                      onChange={(e) => setBillingForm({ ...billingForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="billing-field">
                    <label className="billing-label">State *</label>
                    <select
                      className="billing-input billing-select"
                      value={billingForm.state}
                      onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                    >
                      <option value="">Select Indian State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-proceed-pay"
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Initiating Gateway..." : `Proceed to Secure Payment (₹${selectedOrder.priceAmount})`}
                  <ArrowRight size={18} />
                </button>
                <button
                  className="btn-cancel-modal"
                  onClick={() => setSelectedOrder(null)}
                >
                  Back to Plans
                </button>
              </div>

              <div className="modal-secure-badge">
                <ShieldCheck size={14} /> Encrypted 256-bit SSL Razorpay Gateway (INR)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Contact Details Modal */}
      {showContactModal && (
        <div
          className="payment-order-modal-backdrop"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="payment-order-modal-card contact-info-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-modal-close"
              onClick={() => setShowContactModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="payment-order-modal-scroll-body" style={{ textAlign: "center" }}>
              <div className="contact-modal-badge">
                <Sparkles size={14} /> TALK TO OUR HIRING TEAM
              </div>

              <h3 className="contact-modal-title">
                Contact engineerHUB
              </h3>
              
              <p className="contact-modal-sub">
                Have a custom hiring requirement or need assistance? Reach out directly to our team.
              </p>

              {/* Phone Numbers Card */}
              <div className="contact-item-card">
                <div className="contact-icon-wrapper phone-icon-bg">
                  <Phone size={20} />
                </div>
                <div className="contact-item-values contact-phone-numbers">
                  <a href="tel:+918303156089" className="contact-link-text">
                    +91 83031 56089
                  </a>
                  <a href="tel:+918303564068" className="contact-link-text">
                    +91 83035 64068
                  </a>
                </div>
              </div>

              {/* Email Address Card */}
              <div className="contact-item-card">
                <div className="contact-icon-wrapper email-icon-bg">
                  <Mail size={20} />
                </div>
                <div className="contact-item-values">
                  <a href="mailto:info@engineerhub.in" className="contact-link-text">
                    info@engineerhub.in
                  </a>
                </div>
              </div>

              <button
                className="contact-close-btn"
                onClick={() => setShowContactModal(false)}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Payment Success Popup Modal */}
      {paymentSuccessData && (
        <div className="payment-order-modal-backdrop">
          <div className="payment-order-modal-card success-modal-card">
            <div className="payment-order-modal-scroll-body">
              <div className="success-icon-badge" style={{ textAlign: "center", marginBottom: "1rem" }}>
                <CheckCircle size={56} color="#128381" />
              </div>

              <h3 className="modal-plan-title" style={{ textAlign: "center", color: "#128381" }}>
                🎉 Payment Successful!
              </h3>
              
              <p className="modal-plan-sub" style={{ textAlign: "center", fontSize: "1rem", color: "#334155" }}>
                Your subscription to <strong>{paymentSuccessData.planName} Plan</strong> has been activated successfully!
              </p>

              <div className="modal-order-summary-box" style={{ background: "#e6f4f1", border: "1.5px solid #128381" }}>
                <div className="summary-row" style={{ borderBottom: "none" }}>
                  <span className="summary-label" style={{ fontWeight: "700" }}>Allocated AI Credits</span>
                  <span className="summary-val credit-highlight-val" style={{ fontSize: "1.15rem" }}>
                    <Zap size={16} /> {paymentSuccessData.credits?.toLocaleString()} AI Credits
                  </span>
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748b", margin: "1.25rem 0" }}>
                Click below to refresh the page and enjoy your active plan features and updated AI credit balance.
              </p>

              <button
                className="btn-proceed-pay"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh Page to View Credits <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

