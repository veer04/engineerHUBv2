import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ProjectHosting.css";
import "./EventRegistration.css";
import "./JobRegistration.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL } from "../../services/APIUtils";
import { Select, MenuItem, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import HostEventTimeline from "../../components/Timeline/HostEventTimeline";
import {
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import {
  controller,
  getDomains,
  getProjectCategories,
} from "../../services/APIConfig";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../User/Login/CustomSnackbar";
import countryCodes from "../../assets/countryCodes";

const JobRegistrationForm = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState([]); //only to fetch data
  const [projectCategories, setProjectCategories] = useState([]); //only to fetch data
  const [opportunityType, setOpportunityType] = useState("");
  const [isPaid, setIsPaid] = useState(1);
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState(
    decodeURIComponent(getCookie("name")[2])
  );
  const [mobileNo, setMobileNo] = useState(""); //change the type to Number
  const [mobileCountryCode, setMobileCountryCode] = useState("91"); //change the type to Number
  const [alternateMobileNo, setAlterNetMobileNo] = useState("");
  const [email, setEmail] = useState(decodeURIComponent(getCookie("email")[2]));
  const [amount, setAmount] = useState();
  const [amountCopy, setAmountCopy] = useState();
  const [amountInput, setAmountInput] = useState();
  const [experience, setExperience] = useState("");
  const [eligibility, setEligibility] = useState();
  const [estimatedTime, setEstimatedTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("Days"); //enum Hybrid Remote InOffice
  const [opportunityTiming, setJobTiming] = useState(""); // enum Full Time, Part Time, Contractual
  const [duration, setDuration] = useState(""); //duration in months
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [applyLink, setApplyLink] = useState(""); //optional
  const [companyName, setCompanyName] = useState("");
  const [projectPoster, setProjectPoster] = useState({});
  const [techStack, setTechStack] = useState([]); //array of strings
  const [organisationLogo, setOrganizationPoster] = useState({});
  const [projectCategory, setProjectCategory] = useState("");
  const [applicationStartTime, setApplicationStartTime] = useState("");
  const [applicationEndTime, setApplicationEndTime] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [policy, setPolicy] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const experienceValues = [
    {
      value: "0",
      label: "0 for Freshers",
    },
    {
      value: "1",
      label: "1 year",
    },
    {
      value: "2",
      label: "2 years",
    },
    {
      value: "3",
      label: "3 years",
    },
    {
      value: "4",
      label: "4 years",
    },
    {
      value: ">4",
      label: "More than 4 years",
    },
  ];
  const [validation, setValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    projectTitle: "",
    companyName: "",
    projectPoster: "",
    organisationLogo: "",
    domainName: "",
    mobileNo: "",
    alternateMobileNo: "",
    email: "",
    techStack: "",
    amount: "",
    timePeriod: "",
    estimatedTime: "",
    description: "",
    applicationStartTime: "",
    applicationEndTime: "",
    opportunityTiming: "",
    isPaid: "",
    policy: "",
    duration: "",
    websiteUrl: "",
    applyLink: "",
    projectCategory: "",
  });

  const checkUrl = () => {
    const url = window.location.href;
    if (url.includes("job")) {
      return "Job";
    } else if (url.includes("internship")) {
      return "Internship";
    } else {
      return "";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    setOpportunityType(checkUrl());
    getDomains(setDomain);
    getProjectCategories(setProjectCategories);
    return () => {
      controller.abort();
    };
  }, []);

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      projectTitle: "",
      description: "",
      projectPoster: "",
      projectCategory: "",
      organisationLogo: "",
      companyName: "",
    };

    function isImageFileName(fileName) {
      const imageRegex = /\.(jpg|jpeg|png)$/i;
      return imageRegex.test(fileName);
    }
    if (!projectTitle) {
      newErrors.projectTitle = "Project title is required!";
      valid = false;
    } else if (projectTitle.length < 2) {
      newErrors.projectTitle =
        "Project title should be atleast 2 characters long!";
      valid = false;
    } else if (projectTitle.length > 100) {
      newErrors.projectTitle =
        "Project title should be less than 100 characters!";
      valid = false;
    }
    if (!description) {
      newErrors.description = "Description is required!";
      valid = false;
    } else if (description.length < 50) {
      newErrors.description = "Description should have atleast 50 characters!";
      valid = false;
    }
    if (!projectPoster.name) {
      newErrors.projectPoster = "Project poster is required!";
      valid = false;
    } else if (!isImageFileName(projectPoster.name)) {
      newErrors.projectPoster =
        "Project poster should be in jpg/jpeg/png format!";
      valid = false;
    }
    if (!projectCategory) {
      newErrors.projectCategory = "Project category is required!";
      valid = false;
    }
    if (organisationLogo.name && !isImageFileName(organisationLogo.name)) {
      newErrors.organisationLogo =
        "Organisation Logo should be in jpg/jpeg/png format!";
      valid = false;
    }
    if (!companyName) {
      newErrors.companyName = "Company name is required!";
      valid = false;
    } else if (companyName.length < 2) {
      newErrors.companyName =
        "Company name should be atleast 2 characters long!";
      valid = false;
    } else if (companyName.length > 100) {
      newErrors.companyName =
        "Company name should be less than 100 characters!";
      valid = false;
    }

    console.log("newErrors: ", newErrors);
    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      estimatedTime: "",
      timePeriod: "",
      techStack: "",
      amount: "",
      email: "",
      mobileNo: "",
      contactName: "",
      websiteUrl: "",
      applyLink: "",
    };
    if (!estimatedTime) {
      newErrors.estimatedTime = "Estimated time is required!";
      valid = false;
    }
    if (estimatedTime < 1) {
      newErrors.estimatedTime = "Estimated time should be greater than 0!";
      valid = false;
    }
    if (techStack.length === 0) {
      newErrors.techStack = "Minimum 1 tech stack is required!";
      valid = false;
    }
    if (!amountCopy) {
      newErrors.amount = "Amount is required!";
      valid = false;
    } else if (!/^[0-9]+$/.test(amountCopy)) {
      newErrors.amount = "Amount should only be in numbers";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email is required!";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format!";
      valid = false;
    }
    if (!mobileNo) {
      newErrors.mobileNo = "Mobile number is required!";
      valid = false;
    } else if (!/^[0-9]+$/.test(mobileNo)) {
      newErrors.mobileNo =
        "Mobile number should not contain any special characters or letter!";
      valid = false;
    } else if (!/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = "Mobile number should be of 10 digits!";
      valid = false;
    }
    if (!contactName) {
      newErrors.contactName = "Contact name is required!";
      valid = false;
    } else if (contactName.length < 2) {
      newErrors.contactName =
        "Contact name should be atleast 2 characters long!";
      valid = false;
    } else if (contactName.length > 100) {
      newErrors.contactName =
        "Contact name should be less than 100 characters!";
      valid = false;
    }
    if (!websiteUrl) {
      newErrors.websiteUrl = "Website Url is required!";
      valid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(websiteUrl)) {
      newErrors.websiteUrl =
        "Invalid website url! (Ex: https://www.engineerhub.in/)";
      valid = false;
    }
    if (applyLink && !/^(ftp|http|https):\/\/[^ "]+$/.test(applyLink)) {
      newErrors.applyLink =
        "Invalid apply link! (Ex: https://www.engineerhub.in/)";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  function handleNext() {
    window.scrollTo(0, 0);
    if (step === 1) {
      if (validateInput1()) setStep((prev) => prev + 1);
    }
    if (step === 2) {
      if (validateInput2()) setValidation(true);
    }
  }
  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("projectName", projectTitle);
    form.append("description", description);
    form.append("projectPoster", projectPoster);
    form.append("category", projectCategory);
    form.append("techStack", techStack);
    form.append("stipend", amountCopy);
    form.append("negotiable", isNegotiable);
    form.append("estimatedTime", estimatedTime);
    form.append("timePeriod", timePeriod);
    form.append("organisationLogo", organisationLogo);
    form.append("contactEmail", email);
    form.append("contactName", contactName);
    form.append("mobileCountryCode", mobileCountryCode);
    form.append("mobileNo", mobileNo);
    form.append("websiteUrl", websiteUrl);
    form.append("applyLink", applyLink);
    form.append("organisationName", companyName);
    form.append("email", email);

    // console.log(form.get("opportunityType"), " opportunityType ");
    // console.log(form.get("projectPoster"), " projectPoster ");
    // console.log(form.get("projectTitle"), " projectTitle ");
    // console.log(form.get("companyName"), " companyName ");
    // console.log(form.get("organisationLogo"), " organisationLogo ");
    // console.log(form.get("domainName"), " domainName ");
    // console.log(form.get("description"), " description ");
    // console.log(form.get("mobileNo"), " mobileNo ");
    // console.log(form.get("alternateMobileNo"), " alternateMobileNo ");
    // console.log(form.get("email"), " email ");
    // console.log(form.get("applicationStartTime"), " applicationStartTime ");
    // console.log(form.get("applicationEndTime"), " applicationEndTime ");
    // console.log(form.get("amount"), " amountCopy ");
    // console.log(form.get("isPaid"), " isPaid ");
    // console.log(form.get("eligibility"), " eligibility ");
    // console.log(form.get("experience"), " experience ");
    // console.log(form.get("projectCategory"), " projectCategory ");
    // console.log(form.get("estimatedTime"), " estimatedTime ");
    // console.log(form.get("timePeriod"), " timePeriod ");
    // console.log(form.get("opportunityTiming"), " opportunityTiming ");
    // console.log(form.get("duration"), " duration ");
    // console.log(form.get("websiteUrl"), " websiteUrl ");

    if (validation === true) {
      setIsLoading(true);
      const response = await axios
        .post(`${API_URL}api/v1/projectHiring`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        })
        .then((res) => {
          console.log(res);
          setSnackbarValues({
            severity: "success",
            message: `New project created`,
          });
          setOpen(true);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/host");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          alert(err.response.data.err || err.response.data.message);
          setValidation(false);
        });
    }
  };
  const handleFileInputChangePoster = (e) => {
    setProjectPoster(e.target.files[0]);
  };
  const handleFileInputOrganizationPoster = (e) => {
    setOrganizationPoster(e.target.files[0]);
  };

  const handleProjectCategoryChange = (_, value) => {
    console.log(value);
    setProjectCategory(value);
  };

  const handleTechStackChange = (_, value) => {
    setTechStack(value);
  };

  const step1 = (
    <div>
      <TextField
        name="projectTitle"
        label="Project Title*"
        variant="outlined"
        value={projectTitle}
        placeholder="Enter a title for your project"
        onChange={(e) => setProjectTitle(e.target.value)}
        onBlur={(e) => setProjectTitle(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.projectTitle}
        helperText={errors.projectTitle}
        autoComplete="off"
      />

      <FormControl margin="normal" fullWidth>
        <div className="position-relative">
          <div
            className="quill-container"
            style={{
              border: !!errors.description
                ? "1px solid #d32f2f"
                : "1px solid rgba(0, 0, 0, 0.23)",
            }}
          >
            <label
              style={{
                color: !!errors.description ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
              }}
              className="mui-copy-input-label"
              htmlFor="description"
            >
              Project Description*
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>
          {errors.description && (
            <p className="mui-copy-input-label-3" id=":rf:-helper-text">
              {errors.description}
            </p>
          )}
        </div>
      </FormControl>

      <div className="position-relative mt-3 mb-2">
        <label
          style={{
            color: !!errors.projectPoster ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label"
          htmlFor="projectPoster"
        >
          Project Poster*
        </label>
        <div className="filename-container">
          <input
            style={{
              border: !!errors.projectPoster
                ? "1px solid #d32f2f"
                : "1px solid #bdbdbd",
              color: "transparent",
            }}
            type="file"
            id="projectPoster"
            className="inputHosting w-100"
            onChange={handleFileInputChangePoster}
          />
          <div className="filename">{projectPoster?.name}</div>
        </div>
        {errors.projectPoster && (
          <p className="mui-copy-input-label-3">{errors.projectPoster}</p>
        )}
      </div>

      <div>
        <Autocomplete
          options={projectCategories.map((option) => option._id)}
          error={!!errors.projectCategory}
          freeSolo
          value={projectCategory}
          onChange={handleProjectCategoryChange}
          renderInput={(params) => (
            <TextField margin="normal" {...params} label="Project Category*" />
          )}
        />
        {errors.projectCategory && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.projectCategory}
          </p>
        )}
      </div>

      {/* {
        <FormControl margin="normal" fullWidth>
          <InputLabel
            id="student-signup-campus-label"
            error={!!errors.domainName}
          >
            Project Category*
          </InputLabel>
          <Select
            labelid="Domain-name"
            id="student-signup-campus-select"
            value={domainName}
            label="Domain Name"
            name="domainName"
            onChange={(e) => setDomainName(e.target.value)}
            error={!!errors.domainName}
          >
            {domain.map((domains) => (
              <MenuItem key={domains.domain} value={domains.domain}>
                {domains.domain}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.domainName}>
            {errors.domainName}
          </FormHelperText>
        </FormControl>
      } */}

      <div className="position-relative mt-3 mb-2">
        <label
          style={{
            color: !!errors.organisationLogo ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label"
          htmlFor="organisationLogo"
        >
          Company Logo
        </label>
        <div className="filename-container">
          <input
            style={{
              border: !!errors.organisationLogo
                ? "1px solid #d32f2f"
                : "1px solid #bdbdbd",
              color: "transparent",
            }}
            type="file"
            id="organisationLogo"
            className="inputHosting w-100"
            onChange={handleFileInputOrganizationPoster}
          />
          {!!organisationLogo?.name ? (
            <>
              <div className="filename">{organisationLogo?.name}</div>
            </>
          ) : (
            <>
              <div className="filename d-flex text-nowrap">
                <div
                  style={{
                    backgroundImage: `url(${getCookie("image")[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="current-logo me-1"
                ></div>
                Click to change logo
              </div>
            </>
          )}
        </div>
        {errors.organisationLogo && (
          <p className="mui-copy-input-label-3" id=":rf:-helper-text">
            {errors.organisationLogo}
          </p>
        )}
      </div>

      <TextField
        name="companyName"
        label="Company Name*"
        variant="outlined"
        value={companyName}
        placeholder="Type your Organisation name"
        onChange={(e) => setCompanyName(e.target.value)}
        onBlur={(e) => setCompanyName(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.companyName}
        helperText={errors.companyName}
        autoComplete="off"
      />
    </div>
  );

  const step2 = (
    <div>
      <div className="complex-field-container">
        <TextField
          name="estimatedTime"
          label="Estimated time of completion*"
          type="number"
          variant="outlined"
          value={estimatedTime}
          placeholder="Enter in numbers"
          onChange={(e) => setEstimatedTime(e.target.value)}
          onBlur={(e) => setEstimatedTime(e.target.value.trim())}
          fullWidth
          margin="normal"
          error={!!errors.estimatedTime}
          helperText={errors.estimatedTime}
        />
        <FormControl className="complex-field-2" margin="normal" fullWidth>
          <InputLabel
            id="student-signup-campus-label"
            error={!!errors.timePeriod}
          ></InputLabel>
          <Select
            labelid="event-type-label"
            id="event-type"
            value={timePeriod}
            label=""
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <MenuItem value={"Days"}>Days</MenuItem>
            <MenuItem value={"Weeks"}>Weeks</MenuItem>
            <MenuItem value={"Months"}>Months</MenuItem>
          </Select>
          <FormHelperText error={!!errors.timePeriod}>
            {errors.timePeriod}
          </FormHelperText>
        </FormControl>
      </div>

      <div>
        <Autocomplete
          multiple
          options={[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "Java",
            "C++",
            " SQL",
            "No-SQL",
            "MongoDB",
            "MERN",
            "PHP",
            "Web Development",
            "Database Management",
            "Ruby",
            "Rust",
            "Golang",
            "Firebase",
            "Heroku",
            "azure",
            "aws",
            "DevOps",
            "Data Analysis",
            "Numpy",
            "Pandas",
            "Tensorflow",
            "Keras",
            "OpenCV",
            "OpenGL",
            "excel",
            "pandas",
            "tableu",
            "powerBI",
            "Cloud Computing",
            "Google Cloud",
            "Communication Skills",
            "Problem-Solving",
            "Teamwork and Collaboration",
            "Adaptability",
            "Leadership",
            "Time Management",
            "Creativity",
            "Analytical Thinking",
            "Emotional Intelligence",
            "Continuous Learning",
          ]}
          freeSolo
          value={techStack}
          onChange={handleTechStackChange}
          renderInput={(params) => (
            <TextField margin="normal" {...params} label="Tech Stack*" />
          )}
        />
        {errors.techStack && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.techStack}
          </p>
        )}
      </div>

      <TextField
        name="amount"
        label="I am looking to spend*"
        variant="outlined"
        placeholder="Enter amount in numbers"
        value={amount}
        onChange={(e) => {
          setAmountCopy(e.target.value);
          setAmount(e.target.value);
          const formatter = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          });
          const formattedSalary = formatter.format(e.target.value);
          if (e.target.value === "") setAmountInput("");
          else setAmountInput(formattedSalary);
        }}
        onFocus={() => {
          setAmount(amountCopy);
        }}
        onBlur={() => {
          setAmount(amountInput);
        }}
        fullWidth
        margin="normal"
        error={!!errors.amount}
        helperText={errors.amount}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isNegotiable}
            onChange={() => setIsNegotiable(!isNegotiable)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Negotiable"
      />

      <TextField
        name="email"
        label="Contact Email*"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => setEmail(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <div className="complex-field-container">
        <FormControl className="complex-field-3" margin="normal" fullWidth>
          <InputLabel
            id="student-signup-campus-label"
            error={!!errors.mobileCountryCode}
          ></InputLabel>
          <Select
            labelid="event-type-label"
            id="event-type"
            value={mobileCountryCode}
            label=""
            onChange={(e) => setMobileCountryCode(e.target.value)}
          >
            {countryCodes.map((countryCode) => (
              <MenuItem value={countryCode}>{`+${countryCode}`}</MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.mobileCountryCode}>
            {errors.mobileCountryCode}
          </FormHelperText>
        </FormControl>
        <TextField
          name="mobileNo"
          label="Contact Mobile No*"
          variant="outlined"
          value={mobileNo}
          placeholder="Enter in numbers"
          onChange={(e) => setMobileNo(e.target.value)}
          onBlur={(e) => setMobileNo(e.target.value.trim())}
          fullWidth
          margin="normal"
          error={!!errors.mobileNo}
          helperText={errors.mobileNo}
        />
      </div>

      <TextField
        name="contactName"
        label="Contact Name*"
        variant="outlined"
        value={contactName}
        placeholder="Enter your name"
        onChange={(e) => setContactName(e.target.value)}
        onBlur={(e) => setContactName(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.contactName}
        helperText={errors.contactName}
      />

      <TextField
        name="websiteUrl"
        label="Company Website*"
        variant="outlined"
        placeholder="Enter Company Website URL"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.websiteUrl}
        helperText={errors.websiteUrl}
      />

      <TextField
        name="applyLink"
        label="Apply Link"
        variant="outlined"
        placeholder="Enter apply link (Leave blank if not available)"
        value={applyLink}
        onChange={(e) => setApplyLink(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.applyLink}
        helperText={errors.applyLink}
      />

      {/* <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.opportunityTiming}
        >
          Job Timings*
        </InputLabel>
        <Select
          labelid="event-type-label"
          id="event-type"
          value={opportunityTiming}
          label="Event Mode"
          onChange={(e) => setJobTiming(e.target.value)}
          error={!!errors.opportunityTiming}
        >
          <MenuItem value={"Full Time"}>Full Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Contractual"}>Contractual</MenuItem>
        </Select>
        <FormHelperText error={!!errors.opportunityTiming}>
          {errors.opportunityTiming}
        </FormHelperText>
      </FormControl>

      <TextField
        name="eligibility"
        label="Eligibility*"
        variant="outlined"
        type="number"
        InputProps={{
          inputProps: {
            max: 10,
            min: 1,
          },
        }}
        value={eligibility}
        placeholder="Enter minimum CGPA required"
        onChange={(e) => setEligibility(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.eligibility}
        helperText={errors.eligibility}
      />

      {checkUrl() === "Internship" && (
        <TextField
          name="duration"
          label="Duration*"
          variant="outlined"
          placeholder="Enter duration in months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.duration}
          helperText={errors.duration}
        />
      )}

      {checkUrl() === "Internship" && (
        <FormControl margin="normal" fullWidth>
          <InputLabel id="student-signup-campus-label" error={!!errors.isPaid}>
            Paid / Unpaid*
          </InputLabel>
          <Select
            labelid="event-type-label"
            id="event-type"
            value={isPaid}
            label="Paid / Unpaid*"
            onChange={(e) => setIsPaid(e.target.value)}
          >
            <MenuItem value={0}>Unpaid</MenuItem>
            <MenuItem value={1}>Paid</MenuItem>
          </Select>
          <FormHelperText error={!!errors.isPaid}>
            {errors.isPaid}
          </FormHelperText>
        </FormControl>
      )}

      {(!!isPaid || checkUrl() === "Job") && (
        <TextField
          name="amount"
          label={`${checkUrl() === "Job" ? "Salary" : "Stipend"}*`}
          variant="outlined"
          placeholder={`Enter ${
            checkUrl() === "Job" ? "CTC" : "stipend"
          } in numbers`}
          value={amount}
          onChange={(e) => {
            setAmountCopy(e.target.value);
            setAmount(e.target.value);
            const formatter = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            });
            const formattedSalary = formatter.format(e.target.value);
            if (e.target.value === "") setAmountInput("");
            else setAmountInput(formattedSalary);
          }}
          onFocus={() => {
            setAmount(amountCopy);
          }}
          onBlur={() => {
            setAmount(amountInput);
          }}
          fullWidth
          margin="normal"
          error={!!errors.amount}
          helperText={errors.amount}
        />
      )} */}
    </div>
  );

  //   const step3 = (
  //     <div>
  //       {checkUrl() === "Job" && (
  //         <>
  //           <FormControl margin="normal" fullWidth>
  //             <InputLabel
  //               id="student-signup-campus-label"
  //               error={!!errors.experience}
  //               placeholder="in Years"
  //             >
  //               Work Experience*
  //             </InputLabel>
  //             <Select
  //               labelid="Domain-name"
  //               id="student-signup-campus-select"
  //               value={experience}
  //               label="Work Experience*"
  //               placeholder="in Years"
  //               name="domainName"
  //               onChange={(e) => setExperience(e.target.value)}
  //               error={!!errors.experience}
  //             >
  //               {experienceValues.map((value) => (
  //                 <MenuItem key={value.value} value={value.value}>
  //                   {value.label}
  //                 </MenuItem>
  //               ))}
  //             </Select>
  //             <FormHelperText error={!!errors.experience}>
  //               {errors.experience}
  //             </FormHelperText>
  //           </FormControl>
  //         </>
  //       )}

  //       <div className="position-relative">
  //         <label
  //           style={{
  //             color: !!errors.applicationStartTime
  //               ? "#d32f2f"
  //               : "rgba(0, 0, 0, 0.6)",
  //           }}
  //           className="mui-copy-input-label-2"
  //           htmlFor="applicationStartTime"
  //         >
  //           Application Start Date*
  //         </label>
  //         <TextField
  //           name="Application Start Date"
  //           id="applicationStartTime"
  //           variant="outlined"
  //           type="date"
  //           value={applicationStartTime}
  //           onChange={(e) => setApplicationStartTime(e.target.value)}
  //           fullWidth
  //           margin="normal"
  //           error={!!errors.applicationStartTime}
  //           helperText={errors.applicationStartTime}
  //         />
  //       </div>

  //       <div className="position-relative">
  //         <label
  //           style={{
  //             color: !!errors.applicationEndTime
  //               ? "#d32f2f"
  //               : "rgba(0, 0, 0, 0.6)",
  //           }}
  //           className="mui-copy-input-label-2"
  //           htmlFor="applicationEndTime"
  //         >
  //           Application End Date*
  //         </label>
  //         <TextField
  //           name="Application End Date"
  //           id="applicationEndTime"
  //           variant="outlined"
  //           type="date"
  //           value={applicationEndTime}
  //           onChange={(e) => setApplicationEndTime(e.target.value)}
  //           fullWidth
  //           margin="normal"
  //           error={!!errors.applicationEndTime}
  //           helperText={errors.applicationEndTime}
  //         />
  //       </div>

  //       <TextField
  //         name="policy"
  //         label="Policy"
  //         variant="outlined"
  //         placeholder="Policy should be in 50 to 1000 characters"
  //         value={policy}
  //         multiline
  //         minRows={3}
  //         maxRows={6}
  //         onChange={(e) => setPolicy(e.target.value)}
  //         onBlur={(e) => setPolicy(e.target.value.trim())}
  //         fullWidth
  //         margin="normal"
  //         error={!!errors.policy}
  //         helperText={errors.policy}
  //       />
  //     </div>
  //   );
  return (
    <>
      <main className="signup-page project-hosting">
        <section className="details-container">
          <div className="details">
            <HostEventTimeline
              step={step}
              numberOfCheckpoints={2}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {snackbarValues.severity === "success" && (
                <CustomSnackbar
                  setOpen={setOpen}
                  open={open}
                  message={snackbarValues.message}
                  severity={snackbarValues.severity}
                />
              )}

              <div className="button-container">
                <button
                  type="button"
                  className="button previous-button"
                  onClick={handlePrev}
                  disabled={step === 1}
                >
                  Previous
                </button>
                <button
                  type={`${step === 2 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    `${step === 2 ? "Submit" : "Next"}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default JobRegistrationForm;
