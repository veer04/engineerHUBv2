import React from "react";
import styles from "./UnifiedHiringTimeline.module.css";
import { 
  Building2, Sparkles, FileText, Upload, Calendar, Video, CheckCircle2, 
  ArrowRight, ShieldCheck, Users, BrainCircuit, Rocket
} from "lucide-react";
import StepMediaSlot from "./StepMediaSlot";
import { 
  SourcingMockup, ScreeningMockup, CRMMockup, AssessmentMockup, InterviewMockup 
} from "./TimelineMockups";

const TIMELINE_STEPS = [
  {
    stepId: "01",
    nodeIcon: Building2,
    badgeText: "01 / Fastest Sourcing",
    badgeBg: "#dcfce7",
    badgeTextColor: "#15803d",
    tintBg: "#f2fbf5",
    tintBorder: "#bbf7d0",
    hatchColor: "#86efac",
    headline: "Direct Access to 300,000+ Pre-Vetted Candidates",
    description:
      "Get engineers from campuses across India instantly. Tap into 1000+ colleges nationwide with verified student profiles, project portfolios, and  rankings.",
    highlights: [
      "Access to 300,000+ engineering candidates visiting monthly",
      "Nationwide reach across tier-1, tier-2, and tier-3 colleges",
      
    ],
    mediaAlign: "right", // text left, media right
    mediaType: "gif",
    mediaSrc: "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/videos/sourcing.gif",
    mockup: <SourcingMockup />,
    caption: "Live candidate pool search across 1000+ campuses with tier filters",
  },
  {
    stepId: "02",
    nodeIcon: BrainCircuit,
    badgeText: "02 / AI Shortlisting",
    badgeBg: "#ffedd5",
    badgeTextColor: "#c2410c",
    tintBg: "#fff8f2",
    tintBorder: "#fed7aa",
    hatchColor: "#fdba74",
    headline: "Reduce Resume Screening Time by 80%",
    description:
      "AI-driven shortlisting automatically filters top candidates by skills, experience, and JD preferences. Powered by Gemini AI, it parses semantic depth rather than basic keywords to deliver objective match scores.",
    highlights: [
      "80% reduction in manual resume review overhead",
      "Instant 0-100% ATS fitment scoring with objective reasoning",
      "Automated extraction of technical skills and real projects"
    ],
    mediaAlign: "left", // media left, text right
    mediaType: "video",
    mediaSrc: "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/videos/AI_sorting.mp4",
    mockup: <ScreeningMockup />,
    caption: "Gemini AI candidate shortlisting and semantic match scoring",
  },
  {
    stepId: "03",
    nodeIcon: Users,
    badgeText: "03 / Recruiter Workspace",
    badgeBg: "#ccfbf1",
    badgeTextColor: "#0f766e",
    tintBg: "#f0fdfa",
    tintBorder: "#99f6e4",
    hatchColor: "#5eead4",
    headline: "Engage, Track, and Move Candidates from One Board",
    description:
      "Manage candidate pipelines with our unified recruiter JobBoard CRM. Transition applicants smoothly across Response, Sorted, Assessment, and Interview stages with automated bulk outreach.",
    highlights: [
      "Multi-candidate selection and bulk template email updates",
      "Single-click export of applicant details and resume portfolios",
      "Centralized recruiter audit log and pipeline status updates"
    ],
    mediaAlign: "right", // text left, media right
    mediaType: "video",
    mediaSrc: "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/videos/processing.mp4",
    mockup: <CRMMockup />,
    caption: "Bulk applicant action bar, email outreach, and status pipeline stages",
  },
  {
    stepId: "04",
    nodeIcon: FileText,
    badgeText: "04 / Technical Evaluation",
    badgeBg: "#dbeafe",
    badgeTextColor: "#1d4ed8",
    tintBg: "#f4f8ff",
    tintBorder: "#bfdbfe",
    hatchColor: "#93c5fd",
    headline: "Generate Assessments in Under 30 Seconds",
    description:
      "Prepare custom coding challenges and aptitude assessments in under 30 seconds with our AI. Seamlessly schedule, track, and prevent cheating with advanced multi-factor AI proctoring.",
    highlights: [
      "AI-generated MCQs and multi-language live coding sandboxes",
      "Real-time proctoring tracking tab switches and camera feeds",
      "Comprehensive candidate performance scorecards with code analysis"
    ],
    mediaAlign: "left", // media left, text right
    mediaType: "video",
    mediaSrc: "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/videos/AI_assessment.mp4",
    mockup: <AssessmentMockup />,
    caption: "Instant AI assessment generation with live coding and proctoring integrity",
  },
  {
    stepId: "05",
    nodeIcon: Video,
    badgeText: "05 / Autonomous Interviews",
    badgeBg: "#f3e8ff",
    badgeTextColor: "#7e22ce",
    tintBg: "#faf5ff",
    tintBorder: "#e9d5ff",
    hatchColor: "#d8b4fe",
    headline: "Conduct Manual & AI Interviews from One Workspace",
    description:
      "Schedule live interviews seamlessly from your workspace, or let our autonomous AI agent conduct & proctor technical interviews on your behalf with real-time integrity tracking to fast-forward your hiring.",
    highlights: [
      "Integrated Google Meet scheduling directly within recruiter lobby",
      "Autonomous AI interview agent conducting domain-specific rounds",
      "Timestamped transcripts, speech insights, and instant hire decisions"
    ],
    mediaAlign: "right", // text left, media right
    mediaType: "video",
    mediaSrc: "https://engineerhubs3.s3.ap-south-1.amazonaws.com/ui/videos/AI_interview.mp4",
    mockup: <InterviewMockup />,
    caption: "Autonomous AI interviewer agent + speech-to-text live transcripts",
  },
];

