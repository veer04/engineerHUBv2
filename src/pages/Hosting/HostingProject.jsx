import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  getAccessToken,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { API_URL, Bucket_URL, EDITOR_API_KEY } from "../../services/APIUtils";
import { changeDocumentTitle } from "../../features/changeDocumentTitle";
import axios from "axios";
import useNavbar from "../../hooks/use-navbar";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import FormIndicator from "../../components/FormInputs/FormIndicator";
import FormInput from "../../components/FormInputs/FormInput";
import FormInputTextarea from "../../components/FormInputs/FormInputTextarea";
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import FormInputFileUpload from "../../components/FormInputs/FormInputFileUpload";
import FormInputSelect from "../../components/FormInputs/FormInputSelect";
import FormInputSelectOption from "../../components/FormInputs/FormInputSelectOption";
import FormInputDateTime from "../../components/FormInputs/FormInputDateTime";
import FormInputToggle from "../../components/FormInputs/FormInputToggle";
import FormInputLink from "../../components/FormInputs/FormInputLink";
import FormInputEmail from "../../components/FormInputs/FormInputEmail";
import FormInputPhoneNumber from "../../components/FormInputs/FormInputPhoneNumber";
import FormButton from "../../components/FormInputs/FormButton";
import "./HostingCulturalEvent.css";
import FormInputMultiValue from "../../components/FormInputs/FormInputMultiValue";
import FormInputAutocomplete from "../../components/FormInputs/FormInputAutocomplete";
import FormInputNumber from "../../components/FormInputs/FormInputNumber";
import { Editor } from "@tinymce/tinymce-react";

