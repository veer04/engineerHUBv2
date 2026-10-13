import React from "react";
import styles from "./TimelineMockups.module.css";
import { 
  Search, Filter, CheckCircle2, AlertCircle, Sparkles, 
  Send, Users, Code2, ShieldCheck, Video, Bot, BrainCircuit, FileText 
} from "lucide-react";

/**
 * High-fidelity pure CSS/SVG dark UI mockups representing the real engineerHUB platform
 * (JobBoard, AI Sorting, Assessment Studio, and AI Interview Lobby).
 */

export function SourcingMockup() {
  return (
    <div className={styles.mockupCard}>
      {/* Search & Filter Bar */}
      <div className={styles.topFilterBar}>
        <div className={styles.searchBox}>
          <Search size={14} className={styles.iconMuted} />
          <span>Search 300,000+ campus engineers...</span>
        </div>
        <div className={styles.campusPillBadge}>
          <Filter size={12} />
          <span>800+ Campuses</span>
        </div>
      </div>

      {/* Campus Badges */}
      <div className={styles.campusTags}>
        <span className={styles.campusTagActive}>All Tiers</span>
        <span className={styles.campusTag}>Tier 1 (IIT/NIT/BITS)</span>
        <span className={styles.campusTag}>2025 Batch</span>
        <span className={styles.campusTag}>2026 Batch</span>
      </div>

      {/* Candidate Mini Cards */}
      <div className={styles.candidateList}>
        <div className={styles.candidateRow}>
          <div className={styles.candidateAvatar}>AK</div>
          <div className={styles.candidateInfo}>
            <div className={styles.candidateNameRow}>
              <span className={styles.candidateName}>Aarav Kumar</span>
              <span className={styles.verifiedTag}>Verified Candidate</span>
            </div>
            <span className={styles.candidateCollege}>BITS Pilani · Computer Science · 2025</span>
          </div>
          <div className={styles.candidateStats}>
            <span className={styles.statGreen}>Top 3% Coder</span>
          </div>
        </div>

        <div className={styles.candidateRow}>
          <div className={styles.candidateAvatar}>PS</div>
          <div className={styles.candidateInfo}>
            <div className={styles.candidateNameRow}>
              <span className={styles.candidateName}>Priya Sharma</span>
              <span className={styles.verifiedTag}>Verified Candidate</span>
            </div>
            <span className={styles.candidateCollege}>IIT Madras · Electrical Eng · 2025</span>
          </div>
          <div className={styles.candidateStats}>
            <span className={styles.statGreen}>Fullstack Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreeningMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.scoringHeader}>
        <div className={styles.aiTag}>
          <Sparkles size={13} />
          <span>Gemini AI Screening</span>
        </div>
        <span className={styles.timeTag}>Processed in 1.8s</span>
      </div>

      <div className={styles.gaugeContainer}>
        {/* Gauge Circle */}
        <div className={styles.gaugeCircle}>
          <span className={styles.gaugePercent}>78%</span>
          <span className={styles.gaugeLabel}>ATS Match</span>
        </div>

        <div className={styles.fitmentDetails}>
          <div className={styles.fitmentItem}>
            <span className={styles.fitmentKey}>Role Match:</span>
            <span className={styles.fitmentValue}>Fullstack Developer</span>
          </div>
          <div className={styles.fitmentItem}>
            <span className={styles.fitmentKey}>Experience:</span>
            <span className={styles.fitmentValue}>2 Projects · 1 Internship</span>
          </div>
          <div className={styles.skillsMatched}>
            <span className={styles.skillMatchPill}><CheckCircle2 size={11} /> React</span>
            <span className={styles.skillMatchPill}><CheckCircle2 size={11} /> Node.js</span>
            <span className={styles.skillMatchPill}><CheckCircle2 size={11} /> PostgreSQL</span>
          </div>
        </div>
      </div>

      <div className={styles.reasoningBox}>
        <BrainCircuit size={13} className={styles.iconAccentOrange} />
        <span>"Strong architecture and problem-solving depth aligned with JD requirements."</span>
      </div>
    </div>
  );
}