export default function UnifiedHiringTimeline() {
  return (
    <section className={styles.timelineSection} id="how-it-works-section">
      <div className={styles.timelineContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerPill}>
            <Sparkles size={13} className={styles.pillSparkle} />
            <span>END-TO-END HIRING JOURNEY</span>
          </div>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          {/* <p className={styles.sectionSubtitle}>
            AI-powered technical evaluation from sourcing to interview completion—delivering
            precise candidate insights so you can hire without friction.
          </p> */}
        </div>

        {/* Central Spine & Timeline Steps */}
        <div className={styles.timelineTrack}>
          {/* Vertical spine line */}
          <div className={styles.spineLine} aria-hidden="true" />

          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = step.nodeIcon;
            const isMediaRight = step.mediaAlign === "right";

            return (
              <div key={step.stepId} className={styles.timelineRow}>
                {/* Center Node on the spine */}
                <div className={styles.centerNodeWrap}>
                  <div
                    className={styles.centerNode}
                    style={{
                      borderColor: step.badgeTextColor,
                      boxShadow: `0 0 0 4px ${step.badgeBg}`,
                      backgroundColor: step.tintBg,
                    }}
                  >
                    <Icon size={16} color={step.badgeTextColor} />
                  </div>
                </div>

                {/* Left Block */}
                <div
                  className={`${styles.sideBlock} ${styles.leftSideBlock} ${
                    isMediaRight ? styles.textSide : styles.mediaSide
                  }`}
                >
                  {isMediaRight ? (
                    /* Text Content */
                    <div
                      className={styles.textContent}
                      style={{
                        "--segment-theme-color": step.badgeTextColor,
                        "--segment-theme-bg": step.badgeBg,
                        "--segment-theme-shadow": `${step.badgeTextColor}25`,
                        "--segment-tint-bg": step.tintBg,
                        "--segment-tint-border": step.tintBorder,
                      }}
                    >
                      <span
                        className={styles.stepBadge}
                        style={{
                          backgroundColor: step.badgeBg,
                          color: step.badgeTextColor,
                        }}
                      >
                        <Icon size={14} className={styles.badgeIcon} />
                        <span>{step.badgeText}</span>
                      </span>
                      <h3 className={styles.stepHeadline}>{step.headline}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                      <ul className={styles.highlightList}>
                        {step.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2
                              size={14}
                              style={{ color: step.badgeTextColor, flexShrink: 0 }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    /* Media Slot */
                    <StepMediaSlot
                      stepId={step.stepId}
                      badgeText={step.badgeText}
                      badgeBg={step.badgeBg}
                      badgeTextColor={step.badgeTextColor}
                      tintBg={step.tintBg}
                      tintBorder={step.tintBorder}
                      hatchColor={step.hatchColor}
                      mediaType={step.mediaType || "mockup"}
                      mediaSrc={step.mediaSrc || ""}
                      altText={step.headline}
                      fallbackMockup={step.mockup}
                      caption={step.caption}
                    />
                  )}
                </div>

                {/* Right Block */}
                <div
                  className={`${styles.sideBlock} ${styles.rightSideBlock} ${
                    isMediaRight ? styles.mediaSide : styles.textSide
                  }`}
                >
                  {isMediaRight ? (
                    /* Media Slot */
                    <StepMediaSlot
                      stepId={step.stepId}
                      badgeText={step.badgeText}
                      badgeBg={step.badgeBg}
                      badgeTextColor={step.badgeTextColor}
                      tintBg={step.tintBg}
                      tintBorder={step.tintBorder}
                      hatchColor={step.hatchColor}
                      mediaType={step.mediaType || "mockup"}
                      mediaSrc={step.mediaSrc || ""}
                      altText={step.headline}
                      fallbackMockup={step.mockup}
                      caption={step.caption}
                    />
                  ) : (
                    /* Text Content */
                    <div
                      className={styles.textContent}
                      style={{
                        "--segment-theme-color": step.badgeTextColor,
                        "--segment-theme-bg": step.badgeBg,
                        "--segment-theme-shadow": `${step.badgeTextColor}25`,
                        "--segment-tint-bg": step.tintBg,
                        "--segment-tint-border": step.tintBorder,
                      }}
                    >
                      <span
                        className={styles.stepBadge}
                        style={{
                          backgroundColor: step.badgeBg,
                          color: step.badgeTextColor,
                        }}
                      >
                        <Icon size={14} className={styles.badgeIcon} />
                        <span>{step.badgeText}</span>
                      </span>
                      <h3 className={styles.stepHeadline}>{step.headline}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                      <ul className={styles.highlightList}>
                        {step.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2
                              size={14}
                              style={{ color: step.badgeTextColor, flexShrink: 0 }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
