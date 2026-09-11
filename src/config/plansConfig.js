/**
 * Plans & AI Credits Configuration
 * Centralized mock data structure for subscription plans, current user subscription,
 * credit rates, usage breakdowns, and feature comparisons.
 * Designed for seamless integration with future backend APIs.
 */

export const mockCurrentSubscription = {
  planId: "pro",
  planName: "Professional",
  status: "active", // "active" | "expired" | "free"
  creditsTotal: 4000,
  creditsUsed: 1550,
  creditsRemaining: 2450,
  renewsInDays: 18,
  renewalDate: "September 24, 2026",
  billingCycle: "monthly", // "monthly" | "annual"
};

export const mockCreditUsageBreakdown = {
  total: 1550,
  items: [
    {
      id: "sorting",
      name: "AI Sorting",
      used: 800,
      percentage: 51.6,
      color: "#128381",
      icon: "sorting",
    },
    {
      id: "assessment",
      name: "AI Assessment",
      used: 500,
      percentage: 32.3,
      color: "#0284C7",
      icon: "assessment",
    },
    {
      id: "interview",
      name: "AI Interview (Sanya)",
      used: 250,
      percentage: 16.1,
      color: "#7C3AED",
      icon: "interview",
    },
  ],
};

export const creditRates = [
  {
    id: "sorting",
    title: "AI SORTING",
    subtitle: "Resume Intelligence",
    iconType: "sorting",
    rate: "~ 1 credit / candidate",
    description:
      "Instantly screen and rank candidate resumes against job descriptions, key skills, and custom hiring criteria.",
    badge: "High Efficiency",
    availableOnFree: true,
  },
  {
    id: "assessment",
    title: "AI ASSESSMENT",
    subtitle: "Smart Skill Testing",
    iconType: "assessment",
    rate: "~ 3 credits / assessment",
    description:
      "Generate role-tailored technical & behavioral tests, complete with MediaPipe proctoring and automated scoring.",
    badge: "Proctored",
    availableOnFree: true,
  },
  {
    id: "interview",
    title: "AI INTERVIEW",
    subtitle: "Sanya Conversational AI",
    iconType: "interview",
    rate: "~ 5 credits / interview",
    description:
      "Conduct dynamic, real-time voice interviews with AI Recruiter Sanya. Includes technical rigor & soft-skills evaluation.",
    badge: "AI Sanya",
    availableOnFree: false, // Locked on Free plan
  },
];

export const creditUsageExamples = [
  {
    credits: 1000,
    options: [
      { label: "Candidate Resume Sorts", count: "1,000" },
      { label: "Candidate Assessments", count: "330" },
      { label: "Sanya AI Voice Interviews", count: "200" },
    ],
  },
  {
    credits: 5000,
    options: [
      { label: "Candidate Resume Sorts", count: "5,000" },
      { label: "Candidate Assessments", count: "1,666" },
      { label: "Sanya AI Voice Interviews", count: "1,000" },
    ],
  },
];

