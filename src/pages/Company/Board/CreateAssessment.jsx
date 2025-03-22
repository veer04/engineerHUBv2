import { useState, useEffect, Fragment } from "react";
import "./CreateAssessment.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../../features/User/UserDetails";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import Loading from "../../../components/Loader/Loading";
import { FiMail, FiMenu, FiDownload } from "react-icons/fi";
import { MdAssessment } from "react-icons/md";
import JobBoardSidebar from "./JobBoardSidebar";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";

export default function CreateAssessment() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    pageNo: "1",
    limit: "10"
  });
  const [assessments, setAssessments] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalApplicants, setTotalApplicants] = useState(0);

  const pageNo = searchParams.get("pageNo") || "1";
  const limit = searchParams.get("limit") || "10";

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

  // Dummy data for initial development
  const dummyApplicants = [
    {
      id: 1,
      name: "John Doe",
      mobile: "+91 9876543210",
      email: "john@example.com",
      resume: "https://example.com/resume1.pdf",
      assessmentSent: false,
      mailSent: false
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "+91 9876543211",
      email: "jane@example.com",
      resume: "https://example.com/resume2.pdf",
      assessmentSent: false,
      mailSent: false
    }
  ];

  const dummyAssessments = [
    {
      id: 1,
      title: "Frontend Developer Assessment",
      description: "Test for React.js and JavaScript skills",
      createdAt: "2024-03-15"
    },
    {
      id: 2,
      title: "Backend Developer Assessment",
      description: "Test for Node.js and database skills",
      createdAt: "2024-03-16"
    }
  ];

  useEffect(() => {
    // Simulating API call with dummy data
    setApplicants(dummyApplicants);
    setAssessments(dummyAssessments);
    setLoading(false);
    setTotalApplicants(dummyApplicants.length);
    setPageCount(Math.ceil(dummyApplicants.length / parseInt(limit)));

    // TODO: Implement actual API calls when ready
    // const fetchData = async () => {
    //   try {
    //     const config = {
    //       headers: {
    //         accessToken: getAccessToken(),
    //       },
    //     };
    //     const [assessmentsRes, applicantsRes] = await Promise.all([
    //       axios.get(`${API_URL}api/v1/assessments/${id}`, config),
    //       axios.get(`${API_URL}api/v1/applicants/${id}?page=${pageNo}&limit=${limit}`, config)
    //     ]);
    //     setAssessments(assessmentsRes.data);
    //     setApplicants(applicantsRes.data.applicants);
    //     setTotalApplicants(applicantsRes.data.totalApplicants);
    //     setPageCount(Math.ceil(applicantsRes.data.totalApplicants / parseInt(limit)));
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, [id, pageNo, limit]);

  const handleCreateAssessment = () => {
    // TODO: Implement assessment creation logic
    console.log("Create assessment clicked");
  };

  const handleSendAssessment = (applicantId) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(applicant =>
        applicant.id === applicantId
          ? { ...applicant, assessmentSent: true }
          : applicant
      )
    );
  };

  const handleSendMail = (applicantId) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(applicant =>
        applicant.id === applicantId
          ? { ...applicant, mailSent: true }
          : applicant
      )
    );
  };

  const handleBulkActions = () => {
    if (selectedRows.length === 0) {
      // Show error message
      return;
    }
    // Implement bulk actions here
    console.log("Bulk actions for:", selectedRows);
  };

  if (loading) {
    return <Loading />;
  }

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
      <div className={`create-assessment-container ${!isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="assessment-header">
          <h2>Create Assessment</h2>
          <button className="create-assessment-btn" onClick={handleCreateAssessment}>
            Click to Create Assessment
          </button>
        </div>

        {assessments.length > 0 && (
          <div className="existing-assessments">
            <h3>Existing Assessments</h3>
            <div className="assessment-cards">
              {assessments.map(assessment => (
                <div key={assessment.id} className="assessment-card">
                  <h4>{assessment.title}</h4>
                  <p>{assessment.description}</p>
                  <span className="created-date">Created: {assessment.createdAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="board-container">
          <div className="action-container">
            <div className="select-container">
              <div className="select-all">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  checked={selectedRows.length === applicants.length && applicants.length !== 0}
                  onChange={() => {
                    setSelectedRows(
                      selectedRows.length === applicants.length ? [] : applicants
                    );
                  }}
                />
                <label htmlFor="selectAll" className="body-sm-regular">
                  Select All {`(${selectedRows.length}/${applicants.length})`}
                </label>
              </div>
              {selectedRows.length > 0 && (
                <div className="action-buttons">
                  <button onClick={handleBulkActions} title="Send Assessment">
                    <MdAssessment />
                  </button>
                  <button onClick={handleBulkActions} title="Send Mail">
                    <FiMail />
                  </button>
                  <button onClick={handleBulkActions} title="Download">
                    <FiDownload />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="board-table">
            <div className="table-item table-headers table-header-1"></div>
            <div className="table-item table-headers table-header-2">Name</div>
            <div className="table-item table-headers table-header-3">Mobile Number</div>
            <div className="table-item table-headers table-header-4">Email</div>
            <div className="table-item table-headers table-header-5">Resume</div>
            <div className="table-item table-headers table-header-6">Actions</div>

            {applicants.map(applicant => (
              <Fragment key={applicant.id}>
                <div className="table-item table-content table-content-1">
                  <input
                    type="checkbox"
                    checked={selectedRows.some(row => row.id === applicant.id)}
                    onChange={() => {
                      if (selectedRows.some(row => row.id === applicant.id)) {
                        setSelectedRows(selectedRows.filter(row => row.id !== applicant.id));
                      } else {
                        setSelectedRows([...selectedRows, applicant]);
                      }
                    }}
                  />
                </div>
                <div className="table-item table-content table-content-2">
                  <p className="body-sm-regular text-crop-2">{applicant.name}</p>
                </div>
                <div className="table-item table-content table-content-3">
                  <p className="body-sm-regular text-crop-2">{applicant.mobile}</p>
                </div>
                <div className="table-item table-content table-content-4">
                  <p className="body-sm-regular text-crop-2">{applicant.email}</p>
                </div>
                <div className="table-item table-content table-content-5">
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm-regular text-crop-2"
                  >
                    View Resume
                  </a>
                </div>
                <div className="table-item table-content table-content-6">
                  <button
                    className={`action-btn ${applicant.assessmentSent ? 'sent' : ''}`}
                    onClick={() => handleSendAssessment(applicant.id)}
                    title="Send Assessment"
                  >
                    <MdAssessment />
                  </button>
                  <button
                    className={`action-btn ${applicant.mailSent ? 'sent' : ''}`}
                    onClick={() => handleSendMail(applicant.id)}
                    title="Send Mail"
                  >
                    <FiMail />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="pagination-container">
            <div className="entries-info">
              <span>Showing</span>
              <select
                value={limit}
                onChange={(e) => {
                  setSearchParams({
                    pageNo: "1",
                    limit: e.target.value
                  });
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="pagination-info">
              <span>
                Showing {((parseInt(pageNo) - 1) * parseInt(limit)) + 1} to {Math.min(parseInt(pageNo) * parseInt(limit), totalApplicants)} of {totalApplicants} entries
              </span>
              <PaginationBarWithSearchParams
                className="m-0"
                param="pageNo"
                pages={pageCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 