export default function HostingProject() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  changeDocumentTitle("Host a Project | engineerHUB");
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const totalPages = 3;
  const [currentPage, setCurrentPage] = useState(2);
  const [hostName, setHostName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [alternateCountryCode, setAlternateCountryCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectPoster, setProjectPoster] = useState("");
  const [showSalaryToCandidates, setShowSalaryToCandidates] = useState(true);
  const [spendType, setSpendType] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [hourlyBasis, setHourlyBasis] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [projectDomain, setProjectDomain] = useState({});
  const [projectDomainOther, setProjectDomainOther] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [experienceRequired, setExperienceRequired] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [durationType, setDurationType] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [previouslyViewedPageNumber, setPreviouslyViewedPageNumber] =
    useState(1);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [errors, setErrors] = useState({
    hostName: "",
    profilePicture: "",
    profileLink: "",
    contactNumber: "",
    alternateContactNumber: "",
    contactEmail: "",
    projectTitle: "",
    projectDescription: "",
    projectPoster: "",
    spendType: "",
    fixedAmount: "",
    hourlyBasis: "",
    minAmount: "",
    maxAmount: "",
    projectDomain: "",
    projectDomainOther: "",
    techStack: "",
    experienceRequired: "",
    projectStartDate: "",
    projectEndDate: "",
    durationType: "",
    estimatedTime: "",
    applyLink: "",
  });
  let errorStack = [];
  const eventTypeOptions = [
    {
      label: "Technical Event",
      value: "Technical",
    },
    {
      label: "Cultural Event",
      value: "Cultural",
    },
    {
      label: "Hackathon",
      value: "Hackathon",
    },
    {
      label: "Webinar",
      value: "Webinar",
    },
  ];
  const eventCategoryOptions = [
    {
      label: "College Event",
      value: "collegeEvent",
    },
    {
      label: "Workshop",
      value: "Workshop",
    },
  ];
  const domainOptions = [
    {
      label: "Data Structures & Algorithms",
      value: "Data Structures & Algorithms",
    },
    { label: "Web Development", value: "Web Development" },
    { label: "App Development", value: "App Development" },
    { label: "Machine Learning & AI", value: "Machine Learning & AI" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "Cyber Security", value: "Cyber Security" },
    { label: "DevOps", value: "DevOps" },
    { label: "Other", value: "Other" },
  ];
  const experience = [
    "Fresher",
    "1+ years",
    "2+ years",
    "3+ years",
    "4+ years",
    "5+ years",
    "6+ years",
    "7+ years",
    "8+ years",
    "9+ years",
    "10+ years",
  ];

  useEffect(() => {
    // window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
  }, []);

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

  function validateForm1() {
    let isValid = true;
    const errors = {
      hostName: "",
      profilePicture: "",
      profileLink: "",
      contactNumber: "",
      alternateContactNumber: "",
      contactEmail: "",
    };

    if (!hostName) {
      errors.hostName = "Host name is required";
      isValid = false;
      addToErrorStack("#hostName");
    } else if (hostName.length < 5) {
      errors.hostName = "Host name should be minimum 5 characters";
      isValid = false;
      addToErrorStack("#hostName");
    } else if (hostName.length > 100) {
      errors.hostName = "Host name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#hostName");
    }

    if (!profilePicture) {
      errors.profilePicture = "Profile picture is required";
      isValid = false;
      addToErrorStack("#profilePicture");
    } else if (!profilePicture?.type?.includes("image")) {
      errors.profilePicture = "Please upload an image file";
      isValid = false;
      addToErrorStack("#profilePicture");
    } else if (profilePicture?.size > 1024 * 1024) {
      errors.profilePicture = "File size should be less than 1MB";
      isValid = false;
      addToErrorStack("#profilePicture");
    }

    if (profileLink && !profileLink.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      errors.profileLink =
        "Please enter a valid URL. (Ex: https://www.linkedin.com/company/engineersummit/mycompany/)";
      isValid = false;
      addToErrorStack("#profileLink");
    }

    if (!contactNumber) {
      errors.contactNumber = "Contact number is required";
      isValid = false;
      addToErrorStack("#contactNumber");
    } else if (!contactNumber.match(/^\d{10}$/)) {
      errors.contactNumber = "Please enter a valid contact number";
      isValid = false;
      addToErrorStack("#contactNumber");
    }

    if (alternateContactNumber && !alternateContactNumber.match(/^\d{10}$/)) {
      errors.alternateContactNumber = "Please enter a valid contact number";
      isValid = false;
      addToErrorStack("#alternateContactNumber");
    }

    if (!contactEmail) {
      errors.contactEmail = "Contact email is required";
      isValid = false;
      addToErrorStack("#contactEmail");
    } else if (!contactEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.contactEmail = "Please enter a valid email address";
      isValid = false;
      addToErrorStack("#contactEmail");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  function validateForm2() {
    let isValid = true;
    const errors = {
      projectTitle: "",
      projectDescription: "",
      projectPoster: "",
      spendType: "",
      fixedAmount: "",
      hourlyBasis: "",
      minAmount: "",
      maxAmount: "",
    };

    if (!projectTitle) {
      errors.projectTitle = "Project title is required";
      isValid = false;
      addToErrorStack("#projectTitle");
    } else if (projectTitle.length < 5) {
      errors.projectTitle = "Project title should be minimum 5 characters";
      isValid = false;
      addToErrorStack("#projectTitle");
    } else if (projectTitle.length > 100) {
      errors.projectTitle = "Project title should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#projectTitle");
    }

    if (!projectDescription) {
      errors.projectDescription = "Project description is required";
      isValid = false;
      addToErrorStack("#projectDescription");
    } else if (projectDescription.length < 100) {
      errors.projectDescription =
        "Project description should be minimum 100 characters";
      isValid = false;
      addToErrorStack("#projectDescription");
    } else if (projectDescription.length > 10000) {
      errors.projectDescription =
        "Project description should be maximum 10000 characters";
      isValid = false;
      addToErrorStack("#projectDescription");
    }

    if (!projectPoster) {
      errors.projectPoster = "Project poster is required";
      isValid = false;
      addToErrorStack("#projectPoster");
    } else if (!projectPoster?.type?.includes("image")) {
      errors.projectPoster = "Please upload an image file";
      isValid = false;
      addToErrorStack("#projectPoster");
    } else if (projectPoster?.size > 1024 * 1024 * 5) {
      errors.projectPoster = "File size should be less than 5MB";
      isValid = false;
      addToErrorStack("#projectPoster");
    }

    if (!spendType) {
      errors.spendType = "Spend type is required";
      isValid = false;
      addToErrorStack("#spendType");
    }

    if (spendType === "fixed" && !fixedAmount) {
      errors.fixedAmount = "Fixed amount is required";
      isValid = false;
      addToErrorStack("#fixedAmount");
    }

    if (spendType === "hourly" && !hourlyBasis) {
      errors.hourlyBasis = "Hourly basis amount is required";
      isValid = false;
      addToErrorStack("#hourlyBasis");
    }

    if (spendType === "range" && !minAmount) {
      errors.minAmount = "Minimum amount is required";
      isValid = false;
      addToErrorStack("#minAmount");
    }

    if (spendType === "range" && !maxAmount) {
      errors.maxAmount = "Maximum amount is required";
      isValid = false;
      addToErrorStack("#maxAmount");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  function validateForm3() {
    let isValid = true;
    const errors = {
      projectDomain: "",
      projectDomainOther: "",
      techStack: "",
      experienceRequired: "",
      projectStartDate: "",
      projectEndDate: "",
      durationType: "",
      estimatedTime: "",
      applyLink: "",
    };

    if (Object.keys(projectDomain).length === 0) {
      errors.projectDomain = "Project domain is required";
      isValid = false;
      addToErrorStack("#projectDomain");
    }

    if (projectDomain?.value === "Other" && !projectDomainOther) {
      errors.projectDomainOther = "Domain name is required";
      isValid = false;
      addToErrorStack("#projectDomainOther");
    }

    if (techStack.length === 0) {
      errors.techStack = "Skills are required";
      isValid = false;
      addToErrorStack("#techStack");
    }

    if (!experienceRequired) {
      errors.experienceRequired = "Experience is required";
      isValid = false;
      addToErrorStack("#experienceRequired");
    }

    if (!projectStartDate) {
      errors.projectStartDate = "Registration start date is required";
      isValid = false;
      addToErrorStack("#projectStartDate");
    }

    if (!projectEndDate) {
      errors.projectEndDate = "Registration end date is required";
      isValid = false;
      addToErrorStack("#projectEndDate");
    }

    if (!durationType) {
      errors.durationType = "Duration type is required";
      isValid = false;
      addToErrorStack("#durationType");
    }

    if (!estimatedTime) {
      errors.estimatedTime = "Estimated time is required";
      isValid = false;
      addToErrorStack("#estimatedTime");
    }

    if (applyLink && !applyLink.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      errors.applyLink =
        "Please enter a valid URL (for example: https://www.engineerhub.in)";
      isValid = false;
      addToErrorStack("#applyLink");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  async function submitForm() {
    const form = new FormData();
    form.append("hostName", hostName);
    form.append("profilePicture", profilePicture);
    form.append("websiteUrl", profileLink);
    form.append("mobileNo", contactNumber);
    form.append("mobileCountryCode", countryCode);
    form.append("alternateMobileNo", alternateContactNumber);
    form.append("alternateMobileCountryCode", alternateCountryCode);
    form.append("contactEmail", contactEmail);
    form.append("projectName", projectTitle);
    form.append("description", projectDescription);
    form.append("projectPoster", projectPoster);
    form.append("showPayDetails", showSalaryToCandidates);
    if (showSalaryToCandidates) {
      form.append("payingMethod", spendType);
      if (spendType === "fixed") {
        form.append("fixedAmount", fixedAmount);
      } else if (spendType === "hourly")
        form.append("amountPerHour", hourlyBasis);
      else if (spendType === "range") {
        form.append("minRange", minAmount);
        form.append("maxRange", maxAmount);
      }
    }
    form.append(
      "domainName",
      projectDomain?.value === "Other"
        ? projectDomainOther
        : projectDomain?.value
    );
    form.append("techStack", techStack);
    form.append("experience", experienceRequired);
    form.append("projectStartTime", projectStartDate);
    form.append("projectEndTime", projectEndDate);
    form.append("estimatedTime", estimatedTime);
    form.append("timePeriod", durationType);
    form.append("applyLink", applyLink);

    setIsLoading(true);
    await axios
      .post(`${API_URL}api/v1/projectHiring`, form, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            New project created.{" "}
            <Link
              to={`/company/projects/${res?.data?.data?._id}`}
              style={{ color: "rgb(13, 110, 253)" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Click here
            </Link>{" "}
            to view
          </>
        );
        setSnackbarSeverity("success");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        emptyAllFields();
        setCurrentPage(1);
        setPreviouslyViewedPageNumber(1);
      })
      .catch((err) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            <span>Failed to create project</span>
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
      });
  }

  function emptyAllFields() {
    setHostName("");
    setProfilePicture("");
    setProfileLink("");
    setContactNumber("");
    setCountryCode("");
    setAlternateContactNumber("");
    setAlternateCountryCode("");
    setContactEmail("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectPoster("");
    setSpendType("");
    setFixedAmount("");
    setHourlyBasis("");
    setMinAmount("");
    setMaxAmount("");
    setProjectDomain({});
    setProjectDomainOther("");
    setTechStack([]);
    setExperienceRequired("");
    setDurationType("");
    setEstimatedTime("");
    setApplyLink("");
  }

  function handleNextPage() {
    // if the next page is not yet viewed then move to next page and scroll to top else only just move to next page
    if (previouslyViewedPageNumber === currentPage) {
      setCurrentPage((prev) => prev + 1);
      setPreviouslyViewedPageNumber((prev) => prev + 1);
      window.scrollTo({
        behavior: "smooth",
        top: document.getElementById("content").offsetTop - 200,
      });
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage === 1) {
      if (validateForm1()) handleNextPage();
    } else if (currentPage === 2) {
      if (validateForm2()) handleNextPage();
    } else if (currentPage === 3) {
      if (validateForm3()) submitForm();
    }
  };

  return (
    <main className="hosting-container">
      <aside
        style={{
          backgroundImage: `url(${bucket}project-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>Let’s get it done best at the cheapest</p>
          <p>
            Thank you alma/company for posting exciting projects for us
            <br />– Manish Sharma, 3rd Year
          </p>
        </div>
      </aside>
      <section className="main">
        <div className="header">
          <span onClick={() => navigate(`/host`)} className="navigate-back">
            <IoIosArrowBack /> Back
          </span>
          <div
            style={{
              backgroundImage: `url(${bucket}project-poster-small.png)`,
            }}
            className="poster-container-mobile"
          />
          <h1 className="title">Project</h1>
          <FormIndicator
            className="mt-2"
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
        <div id="content" className="content">
          {currentPage === 1 && (
            <>
              <h2>Basic Details</h2>

              <FormInput
                label="Host Name"
                id="hostName"
                name="hostName"
                required
                placeholder="Enter your name"
                value={hostName}
                setValue={setHostName}
                helperText={errors.hostName}
                className="mb-4"
              />

              <FormInputFileUpload
                label="Profile Picture"
                id="profilePicture"
                name="profilePicture"
                required
                placeholder="Upload your profile picture"
                constraint="less than 1 MB"
                fileType="image/*"
                value={profilePicture}
                setValue={setProfilePicture}
                helperText={errors.profilePicture}
                className="mb-4"
              />

              <FormInputLink
                label="Profile Link"
                id="profileLink"
                name="profileLink"
                placeholder="Enter your profile link"
                value={profileLink}
                setValue={setProfileLink}
                helperText={errors.profileLink}
                className="mb-4"
              />

              <h2>Contact Details</h2>

              <FormInputPhoneNumber
                label="Contact Number"
                id="contactNumber"
                name="contactNumber"
                required
                placeholder="Enter your Contact Number"
                value={contactNumber}
                setValue={setContactNumber}
                countryCodeValue={countryCode}
                setCountryCodeValue={setCountryCode}
                defaultCountryCode="91"
                helperText={errors.contactNumber}
                className="mb-4"
              />

              <FormInputPhoneNumber
                label="Alternate Contact Number"
                id="alternateContactNumber"
                name="alternateContactNumber"
                placeholder="Enter your Alternate Contact Number"
                value={alternateContactNumber}
                setValue={setAlternateContactNumber}
                countryCodeValue={alternateCountryCode}
                setCountryCodeValue={setAlternateCountryCode}
                defaultCountryCode="91"
                helperText={errors.alternateContactNumber}
                className="mb-4"
              />

              <FormInputEmail
                label="Contact Email"
                id="contactEmail"
                name="contactEmail"
                required
                placeholder="Enter your Contact Email"
                value={contactEmail}
                setValue={setContactEmail}
                helperText={errors.contactEmail}
                className="mb-4"
              />
            </>
          )}

          {currentPage === 2 && (
            <>
              <h2>Project Details</h2>

              <FormInput
                label="Project Title"
                id="projectTitle"
                name="projectTitle"
                required
                placeholder="Enter your Project Title"
                value={projectTitle}
                setValue={setProjectTitle}
                helperText={errors.projectTitle}
                className="mb-4"
              />

              <FormInputFileUpload
                label="Project Poster"
                id="projectPoster"
                name="projectPoster"
                required
                placeholder="Upload Project Poster"
                constraint="less than 2 MB"
                fileType="image/*"
                value={projectPoster}
                setValue={setProjectPoster}
                helperText={errors.projectPoster}
                className="mb-4"
              />

              <h2>Project Description</h2>

              <div className="mb-4">
                <Editor
                  apiKey={EDITOR_API_KEY}
                  value={projectDescription}
                  onEditorChange={(content) => {
                    setProjectDescription(content);
                  }}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
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
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {/* <button onClick={log}>Log editor content</button> */}
              </div>

              <h2>Pay Details</h2>

              <FormInputToggle
                label="Show Amount to Candidates"
                id="showSalaryToCandidates"
                name="showSalaryToCandidates"
                value={showSalaryToCandidates}
                setValue={setShowSalaryToCandidates}
                className={showSalaryToCandidates ? `mb-4` : `mb-1`}
              />

              <FormInputSelect
                label="I am looking to spend"
                id="spendType"
                name="spendType"
                required
                helperText={errors.spendType}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Fixed Amount"
                    value={spendType}
                    setValue={setSpendType}
                    result="fixed"
                    helperText={errors.spendType}
                  />
                  <FormInputSelectOption
                    label="Hourly Basis"
                    value={spendType}
                    setValue={setSpendType}
                    result="hourly"
                    helperText={errors.spendType}
                  />
                  <FormInputSelectOption
                    label="Range"
                    value={spendType}
                    setValue={setSpendType}
                    result="range"
                    helperText={errors.spendType}
                  />
                </div>
              </FormInputSelect>

              {spendType === "fixed" && (
                <FormInputNumber
                  label="Fixed Amount (in INR)"
                  id="fixedAmount"
                  name="fixedAmount"
                  required
                  placeholder="Enter Fixed Amount"
                  value={fixedAmount}
                  setValue={setFixedAmount}
                  helperText={errors.fixedAmount}
                  className="mb-4"
                />
              )}

              {spendType === "hourly" && (
                <FormInputNumber
                  label="Hourly Basis (in INR)"
                  id="hourlyBasis"
                  name="hourlyBasis"
                  required
                  placeholder="Enter Hourly Basis"
                  value={hourlyBasis}
                  setValue={setHourlyBasis}
                  helperText={errors.hourlyBasis}
                  className="mb-4"
                />
              )}

              {spendType === "range" && (
                <>
                  <FormInputNumber
                    label="Minimum Amount (in INR)"
                    id="minAmount"
                    name="minAmount"
                    required
                    placeholder="Enter Minimum Amount"
                    value={minAmount}
                    setValue={setMinAmount}
                    helperText={errors.minAmount}
                    className="mb-4"
                  />
                  <FormInputNumber
                    label="Maximum Amount (in INR)"
                    id="maxAmount"
                    name="maxAmount"
                    required
                    placeholder="Enter Maximum Amount"
                    value={maxAmount}
                    setValue={setMaxAmount}
                    helperText={errors.maxAmount}
                    className="mb-4"
                  />
                </>
              )}
            </>
          )}
          {currentPage === 3 && (
            <>
              <FormInputDropdown
                label="Domain Name"
                id="projectDomain"
                name="projectDomain"
                required
                placeholder="Select your domain"
                value={projectDomain}
                setValue={setProjectDomain}
                options={domainOptions}
                helperText={errors.projectDomain}
                className={`${
                  projectDomain?.value === "Other" ? "mb-1" : "mb-4"
                }`}
              />
              {projectDomain?.value === "Other" && (
                <FormInput
                  id="projectDomainOther"
                  name="projectDomainOther"
                  caption="If other, please specify"
                  placeholder="Enter your domain"
                  value={projectDomainOther}
                  setValue={setProjectDomainOther}
                  helperText={errors.projectDomainOther}
                  className="mb-4"
                />
              )}

              <FormInputMultiValue
                label="Skills Required"
                id="techStack"
                name="techStack"
                required
                placeholder="Enter Skills required"
                value={techStack}
                setValue={setTechStack}
                helperText={errors.techStack}
                className="mb-4"
              />

              <FormInputAutocomplete
                label="Experience Required"
                id="experienceRequired"
                name="experienceRequired"
                required
                placeholder="Select Experience Required"
                value={experienceRequired}
                setValue={setExperienceRequired}
                options={experience}
                helperText={errors.experienceRequired}
                className="mb-4"
              />

              <FormInputDateTime
                label="Project Registration Start Date"
                id="projectStartDate"
                name="projectStartDate"
                required
                value={projectStartDate}
                setValue={setProjectStartDate}
                helperText={errors.projectStartDate}
                className="mb-4"
              />

              <FormInputDateTime
                label="Project Registration End Date"
                id="projectEndDate"
                name="projectEndDate"
                required
                value={projectEndDate}
                setValue={setProjectEndDate}
                helperText={errors.projectEndDate}
                className="mb-4"
              />

              <FormInputNumber
                label="Project Duration"
                id="estimatedTime"
                name="estimatedTime"
                required
                placeholder="Enter Project Duration"
                value={estimatedTime}
                setValue={setEstimatedTime}
                helperText={errors.estimatedTime}
                className="mb-1"
              />

              <FormInputSelect
                // label="Duration Type"
                id="durationType"
                name="durationType"
                required
                helperText={errors.durationType}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Days"
                    value={durationType}
                    setValue={setDurationType}
                    result="Days"
                    helperText={errors.durationType}
                  />
                  <FormInputSelectOption
                    label="Weeks"
                    value={durationType}
                    setValue={setDurationType}
                    result="Weeks"
                    helperText={errors.durationType}
                  />
                  <FormInputSelectOption
                    label="Months"
                    value={durationType}
                    setValue={setDurationType}
                    result="Months"
                    helperText={errors.durationType}
                  />
                  <FormInputSelectOption
                    label="Years"
                    value={durationType}
                    setValue={setDurationType}
                    result="Years"
                    helperText={errors.durationType}
                  />
                </div>
              </FormInputSelect>

              <FormInputLink
                label="Apply Link"
                id="applyLink"
                name="applyLink"
                // required
                caption="The URL can be your organization’s website or an opportunity related URL"
                placeholder="https://"
                value={applyLink}
                setValue={setApplyLink}
                helperText={errors.applyLink}
                className="mb-4"
              />
            </>
          )}
          <div className="d-flex justify-content-between form-buttons-container">
            <FormButton disabled={currentPage === 1} onClick={handlePrevious}>
              Previous
            </FormButton>
            <FormButton onClick={handleNext} isLoading={isLoading}>
              {currentPage === totalPages ? "Submit" : "Next"}
            </FormButton>
          </div>
        </div>
      </section>
    </main>
  );
}
