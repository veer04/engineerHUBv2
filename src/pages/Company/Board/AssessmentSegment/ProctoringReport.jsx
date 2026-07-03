import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiClock,
  FiCopy,
  FiEyeOff,
  FiMaximize,
  FiMousePointer,
  FiShield,
  FiWifi,
} from "react-icons/fi";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/User/UserDetails";
import "./ProctoringReport.css";

/* ─── Constants ────────────────────────────────────────────────────────── */

const EVENT_RISK_POINTS = {
  TAB_SWITCH: 2,
  WINDOW_BLUR: 1,
  FULLSCREEN_EXIT: 3,
  COPY_ATTEMPT: 4,
  PASTE_ATTEMPT: 4,
  RIGHT_CLICK_ATTEMPT: 2,
};

const STAT_CARDS = [
  {
    key: "TAB_SWITCH",
    label: "Tab Switches",
    icon: FiEyeOff,
    color: "--amber",
    description: "Candidate left the assessment tab",
  },
  {
    key: "WINDOW_BLUR",
    label: "Window Blur",
    icon: FiWifi,
    color: "--blue",
    description: "Browser window lost focus",
  },
  {
    key: "FULLSCREEN_EXIT",
    label: "Fullscreen Exits",
    icon: FiMaximize,
    color: "--red",
    description: "Exited fullscreen mode",
  },
  {
    key: "COPY_ATTEMPT",
    label: "Copy Attempts",
    icon: FiCopy,
    color: "--purple",
    description: "Ctrl+C / Copy detected",
  },
  {
    key: "PASTE_ATTEMPT",
    label: "Paste Attempts",
    icon: FiCopy,
    color: "--purple",
    description: "Ctrl+V / Paste detected",
  },
  {
    key: "RIGHT_CLICK_ATTEMPT",
    label: "Right Clicks",
    icon: FiMousePointer,
    color: "--slate",
    description: "Right-click suppressed",
  },
];

const EVENT_ICON_MAP = {
  TAB_SWITCH: "⇥",
  TAB_RETURN: "↩",
  WINDOW_BLUR: "◉",
  WINDOW_FOCUS: "◎",
  FULLSCREEN_EXIT: "⛶",
  FULLSCREEN_ENTER: "⛶",
  COPY_ATTEMPT: "⎘",
  PASTE_ATTEMPT: "⎗",
  RIGHT_CLICK_ATTEMPT: "⊞",
  ASSESSMENT_START: "▶",
  ASSESSMENT_END: "■",
};

const EVENT_COLOR_MAP = {
  TAB_SWITCH: "--ev-warn",
  TAB_RETURN: "--ev-info",
  WINDOW_BLUR: "--ev-info",
  WINDOW_FOCUS: "--ev-info",
  FULLSCREEN_EXIT: "--ev-danger",
  FULLSCREEN_ENTER: "--ev-success",
  COPY_ATTEMPT: "--ev-danger",
  PASTE_ATTEMPT: "--ev-danger",
  RIGHT_CLICK_ATTEMPT: "--ev-warn",
  ASSESSMENT_START: "--ev-success",
  ASSESSMENT_END: "--ev-success",
};

