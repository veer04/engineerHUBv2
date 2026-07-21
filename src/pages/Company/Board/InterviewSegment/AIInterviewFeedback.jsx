import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiTrendingUp,
  FiTrendingDown,
  FiThumbsUp,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiCpu,
  FiCheckCircle,
  FiSmile,
  FiUsers,
  FiSmartphone,
  FiMaximize2,
  FiWifi,
} from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import "./AIInterviewFeedback.css";

export default function AIInterviewFeedback() {
  const navigate = useNavigate();
  const { hiringId, candidateId } = useParams();
  const [searchParams] = useSearchParams();
  const returnPath = searchParams.get("returnPath") || (hiringId ? `/company/jobs/board/${hiringId}/interview/report` : -1);

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useGlobalSnackbar();

  // Accordion open/close state
  const [openTimelineItems, setOpenTimelineItems] = useState([0]); // first open by default

  const toggleTimeline = (index) => {
    if (openTimelineItems.includes(index)) {
      setOpenTimelineItems(openTimelineItems.filter((i) => i !== index));
    } else {
      setOpenTimelineItems([...openTimelineItems, index]);
    }
  };

  const handleDownloadReport = () => {
    setSnackbarMessage("Downloading AI Interview Performance Report (PDF)...");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleProceedNextRound = () => {
    setSnackbarMessage("Candidate status updated to Proceed to Next Round.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleRejectCandidate = () => {
    setSnackbarMessage("Candidate marked as Rejected.");
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
  };

  // Mock feedback data (support dynamic candidate overrides)
  const candidateData = {
    name: "Duncan Tall",
    role: "Fullstack Developer",
    date: "Oct 24, 2024",
    duration: "45 mins",
    language: "English",
    aiScore: 82,
    recommendation: "Strong Hire",
    difficulty: "Medium",
    skills: [
      {
        name: "React",
        score: 92,
        max: 100,
        comment: "Excellent mastery of hooks and performance optimization strategies.",
      },
      {
        name: "JavaScript",
        score: 88,
        max: 100,
        comment: "Deep understanding of event loops and asynchronous patterns.",
      },
      {
        name: "System Design",
        score: 75,
        max: 100,
        comment: "Solid architectural choices, though could improve on scalability edge cases.",
      },
      {
        name: "Problem Solving",
        score: 84,
        max: 100,
        comment: "Systematic approach to debugging and efficient algorithm selection.",
      },
    ],
    strengths: [
      "Modular component thinking",
      "Clean code principles",
      "High technical articulation",
    ],
    weaknesses: ["Brief on NoSQL schemas", "Communication pace"],
    recommendationSummary:
      "Suitable for the deep technical round with a focus on full-stack architecture.",
    timeline: [
      {
        id: 1,
        title: "React Hooks & State Management",
        category: "Technical Proficiency",
        score: "9/10",
        scoreTag: "Excellent",
        question:
          "Explain how you would handle complex state synchronization between a parent component and multiple deeply nested children in React.",
        answer:
          "I would evaluate if the state is truly global. For moderate complexity, I'd use Context API with useReducer. If it's highly dynamic, I might reach for Zustand or Redux Toolkit to avoid unnecessary re-renders...",
        aiObservation:
          "Candidate correctly identified the tradeoff between prop drilling and global state management. Mentioning Zustand shows up-to-date industry knowledge.",
      },
      {
        id: 2,
        title: "System Design: Real-time Analytics",
        category: "Architecture",
        score: "7.5/10",
        scoreTag: "Good",
        question:
          "How would you design a real-time analytics dashboard handling 100,000 events per second?",
        answer:
          "I would use Kafka for message streaming, Flink or Spark for stream processing, and store aggregated metrics in ClickHouse or TimescaleDB for sub-second query latency...",
        aiObservation:
          "Strong understanding of high-throughput data pipelines and OLAP databases. Good clarity on decoupling ingestion from aggregation.",
      },
    ],
    integrity: {
      score: 96,
      status: "EXCELLENT",
      faceVisible: "98%",
      multiFace: "None",
      phoneDet: "None",
      tabSwitch: "0",
      network: "Stable",
    },
  };

  return (
    <div className="ai-feedback-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>AI Interview Feedback Report — engineerHUB</title>
      </Helmet>

      {/* Header Bar */}
      <header className="ai-feedback-header-bar">
        <button
          type="button"
          className="ai-feedback-back-btn"
          onClick={() => (typeof returnPath === "number" ? navigate(-1) : navigate(returnPath))}
        >
          <FiArrowLeft /> Back
        </button>

        <div className="ai-feedback-header-title">
          <SiOpenai style={{ color: "#7c3aed", fontSize: "1.2rem" }} />
          <h1>AI Interview Feedback Report</h1>
          <span className="ai-header-badge">
            <FiCpu /> Autonomous Evaluator
          </span>
        </div>

        <div style={{ width: "100px" }} />
      </header>

      {/* Main Container */}
      <main className="ai-feedback-container">
        <div className="ai-feedback-layout">
          
          {/* Main Column */}
          <div className="ai-feedback-main">
            
            {/* Section 1: Candidate Summary */}
            <section className="feedback-card candidate-summary-card">
              <div className="candidate-profile-left">
                <div className="candidate-avatar">
                  <FiUser />
                </div>
                <div className="candidate-info-details">
                  <h2>{candidateData.name}</h2>
                  <p className="candidate-role-title">{candidateData.role}</p>
                  <div className="candidate-meta-row">
                    <span className="meta-pill">
                      <FiCalendar /> {candidateData.date}
                    </span>
                    <span className="meta-pill">
                      <FiClock /> {candidateData.duration}
                    </span>
                    <span className="meta-pill">
                      <FiGlobe /> {candidateData.language}
                    </span>
                  </div>
                </div>
              </div>

              <div className="candidate-scores-right">
                <div className="score-circle-container">
                  <div className="circular-score-badge">
                    <div className="circular-score-inner">{candidateData.aiScore}</div>
                  </div>
                  <span className="score-label-caps">AI SCORE</span>
                </div>

                <div className="recommendation-pill-box">
                  <span className="hire-recommendation-badge">
                    <FiCheckCircle /> {candidateData.recommendation}
                  </span>
                  <span className="difficulty-tag">Difficulty: {candidateData.difficulty}</span>
                </div>
              </div>
            </section>

            {/* Section 2: Skill Evaluation */}
            <section className="feedback-card">
              <h3 className="section-heading">Skill Evaluation</h3>
              <div className="skills-evaluation-grid">
                {candidateData.skills.map((skill, idx) => (
                  <div key={idx} className="skill-eval-card">
                    <div className="skill-eval-header">
                      <span className="skill-eval-name">{skill.name}</span>
                      <span className="skill-eval-score">
                        {skill.score}/{skill.max}
                      </span>
                    </div>
                    <div className="skill-progress-bar-bg">
                      <div
                        className="skill-progress-bar-fill"
                        style={{ width: `${(skill.score / skill.max) * 100}%` }}
                      />
                    </div>
                    <p className="skill-eval-quote">"{skill.comment}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: AI Interview Summary */}
            <section className="feedback-card">
              <h3 className="section-heading">AI Interview Summary</h3>
              <div className="ai-summary-grid">
                <div className="summary-block strengths">
                  <h4 className="block-title">
                    <FiTrendingUp /> Strengths
                  </h4>
                  <ul className="summary-list">
                    {candidateData.strengths.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="summary-block weaknesses">
                  <h4 className="block-title">
                    <FiTrendingDown /> Weaknesses
                  </h4>
                  <ul className="summary-list">
                    {candidateData.weaknesses.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="summary-block recommendation">
                  <h4 className="block-title">
                    <FiThumbsUp /> Recommendation
                  </h4>
                  <p className="summary-text">{candidateData.recommendationSummary}</p>
                </div>
              </div>
            </section>

            {/* Section 4: Interview Timeline Accordions */}
            <section className="feedback-card" style={{ background: "transparent", border: "none", padding: 0, boxShadow: "none" }}>
              <h3 className="section-heading">Interview Timeline</h3>
              <div className="timeline-accordion-list">
                {candidateData.timeline.map((item, index) => {
                  const isOpen = openTimelineItems.includes(index);
                  return (
                    <div
                      key={item.id}
                      className={`timeline-accordion-item ${isOpen ? "active" : ""}`}
                    >
                      <div
                        className="accordion-header"
                        onClick={() => toggleTimeline(index)}
                      >
                        <div className="accordion-header-left">
                          <span className="q-number-bubble">{item.id}</span>
                          <div className="q-title-meta">
                            <h4>{item.title}</h4>
                            <p>Question Category: {item.category}</p>
                          </div>
                        </div>

                        <div className="accordion-header-right">
                          <div className="q-score-block">
                            <span className="q-score-val">{item.score}</span>
                            <span className="q-score-tag">{item.scoreTag}</span>
                          </div>
                          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="accordion-body">
                          {/* Question Prompt */}
                          <div className="dialog-row">
                            <div className="dialog-avatar bot">
                              <SiOpenai />
                            </div>
                            <div className="dialog-bubble bot-bubble">"{item.question}"</div>
                          </div>

                          {/* Candidate Answer */}
                          <div className="dialog-row candidate">
                            <div className="dialog-avatar user">
                              <FiUser />
                            </div>
                            <div className="dialog-bubble user-bubble">"{item.answer}"</div>
                          </div>

                          {/* AI Observation */}
                          <div className="ai-observation-box">
                            <h5>AI OBSERVATION</h5>
                            <p>{item.aiObservation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 5: Interview Integrity Report */}
            <section className="feedback-card">
              <div className="integrity-header">
                <div>
                  <h3 className="section-heading" style={{ margin: 0 }}>
                    Interview Integrity Report
                  </h3>
                  <p>Automated behavioral analysis and compliance tracking.</p>
                </div>
                <div className="integrity-score-right">
                  <div className="integrity-score-val">{candidateData.integrity.score}/100</div>
                  <div className="integrity-score-tag">{candidateData.integrity.status}</div>
                </div>
              </div>

              <div className="integrity-metrics-grid">
                <div className="metric-box">
                  <FiSmile className="metric-icon" />
                  <span className="metric-label">Face Visible</span>
                  <span className="metric-val">{candidateData.integrity.faceVisible}</span>
                </div>

                <div className="metric-box">
                  <FiUsers className="metric-icon" />
                  <span className="metric-label">Multi-Face</span>
                  <span className="metric-val">{candidateData.integrity.multiFace}</span>
                </div>

                <div className="metric-box">
                  <FiSmartphone className="metric-icon" />
                  <span className="metric-label">Phone Det.</span>
                  <span className="metric-val">{candidateData.integrity.phoneDet}</span>
                </div>

                <div className="metric-box">
                  <FiMaximize2 className="metric-icon" />
                  <span className="metric-label">Tab Switch</span>
                  <span className="metric-val">{candidateData.integrity.tabSwitch}</span>
                </div>

                <div className="metric-box">
                  <FiWifi className="metric-icon" />
                  <span className="metric-label">Network</span>
                  <span className="metric-val">{candidateData.integrity.network}</span>
                </div>
              </div>
            </section>

            {/* Footer Actions Bar */}
            <div className="ai-feedback-footer-actions">
              <div className="footer-btn-group">
                <button
                  type="button"
                  className="btn-footer-action secondary-gray"
                  onClick={() => (typeof returnPath === "number" ? navigate(-1) : navigate(returnPath))}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-footer-action danger-outline"
                  onClick={handleRejectCandidate}
                >
                  Reject Candidate
                </button>
              </div>

              <div className="footer-btn-group">
                <button
                  type="button"
                  className="btn-footer-action primary-outline"
                  onClick={handleDownloadReport}
                >
                  <FiDownload /> Download PDF
                </button>
                <button
                  type="button"
                  className="btn-footer-action primary-solid"
                  onClick={handleProceedNextRound}
                >
                  Proceed to Next Round
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="ai-feedback-sidebar">
            <div className="sidebar-stack">
              
              {/* Overview Card */}
              <div className="feedback-card">
                <h4 className="sidebar-title-caps">REPORT OVERVIEW</h4>
                <div className="overview-row">
                  <span className="overview-row-label">Overall Score</span>
                  <span className="overview-row-val">{candidateData.aiScore}%</span>
                </div>
                <div className="overview-row">
                  <span className="overview-row-label">Integrity</span>
                  <span className="overview-row-val" style={{ color: "#00865f" }}>
                    {candidateData.integrity.score}%
                  </span>
                </div>

                <div style={{ paddingTop: "1rem", marginTop: "1rem", borderTop: "1px solid #bdc9c8" }}>
                  <span className="sidebar-title-caps">FINAL RECOMMENDATION</span>
                  <div className="final-rec-box">{candidateData.recommendation}</div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button
                    type="button"
                    className="btn-sidebar-download"
                    onClick={handleDownloadReport}
                  >
                    <FiDownload /> Download Report
                  </button>
                </div>
              </div>

              {/* Compare Applicants Card */}
              <div className="feedback-card">
                <h4 className="sidebar-title-caps">COMPARE CANDIDATES</h4>
                <p className="compare-desc">
                  {candidateData.name} is in the top 5% of all applicants for this role.
                </p>
                <div className="compare-progress-track">
                  <div className="compare-progress-fill" style={{ width: "95%" }} />
                </div>
                <div className="compare-labels">
                  <span>Average</span>
                  <span>Top 5%</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
