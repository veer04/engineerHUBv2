import "./JobHiringModal.css";
import { useEffect, useRef, useState } from "react";
import FormInputMultiValue from "../../../components/FormInputs/FormInputMultiValue";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import FormInput from "../../../components/FormInputs/FormInput";
import FormInputFileUpload from "../../../components/FormInputs/FormInputFileUpload";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken, getUserId } from "../../../features/User/UserDetails";
import { getHiringDataById } from "../../../services/APIConfig";
import axios from "axios";
import FormInputNumber from "../../../components/FormInputs/FormInputNumber";
import FormInputToggle from "../../../components/FormInputs/FormInputToggle";
import { FaFilePdf } from "react-icons/fa";
import Loading from "../../../components/Loader/Loading";

export default function JobHiringModal({
  latestInfo = {},
  hiringId,
  setHiring,
}) {
  const ref = useRef(null);
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [college, setCollege] = useState("");
  const [passOutYear, setPassOutYear] = useState("");
  const [resume, setResume] = useState("");
  const [usePreviousResume, setUsePreviousResume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    skillsRequired: "",
    college: "",
    passOutYear: "",
    resume: "",
  });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const [isResumePresent, setIsResumePresent] = useState(false);
  let errorStack = [];

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
      skillsRequired: "",
      college: "",
      passOutYear: "",
      resume: "",
    };

    if (skillsRequired.length === 0) {
      errors.skillsRequired = "Skills are required";
      isValid = false;
      addToErrorStack("#skillsRequired");
    }
    if (!college) {
      errors.college = "College name is required";
      isValid = false;
      addToErrorStack("#collegeName");
    }
    if (!passOutYear) {
      errors.passOutYear = "Passout year is required";
      isValid = false;
      addToErrorStack("#passoutYear");
    }
    if (!usePreviousResume && !resume) {
      errors.resume = "Resume is required";
      isValid = false;
      addToErrorStack("#resume");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  useEffect(() => {
    if (Object.keys(latestInfo).length) {
      setSkillsRequired(latestInfo?.skills);
      setCollege(latestInfo?.college);
      setPassOutYear(latestInfo?.passoutYear);
      setIsResumePresent(latestInfo?.resume ? true : false);
      setUsePreviousResume(latestInfo?.resume ? true : false);
    }
  }, [latestInfo]);

  function handleApply() {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const data = {
      hiringId,
    };
    axios
      .post(`${API_URL}api/v1/hiringRegistration`, data, {
        headers: {
          accessToken: getAccessToken(),
        },
      })
      .then((res) => {
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204
        ) {
          getHiringDataById(setHiring, hiringId);
        }
        setSnackbarMessage("You have applied successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setIsLoading(false);
      })
      .catch((res) => {
        if (res.status === 409) {
          window.alert("already applied!");
        }
        setSnackbarMessage(
          "Some server error occurred while applying for this job!"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsLoading(false);
      });

    const formData = new FormData();
    formData.append("userId", getUserId());
    formData.append("skills", skillsRequired);
    formData.append("college", college);
    formData.append("passoutYear", passOutYear);
    if (!usePreviousResume) {
      formData.append("resume", resume);
    } else {
      formData.append("useOldResume", true); // resume is already present in the database
    }
    axios
      .post(`${API_URL}api/v1/addUserLatestInfo`, formData, {
        headers: {
          accessToken: getAccessToken(),
        },
      })
      .then((res) => {
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204
        ) {
          console.log("User data saved ref");
          ref.current.click();
        }
      })
      .catch((err) => {
        console.log("Couldn't save user data");
      });
  }

  function handleClear() {
    setSkillsRequired([]);
    setCollege("");
    setPassOutYear("");
    setResume("");
    setUsePreviousResume(false);
    setErrors({
      skillsRequired: "",
      college: "",
      passOutYear: "",
      resume: "",
    });
  }

  return (
    <div
      className="modal fade"
      id="jobHiringModal"
      tabIndex="-1"
      aria-labelledby="jobHiringModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title heading-sm" id="jobHiringModalLabel">
              Apply for this job
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={ref}
            ></button>
          </div>
          <div className="modal-body">
            <FormInputMultiValue
              label="Enter your skills"
              id="skillsRequired"
              name="skillsRequired"
              required
              placeholder="Enter your skills one by one and hit enter"
              value={skillsRequired}
              setValue={setSkillsRequired}
              helperText={errors.skillsRequired}
              className="mb-4"
            />
            <FormInput
              label="Enter your college/university"
              id="collegeName"
              name="collegeName"
              required
              placeholder="Enter your college/university"
              value={college}
              setValue={setCollege}
              helperText={errors.college}
              className="mb-4"
            />
            <FormInputNumber
              label="Enter your graduation year"
              id="passoutYear"
              name="passoutYear"
              required
              placeholder="Enter your graduation year"
              value={passOutYear}
              setValue={setPassOutYear}
              helperText={errors.passOutYear}
              className="mb-4"
            />
            {isResumePresent && (
              <FormInputToggle
                label="Use previous resume"
                id="previousResume"
                name="previousResume"
                value={usePreviousResume}
                setValue={setUsePreviousResume}
                helperText={errors.usePreviousResume}
                className="mb-2"
              />
            )}
            {usePreviousResume ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "0 14px",
                  }}
                  className="mimic-file-upload"
                >
                  <FaFilePdf
                    style={{
                      color: "#ff1b0e",
                      fontSize: "1.5rem",
                      marginRight: ".5rem",
                    }}
                  />
                  <a
                    href={latestInfo?.resume}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="body-sm-regular override-link"
                  >
                    Click here to view resume
                  </a>
                </div>
              </>
            ) : (
              <FormInputFileUpload
                label="Upload your resume"
                id="resume"
                name="resume"
                required
                placeholder="Upload your resume"
                constraint="less than 2 MB"
                fileType="application/pdf,application/vnd.ms-excel"
                value={resume}
                setValue={setResume}
                helperText={errors.resume}
                className="mb-4"
              />
            )}
          </div>
          <div className="modal-footer justify-content-between">
            <button
              onClick={handleClear}
              className="clear-btn body-sm-semibold px-2 py-2"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              type="button"
              className="apply-btn body-sm-semibold"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
