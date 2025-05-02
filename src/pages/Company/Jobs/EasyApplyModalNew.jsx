import React, { useState } from "react";
import "./easyapplymodalnew.css";
import { CloseButtonSVG } from "../../../components/SvgsIconsComps/SvgsComps";
import FormInputDropdown from "../../../components/FormInputs/FormInputDropdown";
import FormInputToggle from "../../../components/FormInputs/FormInputToggle";
import FormInputNumber from "../../../components/FormInputs/FormInputNumber";
import FormInput from "../../../components/FormInputs/FormInput";
import { getAccessToken } from "../../../features/getCookieValues";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import FormInputFileUpload from "../../../components/FormInputs/FormInputFileUpload";

const EasyApplyModalNew = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
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
          ref.current.click();
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

  return (
    <div className="main-easy-apply-modal-div">
      <div className="main-easy-apply-new-modal-container">
        <div className="easy-apply-left-panel"></div>
        <div className="easy-apply-right-panel">
          <div className="easy-apply-right-panel-header">
            <h4 className="apply-for-this-job-h4">Apply for this job</h4>

            <div onClick={onClose}>
              <CloseButtonSVG />
            </div>
          </div>

          <div className="main-form-content-right-modal-div">
            <div className="modal-body">
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
                    className=""
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

            <div
              style={{
                width: "100%",
                height: "1.225rem",
                borderTop: "1px solid #b0b0b0",
                borderRadius: "0px",
              }}
            ></div>

            <div className="modal-footer last-footer-div justify-content-between">
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
    </div>
  );
};

export default EasyApplyModalNew;
