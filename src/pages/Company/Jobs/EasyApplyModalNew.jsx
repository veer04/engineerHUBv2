import React, { useEffect, useState } from "react";
import "./easyapplymodalnew.css";
import { CloseButtonSVG } from "../../../components/SvgsIconsComps/SvgsComps";
import FormInputDropdown from "../../../components/FormInputs/FormInputDropdown";
import FormInputToggle from "../../../components/FormInputs/FormInputToggle";
import FormInputNumber from "../../../components/FormInputs/FormInputNumber";
import FormInput from "../../../components/FormInputs/FormInput";
import { getAccessToken } from "../../../features/getCookieValues";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import FormInputFileUpload from "../../../components/FormInputs/FormInputFileUpload";
import DigitalCards from "../Referrals/DigitalProducts/DigitalCards";
import {
  API_URL,
  Bucket_URL,
  PAYMENT_API_URL,
} from "../../../services/APIUtils";
import axios from "axios";
import Loading from "../../../components/Loader/Loading";
import { getUserId } from "../../../features/User/UserDetails";
import { FaFilePdf } from "react-icons/fa";

const EasyApplyModalNew = ({
  isOpen,
  onClose,
  latestInfo = {},
  hiringId,
  setHiring,
}) => {
  if (!isOpen) return null;
  const [skillsRequired, setSkillsRequired] = useState("");
  const [college, setCollege] = useState("");
  const [passOutYear, setPassOutYear] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState(0);
  const [resume, setResume] = useState("");
  const [usePreviousResume, setUsePreviousResume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);

  const [errors, setErrors] = useState({
    skillsRequired: "",
    college: "",
    passOutYear: "",
    phone: "",
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
      phone: "",
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
    if (!phone) {
      errors.phone = "Phone number is required";
      isValid = false;
      addToErrorStack("#phone");
    } else if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
      addToErrorStack("#phone");
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
      phone: "",
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
    if (!phone) {
      errors.phone = "Phone number is required";
      isValid = false;
      addToErrorStack("#phone");
    } else if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
      addToErrorStack("#phone");
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
      setPhone(latestInfo?.phone || "");
      setExperience(latestInfo?.experience);
      setIsResumePresent(latestInfo?.resume ? true : false);
      setUsePreviousResume(latestInfo?.resume ? true : false);
    }
  }, [latestInfo]);

  // Also check for user's mobile number from profile if available
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}api/v1/getUserWithId`, {
          headers: {
            accessToken: getAccessToken(),
          },
        });
        const userData = response.data?.data;
        if (userData?.mobile && !phone) {
          setPhone(userData.mobile.toString());
        }
      } catch (error) {
        console.log("Could not fetch user profile for mobile number");
      }
    };
    
    if (!phone && Object.keys(latestInfo).length === 0) {
      fetchUserProfile();
    }
  }, [phone, latestInfo]);

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
        console.error("Resume Upload Error:", err?.response || err);
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
      phone,
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
    formData.append("phone", phone);
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
    setPhone("");
    setExperience(0);
    setResume("");
    setUsePreviousResume(false);
    setErrors({
      skillsRequired: "",
      college: "",
      passOutYear: "",
      phone: "",
      experience: "",
      resume: "",
    });
  }

  const getallProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/course/open`,
        config
      );

      console.log(data, "productData");

      // const shuffleData = shuffleArrayData(data.data);
      // setCourseData(shuffleData);
      const sortedData = sortDataByCustomOrder(data.data);
      setCourseData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const rating = [5];
  const popular = ["Popular"];
  const customOrder = [
    "ATS-Friendly Templates for Frontend, Backend, and Full-Stack Roles",
  ];

  // useEffect(() => {
  //   getallProductData();
  // }, []);

  const getallProductData1 = () => {
    const dummyData = [
      {
        _id: "66e1e87b6a46c46b0623a205",
        discount: 50,
        price: 49,
        mrp: 199,
        thumbnail: `${Bucket_URL}image_demo.jpg`,
        title:
          "ATS-Friendly Templates for Frontend, Backend, and Full-Stack Roles",
        subTitle: "Get hired faster with industry-standard resumes",
        description:
          "High-quality, ATS-friendly resume templates designed by hiring experts.",
        type: "digital",
      },
      // Add more dummy products if needed
    ];

    setCourseData(dummyData);
  };

  useEffect(() => {
    getallProductData1();
  }, []);

  return (
    <div className="main-easy-apply-modal-div">
      <div className="main-easy-apply-new-modal-container">
        <div className="easy-apply-left-panel">
          <h3 className="h3-apply-left-head">
            Lets build a{" "}
            <span style={{ backgroundColor: "#fdf751" }}> perfect</span> resume
            first !{" "}
          </h3>

          <div className="middle-div">
            {courseData
              ?.filter((card) => customOrder.includes(card.title))
              .map((card, index) => (
                <DigitalCards
                  key={card._id}
                  id={card._id}
                  discount={card.discount}
                  price={card.price}
                  mrp={card.mrp}
                  thumbnail={card.thumbnail}
                  title={card.title}
                  subTitle={card.subTitle}
                  desc={card.description}
                  type={card.type}
                  rating={rating[index % rating.length]}
                  popular={popular[index % popular.length]}
                />
              ))}
          </div>

          <div className="last-div-left-panel">
            <h3 className="what-u-will-get-h3">what you will get ?</h3>

            <div>
              <ol style={{ marginBottom: 0 }}>
                <li style={{ fontSize: "0.9rem" }}>
                  <span>95+ ATS score resume </span>
                </li>

                <li style={{ fontSize: "0.9rem" }}>
                  <span>Free guidance by our instructor</span>
                </li>

                <li style={{ fontSize: "0.9rem" }}>
                  <span>Life time validity</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* //right div starts */}
        <div className="easy-apply-right-panel">
          <div className="easy-apply-right-panel-header">
            <h4 className="apply-for-this-job-h4">Apply for this job</h4>

            <div onClick={onClose} style={{ cursor: "pointer" }}>
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
                className="mb-3"
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
                className="mb-3"
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
                className="mb-3"
              />
              <FormInput
                label="Enter your phone number"
                id="phone"
                name="phone"
                required
                placeholder="Enter your phone number"
                value={phone}
                setValue={setPhone}
                helperText={errors.phone}
                className="mb-3"
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
                  className="mb-4"
                />
              )}
              {usePreviousResume ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      padding: "10px 14px",
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
