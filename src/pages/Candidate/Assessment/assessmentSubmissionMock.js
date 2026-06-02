import { buildMockAssessmentInvite } from "./assessmentEntryMock";

function getDefaultSubmissionId() {
  return `EH-${Math.floor(10000 + Math.random() * 90000)}`;
}

function clampAttempted(attempted, totalQuestions) {
  if (typeof attempted !== "number") return Math.max(1, totalQuestions - 2);
  return Math.max(0, Math.min(totalQuestions, attempted));
}

export function buildMockAssessmentSubmission(
  inviteToken,
  startAtOverride,
  submissionSummary = {}
) {
  const invite = buildMockAssessmentInvite(inviteToken, startAtOverride);
  const totalQuestions = Number(submissionSummary.totalQuestions) || invite.totalQuestions || 15;
  const attemptedQuestions = clampAttempted(
    Number(submissionSummary.attemptedQuestions),
    totalQuestions
  );

  return {
    inviteToken: invite.inviteToken,
    candidateName: submissionSummary.candidateName || invite.candidateName || "Candidate",
    assessmentTitle: submissionSummary.assessmentTitle || invite.assessmentTitle,
    companyName: submissionSummary.companyName || "engineerHUB",
    submittedAtIso: submissionSummary.submittedAtIso || new Date().toISOString(),
    attemptedQuestions,
    totalQuestions,
    durationUsedMinutes:
      Number(submissionSummary.durationUsedMinutes) > 0
        ? Number(submissionSummary.durationUsedMinutes)
        : 52,
    status: "Successfully Submitted",
    submissionId: submissionSummary.submissionId || getDefaultSubmissionId(),
    evaluationStatus:
      submissionSummary.evaluationStatus || "AI Evaluation in Progress",
    evaluationDescription:
      submissionSummary.evaluationDescription ||
      "Your responses are being evaluated using AI-assisted analysis. Recruiters may contact shortlisted candidates for the next round.",
    timelineSteps: [
      { id: "submitted", label: "Submitted", state: "completed" },
      { id: "ai-review", label: "AI Review", state: "active" },
      { id: "recruiter-review", label: "Recruiter Review", state: "upcoming" },
      { id: "interview", label: "Interview", state: "upcoming" },
    ],
  };
}
