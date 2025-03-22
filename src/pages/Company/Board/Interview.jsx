import { Fragment, useEffect, useRef, useState } from "react";
import "./Interview.css";
import { FiDownload, FiMenu } from "react-icons/fi";
import Loading from "../../../components/Loader/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getAccessToken } from "../../../features/User/UserDetails";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import JobBoardSidebar from "./JobBoardSidebar";

// Dummy data for initial development
const dummyInterviewData = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    resumeUrl: "https://example.com/resume1.pdf",
    hasAnswered: true,
    score: 85,
    status: "lobby"
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    resumeUrl: "https://example.com/resume2.pdf",
    hasAnswered: false,
    score: null,
    status: "lobby"
  },
  {
    _id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    resumeUrl: "https://example.com/resume3.pdf",
    hasAnswered: true,
    score: 92,
    status: "scheduled",
    interviewDate: "2024-03-25T10:00:00",
    interviewer: "Sarah Wilson"
  },
  {
    _id: "4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.b@example.com",
    resumeUrl: "https://example.com/resume4.pdf",
    hasAnswered: true,
    score: 88,
    status: "scheduled",
    interviewDate: "2024-03-26T14:30:00",
    interviewer: "David Thompson"
  }
];

const InterviewRow = ({ data, selectedRows, setSelectedRows, onSchedule, activeTab }) => {
  if (activeTab === "scheduled") {
    return (
      <>
        <div className="table-item table-cell-1">
          <input
            type="checkbox"
            checked={selectedRows.some((row) => row._id === data._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRows([...selectedRows, data]);
              } else {
                setSelectedRows(selectedRows.filter((row) => row._id !== data._id));
              }
            }}
          />
        </div>
        <div className="table-item table-cell-2 body-sm-regular">
          {data.firstName} {data.lastName}
        </div>
        <div className="table-item table-cell-3 body-sm-regular">{data.email}</div>
        <div className="table-item table-cell-4 body-sm-regular">
          {new Date(data.interviewDate).toLocaleString()}
        </div>
        <div className="table-item table-cell-5 body-sm-regular">
          {data.interviewer}
        </div>
        <div className="table-item table-cell-6 body-sm-regular">
          {data.score}%
        </div>
        <div className="table-item table-cell-7 body-sm-regular">
          <button
            onClick={() => onSchedule(data)}
            className="reschedule-btn"
          >
            Reschedule
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="table-item table-cell-1">
        <input
          type="checkbox"
          checked={selectedRows.some((row) => row._id === data._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, data]);
            } else {
              setSelectedRows(selectedRows.filter((row) => row._id !== data._id));
            }
          }}
        />
      </div>
      <div className="table-item table-cell-2 body-sm-regular">
        {data.firstName} {data.lastName}
      </div>
      <div className="table-item table-cell-3 body-sm-regular">{data.email}</div>
      <div className="table-item table-cell-4 body-sm-regular">
        <a
          href={data.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
        >
          View Resume
        </a>
      </div>
      <div className="table-item table-cell-5 body-sm-regular">
        {data.hasAnswered ? "Yes" : "No"}
      </div>
      <div className="table-item table-cell-6 body-sm-regular">
        {data.score !== null ? `${data.score}%` : "N/A"}
      </div>
      <div className="table-item table-cell-7 body-sm-regular">
        <button
          onClick={() => onSchedule(data)}
          className="schedule-btn"
          disabled={!data.hasAnswered}
        >
          Schedule
        </button>
      </div>
    </>
  );
};

