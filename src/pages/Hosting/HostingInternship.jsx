import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  getAccessToken,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { API_URL, Bucket_URL } from "../../services/APIUtils";
import { changeDocumentTitle } from "../../features/changeDocumentTitle";
import axios, { all } from "axios";
import useNavbar from "../../hooks/use-navbar";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import FormIndicator from "../../components/FormInputs/FormIndicator";
import FormInput from "../../components/FormInputs/FormInput";
import FormInputTextarea from "../../components/FormInputs/FormInputTextarea";
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

export default function HostingInternship() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  changeDocumentTitle("Host a Internship | engineerHUB");
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const totalPages = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [organisationName, setOrganisationName] = useState("");
  const [organisationLogo, setOrganisationLogo] = useState("");
  const [organisationLink, setOrganisationLink] = useState("");
  const [domain, setDomain] = useState({});
  const [domainOther, setDomainOther] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [opportunityDescription, setOpportunityDescription] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [opportunityPoster, setOpportunityPoster] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [opportunityMode, setOpportunityMode] = useState("");
  const [opportunityLocation, setOpportunityLocation] = useState("");
  const [opportunityCountry, setOpportunityCountry] = useState({});
  const [opportunityState, setOpportunityState] = useState({});
  const [opportunityCity, setOpportunityCity] = useState({});
  const [allCities, setAllCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allCitiesCopy, setAllCitiesCopy] = useState([]);
  const [allStatesCopy, setAllStatesCopy] = useState([]);
  const [allCountriesCopy, setAllCountriesCopy] = useState([]);
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [openings, setOpenings] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [showSalaryToCandidates, setShowSalaryToCandidates] = useState(true);
  const [customSalary, setCustomSalary] = useState("");
  const [salaryType, setSalaryType] = useState("Fixed");
  const [fixedAmount, setFixedAmount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [applicationStartDate, setApplicationStartDate] = useState("");
  const [applicationEndDate, setApplicationEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previouslyViewedPageNumber, setPreviouslyViewedPageNumber] =
    useState(1);
  const [errors, setErrors] = useState({
    organisationName: "",
    organisationLogo: "",
    organisationLink: "",
    domain: "",
    domainOther: "",
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    opportunityDescription: "",
    opportunityName: "",
    opportunityPoster: "",
    skillsRequired: "",
    opportunityMode: "",
    opportunityLocation: "",
    opportunityCountry: "",
    opportunityState: "",
    opportunityCity: "",
    minDuration: "",
    maxDuration: "",
    openings: "",
    applyLink: "",
    isPaid: "",
    salaryType: "",
    fixedAmount: "",
    minAmount: "",
    maxAmount: "",
    applicationStartDate: "",
    applicationEndDate: "",
  });
  let errorStack = [];
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

  useEffect(() => {
    setSelectedPageNavbar("host");
    getAllCountries(setAllCountries);
  }, []);

  useEffect(() => {
    if (allCountries.length > 0) {
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
      domain: "",
      domainOther: "",
      contactName: "",
      contactNumber: "",
      contactEmail: "",
      opportunityDescription: "",
    };

    if (!organisationName) {
      errors.organisationName = "Organisation name is required";
      isValid = false;
      addToErrorStack("#organisationName");
    } else if (organisationName.length < 5) {
      errors.organisationName =
        "Organisation name should be minimum 5 characters";
      isValid = false;
      addToErrorStack("#organisationName");
    } else if (organisationName.length > 100) {
      errors.organisationName =
        "Organisation name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#organisationName");
    }

    if (!organisationLogo) {
      errors.organisationLogo = "Organisation logo is required";
      isValid = false;
      addToErrorStack("#organisationLogo");
    } else if (!organisationLogo?.type?.includes("image")) {
      errors.organisationLogo = "Please upload an image file";
      isValid = false;
      addToErrorStack("#organisationLogo");
    } else if (organisationLogo?.size > 1024 * 1024) {
      errors.organisationLogo = "File size should be less than 2MB";
      isValid = false;
      addToErrorStack("#organisationLogo");
    }

    if (
      organisationLink &&
      !organisationLink.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ) {
      errors.organisationLink =
        "Please enter a valid URL. (Ex: https://www.linkedin.com/company/engineersummit/mycompany/)";
      isValid = false;
      addToErrorStack("#organisationLink");
    }

    if (Object.keys(domain).length === 0) {
      errors.domain = "Domain is required";
      isValid = false;
      addToErrorStack("#domain");
    }

    if (domain?.value === "Other" && !domainOther) {
      errors.domainOther = "Domain name is required";
      isValid = false;
      addToErrorStack("#domainOther");
    }

    if (!contactName) {
      errors.contactName = "Contact name is required";
      isValid = false;
      addToErrorStack("#contactName");
    } else if (contactName.length < 3) {
      errors.contactName = "Contact name should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#contactName");
    } else if (contactName.length > 100) {
      errors.contactName = "Contact name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#contactName");
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

    if (!countryCode) {
      errors.contactNumber = "Country code is required";
      isValid = false;
      addToErrorStack("#contactNumber");
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

    if (!opportunityDescription) {
      errors.opportunityDescription = "Internship description is required";
      isValid = false;
      addToErrorStack("#opportunityDescription");
    } else if (opportunityDescription.length < 100) {
      errors.opportunityDescription =
        "Internship description should be minimum 100 characters";
      isValid = false;
      addToErrorStack("#opportunityDescription");
    } else if (opportunityDescription.length > 10000) {
      errors.opportunityDescription =
        "Internship description should be maximum 10000 characters";
      isValid = false;
      addToErrorStack("#opportunityDescription");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  function validateForm2() {
    let isValid = true;
    const errors = {
      opportunityName: "",
      opportunityPoster: "",
      skillsRequired: "",
      opportunityMode: "",
      opportunityLocation: "",
      opportunityCountry: "",
      opportunityState: "",
      opportunityCity: "",
      minDuration: "",
      maxDuration: "",
      openings: "",
      applyLink: "",
      isPaid: "",
      salaryType: "",
      fixedAmount: "",
      minAmount: "",
      maxAmount: "",
      applicationStartDate: "",
      applicationEndDate: "",
    };

    if (!opportunityName) {
      errors.opportunityName = "Opportunity name is required";
      isValid = false;
      addToErrorStack("#opportunityName");
    } else if (opportunityName.length < 5) {
      errors.opportunityName =
        "Opportunity name should be minimum 5 characters";
      isValid = false;
      addToErrorStack("#opportunityName");
    } else if (opportunityName.length > 100) {
      errors.opportunityName =
        "Opportunity name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#opportunityName");
    }

    if (!opportunityPoster) {
      errors.opportunityPoster = "Opportunity poster is required";
      isValid = false;
      addToErrorStack("#opportunityPoster");
    } else if (!opportunityPoster?.type?.includes("image")) {
      errors.opportunityPoster = "Please upload an image file";
      isValid = false;
      addToErrorStack("#opportunityPoster");
    } else if (opportunityPoster?.size > 1024 * 1024) {
      errors.opportunityPoster = "File size should be less than 1MB";
      isValid = false;
      addToErrorStack("#opportunityPoster");
    }

    if (skillsRequired.length === 0) {
      errors.skillsRequired = "Skills are required";
      isValid = false;
      addToErrorStack("#skillsRequired");
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

    if (!minDuration) {
      errors.minDuration = "Minimum duration is required";
      isValid = false;
      addToErrorStack("#minDuration");
    }

    if (!maxDuration) {
      errors.maxDuration = "Maximum duration is required";
      isValid = false;
      addToErrorStack("#maxDuration");
    }

    if (minDuration && maxDuration && minDuration > maxDuration) {
      errors.maxDuration = "Maximum duration cannot be less than minimum";
      isValid = false;
      addToErrorStack("#maxDuration");
    }

    if (!openings) {
      errors.openings = "Openings are required";
      isValid = false;
      addToErrorStack("#openings");
    }

    if (applyLink && !applyLink.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      errors.applyLink =
        "Please enter a valid URL (for example: https://www.engineerhub.in)";
      isValid = false;
      addToErrorStack("#applyLink");
    }

    if (!isPaid) {
      errors.isPaid = "Please select if the internship is paid or unpaid";
      isValid = false;
      addToErrorStack("#isPaid");
    }

    if (!salaryType) {
      errors.salaryType = "Salary type is required";
      isValid = false;
      addToErrorStack("#salaryType");
    }

    if (salaryType === "Fixed" && !fixedAmount) {
      errors.fixedAmount = "Fixed amount is required";
      isValid = false;
      addToErrorStack("#fixedAmount");
    }

    if (salaryType === "Range" && !minAmount) {
      errors.minAmount = "Minimum amount is required";
      isValid = false;
      addToErrorStack("#minAmount");
    }

    if (salaryType === "Range" && !maxAmount) {
      errors.maxAmount = "Maximum amount is required";
      isValid = false;
      addToErrorStack("#maxAmount");
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

    const date1 = new Date(applicationStartDate);
    const date2 = new Date(applicationEndDate);
    if (date1.getTime() > date2.getTime()) {
      errors.applicationEndDate =
        "Application End Date can not be before the Start Date";
      isValid = false;
      addToErrorStack("#applicationEndDate");
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
    form.append(
      "domainName",
      domain?.value === "Other" ? domainOther : domain?.value
    );
    form.append("contactName", contactName);
    form.append("mobileNo", contactNumber);
    form.append("mobileCountryCode", countryCode);
    form.append("email", contactEmail);
    form.append("description", opportunityDescription);
    form.append("opportunityName", opportunityName);
    form.append("opportunityPoster", opportunityPoster);
    form.append("skillsRequired", skillsRequired);
    form.append("opportunityMode", opportunityMode);
    form.append("opportunityType", "Internship");
    form.append("opportunityLocation", opportunityLocation);
    if (opportunityLocation === "On-Site" || opportunityLocation === "Hybrid") {
      form.append("country", opportunityCountry?.value);
      form.append("state", opportunityState?.value);
      form.append("city", opportunityCity?.value);
    }
    form.append("minDuration", minDuration);
    form.append("maxDuration", maxDuration);
    form.append("openings", openings);
    form.append("applyLink", applyLink);
    form.append("isPaid", isPaid);
    if (!!isPaid) {
      form.append("showSalary", showSalaryToCandidates);
      if (showSalaryToCandidates) {
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
    }
    form.append("applicationStartTime", applicationStartDateIST);
    form.append("applicationEndTime", applicationEndDateIST);

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
            New internship created.{" "}
            <Link
              to={`/company/internships/${res?.data?.data?._id}`}
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
            <span>Failed to create internship</span>
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
    setOrganisationName("");
    setOrganisationLogo("");
    setOrganisationLink("");
    setDomain({});
    setDomainOther("");
    setContactName("");
    setContactNumber("");
    setCountryCode("");
    setContactEmail("");
    setOpportunityDescription("");
    setOpportunityName("");
    setOpportunityPoster("");
    setSkillsRequired([]);
    setOpportunityMode("");
    setOpportunityLocation("");
    setOpportunityCountry({});
    setOpportunityState({});
    setOpportunityCity({});
    setMinDuration("");
    setMaxDuration("");
    setOpenings("");
    setApplyLink("");
    setIsPaid(true);
    setShowSalaryToCandidates(true);
    setCustomSalary("");
    setSalaryType("Fixed");
    setFixedAmount("");
    setMinAmount("");
    setMaxAmount("");
    setApplicationStartDate("");
    setApplicationEndDate("");
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
      if (validateForm2()) submitForm();
    }
  };

  return (
    <main className="hosting-container">
      <aside
        style={{
          backgroundImage: `url(${bucket}internship-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>Do you know?</p>
          <p>
            Every year around 2000+ cultural event are host across Indian
            colleges
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
              backgroundImage: `url(${bucket}internship-poster-small.png)`,
            }}
            className="poster-container-mobile"
          />
          <h1 className="title">Internship</h1>
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
                placeholder="Upload your Organisation Name"
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

              <FormInputDropdown
                label="Domain Name"
                id="domain"
                name="domain"
                required
                placeholder="Select your domain"
                value={domain}
                setValue={setDomain}
                options={domainOptions}
                helperText={errors.domain}
                className={`${domain?.value === "Other" ? "mb-1" : "mb-4"}`}
              />
              {domain?.value === "Other" && (
                <FormInput
                  id="domainOther"
                  name="domainOther"
                  caption="If other, please specify"
                  placeholder="Enter your domain"
                  value={domainOther}
                  setValue={setDomainOther}
                  helperText={errors.domainOther}
                  className="mb-4"
                />
              )}

              <h2>Contact Details</h2>

              <FormInput
                label="Contact Name"
                id="contactName"
                name="contactName"
                required
                placeholder="Enter your Name"
                value={contactName}
                setValue={setContactName}
                helperText={errors.contactName}
                className="mb-4"
              />

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
                placeholder="Enter your Email"
                value={contactEmail}
                setValue={setContactEmail}
                helperText={errors.contactEmail}
                className="mb-4"
              />

              <h2>Internship Description</h2>

              <FormInputTextarea
                label="About Internship"
                id="opportunityDescription"
                name="opportunityDescription"
                required
                rows={5}
                placeholder="Enter your Opportunity Description"
                value={opportunityDescription}
                setValue={setOpportunityDescription}
                helperText={errors.opportunityDescription}
                className="mb-4"
              />
            </>
          )}

          {currentPage === 2 && (
            <>
              <h2>Job Details</h2>

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

              <FormInputFileUpload
                label="Opportunity Poster"
                id="opportunityPoster"
                name="opportunityPoster"
                placeholder="Upload your Opportunity Poster"
                constraint="less than 1 MB"
                fileType="image/*"
                value={opportunityPoster}
                setValue={setOpportunityPoster}
                helperText={errors.opportunityPoster}
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

              <FormInputNumber
                label="Internship Duration (in months)"
                id="minDuration"
                name="minDuration"
                required
                placeholder="Enter the minimum no. of months"
                value={minDuration}
                setValue={setMinDuration}
                helperText={errors.minDuration}
                className="mb-1"
              />
              <FormInputNumber
                id="maxDuration"
                name="maxDuration"
                required
                placeholder="Enter the maximum no. of months"
                value={maxDuration}
                setValue={setMaxDuration}
                helperText={errors.maxDuration}
                className="mb-4"
              />

              <FormInputNumber
                label="Number of Openings"
                id="openings"
                name="openings"
                required
                placeholder="Enter the number of openings (Ex: 10,15 etc)"
                value={openings}
                setValue={setOpenings}
                helperText={errors.openings}
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

              <h2>Stipend Details</h2>

              <FormInputSelect
                label="Stipend"
                id="isPaid"
                name="isPaid"
                required
                helperText={errors.isPaid}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Paid"
                    value={isPaid}
                    setValue={setIsPaid}
                    result="Paid"
                    helperText={errors.isPaid}
                  />
                  <FormInputSelectOption
                    label="Unpaid"
                    value={isPaid}
                    setValue={setIsPaid}
                    result="Unpaid"
                    helperText={errors.isPaid}
                  />
                </div>
              </FormInputSelect>

              {isPaid === "Paid" && (
                <>
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
                      placeholder="Any salary detail?"
                      value={customSalary}
                      setValue={setCustomSalary}
                      helperText={errors.customSalary}
                      className="mb-4"
                    />
                  )}
                </>
              )}

              <h2>Application Details</h2>

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
            </>
          )}

          <div className="d-flex justify-content-between">
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
