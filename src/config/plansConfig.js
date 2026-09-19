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
    rate: "~ 5 credits / candidate",
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
    rate: "~ 10 credits / interview",
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
      { label: "Candidate Assessments", count: "200" },
      { label: "Sanya AI Voice Interviews", count: "100" },
    ],
  },
  {
    credits: 5000,
    options: [
      { label: "Candidate Resume Sorts", count: "5,000" },
      { label: "Candidate Assessments", count: "1,000" },
      { label: "Sanya AI Voice Interviews", count: "500" },
    ],
  },
];

export const subscriptionPlans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 99,
    annualPrice: 948,
    priceDisplayMonthly: "₹99",
    priceDisplayAnnual: "₹79",
    billingCycleText: "per recruiter / month",
    credits: 200,
    creditsDisplay: "200 AI Credits / month",
    description: "For recruiters getting started with key recruitment workflows.",
    badge: null,
    isRecommended: false,
    ctaText: "Choose Starter",
    ctaVariant: "outline",
    features: [
      { text: "Job & Internship Posting", included: true },
      { text: "Candidate Management & CRM", included: true },
      { text: "200 AI Credits per month", included: true },
      { text: "AI Resume Sorting", badge: "Limited", included: true },
      { text: "AI Skill Assessments", badge: "Limited", included: true },
      { text: "Manual & AI Interviews", badge: "Limited", included: true },
      { text: "AI Proctoring & Analytics Reports", included: true },
      { text: "Automated Email Outreach", included: true },
    ],
  },
  {
    id: "ultra",
    name: "Ultra",
    monthlyPrice: 999,
    annualPrice: 9588,
    priceDisplayMonthly: "₹999",
    priceDisplayAnnual: "₹799",
    billingCycleText: "per recruiter / month",
    credits: 1500,
    creditsDisplay: "1,500 AI Credits / month",
    description: "For growing hiring teams needing enhanced AI capacity.",
    badge: "RECOMMENDED",
    isRecommended: true,
    ctaText: "Choose Ultra",
    ctaVariant: "primary",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "1,500 AI Credits per month", included: true },
      { text: "AI Resume Sorting", badge: "High Speed", included: true },
      { text: "AI Skill Assessments", badge: "Unlimited", included: true },
      { text: "Manual & AI Interviews", included: true },
      { text: "AI Proctoring & Detailed Analytics Reports", included: true },
      { text: "Job & Internship Boosting", badge: "Limited", included: true },
      { text: "Automated Email Outreach", included: true },
    ],
  },
  {
    id: "pro",
    name: "Professional",
    monthlyPrice: 4999,
    annualPrice: 47988,
    priceDisplayMonthly: "₹4,999",
    priceDisplayAnnual: "₹3,999",
    billingCycleText: "per team / month",
    credits: 10000,
    creditsDisplay: "10,000 AI Credits / month",
    description: "For teams hiring regularly at scale with full platform capabilities.",
    badge: null,
    isRecommended: false,
    ctaText: "Choose Professional",
    ctaVariant: "outline",
    features: [
      { text: "Everything in Ultra", included: true },
      { text: "10,000 AI Credits per month", included: true },
      { text: "AI Resume Sorting", badge: "High Speed", included: true },
      { text: "AI Skill Assessments", badge: "Unlimited", included: true },
      { text: "AI Interviews", badge: "Unlimited", included: true },
      { text: "Dedicated Hiring Assistant to Guide Your Process", included: true },
      { text: "Ultra Job & Internship Boosting (Website & Social Media)", included: true },
      { text: "Priority Email, Chat & Dedicated Support", included: true },
    ],
  },
];

export const comparisonMatrix = {
  categories: [
    {
      name: "AI & Recruitment Workflows",
      rows: [
        { feature: "AI Credits / Month", starter: "200", ultra: "1,500", pro: "10,000" },
        { feature: "AI Resume Sorting", starter: "✓ Standard", ultra: "⚡ High Speed", pro: "⚡ Max Speed" },
        { feature: "AI Skill Assessments", starter: "✓ Included", ultra: "∞ Unlimited", pro: "∞ Unlimited" },
        { feature: "Interviews Execution", starter: "Manual & AI", ultra: "Manual & AI", pro: "∞ Unlimited Manual & AI" },
        { feature: "Job & Internship Boosting", starter: "—", ultra: "Limited", pro: "Ultra (Web & Social)" },
        { feature: "Email Outreach", starter: "Manual", ultra: "Automated", pro: "Automated + Templates" },
      ],
    },
    {
      name: "Proctoring & Analytics",
      rows: [
        { feature: "AI Proctoring", starter: "Basic", ultra: "Standard Reports", pro: "Full MediaPipe Suite" },
        { feature: "Evaluation Reports", starter: "Summary", ultra: "Detailed Analytics", pro: "Full Rigor Reports" },
        { feature: "Archive History", starter: "30 Days", ultra: "60 Days", pro: "90 Days" },
      ],
    },
    {
      name: "Team & Account Support",
      rows: [
        { feature: "Dedicated Hiring Assistant", starter: "—", ultra: "—", pro: "✓ Included" },
        { feature: "Recruiter Seats", starter: "Up to 1", ultra: "Up to 3", pro: "Up to 5" },
        { feature: "Customer Support", starter: "Email Support", ultra: "Priority Mail & Chat", pro: "Chat & Call Support" },
      ],
    },
  ],
};
