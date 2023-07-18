import { useState, useEffect, useRef } from "react";
import "./EventRegistration.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL } from "../../services/APIUtils";
import Cookies from "js-cookie";
import { Select, MenuItem } from "@mui/material";
import HostEventTimeline from "../../components/Timeline/HostEventTimeline";
import {
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { controller, getDomains } from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../User/Login/CustomSnackbar";

const JobRegistrationForm = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    return () => {
      controller.abort();
    };
  }, []);

  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState([]); //only to fetch data
  //   const [campusId, setCampusId] = useState('');
  //   const [campuses,setCampuses] =useState([]);//only to fetch data
  const [OpportunityType, setOpportunityType] = useState("");
  const [IsPaid, setIsPaid] = useState(0);
  const [description, setDescription] = useState("");

  const [mobileNo, setMobileNo] = useState(""); //change the type to Number
  const [alterNetMobileNo, setAlterNetMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [minSalary, setMinSalary] = useState();
  const [minSalaryCopy, setMinSalaryCopy] = useState();
  const [minSalaryInput, setMinSalaryInput] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [maxSalaryCopy, setMaxSalaryCopy] = useState();
  const [maxSalaryInput, setMaxSalaryInput] = useState();
  const [experience, setExperience] = useState("");
  const [eligibility, setEligibility] = useState();
  const [opportunityLocation, setJobLocation] = useState("");
  const [opportunityMode, setJobType] = useState("Remote"); //enum Hybrid Remote InOffice
  const [opportunityTiming, setJobTiming] = useState(""); // enum Full Time, Part Time, Contractual
  const [duration, setDuration] = useState(""); //duration in months
  const [workDays, setWorkDays] = useState(4); //number type minimum value 4 and maximum value 6
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [organisationName, setOrganisation] = useState("");
  const [opportunityPoster, setOpportunityPoster] = useState({});
  const [organisationLogo, setOrganizationPoster] = useState({});
  const [isPosterSelected, setIsPosterSelected] = useState(0); //0,1,2
  const [isLogoSelected, setIsLogoSelected] = useState(0); //0,1,2
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [applicationStartTime, setApplicationStartTime] = useState("");
  const [applicationEndTime, setApplicationEndTime] = useState("");
  //   const [applyLink, setApplyLink] = useState("");
  const [OpportunityName, setOpportunityName] = useState("");
  //   const [eventModeType, setEventModeType] = useState("");
  const [OpportunityPoster, setOpportunityPoster] = useState("");

  //   const [status, setStatus] = useState([]);
  const [policy, setPolicy] = useState("");
  const [validation, setValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({
    domainName: "",
    mobileNo: "",
    alterNetMobileNo: "",
    email: "",
    minSalary: "",
    maxSalary: "",
    experience: "",
    jobType: "",
    jobLocation: "",

    description: "",
    OpportunityType: "",
    OpportunityName: "",
    applicationStartTime: "",
    applicationEndTime: "",
    opportunityTiming: "",
    isPaid: "",
    policy: "",
    duration: "",
    websiteUrl: "",
    skillsRequired: "",
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
    return () => {
      controller.abort();
    };
  }, []);

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      OpportunityType: "",
      OpportunityName: "",
      OpportunityPoster: "",
      OpportunityPosition: "",
      Organisation: "",
      OrganizationPoster: "",
    };
    function isImageFileName(fileName) {
      // Regex to check if the file name ends with a common image extension
      const imageRegex = /\.(jpg|jpeg|png)$/i;
      return imageRegex.test(fileName);
    }
    if (!opportunityName) {
      newErrors.opportunityName = "Opportunity Name is required!";
      valid = false;
    } else if (opportunityName.length < 2) {
      newErrors.opportunityName =
        "Opportunity Name should be atleast 2 characters long!";
      valid = false;
    } else if (opportunityName.length > 100) {
      newErrors.opportunityName =
        "Opportunity Name should be less than 100 characters!";
      valid = false;
    }
    if (!OpportunityName) {
      newErrors.OpportunityName = "Opportunity Name is required";
      valid = false;
    } else if (organisationName.length < 2) {
      newErrors.organisationName =
        "Organisation Name should be atleast 2 characters long!";
      valid = false;
    } else if (organisationName.length > 100) {
      newErrors.organisationName =
        "Organisation Name should be less than 100 characters!";
      valid = false;
    }
    if (!opportunityPoster.name) {
      newErrors.opportunityPoster = "Opportunity Poster is required!";
      valid = false;
    } else if (!isImageFileName(opportunityPoster.name)) {
      newErrors.opportunityPoster =
        "Opportunity Poster should be in jpg/jpeg/png format!";
      valid = false;
    }

    if (!organisationLogo.name) {
      newErrors.organisationLogo = "Organisation Logo is required!";
      valid = false;
    } else if (!isImageFileName(organisationLogo.name)) {
      newErrors.organisationLogo =
        "Organisation Logo should be in jpg/jpeg/png format!";
      valid = false;
    }
    // if (!OpportunityPoster) {
    //   newErrors.OpportunityPoster = "Opportunity Poster  is required";
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      domainName: "",
      email: "",
      mobileNo: "",
      alternateMobileNo: "",
      applicationStartTime: "",
      applicationEndTime: "",
    };
    if (!domainName) {
      newErrors.domainName = "Domain Name is required!";
      valid = false;
    }
    if (!email) {
      newErrors.email = "email is required!";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!mobileNo) {
      newErrors.mobileNo = "Mobile number is required";
      valid = false;
    } else if (!/^[0-9]+$/.test(mobileNo)) {
      newErrors.mobileNo =
        "Mobile number should not contain any special characters or letter";
      valid = false;
    } else if (!/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = "Mobile number should be of 10 digits";
      valid = false;
    }
    if (alternateMobileNo && !/^[0-9]+$/.test(alternateMobileNo)) {
      newErrors.alternateMobileNo =
        "Alternate Mobile number should not contain any special characters or letter!";
      valid = false;
    } else if (alternateMobileNo && !/^\d{10}$/.test(alternateMobileNo)) {
      newErrors.alternateMobileNo =
        "Alternate Mobile number should be of 10 digits!";
      valid = false;
    }
    if (!applicationStartTime) {
      newErrors.applicationStartTime = "Application Start Time is required!";
      valid = false;
    } else if (new Date(applicationStartTime) < new Date()) {
      newErrors.applicationStartTime =
        "Application Start Time should be greater than current time!";
      valid = false;
    } else if (new Date(applicationStartTime) > new Date(applicationEndTime)) {
      newErrors.applicationStartTime =
        "Application Start Time should be less than Application End Time!";
      valid = false;
    }
    if (!applicationEndTime) {
      newErrors.applicationEndTime = "Application End Time is required!";
      valid = false;
    } else if (new Date(applicationEndTime) < new Date()) {
      newErrors.applicationEndTime =
        "Application End Time should be greater than current time!";
      valid = false;
    } else if (new Date(applicationEndTime) < new Date(applicationStartTime)) {
      newErrors.applicationEndTime =
        "Application End Time should be greater than Application Start Time!";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      description: "",
      experience: "",
      minSalary: "",
      maxSalary: "",
    };
    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    } else if (description.length < 50) {
      newErrors.description = "Description should have atleast 50 characters!";
      valid = false;
    } else if (description.length > 1000) {
      newErrors.description =
        "Description should be less than 1000 characters!";
      valid = false;
    }
    if (!experience) {
      newErrors.experience = "Experience is required";
      valid = false;
    } else if (experience.length < 50) {
      newErrors.experience = "Experience should have atleast 50 characters!";
      valid = false;
    } else if (experience.length > 1000) {
      newErrors.experience = "Experience should be less than 1000 characters!";
      valid = false;
    }
    if (!!isPaid && !minSalaryCopy) {
      newErrors.minSalary = "Minimum Salary is required!";
      valid = false;
    } else if (!!isPaid && !/^[0-9]+$/.test(minSalaryCopy)) {
      newErrors.minSalary = "Minimum Salary should only be in numbers";
      valid = false;
    }
    if (!!isPaid && !minSalaryCopy) {
      newErrors.maxSalary = "Maximum Salary is required!";
      valid = false;
    } else if (!!isPaid && !/^[0-9]+$/.test(minSalaryCopy)) {
      newErrors.maxSalary = "Maximum Salary should only be in numbers";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput4 = () => {
    let valid = true;
    const newErrors = {
      eligibility: "",
      jobLocation: "",
      jobType: "",
      JobTiming: "",
    };
    if (!eligibility) {
      newErrors.eligibility = "Eligibility is required in SGPA/CGPA!";
      valid = false;
    } else if (
      !/^(6(\.\d{1,2})?|7(\.\d{1,2})?|8(\.\d{1,2})?|9(\.\d{1,2})?|10(\.0{1,2})?)$/.test(
        eligibility
      )
    ) {
      newErrors.eligibility =
        "SGPA/CGPA must be in range 1-10 upto 2 decimal places!";
      valid = false;
    }

    if (!opportunityLocation && opportunityMode !== "Remote") {
      newErrors.opportunityLocation = "Job Location is required!";
      valid = false;
    }
    if (!jobType) {
      newErrors.jobType = "Job type is required ";
      valid = false;
    }
    if (!JobTiming) {
      newErrors.JobTiming = "Job timing is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput5 = () => {
    let valid = true;
    const newErrors = {
      policy: "",
    };
    if (!policy) {
      newErrors.policy = "Policy is required";
      valid = false;
    } else if (duration < 1) {
      newErrors.duration = "Duration should be greater than 0!";
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
    if (policy && policy.length < 50) {
      newErrors.policy = "Policy must be of minimum 50 words";
      valid = false;
    } else if (policy && policy.length > 1000) {
      newErrors.policy = "Policy must be of maximum 1000 words";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  function handleNext() {
    if (step === 1) {
      if (validateInput1()) setStep(step + 1);
    }
    if (step === 2) {
      if (validateInput2()) setStep(step + 1);
    }
    if (step === 3) {
      if (validateInput3()) setStep(step + 1);
    }
    if (step === 4) {
      if (validateInput4()) setStep(step + 1);
    }
    if (step === 5) {
      if (validateInput5()) setValidation(true);
    }
  }
  const handlePrev = () => {
    setStep(step - 1);
  };
  // var form = new FormData();

  useEffect(() => {
    window.scrollTo(0, 0);

    getDomains(setDomain);

    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const indianApplicationStartTime = new Date(
      applicationStartTime.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const indianApplicationEndTime = new Date(
      applicationEndTime.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    e.preventDefault();
    const form = new FormData();
    form.append("OpportunityType", OpportunityType);
    form.append("OpportunityPoster", OpportunityPoster);
    form.append("OpportunityName", OpportunityName);
    form.append("OpportunityPosition", OpportunityPosition);
    form.append("Organisation", Organisation);
    form.append("OrganizationPoster", OrganizationPoster);
    form.append("domainName", domainName);
    form.append("description", description);
    form.append("mobileNo", mobileNo);
    form.append("alterNetMobileNo", alterNetMobileNo);
    form.append("email", email);
    form.append("applicationStartTime", indianApplicationStartTime);
    form.append("applicationEndTime", indianApplicationEndTime);
    form.append("minSalary", minSalaryCopy);
    form.append("maxSalary", maxSalaryCopy);
    form.append("isPaid", isPaid);
    form.append("eligibility", eligibility);
    form.append("experience", experience);
    form.append("skillsRequired", skillsRequired);
    form.append("jobLocation", jobLocation);
    form.append("jobType", jobType);
    form.append("JobTiming", JobTiming);
    form.append("duration", duration);
    form.append("websiteUrl", websiteUrl);
    if (!!policy) form.append("policy", policy);

    // console.log(form.get("opportunityType"), " opportunityType ");
    // console.log(form.get("opportunityPoster"), " opportunityPoster ");
    // console.log(form.get("opportunityName"), " opportunityName ");
    // console.log(form.get("organisationName"), " organisationName ");
    // console.log(form.get("organisationLogo"), " organisationLogo ");
    // console.log(form.get("domainName"), " domainName ");
    // console.log(form.get("description"), " description ");
    // console.log(form.get("mobileNo"), " mobileNo ");
    // console.log(form.get("alternateMobileNo"), " alternateMobileNo ");
    // console.log(form.get("email"), " email ");
    // console.log(form.get("applicationStartTime"), " applicationStartTime ");
    // console.log(form.get("applicationEndTime"), " applicationEndTime ");
    // console.log(form.get("minSalary"), " minSalary ");
    // console.log(form.get("maxSalary"), " maxSalary ");
    // console.log(form.get("isPaid"), " isPaid ");
    // console.log(form.get("eligibility"), " eligibility ");
    // console.log(form.get("experience"), " experience ");
    // console.log(form.get("skillsRequired"), " skillsRequired ");
    // console.log(form.get("opportunityLocation"), " opportunityLocation ");
    // console.log(form.get("opportunityMode"), " opportunityMode ");
    // console.log(form.get("opportunityTiming"), " opportunityTiming ");
    // console.log(form.get("duration"), " duration ");
    // console.log(form.get("websiteUrl"), " websiteUrl ");

    if (validation === true) {
      setIsLoading(true);
      const response = await axios
        .post(`${API_URL}api/v1/hiring`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        })
        .then((res) => {
          console.log(res);
          setSnackbarValues({
            severity: "success",
            message: `New ${checkUrl()} created`,
          });
          setOpen(true);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/hosting");
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
  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setCampusLogos(e.target.files);
  };
  const handleFileInputChangePoster = (e) => {
    console.log(e.target.files[0]);
    setOpportunityPoster(e.target.files[0]);
  };
  const handleFileInputOrganizationPoster = (e) => {
    console.log(e.target.files[0]);
    setOrganizationPoster(e.target.files[0]);
    const updateFileInputValue = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    updateFileInputValue();
  };

  const handleSkillsChange = (_, value) => {
    setSkillsRequired(value);
  };

  const step1 = (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.OpportunityType}
        >
          Oppurtunity Type
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          name="Opportunity Type"
          value={OpportunityType}
          label="Oppurtunity Type"
          onChange={(e) => setOpportunityType(e.target.value)}
        >
          <MenuItem value="Job">Job</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Challenge">Challenge</MenuItem>
          {/* <MenuItem value="Hackathon">Hackathon</MenuItem> */}
        </Select>
        <FormHelperText error={!!errors.OpportunityType}>
          {errors.OpportunityType}
        </FormHelperText>
      </FormControl>

      <TextField
        name="OpportunityName"
        label="Opportunity Name"
        variant="outlined"
        value={OpportunityName}
        onChange={(e) => setOpportunityName(e.target.value)}
        onBlur={(e) => setOpportunityName(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.OpportunityName}
        helperText={errors.OpportunityName}
      />

      <label htmlFor="OpportunityPoster">Oppurtunity Poster</label>
      <div>
        <input
          type="file"
          id="OpportunityPoster"
          className="inputHosting"
          onChange={handleFileInputChangePoster}
        />

        {file && <p>Selected file: {file.name}</p>}
      </div>

      <TextField
        name="OpportunityPosition"
        label="Opportunity Position"
        variant="outlined"
        value={OpportunityPosition}
        onChange={(e) => setOpportunityPosition(e.target.value)}
        // onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.OpportunityPosition}
        helperText={errors.OpportunityPosition}
      />

      <TextField
        name="Organisation"
        label="Organisation"
        variant="outlined"
        value={Organisation}
        onChange={(e) => setOrganisation(e.target.value)}
        onBlur={(e) => setOrganisation(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.Organisation}
        helperText={errors.Organisation}
      />

      <div className="position-relative mt-3 mb-2">
        <label
          style={{
            color:
              errors.opportunityPoster !== ""
                ? "#d32f2f"
                : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label"
          htmlFor="opportunityPoster"
        >
          Opportunity Poster*
        </label>
        <div className="filename-container">
          <input
            style={{
              border:
                errors.opportunityPoster !== ""
                  ? "1px solid #d32f2f"
                  : "1px solid #bdbdbd",
              color: "transparent",
            }}
            type="file"
            id="opportunityPoster"
            className="inputHosting w-100"
            onChange={handleFileInputChangePoster}
          />
          <div className="filename">{opportunityPoster?.name}</div>
        </div>
        {errors.opportunityPoster && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.opportunityPoster}
          </p>
        )}
      </div>

      <div className="position-relative  mt-3 mb-2">
        <label
          style={{
            color: !!errors.organisationLogo ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label"
          htmlFor="organisationLogo"
        >
          Organisation Logo*
        </label>
        <div className="filename-container">
          <input
            ref={fileInputRef}
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
          <div className="filename">{organisationLogo?.name}</div>
        </div>
        {errors.organisationLogo && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.organisationLogo}
          </p>
        )}
      </div>

      {/* till Page 1 */}
    </div>
  );

  const step2 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.domainName}
        >
          Domain Name
        </InputLabel>
        <Select
          labelId="Domain-name"
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

      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        name="mobileNo"
        label="Mobile Number"
        variant="outlined"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.mobileNo}
        helperText={errors.mobileNo}
      />
      <TextField
        name="alterNetMobileNo"
        label="Alternate Mobile Number"
        variant="outlined"
        value={alternateMobileNo}
        onChange={(e) => setAlterNetMobileNo(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.alterNetMobileNo}
        helperText={errors.alterNetMobileNo}
      />

      <div className="position-relative">
        <label
          style={{
            color: !!errors.applicationStartTime
              ? "#d32f2f"
              : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label-2"
          htmlFor="applicationStartTime"
        >
          Application Start Date*
        </label>
        <TextField
          name="Application Start Date"
          // label="Application Start Date"
          id="applicationStartTime"
          variant="outlined"
          type="date"
          value={applicationStartTime}
          onChange={(e) => setApplicationStartTime(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.applicationStartTime}
          helperText={errors.applicationStartTime}
        />
      </div>

      <div className="position-relative">
        <label
          style={{
            color: !!errors.applicationEndTime
              ? "#d32f2f"
              : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label-2"
          htmlFor="applicationEndTime"
        >
          Application End Date*
        </label>
        <TextField
          name="Application End Date"
          id="applicationEndTime"
          // label="Application End Date"
          variant="outlined"
          type="date"
          value={applicationEndTime}
          onChange={(e) => setApplicationEndTime(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.applicationEndTime}
          helperText={errors.applicationEndTime}
        />
      </div>
    </div>
  );

  const step3 = (
    <div>
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        value={description}
        placeholder="Description should be in 50 to 1000 characters"
        multiline
        minRows={3}
        maxRows={6}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={(e) => setDescription(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />

      <TextField
        name="minSalary"
        label="Minimum Salary "
        variant="outlined"
        value={minSalary}
        placeholder="(in LPA)"
        onChange={(e) => setMinSalary(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.minSalary}
        helperText={errors.minSalary}
      />

      <TextField
        name="maxSalary"
        label="Maximum Salary"
        variant="outlined"
        placeholder="(in LPA)"
        value={maxSalary}
        onChange={(e) => setMaxSalary(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.maxSalary}
        helperText={errors.maxSalary}
      />

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.IsPaid}>
          Paid / Unpaid
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={IsPaid}
          label="Event Mode"
          onChange={(e) => setIsPaid(e.target.value)}
        >
          <MenuItem value={0}>Unpaid</MenuItem>
          <MenuItem value={1}>paid</MenuItem>
        </Select>
        <FormHelperText error={!!errors.IsPaid}>{errors.IsPaid}</FormHelperText>
      </FormControl>

      {!!isPaid && (
        <>
          <TextField
            name="minSalary"
            label="Minimum Salary*"
            variant="outlined"
            value={minSalary}
            onChange={(e) => {
              setMinSalaryCopy(e.target.value);
              setMinSalary(e.target.value);
              const formatter = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              });
              const formattedSalary = formatter.format(e.target.value);
              if (e.target.value === "") setMinSalaryInput("");
              else setMinSalaryInput(formattedSalary);
            }}
            onFocus={() => {
              setMinSalary(minSalaryCopy);
            }}
            onBlur={() => {
              setMinSalary(minSalaryInput);
            }}
            placeholder="Enter salary in numbers"
            fullWidth
            margin="normal"
            error={!!errors.minSalary}
            helperText={errors.minSalary}
          />

          <TextField
            name="maxSalary"
            label="Maximum Salary*"
            variant="outlined"
            placeholder="Enter salary in numbers"
            value={maxSalary}
            onChange={(e) => {
              setMaxSalaryCopy(e.target.value);
              setMaxSalary(e.target.value);
              const formatter = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              });
              const formattedSalary = formatter.format(e.target.value);
              if (e.target.value === "") setMaxSalaryInput("");
              else setMaxSalaryInput(formattedSalary);
            }}
            onFocus={() => {
              setMaxSalary(maxSalaryCopy);
            }}
            onBlur={() => {
              setMaxSalary(maxSalaryInput);
            }}
            // onChange={(e) => setMaxSalary(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.maxSalary}
            helperText={errors.maxSalary}
          />
        </>
      )}

      <TextField
        name="experience"
        label="Experience"
        variant="outlined"
        multiline
        minRows={3}
        maxRows={6}
        placeholder="Experience should be in 50 to 1000 characters"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.experience}
        helperText={errors.experience}
      />
    </div>
  );
  const step4 = (
    <div>
      <TextField
        name="eligibility"
        label="Eligibility"
        variant="outlined"
        type="number"
        value={eligibility}
        onChange={(e) => setEligibility(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.eligibility}
        helperText={errors.eligibility}
      />

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
          sx={{
            color: !!errors.skillsRequired ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
          }}
          value={skillsRequired}
          onChange={handleSkillsChange}
          renderInput={(params) => (
            <TextField
              margin="normal"
              {...params}
              label="Required Skills"
              placeholder="Select skills"
            />
          )}
        />
        {errors.skillsRequired && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.skillsRequired}
          </p>
        )}
      </div>

      <TextField
        name="jobLocation"
        label="Job Location"
        variant="outlined"
        value={jobLocation}
        onChange={(e) => setJobLocation(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.jobLocation}
        helperText={errors.jobLocation}
      />

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.jobType}>
          Job Type
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={jobType}
          label="Job Type"
          onChange={(e) => setJobType(e.target.value)}
        >
          <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
          <MenuItem value={"Remote"}>Remote</MenuItem>
          <MenuItem value={"In Office"}>In Office</MenuItem>
        </Select>
        <FormHelperText error={!!errors.jobType}>
          {errors.jobType}
        </FormHelperText>
      </FormControl>

      {opportunityMode !== "Remote" && (
        <TextField
          name="opportunityLocation"
          label="Job Location*"
          variant="outlined"
          value={opportunityLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          onBlur={(e) => setJobLocation(e.target.value.trim())}
          fullWidth
          margin="normal"
          error={!!errors.opportunityLocation}
          helperText={errors.opportunityLocation}
        />
      )}

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.JobTiming}>
          Job Timings
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={JobTiming}
          label="Event Mode"
          onChange={(e) => setJobTiming(e.target.value)}
        >
          <MenuItem value={"Full Time"}>Full Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Contractual"}>Contractual</MenuItem>
        </Select>
        <FormHelperText error={!!errors.JobTiming}>
          {errors.JobTiming}
        </FormHelperText>
      </FormControl>
    </div>
  );
  const step5 = (
    <div>
      <TextField //make it number type here number of months
        name="duration"
        label="Duration"
        variant="outlined"
        placeholder="Enter duration in months"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.duration}
        helperText={errors.durration}
      />

      <TextField //make it number type here number of months
        name="workDays"
        label="Work Days"
        variant="outlined"
        value={workDays}
        placeholder="per Week"
        onChange={(e) => setWorkDays(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.workDays}
        helperText={errors.workDays}
      />

      <TextField
        name="WebsiteUrl"
        label="Website Url"
        variant="outlined"
        value={WebsiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.WebsiteUrl}
        helperText={errors.WebsiteUrl}
      />

      {/* <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.isServiceOff}
        >
          Service on/off
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={isServiceOff}
          label="service on/off"
          onChange={(e) => setIsServiceOff(e.target.value)}
        >
          <MenuItem value={false}>off</MenuItem>
          <MenuItem value={true}>on</MenuItem>
        </Select>
        <FormHelperText error={!!errors.isServiceOff}>
          {errors.isServiceOff}
        </FormHelperText>
      </FormControl> */}

      <TextField
        name="policy"
        label="Policy"
        variant="outlined"
        value={policy}
        multiline
        minRows={3}
        maxRows={6}
        onChange={(e) => setPolicy(e.target.value)}
        onBlur={(e) => setPolicy(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.policy}
        helperText={errors.policy}
      />
    </div>
  );
  return (
    <>
      <main className="signup-page">
        <section className="details-container">
          <div className="details">
            <HostEventTimeline
              step={step}
              numberOfCheckpoints={5}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}
              {step === 4 && step4}
              {step === 5 && step5}
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
                  type={`${step === 5 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    `${step === 5 ? "Submit" : "Next"}`
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
