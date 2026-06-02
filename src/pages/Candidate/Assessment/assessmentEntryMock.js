function parseStartAtOrFallback(startAtOverride) {
  if (startAtOverride) {
    const parsedTime = new Date(startAtOverride).getTime();
    if (!Number.isNaN(parsedTime)) {
      return new Date(parsedTime).toISOString();
    }
  }

  // Default to "already live" so the first-screen demo is immediately interactive.
  return new Date(Date.now() - 2 * 60 * 1000).toISOString();
}

export function buildMockAssessmentInvite(inviteToken, startAtOverride) {
  const startsAt = parseStartAtOrFallback(startAtOverride);

  return {
    inviteToken: inviteToken || "sample-assessment-token",
    assessmentTitle: "Backend Developer Assessment",
    assessmentSubtitle: "Lead Backend Engineering Roles at Global Tech Systems",
    candidateName: "Alex Thompson",
    candidateRoleLabel: "Candidate",
    breadcrumbTrail: ["Recruitment Assessment", "Engineering"],
    startsAt,
    durationMinutes: 60,
    totalQuestions: 15,
    difficultyLabel: "Medium",
    focusAreasLabel: "API & DB",
    instructions: [
      {
        id: "timer",
        icon: "clock",
        title: "Automatic Timer Activation",
        description:
          "The 60-minute countdown begins immediately after clicking Start Assessment. Ensure you are ready.",
      },
      {
        id: "autosave",
        icon: "upload",
        title: "Auto-Submit Protocol",
        description:
          "Your progress is saved in real-time. The assessment auto-submits when the timer hits zero.",
      },
      {
        id: "connectivity",
        icon: "wifi",
        title: "Stable Connectivity Required",
        description:
          "A consistent internet connection is required. Reconnection windows are limited to 3 minutes.",
      },
      {
        id: "monitoring",
        icon: "eye",
        title: "Environment Monitoring",
        description:
          "Proctoring is active. Tab switching or secondary monitors are logged and may lead to disqualification.",
      },
    ],
    systemChecks: [
      { id: "browser", icon: "monitor", label: "Browser", status: "pass" },
      { id: "internet", icon: "wifi", label: "Internet", status: "pass" },
      { id: "device", icon: "cpu", label: "Device", status: "pass" },
    ],
    sections: [
      {
        id: "section-1",
        label: "Section 1",
        questionCount: 5,
        title: "Multiple Choice",
        description: "Foundational concepts in Node.js, SQL, and architecture.",
      },
      {
        id: "section-2",
        label: "Section 2",
        questionCount: 5,
        title: "Theory & Design",
        description: "System design patterns, microservices, and database scaling.",
      },
      {
        id: "section-3",
        label: "Section 3",
        questionCount: 5,
        title: "Pseudo Code",
        description: "Algorithm optimization and logic-debugging scenarios.",
      },
    ],
    evaluatorNote:
      "This assessment is designed to test depth of knowledge. Speed is important, but accuracy and edge-case handling carry higher weight.",
  };
}
