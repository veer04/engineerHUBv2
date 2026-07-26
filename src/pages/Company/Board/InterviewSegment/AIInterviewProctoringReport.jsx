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
  FiCamera,
  FiCameraOff,
  FiUserX,
  FiUsers,
} from "react-icons/fi";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/User/UserDetails";
import "./AIInterviewProctoringReport.css";

/* ─── Constants ────────────────────────────────────────────────────────── */

const EVENT_RISK_POINTS = {
  TAB_SWITCH: 2,
  WINDOW_BLUR: 1,
  FULLSCREEN_EXIT: 3,
  COPY_ATTEMPT: 4,
  PASTE_ATTEMPT: 4,
  RIGHT_CLICK_ATTEMPT: 2,
  NO_FACE_DETECTED: 5,
  MULTIPLE_FACES_DETECTED: 10,
  CAMERA_DISABLED: 15,
  CAMERA_STREAM_LOST: 15,
  CAMERA_PERMISSION_DENIED: 20,
};

const STAT_CARDS = [
  {
    key: "TAB_SWITCH",
    label: "Tab Switches",
    icon: FiEyeOff,
    color: "--amber",
    description: "Candidate left the AI interview tab",
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
    description: "Exited fullscreen interview mode",
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
  {
    key: "CAMERA_DISABLED",
    label: "Camera Disabled",
    icon: FiCameraOff,
    color: "--red",
    description: "Camera disabled during interview",
  },
  {
    key: "NO_FACE_DETECTED",
    label: "No Face Detected",
    icon: FiUserX,
    color: "--amber",
    description: "Face disappeared from webcam",
  },
  {
    key: "MULTIPLE_FACES_DETECTED",
    label: "Multiple Faces",
    icon: FiUsers,
    color: "--red",
    description: "Multiple faces in webcam frame",
  },
  {
    key: "CAMERA_STREAM_LOST",
    label: "Camera Stream Lost",
    icon: FiCameraOff,
    color: "--red",
    description: "Webcam stream disconnected",
  },
  {
    key: "CAMERA_PERMISSION_DENIED",
    label: "Permission Denied",
    icon: FiCameraOff,
    color: "--red",
    description: "Permission was denied",
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
  INTERVIEW_START: "▶",
  INTERVIEW_END: "■",
  NO_FACE_DETECTED: "👤🗙",
  MULTIPLE_FACES_DETECTED: "👤👤",
  CAMERA_DISABLED: "📷🗙",
  CAMERA_STREAM_LOST: "🔌",
  CAMERA_PERMISSION_DENIED: "🚫",
  WEBCAM_CHECK: "📸",
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
  INTERVIEW_START: "--ev-success",
  INTERVIEW_END: "--ev-success",
  NO_FACE_DETECTED: "--ev-warn",
  MULTIPLE_FACES_DETECTED: "--ev-danger",
  CAMERA_DISABLED: "--ev-danger",
  CAMERA_STREAM_LOST: "--ev-danger",
  CAMERA_PERMISSION_DENIED: "--ev-danger",
  WEBCAM_CHECK: "--ev-info",
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
  INTERVIEW_START: "AI Interview Started",
  INTERVIEW_END: "AI Interview Completed",
  NO_FACE_DETECTED: "No Face Detected",
  MULTIPLE_FACES_DETECTED: "Multiple Faces Detected",
  CAMERA_DISABLED: "Camera Disabled",
  CAMERA_STREAM_LOST: "Camera Stream Lost",
  CAMERA_PERMISSION_DENIED: "Camera Permission Denied",
  WEBCAM_CHECK: "Periodic Webcam Check",
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
        {event.metadata?.snapshot && (
          <div style={{ marginTop: "0.5rem", maxWidth: "160px", borderRadius: "6px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <img src={event.metadata.snapshot} alt="Webcam Snapshot" style={{ width: "100%", display: "block" }} />
          </div>
        )}
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

export default function AIInterviewProctoringReport() {
  const navigate = useNavigate();
  const { hiringId, inviteId } = useParams();
  const [searchParams] = useSearchParams();
  // Return to scheduled lobby tab by default
  const returnPath =
    searchParams.get("returnPath") ||
    `/company/jobs/board/${hiringId}/interview`;

  const config = useMemo(
    () => ({ headers: { accesstoken: getAccessToken() } }),
    []
  );

  const reportQuery = useQuery({
    queryKey: ["ai-interview-proctor-report", inviteId, hiringId],
    enabled: Boolean(inviteId && hiringId),
    retry: 1,
    queryFn: async () => {
      // 1. Try AI Interview proctoring API
      try {
        const aiRes = await axios.get(
          `${API_URL}api/v1/ai-interview/proctoring/${inviteId}`
        );
        if (aiRes?.data?.success && aiRes?.data?.data) {
          const session = aiRes.data.data.session;
          const events = aiRes.data.data.events || [];
          const eventCounts = {};
          events.forEach((ev) => {
            eventCounts[ev.eventType] = (eventCounts[ev.eventType] || 0) + 1;
          });
          const summary = session.proctoringSummary || {};
          const integrityScore = summary.integrityScore ?? 100;
          const riskScore = Math.max(0, 100 - integrityScore);
          const riskBand = riskScore >= 25 ? "High" : riskScore >= 10 ? "Medium" : "Low";

          return {
            candidateName: session.candidateName,
            candidateEmail: session.candidateEmail,
            scheduledAt: session.startTime || new Date().toISOString(),
            riskBand,
            riskScore,
            eventCounts: {
              TAB_SWITCH: summary.tabSwitches || eventCounts.TAB_SWITCH || 0,
              FULLSCREEN_EXIT: summary.fullscreenExits || eventCounts.FULLSCREEN_EXIT || 0,
              ...eventCounts,
            },
            timeline: events,
          };
        }
      } catch (err) {
        console.warn("AI Interview proctoring API notice:", err.message);
      }

      if (inviteId && inviteId.startsWith("mock_")) {
        return {
          candidateName: "Duncan Tall",
          candidateEmail: "serverehub@gmail.com",
          scheduledAt: new Date().toISOString(),
          riskBand: "Medium",
          riskScore: 8,
          eventCounts: {
            TAB_SWITCH: 2,
            WINDOW_BLUR: 4,
            FULLSCREEN_EXIT: 0,
            COPY_ATTEMPT: 0,
            PASTE_ATTEMPT: 0,
            RIGHT_CLICK_ATTEMPT: 0,
            CAMERA_DISABLED: 0,
            NO_FACE_DETECTED: 0,
            MULTIPLE_FACES_DETECTED: 0,
            CAMERA_STREAM_LOST: 0,
            CAMERA_PERMISSION_DENIED: 0,
          },
          timeline: [
            {
              eventType: "INTERVIEW_START",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            },
            {
              eventType: "WINDOW_BLUR",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
            },
            {
              eventType: "WINDOW_FOCUS",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 7.8).toISOString(),
            },
            {
              eventType: "TAB_SWITCH",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            },
            {
              eventType: "TAB_RETURN",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 4.8).toISOString(),
            },
            {
              eventType: "WEBCAM_CHECK",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
              metadata: {
                snapshot: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              }
            },
            {
              eventType: "INTERVIEW_END",
              clientTimestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
            }
          ]
        };
      }

      const res = await axios.get(
        `${API_URL}api/v1/assessment-proctor/${inviteId}/report`,
        { ...config, params: { hiringId } }
      );
      return res.data?.data;
    },
  });

  const report = reportQuery.data;

  const snapshots = useMemo(() => {
    if (!report?.timeline) return [];
    return report.timeline
      .filter((ev) => ev.metadata?.snapshot)
      .map((ev) => ({
        snapshot: ev.metadata.snapshot,
        timestamp: ev.clientTimestamp || ev.createdAt,
        type: ev.eventType,
      }))
      .reverse(); // latest snapshots first
  }, [report?.timeline]);

  const reversedTimeline = useMemo(() => {
    if (!report?.timeline) return [];
    return report.timeline
      .map((event, idx) => ({ event, originalIndex: idx }))
      .reverse();
  }, [report?.timeline]);

  return (
    <div className="pr-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>AI Interview Proctoring Report — engineerHUB</title>
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="pr-header">
        <button
          type="button"
          className="pr-back-btn"
          onClick={() => navigate(returnPath)}
        >
          <FiArrowLeft />
          Back to Scheduled Lobby
        </button>

        <div className="pr-header-center">
          <FiShield className="pr-header-shield" />
          <div>
            <h1 className="pr-header-title">AI Interview Proctoring Report</h1>
            <p className="pr-header-sub">Level 2 Anti-Cheat Interview Monitor</p>
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
                "Failed to load AI Interview proctoring report."}
            </p>
          </div>
        )}

        {report && (
          <>
            {/* ── Risk Score ──────────────────────────────────────────── */}
            <section className="pr-section pr-section--risk">
              <h2 className="pr-section-title">Risk Assessment</h2>
              <div className="pr-risk-row" style={{ display: "flex", gap: "3rem", alignItems: "stretch", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "220px" }}>
                  <RiskBadge band={report.riskBand} score={report.riskScore} />
                  <div className="pr-risk-legend-left" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", paddingLeft: "0.5rem" }}>
                    <div className="pr-risk-legend-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#4b5563" }}>
                      <span className="pr-risk-legend-dot --low" />
                      <span>Low: 0–9 pts</span>
                    </div>
                    <div className="pr-risk-legend-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#4b5563" }}>
                      <span className="pr-risk-legend-dot --medium" />
                      <span>Medium: 10–24 pts</span>
                    </div>
                    <div className="pr-risk-legend-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#4b5563" }}>
                      <span className="pr-risk-legend-dot --high" />
                      <span>High: 25+ pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="pr-risk-legend-right" style={{ flex: "1 1 450px", display: "flex", flexDirection: "column", paddingLeft: "3rem", borderLeft: "1px dashed rgba(139, 92, 246, 0.25)", justifyContent: "center" }}>
                  <p className="pr-risk-legend-scoring-title" style={{ margin: "0 0 0.75rem 0", fontWeight: "700", color: "#1f2937", fontSize: "0.9rem" }}>Points per violation:</p>
                  <ul className="pr-risk-legend-scoring-list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 3rem", listStyle: "none", padding: 0, margin: 0, color: "#4b5563", fontSize: "0.85rem" }}>
                    <li>Tab Switch: 2 pts</li>
                    <li>Window Blur: 1 pt</li>
                    <li>Fullscreen Exit: 3 pts</li>
                    <li>Copy / Paste: 4 pts each</li>
                    <li>Right Click: 2 pts</li>
                    <li>No Face Detected: 5 pts</li>
                    <li>Multiple Faces: 10 pts</li>
                    <li>Camera Disabled: 15 pts</li>
                    <li>Camera Stream Lost: 15 pts</li>
                    <li>Camera Permission Denied: 20 pts</li>
                  </ul>
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

            {/* ── Live Snapshots Segment ───────────────────────────────── */}
            <section className="pr-section pr-section--snapshots">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="pr-section-title" style={{ margin: 0 }}>
                  Integrity Webcam Snapshots
                  <span className="pr-timeline-count">
                    {snapshots.length} snapshot{snapshots.length !== 1 ? "s" : ""}
                  </span>
                </h2>
                {snapshots.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      className="pr-back-btn"
                      onClick={() => {
                        const el = document.getElementById("pr-snapshots-scroll-container");
                        if (el) el.scrollLeft -= 220;
                      }}
                      style={{ padding: "0.25rem 0.5rem", minWidth: "32px", height: "32px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="pr-back-btn"
                      onClick={() => {
                        const el = document.getElementById("pr-snapshots-scroll-container");
                        if (el) el.scrollLeft += 220;
                      }}
                      style={{ padding: "0.25rem 0.5rem", minWidth: "32px", height: "32px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {snapshots.length === 0 ? (
                <div className="pr-empty-snapshots" style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2.5rem 1rem",
                  background: "white",
                  border: "1.5px dashed #cbd5e1",
                  borderRadius: "12px",
                  color: "#64748b",
                  textAlign: "center"
                }}>
                  <FiCameraOff style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#94a3b8" }} />
                  <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "600", color: "#475569" }}>No webcam snapshots captured yet.</p>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                    Snapshots are captured automatically during webcam status checks and flag indicators (e.g. face missing, multiple faces).
                  </p>
                </div>
              ) : (
                <div className="pr-snapshots-slider-container" style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
                  <div className="pr-snapshots-scroll-wrapper" style={{ display: "flex", gap: "1.25rem", overflowX: "auto", scrollBehavior: "smooth", paddingBottom: "0.5rem" }} id="pr-snapshots-scroll-container">
                    {snapshots.map((item, idx) => (
                      <div key={idx} className="pr-snapshot-card" style={{ flex: "0 0 200px", background: "#f8fafc", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0", transition: "transform 0.15s ease" }}>
                        <div style={{ width: "100%", aspectRatio: "4/3", background: "#0f172a", position: "relative" }}>
                          <img src={item.snapshot} alt="Webcam frame" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <span style={{
                            position: "absolute",
                            bottom: "0.5rem",
                            left: "0.5rem",
                            background: "rgba(15, 23, 42, 0.75)",
                            backdropFilter: "blur(4px)",
                            color: "white",
                            fontSize: "0.7rem",
                            fontWeight: "600",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px"
                          }}>
                            {EVENT_LABEL_MAP[item.type] || item.type}
                          </span>
                        </div>
                        <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
                          {formatISTTimestamp(item.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  <p>No events recorded. The candidate completed this AI Interview cleanly.</p>
                </div>
              ) : (
                <div className="pr-timeline-wrap">
                  {reversedTimeline.map((item) => (
                    <TimelineEvent
                      key={`${item.event.eventType}-${item.event.clientTimestamp || item.event.createdAt}-${item.originalIndex}`}
                      event={item.event}
                      index={item.originalIndex}
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
