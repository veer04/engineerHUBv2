import { useState, useEffect } from "react";
import "./EventRegistration.css";
import "./JobRegistration.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL } from "../../services/APIUtils";
import { Select, MenuItem } from "@mui/material";
import HostEventTimeline from "../../components/Timeline/HostEventTimeline";
import {
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { controller, getDomains } from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";

const JobRegistrationForm = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState([]); //only to fetch data
  const [opportunityType, setOpportunityType] = useState("");
  const [isPaid, setIsPaid] = useState(0);
  const [description, setDescription] = useState("");
  const [mobileNo, setMobileNo] = useState(""); //change the type to Number
  const [alternateMobileNo, setAlterNetMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [experience, setExperience] = useState("");
  const [eligibility, setEligibility] = useState(6);
  const [opportunityLocation, setJobLocation] = useState("");
  const [opportunityMode, setJobType] = useState("Remote"); //enum Hybrid Remote InOffice
  const [opportunityTiming, setJobTiming] = useState(""); // enum Full Time, Part Time, Contractual
  const [duration, setDuration] = useState(""); //duration in months
  const [workDays, setWorkDays] = useState(4); //number type minimum value 4 and maximum value 6
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [organisationName, setOrganisation] = useState("");
  const [opportunityPoster, setOpportunityPoster] = useState({});
  const [organisationLogo, setOrganizationPoster] = useState({});
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [applicationStartTime, setApplicationStartTime] = useState("");
  const [applicationEndTime, setApplicationEndTime] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [policy, setPolicy] = useState("");
  const [validation, setValidation] = useState(false);

  const [errors, setErrors] = useState({
    opportunityName: "",
    organisationName: "",
    opportunityPoster: "",
    organisationLogo: "",
    domainName: "",
    mobileNo: "",
    alternateMobileNo: "",
    email: "",
    minSalary: "",
    maxSalary: "",
    opportunityMode: "",
    opportunityLocation: "",
    description: "",
    applicationStartTime: "",
    applicationEndTime: "",
    opportunityMode: "",
    opportunityTiming: "",
    isPaid: "",
    policy: "",
    duration: "",
    websiteUrl: "",
    minSalary: "",
    maxSalary: "",
    skillsRequired: "",
  });

  useEffect(() => {
    console.log("1 poster type", typeof opportunityPoster);
    console.log("2 logo type", typeof organisationLogo);
  }, [opportunityPoster, organisationLogo]);

  useEffect(() => {
    console.log("3 opportunityPoster", opportunityPoster);
    console.log("4 organisationLogo", organisationLogo);
    console.log(" ");
  }, [opportunityPoster, organisationLogo]);

  const checkUrl = () => {
    const url = window.location.href;
    if (url.includes("job")) {
      return "job";
    } else if (url.includes("internship")) {
      return "internship";
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
      opportunityName: "",
      opportunityPoster: "",
      organisationName: "",
      organisationLogo: "",
    };
    if (!opportunityName) {
      newErrors.opportunityName = "Opportunity Name is required!";
      valid = false;
    }
    if (!organisationName) {
      newErrors.organisationName = "Organisation Name is required!";
      valid = false;
    }
    if (!opportunityPoster) {
      newErrors.opportunityPoster = "Opportunity Poster is required!";
      valid = false;
    }
    if (!organisationLogo) {
      newErrors.organisationLogo = "Organisation Logo is required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      domainName: "",
      email: "",
      mobileNo: "",
      applicationStartTime: "",
      applicationEndTime: "",
    };
    if (!domainName) {
      newErrors.domainName = "Domain Name is required!";
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
    if (!applicationStartTime) {
      newErrors.applicationStartTime = "Application Start Time is required!";
      valid = false;
    }
    if (!applicationEndTime) {
      newErrors.applicationEndTime = "Application End Time is required!";
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
      newErrors.description = "Description is required!";
      valid = false;
    } else if (description.length < 51) {
      newErrors.description = "Description should have atleast 50 characters!";
      valid = false;
    } else if (description.length > 500) {
      newErrors.description = "Description should be less than 500 characters!";
      valid = false;
    }
    if (!experience) {
      newErrors.experience = "Experience is required!";
      valid = false;
    } else if (experience.length < 51) {
      newErrors.experience = "Experience should have atleast 50 characters!";
      valid = false;
    }
    if (!!isPaid && !minSalary) {
      newErrors.minSalary = "Minimum Salary is required!";
      valid = false;
    } else if (!!isPaid && !/^[0-9]+$/.test(minSalary)) {
      newErrors.minSalary = "Minimum Salary should only be in numbers";
      valid = false;
    }
    if (!!isPaid && !maxSalary) {
      newErrors.maxSalary = "Maximum Salary is required!";
      valid = false;
    } else if (!!isPaid && !/^[0-9]+$/.test(maxSalary)) {
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
      opportunityLocation: "",
      opportunityMode: "",
      opportunityTiming: "",
      skillsRequired: "",
    };
    if (!eligibility) {
      newErrors.eligibility = "Eligibility is required in sgpa/cgpa!";
      valid = false;
    } else if (
      !/^(1(\.\d{1,2})?|2(\.\d{1,2})?|3(\.\d{1,2})?|4(\.\d{1,2})?|5(\.\d{1,2})?|6(\.\d{1,2})?|7(\.\d{1,2})?|8(\.\d{1,2})?|9(\.\d{1,2})?|10(\.0{1,2})?)$/.test(
        eligibility
      )
    ) {
      newErrors.eligibility = "sgpa/cgpa must be in range 1-10!";
      valid = false;
    }

    if (!opportunityLocation && opportunityMode !== "Remote") {
      console.log("test");
      newErrors.opportunityLocation = "Job Location is required!";
      valid = false;
    }
    if (!opportunityMode) {
      newErrors.opportunityMode = "Job type is required!";
      valid = false;
    }
    if (!opportunityTiming) {
      newErrors.opportunityTiming = "Job timing is required!";
      valid = false;
    }
    if (skillsRequired.length === 0) {
      newErrors.skillsRequired = "Atleast one skill is required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput5 = () => {
    let valid = true;
    const newErrors = {
      duration: "",
      websiteUrl: "",
    };

    if (!duration) {
      newErrors.duration = "Duration is required!";
      valid = false;
    }
    if (!websiteUrl) {
      newErrors.websiteUrl = "Website Url is required!";
      valid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(websiteUrl)) {
      newErrors.websiteUrl = "Invalid website url!";
      valid = false;
    }

    // if (!policy) {
    //   newErrors.policy = "Policy is required";
    //   valid = false;
    // }
    // if (policy.length < 51) {
    //   newErrors.policy = "Policy must be of minimum 50 words";
    //   valid = false;
    // }
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
    const indianApplicationStartTime = applicationStartTime.toLocaleString(
      "en-US",
      {
        timeZone: "Asia/Kolkata",
      }
    );
    console.log(indianApplicationStartTime);
    const indianApplicationEndTime = applicationEndTime.toLocaleString(
      "en-US",
      {
        timeZone: "Asia/Kolkata",
      }
    );
    console.log(indianApplicationEndTime);

    e.preventDefault();
    const form = new FormData();
    form.append("opportunityType", opportunityType);
    form.append("opportunityPoster", opportunityPoster);
    form.append("opportunityName", opportunityName);
    form.append("organisationName", organisationName);
    form.append("organisationLogo", organisationLogo);
    form.append("domainName", domainName);
    form.append("description", description);
    form.append("mobileNo", mobileNo);
    form.append("alternateMobileNo", alternateMobileNo);
    form.append("email", email);
    form.append("applicationStartTime", indianApplicationStartTime);
    form.append("applicationEndTime", indianApplicationEndTime);
    form.append("minSalary", minSalary);
    form.append("maxSalary", maxSalary);
    form.append("isPaid", isPaid);
    form.append("experience", experience);
    form.append("eligibility", eligibility);
    form.append("skillsRequired", skillsRequired);
    form.append("opportunityLocation", opportunityLocation);
    form.append("opportunityMode", opportunityMode);
    form.append("opportunityTiming", opportunityTiming);
    form.append("duration", duration);
    form.append("websiteUrl", websiteUrl);
    form.append("policy", policy);

    // console.log(form.get("domainName"), " domainName ");
    // console.log(form.get("skillsRequired"), " skillsRequired ");
    // console.log(form.get("opportunityType"), " opportunityType ");
    // console.log(form.get("description"), " description ");
    // console.log(form.get("applicationStartTime"), " applicationStartTime ");
    // console.log(form.get("isPaid"), " isPaid ");
    // console.log(form.get("opportunityName"), " opportunityName ");
    // console.log(form.get("opportunityPoster"), "opportunityPoster");
    // console.log(form.get("organisationLogo"), "organisationLogo");

    if (validation === true) {
      try {
        const response = await axios.post(`${API_URL}api/v1/hiring`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        });
        console.log(response);

        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202 ||
          response.status === 203 ||
          response.status === 204
        ) {
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
        setValidation(false);
        console.log(error);
      }
    }
  };
  const handleFileInputChange = (e) => {
    setCampusLogos(e.target.files);
  };
  const handleFileInputChangePoster = (e) => {
    setOpportunityPoster(e.target.files[0]);
  };
  const handleFileInputOrganizationPoster = (e) => {
    setOrganizationPoster(e.target.files[0]);
  };

  const handleSkillsChange = (_, value) => {
    setSkillsRequired(value);
  };

  const step1 = (
    <div>
      <TextField
        name="opportunityName"
        label="Opportunity Title*"
        variant="outlined"
        value={opportunityName}
        placeholder="Ex: Hiring for Software Developers, etc."
        onChange={(e) => setOpportunityName(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.opportunityName}
        helperText={errors.opportunityName}
        autoComplete="off"
      />

      {/* <TextField
        name="OpportunityPosition"
        label="Opportunity Position*"
        placeholder="Ex: Frontend Web Developer, etc."
        variant="outlined"
        value={OpportunityPosition}
        onChange={(e) => setOpportunityPosition(e.target.value)}
        // onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.OpportunityPosition}
        helperText={errors.OpportunityPosition}
        autoComplete="off"
      /> */}

      <TextField
        name="organisationName"
        label="Organisation Name*"
        variant="outlined"
        value={organisationName}
        placeholder="Type your Organisation name"
        onChange={(e) => setOrganisation(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.organisationName}
        helperText={errors.organisationName}
        autoComplete="off"
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
        <div>
          <input
            style={{
              border:
                errors.opportunityPoster !== ""
                  ? "1px solid #d32f2f"
                  : "1px solid #bdbdbd",
            }}
            type="file"
            id="opportunityPoster"
            className="inputHosting w-100"
            // value={opportunityPoster}
            onChange={handleFileInputChangePoster}
          />
        </div>
        {errors.opportunityPoster && (
          <p
            class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            {errors.opportunityPoster}
          </p>
        )}
      </div>

      <div className="position-relative  mt-3 mb-2">
        <label
          style={{
            color:
              errors.organisationLogo !== "" ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
          }}
          className="mui-copy-input-label"
          htmlFor="organisationLogo"
        >
          Organisation Logo*
        </label>
        <div>
          <input
            style={{
              border:
                errors.organisationLogo !== ""
                  ? "1px solid #d32f2f"
                  : "1px solid #bdbdbd",
            }}
            type="file"
            id="organisationLogo"
            className="inputHosting w-100"
            // value={organisationLogo}
            onChange={handleFileInputOrganizationPoster}
          />
        </div>
        {errors.organisationLogo && (
          <p
            class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
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
          Domain Name*
        </InputLabel>
        <Select
          labelId="Domain-name"
          id="student-signup-campus-select"
          value={domainName}
          label="Domain Name"
          name="domainName"
          // onChange={handleChange}
          onChange={(e) => setDomainName(e.target.value)}
          error={!!errors.domainName}
        >
          {domain.map((domains) => (
            <MenuItem key={domains} value={domains.domain}>
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
        label="Email*"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        name="mobileNo"
        label="Mobile Number*"
        variant="outlined"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.mobileNo}
        helperText={errors.mobileNo}
      />
      <TextField
        name="alternateMobileNo"
        label="Alternate Mobile Number"
        variant="outlined"
        value={alternateMobileNo}
        onChange={(e) => setAlterNetMobileNo(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.alternateMobileNo}
        helperText={errors.alternateMobileNo}
      />

      <div className="position-relative">
        <label
          style={{
            color:
              errors.applicationStartTime !== ""
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
            color:
              errors.applicationEndTime !== ""
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
        label="Description*"
        variant="outlined"
        value={description}
        placeholder="Description should be in 50 to 500 characters"
        multiline
        minRows={3}
        maxRows={6}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.isPaid}>
          Paid / Unpaid*
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={isPaid}
          label="Paid / Unpaid*"
          onChange={(e) => setIsPaid(e.target.value)}
        >
          <MenuItem value={0}>Unpaid</MenuItem>
          <MenuItem value={1}>Paid</MenuItem>
        </Select>
        <FormHelperText error={!!errors.isPaid}>{errors.isPaid}</FormHelperText>
      </FormControl>

      {!!isPaid && (
        <>
          <TextField
            name="minSalary"
            label="Minimum Salary*"
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
            label="Maximum Salary*"
            variant="outlined"
            placeholder="(in LPA)"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.maxSalary}
            helperText={errors.maxSalary}
          />
        </>
      )}

      <TextField
        name="experience"
        label="Experience*"
        variant="outlined"
        multiline
        minRows={3}
        maxRows={6}
        placeholder="Experience should be in 50 to 500 characters"
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
          value={skillsRequired}
          onChange={handleSkillsChange}
          renderInput={(params) => (
            <TextField margin="normal" {...params} label="Required Skills*" />
          )}
          error={!!errors.skillsRequired}
          helperText={errors.skillsRequired}
        />
      </div>

      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.opportunityMode}
        >
          Job Type*
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={opportunityMode}
          label="Job Type"
          onChange={(e) => setJobType(e.target.value)}
        >
          <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
          <MenuItem value={"Remote"}>Remote</MenuItem>
          <MenuItem value={"InOffice"}>InOffice</MenuItem>
        </Select>
        <FormHelperText error={!!errors.opportunityMode}>
          {errors.opportunityMode}
        </FormHelperText>
      </FormControl>

      {opportunityMode !== "Remote" && (
        <TextField
          name="opportunityLocation"
          label="Job Location*"
          variant="outlined"
          value={opportunityLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.opportunityLocation}
          helperText={errors.opportunityLocation}
        />
      )}

      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.opportunityTiming}
        >
          Job Timings
        </InputLabel>
        <Select
          labelId="event-type-label"
          id="event-type"
          value={opportunityTiming}
          label="Event Mode"
          onChange={(e) => setJobTiming(e.target.value)}
        >
          <MenuItem value={"Full Time"}>Full Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Contractual"}>Contractual</MenuItem>
        </Select>
        <FormHelperText error={!!errors.opportunityTiming}>
          {errors.opportunityTiming}
        </FormHelperText>
      </FormControl>
    </div>
  );
  const step5 = (
    <div>
      <TextField //make it number type here number of months
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

      {/* <TextField
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
      /> */}

      <TextField
        name="websiteUrl"
        label="Website Url*"
        variant="outlined"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.websiteUrl}
        helperText={errors.websiteUrl}
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
                  // type={`${step === 5 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {`${step === 5 ? "Submit" : "Next"}`}
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
