import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectSubmission.css";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";

export default function ProjectSubmission() {
  const navigate = useNavigate();
  const { id, projectId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    collegeName: "",
    currentYear: "",
    contactNo: "",
    projectName: "",
    projectLink: "",
    projectDescription: "",
  });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  useEffect(() => {
    document.title = `Project Submission | ${id} | engineerHUB`;
    window.scrollTo(0, 0);
  }, []);

  function validateForm() {
    let formIsValid = true;
    let error = {
      name: "",
      email: "",
      collegeName: "",
      currentYear: "",
      contactNo: "",
      projectName: "",
      projectLink: "",
      projectDescription: "",
    };

    if (!name) {
      formIsValid = false;
      error.name = "Name is required";
    } else if (name.length < 3) {
      formIsValid = false;
      error.name = "Name should be atleast 3 characters long";
    }

    if (!email) {
      formIsValid = false;
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      error.email = "Invalid email format!";
    }

    if (!collegeName) {
      formIsValid = false;
      error.collegeName = "College is required";
    }

    if (!currentYear) {
      formIsValid = false;
      error.currentYear = "Current year is required";
    }

    if (!contactNo) {
      formIsValid = false;
      error.contactNo = "Contact no. is required";
    } else if (contactNo.length < 6) {
      formIsValid = false;
      error.contactNo = "Contact no. should be atleast 6 digits long";
    } else if (contactNo.length > 16) {
      formIsValid = false;
      error.contactNo = "Contact no. should be atmost 16 digits long";
    }

    if (!projectName) {
      formIsValid = false;
      error.projectName = "Project name is required";
    } else if (projectName.length < 10) {
      formIsValid = false;
      error.projectName = "Project name too short";
    }

    if (!projectLink) {
      formIsValid = false;
      error.projectLink = "Project link is required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(projectLink)) {
      formIsValid = false;
      error.projectLink =
        "Invalid project link! (Ex: https://www.engineerhub.in/)";
    }

    if (!projectDescription) {
      formIsValid = false;
      error.projectDescription = "Project description is required";
    } else if (projectDescription.length < 50) {
      formIsValid = false;
      error.projectDescription =
        "Project description too short (Min 50 characters)";
    } else if (projectDescription.length > 15000) {
      formIsValid = false;
      error.projectDescription =
        "Project description too long (Max 15000 characters)";
    }

    setError(error);
    return formIsValid;
  }

  function submitFormData() {
    const data = {
      projectId,
      name,
      email,
      collegeName,
      currentYear,
      contactNo,
      projectName,
      projectLink,
      projectDescription,
    };
    axios
      .post(`${API_URL}api/v1/addProjectSubmission`, {
        ...data,
      })
      .then(() => {
        setLoading(false);
        setSnackbarMessage("Project submitted successfully");
        setSnackbarSeverity("success");
        setSnackbarDuration(8000);
        setSnackbarOpen(true);
        navigate(`/community/projects/${encodeURIComponent(id)}/${projectId}`);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbarMessage("Something went wrong");
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      submitFormData();
    } else {
      setLoading(false);
    }
  }

  return (
    <main id="project-submission" className="project-submission">
      <section className="box">
        <p className="heading">Project Submission Form</p>
        <form>
          <div className="line">
            <div className="column">
              <label className="label">
                Name<span className="required">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter you full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.name}</label>
            </div>
            <div className="column">
              <label className="label">
                Email<span className="required">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.email}</label>
            </div>
          </div>
          <div className="line">
            <div className="column">
              <label className="label">
                College / Organization Name<span className="required">*</span>
              </label>
              <input
                name="collegeName"
                type="text"
                required
                placeholder="Enter your collegeName / organization name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.collegeName}</label>
            </div>
          </div>
          <div className="line">
            <div className="column">
              <label className="label">
                Current Year<span className="required">*</span>
              </label>
              <input
                name="currentYear"
                type="text"
                placeholder="Enter your current year"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.currentYear}</label>
            </div>
            <div className="column">
              <label className="label">
                Contact No.<span className="required">*</span>
              </label>
              <input
                name="contactNo"
                type="text"
                required
                placeholder="Enter your contact number"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.contactNo}</label>
            </div>
          </div>

          <div className="line">
            <div className="column">
              <label className="label">
                Project Name<span className="required">*</span>
              </label>
              <input
                name="projectName"
                type="text"
                required
                placeholder="Enter your project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.projectName}</label>
            </div>
            <div className="column">
              <label className="label">
                Project Link<span className="required">*</span>
              </label>
              <input
                name="projectLink"
                type="text"
                required
                placeholder="Enter your project link"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.projectLink}</label>
            </div>
          </div>
          <div className="line">
            <div className="column">
              <label className="label">
                Project Description<span className="required">*</span>
              </label>
              <textarea
                name="projectDescription"
                type="text"
                required
                placeholder="Enter your project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="input-field"
                rows={3}
              />
              <label className="error-message">
                {error.projectDescription}
              </label>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="update-btn"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
