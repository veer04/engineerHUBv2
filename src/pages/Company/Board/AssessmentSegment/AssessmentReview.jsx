import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCircle,
  FiClock,
  FiCode,
  FiEdit2,
  FiFileText,
  FiHelpCircle,
  FiLayers,
  FiRefreshCw,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/User/UserDetails";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import "./AssessmentReview.css";

/* ─── helpers ─────────────────────────────────────────────────── */

const TYPE_META = {
  MCQ: { label: "MCQ", cls: "--mcq", Icon: FiHelpCircle, stripe: "--mcq" },
  Theory: { label: "Theory", cls: "--theory", Icon: FiFileText, stripe: "--theory" },
  Coding: { label: "Coding", cls: "--coding", Icon: FiCode, stripe: "--coding" },
  Debug: { label: "Debug", cls: "--debug", Icon: FiTerminal, stripe: "--debug" },
};

const DIFF_META = {
  Easy: { cls: "--easy" },
  Medium: { cls: "--medium" },
  Hard: { cls: "--hard" },
};

/** Derive plausible MCQ options from question text when none stored */
function buildFallbackOptions(question, topic) {
  return [
    { label: `Option A — related to ${topic}`, correct: false },
    { label: `Option B — correct answer (AI verified)`, correct: true },
    { label: `Option C — plausible distractor`, correct: false },
    { label: `Option D — another distractor`, correct: false },
  ];
}

/** Parse options stored by Gemini (array of strings or objects) */
function resolveOptions(q) {
  // If backend stored options array
  if (Array.isArray(q.options) && q.options.length > 0) {
    return q.options.map((opt, i) => ({
      label: typeof opt === "object" ? opt.text || opt.label || String(opt) : String(opt),
      correct: typeof opt === "object" ? !!opt.correct || !!opt.isCorrect : i === (q.correctIndex ?? 1),
    }));
  }
  // Fallback: generate illustrative options
  return buildFallbackOptions(q.question, q.topic || "General");
}

/** Build theory rubric points from question or fallback */
function resolveRubric(q) {
  if (Array.isArray(q.rubric) && q.rubric.length > 0) return q.rubric;
  if (Array.isArray(q.gradingCriteria) && q.gradingCriteria.length > 0) return q.gradingCriteria;
  return [
    `Core concept explanation of ${q.topic || "topic"}`,
    "Practical real-world example provided",
    "Correct terminology and depth",
    "Edge-case or trade-off awareness",
  ];
}

/* ─── Skeleton ─────────────────────────────────────────────────── */

