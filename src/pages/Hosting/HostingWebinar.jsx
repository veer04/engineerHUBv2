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

export default function HostingWebinar() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  changeDocumentTitle("Host a Webinar | engineerHUB");
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
  const [eventPoster, setEventPoster] = useState("");
  const [eventType, setEventType] = useState();
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState();
  const [eventMode, setEventMode] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDomain, setEventDomain] = useState({});
  const [eventDomainOther, setEventDomainOther] = useState("");
  const [eventRegistrationStartDate, setEventRegistrationStartDate] =
    useState("");
  const [eventRegistrationEndDate, setEventRegistrationEndDate] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventRegistrationType, setEventRegistrationType] = useState("");
  const [eventTargetZone, setEventTargetZone] = useState([]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showContactDetails, setShowContactDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [previouslyViewedPageNumber, setPreviouslyViewedPageNumber] =
    useState(1);
  const [errors, setErrors] = useState({
    eventPoster: "",
    eventType: "",
    eventName: "",
    eventMode: "",
    eventCategory: "",
    eventDescription: "",
    eventDomain: "",
    eventDomainOther: "",
    eventRegistrationStartDate: "",
    eventRegistrationEndDate: "",
    eventStartDate: "",
    eventEndDate: "",
    eventLink: "",
    eventRegistrationType: "",
    eventTargetZone: "",
    contactEmail: "",
    contactNumber: "",
    showContactDetails: "",
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    setEventType(eventTypeOptions[3]);
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
      eventPoster: "",
      eventType: "",
      eventName: "",
      eventMode: "",
      eventDescription: "",
    };

    if (!eventPoster) {
      errors.eventPoster = "Event poster is required";
      isValid = false;
      addToErrorStack("#eventPoster");
    } else if (!eventPoster?.type?.includes("image")) {
      errors.eventPoster = "Please upload an image file";
      isValid = false;
      addToErrorStack("#eventPoster");
    } else if (eventPoster?.size > 1024 * 1024 * 5) {
      errors.eventPoster = "File size should be less than 5MB";
      isValid = false;
      addToErrorStack("#eventPoster");
    }

    if (!eventType) {
      errors.eventType = "Event type is required";
      isValid = false;
      addToErrorStack("#eventType");
    }

    if (!eventName) {
      errors.eventName = "Event name is required";
      isValid = false;
      addToErrorStack("#eventName");
    } else if (eventName.length < 3) {
      errors.eventName = "Event name should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#eventName");
    } else if (eventName.length > 100) {
      errors.eventName = "Event name should be maximum 100 characters";
      isValid = false;
      addToErrorStack("#eventName");
    }

    if (!eventMode) {
      errors.eventMode = "Event mode is required";
      isValid = false;
      addToErrorStack("#eventMode");
    }

    if (!eventDescription) {
      errors.eventDescription = "Event description is required";
      isValid = false;
      addToErrorStack("#eventDescription");
    } else if (eventDescription.length < 100) {
      errors.eventDescription =
        "Event description should be minimum 100 characters";
      isValid = false;
      addToErrorStack("#eventDescription");
    } else if (eventDescription.length > 10000) {
      errors.eventDescription =
        "Event description should be maximum 10000 characters";
      isValid = false;
      addToErrorStack("#eventDescription");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  function validateForm2() {
    let isValid = true;
    const errors = {
      eventDomain: "",
      eventDomainOther: "",
      eventRegistrationStartDate: "",
      eventRegistrationEndDate: "",
      eventStartDate: "",
      eventEndDate: "",
      eventLink: "",
      eventRegistrationType: "",
      eventTargetZone: "",
      contactEmail: "",
      contactNumber: "",
      showContactDetails: "",
    };

    if (!eventDomain) {
      errors.eventDomain = "Event domain is required";
      isValid = false;
      addToErrorStack("#eventDomain");
    }
    if (eventDomain?.value === "Other" && !eventDomainOther) {
      errors.eventDomainOther = "Domain name is required";
      isValid = false;
      addToErrorStack("#eventDomainOther");
    }

    if (!eventRegistrationStartDate) {
      errors.eventRegistrationStartDate =
        "Event registration start date is required";
      isValid = false;
      addToErrorStack("#eventRegistrationStartDate");
    } else if (eventRegistrationStartDate > eventRegistrationEndDate) {
      errors.eventRegistrationStartDate =
        "Start date should be less than end date";
      isValid = false;
      addToErrorStack("#eventRegistrationStartDate");
    } else if (eventRegistrationStartDate > eventStartDate) {
      errors.eventRegistrationStartDate =
        "Start date should be less than event start date";
      isValid = false;
      addToErrorStack("#eventRegistrationStartDate");
    } else if (eventRegistrationStartDate > eventEndDate) {
      errors.eventRegistrationStartDate =
        "Start date should be less than event end date";
      isValid = false;
      addToErrorStack("#eventRegistrationStartDate");
    }

    if (!eventRegistrationEndDate) {
      errors.eventRegistrationEndDate =
        "Event registration end date is required";
      isValid = false;
      addToErrorStack("#eventRegistrationEndDate");
    } else if (eventRegistrationEndDate < eventRegistrationStartDate) {
      errors.eventRegistrationEndDate =
        "End date should be greater than start date";
      isValid = false;
      addToErrorStack("#eventRegistrationEndDate");
    } else if (eventRegistrationEndDate > eventEndDate) {
      errors.eventRegistrationEndDate =
        "End date should be less than event end date";
      isValid = false;
      addToErrorStack("#eventRegistrationEndDate");
    }

    if (!eventStartDate) {
      errors.eventStartDate = "Event start date is required";
      isValid = false;
      addToErrorStack("#eventStartDate");
    } else if (eventStartDate < eventRegistrationStartDate) {
      errors.eventStartDate =
        "Start date should be greater than registration start date";
      isValid = false;
      addToErrorStack("#eventStartDate");
    } else if (eventStartDate > eventEndDate) {
      errors.eventStartDate = "Start date should be less than event end date";
      isValid = false;
      addToErrorStack("#eventStartDate");
    }

    if (!eventEndDate) {
      errors.eventEndDate = "Event end date is required";
      isValid = false;
      addToErrorStack("#eventEndDate");
    } else if (eventEndDate < eventRegistrationStartDate) {
      errors.eventEndDate =
        "End date should be greater than registration start date";
      isValid = false;
      addToErrorStack("#eventEndDate");
    } else if (eventEndDate < eventRegistrationEndDate) {
      errors.eventEndDate =
        "End date should be greater than registration end date";
      isValid = false;
      addToErrorStack("#eventEndDate");
    } else if (eventEndDate < eventStartDate) {
      errors.eventEndDate = "End date should be greater than start date";
      isValid = false;
      addToErrorStack("#eventEndDate");
    }

    if (!eventLink) {
      errors.eventLink = "Event link is required";
      isValid = false;
      addToErrorStack("#eventLink");
    } else if (!eventLink.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      errors.eventLink =
        "Please enter a valid URL (for example: https://www.engineerhub.in)";
      isValid = false;
      addToErrorStack("#eventLink");
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

    if (!contactNumber) {
      errors.contactNumber = "Contact number is required";
      isValid = false;
      addToErrorStack("#contactNumber");
    } else if (!contactNumber.match(/^\d{10}$/)) {
      errors.contactNumber = "Please enter a valid contact number";
      isValid = false;
      addToErrorStack("#contactNumber");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  async function submitForm() {
    const form = new FormData();

    const eventRegistrationStartDateIST = new Date(
      eventRegistrationStartDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const eventRegistrationEndDateIST = new Date(
      eventRegistrationEndDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const eventStartDateIST = new Date(
      eventStartDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const eventEndDateIST = new Date(
      eventEndDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    form.append("eventPoster", eventPoster);
    form.append("eventType", eventType.value);
    form.append("eventName", eventName);
    form.append("mode", eventMode);
    form.append("description", eventDescription);
    if (eventDomain.value === "Other")
      form.append("domainName", eventDomainOther);
    else form.append("domainName", eventDomain.value);
    form.append("eventRegistrationStartTime", eventRegistrationStartDateIST);
    form.append("eventRegistrationEndTime", eventRegistrationEndDateIST);
    form.append("eventStartTime", eventStartDateIST);
    form.append("eventEndTime", eventEndDateIST);
    form.append("applyLink", eventLink);
    form.append("registrationType", eventRegistrationType);
    // form.append("eventTargetZone", eventTargetZone);
    form.append("organizerEmail", contactEmail);
    form.append("organizerMobileCountryCode", countryCode);
    form.append("organizerMobile", contactNumber);
    form.append("showContactDetails", showContactDetails); //
    form.append("eventModeType", eventCategory.value);

    setIsLoading(true);
    await axios
      .post(`${API_URL}api/v1/event`, form, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            New webinar created.{" "}
            {eventDomain === "Other" ? (
              <Link
                to={`/community/events/${encodeURIComponent(
                  res?.data?.data?.domainName
                )}/${res?.data?.data?._id}`}
                style={{ color: "rgb(13, 110, 253)" }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Click here
              </Link>
            ) : (
              <Link
                to={`/trending/workshops/${res?.data?.data?._id}`}
                style={{ color: "rgb(13, 110, 253)" }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Click here
              </Link>
            )}{" "}
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
            <span>Failed to create event</span>
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
    setEventPoster("");
    setEventType(eventTypeOptions[3]);
    setEventName("");
    setEventCategory("");
    setEventMode("");
    setEventDescription("");
    setEventDomain({});
    setEventDomainOther("");
    setEventRegistrationStartDate("");
    setEventRegistrationEndDate("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLink("");
    setEventRegistrationType("");
    setEventTargetZone([]);
    setContactEmail("");
    setContactNumber("");
    setCountryCode("");
    setShowContactDetails(true);
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
          backgroundImage: `url(${bucket}webinar-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>
            {currentPage === 1 && "Share Your Expertise !"}
            {currentPage === 2 &&
              "It’s just not only a webinar , you’re Building your personal brand among 1Lakh+ engineers"}
          </p>
          <p>
            {currentPage === 1 &&
              "Thanks for Sharing Your Expertise! OR Your Webinar - Let's Make it a Success!"}
            {currentPage === 2 && (
              <>
                Thanks for being the supportive ‘Senior’ that we always look for
                !<br />- Shipra (student)
              </>
            )}
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
              backgroundImage: `url(${bucket}webinar-poster-small.png)`,
            }}
            className="poster-container-mobile"
          />
          <h1 className="title">Webinar</h1>
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
              <FormInputFileUpload
                label="Event Poster"
                id="eventPoster"
                name="eventPoster"
                required
                placeholder="Upload event poster 1:1 ratio"
                fileType="image/*"
                value={eventPoster}
                setValue={setEventPoster}
                helperText={errors.eventPoster}
                className="mb-4"
              />
              <FormInputDropdown
                label="Event Type"
                id="eventType"
                name="eventType"
                required
                placeholder="Select event type"
                value={eventType}
                setValue={setEventType}
                options={eventTypeOptions}
                helperText={errors.eventType}
                className="mb-4"
                disabled
              />
              <FormInputDropdown
                label="Event Category"
                id="eventCategory"
                name="eventCategory"
                required
                placeholder="Select event category"
                value={eventCategory}
                setValue={setEventCategory}
                options={eventCategoryOptions}
                helperText={errors.eventCategory}
                className="mb-4"
              />
              <FormInput
                label="Event Name"
                id="eventName"
                name="eventName"
                required
                constraint="min 5 characters"
                placeholder="Enter event name"
                value={eventName}
                setValue={setEventName}
                helperText={errors.eventName}
                className="mb-4"
              />
              <FormInputSelect
                label="Event Mode"
                id="eventMode"
                name="eventMode"
                required
                helperText={errors.eventMode}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    icon={
                      <svg
                        style={{ marginRight: "8px" }}
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 0.5C5.824 0.5 0 6.324 0 13.5C0 20.676 5.824 26.5 13 26.5C20.176 26.5 26 20.676 26 13.5C26 6.324 20.176 0.5 13 0.5ZM11.7 23.809C6.565 23.172 2.6 18.804 2.6 13.5C2.6 12.694 2.704 11.927 2.873 11.173L9.1 17.4V18.7C9.1 20.13 10.27 21.3 11.7 21.3V23.809ZM20.67 20.507C20.332 19.454 19.37 18.7 18.2 18.7H16.9V14.8C16.9 14.085 16.315 13.5 15.6 13.5H7.8V10.9H10.4C11.115 10.9 11.7 10.315 11.7 9.6V7H14.3C15.73 7 16.9 5.83 16.9 4.4V3.867C20.709 5.414 23.4 9.145 23.4 13.5C23.4 16.204 22.36 18.661 20.67 20.507Z"
                          fill="#002B36"
                        />
                      </svg>
                    }
                    label="Online"
                    value={eventMode}
                    setValue={setEventMode}
                    result="true"
                    helperText={errors.eventMode}
                  />
                  <FormInputSelectOption
                    label="Offline"
                    icon={
                      <svg
                        style={{ marginRight: "8px" }}
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1232 8.28738L6.43377 2.59515C8.42698 1.2699 10.8113 0.5 13.3848 0.5C20.3484 0.5 26 6.15437 26 13.1214C26 15.6961 25.2305 18.0816 23.9059 20.0757L22.064 18.233C22.9597 16.7437 23.477 14.9893 23.477 13.1214C23.477 8.8932 20.8656 5.27087 17.1693 3.76893V4.28641C17.1693 5.67476 16.034 6.81068 14.6463 6.81068H12.1232V8.28738ZM24.9782 24.7204L23.1994 26.5L20.3358 23.635C18.3426 24.9728 15.9583 25.7427 13.3848 25.7427C6.42115 25.7427 0.769529 20.0883 0.769529 13.1214C0.769529 10.5466 1.53906 8.16116 2.86366 6.16699L0 3.30194L1.77875 1.52233L24.9782 24.7204ZM12.1232 20.6942C10.7356 20.6942 9.60019 19.5583 9.60019 18.1699V16.9078L3.5575 10.8621C3.3935 11.5942 3.29258 12.3388 3.29258 13.1214C3.29258 18.2709 7.14022 22.5117 12.1232 23.1301V20.6942Z"
                          fill="#002B36"
                        />
                      </svg>
                    }
                    value={eventMode}
                    setValue={setEventMode}
                    result="false"
                    helperText={errors.eventMode}
                  />
                </div>
              </FormInputSelect>
              <FormInputTextarea
                label="Event Description"
                id="eventDescription"
                name="eventDescription"
                required
                constraint="min 100 characters"
                placeholder="Enter event description"
                rows={8}
                value={eventDescription}
                setValue={setEventDescription}
                helperText={errors.eventDescription}
                className="mb-4"
              />
            </>
          )}

          {currentPage === 2 && (
            <>
              <h2>Event Details</h2>
              <FormInputDropdown
                label="Domain Name"
                id="eventDomain"
                name="eventDomain"
                required
                placeholder="Select your domain"
                value={eventDomain}
                setValue={setEventDomain}
                options={domainOptions}
                helperText={errors.eventDomain}
                className={`${
                  eventDomain?.value === "Other" ? "mb-1" : "mb-4"
                }`}
              />
              {eventDomain?.value === "Other" && (
                <FormInput
                  id="eventDomainOther"
                  name="eventDomainOther"
                  caption="If other, please specify"
                  placeholder="Enter your domain"
                  value={eventDomainOther}
                  setValue={setEventDomainOther}
                  helperText={errors.eventDomainOther}
                  className="mb-4"
                />
              )}

              <div className="mobile-item-container mb-4">
                <FormInputDateTime
                  label="Event Registration Start Date & Time"
                  id="eventRegistrationStartDate"
                  name="eventRegistrationStartDate"
                  required
                  value={eventRegistrationStartDate}
                  setValue={setEventRegistrationStartDate}
                  helperText={errors.eventRegistrationStartDate}
                  style={{ width: "100%" }}
                />
                <FormInputDateTime
                  label="Event Registration End Date & Time"
                  id="eventRegistrationEndDate"
                  name="eventRegistrationEndDate"
                  required
                  value={eventRegistrationEndDate}
                  setValue={setEventRegistrationEndDate}
                  helperText={errors.eventRegistrationEndDate}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mobile-item-container mb-4">
                <FormInputDateTime
                  label="Event Start Date & Time"
                  id="eventStartDate"
                  name="eventStartDate"
                  required
                  value={eventStartDate}
                  setValue={setEventStartDate}
                  helperText={errors.eventStartDate}
                  style={{ width: "100%" }}
                />
                <FormInputDateTime
                  label="Event End Date & Time"
                  id="eventEndDate"
                  name="eventEndDate"
                  required
                  value={eventEndDate}
                  setValue={setEventEndDate}
                  helperText={errors.eventEndDate}
                  style={{ width: "100%" }}
                />
              </div>
              <FormInputLink
                label="Event Link"
                id="eventLink"
                name="eventLink"
                required
                caption="The URL can be your organization’s website or an opportunity related URL"
                placeholder="https://"
                value={eventLink}
                setValue={setEventLink}
                helperText={errors.eventLink}
                className="mb-4"
              />
              <FormInputSelect
                label="Registration Type"
                id="eventRegistrationType"
                name="eventRegistrationType"
                helperText={errors.eventRegistrationType}
                className="mb-4"
              >
                <div className="mobile-item-container">
                  <FormInputSelectOption
                    label="Free"
                    value={eventRegistrationType}
                    setValue={setEventRegistrationType}
                    result="Free"
                    helperText={errors.eventRegistrationType}
                  />
                  <FormInputSelectOption
                    label="Paid"
                    value={eventRegistrationType}
                    setValue={setEventRegistrationType}
                    result="Paid"
                    helperText={errors.eventRegistrationType}
                  />
                </div>
              </FormInputSelect>
              {/* <FormInputMultiValue
                label="Target Zone"
                id="eventTargetZone"
                name="eventTargetZone"
                constraint="max 3 zone"
                placeholder="Select the target zone for registrations"
                value={eventTargetZone}
                setValue={setEventTargetZone}
                options={autocompleteOptions}
                helperText={errors.eventTargetZone}
                className="mb-3"
              /> */}
              <h2>Contact Details</h2>
              <FormInputEmail
                label="Organizer Contact Email"
                id="contactEmail"
                name="contactEmail"
                required
                placeholder="Enter contact email"
                value={contactEmail}
                setValue={setContactEmail}
                helperText={errors.contactEmail}
                className="mb-4"
              />
              <FormInputPhoneNumber
                label="Organizer Contact Number"
                id="contactNumber"
                name="contactNumber"
                required
                placeholder="Enter contact number"
                value={contactNumber}
                setValue={setContactNumber}
                countryCodeValue={countryCode}
                setCountryCodeValue={setCountryCode}
                defaultCountryCode="91"
                helperText={errors.contactNumber}
                className="mb-4"
              />
              <FormInputToggle
                label="Show Contact Details to candidates"
                id="showContactDetails"
                name="showContactDetails"
                value={showContactDetails}
                setValue={setShowContactDetails}
                helperText={errors.showContactDetails}
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
