import { Fragment, useEffect, useState } from "react";
import { FiMenu, FiUserX, FiEye, FiCheck, FiX } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import Loading from "../../../components/Loader/Loading";
import { Helmet } from "react-helmet";
import JobBoardSidebar from "../Board/JobBoardSidebar";
import "./AssessmentResponse.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getAssessmentResponses, updateAssessmentStatus } from "../../../services/APIConfig";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";

// Dummy data generator
const generateDummyResponses = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    name: `Candidate ${i + 1}`,
    email: `candidate${i + 1}@example.com`,
    answered: Math.floor(Math.random() * 20) + 10,
    score: Math.floor(Math.random() * 100),
    timeTaken: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    tabs: Math.floor(Math.random() * 5) + 1,
    submissions: Math.floor(Math.random() * 3) + 1,
    status: Math.random() > 0.7 ? 'rejected' : 'pending'
  }));
};

export default function AssessmentResponse() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    pageNo: "1",
    limit: "10",
    status: ""
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [totalResponses, setTotalResponses] = useState(0);
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useGlobalSnackbar();

  const pageNo = searchParams.get("pageNo") || "1";
  const limit = searchParams.get("limit") || "10";
  const status = searchParams.get("status") || "";

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch assessment responses (using dummy data for now)
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setIsLoading(true);
        // Simulate API call with dummy data
        const dummyTotalResponses = 45;
        const startIndex = (parseInt(pageNo) - 1) * parseInt(limit);
        const endIndex = Math.min(startIndex + parseInt(limit), dummyTotalResponses);
        const dummyResponses = generateDummyResponses(endIndex - startIndex);
        
        setResponses(dummyResponses);
        setTotalResponses(dummyTotalResponses);
        setPageCount(Math.ceil(dummyTotalResponses / parseInt(limit)));
      } catch (error) {
        console.error("Error fetching responses:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to fetch assessment responses");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, [id, pageNo, limit, status]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(responses.filter(r => r.status !== 'rejected').map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id, status) => {
    if (status === 'rejected') return;
    
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleViewResponse = (response) => {
    setSnackbarSeverity("info");
    setSnackbarMessage(`Viewing response for ${response.name}`);
    setSnackbarOpen(true);
  };

  const handleRejectResponse = async (responseId) => {
    try {
      // Simulate API call
      setResponses(responses.map(r => 
        r.id === responseId ? { ...r, status: 'rejected' } : r
      ));
      setSelectedRows(selectedRows.filter(id => id !== responseId));
      
      setSnackbarSeverity("success");
      setSnackbarMessage("Response rejected successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error rejecting response:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to reject response");
      setSnackbarOpen(true);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedRows.length === 0) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Please select at least one response");
      setSnackbarOpen(true);
      return;
    }

    try {
      if (action === "reject") {
        // Simulate API call
        setResponses(responses.map(r => 
          selectedRows.includes(r.id) ? { ...r, status: 'rejected' } : r
        ));
        setSelectedRows([]);
        
        setSnackbarSeverity("success");
        setSnackbarMessage("Selected responses rejected successfully");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to perform bulk action");
      setSnackbarOpen(true);
    }
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
      <div className={`assessment-response ${!isSidebarCollapsed ? 'expanded' : ''}`}>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Assessment Response</title>
        </Helmet>

        <section className="main-container">
          <h1 className="heading heading-sm mb-4">Assessment Response</h1>

          <div className="table-container">
            <h2 className="heading-md mb-3">View Assessment Responses</h2>

            <div className="table-controls">
              <div className="d-flex align-items-center gap-2">
                <span>Show</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setSearchParams({
                      pageNo: "1",
                      limit: e.target.value,
                      status
                    });
                  }}
                  className="form-select form-select-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>entries</span>
              </div>

              {selectedRows.length > 0 && (
                <div className="bulk-actions">
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleBulkAction("view")}
                  >
                    <FiEye /> View Selected ({selectedRows.length})
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleBulkAction("reject")}
                  >
                    <FiUserX /> Reject Selected ({selectedRows.length})
                  </button>
                </div>
              )}
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedRows.length === responses.filter(r => r.status !== 'rejected').length && responses.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Answered</th>
                    <th>Score</th>
                    <th>Time Taken</th>
                    <th>Tabs</th>
                    <th>Submissions</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="11" className="text-center">
                        <Loading />
                      </td>
                    </tr>
                  ) : responses.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No responses available
                      </td>
                    </tr>
                  ) : (
                    responses.map((response) => (
                      <tr key={response.id} className={response.status === 'rejected' ? 'text-muted' : ''}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(response.id)}
                            onChange={() => handleRowSelect(response.id, response.status)}
                            disabled={response.status === 'rejected'}
                          />
                        </td>
                        <td>{response.rank}</td>
                        <td>{response.name}</td>
                        <td>{response.email}</td>
                        <td>{response.answered}</td>
                        <td>{response.score}%</td>
                        <td>{response.timeTaken}</td>
                        <td>{response.tabs}</td>
                        <td>{response.submissions}</td>
                        <td>
                          <span className={`badge ${response.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                            {response.status === 'rejected' ? 'Rejected' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleViewResponse(response)}
                              title="View Response"
                            >
                              <FiEye />
                            </button>
                            {response.status !== 'rejected' && (
                              <>
                                <button 
                                  onClick={() => handleRejectResponse(response.id)}
                                  title="Reject Response"
                                >
                                  <FiUserX />
                                </button>
                                <button
                                  title="Send Mail"
                                >
                                  <MdMailOutline />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-info mt-3 d-flex justify-content-between align-items-center">
              <div>
                Showing {((parseInt(pageNo) - 1) * parseInt(limit)) + 1} to {Math.min(parseInt(pageNo) * parseInt(limit), totalResponses)} of {totalResponses} entries
              </div>
              <PaginationBarWithSearchParams
                className="m-0"
                param="pageNo"
                pages={pageCount}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 