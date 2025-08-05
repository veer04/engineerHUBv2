import { Fragment, useEffect, useRef, useState } from "react";
import "./JobBoard.css";
import { FiDownload, FiUserPlus, FiUserX, FiInbox } from "react-icons/fi";
import { MdDeleteOutline, MdMailOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BiSort } from "react-icons/bi";
import Loading from "../../../components/Loader/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, EDITOR_API_KEY } from "../../../services/APIUtils";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getAccessToken } from "../../../features/User/UserDetails";
import JobBoardRow from "./JobBoardRow";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import FormInput from "../../../components/FormInputs/FormInput";
import FormInputTextarea from "../../../components/FormInputs/FormInputTextarea";
import { Editor } from "@tinymce/tinymce-react";

export default function JobBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams({
    pageNo: "",
    limit: "",
    status: "",
    exp: "",
  });
  const ref = useRef(null);
  const editorRef = useRef(null);
  const [boardDataRows, setBoardDataRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [experience, setExperience] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnyRowUpdating, setIsAnyRowUpdating] = useState(false); // if any row is updating, then disable the download button
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [isAISorting, setIsAISorting] = useState(false);
  const [isClearingSorted, setIsClearingSorted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [errors, setErrors] = useState({
    subject: "",
    message: "",
    senderEmail: "",
  });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const status = searchParams.get("status");
  const exp = searchParams.get("exp");
  let errorStack = [];

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
    status: status ? status : "", // Show All as empty string, Shortlisted, Rejected, Processing , Response, Removed
    exp: exp ? exp : "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate(
        `/career/jobs/board/${id}?pageNo=1&limit=30${
          !!params.status ? `&status=${params.status}` : ""
        }`
      );
    }
  }, []);

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  const jobData = useQuery({
    queryKey: ["Job", id],
    queryFn: () =>
      axios
        .get(`${API_URL}api/v1/hiringDashboard/hiringDetails/${id}`, config)
        .then((res) => res),
  });

  const applicantsCountData = useQuery({
    queryKey: ["ApplicantsCount", id, exp],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/hiringDashboard/getApplicantsStatus/?hiringId=${id}${
            exp ? `&experience=${exp}` : ""
          }`,
          config
        )
        .then((res) => res),
  });

  const boardData = useQuery({
    queryKey: [
      "Jobs",
      "board",
      params.pageNo,
      params.limit,
      id,
      params.status,
      exp,
    ],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/hiringDashboard/applicant?page=${
            params.pageNo
          }&limit=${params.limit}&hiringId=${id}${
            !!params.status ? `&status=${params.status}` : ""
          }${exp ? `&experience=${exp}` : ""}`,
          config
        )
        .then((res) => {
          return res;
        }),
    staleTime: 1000 * 60 * 1, // 1 minutes
  });

  useEffect(() => {
    if (boardData.isSuccess) {
      console.log('BoardData loaded:', {
        status: params.status,
        applicantsCount: boardData.data.data.data.applicants.length,
        totalApplicants: boardData.data.data.data.totalApplicants,
        pageNo: params.pageNo,
        limit: params.limit
      });
      
      setBoardDataRows(boardData.data.data.data.applicants);
      setPageCount(
        Math.ceil(
          (!!boardData.data?.data?.data?.totalApplicants
            ? boardData.data?.data?.data?.totalApplicants
            : 1) /
            (!!limit ? limit : boardData.data?.data?.data?.applicants?.length)
        )
      );
    }
  }, [boardData, params.status, params.pageNo, params.limit]);

  const handleDownload = async () => {
    if (selectedRows.length === 0) {
      setSnackbarMessage("Please select at least one applicant");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }
    setIsDownloading(true);
    const applicantsData = selectedRows.map((applicant) => ({
      Name: `${applicant?.firstName}${
        applicant?.lastName ? ` ${applicant?.lastName}` : ""
      }`,
      Skills: applicant?.skills?.split(",")?.join(", "),
      College: applicant?.college,
      Batch: applicant?.batch,
      Exp: `${
        applicant?.experience > 0
          ? applicant?.experience === 1
            ? `${applicant?.experience} year`
            : `${applicant?.experience} years`
          : "Fresher"
      }`,
      "Resume Link": applicant?.resumeUrl,
    }));
    await axios({
      url: `${API_URL}api/v1/hiringDashboard/downloadApplicantDetails`,
      data: {
        data: applicantsData,
      },
      method: "POST",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    })
      .then((response) => {
        setIsDownloading(false);
        setProgress(100);
        const blob = new Blob([response.data], { type: "application/xlsx" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute(
          "download",
          `${jobData?.data?.data?.data?.opportunityName} Applicants.xlsx`
        );
        link.click();
        setProgress(0);
      })
      .catch((err) => {
        setIsDownloading(false);
        setSnackbarMessage(
          <>
            <span>Download failed</span>
            {err?.response?.data?.message && (
              <>
                {" "}
                <br />
                <span>Error: {err?.response?.data?.message}</span>
              </>
            )}
          </>
        );
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        console.error(err);
        setProgress(0);
      });
  };

  function shortlistApplicants() {
    const shortlistedApplicants = selectedRows.map((job) => ({
      registrationId: job?._id,
      status: "Shortlisted",
    }));
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: shortlistedApplicants,
        },
        config
      )
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board"],
        });
        console.log(res);
        setSelectedRows([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function rejectApplicants() {
    const rejectedApplicants = selectedRows.map((job) => ({
      registrationId: job?._id,
      status: "Rejected",
    }));
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: rejectedApplicants,
        },
        config
      )
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board"],
        });
        console.log(res);
        setSelectedRows([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uncategorizeApplicants() {
    const responseApplicants = selectedRows.map((job) => ({
      registrationId: job?._id,
      status: "Response",
    }));
    axios
      .patch(
        `${API_URL}api/v1/hiringDashboard/updateApplicantsStatus`,
        {
          hiringId: id,
          data: responseApplicants,
        },
        config
      )
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board"],
        });
        console.log(res);
        setSelectedRows([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addToErrorStack(elem) {
    errorStack.push(elem);
  }

  function handleFormErrors() {
    if (errorStack.length > 0) {
      const element = document.querySelector(errorStack[0]);
      if (element) {
        window.scrollTo({
          behavior: "smooth",
          top: element.offsetTop - 200,
        });
      }
      setSnackbarMessage("Please fill all the required fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    errorStack = [];
  }

  function validateForm() {
    let isValid = true;
    const errors = {
      subject: "",
      message: "",
      senderEmail: "",
    };

    if (!subject) {
      errors.subject = "Subject is required";
      isValid = false;
      addToErrorStack("#subject");
    } else if (subject.length < 3) {
      errors.subject = "Subject should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#subject");
    } else if (subject.length > 100) {
      errors.subject = "Subject should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#subject");
    }

    if (!message) {
      errors.message = "Message is required";
      isValid = false;
      addToErrorStack("#message");
    } else if (message.length < 10) {
      errors.message = "Message should be minimum 10 characters";
      isValid = false;
      addToErrorStack("#message");
    }

    if (!senderEmail) {
      errors.senderEmail = "Sender's email is required";
      isValid = false;
      addToErrorStack("#senderEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      errors.senderEmail = "Please enter a valid email address";
      isValid = false;
      addToErrorStack("#senderEmail");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  async function submitForm() {
    setIsSendingMail(true);
    setIsAnyRowUpdating(true);
    const applicantsNextStatus =
      params.status === "Shortlisted"
        ? "Processing"
        : params.status === "Rejected"
        ? "Rejected"
        : "Response";
    await axios
      .post(
        `${API_URL}api/v1/hiringDashboard/sendCrmEmail`,
        {
          hiringId: id,
          subject,
          text: message,
          status: applicantsNextStatus,
          registration_ids: selectedRows.map((job) => job?._id),
          senderEmail: senderEmail,
        },
        config
      )
      .then((res) => {
        console.log(res);
        ref.current.disabled = false;
        ref.current.click();
        setSnackbarMessage("Emails sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        queryClient.invalidateQueries({
          queryKey: ["Jobs", "board"],
        });
        queryClient.invalidateQueries({
          queryKey: ["ApplicantsCount"],
        });
        setSelectedRows([]);
        setSubject("");
        setMessage("");
        setSenderEmail("");
        setErrors({
          subject: "",
          message: "",
          senderEmail: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage(err?.response?.data?.message);
        setSnackbarSeverity("error");
        setSnackbarDuration(10000);
        setSnackbarOpen(true);
      })
      .finally(() => {
        setIsSendingMail(false);
        setIsAnyRowUpdating(false);
      });
  }

  function handleSendMail() {
    if (validateForm()) {
      submitForm();
    }
  }

  const handleAISort = async () => {
    if (boardDataRows.length === 0) {
      setSnackbarMessage("No applicants to sort");
      setSnackbarSeverity("error");
      setSnackbarDuration(3000);
      setSnackbarOpen(true);
      return;
    }

    setIsAISorting(true);
    try {
      const response = await axios.post(
        `${API_URL}api/v1/hiringDashboard/sortApplicantsWithAI`,
        {
          hiringId: id,
        },
        config
      );

      if (response.data.success) {
        setSnackbarMessage("Response candidates moved to 'Sorted' segment successfully!");
        setSnackbarSeverity("success");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        
        // Refresh data to show the new Sorted segment
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({ queryKey: ["Jobs", "board"] });
        
        // Navigate to the Sorted segment
        setSearchParams(
          (prev) => {
            prev.set("status", "Sorted");
            prev.set("pageNo", "1");
            prev.set("limit", "30");
            return prev;
          },
          { replace: true }
        );
      } else {
        throw new Error(response.data.message || "AI sorting failed");
      }
    } catch (error) {
      console.error("AI sorting error:", error);
      let errorMessage = "Failed to move candidates to sorted segment";
      
      if (error?.response?.data?.message?.includes("already exists")) {
        errorMessage = "Sorted data already exists. Please clear existing sorted data first.";
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    } finally {
      setIsAISorting(false);
    }
  };

  const handleClearSorted = async () => {
    setIsClearingSorted(true);
    try {
      const response = await axios.post(
        `${API_URL}api/v1/hiringDashboard/clearSortedData`,
        {
          hiringId: id,
        },
        config
      );

      if (response.data.success) {
        setSnackbarMessage(`Successfully moved ${response.data.data.movedCount} candidates back to Response segment`);
        setSnackbarSeverity("success");
        setSnackbarDuration(3000);
        setSnackbarOpen(true);
        
        // Refresh data and navigate to Response segment
        queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
        queryClient.invalidateQueries({ queryKey: ["Jobs", "board"] });
        
        setSearchParams(
          (prev) => {
            prev.set("status", "Response");
            prev.set("pageNo", "1");
            prev.set("limit", "30");
            return prev;
          },
          { replace: true }
        );
      } else {
        throw new Error(response.data.message || "Failed to clear sorted data");
      }
    } catch (error) {
      console.error("Clear sorted data error:", error);
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to move candidates back to Response"
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
    } finally {
      setIsClearingSorted(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`sendMailModal-${jobData?.data?.data?.data?._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="sendMailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 heading-sm"
                id="sendMailModalLabel"
              >
                Send mail to all selected candidates
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={isSendingMail}
                ref={ref}
              ></button>
            </div>
            <div className="modal-body">
              <FormInput
                id="senderEmail"
                name="senderEmail"
                label="Sender's Email"
                placeholder="Enter sender's email"
                className="mb-2"
                required
                value={senderEmail}
                setValue={setSenderEmail}
                helperText={errors.senderEmail}
              />
              <FormInput
                id="subject"
                name="subject"
                label="Subject"
                placeholder="Enter the subject"
                className="mb-2"
                required
                value={subject}
                setValue={setSubject}
                helperText={errors.subject}
              />
              <label
                htmlFor={message}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "0",
                  padding: "0",
                }}
              >
                Message{" "}
                <span style={{ color: "red", fontSize: "14px" }}>*</span>
              </label>
              {/* <FormInputTextarea
                id="message"
                name="message"
                label="Message"
                placeholder="Enter the message"
                rows={5}
                className="mb-2"
                required
                value={message}
                setValue={setMessage}
                helperText={errors.message}
              /> */}
              <div className="mb-4">
                <Editor
                  apiKey={EDITOR_API_KEY}
                  value={message}
                  onEditorChange={(content) => {
                    setMessage(content);
                  }}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: "file",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo" +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat",
                    content_style:
                      "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {/* <button onClick={log}>Log editor content</button> */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#1383821A",
                  color: "var(--primary-color-green)",
                  borderRadius: "10px",
                  border: "none",
                  padding: "10px 24px",
                }}
                data-bs-dismiss="modal"
                disabled={isSendingMail}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: "var(--primary-color-green)",
                  borderRadius: "10px",
                  border: "none",
                  padding: "10px 40px",
                }}
                onClick={() => handleSendMail()}
                disabled={isSendingMail}
              >
                Send Mail
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="crm-board">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Job Board{false ? ` | Job Name` : ""}</title>
        </Helmet>
        <div
          style={{
            color:
              jobData?.data?.data?.data?.isServiceOff === true
                ? "#FF0000"
                : "#00643A",
            backgroundColor:
              jobData?.data?.data?.data?.isServiceOff === true
                ? "#FF00001A"
                : "rgba(0, 213, 136, 0.1)",
          }}
          className="opportunity-status-container"
        >
          <p className="body-sm-regular">
            {jobData?.data?.data?.data?.isServiceOff === true
              ? "This job is no longer accepting responses"
              : "This job is still accepting responses"}
          </p>
        </div>
        <section className="main-container">
          {/* <div className="status-toggle-container">
          <input type="checkbox" name="jobStatus" id="jobStatus" />
          <label htmlFor="jobStatus" className="body-sm-regular">
            Do not accept response on this job
          </label>
        </div> */}
          <div className="heading heading-sm">
            <p>
              {jobData?.data?.data?.data?.opportunityName || <i>Job Name</i>}
            </p>
            <span>|</span>
            <p>
              {jobData?.data?.data?.data?._id ? (
                `ID : ${jobData?.data?.data?.data?._id}`
              ) : (
                <i>ID : Not found</i>
              )}
            </p>
            <span>|</span>
            <p>{jobData?.data?.data?.data?.opportunityMode || <i>Type</i>}</p>
            <span>|</span>
            <p>{jobData?.data?.data?.data?.city || <i>Location</i>}</p>
          </div>
          <div className="posted-on body-md-semibold">
            {jobData?.data?.data?.data?.createdAt ? (
              // use moment to format the date
              `Posted on : ${moment(
                jobData?.data?.data?.data?.createdAt
              ).format("DD/MM/YY/dddd/HH:mm A")}`
            ) : (
              <i>Posted on : Not found</i>
            )}
          </div>
          <div className="categories-container">
            <div className="categories body-sm-regular">
              <button
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "Response");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  )
                }
                className={`${
                  params.status === "Response" ? "--selected" : ""
                }`}
              >
                <p className="body-sm-regular">Response</p>
                {/* Data comes in the form of an array with the following structure:  [{count: 1, status: 'Processing'}, {count: 1, status: 'Shortlisted'}, {count: 1, status: 'Response'}, {count: 1, status: 'Rejected'}] */}
                {!!applicantsCountData?.data?.data?.data?.find(
                  (item) => item.status === "Response"
                )?.count && (
                  <span className="body-sm-regular">
                    {
                      applicantsCountData?.data?.data?.data?.find(
                        (item) => item.status === "Response"
                      )?.count
                    }
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "Sorted");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  )
                }
                className={`${
                  params.status === "Sorted" ? "--selected" : ""
                }`}
              >
                <p className="body-sm-regular">Sorted</p>
                {!!applicantsCountData?.data?.data?.data?.find(
                  (item) => item.status === "Sorted"
                )?.count && (
                  <span className="body-sm-regular">
                    {
                      applicantsCountData?.data?.data?.data?.find(
                        (item) => item.status === "Sorted"
                      )?.count
                    }
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "Shortlisted");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  )
                }
                className={`${
                  params.status === "Shortlisted" ? "--selected" : ""
                }`}
              >
                <p className="body-sm-regular">Shortlisted</p>
                {!!applicantsCountData?.data?.data?.data?.find(
                  (item) => item.status === "Shortlisted"
                )?.count && (
                  <span className="body-sm-regular">
                    {
                      applicantsCountData?.data?.data?.data?.find(
                        (item) => item.status === "Shortlisted"
                      )?.count
                    }
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "Rejected");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  )
                }
                className={`${
                  params.status === "Rejected" ? "--selected" : ""
                }`}
              >
                <p className="body-sm-regular">Rejected</p>
                {!!applicantsCountData?.data?.data?.data?.find(
                  (item) => item.status === "Rejected"
                )?.count && (
                  <span className="body-sm-regular">
                    {
                      applicantsCountData?.data?.data?.data?.find(
                        (item) => item.status === "Rejected"
                      )?.count
                    }
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "Processing");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  )
                }
                className={`${
                  params.status === "Processing" ? "--selected" : ""
                }`}
              >
                <p className="body-sm-regular">Processing</p>
                {!!applicantsCountData?.data?.data?.data?.find(
                  (item) => item.status === "Processing"
                )?.count && (
                  <span className="body-sm-regular">
                    {
                      applicantsCountData?.data?.data?.data?.find(
                        (item) => item.status === "Processing"
                      )?.count
                    }
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  // Clear cache to ensure fresh data for Show All
                  queryClient.removeQueries({ queryKey: ["Jobs", "board"] });
                  queryClient.invalidateQueries({ queryKey: ["ApplicantsCount"] });
                  
                  setSearchParams(
                    (prev) => {
                      prev.set("status", "");
                      prev.set("pageNo", "1");
                      prev.set("limit", "30");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
                className={`${params.status === "" ? "--selected" : ""}`}
              >
                <p className="body-sm-regular">Show All</p>
                <span className="body-sm-regular">
                  {applicantsCountData?.data?.data?.data?.reduce(
                    (acc, item) => acc + item.count,
                    0
                  )}
                </span>
              </button>
            </div>
            <div className="download-container">
              {boardDataRows.length > 0 &&
                selectedRows.length > 0 &&
                params.status === "Shortlisted" && (
                  <>
                    <button
                      // onClick={handleSendMail}
                      className="send-mail-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#sendMailModal-${jobData?.data?.data?.data?._id}`}
                    >
                      <MdMailOutline />
                      Send Mail
                    </button>
                  </>
                )}
              {params.status !== "Sorted" && (
                <button
                  onClick={handleAISort}
                  disabled={isAISorting}
                  className="sort-btn body-sm-semibold d-flex align-items-center gap-1"
                >
                  <BiSort /> {isAISorting ? "Sorting..." : "Sort"}
                </button>
              )}
              {params.status === "Sorted" && (
                <button
                  onClick={handleClearSorted}
                  disabled={isClearingSorted}
                  className="move-back-btn body-sm-semibold d-flex align-items-center gap-1"
                >
                  <RiInboxArchiveLine /> {isClearingSorted ? "Moving..." : "Move to Response"}
                </button>
              )}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="download-btn body-sm-semibold d-flex align-items-center gap-1"
              >
                <FiDownload /> {isDownloading ? `${progress}%` : "Download"}
              </button>
            </div>
          </div>
          <hr
            style={{
              margin: ".75rem 0",
              width: "100%",
            }}
          />
          <div className="action-container">
            <div className="select-container">
              <div className="select-all">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  checked={
                    selectedRows.length === boardDataRows.length &&
                    boardDataRows.length !== 0
                  }
                  onChange={() => {
                    setSelectedRows(
                      selectedRows.length === boardDataRows.length
                        ? []
                        : boardDataRows
                    );
                  }}
                />
                <label htmlFor="selectAll body-sm-regular">
                  Select All{" "}
                  {`(${selectedRows.length}/${
                    boardData?.data?.data?.data?.applicants?.length || 0
                  })`}
                </label>
              </div>
              <div className="action-buttons">
                <button onClick={() => shortlistApplicants()}>
                  <FiUserPlus />
                </button>
                <button onClick={() => rejectApplicants()}>
                  <FiUserX />
                </button>
                <button onClick={() => uncategorizeApplicants()}>
                  <RiInboxArchiveLine />
                </button>
                {selectedRows.length > 0 && (
                  <button
                    onClick={() => {
                      const modal = document.getElementById(`sendMailModal-${jobData?.data?.data?.data?._id}`);
                      if (modal) {
                        const bsModal = new window.bootstrap.Modal(modal);
                        bsModal.show();
                      }
                    }}
                  >
                    <MdMailOutline />
                  </button>
                )}
              </div>
            </div>
            <div className="search-container d-flex align-items-center gap-2">
              <div>
                <span>Minimum experience </span>
                <select
                  name="experience"
                  id="experience"
                  defaultValue={exp}
                  onChange={(e) => {
                    navigate(
                      `/career/jobs/board/${id}?pageNo=1&limit=30${
                        !!params.status ? `&status=${params.status}` : ""
                      }${!!e.target.value ? `&exp=${e.target.value}` : ""}`
                    );
                  }}
                >
                  <option value="">No Experience</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                  <option value="8">8 years</option>
                  <option value="9">9 years</option>
                  <option value="10">10 years</option>
                  <option
                    style={{
                      display: "none",
                    }}
                    value={exp}
                  >
                    {exp}
                  </option>
                </select>
              </div>
              {/* 
            <input
              aria-required="false"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              // name={param}
              tabIndex="0"
              type="text"
              spellCheck="false"
              role="combobox"
              aria-haspopup="false"
              aria-autocomplete="list"
              dir="ltr"
              // id={id}
              className={`body-sm-regular
                
                  `}
              // placeholder={placeholder}
              // aria-label={ariaLabel}
              // aria-describedby={ariaDescribedby}
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     setSearchParams(
              //       (prev) => {
              //         prev.set(param, value);
              //         return prev;
              //       },
              //       { replace: true }
              //     );
              //   }
              // }}
              // {...rest}
            />
            */}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <div>
              <span>Showing </span>
              <select
                name="limit"
                id="limit"
                value={limit}
                onChange={(e) => {
                  navigate(
                    `/career/jobs/board/${id}?pageNo=1&limit=${e.target.value}${
                      !!params.status ? `&status=${params.status}` : ""
                    }`
                  );
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option
                  style={{
                    display: "none",
                  }}
                  value={limit}
                >
                  {limit}
                </option>
              </select>
              <span> results</span>
            </div>
            <PaginationBarWithSearchParams
              className="m-0"
              param="pageNo"
              pages={pageCount}
            />
          </div>
          <div className={`board-table ${params.status === 'Sorted' ? '--with-ai-scores' : ''}`}>
            <div className="table-item table-headers table-header-1 body-sm-regular"></div>
            <div className="table-item table-headers table-header-2 body-sm-regular">
              Name
            </div>
            <div className="table-item table-headers table-header-3 body-sm-regular">
              Skills
            </div>
            <div className="table-item table-headers table-header-4 body-sm-regular">
              College / University
            </div>
            <div className="table-item table-headers table-header-5 body-sm-regular">
              Batch
            </div>
            <div className="table-item table-headers table-header-6 body-sm-regular">
              Experience
            </div>
            <div className="table-item table-headers table-header-7 body-sm-regular">
              Resume
            </div>
            {params.status === 'Sorted' && (
              <div className="table-item table-headers table-header-sorted body-sm-regular">
                Sorted
              </div>
            )}
            {params.status === 'Sorted' && (
              <div className="table-item table-headers table-header-summary body-sm-regular">
                Summary
              </div>
            )}
            <div className="table-item table-headers table-header-8 body-sm-regular">
              Actions
            </div>
            {boardData.isLoading && (
              <>
                <div className="loading-state">
                  <Loading />
                </div>
              </>
            )}
            {!boardData.isLoading &&
              boardData.isFetching &&
              boardDataRows.length !== 0 && (
                <div className="refreshing-message">
                  Refreshing Data...
                </div>
              )}
            {!boardData.isLoading &&
              boardData.isFetching &&
              boardDataRows.length === 0 && (
                <div className="loading-state">
                  <Loading />
                </div>
              )}
            {boardData.isSuccess &&
              boardDataRows.length === 0 &&
              !boardData.isLoading &&
              !boardData.isFetching && (
                <div className="no-data-message">
                  <div className="no-data-content">
                    <div className="no-data-icon">
                      <FiInbox />
                    </div>
                    <h4>No Data Available</h4>
                    <p>
                      {params.status === "Response" 
                        ? "No response applications found for this job."
                        : params.status === "Sorted" 
                        ? "No sorted candidates available. Try sorting response candidates first."
                        : params.status === "Shortlisted"
                        ? "No shortlisted candidates yet."
                        : params.status === "Rejected"
                        ? "No rejected candidates yet."
                        : params.status === "Processing"
                        ? "No candidates in processing status."
                        : "No candidates found for this job."
                      }
                    </p>
                    {params.status === "Sorted" && (
                      <small>
                        Navigate to "Response" segment and click "Sort" to create sorted candidates.
                      </small>
                    )}
                  </div>
                </div>
              )}
            {boardData.isSuccess &&
              boardDataRows.length > 0 &&
              boardDataRows.map((item) => (
                <JobBoardRow
                  key={item?._id}
                  data={item}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  isAnyRowUpdating={isAnyRowUpdating}
                  setIsAnyRowUpdating={setIsAnyRowUpdating}
                  isDataFetching={boardData.isFetching}
                  showAIScore={params.status === 'Sorted'}
                  onSendMail={() => {
                    setSelectedRows([item]);
                    const modal = document.getElementById(`sendMailModal-${jobData?.data?.data?.data?._id}`);
                    if (modal) {
                      const bsModal = new window.bootstrap.Modal(modal);
                      bsModal.show();
                    }
                  }}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