export function CRMMockup() {
  return (
    <div className={styles.mockupCard}>
      {/* Pipeline Tabs */}
      <div className={styles.pipelineTabs}>
        <div className={styles.pipelineTab}>Response (48)</div>
        <div className={`${styles.pipelineTab} ${styles.pipelineTabActive}`}>Sorted (16)</div>
        <div className={styles.pipelineTab}>Assessment (9)</div>
        <div className={styles.pipelineTab}>Interview (4)</div>
      </div>

      {/* Recruiter Bulk Actions */}
      <div className={styles.bulkActionBar}>
        <div className={styles.selectedCount}>
          <input type="checkbox" defaultChecked className={styles.customCheck} />
          <span>12 Candidates Selected</span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.btnBulkEmail}>
            <Send size={11} />
            <span>Send Bulk Email</span>
          </button>
          <button className={styles.btnShortlist}>
            <span>Shortlist</span>
          </button>
        </div>
      </div>

      {/* Candidate Data Rows */}
      <div className={styles.crmTable}>
        <div className={styles.crmRow}>
          <input type="checkbox" defaultChecked className={styles.customCheck} />
          <span className={styles.crmColName}>Rohan Patel</span>
          <span className={styles.crmColScore}>Score: 84%</span>
          <span className={styles.crmColStatus}>Move to Test →</span>
        </div>
        <div className={styles.crmRow}>
          <input type="checkbox" defaultChecked className={styles.customCheck} />
          <span className={styles.crmColName}>Ananya Verma</span>
          <span className={styles.crmColScore}>Score: 81%</span>
          <span className={styles.crmColStatus}>Move to Test →</span>
        </div>
      </div>
    </div>
  );
}

export function AssessmentMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.assessmentHeader}>
        <div className={styles.testMeta}>
          <span className={styles.testTitle}>Fullstack Assessment · V2</span>
          <span className={styles.testTime}>30 Sec Instant Setup</span>
        </div>
        <span className={styles.aiBadgeBlue}>
          <Code2 size={12} />
          <span>Coding + MCQs</span>
        </span>
      </div>

      {/* Question Distribution Bar */}
      <div className={styles.questionDistBar}>
        <div className={styles.distSegment} style={{ width: "60%", background: "#3b82f6" }}>
          <span>15 MCQs (Core CS)</span>
        </div>
        <div className={styles.distSegment} style={{ width: "40%", background: "#6366f1" }}>
          <span>2 Coding Challenges</span>
        </div>
      </div>

      {/* Real-time AI Proctoring Panel */}
      <div className={styles.proctoringGrid}>
        <div className={styles.proctorCard}>
          <span className={styles.proctorLabel}>Tab Switches</span>
          <span className={styles.proctorGood}>0 (Clean)</span>
        </div>
        <div className={styles.proctorCard}>
          <span className={styles.proctorLabel}>Face Detection</span>
          <span className={styles.proctorGood}>Single Face Verified</span>
        </div>
        <div className={styles.proctorCard}>
          <span className={styles.proctorLabel}>Integrity Score</span>
          <span className={styles.proctorScore}>98% Clean</span>
        </div>
      </div>
    </div>
  );
}

export function InterviewMockup() {
  return (
    <div className={styles.mockupCard}>
      {/* Video & AI Panel */}
      <div className={styles.interviewLobby}>
        <div className={styles.streamTile}>
          <div className={styles.videoPlaceholder}>
            <Users size={22} className={styles.iconMuted} />
            <span>Candidate Live Video</span>
          </div>
          <span className={styles.streamTag}>Candidate Stream</span>
        </div>

        <div className={styles.streamTileAgent}>
          <div className={styles.agentPlaceholder}>
            <Bot size={22} className={styles.iconPurple} />
            <span>Autonomous AI Agent</span>
          </div>
          <span className={styles.streamTagAgent}>Gemini AI Interviewer</span>
        </div>
      </div>

      {/* Live Transcript & Feedback */}
      <div className={styles.transcriptFeed}>
        <div className={styles.transcriptMeta}>
          <span className={styles.liveIndicator}>● LIVE TRANSCRIPT</span>
          <span className={styles.timestamp}>14:28 min</span>
        </div>
        <p className={styles.transcriptSnippet}>
          <strong>AI Agent:</strong> "Can you explain how you handled database indexing in your distributed project?"
        </p>
      </div>

      {/* Instant Decision Summary */}
      <div className={styles.decisionBanner}>
        <ShieldCheck size={14} className={styles.iconGreen} />
        <span>Technical Score: <strong>88/100</strong> · Recommendation: <strong>Shortlist for Offer</strong></span>
      </div>
    </div>
  );
}