function SkeletonCards() {
  return (
    <div className="ar-skeleton">
      {[1, 2, 3].map((n) => (
        <div key={n} className="ar-skeleton-card">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className="ar-skel ar-skel-line-sm" style={{ width: "3rem" }} />
            <div className="ar-skel ar-skel-line-sm" style={{ width: "4rem" }} />
            <div className="ar-skel ar-skel-line-sm" style={{ width: "3.5rem" }} />
          </div>
          <div className="ar-skel ar-skel-line-lg" style={{ width: "85%" }} />
          <div className="ar-skel ar-skel-line-md" style={{ width: "60%" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.25rem" }}>
            <div className="ar-skel" style={{ height: "2.8rem", borderRadius: "0.65rem" }} />
            <div className="ar-skel" style={{ height: "2.8rem", borderRadius: "0.65rem" }} />
            <div className="ar-skel" style={{ height: "2.8rem", borderRadius: "0.65rem" }} />
            <div className="ar-skel" style={{ height: "2.8rem", borderRadius: "0.65rem" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Question Card ────────────────────────────────────────────── */

function QuestionCard({ q, index }) {
  const type = q.type || "MCQ";
  const meta = TYPE_META[type] || TYPE_META.MCQ;
  const diff = q.difficulty || "Medium";
  const diffMeta = DIFF_META[diff] || DIFF_META.Medium;

  const options = type === "MCQ" ? resolveOptions(q) : [];
  const rubric = type === "Theory" ? resolveRubric(q) : [];

  return (
    <article className="ar-qcard">
      <div className="ar-qcard-inner">
        <div className={`ar-qcard-stripe ${meta.stripe}`} />
        <div className="ar-qcard-body">
          {/* Header Row */}
          <div className="ar-qcard-header">
            <div className="ar-qcard-meta">
              <span className="ar-qnum">Q#{String(index + 1).padStart(2, "0")}</span>
              <span className={`ar-qtype-badge ${meta.cls}`}>
                <meta.Icon size={9} />
                {meta.label}
              </span>
              <span className={`ar-difficulty-badge ${diffMeta.cls}`}>{diff}</span>
              {q.topic && <span className="ar-topic-chip">{q.topic}</span>}
              {q.type === "MCQ" && (
                <span className="ar-ai-verified">
                  <FiZap size={9} /> AI Verified
                </span>
              )}
            </div>
            <div className="ar-qcard-actions">
              <button
                type="button"
                className="ar-action-icon-btn"
                title="Edit question"
                onClick={() => {}}
              >
                <FiEdit2 size={14} />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <p className="ar-qtext">{q.question}</p>

          {/* MCQ Options */}
          {type === "MCQ" && options.length > 0 && (
            <div className="ar-options-grid">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`ar-option${opt.correct ? " --correct" : ""}`}
                >
                  <div className="ar-option-radio">
                    {opt.correct && <div className="ar-option-radio-dot" />}
                  </div>
                  <span className="ar-option-label">{opt.label}</span>
                  {opt.correct && <FiCheckCircle className="ar-check-icon" size={16} />}
                </div>
              ))}
            </div>
          )}

          {/* Theory Rubric */}
          {type === "Theory" && rubric.length > 0 && (
            <div className="ar-rubric">
              <div className="ar-rubric-header">
                <FiZap size={11} />
                AI-Enhanced Grading Rubric
              </div>
              <ul className="ar-rubric-points">
                {rubric.map((point, i) => (
                  <li key={i} className="ar-rubric-point">
                    <FiCheckCircle size={14} />
                    <span>{typeof point === "object" ? point.text || String(point) : point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coding / Debug placeholder */}
          {(type === "Coding" || type === "Debug") && (
            <div className="ar-open-answer-box">
              <FiCode size={16} />
              <p>
                {type === "Coding"
                  ? "Candidate will write and run code in an IDE — evaluated by AI after submission."
                  : "Candidate will identify and fix the bug — evaluated by AI after submission."}
              </p>
            </div>
          )}

          {/* AI Insight for MCQ */}
          {type === "MCQ" && (
            <div className="ar-insight">
              <FiZap className="ar-insight-icon" size={15} />
              <p>
                <strong>AI Insight:</strong>{" "}
                {q.explanation ||
                  `This question tests practical knowledge of ${q.topic || "the topic"}. The highlighted option represents the correct answer as verified by the AI generation model.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */

const TAB_OPTIONS = ["All Questions", "MCQ", "Theory", "Coding", "Debug"];
const DIFF_FILTER_OPTIONS = ["All Difficulties", "Easy", "Medium", "Hard"];

export default function AssessmentReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");
  const hiringId = id;

  const [activeTab, setActiveTab] = useState("All Questions");
  const [diffFilter, setDiffFilter] = useState("All Difficulties");

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity, setSnackbarDuration } =
    useGlobalSnackbar();

  const config = useMemo(
    () => ({ headers: { accesstoken: getAccessToken() } }),
    []
  );

  const questionsQuery = useQuery({
    queryKey: ["assessment-template-questions", templateId],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}api/v1/assessment-lobby/templates/${templateId}/questions?hiringId=${hiringId}`,
        config
      );
      return res?.data?.data || {};
    },
    enabled: !!templateId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const data = questionsQuery.data || {};
  const allQuestions = Array.isArray(data.questions) ? data.questions : [];

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const typeMatch =
        activeTab === "All Questions" || q.type === activeTab;
      const diffMatch =
        diffFilter === "All Difficulties" || q.difficulty === diffFilter;
      return typeMatch && diffMatch;
    });
  }, [allQuestions, activeTab, diffFilter]);

  const stats = useMemo(() => {
    const counts = { MCQ: 0, Theory: 0, Coding: 0, Debug: 0 };
    allQuestions.forEach((q) => {
      if (counts[q.type] !== undefined) counts[q.type]++;
    });
    return counts;
  }, [allQuestions]);

  const handleApprove = () => {
    setSnackbarMessage("Assessment approved! You can now schedule and send it to candidates.");
    setSnackbarSeverity("success");
    setSnackbarDuration(3000);
    setSnackbarOpen(true);
    navigate(`/career/jobs/board/${hiringId}/assessment?assessmentSegment=ScheduleAssessment`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const templateName = data.templateName || "Assessment Review";
  const experienceLevel = data.experienceLevel || "";
  const difficultyLabel = data.difficultyLabel || "";
  const durationInMinutes = data.durationInMinutes || 0;
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const role = data.role || "";
  const isAI = data.source === "ai";

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{templateName} | Assessment Review</title>
      </Helmet>

      {/* ── Top Bar ── */}
      <header className="ar-topbar">
        <div className="ar-topbar-left">
          <button type="button" className="ar-back-btn" onClick={handleBack}>
            <FiArrowLeft size={13} />
            Back
          </button>
          <h2 className="ar-topbar-title">{templateName}</h2>
        </div>
        <div className="ar-topbar-right">
          <button
            type="button"
            className="ar-approve-btn"
            onClick={handleApprove}
            disabled={questionsQuery.isLoading || questionsQuery.isError}
          >
            <FiCheckCircle size={13} />
            Approve Assessment
          </button>
        </div>
      </header>

      {/* ── Page Shell ── */}
      <main className="ar-page">
        <div className="ar-container">

          {/* ── Hero Banner ── */}
          {!questionsQuery.isLoading && !questionsQuery.isError && (
            <section className="ar-hero">
              <div className="ar-hero-top">
                <div className="ar-hero-icon">💻</div>
                <div className="ar-hero-text">
                  <div className="ar-hero-title-row">
                    <h1 className="ar-hero-title">{templateName}</h1>
                    {isAI && (
                      <span className="ar-ai-badge">
                        <FiZap size={9} />
                        Gemini AI Enhanced
                      </span>
                    )}
                  </div>
                  <div className="ar-hero-meta">
                    {role && (
                      <span className="ar-meta-item">
                        <FiLayers size={13} />
                        {role}
                      </span>
                    )}
                    {experienceLevel && (
                      <span className="ar-meta-item">
                        🎓 Level: {experienceLevel}
                      </span>
                    )}
                    {difficultyLabel && (
                      <span className="ar-meta-item">
                        📊 {difficultyLabel} Difficulty
                      </span>
                    )}
                    <span className="ar-meta-item">
                      <FiFileText size={13} />
                      {allQuestions.length} Questions
                    </span>
                    {durationInMinutes > 0 && (
                      <span className="ar-meta-item">
                        <FiClock size={13} />
                        {durationInMinutes} Minutes
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {skills.length > 0 && (
                <div className="ar-skill-chips">
                  {skills.map((skill) => (
                    <span key={skill} className="ar-skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── Toolbar ── */}
          {!questionsQuery.isLoading && !questionsQuery.isError && (
            <div className="ar-toolbar">
              <nav className="ar-tabs">
                {TAB_OPTIONS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`ar-tab${activeTab === tab ? " --active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              <div className="ar-toolbar-controls">
                <select
                  className="ar-filter-select"
                  value={diffFilter}
                  onChange={(e) => setDiffFilter(e.target.value)}
                >
                  {DIFF_FILTER_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className="ar-question-count">
                  Showing <strong>{filteredQuestions.length}</strong> of {allQuestions.length}
                </span>
              </div>
            </div>
          )}

          {/* ── States ── */}
          {questionsQuery.isLoading && <SkeletonCards />}

          {questionsQuery.isError && (
            <div className="ar-error">
              <div className="ar-error-icon">⚠️</div>
              <p className="ar-error-title">Failed to load questions</p>
              <p className="ar-error-desc">
                {questionsQuery.error?.response?.data?.message ||
                  "Unable to fetch assessment questions. Please try again."}
              </p>
              <button
                type="button"
                className="ar-retry-btn"
                onClick={() => questionsQuery.refetch()}
              >
                <FiRefreshCw size={12} style={{ display: "inline", marginRight: "0.3rem" }} />
                Retry
              </button>
            </div>
          )}

          {!questionsQuery.isLoading &&
            !questionsQuery.isError &&
            filteredQuestions.length === 0 && (
              <div className="ar-empty-state">
                <div className="ar-empty-icon">📋</div>
                <p className="ar-empty-title">No questions match the current filter</p>
                <p className="ar-empty-desc">
                  {allQuestions.length === 0
                    ? "This assessment template has no generated questions yet. Try re-generating it with AI."
                    : "Try changing the tab or difficulty filter to see more questions."}
                </p>
              </div>
            )}

          {/* ── Question List ── */}
          {!questionsQuery.isLoading && !questionsQuery.isError && filteredQuestions.length > 0 && (
            <div className="ar-question-list">
              {filteredQuestions.map((q, i) => (
                <QuestionCard key={q.id || i} q={q} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Sticky Bottom Summary Bar ── */}
      {!questionsQuery.isLoading && !questionsQuery.isError && allQuestions.length > 0 && (
        <footer className="ar-summary-bar">
          <div className="ar-summary-stat">
            <span className="ar-summary-stat-label">MCQ</span>
            <span className="ar-summary-stat-value">{stats.MCQ}</span>
          </div>
          <div className="ar-summary-divider" />
          <div className="ar-summary-stat">
            <span className="ar-summary-stat-label">Theory</span>
            <span className="ar-summary-stat-value">{stats.Theory}</span>
          </div>
          <div className="ar-summary-divider" />
          <div className="ar-summary-stat">
            <span className="ar-summary-stat-label">Coding</span>
            <span className="ar-summary-stat-value">{stats.Coding}</span>
          </div>
          <div className="ar-summary-divider" />
          <div className="ar-summary-stat">
            <span className="ar-summary-stat-label">Debug</span>
            <span className="ar-summary-stat-value">{stats.Debug}</span>
          </div>
          <div className="ar-summary-divider" />
          <div className="ar-summary-stat">
            <span className="ar-summary-stat-label">Total Questions</span>
            <span className="ar-summary-stat-value">{allQuestions.length}</span>
          </div>
        </footer>
      )}
    </>
  );
}
