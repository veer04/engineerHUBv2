import { Fragment, useEffect, useRef, useState } from "react";
import "../JobBoard.css";
import "./InterviewSegment.css";
import { FiDownload, FiUser, FiMail, FiPhone, FiFileText, FiEye, FiArrowLeft } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import Loading from "../../../../components/Loader/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getAccessToken, getUserFullName, getUserImage, getUserRole, getUserId } from "../../../../features/User/UserDetails";
import PaginationBarWithSearchParams from "../../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";

export default function Report() {
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
  const [reportDataRows, setReportDataRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [experience, setExperience] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
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
    interviewSegment: interviewSegment ? interviewSegment : "Report",
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
        `/career/jobs/board/${id}/interview/report?pageNo=1&limit=30&interviewSegment=Report`
      );
    }
  }, [pageNo, limit, navigate, id]);

  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };

  // Mock data for interview reports
  const reportData = useQuery({
    queryKey: [
      "Interview",
      "report",
      params.pageNo,
      params.limit,
      id,
      params.interviewSegment,
      exp,
    ],
    queryFn: () => {
      // Real API call to get interview reports
      return axios
        .get(
          `${API_URL}api/v1/interview-report?hiringId=${id}&page=${params.pageNo}&limit=${params.limit}${
            exp ? `&search=${exp}` : ""
          }`,
          config
        )
        .then((res) => res.data);
    },
    staleTime: 0, // Always fetch fresh data for debugging
    cacheTime: 0, // Don't cache for debugging
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (reportData.isSuccess && reportData.data?.data?.candidates) {
      
      // Convert to the format expected by the UI
      const processedReports = reportData.data.data.candidates.map((candidate, index) => ({
        _id: candidate.candidateId || `candidate-${index}`,
        candidateName: candidate.candidateName || "Unknown Candidate",
        candidateEmail: candidate.candidateEmail || "N/A",
        candidatePhone: candidate.candidatePhone || "N/A",
        resumeUrl: candidate.resumeUrl || "#",
        status: "completed",
        averageMarks: candidate.averageMarks || "0",
        totalRounds: candidate.totalRounds || 0,
        interviewRounds: (candidate.reports || []).map(report => ({
            round: report.interviewRound || 1,
            marks: report.marks || 0,
            maxMarks: 10,
            note: report.remark || "No remarks",
            interviewer: report.addedByEmail || "Unknown",
            invitedInterviewer: report.scheduledInterviewId?.interviewers?.[0]?.email || "Not Assigned",
            interviewDate: report.addedAt || new Date().toISOString(),
            interviewSubject: (() => {
              const subject = report.scheduledInterviewId?.interviewSubject;
              const roundNum = report.interviewRound || 1;
              
              // If subject is valid and not "Round undefined", use it
              if (typeof subject === 'string' && 
                  subject.trim() !== '' && 
                  subject !== 'Round undefined' &&
                  !subject.includes('undefined')) {
                return subject;
              }
              
              // Otherwise use the current round number as fallback
              return `Round ${roundNum}`;
            })()
        }))
      }));
      
      setReportDataRows(processedReports);
      setPageCount(
        Math.ceil(
          (reportData.data?.data?.pagination?.totalItems || processedReports.length) /
            (parseInt(limit) || 30)
        )
      );
    } else if (reportData.isSuccess) {
      // Handle case where data exists but no candidates
      setReportDataRows([]);
      setPageCount(1);
    }
  }, [reportData, params.interviewSegment, params.pageNo, params.limit, limit]);

  const handleDownload = async () => {
    const dataToDownload = selectedRows.length > 0 ? selectedRows : reportDataRows;
    
    if (dataToDownload.length === 0) {
      setSnackbarMessage("No data available to download");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const reportsData = dataToDownload.map((report) => ({
      "Candidate Name": report.candidateName,
      "Email": report.candidateEmail,
      "Phone": report.candidatePhone,
      "Total Rounds": report.totalRounds,
      "Average Marks": `${report.averageMarks}/10`,
      "Interview Rounds Completed": report.interviewRounds?.length || 0,
      "Resume Link": report.resumeUrl,
      "Interview Details": report.interviewRounds?.map(round => 
        `Round ${round.round} (${round.interviewSubject}): ${round.marks}/${round.maxMarks} by ${round.interviewer}`
      ).join('; ') || 'No rounds completed'
    }));

    // Create CSV content
    const headers = Object.keys(reportsData[0]);
    const csvContent = [
      headers.join(','),
      ...reportsData.map(row => 
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
            link.setAttribute('download', `interview-reports-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          
          setIsDownloading(false);
          setSnackbarMessage(`Downloaded ${selectedRows.length > 0 ? 'selected' : 'all'} reports (${dataToDownload.length} records)`);
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

  const handleResumeClick = (resumeUrl) => {
    console.log("Resume URL:", resumeUrl);
    if (resumeUrl && resumeUrl !== "#" && resumeUrl !== "") {
      // Check if the resume link is ending with doc or docx then add to the starting this link "http://docs.google.com/gview?url=" else open the link
      const url = resumeUrl.endsWith("doc") || resumeUrl.endsWith("docx")
        ? `http://docs.google.com/gview?url=${resumeUrl}`
        : resumeUrl;
      
      console.log("Opening URL:", url);
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.log("No resume URL available or invalid URL:", resumeUrl);
      setSnackbarMessage("No resume available for this candidate");
      setSnackbarSeverity("warning");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
    }
  };

  const handleReadNote = (note) => {
    setSelectedNote(note);
    setShowNoteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "selected":
        return { bg: "#f0f9f4", color: "#065f46", border: "#10b981" };
      case "rejected":
        return { bg: "#fef2f2", color: "#dc2626", border: "#f87171" };
      case "in_progress":
        return { bg: "#f0f9ff", color: "#0369a1", border: "#0ea5e9" };
      case "completed":
        return { bg: "#f0f9f4", color: "#065f46", border: "#10b981" };
      default:
        return { bg: "#f9fafb", color: "#6b7280", border: "#d1d5db" };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "selected": return "Selected";
      case "rejected": return "Rejected";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <>
      {/* Note Modal */}
      {showNoteModal && selectedNote && (
        <div className="modal-overlay">
          <div className="note-modal">
            <div className="modal-header">
              <h3>Interview Note - Round {selectedNote.round}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowNoteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="note-details">
                <div className="note-meta">
                  <p><strong>Interviewer:</strong> {selectedNote.interviewer}</p>
                  <p><strong>Date:</strong> {moment(selectedNote.interviewDate).format("DD MMM YYYY")}</p>
                  <p><strong>Marks:</strong> {selectedNote.marks}/{selectedNote.maxMarks}</p>
                </div>
                <div className="note-content">
                  <h4>Feedback:</h4>
                  <p>{selectedNote.note}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-primary"
                onClick={() => setShowNoteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="crm-board">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Interview Report | Job Board</title>
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
                        if (e.target && e.target.style) {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling && e.target.nextSibling.style) {
                            e.target.nextSibling.style.display = 'block';
                          }
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
              <h1 className="page-title">Interview Report</h1>

            </div>

            <div className="action-container interview-action-container" style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '1rem', justifyContent: 'flex-start' }}>
              <div className="select-container">
                <div className="select-all">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    checked={
                      selectedRows.length === reportDataRows.length &&
                      reportDataRows.length !== 0
                    }
                    onChange={() => {
                      setSelectedRows(
                        selectedRows.length === reportDataRows.length
                          ? []
                          : reportDataRows
                      );
                    }}
                  />
                  <label htmlFor="selectAll">
                    Select All ({selectedRows.length}/{reportDataRows.length})
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
                  onClick={() => {
                    navigate(`/career/jobs/board/${id}/interview/scheduled?pageNo=1&limit=30&interviewSegment=ScheduledInterviews`);
                  }}
                  className="segment-btn scheduled-btn"
                >
                  <span>Scheduled Interviews</span>
                  <span className="count">{segmentCounts.scheduledInterviews}</span>
                </button>
                <button
                  className="segment-btn report-btn --selected"
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
                    
                    // Navigate to maintain the correct path for reports
                    navigate(`/career/jobs/board/${id}/interview/report?${newSearchParams.toString()}`);
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
                      `/career/jobs/board/${id}/interview/report?pageNo=1&limit=${e.target.value}&interviewSegment=${params.interviewSegment}`
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
                title={selectedRows.length > 0 ? `Download ${selectedRows.length} selected reports` : `Download all reports (${reportDataRows.length})`}
              >
                <FiDownload />
                {isDownloading ? `${progress}%` : selectedRows.length > 0 ? `Download (${selectedRows.length})` : 'Download All'}
              </button>
            </div>
            </div>

            <div className="report-container">
              {reportData.isLoading && (
                <div className="loading-state">
                  <Loading />
                </div>
              )}


              {reportData.isSuccess &&
                reportDataRows.length === 0 && (
                  <div className="no-data-message">
                    <div className="no-data-content">
                      <div className="no-data-icon">
                        <FiFileText />
                      </div>
                      <h4>No Interview Reports</h4>
                      <p>
                        No interview reports available yet. 
                        Complete interviews to see reports here.
                      </p>
                    </div>
                  </div>
                )}

              {reportData.isSuccess &&
                reportDataRows.length > 0 &&
                reportDataRows.map((report, index) => (
                  <div key={report._id} className="modern-report-card">
                    {/* Card Header with Candidate Info */}
                    <div className="card-header">
                      <div className="selection-area">
                        <input
                          type="checkbox"
                          className="candidate-checkbox"
                          checked={selectedRows.find((row) => row._id === report._id)}
                          onChange={() => {
                            if (selectedRows.find((row) => row._id === report._id)) {
                              setSelectedRows(selectedRows.filter((row) => row._id !== report._id));
                            } else {
                              setSelectedRows([...selectedRows, report]);
                            }
                          }}
                        />
                        <span className="candidate-index">{index + 1}.</span>
                      </div>
                      
                      <div className="candidate-profile">
                        <div className="profile-avatar">
                          <FiUser className="avatar-icon" />
                        </div>
                        <div className="profile-details">
                          <h3 className="candidate-name">{report.candidateName}</h3>
                          <div className="contact-info">
                            <div className="contact-item">
                              <FiMail className="contact-icon" />
                              <span className="contact-text">{report.candidateEmail}</span>
                            </div>
                            <div className="contact-item">
                              <FiPhone className="contact-icon" />
                              <span className="contact-text">{report.candidatePhone || "N/A"}</span>
                            </div>
                            <div className="contact-item">
                              <button
                                className="resume-link-btn"
                                onClick={() => handleResumeClick(report.resumeUrl)}
                                title="View Resume"
                              >
                                <FiFileText className="contact-icon" />
                                <span className="contact-text">Resume</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="action-area">
                        {/* Action area is now empty since we moved the rounds badge */}
                      </div>
                    </div>
                    
                    {/* Interview Rounds Section */}
                    <div className="rounds-section">
                      <div className="section-title">
                        <span>Interview Performance</span>
                        <div className="performance-indicator">
                          <span className="total-score">{report.totalRounds > 0 ? `Avg: ${report.averageMarks}/10` : 'Pending'}</span>
                          <span className="rounds-badge">{report.totalRounds} Round{report.totalRounds !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      <div className="rounds-grid">
                        {(() => {
                          // Only show rounds that have actual data (completed interviews)
                          const completedRounds = report.interviewRounds.map(r => r.round).sort((a, b) => a - b);
                          console.log(`Candidate ${report.candidateName}: totalRounds=${report.totalRounds}, completedRounds=${completedRounds}, showing ${completedRounds.length} rounds`);
                          return completedRounds;
                        })().map((round) => {
                          const roundData = report.interviewRounds.find(r => r.round === round);
                          return (
                            <div key={round} className="round-card completed">
                              <div className="round-header">
                                <div className="round-info">
                                  <span className="round-label">Round {round}</span>
                                  {roundData.interviewSubject && 
                                   typeof roundData.interviewSubject === 'string' &&
                                   roundData.interviewSubject.trim() !== '' &&
                                   roundData.interviewSubject !== `Round ${round}` &&
                                   !roundData.interviewSubject.includes('undefined') && (
                                    <span className="round-subject">{roundData.interviewSubject}</span>
                                  )}
                                </div>
                                <div className="round-status">
                                  <span className="status-dot"></span>
                                  <span className="status-text">Completed</span>
                                </div>
                              </div>
                              
                              <div className="round-content">
                                <div className="score-display">
                                  <div className="interviewer-info">
                                    <div className="interviewer-label">Interviewer</div>
                                    <div className="interviewer-email">{roundData.interviewer}</div>
                                    <div className="interviewer-role">Admin</div>
                                    <div className="invited-interviewer">
                                      <span className="invited-label">Invited:</span>
                                      <span className="invited-email">{roundData.invitedInterviewer}</span>
                                    </div>
                                  </div>
                                  <div className="score-visual">
                                    <div className="score-circle">
                                      <span className="score-number">{roundData.marks}</span>
                                      <span className="score-total">/{roundData.maxMarks}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <button
                                  className="feedback-btn"
                                  onClick={() => handleReadNote(roundData)}
                                >
                                  <FiEye className="feedback-icon" />
                                  View Feedback
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {report.interviewRounds.length === 0 && (
                        <div className="no-interviews-message">
                          <p>No completed interviews found for this candidate.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
