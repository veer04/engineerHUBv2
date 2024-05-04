import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Editor } from "@tinymce/tinymce-react";
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
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import FormInputFileUpload from "../../components/FormInputs/FormInputFileUpload";
import FormInputSelect from "../../components/FormInputs/FormInputSelect";
import FormInputSelectOption from "../../components/FormInputs/FormInputSelectOption";
import FormInputDate from "../../components/FormInputs/FormInputDate";
import FormInputToggle from "../../components/FormInputs/FormInputToggle";
import FormInputLink from "../../components/FormInputs/FormInputLink";
import FormInputEmail from "../../components/FormInputs/FormInputEmail";
import FormInputPhoneNumber from "../../components/FormInputs/FormInputPhoneNumber";
import FormButton from "../../components/FormInputs/FormButton";
import "./HostingCulturalEvent.css";
import FormInputMultiValue from "../../components/FormInputs/FormInputMultiValue";
import FormInputNumber from "../../components/FormInputs/FormInputNumber";
import {
  getAllCountries,
  getCitiesByState,
  getStatesByCountry,
} from "../../services/APIConfig";
import {
  emailExpression,
  linkWithHttpExpression,
  mobileNumberExpression,
} from "../../features/regex";

export default function HostingJob() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  changeDocumentTitle("Host a Job | engineerHUB");
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
  const [currentPage, setCurrentPage] = useState(1);
  const [organisationName, setOrganisationName] = useState("");
  const [organisationLogo, setOrganisationLogo] = useState("");
  const [organisationLink, setOrganisationLink] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [opportunityMode, setOpportunityMode] = useState("");
  const [opportunityLocation, setOpportunityLocation] = useState("");
  const [opportunityCity, setOpportunityCity] = useState({});
  const [opportunityState, setOpportunityState] = useState({});
  const [opportunityCountry, setOpportunityCountry] = useState({});
  const [allCities, setAllCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allCitiesCopy, setAllCitiesCopy] = useState([]);
  const [allStatesCopy, setAllStatesCopy] = useState([]);
  const [allCountriesCopy, setAllCountriesCopy] = useState([]);
  const [applicationStartDate, setApplicationStartDate] = useState("");
  const [applicationEndDate, setApplicationEndDate] = useState("");
  const [opportunityDescription, setOpportunityDescription] = useState("");
  const [salaryUnit, setSalaryUnit] = useState("CTC");
  const [salaryType, setSalaryType] = useState("Fixed");
  const [fixedAmount, setFixedAmount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showSalaryToCandidates, setShowSalaryToCandidates] = useState(true);
  const [customSalary, setCustomSalary] = useState("");
  const [minExperience, setMinExperience] = useState({});
  const [maxExperience, setMaxExperience] = useState({});
  const [jobIsForFresher, setJobIsForFresher] = useState(false);
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [openings, setOpenings] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
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
    organisationName: "",
    organisationLogo: "",
    organisationLink: "",
    contactNumber: "",
    contactEmail: "",

    opportunityName: "",
    opportunityMode: "",
    opportunityLocation: "",
    opportunityCountry: "",
    opportunityState: "",
    opportunityCity: "",
    applicationStartDate: "",
    applicationEndDate: "",
    opportunityDescription: "",
    salaryUnit: "",
    salaryType: "",
    fixedAmount: "",
    minAmount: "",
    maxAmount: "",
    showSalaryToCandidates: "",
    customSalary: "",

    minExperience: "",
    maxExperience: "",
    jobIsForFresher: "",
    skillsRequired: "",
    openings: "",
    minCGPA: "",
    applyLink: "",
  });
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    getAllCountries(setAllCountries);
  }, []);

  useEffect(() => {
    if (allCountries.length > 0) {
      // allCountries has array of object like {country: "India", countryCode: "IN"} so that will be copied to allCountriesCopy as {label: "India",value: "IN"}
      setAllCountriesCopy(
        allCountries.map((country) => ({
          label: country.country,
          value: country.countryCode,
        }))
      );
    }
  }, [allCountries]);

  useEffect(() => {
    if (Object.keys(opportunityCountry).length > 0) {
      getStatesByCountry(setAllStates, opportunityCountry.value);
    }
  }, [opportunityCountry]);

  useEffect(() => {
    if (allStates.length > 0) {
      setAllStatesCopy(
        allStates.map((state) => ({
          label: state.state,
          value: state.stateCode,
        }))
      );
    }
  }, [allStates]);

  useEffect(() => {
    if (Object.keys(opportunityState).length > 0) {
      getCitiesByState(
        setAllCities,
        opportunityCountry.value,
        opportunityState.value
      );
    }
  }, [opportunityState]);

  useEffect(() => {
    if (allCities.length > 0) {
      setAllCitiesCopy(
        allCities.map((city) => ({
          label: city.city,
          value: city.city,
        }))
      );
    }
  }, [allCities]);

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
      organisationName: "",
      organisationLogo: "",
      organisationLink: "",
      contactNumber: "",
      contactEmail: "",
    };

    if (!organisationName) {
      errors.organisationName = "Organisation name is required";
      isValid = false;
      addToErrorStack("#organisationName");
    } else if (organisationName.length < 3) {
      errors.organisationName =
        "Organisation name should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#organisationName");
    } else if (organisationName.length > 100) {
      errors.organisationName =
        "Organisation name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#organisationName");
    }

    if (!organisationLogo) {
      errors.organisationLogo = "Profile picture is required";
      isValid = false;
      addToErrorStack("#organisationLogo");
    } else if (!organisationLogo?.type?.includes("image")) {
      errors.organisationLogo = "Please upload an image file";
      isValid = false;
      addToErrorStack("#organisationLogo");
    } else if (organisationLogo?.size > 1024 * 1024) {
      errors.organisationLogo = "File size should be less than 1MB";
      isValid = false;
      addToErrorStack("#organisationLogo");
    }

    if (organisationLink && !organisationLink.match(linkWithHttpExpression)) {
      errors.organisationLink =
        "Please enter a valid URL. (Ex: https://www.linkedin.com/company/engineersummit/mycompany/)";
      isValid = false;
      addToErrorStack("#organisationLink");
    }

    if (!contactNumber) {
      errors.contactNumber = "Contact number is required";
      isValid = false;
      addToErrorStack("#contactNumber");
    } else if (!contactNumber.match(mobileNumberExpression)) {
      errors.contactNumber = "Please enter a valid contact number";
      isValid = false;
      addToErrorStack("#contactNumber");
    }

    if (!contactEmail) {
      errors.contactEmail = "Contact email is required";
      isValid = false;
      addToErrorStack("#contactEmail");
    } else if (!contactEmail.match(emailExpression)) {
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
      opportunityName: "",
      opportunityMode: "",
      opportunityLocation: "",
      opportunityCountry: "",
      opportunityState: "",
      opportunityCity: "",
      applicationStartDate: "",
      applicationEndDate: "",
      opportunityDescription: "",
      salaryUnit: "",
      salaryType: "",
      fixedAmount: "",
      minAmount: "",
      maxAmount: "",
    };

    if (!opportunityName) {
      errors.opportunityName = "Opportunity name is required";
      isValid = false;
      addToErrorStack("#opportunityName");
    } else if (opportunityName.length < 3) {
      errors.opportunityName =
        "Opportunity name should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#opportunityName");
    } else if (opportunityName.length > 100) {
      errors.opportunityName =
        "Opportunity name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#opportunityName");
    }

    if (!opportunityMode) {
      errors.opportunityMode = "Opportunity type is required";
      isValid = false;
      addToErrorStack("#opportunityMode");
    }

    if (opportunityLocation === "Hybrid" || opportunityLocation === "On-Site") {
      if (!Object.keys(opportunityCountry).length) {
        errors.opportunityCountry = "Country is required";
        isValid = false;
        addToErrorStack("#opportunityCountry");
      }

      if (!Object.keys(opportunityState).length) {
        errors.opportunityState = "State is required";
        isValid = false;
        addToErrorStack("#opportunityState");
      }
      if (!Object.keys(opportunityCity).length) {
        errors.opportunityCity = "City is required";
        isValid = false;
        addToErrorStack("#opportunityCity");
      }
    }

    if (!applicationStartDate) {
      errors.applicationStartDate = "Application start date is required";
      isValid = false;
      addToErrorStack("#applicationStartDate");
    }

    if (!applicationEndDate) {
      errors.applicationEndDate = "Application end date is required";
      isValid = false;
      addToErrorStack("#applicationEndDate");
    }

    if (new Date(applicationStartDate) > new Date(applicationEndDate)) {
      errors.applicationEndDate =
        "Application End Date can not be before the Start Date";
      isValid = false;
      addToErrorStack("#applicationEndDate");
    }

    if (!opportunityDescription) {
      errors.opportunityDescription = "Job description is required";
      isValid = false;
      addToErrorStack("#opportunityDescription");
    } else if (opportunityDescription.length < 100) {
      errors.opportunityDescription =
        "Job description should be minimum 100 characters";
      isValid = false;
      addToErrorStack("#opportunityDescription");
    }
    // else if (opportunityDescription.length > 10000) {
    //   errors.opportunityDescription =
    //     "Job description should be maximum 10000 characters";
    //   isValid = false;
    //   addToErrorStack("#opportunityDescription");
    // }

    if (showSalaryToCandidates && !salaryUnit) {
      errors.salaryUnit = "Salary unit is required";
      isValid = false;
      addToErrorStack("#salaryUnit");
    }

    if (showSalaryToCandidates && !salaryType) {
      errors.salaryType = "Salary type is required";
      isValid = false;
      addToErrorStack("#salaryType");
    }
    if (showSalaryToCandidates && salaryType === "Fixed" && !fixedAmount) {
      errors.fixedAmount = "Fixed amount is required";
      isValid = false;
      addToErrorStack("#fixedAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Fixed" &&
      Number(fixedAmount) < 0
    ) {
      errors.fixedAmount = "Fixed amount cannot be negative";
      isValid = false;
      addToErrorStack("#fixedAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Fixed" &&
      fixedAmount.toString().split(".")[1]?.length > 2
    ) {
      errors.fixedAmount =
        "Fixed amount cannot have more than 2 decimal places";
      isValid = false;
      addToErrorStack("#fixedAmount");
    }

    if (showSalaryToCandidates && salaryType === "Range" && !minAmount) {
      errors.minAmount = "Minimum amount is required";
      isValid = false;
      addToErrorStack("#minAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Range" &&
      Number(minAmount) < 0
    ) {
      errors.minAmount = "Minimum amount cannot be negative";
      isValid = false;
      addToErrorStack("#minAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Range" &&
      minAmount.toString().split(".")[1]?.length > 2
    ) {
      errors.minAmount =
        "Minimum amount cannot have more than 2 decimal places";
      isValid = false;
      addToErrorStack("#minAmount");
    }
    if (showSalaryToCandidates && salaryType === "Range" && !maxAmount) {
      errors.maxAmount = "Maximum amount is required";
      isValid = false;
      addToErrorStack("#maxAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Range" &&
      Number(maxAmount) < Number(minAmount)
    ) {
      errors.maxAmount = "Maximum amount should be greater than minimum amount";
      isValid = false;
      addToErrorStack("#maxAmount");
    } else if (
      showSalaryToCandidates &&
      salaryType === "Range" &&
      Number(maxAmount) < 0
    ) {
      errors.maxAmount = "Maximum amount cannot be negative";
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
      minExperience: "",
      maxExperience: "",
      jobIsForFresher: "",
      skillsRequired: "",
      openings: "",
      minCGPA: "",
      applyLink: "",
    };

    if (!jobIsForFresher && Object.keys(minExperience).length === 0) {
      errors.minExperience = "Minimum experience is required";
      isValid = false;
      addToErrorStack("#minExperience");
    }

    if (!jobIsForFresher && Object.keys(maxExperience).length === 0) {
      errors.maxExperience = "Maximum experience is required";
      isValid = false;
      addToErrorStack("#maxExperience");
    }

    if (!jobIsForFresher && minExperience?.value > maxExperience?.value) {
      errors.maxExperience =
        "Maximum experience should be greater than minimum experience";
      isValid = false;
      addToErrorStack("#maxExperience");
    }

    if (skillsRequired.length === 0) {
      errors.skillsRequired = "Skills are required";
      isValid = false;
      addToErrorStack("#skillsRequired");
    }

    if (openings && Number(openings) < 1) {
      errors.openings = "Number of openings should be atleast 1";
      isValid = false;
      addToErrorStack("#openings");
    } else if (openings && Number(openings) % 1 !== 0) {
      errors.openings = "Number of openings should be an integer";
      isValid = false;
      addToErrorStack("#openings");
    }

    // minCGPA is not mandatory and it can not be less than 0 or greater than 10 and it should not have more than 2 decimal places
    if (minCGPA && Number(minCGPA) < 1) {
      errors.minCGPA = "Minimum CGPA can not be less than 1";
      isValid = false;
      addToErrorStack("#minCGPA");
    } else if (minCGPA && Number(minCGPA) > 10) {
      errors.minCGPA = "Minimum CGPA can not be greater than 10";
      isValid = false;
      addToErrorStack("#minCGPA");
    } else if (minCGPA && minCGPA.toString().split(".")[1]?.length > 2) {
      errors.minCGPA = "Minimum CGPA can not have more than 2 decimal places";
      isValid = false;
      addToErrorStack("#minCGPA");
    }

    if (applyLink && !applyLink.match(linkWithHttpExpression)) {
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
    const applicationStartDateIST = new Date(
      applicationStartDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const applicationEndDateIST = new Date(
      applicationEndDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    form.append("organisationName", organisationName);
    form.append("organisationLogo", organisationLogo);
    form.append("websiteUrl", organisationLink);
    form.append("mobileNo", contactNumber);
    form.append("mobileCountryCode", countryCode);
    form.append("email", contactEmail);
    form.append("opportunityName", opportunityName);
    form.append("opportunityMode", opportunityMode);
    form.append("opportunityLocation", opportunityLocation);
    form.append("opportunityType", "Job");
    form.append("country", opportunityCountry?.value);
    form.append("state", opportunityState?.value);
    form.append("city", opportunityCity?.value);
    form.append("applicationStartTime", applicationStartDateIST);
    form.append("applicationEndTime", applicationEndDateIST);
    form.append("description", opportunityDescription);
    form.append("showSalary", showSalaryToCandidates);
    if (showSalaryToCandidates) {
      form.append("salaryUnit", salaryUnit);
      form.append("salaryType", salaryType);
      if (salaryType === "Fixed") {
        form.append("salaryAmount", fixedAmount);
      } else if (salaryType === "Range") {
        form.append("minRange", minAmount);
        form.append("maxRange", maxAmount);
      }
    } else {
      form.append("salaryDisclosure", customSalary);
    }
    if (!jobIsForFresher) {
      form.append("minExperience", minExperience?.value);
      form.append("maxExperience", maxExperience?.value);
    }
    form.append("isForFreshers", jobIsForFresher);
    form.append("skillsRequired", skillsRequired);
    form.append("openings", openings);
    form.append("eligibility", minCGPA);
    form.append("applyLink", applyLink);

    setIsLoading(true);
    await axios
      .post(`${API_URL}api/v1/hiring`, form, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            New job created.{" "}
            <Link
              to={`/company/jobs/${res?.data?.data?._id}`}
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
            <span>Failed to create job</span>
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

  function emptyAllFields() {}

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
          backgroundImage: `url(${bucket}job-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>
            Relax ! 48 hrs is what max our clients have waited to have the best.{" "}
          </p>
          <p>Get access of Pan India eligible candidate at one go</p>
        </div>
      </aside>
      <section className="main">
        <div className="header">
          <span onClick={() => navigate(`/host`)} className="navigate-back">
            <IoIosArrowBack /> Back
          </span>
          <div
            style={{
              backgroundImage: `url(${bucket}job-poster-small.png)`,
            }}
            className="poster-container-mobile"
          />
          <h1 className="title">Job</h1>
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
                label="Organisation Name"
                id="organisationName"
                name="organisationName"
                required
                placeholder="Enter your Organisation Name"
                value={organisationName}
                setValue={setOrganisationName}
                helperText={errors.organisationName}
                className="mb-4"
              />

              <FormInputFileUpload
                label="Organisation Logo"
                id="organisationLogo"
                name="organisationLogo"
                required
                placeholder="Upload your Organisation Logo"
                constraint="less than 1 MB"
                fileType="image/*"
                value={organisationLogo}
                setValue={setOrganisationLogo}
                helperText={errors.organisationLogo}
                className="mb-4"
              />

              <FormInputLink
                label="Organisation Website Link"
                id="organisationLink"
                name="organisationLink"
                placeholder="Enter your Organisation Website link"
                value={organisationLink}
                setValue={setOrganisationLink}
                helperText={errors.organisationLink}
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
              <h2>Opportunity Details</h2>

              <FormInput
                label="Opportunity Name"
                id="opportunityName"
                name="opportunityName"
                required
                placeholder="Frontend Developer, UX Designer, etc"
                value={opportunityName}
                setValue={setOpportunityName}
                helperText={errors.opportunityName}
                className="mb-4"
              />

              <FormInputSelect
                label="Opportunity Type"
                id="opportunityMode"
                name="opportunityMode"
                required
                helperText={errors.opportunityMode}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Full Time"
                    value={opportunityMode}
                    setValue={setOpportunityMode}
                    result="Full Time"
                    helperText={errors.opportunityMode}
                  />
                  <FormInputSelectOption
                    label="Part Time"
                    value={opportunityMode}
                    setValue={setOpportunityMode}
                    result="Part Time"
                    helperText={errors.opportunityMode}
                  />
                </div>
              </FormInputSelect>

              <FormInputSelect
                label="Opportunity Location"
                id="opportunityLocation"
                name="opportunityLocation"
                required
                helperText={errors.opportunityLocation}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Work From Home"
                    value={opportunityLocation}
                    setValue={setOpportunityLocation}
                    result="WFH"
                    helperText={errors.opportunityLocation}
                  />
                  <FormInputSelectOption
                    label="Hybrid"
                    value={opportunityLocation}
                    setValue={setOpportunityLocation}
                    result="Hybrid"
                    helperText={errors.opportunityLocation}
                  />
                  <FormInputSelectOption
                    label="On-Site"
                    value={opportunityLocation}
                    setValue={setOpportunityLocation}
                    result="On-Site"
                    helperText={errors.opportunityLocation}
                  />
                </div>
              </FormInputSelect>

              {(opportunityLocation === "Hybrid" ||
                opportunityLocation === "On-Site") && (
                <>
                  {" "}
                  <FormInputDropdown
                    label="Office Location"
                    id="opportunityCountry"
                    name="opportunityCountry"
                    required
                    placeholder="Country"
                    value={opportunityCountry}
                    setValue={setOpportunityCountry}
                    options={allCountriesCopy}
                    helperText={errors.opportunityCountry}
                    disabled={!allCountriesCopy.length}
                    // className="mb-4"
                  />
                  <FormInputDropdown
                    id="opportunityState"
                    name="opportunityState"
                    required
                    placeholder="State"
                    value={opportunityState}
                    setValue={setOpportunityState}
                    options={allStatesCopy}
                    helperText={errors.opportunityState}
                    disabled={!allStatesCopy.length}
                    // className="mb-4"
                  />
                  <FormInputDropdown
                    id="opportunityCity"
                    name="opportunityCity"
                    required
                    placeholder="City"
                    value={opportunityCity}
                    setValue={setOpportunityCity}
                    options={allCitiesCopy}
                    helperText={errors.opportunityCity}
                    disabled={!allCitiesCopy.length}
                    className="mb-4"
                  />
                </>
              )}

              <FormInputDate
                label="Application Start Date"
                id="applicationStartDate"
                name="applicationStartDate"
                required
                value={applicationStartDate}
                setValue={setApplicationStartDate}
                helperText={errors.applicationStartDate}
                className="mb-4"
              />

              <FormInputDate
                label="Application End Date"
                id="applicationEndDate"
                name="applicationEndDate"
                required
                value={applicationEndDate}
                setValue={setApplicationEndDate}
                helperText={errors.applicationEndDate}
                className="mb-4"
              />

              <h2>Opportunity Description</h2>

              <div id="opportunityDescription" className="mb-4">
                <Editor
                  apiKey={EDITOR_API_KEY}
                  value={opportunityDescription}
                  onEditorChange={(content) => {
                    setOpportunityDescription(content);
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
                <div className="custom-form-input">
                  {errors.opportunityDescription && (
                    <span className="helper-text">
                      {errors.opportunityDescription}
                    </span>
                  )}
                </div>
              </div>

              <h2>Salary Details</h2>

              <FormInputToggle
                label="Show Salary to Candidates"
                id="showSalaryToCandidates"
                name="showSalaryToCandidates"
                value={showSalaryToCandidates}
                setValue={setShowSalaryToCandidates}
                className={showSalaryToCandidates ? `mb-4` : `mb-1`}
              />

              {showSalaryToCandidates ? (
                <>
                  {" "}
                  <FormInputSelect
                    label="Salary Unit"
                    id="salaryUnit"
                    name="salaryUnit"
                    required
                    helperText={errors.salaryUnit}
                    className="mb-4"
                  >
                    <div className="mobile-item-container">
                      <FormInputSelectOption
                        label="CTC"
                        value={salaryUnit}
                        setValue={setSalaryUnit}
                        result="CTC"
                        helperText={errors.salaryUnit}
                      />
                      <FormInputSelectOption
                        label="LPA"
                        value={salaryUnit}
                        setValue={setSalaryUnit}
                        result="LPA"
                        helperText={errors.salaryUnit}
                      />
                    </div>
                  </FormInputSelect>
                  <FormInputSelect
                    label="Salary Type"
                    id="salaryType"
                    name="salaryType"
                    required
                    helperText={errors.salaryType}
                    className="mb-4"
                  >
                    <div className="mobile-item-container">
                      <FormInputSelectOption
                        label="Fixed"
                        value={salaryType}
                        setValue={setSalaryType}
                        result="Fixed"
                        helperText={errors.salaryType}
                      />
                      <FormInputSelectOption
                        label="Range"
                        value={salaryType}
                        setValue={setSalaryType}
                        result="Range"
                        helperText={errors.salaryType}
                      />
                    </div>
                  </FormInputSelect>
                  {salaryType === "Fixed" && (
                    <FormInputNumber
                      label="Enter Salary Amount (in INR)"
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
                  {salaryType === "Range" && (
                    <>
                      <FormInputNumber
                        label="Enter Minimum Salary Amount (in INR)"
                        id="minAmount"
                        name="minAmount"
                        required
                        placeholder="Enter Minimum Salary"
                        value={minAmount}
                        setValue={setMinAmount}
                        helperText={errors.minAmount}
                        className="mb-4"
                      />
                      <FormInputNumber
                        label="Enter Maximum Salary Amount (in INR)"
                        id="maxAmount"
                        name="maxAmount"
                        required
                        placeholder="Enter Maximum Salary"
                        value={maxAmount}
                        setValue={setMaxAmount}
                        helperText={errors.maxAmount}
                        className="mb-4"
                      />
                    </>
                  )}
                </>
              ) : (
                <FormInput
                  id="customSalary"
                  name="customSalary"
                  placeholder={`Any salary related message? Ex: "Market Standard", "Not Disclosed", "Negotiable", etc`}
                  value={customSalary}
                  setValue={setCustomSalary}
                  helperText={errors.customSalary}
                  className="mb-4"
                />
              )}
            </>
          )}
          {currentPage === 3 && (
            <>
              <FormInputDropdown
                label="Experience Required"
                id="minExperience"
                name="minExperience"
                required
                placeholder="Select Minimum Experience"
                value={minExperience}
                setValue={setMinExperience}
                options={experienceDropdown}
                helperText={errors.minExperience}
                disabled={jobIsForFresher}
                className="mb-1"
              />

              <FormInputDropdown
                id="maxExperience"
                name="maxExperience"
                required
                placeholder="Select Maximum Experience"
                value={maxExperience}
                setValue={setMaxExperience}
                disabled={!Object.keys(minExperience).length || jobIsForFresher}
                options={
                  minExperience
                    ? experienceDropdown.filter(
                        (exp) => exp.value >= minExperience.value
                      )
                    : experienceDropdown
                }
                helperText={errors.maxExperience}
                className="mb-1"
              />

              <FormInputToggle
                label="Job is for Freshers"
                id="jobIsForFresher"
                name="jobIsForFresher"
                value={jobIsForFresher}
                setValue={setJobIsForFresher}
                className="mb-4"
              />

              <FormInputMultiValue
                label="Skills Required"
                id="skillsRequired"
                name="skillsRequired"
                required
                placeholder="Enter Skills required"
                value={skillsRequired}
                setValue={setSkillsRequired}
                helperText={errors.skillsRequired}
                className="mb-4"
              />

              <FormInputNumber
                label="Number of Openings"
                id="openings"
                name="openings"
                // required
                placeholder="Enter the number of openings (Ex: 10,15 etc)"
                value={openings}
                setValue={setOpenings}
                helperText={errors.openings}
                className="mb-4"
              />

              <FormInputNumber
                label="Enter minimum CGPA required"
                id="minCGPA"
                name="minCGPA"
                // required
                placeholder="Enter Minimum CGPA"
                step={0.01}
                value={minCGPA}
                setValue={setMinCGPA}
                helperText={errors.minCGPA}
                className="mb-4"
              />

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
