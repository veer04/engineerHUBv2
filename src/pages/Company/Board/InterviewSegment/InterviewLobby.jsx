import { Fragment, useEffect, useRef, useState } from "react";
import "../JobBoard.css";
import "./InterviewSegment.css";
import {
  FiDownload,
  FiUserPlus,
  FiUserX,
  FiInbox,
  FiCalendar,
  FiClock,
  FiArrowLeft,
  FiInfo,
} from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { MdDeleteOutline, MdMailOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BiSort } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiOpenai } from "react-icons/si";
import Loading from "../../../../components/Loader/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { scheduleAIInterviewApi } from "../../../../services/aiInterviewApi";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getAccessToken, getUserFullName, getUserImage, getUserRole, getUserId } from "../../../../features/User/UserDetails";
import InterviewLobbyRow from "./InterviewLobbyRow";
import PaginationBarWithSearchParams from "../../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import FormInput from "../../../../components/FormInputs/FormInput";
import FormInputTime from "../../../../components/FormInputs/FormInputTime";

export default function InterviewLobby() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  // helper to compute logged-in user's profile path
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
  const [searchParams, setSearchParams] = useSearchParams({
    pageNo: "",
    limit: "",
    interviewSegment: "",
    exp: "",
  });
  const ref = useRef(null);
  const [interviewDataRows, setInterviewDataRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);


  const [experience, setExperience] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnyRowUpdating, setIsAnyRowUpdating] = useState(false);
  const [isSchedulingInterview, setIsSchedulingInterview] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewRound, setInterviewRound] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [inviteeEmails, setInviteeEmails] = useState([]);
  const [inviteeInput, setInviteeInput] = useState("");
  const [interviewSubject, setInterviewSubject] = useState("");
  const [dateScrollIndex, setDateScrollIndex] = useState(0);

  // Workspace Modal States
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [interviewType, setInterviewType] = useState("Manual"); // "Manual" or "AI"

  // AI Agent Configuration States
  const [aiInterviewSubject, setAiInterviewSubject] = useState("");
  const [aiRole, setAiRole] = useState("Frontend Engineer");
  const [aiDifficulty, setAiDifficulty] = useState("Medium");
  const [aiLanguage, setAiLanguage] = useState("English");
  const [aiDuration, setAiDuration] = useState("30 minutes");
  const [aiTechnicalKnowledge, setAiTechnicalKnowledge] = useState(true);
  const [aiProblemSolving, setAiProblemSolving] = useState(true);
  const [aiCodingRound, setAiCodingRound] = useState(true);
  const [aiSystemDesign, setAiSystemDesign] = useState(false);
  const [aiBehavioralRound, setAiBehavioralRound] = useState(false);
  const [aiCommunication, setAiCommunication] = useState(false);
  const [aiPersonality, setAiPersonality] = useState("Conversational");
  const [aiStrictness, setAiStrictness] = useState("Medium");
  const [aiEvaluationDepth, setAiEvaluationDepth] = useState("Deep");
  const [aiAutoRecording, setAiAutoRecording] = useState(true);
  const [aiAutoReport, setAiAutoReport] = useState(true);
  const [aiEmailCandidate, setAiEmailCandidate] = useState(true);
  const [aiInterviewTopics, setAiInterviewTopics] = useState([]);
  const [aiTopicInput, setAiTopicInput] = useState("");
  const [aiInstructions, setAiInstructions] = useState("");
  const [aiSelectedDate, setAiSelectedDate] = useState("");
  const [aiStartTime, setAiStartTime] = useState("");
  const [aiEndTime, setAiEndTime] = useState("");
  const [aiCCParticipants, setAiCCParticipants] = useState([]);
  const [aiCCEmailInput, setAiCCEmailInput] = useState("");
  const [aiDateScrollIndex, setAiDateScrollIndex] = useState(0);
  const [isSchedulingAI, setIsSchedulingAI] = useState(false);

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [scheduledInterview, setScheduledInterview] = useState(null);
  const getInitialGoogleAuthToken = () => {
    const token = localStorage.getItem('googleAuthToken');
    const timestampStr = localStorage.getItem('googleAuthTokenTimestamp');
    if (!token) return null;
    if (timestampStr) {
      const elapsed = Date.now() - parseInt(timestampStr, 10);
      // 50 minutes threshold (50 * 60 * 1000 = 3000000ms)
      if (elapsed > 3000000) {
        localStorage.removeItem('googleAuthToken');
        localStorage.removeItem('googleAuthTokenTimestamp');
        return null;
      }
    }
    return token;
  };

  const [googleAuthToken, setGoogleAuthToken] = useState(getInitialGoogleAuthToken);
  const [segmentCounts, setSegmentCounts] = useState({
    interviewLobby: 0,
    scheduledInterviews: 0,
    report: 0
  });

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const config = {
    headers: {
      accesstoken: getAccessToken(),
      accessToken: getAccessToken(),
    },
  };

  // Query to get segment counts
  const segmentCountsQuery = useQuery({
    queryKey: ["interview-segment-counts", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}api/v1/interview-segment-counts?hiringId=${id}`,
        config
      );
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Update segment counts when query succeeds
  useEffect(() => {
    if (segmentCountsQuery.isSuccess && segmentCountsQuery.data?.data) {
      setSegmentCounts(segmentCountsQuery.data.data);
    }
  }, [segmentCountsQuery.isSuccess, segmentCountsQuery.data]);

  // Enhanced function to handle Google OAuth with polling fallback
  const handleGoogleOAuth = async () => {
    try {
      const allowedOrigins = new Set([window.location.origin]);
      try {
        const apiOrigin = new URL(API_URL, window.location.origin).origin;
        allowedOrigins.add(apiOrigin);
      } catch (originError) {
        console.error("Failed to parse API URL origin for OAuth:", originError);
      }

      // Get OAuth URL from backend
      const response = await axios.get(
        `${API_URL}api/v1/google/oauth/url`,
        config
      );
      
      if (response.data.success) {
        // Open OAuth URL in a new window
        const popup = window.open(
          response.data.data.authUrl,
          'googleOAuth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );
        
        if (!popup) {
          setSnackbarMessage("Popup blocked! Please allow popups for this site.");
          setSnackbarSeverity("error");
          setSnackbarDuration(5000);
          setSnackbarOpen(true);
          return;
        }
        
        // Listen for messages from the popup window
        const handleMessage = (event) => {
          if (event.source !== popup) {
            return;
          }

          if (!allowedOrigins.has(event.origin)) {
            return;
          }
          
          if (event.data && event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
            // Store the access token in state and localStorage
            const nowTs = String(Date.now());
            setGoogleAuthToken(event.data.accessToken);
            localStorage.setItem('googleAuthToken', event.data.accessToken);
            localStorage.setItem('googleAuthTokenTimestamp', nowTs);
            
            // Update UI to show connected state
            setSnackbarMessage(`Google connected successfully! You can now schedule interviews. Make sure you used the same Gmail account you're logged in with here.`);
            setSnackbarSeverity("success");
            setSnackbarDuration(5000);
            setSnackbarOpen(true);
            
            // Clean up
            try {
              popup.close();
            } catch (e) {
              console.log("Could not close popup:", e);
            }
            
            // Remove event listener
            window.removeEventListener('message', handleMessage);
            clearInterval(checkClosed);
          } else if (event.data && event.data.type === 'GOOGLE_OAUTH_ERROR') {
            setSnackbarMessage("Google OAuth failed: " + event.data.error);
            setSnackbarSeverity("error");
            setSnackbarDuration(5000);
            setSnackbarOpen(true);
            
            try {
              popup.close();
            } catch (e) {
              console.log("Could not close popup:", e);
            }
            window.removeEventListener('message', handleMessage);
            clearInterval(checkClosed);
          }
        };
        
        // Add event listener for popup messages
        window.addEventListener('message', handleMessage);
        
        // Declare checkClosed variable
        let checkClosed;
        
        // Fallback: Check if popup was closed manually and poll for token
        checkClosed = setInterval(async () => {
          try {
            if (popup.closed) {
              clearInterval(checkClosed);
              window.removeEventListener('message', handleMessage);
              
              // If popup closed, try to check if we got a token via polling
              if (!googleAuthToken) {
                // Wait a moment for any pending messages
                setTimeout(async () => {
                  try {
                    // Check if there's a token in localStorage set by callback
                    const storedToken = localStorage.getItem('googleAuthToken');
                    if (storedToken && storedToken !== googleAuthToken) {
                      setGoogleAuthToken(storedToken);
                      if (!localStorage.getItem('googleAuthTokenTimestamp')) {
                        localStorage.setItem('googleAuthTokenTimestamp', String(Date.now()));
                      }
                      setSnackbarMessage("Google connected successfully! You can now schedule interviews. Make sure you used the same Gmail account you're logged in with here.");
                      setSnackbarSeverity("success");
                      setSnackbarDuration(5000);
                      setSnackbarOpen(true);
                    } else {
                      setSnackbarMessage("Google OAuth was cancelled or failed");
                      setSnackbarSeverity("warning");
                      setSnackbarDuration(3000);
                      setSnackbarOpen(true);
                    }
                  } catch (pollError) {
                    console.log("Polling error:", pollError);
                  }
                }, 1000);
              }
            }
          } catch (e) {
            // If we can't access popup.closed due to cross-origin, continue checking
            console.log("Cannot check popup status:", e);
          }
        }, 1000);
        
        // Auto-cleanup after 5 minutes
        setTimeout(() => {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }, 300000);
        
        setSnackbarMessage("Please complete Google OAuth in the popup window. Make sure to allow the Gmail account you're logged in with here so we can schedule interviews on your behalf.");
        setSnackbarSeverity("info");
        setSnackbarDuration(8000);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error initiating Google OAuth:", error);
      setSnackbarMessage("Failed to initiate Google OAuth");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    }
  };

  // Function to clear Google auth token
  const clearGoogleAuth = () => {
    setGoogleAuthToken(null);
    localStorage.removeItem('googleAuthToken');
    localStorage.removeItem('googleAuthTokenTimestamp');
    setSnackbarMessage("Google authentication cleared");
    setSnackbarSeverity("info");
    setSnackbarDuration(3000);
    setSnackbarOpen(true);
  };

  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const interviewSegment = searchParams.get("interviewSegment");
  const exp = searchParams.get("exp");

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
    interviewSegment: interviewSegment ? interviewSegment : "InterviewLobby",
    exp: exp ? exp : "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Sync experience state with URL params
    if (exp && exp !== experience) {
      setExperience(exp);
    }
  }, [exp]);

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate(
        `/career/jobs/board/${id}/interview?pageNo=1&limit=30&interviewSegment=InterviewLobby`
      );
    }
  }, [pageNo, limit, navigate, id]);

  // API query to get interview lobby candidates
  const interviewData = useQuery({
    queryKey: [
      "Interview",
      "lobby",
      params.pageNo,
      params.limit,
      id,
      params.interviewSegment,
      exp,
    ],
    queryFn: () => {
      // Real API call to get interview lobby candidates
      return axios
        .get(
          `${API_URL}api/v1/interview-lobby?hiringId=${id}&page=${params.pageNo}&limit=${params.limit}${
            exp ? `&search=${exp}` : ""
          }`,
          config
        )
        .then((res) => res);
    },
    staleTime: 1000 * 60 * 1, // 1 minutes
  });

  useEffect(() => {
    if (!interviewData.isSuccess) return;

    // Support multiple possible response shapes defensively
    const root = interviewData?.data?.data;
    let candidates = Array.isArray(root?.candidates)
      ? root.candidates
      : Array.isArray(root?.data?.candidates)
      ? root.data.candidates
      : Array.isArray(root)
      ? root
      : [];

    if (Array.isArray(candidates) && candidates.length > 0) {
      setInterviewDataRows(candidates);
      const totalItems =
        root?.pagination?.totalItems ??
        root?.data?.pagination?.totalItems ??
        candidates.length;
      setPageCount(Math.ceil(totalItems / (parseInt(limit) || 30)));
    } else {
      setInterviewDataRows([]);
      setPageCount(1);
    }
  }, [interviewData, params.interviewSegment, params.pageNo, params.limit]);

  const handleDownload = async () => {
    const dataToDownload = selectedRows.length > 0 ? selectedRows : interviewDataRows;
    
    if (dataToDownload.length === 0) {
      setSnackbarMessage("No data available to download");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const candidatesData = dataToDownload.map((candidate) => ({
      Name: `${candidate?.firstName}${
        candidate?.lastName ? ` ${candidate?.lastName}` : ""
      }`,
      Email: candidate?.email,
      Phone: candidate?.phone,
      "AI Score": candidate?.aiScore,
      "Interview Round": candidate?.interviewRound,
      "Resume Link": candidate?.resumeUrl,
    }));

    // Create CSV content
    const headers = Object.keys(candidatesData[0]);
    const csvContent = [
      headers.join(','),
      ...candidatesData.map(row => 
        headers.map(header => 
          `"${(row[header] || '').toString().replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Create and trigger download
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `interview-lobby-candidates-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          
          setIsDownloading(false);
          setSnackbarMessage(`Downloaded ${selectedRows.length > 0 ? 'selected' : 'all'} candidates (${dataToDownload.length} records)`);
          setSnackbarSeverity("success");
          setSnackbarDuration(3000);
          setSnackbarOpen(true);
          setProgress(0);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const handleScheduleInterview = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewRound(candidate.interviewRound || 1);
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setInviteeEmails([]);
    setInviteeInput("");
    setInterviewSubject("");
    
    // Reset AI form states
    setAiInterviewSubject("");
    setAiRole("Frontend Engineer");
    setAiDifficulty("Medium");
    setAiLanguage("English");
    setAiDuration("30 minutes");
    setAiTechnicalKnowledge(true);
    setAiProblemSolving(true);
    setAiCodingRound(true);
    setAiSystemDesign(false);
    setAiBehavioralRound(false);
    setAiCommunication(false);
    setAiPersonality("Conversational");
    setAiStrictness("Medium");
    setAiEvaluationDepth("Deep");
    setAiAutoRecording(true);
    setAiAutoReport(true);
    setAiEmailCandidate(true);
    setAiInterviewTopics([]);
    setAiTopicInput("");
    setAiInstructions("");
    setAiSelectedDate("");
    setAiStartTime("");
    setAiEndTime("");
    setAiCCParticipants([]);
    setAiCCEmailInput("");
    setAiDateScrollIndex(0);

    setInterviewType("Manual");
    setShowWorkspaceModal(true);
  };

  const handleAddInvitee = (emailToAdd) => {
    const text = (emailToAdd !== undefined ? emailToAdd : inviteeInput).trim();
    if (!text) return;

    const emails = text.split(/[\s,]+/).map((e) => e.trim()).filter(Boolean);
    const newEmails = [...inviteeEmails];
    let addedAny = false;
    let invalidEmailFound = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const email of emails) {
      if (emailRegex.test(email)) {
        if (!newEmails.includes(email)) {
          newEmails.push(email);
          addedAny = true;
        }
      } else {
        invalidEmailFound = true;
      }
    }

    if (addedAny) {
      setInviteeEmails(newEmails);
      setInviteeInput("");
    }

    if (invalidEmailFound && !addedAny) {
      setSnackbarMessage("Please enter valid email address(es)");
      setSnackbarSeverity("warning");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    }
  };

  const handleRemoveInvitee = (emailToRemove) => {
    setInviteeEmails(inviteeEmails.filter((email) => email !== emailToRemove));
  };

  const handleDateScroll = (direction) => {
    if (direction === "prev" && dateScrollIndex > 0) {
      setDateScrollIndex(dateScrollIndex - 1);
    } else if (
      direction === "next" &&
      dateScrollIndex < availableDates.length - 4
    ) {
      setDateScrollIndex(dateScrollIndex + 1);
    }
  };

  const handleAIDateScroll = (direction) => {
    if (direction === "prev" && aiDateScrollIndex > 0) {
      setAiDateScrollIndex(aiDateScrollIndex - 1);
    } else if (
      direction === "next" &&
      aiDateScrollIndex < availableDates.length - 3
    ) {
      setAiDateScrollIndex(aiDateScrollIndex + 1);
    }
  };

  const getLocalDateString = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAIDateSelect = (date) => {
    setAiSelectedDate(getLocalDateString(date));
  };

  const handleAITimeChange = (field, value) => {
    if (field === "aiStartTime") {
      setAiStartTime(value);
      if (value && aiDuration) {
        const minutes = parseInt(aiDuration);
        if (!isNaN(minutes)) {
          const start = new Date(`2000-01-01T${value}`);
          const end = new Date(start.getTime() + minutes * 60000);
          const hh = String(end.getHours()).padStart(2, '0');
          const mm = String(end.getMinutes()).padStart(2, '0');
          setAiEndTime(`${hh}:${mm}`);
        }
      }
    } else if (field === "aiEndTime") {
      setAiEndTime(value);
    }
  };

  const handleAIDurationChange = (value) => {
    setAiDuration(value);
    if (aiStartTime && value) {
      const minutes = parseInt(value);
      if (!isNaN(minutes)) {
        const start = new Date(`2000-01-01T${aiStartTime}`);
        const end = new Date(start.getTime() + minutes * 60000);
        const hh = String(end.getHours()).padStart(2, '0');
        const mm = String(end.getMinutes()).padStart(2, '0');
        setAiEndTime(`${hh}:${mm}`);
      }
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(getLocalDateString(date));
  };

  const handleTimeChange = (field, value) => {
    console.log(`Time change - ${field}:`, value);
    if (field === "startTime") {
      setStartTime(value);
    } else if (field === "endTime") {
      setEndTime(value);
    }
  };

  const formatDate = (date) => {
    if (!date) return { day: "", date: "", month: "" };
    let d;
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split("-").map(Number);
      d = new Date(year, month - 1, day);
    } else {
      d = new Date(date);
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
    };
  };

  const handleScheduleSubmit = async () => {
    if (!selectedDate || !startTime || !endTime) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    if (!interviewSubject.trim()) {
      setSnackbarMessage("Please enter an interview subject");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    // Calculate duration in minutes
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const duration = Math.round((end - start) / (1000 * 60));

    // Client-side validation for minimum duration
    if (duration < 15) {
      setSnackbarMessage("Meeting duration must be at least 15 minutes. Please select a longer time slot.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
      return;
    }

    setIsSchedulingInterview(true);

    try {

      // Check if Google OAuth token is expired locally
      const storedTs = localStorage.getItem('googleAuthTokenTimestamp');
      if (storedTs && (Date.now() - parseInt(storedTs, 10) > 3000000)) {
        clearGoogleAuth();
        setSnackbarMessage("Google authentication expired. Please click 'Connect Google Account' and try again.");
        setSnackbarSeverity("warning");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        return;
      }

      // Check if we have Google OAuth token
      if (!googleAuthToken) {
        setSnackbarMessage("Google OAuth required to schedule meetings. Please authenticate with Google first.");
        setSnackbarSeverity("warning");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        return;
      }

      // Gather all interviewer emails including any pending valid email in input box
      let finalInviteeEmails = [...inviteeEmails];
      const pendingInput = inviteeInput.trim();
      if (pendingInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emails = pendingInput.split(/[\s,]+/).map((e) => e.trim()).filter(Boolean);
        for (const email of emails) {
          if (emailRegex.test(email) && !finalInviteeEmails.includes(email)) {
            finalInviteeEmails.push(email);
          }
        }
      }

      // Real API call to schedule interview
      const response = await axios.post(
        `${API_URL}api/v1/scheduled-interview`,
        {
          hiringId: id,
          candidateId: selectedCandidate.candidateId,
          candidateResumeUrl: selectedCandidate?.resumeUrl || "",
          interviewRound: interviewRound,
          scheduledDate: selectedDate,
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          interviewers: finalInviteeEmails.map((email) => ({
            name: "Interviewer",
            email: email,
            role: "Interviewer",
          })),
          meetingNotes: `Interview for ${selectedCandidate.candidateName} - Round ${interviewRound}${interviewSubject ? ` (${interviewSubject})` : ''}`,
          interviewSubject: interviewSubject.trim() || `Round ${interviewRound || 1}`,
          googleAuthToken: googleAuthToken
        },
        config
      );

      setScheduledInterview(response.data.data);
      setShowWorkspaceModal(false);
      setShowConfirmationModal(true);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["Interview", "lobby"] });
      queryClient.invalidateQueries({ queryKey: ["Interview", "scheduled"] });
      queryClient.invalidateQueries({ queryKey: ["Interview", "report"] });
      queryClient.invalidateQueries({ queryKey: ["interview-segment-counts"] });

      setSnackbarMessage("Interview scheduled successfully!");
      setSnackbarSeverity("success");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error scheduling interview:", error);
      
      // Check for specific error messages from backend
      const errorMessage = error.response?.data?.message || "";
      
      if (error.response?.status === 401 || 
          errorMessage.includes('invalid') ||
          errorMessage.includes('expired') ||
          errorMessage.includes('reconnect') ||
          errorMessage.includes('token') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('Credentials')) {
        clearGoogleAuth();
        setSnackbarMessage("Google authentication expired or invalid. Please click 'Connect Google Account' and try again.");
        setSnackbarSeverity("warning");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('Duration must be at least 15 minutes') || 
                 errorMessage.includes('at least 15 minutes')) {
        setSnackbarMessage("Meeting duration must be at least 15 minutes. Please select a longer time slot.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('Interview date cannot be in the past')) {
        setSnackbarMessage("Interview date cannot be in the past. Please select a future date.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('already scheduled')) {
        setSnackbarMessage("An interview for this round is already scheduled for this candidate.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('Candidate is not in the interview lobby')) {
        setSnackbarMessage("Candidate is not in the interview lobby. Please add them first.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('contact details missing')) {
        setSnackbarMessage("Candidate contact details are missing. Please ensure email and phone are provided.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else if (errorMessage.includes('All required fields must be provided')) {
        setSnackbarMessage("Please fill all required fields including interview subject.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      } else {
        // Show the specific error message from backend if available, otherwise generic message
        setSnackbarMessage(errorMessage || "Failed to schedule interview. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      }
    } finally {
      setIsSchedulingInterview(false);
    }
  };

  const handleAIScheduleSubmit = async () => {
    if (!aiSelectedDate || !aiStartTime || !aiEndTime) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    if (!aiInterviewSubject.trim()) {
      setSnackbarMessage("Please enter an interview subject");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    // Calculate duration in minutes
    const start = new Date(`2000-01-01T${aiStartTime}`);
    const end = new Date(`2000-01-01T${aiEndTime}`);
    let duration = Math.round((end - start) / (1000 * 60));
    if (duration < 0) {
      duration += 24 * 60; // handle cross day boundary
    }

    if (duration < 15) {
      setSnackbarMessage("Meeting duration must be at least 15 minutes. Please select a longer time slot.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
      return;
    }

    setIsSchedulingAI(true);

    try {
      const payload = {
        hiringId: id,
        candidateId: selectedCandidate.candidateId,
        candidateName: selectedCandidate.candidateName,
        candidateEmail: selectedCandidate.candidateEmail,
        candidatePhone: selectedCandidate.candidatePhone || "",
        interviewRound: Number(interviewRound) || 1,
        scheduledDate: aiSelectedDate,
        startTime: aiStartTime,
        endTime: aiEndTime,
        duration: duration,
        interviewSubject: aiInterviewSubject.trim(),
        aiConfig: {
          roleTitle: aiRole || "Software Engineer",
          difficulty: aiDifficulty || "Medium",
          language: aiLanguage || "English",
          topics: aiInterviewTopics || [],
          focusAreas: {
            technicalKnowledge: aiTechnicalKnowledge,
            problemSolving: aiProblemSolving,
            coding: aiCodingRound,
            systemDesign: aiSystemDesign,
            behavioral: aiBehavioralRound,
            communication: aiCommunication,
          },
          personality: aiPersonality || "Conversational",
          strictness: aiStrictness || "Medium",
          evaluationDepth: aiEvaluationDepth || "Deep",
          customInstructions: aiInstructions || "",
        },
      };

      const resData = await scheduleAIInterviewApi(payload);
      const scheduledResult = resData?.data?.scheduledInterview || {
        _id: resData?.data?.session?.inviteToken || "ai_scheduled",
        hiringId: id,
        candidateId: selectedCandidate.candidateId,
        candidateName: selectedCandidate.candidateName,
        candidateEmail: selectedCandidate.candidateEmail,
        interviewRound: interviewRound,
        scheduledDate: aiSelectedDate,
        startTime: aiStartTime,
        endTime: aiEndTime,
        duration: duration,
        status: "Scheduled",
        interviewSubject: aiInterviewSubject.trim(),
        interviewType: "AI",
      };

      setScheduledInterview(scheduledResult);
      setShowWorkspaceModal(false);
      setShowConfirmationModal(true);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["Interview", "lobby"] });
      queryClient.invalidateQueries({ queryKey: ["Interview", "scheduled"] });
      queryClient.invalidateQueries({ queryKey: ["Interview", "report"] });
      queryClient.invalidateQueries({ queryKey: ["interview-segment-counts"] });

      setSnackbarMessage("AI Interview scheduled successfully!");
      setSnackbarSeverity("success");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error scheduling AI interview:", error);
      setSnackbarMessage("Failed to schedule AI interview. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    } finally {
      setIsSchedulingAI(false);
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setScheduledInterview(null);
    setSelectedCandidate(null);
  };

  return (
    <>
      {/* Redesigned Premium Recruiter Scheduling Workspace Modal */}
      {showWorkspaceModal && (
        <div className="workspace-modal-overlay">
          <div className={`workspace-modal-container ${interviewType === "AI" ? "ai-mode-active" : "manual-mode-active"}`}>
            
            {/* Header Area */}
            <div className="workspace-header">
              <div className="header-info-row">
                <div className="header-badge-section">
                  <span className="round-badge-pill">Round {interviewRound || 1}</span>
                  {interviewType === "AI" ? (
                    <span className="ai-workspace-badge">AI Agent Workspace</span>
                  ) : (
                    <span className="manual-workspace-badge">Manual Interview Workspace</span>
                  )}
                </div>
                <div className="candidate-meta-bar">
                  <span className="meta-item">
                    <span className="meta-label">Candidate:</span>
                    <span className="meta-value highlight">{selectedCandidate?.candidateName || "Unknown"}</span>
                  </span>
                  <span className="meta-item">
                    <span className="meta-label">Email:</span>
                    <span className="meta-value">{selectedCandidate?.candidateEmail || "Not provided"}</span>
                  </span>
                </div>
              </div>
              <button
                className="workspace-close-btn"
                onClick={() => setShowWorkspaceModal(false)}
                disabled={isSchedulingInterview || isSchedulingAI}
              >
                ×
              </button>
            </div>

            {/* Section 2: Dynamic Content Area */}
            <div className="workspace-body scroll-y">
              
              {/* Section 1: Selector Cards */}
              <div className="workspace-selector-section">
                <div className="workspace-selector-grid">
                  <div
                    className={`workspace-selector-card manual-card ${interviewType === "Manual" ? "selected" : ""}`}
                    onClick={() => setInterviewType("Manual")}
                  >
                    <div className="workspace-card-icon-container">
                      <FiCalendar />
                    </div>
                    <div className="workspace-card-details">
                      <h4>Manual Interview</h4>
                      <p>Schedule a traditional interview with Google Meet and invite participants.</p>
                    </div>
                  </div>

                  <div
                    className={`workspace-selector-card ai-card ${interviewType === "AI" ? "selected" : ""}`}
                    onClick={() => setInterviewType("AI")}
                  >
                    <div className="workspace-card-icon-container">
                      <SiOpenai />
                    </div>
                    <div className="workspace-card-details">
                      <h4>AI Interview</h4>
                      <p>Let engineerHUB AI conduct the complete interview automatically using voice interaction with advance proctoring.</p>
                    </div>
                  </div>
                </div>
              </div>

              {interviewType === "Manual" ? (
                /* --- MANUAL INTERVIEW FORM --- */
                <div className="manual-form-layout animate-fade-in">
                  <div className="form-grid-two-cols">
                    
                    <div className="interview-subject-section wide-col">
                      <label className="subject-label">
                        Interview Subject <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="subject-input"
                        placeholder="e.g., Technical Round, HR Round, System Design, Coding Interview, Final Round"
                        value={interviewSubject}
                        onChange={(e) => setInterviewSubject(e.target.value)}
                        required
                      />
                      <p className="subject-hint">This will be used in emails and calendar invites sent to participants</p>
                    </div>

                    <div className="wide-col">
                      <div className="date-selection">
                        <h5>Select Date</h5>
                        <div className="date-cards">
                          <button
                            className="date-nav prev"
                            onClick={() => handleDateScroll("prev")}
                            disabled={dateScrollIndex === 0}
                          >
                            ‹
                          </button>
                          {availableDates
                            .slice(dateScrollIndex, dateScrollIndex + 4)
                            .map((date, index) => {
                              const formattedDate = formatDate(date);
                              const isSelected =
                                selectedDate === getLocalDateString(date);
                              return (
                                <div
                                  key={index}
                                  className={`date-card ${
                                    isSelected ? "selected" : ""
                                  }`}
                                  onClick={() => handleDateSelect(date)}
                                >
                                  <span>{formattedDate.day}</span>
                                  <span>
                                    {formattedDate.date} {formattedDate.month}
                                  </span>
                                </div>
                              );
                            })}
                          <button
                            className="date-nav next"
                            onClick={() => handleDateScroll("next")}
                            disabled={dateScrollIndex >= availableDates.length - 4}
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="time-selection wide-col">
                      <h5>Select time of the day</h5>
                      <div className="time-inputs">
                        <FormInputTime
                          id="startTime"
                          name="startTime"
                          label="Start Time"
                          value={startTime}
                          setValue={(value) => handleTimeChange("startTime", value)}
                          required
                        />
                        <FormInputTime
                          id="endTime"
                          name="endTime"
                          label="End Time"
                          value={endTime}
                          setValue={(value) => handleTimeChange("endTime", value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="invitee-section wide-col">
                      <label className="invitee-label">
                        Enter the mail to who you want to invite as an interviewer
                        along with you
                      </label>
                      <div className="invitee-input-container">
                        <input
                          type="text"
                          className="subject-input invitee-input"
                          placeholder="Enter Mail Here (Press Enter or Tab to add)"
                          value={inviteeInput}
                          onChange={(e) => setInviteeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
                              if (inviteeInput.trim()) {
                                e.preventDefault();
                                handleAddInvitee();
                              }
                            }
                          }}
                          onBlur={() => {
                            if (inviteeInput.trim()) {
                              handleAddInvitee();
                            }
                          }}
                        />
                      </div>
                      {inviteeEmails.length > 0 && (
                        <div className="invitee-chips-container">
                          <div className="chips-header">
                            Invited Interviewers ({inviteeEmails.length})
                          </div>
                          <div className="invitee-chips-list">
                            {inviteeEmails.map((email, idx) => (
                              <span key={idx} className="invitee-chip">
                                <span className="chip-email">{email}</span>
                                <button
                                  type="button"
                                  className="chip-remove-btn"
                                  onClick={() => handleRemoveInvitee(email)}
                                  title="Remove interviewer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="schedule-summary">
                    <div className="summary-item">
                      <FiCalendar />
                      <div>
                        <span>
                          {selectedDate
                            ? `${formatDate(selectedDate).month} ${
                                formatDate(selectedDate).date
                              }`
                            : "Select a date"}
                        </span>
                        &nbsp; :&nbsp;
                        <span>
                          {startTime && endTime
                            ? `${startTime} - ${endTime}`
                            : startTime 
                            ? `${startTime} - Select end time`
                            : endTime
                            ? `Select start time - ${endTime}`
                            : "Select start and end times"}
                        </span>
                      </div>
                    </div>
                    
                    {startTime && endTime && (
                      <div className={`duration-indicator ${(() => {
                        const start = new Date(`2000-01-01T${startTime}`);
                        const end = new Date(`2000-01-01T${endTime}`);
                        const duration = Math.round((end - start) / (1000 * 60));
                        return duration < 15 ? 'duration-warning' : 'duration-ok';
                      })()}`}>
                        <FiClock />
                        <span>
                          Duration: {(() => {
                            const start = new Date(`2000-01-01T${startTime}`);
                            const end = new Date(`2000-01-01T${endTime}`);
                            const duration = Math.round((end - start) / (1000 * 60));
                            return `${duration} minutes`;
                          })()}
                        </span>
                        {(() => {
                          const start = new Date(`2000-01-01T${startTime}`);
                          const end = new Date(`2000-01-01T${endTime}`);
                          const duration = Math.round((end - start) / (1000 * 60));
                          return duration < 15 && (
                            <span className="warning-text">(Minimum 15 minutes required)</span>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* --- AI AGENT CONFIGURATOR FORM --- */
                <div className="ai-agent-configurator-layout animate-fade-in">
                  
                  <div className="config-grid-layout">
                    
                    {/* Left Column: Config Panel */}
                    <div className="config-panel-column">
                      
                      {/* Section: General */}
                      <div className="config-card-group">
                        <h5 className="group-title">General Config</h5>
                        
                        <div className="config-field">
                          <label className="config-label">Interview Name *</label>
                          <input
                            type="text"
                            className="workspace-text-input"
                            placeholder="e.g. Frontend Developer Round 2"
                            value={aiInterviewSubject}
                            onChange={(e) => setAiInterviewSubject(e.target.value)}
                            required
                          />
                        </div>

                        <div className="config-two-cols-row">
                          <div className="config-field">
                            <label className="config-label">Interview Role</label>
                            <input
                              type="text"
                              className="workspace-text-input"
                              placeholder="e.g., React Specialist"
                              value={aiRole}
                              onChange={(e) => setAiRole(e.target.value)}
                            />
                          </div>

                          <div className="config-field">
                            <label className="config-label">Duration</label>
                            <select
                              className="workspace-select-input"
                              value={aiDuration}
                              onChange={(e) => handleAIDurationChange(e.target.value)}
                            >
                              <option value="15 minutes">15 mins</option>
                              <option value="30 minutes">30 mins</option>
                              <option value="45 minutes">45 mins</option>
                              <option value="60 minutes">60 mins</option>
                              <option value="90 minutes">90 mins</option>
                              <option value="120 minutes">120 mins</option>
                            </select>
                          </div>
                        </div>

                        <div className="config-two-cols-row">
                          <div className="config-field">
                            <label className="config-label">Interview Language</label>
                            <select
                              className="workspace-select-input"
                              value={aiLanguage}
                              onChange={(e) => setAiLanguage(e.target.value)}
                            >
                              <option value="English">English</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Spanish">Spanish</option>
                              <option value="French">French</option>
                              <option value="German">German</option>
                              <option value="Japanese">Japanese</option>
                            </select>
                          </div>

                          <div className="config-field">
                            <label className="config-label">Difficulty</label>
                            <div className="difficulty-pill-selector">
                              {["Easy", "Medium", "Hard", "Expert"].map((level) => (
                                <button
                                  type="button"
                                  key={level}
                                  className={`diff-pill-btn ${aiDifficulty === level ? "selected" : ""}`}
                                  onClick={() => setAiDifficulty(level)}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Topics & Skills Focus */}
                      <div className="config-card-group">
                        <h5 className="group-title">Skills & Evaluation Focus</h5>
                        
                        <div className="config-field">
                          <label className="config-label">Question Focus Topics</label>
                          <div className="workspace-chips-input-container">
                            <div className="workspace-chips-wrap">
                              {aiInterviewTopics.map((topic, idx) => (
                                <span key={idx} className="workspace-ai-chip">
                                  {topic}
                                  <button
                                    type="button"
                                    className="workspace-ai-chip-remove"
                                    onClick={() => setAiInterviewTopics(aiInterviewTopics.filter((_, i) => i !== idx))}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                              <input
                                type="text"
                                className="workspace-chips-input-field"
                                placeholder="Type custom topic & press Enter..."
                                value={aiTopicInput}
                                onChange={(e) => setAiTopicInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
                                    e.preventDefault();
                                    const raw = aiTopicInput.trim();
                                    if (raw) {
                                      const newTags = raw
                                        .split(/[,;\n]+/)
                                        .map((t) => t.trim())
                                        .filter((t) => t.length > 0 && !aiInterviewTopics.includes(t));
                                      if (newTags.length > 0) {
                                        setAiInterviewTopics([...aiInterviewTopics, ...newTags]);
                                        setAiTopicInput("");
                                      }
                                    }
                                  }
                                }}
                                onBlur={() => {
                                  const raw = aiTopicInput.trim();
                                  if (raw) {
                                    const newTags = raw
                                      .split(/[,;\n]+/)
                                      .map((t) => t.trim())
                                      .filter((t) => t.length > 0 && !aiInterviewTopics.includes(t));
                                    if (newTags.length > 0) {
                                      setAiInterviewTopics([...aiInterviewTopics, ...newTags]);
                                      setAiTopicInput("");
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="workspace-recommended-topics">
                            <span className="workspace-rec-label">Quick Add:</span>
                            {["React", "JavaScript", "Node.js", "MongoDB", "REST APIs", "System Design", "DSA", "Behavioral", "Communication"].map((rec) => {
                              const isSelected = aiInterviewTopics.includes(rec);
                              return (
                                <button
                                  key={rec}
                                  type="button"
                                  className={`workspace-rec-tag-btn ${isSelected ? "selected" : ""}`}
                                  onClick={() => {
                                    if (isSelected) {
                                      setAiInterviewTopics(aiInterviewTopics.filter(t => t !== rec));
                                    } else {
                                      setAiInterviewTopics([...aiInterviewTopics, rec]);
                                    }
                                  }}
                                >
                                  {rec}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interview Focus Areas Toggles with Hover Descriptions */}
                        <div className="config-field">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label className="config-label">Interview Focus Areas</label>
                            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#006867" }}>
                              {[aiTechnicalKnowledge, aiProblemSolving, aiCodingRound, aiSystemDesign, aiBehavioralRound, aiCommunication].filter(Boolean).length}/3 Selected
                            </span>
                          </div>
                          <span style={{ fontSize: "0.76rem", color: "#64748b", display: "block", marginBottom: "0.5rem" }}>
                            Select up to 3 focus areas. Vertex AI will cycle question formats matching your selected areas.
                          </span>
                          <div className="assessment-toggles-container" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                            {[
                              {
                                key: "technicalKnowledge",
                                label: "Technical Knowledge",
                                checked: aiTechnicalKnowledge,
                                setChecked: setAiTechnicalKnowledge,
                                description: "Fundamentals, concepts, technologies, and role-specific knowledge",
                              },
                              {
                                key: "problemSolving",
                                label: "Problem Solving",
                                checked: aiProblemSolving,
                                setChecked: setAiProblemSolving,
                                description: "Reasoning, debugging, analytical thinking, and approach to problems",
                              },
                              {
                                key: "coding",
                                label: "Coding & Programming",
                                checked: aiCodingRound,
                                setChecked: setAiCodingRound,
                                description: "Coding concepts, implementation approach, algorithms, and code quality",
                              },
                              {
                                key: "systemDesign",
                                label: "System Design",
                                checked: aiSystemDesign,
                                setChecked: setAiSystemDesign,
                                description: "Architecture, scalability, APIs, databases, and design decisions",
                              },
                              {
                                key: "behavioral",
                                label: "Behavioral",
                                checked: aiBehavioralRound,
                                setChecked: setAiBehavioralRound,
                                description: "Past experiences, decision-making, ownership, adaptability, and teamwork",
                              },
                              {
                                key: "communication",
                                label: "Communication",
                                checked: aiCommunication,
                                setChecked: setAiCommunication,
                                description: "Clarity, explanation, articulation, and ability to communicate technical ideas",
                              },
                            ].map((item) => (
                              <div
                                key={item.key}
                                className="toggle-switch-item focus-area-toggle"
                                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                              >
                                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", margin: 0 }}>
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => {
                                      const isChecking = e.target.checked;
                                      if (isChecking) {
                                        const currentActive = [
                                          aiTechnicalKnowledge,
                                          aiProblemSolving,
                                          aiCodingRound,
                                          aiSystemDesign,
                                          aiBehavioralRound,
                                          aiCommunication,
                                        ].filter(Boolean).length;
                                        if (currentActive >= 3) {
                                          setSnackbarMessage("Maximum 3 Interview Focus Areas can be selected.");
                                          setSnackbarSeverity("warning");
                                          setSnackbarOpen(true);
                                          return;
                                        }
                                      }
                                      item.setChecked(isChecking);
                                    }}
                                  />
                                  <span className="toggle-slider"></span>
                                  <span className="toggle-label">{item.label}</span>
                                </label>

                                <Tooltip
                                  title={
                                    <div style={{ padding: "4px 6px", fontSize: "0.8rem", lineHeight: "1.4" }}>
                                      <strong style={{ display: "block", color: "#a78bfa", marginBottom: "3px" }}>What AI should assess:</strong>
                                      <span>{item.description}</span>
                                    </div>
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <span style={{ display: "inline-flex", alignItems: "center", cursor: "help", padding: "2px" }}>
                                    <FiInfo style={{ color: "#006867", fontSize: "0.9rem", opacity: 0.8 }} />
                                  </span>
                                </Tooltip>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Section: AI Personality & Rigor */}
                      <div className="config-card-group">
                        <h5 className="group-title">AI Agent Rigor & Behavior</h5>
                        
                        <div className="config-two-cols-row">
                          <div className="config-field">
                            <label className="config-label">AI Personality</label>
                            <select
                              className="workspace-select-input"
                              value={aiPersonality}
                              onChange={(e) => setAiPersonality(e.target.value)}
                            >
                              <option value="Conversational">Conversational</option>
                              <option value="Professional">Professional</option>
                              <option value="Friendly">Friendly</option>
                              <option value="Strict">Strict & Rigorous</option>
                            </select>
                          </div>

                          <div className="config-field">
                            <label className="config-label">Strictness Rigor</label>
                            <div className="difficulty-pill-selector purple-acc">
                              {["Low", "Medium", "High"].map((level) => (
                                <button
                                  type="button"
                                  key={level}
                                  className={`diff-pill-btn purple-pill ${aiStrictness === level ? "selected" : ""}`}
                                  onClick={() => setAiStrictness(level)}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="config-field" style={{ marginTop: '0.75rem' }}>
                          <label className="config-label">Evaluation Depth</label>
                          <select
                            className="workspace-select-input"
                            value={aiEvaluationDepth}
                            onChange={(e) => setAiEvaluationDepth(e.target.value)}
                          >
                            <option value="Standard">Standard Assessment (General Report)</option>
                            <option value="Deep">Deep Evaluation (Rigor Analysis)</option>
                            <option value="Comprehensive">Comprehensive Profile (Full Scoring & Recording)</option>
                          </select>
                        </div>

                        <div className="config-field" style={{ marginTop: '0.75rem' }}>
                          <label className="config-label">AI Agent Instructions</label>
                          <textarea
                            className="workspace-ai-textarea"
                            rows={3}
                            placeholder="Instruct the AI interviewer (e.g., Focus on coding standard, ask deep questions...)"
                            value={aiInstructions}
                            onChange={(e) => setAiInstructions(e.target.value)}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Automations & Schedule */}
                    <div className="config-sidebar-column">
                      
                      {/* Section: Autopilot & Reporting */}
                      <div className="config-card-group">
                        <h5 className="group-title">Autopilot Automations</h5>
                        
                        <div className="toggles-list-card">
                          <label className="toggle-switch-item between">
                            <span className="toggle-label-group">
                              <span className="title">Auto proctoring</span>
                              <span className="desc">Monitor tab switches & candidate activity</span>
                            </span>
                            <div className="slider-wrapper">
                              <input
                                type="checkbox"
                                checked={aiAutoRecording}
                                onChange={(e) => setAiAutoRecording(e.target.checked)}
                              />
                              <span className="toggle-slider"></span>
                            </div>
                          </label>

                          <label className="toggle-switch-item between">
                            <span className="toggle-label-group">
                              <span className="title">Auto report generation</span>
                              <span className="desc">Generate assessment scores automatically</span>
                            </span>
                            <div className="slider-wrapper">
                              <input
                                type="checkbox"
                                checked={aiAutoReport}
                                onChange={(e) => setAiAutoReport(e.target.checked)}
                              />
                              <span className="toggle-slider"></span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Section: Date & Time */}
                      <div className="config-card-group">
                        <h5 className="group-title">Schedule Availability</h5>
                        
                        <div className="date-selection ai-purple-theme compact">
                          <div className="date-cards">
                            <button
                              className="date-nav prev"
                              type="button"
                              onClick={() => handleAIDateScroll("prev")}
                              disabled={aiDateScrollIndex === 0}
                            >
                              ‹
                            </button>
                            {availableDates
                              .slice(aiDateScrollIndex, aiDateScrollIndex + 3)
                              .map((date, index) => {
                                const formattedDate = formatDate(date);
                                const isSelected =
                                  aiSelectedDate === getLocalDateString(date);
                                return (
                                  <div
                                    key={index}
                                    className={`date-card ai-date-card ${
                                      isSelected ? "selected" : ""
                                    }`}
                                    onClick={() => handleAIDateSelect(date)}
                                  >
                                    <span>{formattedDate.day}</span>
                                    <span>
                                      {formattedDate.date} {formattedDate.month}
                                    </span>
                                  </div>
                                );
                              })}
                            <button
                              className="date-nav next"
                              type="button"
                              onClick={() => handleAIDateScroll("next")}
                              disabled={aiDateScrollIndex >= availableDates.length - 3}
                            >
                              ›
                            </button>
                          </div>
                        </div>

                        <div className="time-selection compact" style={{ marginTop: '0.75rem' }}>
                          <div className="time-inputs compact-inputs">
                            <FormInputTime
                              id="aiStartTime"
                              name="aiStartTime"
                              label="Start Time"
                              value={aiStartTime}
                              setValue={(value) => handleAITimeChange("aiStartTime", value)}
                              required
                            />
                            <FormInputTime
                              id="aiEndTime"
                              name="aiEndTime"
                              label="End Time"
                              value={aiEndTime}
                              setValue={(value) => handleAITimeChange("aiEndTime", value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="config-field" style={{ marginTop: '0.75rem' }}>
                          <label className="config-label">CC Participants Notifications</label>
                          <div className="workspace-chips-input-container">
                            <div className="workspace-chips-wrap">
                              {aiCCParticipants.map((email, idx) => (
                                <span key={idx} className="workspace-ai-chip email-chip">
                                  {email}
                                  <button
                                    type="button"
                                    className="workspace-ai-chip-remove"
                                    onClick={() => setAiCCParticipants(aiCCParticipants.filter((_, i) => i !== idx))}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                              <input
                                type="email"
                                className="workspace-chips-input-field"
                                placeholder="Enter CC emails..."
                                value={aiCCEmailInput}
                                onChange={(e) => setAiCCEmailInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    const val = aiCCEmailInput.replace(",", "").trim().toLowerCase();
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (val) {
                                      if (!emailRegex.test(val)) {
                                        setSnackbarMessage("Please enter a valid email address");
                                        setSnackbarSeverity("error");
                                        setSnackbarOpen(true);
                                      } else if (!aiCCParticipants.includes(val)) {
                                        setAiCCParticipants([...aiCCParticipants, val]);
                                        setAiCCEmailInput("");
                                      }
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Live summary */}
                      <div className="schedule-summary ai-purple-summary mini">
                        <div className="summary-item ai-purple-summary-item">
                          <FiCalendar />
                          <div>
                            <span>
                              {aiSelectedDate
                                ? `${formatDate(new Date(aiSelectedDate)).month} ${
                                    formatDate(new Date(aiSelectedDate)).date
                                  }`
                                : "Select date"}
                            </span>
                            &nbsp;:&nbsp;
                            <span>
                              {aiStartTime && aiEndTime
                                ? `${aiStartTime} - ${aiEndTime}`
                                : "Select times"}
                            </span>
                            {aiStartTime && aiEndTime && (
                              <span className="summary-duration-tag">
                                ({aiDuration})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="workspace-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowWorkspaceModal(false)}
                disabled={isSchedulingInterview || isSchedulingAI}
              >
                Cancel
              </button>
              
              {interviewType === "Manual" ? (
                <button
                  className="btn-primary"
                  onClick={handleScheduleSubmit}
                  disabled={isSchedulingInterview || !selectedDate || !startTime || !endTime || !interviewSubject.trim() || (() => {
                    if (!startTime || !endTime) return true;
                    const start = new Date(`2000-01-01T${startTime}`);
                    const end = new Date(`2000-01-01T${endTime}`);
                    const duration = Math.round((end - start) / (1000 * 60));
                    return duration < 15;
                  })()}
                >
                  {isSchedulingInterview ? (
                    <>
                      <div className="loading-spinner"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <FiCalendar />
                      Schedule Interview
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="btn-primary ai-purple-schedule-btn glow-btn"
                  onClick={handleAIScheduleSubmit}
                  disabled={isSchedulingAI || !aiSelectedDate || !aiStartTime || !aiEndTime || !aiInterviewSubject.trim()}
                >
                  {isSchedulingAI ? (
                    <>
                      <div className="loading-spinner"></div>
                      Deploying Agent...
                    </>
                  ) : (
                    <>
                      <SiOpenai />
                      Schedule AI Interview
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && scheduledInterview && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h2> Scheduled !</h2>
              <div className="success-icon">
                <div className="checkmark" style={{ backgroundColor: scheduledInterview.interviewType === "AI" ? "#8b5cf6" : "#138382" }}>✓</div>
              </div>
              <p className="interview-details">
                Round {scheduledInterview.interviewRound} Interview scheduled
              </p>
              <p className="candidate-name" style={{justifyContent: 'center'}}>
                with {scheduledInterview.candidateName}
              </p>
              {scheduledInterview.interviewSubject && scheduledInterview.interviewSubject !== `Round ${scheduledInterview.interviewRound}` && (
                <p className="interview-subject">
                  Subject: {scheduledInterview.interviewSubject}
                </p>
              )}
              <div className="meeting-info">
                <div className="meeting-time">
                  <FiCalendar />
                  <div>
                    <span>{moment.utc(scheduledInterview.scheduledDate).format("DD MMM YYYY")}</span> &nbsp; : &nbsp;
                    <span>{scheduledInterview.startTime} - {scheduledInterview.endTime}</span>
                  </div>
                </div>
              </div>
              <p className="meeting-link-info">
                {scheduledInterview.interviewType === "AI"
                  ? "engineerHUB AI interview link has been shared to the candidate & your mail as well."
                  : "Meeting link has been shared to candidate & your mail as well."}
                &nbsp;Check now.
              </p>
              <p className="next-steps">
                Check the Scheduled Lobby for further process.
              </p>
              <button
                className={`btn-primary confirm-continue-btn ${
                  scheduledInterview.interviewType === "AI" ? "ai-confirm-btn" : "manual-confirm-btn"
                }`}
                onClick={closeConfirmationModal}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="crm-board">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Interview Lobby | Job Board</title>
        </Helmet>

        <div className="board-layout">
          {/* Sidebar Navigation */}
          <div className="board-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-logo">
                <div className="logo-icon">
                  {getUserImage() ? (
                    <img 
                      src={getUserImage()} 
                      alt="Profile" 
                      className="user-profile-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
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
                  navigate(
                    `/career/jobs/board/${id}?pageNo=1&limit=30&status=Response`
                  );
                }}
                className="sidebar-nav-btn response-nav-btn"
                title="Response Management"
              >
                <span className="nav-text">Response</span>
              </button>
              <button
                onClick={() => {
                  navigate(
                    `/career/jobs/board/${id}/assessment?assessmentSegment=ScheduleAssessment`
                  );
                }}
                className="sidebar-nav-btn assessment-nav-btn"
                title="Assessment Management"
              >
                <span className="nav-text">Assessment</span>
              </button>
              <button
                className="sidebar-nav-btn interview-nav-btn --active"
                title="Interview Management"
              >
                <span className="nav-text">Interview</span>
              </button>
              <button
                onClick={() => {
                  navigate(computeMyProfilePath());
                }}
                className="sidebar-nav-btn back-nav-btn"
                title="Back to Profile"
              >
                <FiArrowLeft className="back-icon" />
                <span className="nav-text">Back</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <section className="main-container">
            <div className="interview-header">
              <h1 className="page-title">Schedule Interview</h1>
            </div>

            <div className="action-container interview-action-container" style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '1rem', justifyContent: 'flex-start' }}>
              <div className="select-container">
                <div className="select-all">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    checked={
                      selectedRows.length === interviewDataRows.length &&
                      interviewDataRows.length !== 0
                    }
                    onChange={() => {
                      setSelectedRows(
                        selectedRows.length === interviewDataRows.length
                          ? []
                          : interviewDataRows
                      );
                    }}
                  />
                  <label htmlFor="selectAll">
                    Select All ({selectedRows.length}/{interviewDataRows.length}
                    )
                  </label>
                </div>
              </div>
              <div className="interview-segments interview-segments-left" style={{ justifyContent: 'flex-start', margin: '0', gridColumn: '2', justifySelf: 'start' }}>
                <button
                  onClick={() =>
                    setSearchParams(
                      (prev) => {
                        prev.set("interviewSegment", "InterviewLobby");
                        prev.set("pageNo", "1");
                        prev.set("limit", "30");
                        return prev;
                      },
                      { replace: true }
                    )
                  }
                  className={`segment-btn lobby-btn ${
                    params.interviewSegment === "InterviewLobby"
                      ? "--selected"
                      : ""
                  }`}
                >
                  <span>Interview Lobby</span>
                  <span className="count">{segmentCounts.interviewLobby}</span>
                </button>
                <button
                  onClick={() => {
                    navigate(
                      `/career/jobs/board/${id}/interview/scheduled?pageNo=1&limit=30&interviewSegment=ScheduledInterviews`
                    );
                  }}
                  className={`segment-btn scheduled-btn ${
                    params.interviewSegment === "ScheduledInterviews"
                      ? "--selected"
                      : ""
                  }`}
                >
                  <span>Scheduled Interviews</span>
                  <span className="count">{segmentCounts.scheduledInterviews}</span>
                </button>
                <button
                  onClick={() => {
                    navigate(
                      `/career/jobs/board/${id}/interview/report?pageNo=1&limit=30&interviewSegment=Report`
                    );
                  }}
                  className="segment-btn report-btn"
                >
                  <span>Report</span>
                  <span className="count">{segmentCounts.report}</span>
                </button>
              </div>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name, experience..."
                  className="search-input"
                  value={experience}
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    setExperience(searchValue);
                    
                    // Update URL params with search value
                    const newSearchParams = new URLSearchParams(searchParams);
                    if (searchValue.trim()) {
                      newSearchParams.set('exp', searchValue);
                    } else {
                      newSearchParams.delete('exp');
                    }
                    newSearchParams.set('pageNo', '1'); // Reset to first page when searching
                    
                    setSearchParams(newSearchParams);
                  }}
                />
              </div>

            </div>
            <div className="Action-container-above-CRM-board">
              <div className="Bootstrap-jarwis">
                <div className="results-filter">
                  <span className="results-label">Showing</span>
                  <select
                    name="limit"
                    id="limit"
                    value={limit}
                    onChange={(e) => {
                      navigate(
                        `/career/jobs/board/${id}/interview?pageNo=1&limit=${e.target.value}&interviewSegment=${params.interviewSegment}`
                      );
                    }}
                    className="results-select"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                  <span className="results-text">results</span>
                </div>
                <PaginationBarWithSearchParams
                  className="m-0"
                  param="pageNo"
                  pages={pageCount}
                />
              </div>
              
              <div className="download-btn-container">
                {googleAuthToken ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      className="google-connected-btn"
                      disabled
                      title="Google Account Connected&#10;&#10;Your Gmail account is successfully connected.&#10;&#10;You can now schedule interviews and send calendar invites to candidates automatically."
                    >
                      ✓ Google Account Connected

                      
                    </button>
                    <button
                      onClick={clearGoogleAuth}
                      className="google-disconnect-btn"
                      title="Disconnect Google Account&#10;&#10;This will remove the connection to your Gmail account.&#10;&#10;You won't be able to schedule interviews until you reconnect."
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGoogleOAuth}
                    className="google-oauth-btn"
                    title="Connect Google Account&#10;&#10;This allows us to schedule interviews on your behalf and send calendar invites to candidates."
                  >
                    🔗 Connect Google Account
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="download-btn"
                  title={selectedRows.length > 0 ? `Download ${selectedRows.length} selected candidates` : `Download all candidates (${interviewDataRows.length})`}
                >
                  <FiDownload />
                  {isDownloading ? `${progress}%` : selectedRows.length > 0 ? `Download (${selectedRows.length})` : 'Download All'}
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <div className="interview-table">
              <div className="table-header">
                <div className="table-cell checkbox-cell"></div>
                <div className="table-cell name-cell">Name</div>
                <div className="table-cell email-cell">Email</div>
                <div className="table-cell phone-cell">Phone No</div>
                <div className="table-cell resume-cell">Resume</div>
                <div className="table-cell score-cell">AI Score</div>
                <div className="table-cell actions-cell">Actions</div>
              </div>

              {interviewData.isLoading && (
                <div className="loading-state">
                  <Loading />
                </div>
              )}

              {interviewData.isSuccess && interviewDataRows.length === 0 && (
                <div className="no-data-message">
                  <div className="no-data-content">
                    <div className="no-data-icon">
                      <FiInbox />
                    </div>
                    <h4>No Candidates in Interview Lobby</h4>
                    <p>
                      No candidates are currently in the interview lobby. To add candidates:
                    </p>
                    <div className="no-data-steps">
                      <ol>
                        <li>Go to the <strong>Response</strong> Page</li>
                        <li>In the <strong>Processing</strong> segment, you can see the "Mark for Interview" button</li>
                        <li>Mark candidates you want to interview using that button</li>
                        <li>Candidates will automatically appear here for scheduling</li>
                      </ol>
                    </div>

                  </div>
                </div>
              )}

              {interviewData.isSuccess &&
                interviewDataRows.length > 0 &&
                interviewDataRows.map((candidate) => (
                  <InterviewLobbyRow
                    key={candidate._id}
                    data={candidate}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    onScheduleInterview={() =>
                      handleScheduleInterview(candidate)
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