export default function Interview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams({
    pageNo: "",
    limit: "",
  });
  const [interviewDataRows, setInterviewDataRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [candidateCounts, setCandidateCounts] = useState({
    lobby: 0,
    scheduled: 0,
    finalized: 0,
    rejected: 0
  });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const [activeTab, setActiveTab] = useState("lobby");

  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate(`/career/jobs/assessment/Interview/${id}?pageNo=1&limit=30`);
    }
  }, []);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  // Query for fetching interview data
  const interviewData = useQuery({
    queryKey: ["Interviews", id, params.pageNo, params.limit],
    queryFn: () =>
      // For now, return dummy data
      // In production, this would be an API call:
      // axios.get(`${API_URL}api/v1/hiringDashboard/interviews/${id}?page=${params.pageNo}&limit=${params.limit}`, config)
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              data: {
                interviews: dummyInterviewData,
                totalInterviews: dummyInterviewData.length,
              },
            },
          });
        }, 1000);
      }),
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  useEffect(() => {
    if (interviewData.isSuccess) {
      setInterviewDataRows(interviewData.data.data.data.interviews);
      setPageCount(
        Math.ceil(
          interviewData.data.data.data.totalInterviews / parseInt(params.limit)
        )
      );
      
      // Update candidate counts (this is dummy data, replace with actual API data)
      setCandidateCounts({
        lobby: 12,
        scheduled: 5,
        finalized: 3,
        rejected: 2
      });
    }
  }, [interviewData.data]);

  const handleScheduleInterview = (candidate) => {
    // TODO: Implement interview scheduling logic
    setSnackbarMessage("Interview scheduling feature coming soon!");
    setSnackbarSeverity("info");
    setSnackbarDuration(3000);
    setSnackbarOpen(true);
  };

  const handleBulkSchedule = () => {
    if (selectedRows.length === 0) {
      setSnackbarMessage("Please select at least one candidate");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }
    // TODO: Implement bulk interview scheduling logic
    setSnackbarMessage("Bulk scheduling feature coming soon!");
    setSnackbarSeverity("info");
    setSnackbarDuration(3000);
    setSnackbarOpen(true);
  };

  return (
    <>
      <button 
        className="main-menu-toggle"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        aria-label="Toggle menu"
      >
        <FiMenu />
      </button>
      <JobBoardSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className={`interview-board ${!isSidebarCollapsed ? 'expanded' : ''}`}>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Interview Board</title>
        </Helmet>
        <section className="main-container">
          <div className="heading heading-sm">
            <h1>Scheduled Interview</h1>
          </div>
          <div className="table-title heading-sm">
            <h2>View Assessment Responses</h2>
          </div>
          <div className="interview-tabs">
            <button 
              className={`tab-btn ${activeTab === 'lobby' ? 'active' : ''}`}
              onClick={() => setActiveTab('lobby')}
            >
              Interview Lobby
              <span className="tab-count">{candidateCounts.lobby}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              Schedule Interviews
              <span className="tab-count">{candidateCounts.scheduled}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'finalized' ? 'active' : ''}`}
              onClick={() => setActiveTab('finalized')}
            >
              Finalized
              <span className="tab-count">{candidateCounts.finalized}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected
              <span className="tab-count">{candidateCounts.rejected}</span>
            </button>
          </div>
          <div className="action-container">
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
                <label htmlFor="selectAll" className="body-sm-regular">
                  Select All{" "}
                  {`(${selectedRows.length}/${interviewDataRows.length})`}
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <div className="d-flex align-items-center gap-1">
              <span>Showing</span>
              <select
                name="limit"
                id="limit"
                value={limit}
                onChange={(e) => {
                  navigate(
                    `/career/jobs/assessment/Interview/${id}?pageNo=1&limit=${e.target.value}`
                  );
                }}
                className="form-select form-select-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                Showing {((parseInt(pageNo) - 1) * parseInt(limit)) + 1} to{" "}
                {Math.min(
                  parseInt(pageNo) * parseInt(limit),
                  interviewData?.data?.data?.data?.totalInterviews || 0
                )}{" "}
                of {interviewData?.data?.data?.data?.totalInterviews || 0} entries
              </span>
              <PaginationBarWithSearchParams
                className="m-0"
                param="pageNo"
                pages={pageCount}
              />
            </div>
          </div>
          <div className="interview-table">
            {activeTab === 'scheduled' ? (
              <>
                <div className="table-item table-headers table-header-1 body-sm-regular"></div>
                <div className="table-item table-headers table-header-2 body-sm-regular">
                  Name
                </div>
                <div className="table-item table-headers table-header-3 body-sm-regular">
                  Email
                </div>
                <div className="table-item table-headers table-header-4 body-sm-regular">
                  Interview Date
                </div>
                <div className="table-item table-headers table-header-5 body-sm-regular">
                  Interviewer
                </div>
                <div className="table-item table-headers table-header-6 body-sm-regular">
                  Score
                </div>
                <div className="table-item table-headers table-header-7 body-sm-regular">
                  Actions
                </div>
              </>
            ) : (
              <>
                <div className="table-item table-headers table-header-1 body-sm-regular"></div>
                <div className="table-item table-headers table-header-2 body-sm-regular">
                  Name
                </div>
                <div className="table-item table-headers table-header-3 body-sm-regular">
                  Email
                </div>
                <div className="table-item table-headers table-header-4 body-sm-regular">
                  Resume
                </div>
                <div className="table-item table-headers table-header-5 body-sm-regular">
                  Answered
                </div>
                <div className="table-item table-headers table-header-6 body-sm-regular">
                  Score
                </div>
                <div className="table-item table-headers table-header-7 body-sm-regular">
                  Actions
                </div>
              </>
            )}
            {interviewData.isLoading && (
              <div
                style={{
                  marginTop: "5dvh",
                  marginBottom: "10dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gridColumn: "1/8",
                  gridRow: "7/7",
                }}
              >
                <Loading />
              </div>
            )}
            {!interviewData.isLoading &&
              interviewData.isFetching &&
              interviewDataRows.length !== 0 && (
                <div
                  style={{
                    marginTop: ".5rem",
                    marginBottom: ".5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gridColumn: "1/8",
                    color: "grey",
                    fontSize: ".8rem",
                  }}
                >
                  Refreshing Data...
                </div>
              )}
            {interviewData.isSuccess &&
              interviewDataRows
                .filter(item => 
                  (activeTab === 'lobby' && item.status === 'lobby') ||
                  (activeTab === 'scheduled' && item.status === 'scheduled') ||
                  (activeTab === 'finalized' && item.status === 'finalized') ||
                  (activeTab === 'rejected' && item.status === 'rejected')
                )
                .map((item) => (
                  <InterviewRow
                    key={item._id}
                    data={item}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    onSchedule={handleScheduleInterview}
                    activeTab={activeTab}
                  />
                ))}
          </div>
        </section>
      </div>
    </>
  );
} 