export const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    priceDisplayMonthly: "₹0",
    priceDisplayAnnual: "₹0",
    billingCycleText: "Forever free",
    credits: 500,
    creditsDisplay: "500 AI Credits / month",
    description: "For recruiters getting started with self-service hiring.",
    badge: null,
    isRecommended: false,
    ctaText: "Get Started",
    ctaVariant: "secondary",
    features: [
      { text: "Job & Internship Posting", included: true },
      { text: "Candidate Applications & CRM", included: true },
      { text: "500 AI Credits per month", included: true },
      { text: "AI Resume Sorting", included: true },
      { text: "AI Skill Assessments", badge: "Limited", included: true },
      { text: "Email Outreach", badge: "Limited", included: true },
      { text: "Manual Google Calendar Interviews", included: true },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 99,
    annualPrice: 948,
    priceDisplayMonthly: "₹99",
    priceDisplayAnnual: "₹79",
    billingCycleText: "per recruiter / month",
    credits: 2000,
    creditsDisplay: "2,000 AI Credits / month",
    description: "For growing hiring teams needing key recruitment workflows.",
    badge: "RECOMMENDED",
    isRecommended: true,
    ctaText: "Choose Starter",
    ctaVariant: "primary",
    features: [
      { text: "Job & Internship Posting", included: true },
      { text: "Candidate Management & CRM", included: true },
      { text: "2,000 AI Credits per month", included: true },
      { text: "AI Resume Sorting", included: true },
      { text: "AI Skill Assessments", included: true },
      { text: "Manual & AI Interviews", included: true },
      { text: "AI Proctoring & Detailed Analytics Reports", included: true },
      { text: "Job & Internship Boosting", badge: "Limited", included: true },
      { text: "Automated Email Outreach", included: true },
    ],
  },
  {
    id: "pro",
    name: "Professional",
    monthlyPrice: 999,
    annualPrice: 9588,
    priceDisplayMonthly: "₹999",
    priceDisplayAnnual: "₹799",
    billingCycleText: "per team / month",
    credits: 5000,
    creditsDisplay: "5,000 AI Credits / month",
    description: "For teams hiring regularly at scale with full platform capabilities.",
    badge: null,
    isRecommended: false,
    ctaText: "Choose Professional",
    ctaVariant: "outline",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "5,000 AI Credits per month", included: true },
      { text: "AI Resume Sorting", badge: "High Speed", included: true },
      { text: "AI Skill Assessments", badge: "Unlimited", included: true },
      { text: "AI Interviews", badge: "Unlimited", included: true },
      { text: "Dedicated Hiring Assistant to Guide Your Process", included: true },
      { text: "Ultra Job & Internship Boosting (Website & Social Media)", included: true },
      { text: "Priority Email, Chat & Dedicated Support", included: true },
    ],
  },
  /*
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    priceDisplayMonthly: "Custom",
    priceDisplayAnnual: "Custom",
    billingCycleText: "Billed annually",
    credits: "Custom",
    creditsDisplay: "Tailored AI Credit Pool",
    description: "For large organizations with bespoke volume & security needs.",
    badge: "ENTERPRISE",
    isRecommended: false,
    ctaText: "Contact Sales",
    ctaVariant: "dark",
    features: [
      { text: "Tailored AI Credit Allowance", included: true },
      { text: "Custom Candidate CRM Integration", included: true },
      { text: "Custom AI Evaluation Models", included: true },
      { text: "Custom Sanya Voice & Domain Training", included: true },
      { text: "Enterprise MediaPipe Proctoring", included: true },
      { text: "Dedicated Success Manager", included: true },
      { text: "Custom Security, SSO & 24/7 SLA", included: true },
    ],
  },
  */
];

export const comparisonMatrix = {
  categories: [
    {
      name: "AI & Recruitment Workflows",
      rows: [
        { feature: "AI Credits / Month", free: "500", starter: "2,000", pro: "5,000" },
        { feature: "AI Resume Sorting", free: "✓ Standard", starter: "✓ Standard", pro: "⚡ High Speed" },
        { feature: "AI Skill Assessments", free: "Limited", starter: "✓ Included", pro: "∞ Unlimited" },
        { feature: "Interviews Execution", free: "Manual (Calendar)", starter: "Manual & AI", pro: "∞ Unlimited Manual & AI" },
        { feature: "Job & Internship Boosting", free: "—", starter: "Limited", pro: "Ultra (Web & Social)" },
        { feature: "Email Outreach", free: "Limited", starter: "Automated", pro: "Automated + Templates" },
      ],
    },
    {
      name: "Proctoring & Analytics",
      rows: [
        { feature: "AI Proctoring", free: "Basic", starter: "Standard Reports", pro: "Full MediaPipe Suite" },
        { feature: "Evaluation Reports", free: "Summary", starter: "Detailed Analytics", pro: "Full Rigor Reports" },
        { feature: "Archive History", free: "7 Days", starter: "30 Days", pro: "90 Days" },
      ],
    },
    {
      name: "Team & Account Support",
      rows: [
        { feature: "Dedicated Hiring Assistant", free: "—", starter: "—", pro: "✓ Included" },
        { feature: "Recruiter Seats", free: "1 Recruiter", starter: "Up to 3", pro: "Up to 10" },
        { feature: "Customer Support", free: "Community", starter: "Email Support", pro: "Priority Email & Chat" },
      ],
    },
  ],
};
