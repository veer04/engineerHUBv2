import { useEffect, useMemo, useState } from "react";
import "../JobBoard.css";
import "./AssessmentSegment.css";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import geminiIcon from "../../../../assets/gemini-icon.svg";
import geminiIconWhite from "../../../../assets/gemini-icon-white.svg";
import {
  getAccessToken,
  getUserFullName,
  getUserId,
  getUserImage,
  getUserRole,
} from "../../../../features/User/UserDetails";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckSquare,
  FiChevronDown,
  FiClock,
  FiCode,
  FiFileText,
  FiFilter,
  FiSend,
  FiSettings,
  FiTool,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import AssessmentCandidateRow from "./AssessmentCandidateRow";
import AssessmentResult from "./AssessmentResult";

const ROLE_OPTIONS = [
  "Fullstack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Data Engineer",
];

const EXPERIENCE_LEVELS = ["Junior", "Mid-Level", "Senior"];

const DIFFICULTY_LABELS = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

const QUESTION_TYPE_OPTIONS = [
  {
    value: "MCQ",
    label: "MCQ",
    icon: <FiCheckSquare />,
  },
  {
    value: "Coding",
    label: "Coding",
    icon: <FiCode />,
  },
  {
    value: "Theory",
    label: "Theory",
    icon: <FiFileText />,
  },
  {
    value: "Debug",
    label: "Debug",
    icon: <FiTool />,
  },
];

const DISABLED_QUESTION_TYPES = new Set(["Coding", "Debug"]);

const AVAILABLE_SKILLS = [
  "Java",
  "Python",
  "React",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
];

const CANDIDATE_PAGE_SIZE = 5;

