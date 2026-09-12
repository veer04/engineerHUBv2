import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../services/APIUtils";
import { getAccessToken, getUserRole } from "../features/User/UserDetails";

/**
 * Checks whether the current user has an active paid subscription plan (Starter, Ultra, Professional)
 * required for hosting jobs and internships.
 * Returns boolean indicating whether user has active paid subscription access.
 */
export const hasActivePaidPlan = async () => {
  try {
    const token = getAccessToken();
    if (!token) return false;

    const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
    const res = await axios.get(`${baseUrl}api/v1/plans/my-subscription`, {
      withCredentials: true,
      headers: {
        accesstoken: token,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.data?.success && res.data?.data) {
      const wallet = res.data.data.wallet || {};
      const sub = res.data.data.activeSubscription;
      const plan = (wallet.plan || sub?.planId || "free").toLowerCase();

      if (plan === "starter" || plan === "ultra" || plan === "professional" || plan === "pro") {
        return true;
      }
    }
  } catch (err) {
    console.error("Subscription check error:", err?.message || err);
  }
  return false;
};

/**
 * Validates job/internship posting and AI feature access for Alumni and Employer/Organization.
 * If user is on Free plan, triggers informative toast and redirects to pricing plans.
 */
export const checkJobPostingAccess = async (navigate, options = {}) => {
  const {
    showToast = true,
    redirectUrl = "/pricing#self-service-plans",
    featureName,
    message: customMessage,
  } = options;
  const role = getUserRole();

  if (role === "User" || role === "Club") {
    if (showToast) {
      toast.warning("You are not authorized to access this feature.", {
        position: "top-right",
      });
    }
    return false;
  }

  const isPaid = await hasActivePaidPlan();
  if (isPaid) {
    return true;
  }

  if (showToast) {
    const toastMsg = customMessage
      ? customMessage
      : featureName
      ? `${featureName} requires an active subscription plan (Starter, Ultra, or Professional).`
      : "Job & Internship posting requires an active subscription plan (Starter, Ultra, or Professional).";

    toast.info(toastMsg, { position: "top-right" });
  }
  navigate(redirectUrl);
  return false;
};
