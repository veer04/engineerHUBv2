import { Fragment, useEffect, useRef, useState } from "react";
import "../JobBoard.css";
import "./InterviewSegment.css";
import { FiDownload, FiUserPlus, FiUserX, FiInbox, FiCalendar, FiClock, FiExternalLink, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
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
import ScheduledInterviewRow from "./ScheduledInterviewRow";
import PaginationBarWithSearchParams from "../../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import FormInput from "../../../../components/FormInputs/FormInput";

export default function ScheduledInterviews() {
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
  const [scheduledDataRows, setScheduledDataRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [experience, setExperience] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnyRowUpdating, setIsAnyRowUpdating] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "reschedule" or "cancel"
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedInterviewForRemark, setSelectedInterviewForRemark] = useState(null);
  const [remarkText, setRemarkText] = useState("");
  const [marksValue, setMarksValue] = useState("");
  const [scheduledInterview, setScheduledInterview] = useState(null);
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

  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const interviewSegment = searchParams.get("interviewSegment");
  const exp = searchParams.get("exp");

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
    interviewSegment: interviewSegment ? interviewSegment : "ScheduledInterviews",
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
        `/career/jobs/board/${id}/interview/scheduled?pageNo=1&limit=30&interviewSegment=ScheduledInterviews`
      );
    }
  }, [pageNo, limit, navigate, id]);

  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };

  // Scheduled interviews data
  const scheduledData = useQuery({
    queryKey: ["scheduledInterviews", id, params.pageNo, params.limit, exp],
    queryFn: async () => {
      console.log("Making API call to scheduled interviews...");
      const url = `${API_URL}api/v1/scheduled-interview?hiringId=${id}&page=${params.pageNo}&limit=${params.limit}${
        exp ? `&search=${exp}` : ""
      }`;
      console.log("URL:", url);
      
      const response = await axios.get(url, config);
      console.log("API Response received:", response);
      console.log("Response data:", response.data);
      
      if (response.data && response.data.success) {
        return response.data.data; // Return the actual data directly
      }
      
      throw new Error("Invalid API response");
    },
    enabled: !!id, // Only run when id is available
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    console.log("useEffect triggered - scheduledData:", scheduledData);
    console.log("scheduledData.isSuccess:", scheduledData.isSuccess);
    console.log("scheduledData.data:", scheduledData.data);
    
    if (scheduledData.isSuccess && scheduledData.data?.interviews) {
      console.log("Setting scheduledDataRows with:", scheduledData.data.interviews);
      setScheduledDataRows(scheduledData.data.interviews);
      setPageCount(
        Math.ceil(
          (scheduledData.data?.pagination?.totalItems || scheduledData.data.interviews.length) /
            (parseInt(limit) || 30)
        )
      );
    } else if (scheduledData.isSuccess && scheduledData.data) {
      // Handle case where data structure is different
      console.log("Data structure check:", scheduledData.data);
    }
  }, [scheduledData, params.interviewSegment, params.pageNo, params.limit]);

  // Debug scheduledDataRows state
  useEffect(() => {
    console.log("scheduledDataRows state changed:", scheduledDataRows);
    console.log("scheduledDataRows length:", scheduledDataRows.length);
  }, [scheduledDataRows]);

  // Debug useQuery state
  useEffect(() => {
    console.log("=== useQuery State Debug ===");
    console.log("scheduledData.isLoading:", scheduledData.isLoading);
    console.log("scheduledData.isSuccess:", scheduledData.isSuccess);
    console.log("scheduledData.isError:", scheduledData.isError);
    console.log("scheduledData.error:", scheduledData.error);
    console.log("scheduledData.data:", scheduledData.data);
    console.log("===========================");
  }, [scheduledData.isLoading, scheduledData.isSuccess, scheduledData.isError, scheduledData.error, scheduledData.data]);



  const handleDownload = async () => {
    const dataToDownload = selectedRows.length > 0 ? selectedRows : scheduledDataRows;
    
    if (dataToDownload.length === 0) {
      setSnackbarMessage("No data available to download");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const interviewsData = dataToDownload.map((interview) => ({
      "Candidate Name": interview.candidateName,
      "Email": interview.candidateEmail,
      "Phone": interview.candidatePhone,
      "Interview Round": `R${interview.interviewRound}`,
      "Interview Subject": interview.interviewSubject || `Round ${interview.interviewRound}`,
      "Scheduled Date": moment(interview.scheduledDate).format("DD/MM/YYYY"),
      "Time": `${interview.startTime} - ${interview.endTime}`,
      "Status": interview.status,
      "Meeting Link": interview.meetingLink,
      "AI Score": `${interview.aiScore}/100`
    }));

    // Create CSV content
    const headers = Object.keys(interviewsData[0]);
    const csvContent = [
      headers.join(','),
      ...interviewsData.map(row => 
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
            link.setAttribute('download', `scheduled-interviews-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          
          setIsDownloading(false);
          setSnackbarMessage(`Downloaded ${selectedRows.length > 0 ? 'selected' : 'all'} interviews (${dataToDownload.length} records)`);
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

  const handleReschedule = (interview) => {
    setSelectedInterview(interview);
    setNewDate(interview.scheduledDate);
    setNewStartTime(interview.startTime);
    setNewEndTime(interview.endTime);
    setActionType("reschedule");
    setShowRescheduleModal(true);
  };

  const handleCancel = (interview) => {
    setSelectedInterview(interview);
    setActionType("cancel");
    setShowConfirmationModal(true);
  };

  const handleJoinMeeting = (meetingLink) => {
    if (meetingLink) {
      window.open(meetingLink, '_blank');
    } else {
      setSnackbarMessage("Meeting link not available. Please check with the interviewer.");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    }
  };

  const submitReschedule = async () => {
    if (!newDate || !newStartTime || !newEndTime) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    try {
      // Mock API call - replace with actual reschedule API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the interview in the list
      setScheduledDataRows(prev => 
        prev.map(interview => 
          interview._id === selectedInterview._id 
            ? { 
                ...interview, 
                scheduledDate: newDate,
                startTime: newStartTime,
                endTime: newEndTime,
                status: "rescheduled",
                updatedAt: new Date().toISOString()
              }
            : interview
        )
      );

      setShowRescheduleModal(false);
      setSnackbarMessage("Interview rescheduled successfully!");
      setSnackbarSeverity("success");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error rescheduling interview:", error);
      setSnackbarMessage("Failed to reschedule interview. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    }
  };

  const confirmCancel = async () => {
    try {
      // Mock API call - replace with actual cancel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove the interview from the list or update status
      setScheduledDataRows(prev => 
        prev.map(interview => 
          interview._id === selectedInterview._id 
            ? { ...interview, status: "cancelled", updatedAt: new Date().toISOString() }
            : interview
        )
      );

      setShowConfirmationModal(false);
      setSnackbarMessage("Interview cancelled successfully!");
      setSnackbarSeverity("success");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error cancelling interview:", error);
      setSnackbarMessage("Failed to cancel interview. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    }
  };

  const handleAddRemark = (interview) => {
    setSelectedInterviewForRemark(interview);
    setRemarkText("");
    setMarksValue("");
    setShowRemarkModal(true);
  };

  const submitRemark = async () => {
    if (!marksValue.trim()) {
      setSnackbarMessage("Please enter candidate marks");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    const marksNum = parseFloat(marksValue);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      setSnackbarMessage("Marks must be between 0 and 100");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    try {
      // Real API call to add interview marks and remark
      const response = await axios.post(
        `${API_URL}api/v1/interview-report`,
        {
          hiringId: id,
          candidateId: selectedInterviewForRemark.candidateId,
          interviewRound: selectedInterviewForRemark.interviewRound,
          scheduledInterviewId: selectedInterviewForRemark._id,
          marks: marksNum,
          remark: remarkText.trim(),
        },
        config
      );

      setShowRemarkModal(false);
      setRemarkText("");
      setMarksValue("");
      setSnackbarMessage("Marks and feedback added successfully!");
      setSnackbarSeverity("success");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ["Interview", "scheduled"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Interview", "report"],
      });
      queryClient.invalidateQueries({
        queryKey: ["interview-segment-counts"],
      });

    } catch (error) {
      console.error("Error adding remark:", error);
      setSnackbarMessage(error.response?.data?.message || "Failed to add marks and feedback. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="modal-overlay">
          <div className="schedule-modal">
            <div className="modal-header">
              <h3>Reschedule Interview</h3>
              <button 
                className="close-btn"
                onClick={() => setShowRescheduleModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="candidate-info">
                <h4>Candidate: {selectedInterview?.candidateName}</h4>
                <p>Current: {moment(selectedInterview?.scheduledDate).format("DD MMM YYYY")} at {selectedInterview?.startTime} - {selectedInterview?.endTime}</p>
              </div>

              <div className="reschedule-form">
                <FormInput
                  id="newDate"
                  name="newDate"
                  label="New Date"
                  type="date"
                  value={newDate}
                  setValue={setNewDate}
                  required
                />
                <div className="time-inputs">
                  <FormInput
                    id="newStartTime"
                    name="newStartTime"
                    label="Start Time"
                    type="time"
                    value={newStartTime}
                    setValue={setNewStartTime}
                    required
                  />
                  <FormInput
                    id="newEndTime"
                    name="newEndTime"
                    label="End Time"
                    type="time"
                    value={newEndTime}
                    setValue={setNewEndTime}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowRescheduleModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={submitReschedule}
              >
                Reschedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h2>Cancel Interview?</h2>
              <div className="warning-icon">
                <div className="warning-mark">!</div>
              </div>
              <p className="confirm-text">
                Are you sure you want to cancel the interview with {selectedInterview?.candidateName}?
              </p>
              <p className="confirm-details">
                Scheduled for {moment(selectedInterview?.scheduledDate).format("DD MMM YYYY")} at {selectedInterview?.startTime}
              </p>
              <p className="confirm-warning">
                This action cannot be undone. Both candidate and interviewers will be notified.
              </p>
              <div className="confirm-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Keep Interview
                </button>
                <button 
                  className="btn-danger"
                  onClick={confirmCancel}
                >
                  Cancel Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remark Modal */}
      {/* Remark / Feedback Evaluation Modal */}
      {showRemarkModal && (
        <div className="modal-overlay">
          <div className="remark-modal">
            <div className="modal-header">
              <h3 style={{color: '#ffffff'}}>Add Marks & Feedback</h3>
              <button 
                className="close-btn"
                onClick={() => setShowRemarkModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="candidate-info">
                <h4>Candidate: {selectedInterviewForRemark?.candidateName}</h4>
                <p>Interview: Round {selectedInterviewForRemark?.interviewRound} on {moment(selectedInterviewForRemark?.scheduledDate).format("DD MMM YYYY")}</p>
              </div>

              <div className="remark-form">
                <label htmlFor="marksValue" className="remark-label">
                  Marks (out of 100): <span className="required-mark" style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  id="marksValue"
                  name="marksValue"
                  value={marksValue}
                  onChange={(e) => setMarksValue(e.target.value)}
                  placeholder="Enter marks out of 100 (e.g. 85)"
                  className="remark-input"
                  min="0"
                  max="100"
                  step="1"
                  required
                />
                
                <label htmlFor="remarkText" className="remark-label" style={{ marginTop: '1rem' }}>
                  Feedback / Detailed Notes: <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'normal' }}>(Optional)</span>
                </label>
                <textarea
                  id="remarkText"
                  name="remarkText"
                  value={remarkText}
                  onChange={(e) => setRemarkText(e.target.value)}
                  placeholder="Enter candidate evaluation feedback, technical notes, or general observations (optional)..."
                  className="remark-textarea"
                  rows={4}
                />
                <p className="remark-hint">
                  These marks and feedback will appear in the Report section after evaluation.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowRemarkModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={submitRemark}
              >
                Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="crm-board">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Scheduled Interviews | Job Board</title>
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
                  navigate(`/career/jobs/board/${id}?pageNo=1&limit=30&status=Response`);
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
                onClick={() => navigate(computeMyProfilePath())}
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
              <h1 className="page-title">Scheduled Interviews</h1>
              
            </div>

            <div className="action-container interview-action-container" style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '1rem', justifyContent: 'flex-start' }}>
              <div className="select-container">
                <div className="select-all">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    checked={
                      selectedRows.length === scheduledDataRows.length &&
                      scheduledDataRows.length !== 0
                    }
                    onChange={() => {
                      setSelectedRows(
                        selectedRows.length === scheduledDataRows.length
                          ? []
                          : scheduledDataRows
                      );
                    }}
                  />
                  <label htmlFor="selectAll">
                    Select All ({selectedRows.length}/{scheduledDataRows.length})
                  </label>
                  <FiDownload className="download-selected-icon" />
                </div>
              </div>
              <div className="interview-segments interview-segments-left" style={{ justifyContent: 'flex-start', margin: '0', gridColumn: '2', justifySelf: 'start' }}>
                <button
                  onClick={() => {
                    navigate(`/career/jobs/board/${id}/interview?pageNo=1&limit=30&interviewSegment=InterviewLobby`);
                  }}
                  className="segment-btn lobby-btn"
                >
                  <span>Interview Lobby</span>
                  <span className="count">{segmentCounts.interviewLobby}</span>
                </button>
                <button
                  className={`segment-btn scheduled-btn --selected`}
                >
                  <span>Scheduled Interviews</span>
                  <span className="count">{segmentCounts.scheduledInterviews}</span>
                </button>
                <button
                  onClick={() => {
                    navigate(`/career/jobs/board/${id}/interview/report?pageNo=1&limit=30&interviewSegment=Report`);
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
                    
                    // Navigate to maintain the correct path for scheduled interviews
                    navigate(`/career/jobs/board/${id}/interview/scheduled?${newSearchParams.toString()}`);
                  }}
                />
              </div>
              
            </div>

            <div className="Action-container-above-CRM-board">

            <div className="d-flex justify-content-between align-items-center w-100 mb-3">
              <div className="results-filter">
                <span className="results-label">Showing</span>
                <select
                  name="limit"
                  id="limit"
                  value={limit}
                  onChange={(e) => {
                    navigate(
                      `/career/jobs/board/${id}/interview/scheduled?pageNo=1&limit=${e.target.value}&interviewSegment=${params.interviewSegment}`
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
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="download-btn"
                title={selectedRows.length > 0 ? `Download ${selectedRows.length} selected interviews` : `Download all interviews (${scheduledDataRows.length})`}
              >
                <FiDownload />
                {isDownloading ? `${progress}%` : selectedRows.length > 0 ? `Download (${selectedRows.length})` : 'Download All'}
              </button>
              </div>
            
            </div>

            <div className="table-wrapper">
              <div className="interview-table scheduled-table">
              <div className="table-header">
                <div className="table-cell checkbox-cell"></div>
                <div className="table-cell name-cell">
                  Name
                  <BiSort className="sort-icon" />
                </div>
                <div className="table-cell mobile-cell">Mobile Number</div>
                <div className="table-cell resume-cell">Resume</div>
                <div className="table-cell datetime-cell">Date & Time</div>
                <div className="table-cell round-cell">Round</div>
                <div className="table-cell actions-cell">Actions</div>
                <div className="table-cell remark-cell">Add Remark</div>
              </div>

              {scheduledData.isLoading && (
                <div className="loading-state">
                  <Loading />
                </div>
              )}

              {(() => {
                console.log("Table rendering debug:");
                console.log("scheduledData.isSuccess:", scheduledData.isSuccess);
                console.log("scheduledDataRows.length:", scheduledDataRows.length);
                console.log("scheduledDataRows:", scheduledDataRows);
                
                if (scheduledData.isSuccess && scheduledDataRows.length === 0) {
                  console.log("Showing no-data-message");
                  return (
                    <div className="no-data-message">
                      <div className="no-data-content">
                        <div className="no-data-icon">
                          <FiCalendar />
                        </div>
                        <h4>No Scheduled Interviews</h4>
                        <p>
                          No interviews have been scheduled yet. 
                          Schedule interviews from the Interview Lobby to see them here.
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {scheduledData.isSuccess &&
                scheduledDataRows.length > 0 &&
                scheduledDataRows.map((interview) => (
                  <ScheduledInterviewRow
                    key={interview._id}
                    data={interview}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    onReschedule={() => handleReschedule(interview)}
                    onCancel={() => handleCancel(interview)}
                    onJoinMeeting={() => handleJoinMeeting(interview.googleMeetLink)}
                    onAddRemark={() => handleAddRemark(interview)}
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
