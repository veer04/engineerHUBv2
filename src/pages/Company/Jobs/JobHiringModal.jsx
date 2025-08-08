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
import FormInputDropdown from "../../../components/FormInputs/FormInputDropdown";
import EasyApplyModalNew from "./EasyApplyModalNew";

// Global state for modal
let modalState = {
  isOpen: false,
  setOpen: null
};

export default function JobHiringModal({
  latestInfo = {},
  hiringId,
  setHiring,
}) {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillsRequired, setSkillsRequired] = useState("");
  const [college, setCollege] = useState("");
  const [passOutYear, setPassOutYear] = useState("");
  const [experience, setExperience] = useState(0);
  const [resume, setResume] = useState("");
  const [usePreviousResume, setUsePreviousResume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    skillsRequired: "",
    college: "",
    passOutYear: "",
    experience: "",
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
  const experienceDropdown = [
    { label: "No experience", value: 0 },
    { label: "1 year", value: 1 },
    { label: "2 years", value: 2 },
    { label: "3 years", value: 3 },
    { label: "4 years", value: 4 },
    { label: "5 years", value: 5 },
    { label: "6 years", value: 6 },
    { label: "7 years", value: 7 },
    { label: "8 years", value: 8 },
    { label: "9 years", value: 9 },
    { label: "10+ years", value: 10 },
  ];

  // Set up global modal state
  useEffect(() => {
    modalState.setOpen = setIsModalOpen;
    modalState.isOpen = isModalOpen;
  }, [isModalOpen]);

  // Listen for modal open events
  useEffect(() => {
    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    // Listen for clicks on Easy Apply buttons
    document.addEventListener('click', (e) => {
      if (e.target && e.target.matches('[data-bs-target="#jobHiringModal"]')) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    });

    // Listen for custom Easy Apply button clicks
    document.addEventListener('click', (e) => {
      if (e.target && e.target.textContent === 'Easy Apply') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    });

    return () => {
      document.removeEventListener('click', handleModalOpen);
    };
  }, []);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
      experience: "",
      resume: "",
    };

    if (!skillsRequired) {
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
    if (!experience) {
      errors.experience = "Experience is required";
      isValid = false;
      addToErrorStack("#experience");
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
      setExperience(latestInfo?.experience);
      setIsResumePresent(latestInfo?.resume ? true : false);
      setUsePreviousResume(latestInfo?.resume ? true : false);
    }
  }, [latestInfo]);

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  function registerWithNewResume() {
    const form = new FormData();
    form.append("resume", resume);
    let resumeLink = "";
    axios
      .patch(`${API_URL}api/v1/user/resumeUpdate`, form, config)
      .then((res) => {
        setSnackbarMessage("Resume uploaded successfully!");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
        resumeLink = res?.data?.data;
        submitData(resumeLink);
      })
      .catch((err) => {
        setSnackbarMessage("Couldn't upload resume!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsLoading(false);
        return;
      });
  }

  function registerWithPreviousResume() {
    submitData(latestInfo?.resume);
  }

  function submitData(resumeLink) {
    const skillsRequiredString = Array.isArray(skillsRequired)
      ? skillsRequired
          .map((skill) =>
            skill
              .split(",")
              .map((s) => s.trim())
              .join(", ")
          )
          .join(", ")
      : skillsRequired;
    const data = {
      hiringId,
      skills: skillsRequiredString,
      college,
      batch: passOutYear,
      experience: experience.value,
      resume: resumeLink,
    };

    axios
      .post(`${API_URL}api/v1/hiringRegistration`, data, config)
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
        setIsModalOpen(false);
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
    formData.append("skills", skillsRequiredString);
    formData.append("college", college);
    formData.append("passoutYear", passOutYear);
    formData.append("experience", experience);
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
        }
      })
      .catch((err) => {
        console.log("Couldn't save user data");
      });
  }

  function handleApply() {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    if (!usePreviousResume) {
      registerWithNewResume();
    } else {
      registerWithPreviousResume();
    }
  }

  function handleClear() {
    setSkillsRequired("");
    setCollege("");
    setPassOutYear("");
    setExperience(0);
    setResume("");
    setUsePreviousResume(false);
    setErrors({
      skillsRequired: "",
      college: "",
      passOutYear: "",
      experience: "",
      resume: "",
    });
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="custom-modal-overlay" onClick={closeModal}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h1 className="custom-modal-title">Apply for this job</h1>
          <button
            type="button"
            className="custom-modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="custom-modal-body">
          <FormInput
            label="Enter your skills"
            id="skillsRequired"
            name="skillsRequired"
            required
            placeholder="Enter your skills separated by commas"
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
          <FormInputDropdown
            label="Experience"
            id="experience"
            name="experience"
            required
            placeholder="Select Experience"
            value={experience}
            setValue={setExperience}
            options={experienceDropdown}
            helperText={errors.experience}
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
        <div className="custom-modal-footer">
          <button
            onClick={handleClear}
            className="custom-modal-clear-btn"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            type="button"
            className="custom-modal-apply-btn"
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the global modal state for other components to use
export { modalState };