function mapApplicantToAssessmentCandidate(applicant, index) {
  const displayName =
    `${applicant?.firstName || ""} ${applicant?.lastName || ""}`.trim() ||
    applicant?.name ||
    "Candidate";

  return {
    id: applicant?._id || `candidate-${index}`,
    registrationId: applicant?._id || null,
    name: displayName,
    email: applicant?.email || applicant?.userId?.email || "Not available",
    college: applicant?.college || "Not available",
    skills: String(applicant?.skills || "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
    aiMatch:
      typeof applicant?.aiScore === "number"
        ? Math.max(0, Math.min(100, Math.round(applicant.aiScore)))
        : 0,
    resumeUrl: applicant?.resumeUrl || "",
  };
}

function mapTemplateToGeneratedAssessment(template, index = 0) {
  return {
    id: template?.id || template?._id || `template-${index}`,
    name: template?.name || `Assessment ${index + 1}`,
    difficulty: template?.difficulty || template?.difficultyLabel || "Medium",
    questionCount: Number(template?.questionCount || template?.numberOfQuestions || 0),
    durationInMinutes: Number(template?.durationInMinutes || 0),
  };
}

function formatPreviewDateTime(dateStr) {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return "the scheduled day and time";
  return parsed.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ScheduleAssessment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    assessmentSegment: "ScheduleAssessment",
  });

  const assessmentSegment =
    searchParams.get("assessmentSegment") || "ScheduleAssessment";
  const isResultSegment = assessmentSegment === "Result";

  const [assessmentName, setAssessmentName] = useState("Backend Assessment V5");
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [assessmentTime, setAssessmentTime] = useState(30);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[0]);
  const [difficulty, setDifficulty] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState(["Java", "Python"]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState(["MCQ"]);
  const [advancedSettings, setAdvancedSettings] = useState({
    webcamProctoring: true,
    antiCheat: true,
  });
  const [generatedAssessments, setGeneratedAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [candidatePage, setCandidatePage] = useState(1);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [launchDate, setLaunchDate] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [activeProctoring, setActiveProctoring] = useState(true);
  const [isGeneratingAssessment, setIsGeneratingAssessment] = useState(false);
  const [isSchedulingAssessment, setIsSchedulingAssessment] = useState(false);
  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };

  const computeMyProfilePath = () => {
    const roleRaw = getUserRole() || "";
    const role = roleRaw.toLowerCase();
    const uid = getUserId();
    if (!uid) return "/profile/user";
    if (role.includes("org") || role.includes("company") || role.includes("employer")) {
      return `/profile/organization/${uid}`;
    }
    if (role.includes("club")) {
      return `/profile/club/${uid}`;
    }
    return `/profile/user/${uid}`;
  };

  const jobData = useQuery({
    queryKey: ["Job", "assessment", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/hiringDashboard/hiringDetails/${id}`,
        config
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });

  const jobDetails = jobData?.data?.data?.data;

  const [activeMailCandidate, setActiveMailCandidate] = useState(null);
  const [activeMoveCandidate, setActiveMoveCandidate] = useState(null);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailCc, setEmailCc] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmailStatus, setIsSendingEmailStatus] = useState(false);

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  useEffect(() => {
    if (activeMailCandidate) {
      const candidateName = activeMailCandidate.name || `${activeMailCandidate.firstName || ""} ${activeMailCandidate.lastName || ""}`.trim() || "Candidate";
      const roleName = selectedRole || "the position";
      const dateStr = launchDate && launchTime ? formatPreviewDateTime(`${launchDate}T${launchTime}`) : "the scheduled day and time";
      
      setEmailSubject(`Assessment Schedule Update - ${jobDetails?.opportunityName || roleName}`);
      setEmailCc("");
      setEmailMessage(`Dear ${candidateName},\n\nYour assessment for ${roleName} is supposed to happen on ${dateStr}. Stay ready. Soon you will receive the assessment details.\n\nBest regards,\nHiring Team`);
    }
  }, [activeMailCandidate, selectedRole, launchDate, launchTime, jobDetails]);

  const handleSendCrmEmailForCandidate = async () => {
    if (!activeMailCandidate) return;
    try {
      setIsSendingEmailStatus(true);
      const candidateId = activeMailCandidate.registrationId || activeMailCandidate.id;
      await axios.post(
        `${API_URL}api/v1/hiringDashboard/sendCrmEmail`,
        {
          hiringId: id,
          subject: emailSubject,
          text: emailMessage,
          registration_ids: [candidateId],
          senderEmail: emailCc,
        },
        config
      );
      
      setSnackbarMessage(`Email sent successfully to ${activeMailCandidate.name || "candidate"}!`);
      setSnackbarSeverity("success");
      setSnackbarDuration(2500);
      setSnackbarOpen(true);
      setActiveMailCandidate(null);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to send email."
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    } finally {
      setIsSendingEmailStatus(false);
    }
  };

  // Set initial role & skills from Job/Hiring Details
  useEffect(() => {
    if (jobDetails?.opportunityName) {
      setSelectedRole(jobDetails.opportunityName);
    }
    if (Array.isArray(jobDetails?.skillsRequired) && jobDetails.skillsRequired.length > 0) {
      setSelectedSkills(jobDetails.skillsRequired);
    }
  }, [jobDetails?.opportunityName, jobDetails?.skillsRequired]);

  const assessmentCandidatesQuery = useQuery({
    queryKey: ["assessment-candidates", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/assessment-lobby/candidates?hiringId=${id}&page=1&limit=200`,
        config
      );
      return response?.data?.data || {};
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60,
  });

  const assessmentTemplatesQuery = useQuery({
    queryKey: ["assessment-templates", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/assessment-lobby/templates?hiringId=${id}`,
        config
      );
      return response?.data?.data || {};
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60,
  });

  const assessmentResultStatsQuery = useQuery({
    queryKey: ["assessment-result-stats", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/assessment-results/stats?hiringId=${id}`,
        config
      );
      return response?.data?.data || {};
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 45,
  });

  useEffect(() => {
    if (!searchParams.get("assessmentSegment")) {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("assessmentSegment", "ScheduleAssessment");
      setSearchParams(updatedSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const templateRows = Array.isArray(assessmentTemplatesQuery.data?.templates)
      ? assessmentTemplatesQuery.data.templates
      : [];

    setGeneratedAssessments(templateRows.map(mapTemplateToGeneratedAssessment));
  }, [assessmentTemplatesQuery.data?.templates]);

  useEffect(() => {
    if (!generatedAssessments.some((item) => item.id === selectedAssessmentId)) {
      setSelectedAssessmentId(generatedAssessments[0]?.id || "");
    }
  }, [generatedAssessments, selectedAssessmentId]);

  const candidates = useMemo(() => {
    const candidateRows = Array.isArray(assessmentCandidatesQuery.data?.candidates)
      ? assessmentCandidatesQuery.data.candidates
      : [];

    return candidateRows.map(mapApplicantToAssessmentCandidate);
  }, [assessmentCandidatesQuery.data]);

  useEffect(() => {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      setSelectedCandidateIds([]);
      return;
    }

    setSelectedCandidateIds((prevSelected) => {
      return prevSelected.filter((selectedId) =>
        candidates.some((candidate) => candidate.id === selectedId)
      );
    });
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    if (!searchTerm.trim()) return candidates;
    const query = searchTerm.toLowerCase();
    return candidates.filter((candidate) => {
      const searchable = [
        candidate.name,
        candidate.email,
        candidate.college,
        ...(candidate.skills || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [candidates, searchTerm]);

  const totalCandidatePages = Math.max(
    1,
    Math.ceil(filteredCandidates.length / CANDIDATE_PAGE_SIZE)
  );

  const paginatedCandidates = useMemo(() => {
    const startIndex = (candidatePage - 1) * CANDIDATE_PAGE_SIZE;
    return filteredCandidates.slice(startIndex, startIndex + CANDIDATE_PAGE_SIZE);
  }, [filteredCandidates, candidatePage]);

  const selectedAssessment = useMemo(
    () =>
      generatedAssessments.find((assessment) => assessment.id === selectedAssessmentId) ||
      generatedAssessments[0] ||
      null,
    [generatedAssessments, selectedAssessmentId]
  );

  const selectedCandidates = useMemo(
    () =>
      candidates.filter((candidate) => selectedCandidateIds.includes(candidate.id)),
    [candidates, selectedCandidateIds]
  );

  useEffect(() => {
    setCandidatePage(1);
  }, [searchTerm, candidates.length]);

  useEffect(() => {
    setCandidatePage((currentPage) => Math.min(currentPage, totalCandidatePages));
  }, [totalCandidatePages]);

  const handleAssessmentSegmentChange = (segment) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("assessmentSegment", segment);
    setSearchParams(updatedSearchParams, { replace: true });
  };

  const handleAddSkill = () => {
    const nextSkill = AVAILABLE_SKILLS.find((skill) => !selectedSkills.includes(skill));

    if (!nextSkill) {
      setSnackbarMessage("All available skills are already selected.");
      setSnackbarSeverity("info");
      setSnackbarDuration(2500);
      setSnackbarOpen(true);
      return;
    }

    setSelectedSkills((prev) => [...prev, nextSkill]);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !selectedSkills.includes(newSkill)) {
        setSelectedSkills((prev) => [...prev, newSkill]);
      }
      setSkillInput("");
    }
  };

  const handleAddSkillFromSuggestion = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  const suggestedSkills = useMemo(() => {
    // 1. Start with skillsRequired from JD if available
    let list = Array.isArray(jobDetails?.skillsRequired) ? [...jobDetails.skillsRequired] : [];

    // 2. Add some fallback role-based skills if JD doesn't have many
    const roleLower = String(selectedRole || "").toLowerCase();
    if (roleLower.includes("backend")) {
      list.push("Node.js", "Express", "MongoDB", "PostgreSQL", "Java", "Python", "Docker", "Redis");
    } else if (roleLower.includes("frontend")) {
      list.push("React", "TypeScript", "HTML5", "CSS3", "JavaScript", "Redux", "Tailwind");
    } else if (roleLower.includes("fullstack") || roleLower.includes("full stack")) {
      list.push("React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "JavaScript", "Express");
    } else if (roleLower.includes("data")) {
      list.push("Python", "SQL", "Spark", "Hadoop", "Pandas", "ETL", "AWS");
    } else {
      // General fallbacks
      list.push("Java", "Python", "React", "Node.js", "TypeScript", "SQL", "Git");
    }

    // 3. Clean up casing, deduplicate, and exclude currently selected skills
    const cleaned = list
      .map(s => String(s || "").trim())
      .filter(Boolean);
    const unique = [...new Set(cleaned)];
    
    // Filter out skills that are already selected
    return unique.filter(
      (skill) => !selectedSkills.some((sel) => sel.toLowerCase() === skill.toLowerCase())
    );
  }, [jobDetails?.skillsRequired, selectedRole, selectedSkills]);

  const handleQuestionTypeToggle = (questionType) => {
    setSelectedQuestionTypes((prev) => {
      if (prev.includes(questionType)) {
        return prev.filter((type) => type !== questionType);
      }
      return [...prev, questionType];
    });
  };

  const handleGenerateAssessment = async () => {
    const nextName = assessmentName.trim() || `${selectedRole} Assessment`;

    try {
      setIsGeneratingAssessment(true);
      const response = await axios.post(
        `${API_URL}api/v1/assessment-lobby/templates/generate`,
        {
          hiringId: id,
          assessmentName: nextName,
          role: selectedRole,
          experienceLevel,
          difficulty,
          numberOfQuestions: Number(numberOfQuestions),
          assessmentTime: Number(assessmentTime),
          selectedSkills,
          selectedQuestionTypes,
          advancedSettings,
        },
        config
      );

      const createdTemplate = response?.data?.data?.template;

      if (createdTemplate) {
        const mappedTemplate = mapTemplateToGeneratedAssessment(createdTemplate);
        setGeneratedAssessments((prev) => [mappedTemplate, ...prev]);
        setSelectedAssessmentId(mappedTemplate.id);
      }

      queryClient.invalidateQueries({ queryKey: ["assessment-templates", id] });

      setSnackbarMessage(response?.data?.message || "Assessment generated successfully.");
      setSnackbarSeverity("success");
      setSnackbarDuration(2500);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to generate assessment."
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(2800);
      setSnackbarOpen(true);
    } finally {
      setIsGeneratingAssessment(false);
    }
  };

  const handleCreateMoreAssessment = () => {
    setAssessmentName("");
    setSelectedRole(ROLE_OPTIONS[0]);
    setNumberOfQuestions(10);
    setAssessmentTime(30);
    setExperienceLevel(EXPERIENCE_LEVELS[0]);
    setDifficulty(2);
    setSelectedSkills(["Java", "Python"]);
    setSelectedQuestionTypes(["MCQ"]);
  };

  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidateIds((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((idItem) => idItem !== candidateId);
      }
      return [...prev, candidateId];
    });
  };

  const handleSendAssessmentToCandidate = (candidate) => {
    if (!selectedCandidateIds.includes(candidate.id)) {
      setSelectedCandidateIds((prev) => [...prev, candidate.id]);
    }

    const scheduleSection = document.getElementById("assessment-schedule-section");
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setSnackbarMessage(`Assessment queued for ${candidate.name}.`);
    setSnackbarSeverity("success");
    setSnackbarDuration(2200);
    setSnackbarOpen(true);
  };

  const handleSendCandidateEmail = async (candidate) => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/assessment-lobby/invites/resend`,
        {
          hiringId: id,
          candidateRegistrationId: candidate?.registrationId || candidate?.id,
        },
        config
      );

      setSnackbarMessage(response?.data?.message || `Invite resent to ${candidate.name}.`);
      setSnackbarSeverity("success");
      setSnackbarDuration(2200);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message ||
          `Unable to send assessment invite email to ${candidate.name}.`
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(2500);
      setSnackbarOpen(true);
    }
  };

  const handleMoveCandidateToResponse = async (candidate) => {
    try {
      const response = await axios.patch(
        `${API_URL}api/v1/assessment-lobby/move-to-response`,
        {
          hiringId: id,
          candidateRegistrationIds: [candidate?.registrationId || candidate?.id],
        },
        config
      );

      setSelectedCandidateIds((prev) => prev.filter((idItem) => idItem !== candidate.id));
      queryClient.invalidateQueries({ queryKey: ["assessment-candidates", id] });
      queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
      queryClient.invalidateQueries({ queryKey: ["Jobs", "board"] });

      setSnackbarMessage(
        response?.data?.message || `${candidate.name} moved back to Response segment.`
      );
      setSnackbarSeverity("success");
      setSnackbarDuration(2300);
      setSnackbarOpen(true);
      navigate(`/career/jobs/board/${id}?pageNo=1&limit=30&status=Response`);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message ||
          `Failed to move ${candidate.name} back to Response segment.`
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(2600);
      setSnackbarOpen(true);
    }
  };

  const handleEditSelection = () => {
    const targetSection = document.getElementById("assessment-candidate-pool");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSaveDraft = () => {
    setSnackbarMessage("Assessment draft saved locally.");
    setSnackbarSeverity("success");
    setSnackbarDuration(2200);
    setSnackbarOpen(true);
  };

  const handleScheduleAndSend = async () => {
    if (!selectedAssessment) {
      setSnackbarMessage("Please select an assessment first.");
      setSnackbarSeverity("error");
      setSnackbarDuration(2800);
      setSnackbarOpen(true);
      return;
    }

    if (selectedCandidateIds.length === 0) {
      setSnackbarMessage("Please select at least one candidate.");
      setSnackbarSeverity("error");
      setSnackbarDuration(2800);
      setSnackbarOpen(true);
      return;
    }

    if (!launchDate || !launchTime) {
      setSnackbarMessage("Please set launch date and time.");
      setSnackbarSeverity("error");
      setSnackbarDuration(2800);
      setSnackbarOpen(true);
      return;
    }

    try {
      setIsSchedulingAssessment(true);
      const response = await axios.post(
        `${API_URL}api/v1/assessment-lobby/schedule`,
        {
          hiringId: id,
          assessmentTemplateId: selectedAssessment.id,
          candidateRegistrationIds: selectedCandidateIds,
          launchDate,
          launchTime,
          activeProctoring,
        },
        config
      );

      queryClient.invalidateQueries({ queryKey: ["assessment-candidates", id] });
      queryClient.invalidateQueries({ queryKey: ["Jobs", "board"] });
      queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });

      setSnackbarMessage(
        response?.data?.message ||
          `Scheduled "${selectedAssessment.name}" for ${selectedCandidateIds.length} candidate(s).`
      );
      setSnackbarSeverity("success");
      setSnackbarDuration(3200);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to schedule and send assessments."
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    } finally {
      setIsSchedulingAssessment(false);
    }
  };

  const isServiceOff = jobDetails?.isServiceOff === true;

  return (
    <main className="crm-board assessment-board">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Assessment Segment | Job Board</title>
      </Helmet>

      <div
        className="opportunity-status-container"
        style={{
          color: isServiceOff ? "#FF0000" : "#00643A",
          backgroundColor: isServiceOff ? "#FF00001A" : "rgba(0, 213, 136, 0.1)",
        }}
      >
        <p className="body-sm-regular">
          {isServiceOff
            ? "This job is no longer accepting responses"
            : "This job is still accepting responses"}
        </p>
      </div>

      <div className="board-layout">
        <div className="board-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">
                {getUserImage() ? (
                  <img
                    src={getUserImage()}
                    alt="Profile"
                    className="user-profile-image"
                    onError={(event) => {
                      event.target.style.display = "none";
                      if (event.target.nextSibling) {
                        event.target.nextSibling.style.display = "block";
                      }
                    }}
                  />
                ) : (
                  <div className="default-avatar">👤</div>
                )}
                {!getUserImage() && <div className="default-avatar">👤</div>}
              </div>
              <div className="logo-text">
                <span className="company-name">{getUserFullName() || "User"}</span>
                <span className="company-type">{getUserRole() || "Member"}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-navigation">
            <button
              onClick={() => {
                navigate(`/career/jobs/board/${id}?pageNo=1&limit=30&status=Response`);
              }}
              className="sidebar-nav-btn response-nav-btn"
              title="Response Management"
            >
              <span className="nav-text">Response</span>
            </button>
            <button
              className="sidebar-nav-btn assessment-nav-btn --active"
              title="Assessment Management"
            >
              <span className="nav-text">Assessment</span>
            </button>
            <button
              onClick={() => {
                navigate(
                  `/career/jobs/board/${id}/interview?pageNo=1&limit=30&interviewSegment=InterviewLobby`
                );
              }}
              className="sidebar-nav-btn interview-nav-btn"
              title="Interview Management"
            >
              <span className="nav-text">Interview</span>
            </button>
            <button
              onClick={() => navigate(computeMyProfilePath())}
              className="sidebar-nav-btn back-nav-btn"
              title="Back to Profile"
            >
              <FiArrowLeft className="back-icon" />
              <span className="nav-text">Back</span>
            </button>
          </div>
        </div>

        <section className="main-container assessment-main-container">
          <div className="assessment-page-header">
            <div>
              <h1 className="assessment-page-title">
                {isResultSegment ? "Assessment Results" : "Schedule Assessment"}
              </h1>
            </div>
            <div className="assessment-subsegment-tabs">
              <button
                type="button"
                className={`assessment-subsegment-btn ${
                  assessmentSegment === "ScheduleAssessment" ? "--selected" : ""
                }`}
                onClick={() => handleAssessmentSegmentChange("ScheduleAssessment")}
              >
                <span>Schedule Assessment</span>
                <span className="count">{candidates.length}</span>
              </button>
              <button
                type="button"
                className={`assessment-subsegment-btn result-btn ${
                  isResultSegment ? "--selected" : ""
                }`}
                onClick={() => handleAssessmentSegmentChange("Result")}
              >
                <span>Result</span>
                <span className="count">
                  {Number(assessmentResultStatsQuery?.data?.totalAssessmentsSent || 0)}
                </span>
              </button>
            </div>
          </div>

          {isResultSegment ? (
            <AssessmentResult />
          ) : (
            <>
              <section
                id="assessment-create-section"
                className="assessment-section assessment-major-card assessment-major-card--create"
              >
                <div className="assessment-section-header">
                  <div className="assessment-title-with-chip">
                    <h2>Create AI Assessment</h2>
                    <span className="assessment-powered-chip">
                      <img src={geminiIcon} alt="Gemini" className="assessment-gemini-icon" />
                      Powered by Gemini
                    </span>
                  </div>
                </div>

                <div className="assessment-layout-grid">
                  <div className="assessment-card assessment-form-card">
                    <div className="assessment-form-grid">
                      <div className="assessment-form-group">
                        <label>Assessment Name</label>
                        <input
                          type="text"
                          value={assessmentName}
                          onChange={(event) => setAssessmentName(event.target.value)}
                          placeholder="e.g. Senior Backend Engineer Test"
                        />
                      </div>
                      <div className="assessment-form-group">
                        <label>Role</label>
                        <input
                          type="text"
                          value={selectedRole}
                          onChange={(event) => setSelectedRole(event.target.value)}
                          placeholder="e.g. Fullstack Developer"
                        />
                      </div>
                    </div>

                    <div className="assessment-form-grid">
                      <div className="assessment-form-group">
                        <label>Experience Level</label>
                        <div className="assessment-toggle-group">
                          {EXPERIENCE_LEVELS.map((level) => (
                            <button
                              type="button"
                              key={level}
                              className={
                                level === experienceLevel
                                  ? "assessment-toggle-btn --active"
                                  : "assessment-toggle-btn"
                              }
                              onClick={() => setExperienceLevel(level)}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="assessment-form-group">
                        <div className="assessment-label-row">
                          <label>Difficulty Level</label>
                          <span>{DIFFICULTY_LABELS[difficulty]}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="1"
                          value={difficulty}
                          onChange={(event) => setDifficulty(Number(event.target.value))}
                          className="assessment-range-input"
                        />
                      </div>
                    </div>

                    <div className="assessment-form-grid">
                      <div className="assessment-form-group">
                        <label>No of Questions</label>
                        <input
                          type="number"
                          min="1"
                          value={numberOfQuestions}
                          onChange={(event) => setNumberOfQuestions(event.target.value)}
                          placeholder="e.g. 10"
                        />
                      </div>
                      <div className="assessment-form-group">
                        <label>Time (mins)</label>
                        <input
                          type="number"
                          min="1"
                          value={assessmentTime}
                          onChange={(event) => setAssessmentTime(event.target.value)}
                          placeholder="e.g. 30"
                        />
                      </div>
                    </div>

                    <div className="assessment-form-group">
                      <label>Tech Stack</label>
                      <div className="assessment-skills-wrap">
                        {selectedSkills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            className="assessment-skill-tag"
                            onClick={() => handleRemoveSkill(skill)}
                            title={`Remove ${skill}`}
                          >
                            {skill}
                            <span aria-hidden="true">×</span>
                          </button>
                        ))}
                        
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillInputKeyDown}
                          placeholder="Type skill & press Enter..."
                          className="assessment-skill-input-box"
                        />
                      </div>

                      {suggestedSkills.length > 0 && (
                        <div className="assessment-skills-suggestions-container">
                          <span className="assessment-suggestions-label">Suggestions based on Job & Role:</span>
                          <div className="assessment-skills-suggestions-list">
                            {suggestedSkills.slice(0, 10).map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                className="assessment-skill-suggestion-tag"
                                onClick={() => handleAddSkillFromSuggestion(skill)}
                                title={`Add ${skill}`}
                              >
                                + {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="assessment-form-group">
                      <label>Question Types</label>
                      <div className="assessment-question-types-grid">
                        {QUESTION_TYPE_OPTIONS.map((typeOption) => {
                          const isActive = selectedQuestionTypes.includes(typeOption.value);
                          const isDisabled = DISABLED_QUESTION_TYPES.has(typeOption.value);
                          return (
                            <button
                              key={typeOption.value}
                              type="button"
                              className={
                                isDisabled
                                  ? "assessment-question-type-btn --disabled"
                                  : isActive
                                  ? "assessment-question-type-btn --active"
                                  : "assessment-question-type-btn"
                              }
                              onClick={() =>
                                !isDisabled && handleQuestionTypeToggle(typeOption.value)
                              }
                              disabled={isDisabled}
                            >
                              {typeOption.icon}
                              <span>{typeOption.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="assessment-advanced-settings">
                      <details>
                        <summary>
                          <span className="left">
                            <FiSettings />
                            Advanced Settings
                          </span>
                          <FiChevronDown className="expand-icon" />
                        </summary>
                        <div className="assessment-advanced-options">
                          <label>
                            <input
                              type="checkbox"
                              checked={advancedSettings.webcamProctoring}
                              onChange={(event) =>
                                setAdvancedSettings((prev) => ({
                                  ...prev,
                                  webcamProctoring: event.target.checked,
                                }))
                              }
                            />
                            Webcam Proctoring
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={advancedSettings.antiCheat}
                              onChange={(event) =>
                                setAdvancedSettings((prev) => ({
                                  ...prev,
                                  antiCheat: event.target.checked,
                                }))
                              }
                            />
                            Anti-Cheat (Browser Lock)
                          </label>
                        </div>
                      </details>
                    </div>

                    <button
                      type="button"
                      className="assessment-generate-btn"
                      onClick={handleGenerateAssessment}
                      disabled={isGeneratingAssessment}
                    >
                      <img src={geminiIconWhite} alt="Gemini" className="assessment-gemini-icon" />
                      {isGeneratingAssessment ? "Generating..." : "Generate Assessment with AI"}
                    </button>
                  </div>

                  <div className="assessment-card assessment-generated-card">
                    <div className="assessment-card-header">
                      <h3>Generated Assessments</h3>
                      <span className="new-badge">NEW</span>
                    </div>
                    <div className="assessment-create-more-box">
                      <button type="button" onClick={handleCreateMoreAssessment}>
                        Create More Assessment
                      </button>
                    </div>
                    <div className="assessment-generated-list">
                      {generatedAssessments.length === 0 && (
                        <p className="assessment-table-message">
                          No generated assessments yet. Use AI generate to create one.
                        </p>
                      )}
                      {generatedAssessments.map((assessment) => (
                        <div
                          key={assessment.id}
                          className={
                            assessment.id === selectedAssessmentId
                              ? "assessment-generated-item --selected"
                              : "assessment-generated-item"
                          }
                          onClick={() => setSelectedAssessmentId(assessment.id)}
                        >
                          <div className="assessment-generated-head">
                            <h4>{assessment.name}</h4>
                            <span className="difficulty-chip">{assessment.difficulty}</span>
                          </div>
                          <div className="assessment-generated-meta">
                            <span>{assessment.questionCount} Questions</span>
                            <span>{assessment.durationInMinutes} mins</span>
                          </div>
                          <div className="assessment-generated-actions">
                            <button
                              type="button"
                              className="edit-btn"
                              disabled={true}
                              title="Will be added in next iteration."
                              style={{ opacity: 0.5, cursor: "not-allowed" }}
                              onClick={(event) => {
                                event.stopPropagation();
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(
                                  `/career/jobs/board/${id}/assessment/review?templateId=${assessment.id}&assessmentSegment=ScheduleAssessment`
                                );
                              }}
                            >
                              View questions
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="assessment-candidate-pool"
                className="assessment-section assessment-major-card assessment-major-card--candidates"
              >
                <div className="assessment-section-header assessment-candidate-header">
                  <h2>Candidates Ready for Assessment</h2>
                  <div className="assessment-candidate-controls">
                    <input
                      type="text"
                      placeholder="Search by name, skills..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSnackbarMessage(
                          "Advanced candidate filters will be connected in next iteration."
                        );
                        setSnackbarSeverity("info");
                        setSnackbarDuration(2200);
                        setSnackbarOpen(true);
                      }}
                      title="Filter candidates"
                    >
                      <FiFilter />
                    </button>
                  </div>
                </div>

                <div className="assessment-candidate-table-wrap">
                  <table className="assessment-candidate-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>College</th>
                        <th>Skills</th>
                        <th className="center">AI Score</th>
                        <th className="right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentCandidatesQuery.isLoading && (
                        <tr>
                          <td colSpan={5} className="assessment-table-message">
                            Loading candidates...
                          </td>
                        </tr>
                      )}
                      {assessmentCandidatesQuery.isError && (
                        <tr>
                          <td colSpan={5} className="assessment-table-message">
                            Failed to fetch assessment candidates. Please refresh and try again.
                          </td>
                        </tr>
                      )}
                      {!assessmentCandidatesQuery.isLoading &&
                        !assessmentCandidatesQuery.isError &&
                        filteredCandidates.length === 0 && (
                          <tr>
                            <td colSpan={5} className="assessment-table-message">
                              No candidates found for assessment scheduling.
                            </td>
                          </tr>
                        )}
                      {!assessmentCandidatesQuery.isLoading &&
                        !assessmentCandidatesQuery.isError &&
                        paginatedCandidates.map((candidate) => (
                          <AssessmentCandidateRow
                            key={candidate.id}
                            candidate={candidate}
                            isSelected={selectedCandidateIds.includes(candidate.id)}
                            onToggleSelect={() => toggleCandidateSelection(candidate.id)}
                            onSendAssessment={() => handleSendAssessmentToCandidate(candidate)}
                            onSendEmail={() => setActiveMailCandidate(candidate)}
                            onMoveToResponse={() => setActiveMoveCandidate(candidate)}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
                {!assessmentCandidatesQuery.isLoading &&
                  !assessmentCandidatesQuery.isError &&
                  filteredCandidates.length > 0 && (
                  <div className="assessment-result-pagination">
                    <p>
                      Showing {(candidatePage - 1) * CANDIDATE_PAGE_SIZE + 1}-
                      {Math.min(candidatePage * CANDIDATE_PAGE_SIZE, filteredCandidates.length)} of{" "}
                      {filteredCandidates.length} candidates
                    </p>
                    <div className="page-controls">
                      <button
                        type="button"
                        onClick={() => setCandidatePage((prev) => Math.max(1, prev - 1))}
                        disabled={candidatePage === 1}
                        aria-label="Previous page"
                      >
                        {"<"}
                      </button>
                      {Array.from({ length: totalCandidatePages }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <button
                            key={`candidate-page-${pageNumber}`}
                            type="button"
                            className={candidatePage === pageNumber ? "--active" : ""}
                            onClick={() => setCandidatePage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() =>
                          setCandidatePage((prev) => Math.min(totalCandidatePages, prev + 1))
                        }
                        disabled={candidatePage === totalCandidatePages}
                        aria-label="Next page"
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <section className="assessment-section assessment-major-card assessment-major-card--schedule">
                <h2 className="assessment-schedule-title">Schedule Assessment</h2>
                <div
                  id="assessment-schedule-section"
                  className="assessment-card assessment-schedule-card"
                >
                  <div className="assessment-steps-grid">
                    <div className="assessment-step">
                      <div className="assessment-step-head">
                        <span className="step-number">1</span>
                        <h3>Select Assessment</h3>
                      </div>
                      <div className="assessment-step-content">
                        <p className="step-caption">CURRENTLY SELECTED</p>
                        <p className="step-title">{selectedAssessment?.name || "Not selected"}</p>
                        <div className="step-meta">
                          <span>{selectedAssessment?.questionCount || 0} Questions</span>
                          <span>•</span>
                          <span>{selectedAssessment?.durationInMinutes || 0} mins</span>
                        </div>
                        <div className="assessment-step-select-wrap">
                          <select
                            className="assessment-step-select"
                            value={selectedAssessmentId}
                            onChange={(event) => setSelectedAssessmentId(event.target.value)}
                            disabled={generatedAssessments.length === 0}
                          >
                            {generatedAssessments.length === 0 ? (
                              <option value="">No generated assessments</option>
                            ) : (
                              generatedAssessments.map((assessment) => (
                                <option key={assessment.id} value={assessment.id}>
                                  {assessment.name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="assessment-step">
                      <div className="assessment-step-head">
                        <span className="step-number">2</span>
                        <h3>Select Candidates</h3>
                      </div>
                      <div className="assessment-step-content">
                        <div className="assessment-selected-email-list">
                          {selectedCandidates.slice(0, 3).map((candidate) => (
                            <span key={candidate.id} className="assessment-selected-email-item">
                              {candidate.email || "Not available"}
                            </span>
                          ))}
                          {selectedCandidates.length > 3 && (
                            <span className="assessment-selected-email-more">
                              +{selectedCandidates.length - 3}
                            </span>
                          )}
                        </div>
                        <p className="step-subtext">
                          {selectedCandidateIds.length} candidate(s) selected from the pool
                        </p>
                        <button type="button" onClick={handleEditSelection}>
                          Edit Selection
                        </button>
                      </div>
                    </div>

                    <div className="assessment-step">
                      <div className="assessment-step-head">
                        <span className="step-number">3</span>
                        <h3>Schedule Settings</h3>
                      </div>
                      <div className="assessment-step-content settings-content">
                        <div className="schedule-input-group">
                          <label>Launch Date</label>
                          <div className="schedule-input-wrap">
                            <FiCalendar />
                            <input
                              type="date"
                              value={launchDate}
                              onChange={(event) => setLaunchDate(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="schedule-input-group">
                          <label>Launch Time</label>
                          <div className="schedule-input-wrap">
                            <FiClock />
                            <input
                              type="time"
                              value={launchTime}
                              onChange={(event) => setLaunchTime(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="assessment-switch-row" title="Will be added in next iteration.">
                          <div>
                            <p>Active Proctoring</p>
                            <span>Record webcam and screen</span>
                          </div>
                          <label className="assessment-switch" style={{ opacity: 0.6, cursor: "not-allowed" }}>
                            <input
                              type="checkbox"
                              checked={false}
                              disabled={true}
                              onChange={() => {}}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="assessment-sticky-footer">
                <div className="assessment-footer-summary">
                  <div>
                    <p className="summary-label">Selected Assessment</p>
                    <p className="summary-value">
                      {selectedAssessment?.name || "No assessment selected"}
                    </p>
                  </div>
                  <div className="divider" />
                  <div>
                    <p className="summary-label">Target Group</p>
                    <p className="summary-value">
                      {selectedCandidateIds.length} candidate(s) selected
                    </p>
                  </div>
                </div>
                <div className="assessment-footer-actions">
                  <button type="button" className="draft-btn" onClick={handleSaveDraft}>
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    className="schedule-send-btn"
                    onClick={handleScheduleAndSend}
                    disabled={isSchedulingAssessment}
                  >
                    <FiSend />
                    {isSchedulingAssessment
                      ? "Scheduling..."
                      : "Schedule & Send Assessment"}
                  </button>
                </div>
              </footer>
            </>
          )}
      {/* Email Preview Modal */}
      {activeMailCandidate && (
        <div className="assessment-modal-overlay">
          <div className="assessment-modal-card" style={{ maxWidth: "650px" }}>
            <div className="assessment-modal-header">
              <h3>Send Email to {activeMailCandidate.name || `${activeMailCandidate.firstName || ""} ${activeMailCandidate.lastName || ""}`.trim() || "Candidate"}</h3>
              <button 
                type="button" 
                className="assessment-modal-close-btn"
                onClick={() => setActiveMailCandidate(null)}
              >
                ✕
              </button>
            </div>
            <div className="assessment-modal-body">
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Email Subject</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject"
                    style={{ 
                      padding: "0.5rem", 
                      fontSize: "0.875rem", 
                      border: "1px solid #cbd5e1", 
                      borderRadius: "0.375rem",
                      width: "100%"
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Additional CC</label>
                  <input 
                    type="text" 
                    value={emailCc}
                    onChange={(e) => setEmailCc(e.target.value)}
                    placeholder="e.g. hr@company.com"
                    style={{ 
                      padding: "0.5rem", 
                      fontSize: "0.875rem", 
                      border: "1px solid #cbd5e1", 
                      borderRadius: "0.375rem",
                      width: "100%"
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569" }}>Email Message</label>
                <textarea 
                  rows={8}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  style={{ 
                    padding: "0.75rem", 
                    fontSize: "0.875rem", 
                    border: "1px solid #cbd5e1", 
                    borderRadius: "0.375rem",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                    width: "100%",
                    resize: "vertical"
                  }}
                />
              </div>
            </div>
            <div className="assessment-modal-footer">
              <button 
                type="button" 
                className="assessment-modal-btn --secondary"
                onClick={() => setActiveMailCandidate(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="assessment-modal-btn --primary"
                disabled={isSendingEmailStatus}
                onClick={handleSendCrmEmailForCandidate}
              >
                {isSendingEmailStatus ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to Response Modal */}
      {activeMoveCandidate && (
        <div className="assessment-modal-overlay">
          <div className="assessment-modal-card">
            <div className="assessment-modal-header">
              <h3>Move Candidate to Response</h3>
              <button 
                type="button" 
                className="assessment-modal-close-btn"
                onClick={() => setActiveMoveCandidate(null)}
              >
                ✕
              </button>
            </div>
            <div className="assessment-modal-body">
              <p>
                Are you sure you want to move <strong>{activeMoveCandidate.name || `${activeMoveCandidate.firstName || ""} ${activeMoveCandidate.lastName || ""}`.trim() || "Candidate"}</strong> back to the <strong>Response</strong> segment?
              </p>
              <p>This will remove them from the assessment candidate pool.</p>
            </div>
            <div className="assessment-modal-footer">
              <button 
                type="button" 
                className="assessment-modal-btn --secondary"
                onClick={() => setActiveMoveCandidate(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="assessment-modal-btn --primary"
                onClick={() => {
                  handleMoveCandidateToResponse(activeMoveCandidate);
                  setActiveMoveCandidate(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
        </section>
      </div>
    </main>
  );
}
