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
} from "react-icons/fi";
import { MdDeleteOutline, MdMailOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BiSort } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiOpenai } from "react-icons/si";
import Loading from "../../../../components/Loader/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
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
  const [googleAuthToken, setGoogleAuthToken] = useState(
    localStorage.getItem('googleAuthToken') || null
  );
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
            setGoogleAuthToken(event.data.accessToken);
            localStorage.setItem('googleAuthToken', event.data.accessToken);
            
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

  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };

  // Mock data for now - will be replaced with actual API calls
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
    setShowScheduleModal(true);
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

  const handleDateSelect = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
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
      day: dayNames[date.getDay()],
      date: date.getDate(),
      month: monthNames[date.getMonth()],
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
      setShowScheduleModal(false);
      setShowConfirmationModal(true);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ["Interview", "lobby", params.pageNo, params.limit, id, params.interviewSegment, exp],
      });

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
          errorMessage.includes('expired')) {
        clearGoogleAuth();
        setSnackbarMessage("Google authentication expired. Please reconnect and try again.");
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

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setScheduledInterview(null);
    setSelectedCandidate(null);
  };

  return (
    <>
      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="schedule-modal">
            <div className="modal-header professional-header">
              <div className="header-content">
                <div className="header-icon">
                  <FiCalendar />
                </div>
                <div className="header-text">
                  <h3>Schedule Interview</h3>
                  <p className="header-subtitle">Set up interview details and send calendar invites</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowScheduleModal(false)}
                disabled={isSchedulingInterview}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="candidate-info">
                <h4>
                  Candidate: {selectedCandidate?.candidateName || 'Unknown'}
                </h4>
                <p>Email: {selectedCandidate?.candidateEmail || 'Not provided'}</p>
                <p>Round: {interviewRound || 1}</p>
              </div>

              <div className="interview-subject-section">
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
                        selectedDate === date.toISOString().split("T")[0];
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

              <div className="time-selection">
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

              <div className="invitee-section">
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

              <div className="schedule-summary">
                <div className="summary-item">
                  <FiCalendar />
                  <div>
                    <span>
                      {selectedDate
                        ? `${formatDate(new Date(selectedDate)).month} ${
                            formatDate(new Date(selectedDate)).date
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
                
                {/* Duration indicator */}
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

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowScheduleModal(false)}
                disabled={isSchedulingInterview}
              >
                Cancel
              </button>
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
                <div className="checkmark">✓</div>
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
                    <span>{moment(scheduledInterview.scheduledDate).format("DD MMM YYYY")}</span> &nbsp; : &nbsp;
                    <span>{scheduledInterview.startTime} - {scheduledInterview.endTime}</span>
                  </div>
                </div>
              </div>
              <p className="meeting-link-info">
                Meeting link has been shared to candidate & your mail as well.
                Check now.
              </p>
              <p className="next-steps">
                Check the Scheduled Lobby for further process.
              </p>
              <button className="btn-primary" onClick={closeConfirmationModal} >
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
