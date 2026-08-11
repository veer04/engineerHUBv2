import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "../../../components/SEO/SEO.jsx";
import { FiCheckCircle, FiHome } from "react-icons/fi";
import { fetchAIInterviewSessionApi } from "../../../services/aiInterviewApi";
import "./CandidateAIInterviewSubmitted.css";

export default function CandidateAIInterviewSubmitted() {
  const navigate = useNavigate();
  const { inviteToken } = useParams();

  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    if (inviteToken) {
      fetchAIInterviewSessionApi(inviteToken)
        .then((res) => {
          if (res?.success && res?.data) {
            setSessionInfo(res.data);
          }
        })
        .catch((err) => console.warn("Submitted page session fetch error:", err));
    }
  }, [inviteToken]);

  const candidateName = sessionInfo?.candidateName || "Candidate";
  const roleTitle = sessionInfo?.aiConfig?.roleTitle || "Technical Assessment";
  const roundNum = sessionInfo?.aiConfig?.interviewRound || 1;

  return (
    <SEO title="AI Interview Submitted - engineerHUB" noIndex={true}>
      <div className="ai-submitted-page">
        <header className="ai-submitted-header">
          <span className="ai-submitted-brand">engineerHUB AI Interview</span>
        </header>

        <main className="ai-submitted-main">
          <div className="ai-submitted-card">
            <div className="ai-submitted-icon-ring">
              <FiCheckCircle />
            </div>

            <h1>Interview Submitted Successfully!</h1>
            <p>
              Thank you for completing your AI interview session. Your responses and behavioral integrity metrics have been uploaded and shared with the hiring company.
            </p>

            <div className="ai-submitted-info-box">
              <div className="ai-submitted-info-row">
                <span>Candidate:</span>
                <span>{candidateName}</span>
              </div>
              <div className="ai-submitted-info-row">
                <span>Role / Round:</span>
                <span>{roleTitle} — Round {roundNum}</span>
              </div>
              <div className="ai-submitted-info-row">
                <span>Evaluation Mode:</span>
                <span>Autonomous AI Evaluator</span>
              </div>
              <div className="ai-submitted-info-row">
                <span>Status:</span>
                <span style={{ color: "#10b981" }}>Completed &amp; Submitted</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-ai-submitted-home"
              onClick={() => navigate("/")}
            >
              <FiHome /> Return to Homepage
            </button>
          </div>
        </main>
      </div>
    </SEO>
  );
}