const EVENT_LABEL_MAP = {
  TAB_SWITCH: "Tab Switch",
  TAB_RETURN: "Tab Return",
  WINDOW_BLUR: "Window Blur",
  WINDOW_FOCUS: "Window Focus",
  FULLSCREEN_EXIT: "Fullscreen Exit",
  FULLSCREEN_ENTER: "Fullscreen Enter",
  COPY_ATTEMPT: "Copy Attempt",
  PASTE_ATTEMPT: "Paste Attempt",
  RIGHT_CLICK_ATTEMPT: "Right Click",
  ASSESSMENT_START: "Assessment Started",
  ASSESSMENT_END: "Assessment Ended",
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function formatISTTimestamp(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatTimeOnly(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

function RiskBadge({ band, score }) {
  const cls =
    band === "High" ? "--high" : band === "Medium" ? "--medium" : "--low";
  const icon = band === "High" ? "🔴" : band === "Medium" ? "🟡" : "🟢";

  return (
    <div className={`pr-risk-badge ${cls}`}>
      <span className="pr-risk-icon">{icon}</span>
      <div>
        <div className="pr-risk-band">{band} Risk</div>
        <div className="pr-risk-score">Score: {score} pts</div>
      </div>
    </div>
  );
}

function StatCard({ cardDef, count }) {
  const Icon = cardDef.icon;
  const pts = EVENT_RISK_POINTS[cardDef.key] || 0;
  const total = count * pts;

  return (
    <div className={`pr-stat-card ${cardDef.color}`}>
      <div className="pr-stat-icon-ring">
        <Icon />
      </div>
      <div className="pr-stat-count">{count}</div>
      <div className="pr-stat-label">{cardDef.label}</div>
      <div className="pr-stat-pts">+{total} pts</div>
      <div className="pr-stat-desc">{cardDef.description}</div>
    </div>
  );
}

function TimelineEvent({ event, index }) {
  const colorCls = EVENT_COLOR_MAP[event.eventType] || "--ev-info";
  const label = EVENT_LABEL_MAP[event.eventType] || event.eventType;
  const icon = EVENT_ICON_MAP[event.eventType] || "•";

  return (
    <div className={`pr-timeline-event ${colorCls}`}>
      <div className="pr-timeline-num">{index + 1}</div>
      <div className={`pr-timeline-dot ${colorCls}`}>{icon}</div>
      <div className="pr-timeline-content">
        <div className="pr-timeline-label">{label}</div>
        <div className="pr-timeline-time">
          {formatTimeOnly(event.clientTimestamp || event.createdAt)}
          <span className="pr-timeline-full">
            {" "}
            — {formatISTTimestamp(event.clientTimestamp || event.createdAt)} IST
          </span>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="pr-skeleton-wrap">
      {[1, 2, 3].map((n) => (
        <div key={n} className="pr-skel-block" />
      ))}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */

export default function ProctoringReport() {
  const navigate = useNavigate();
  const { hiringId, inviteId } = useParams();
  const [searchParams] = useSearchParams();
  // Support coming from /career and /company board routes
  const returnPath =
    searchParams.get("returnPath") ||
    `/career/jobs/board/${hiringId}/assessment`;

  const config = useMemo(
    () => ({ headers: { accesstoken: getAccessToken() } }),
    []
  );

  const reportQuery = useQuery({
    queryKey: ["proctor-report", inviteId, hiringId],
    enabled: Boolean(inviteId && hiringId),
    retry: 1,
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}api/v1/assessment-proctor/${inviteId}/report`,
        { ...config, params: { hiringId } }
      );
      return res.data?.data;
    },
  });

  const report = reportQuery.data;

  return (
    <div className="pr-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Proctoring Report — engineerHUB</title>
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="pr-header">
        <button
          type="button"
          className="pr-back-btn"
          onClick={() => navigate(returnPath)}
        >
          <FiArrowLeft />
          Back to Results
        </button>

        <div className="pr-header-center">
          <FiShield className="pr-header-shield" />
          <div>
            <h1 className="pr-header-title">Proctoring Report</h1>
            <p className="pr-header-sub">Level 1 Anti-Cheat Monitoring</p>
          </div>
        </div>

        <div />
      </header>

      <div className="pr-body">
        {/* ── Candidate info strip ──────────────────────────────────────── */}
        {report && (
          <div className="pr-candidate-strip">
            <div>
              <p className="pr-candidate-name">{report.candidateName}</p>
              <p className="pr-candidate-email">{report.candidateEmail}</p>
            </div>
            {report.scheduledAt && (
              <div className="pr-candidate-time">
                <FiClock />
                <span>{formatISTTimestamp(report.scheduledAt)} IST</span>
              </div>
            )}
          </div>
        )}

        {reportQuery.isLoading && <Skeleton />}

        {reportQuery.isError && (
          <div className="pr-error">
            <FiAlertTriangle />
            <p>
              {reportQuery.error?.response?.data?.message ||
                "Failed to load proctoring report."}
            </p>
          </div>
        )}

        {report && (
          <>
            {/* ── Risk Score ──────────────────────────────────────────── */}
            <section className="pr-section pr-section--risk">
              <h2 className="pr-section-title">Risk Assessment</h2>
              <div className="pr-risk-row">
                <RiskBadge band={report.riskBand} score={report.riskScore} />
                <div className="pr-risk-legend">
                  <div className="pr-risk-legend-left">
                    <div className="pr-risk-legend-item">
                      <span className="pr-risk-legend-dot --low" />
                      <span>Low: 0–9 pts</span>
                    </div>
                    <div className="pr-risk-legend-item">
                      <span className="pr-risk-legend-dot --medium" />
                      <span>Medium: 10–24 pts</span>
                    </div>
                    <div className="pr-risk-legend-item">
                      <span className="pr-risk-legend-dot --high" />
                      <span>High: 25+ pts</span>
                    </div>
                  </div>
                  <div className="pr-risk-legend-right">
                    <p className="pr-risk-legend-scoring-title">Points per violation:</p>
                    <ul className="pr-risk-legend-scoring-list">
                      <li>Tab Switch: 2 pts</li>
                      <li>Window Blur: 1 pt</li>
                      <li>Fullscreen Exit: 3 pts</li>
                      <li>Copy / Paste: 4 pts each</li>
                      <li>Right Click: 2 pts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Stats Grid ──────────────────────────────────────────── */}
            <section className="pr-section pr-section--breakdown">
              <h2 className="pr-section-title">Event Breakdown</h2>
              <div className="pr-stats-grid">
                {STAT_CARDS.map((card) => (
                  <StatCard
                    key={card.key}
                    cardDef={card}
                    count={report.eventCounts[card.key] || 0}
                  />
                ))}
              </div>
            </section>

            {/* ── Timeline ────────────────────────────────────────────── */}
            <section className="pr-section pr-section--timeline">
              <h2 className="pr-section-title">
                Event Timeline
                <span className="pr-timeline-count">
                  {report.timeline.length} events
                </span>
              </h2>

              {report.timeline.length === 0 ? (
                <div className="pr-empty-timeline">
                  <FiShield />
                  <p>No events recorded. The candidate completed this assessment cleanly.</p>
                </div>
              ) : (
                <div className="pr-timeline-wrap">
                  {report.timeline.map((event, i) => (
                    <TimelineEvent
                      key={`${event.eventType}-${event.clientTimestamp}-${i}`}
                      event={event}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
