import { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogHosting.css";
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
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../User/Login/CustomSnackbar";
import JoditEditor from "jodit-react";
import { getUserEmail } from "../../features/User/UserDetails";

const Example = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    };
  }, [placeholder]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

const BlogHosting = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState([]); //only to fetch data
  const [opportunityType, setOpportunityType] = useState("");
  const [isPaid, setIsPaid] = useState(1);
  const [description, setDescription] = useState("");
  const [mobileNo, setMobileNo] = useState(""); //change the type to Number
  const [alternateMobileNo, setAlterNetMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [amountCopy, setAmountCopy] = useState();
  const [amountInput, setAmountInput] = useState();
  const [experience, setExperience] = useState("");
  const [eligibility, setEligibility] = useState();
  const [opportunityLocation, setJobLocation] = useState("");
  const [opportunityMode, setJobType] = useState("Remote"); //enum Hybrid Remote InOffice
  const [opportunityTiming, setJobTiming] = useState(""); // enum Full Time, Part Time, Contractual
  const [duration, setDuration] = useState(""); //duration in months
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [applyLink, setApplyLink] = useState(""); //optional
  const [organisationName, setOrganisation] = useState("");
  const [opportunityPoster, setOpportunityPoster] = useState({});
  const [organisationLogo, setOrganizationPoster] = useState({});
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [applicationStartTime, setApplicationStartTime] = useState("");
  const [applicationEndTime, setApplicationEndTime] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [policy, setPolicy] = useState("");
  const [featuredArray, setFeaturedArray] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSpecialUser, setIsSpecialUser] = useState(false);
  const specialUserEmails = [
    {
      onlyForReference: "Email used by Ashish Soharia for Job Hosting",
      value: "career@engineerhub.in",
    },
    {
      onlyForReference:
        "Email used only for testing purpose. Delete this email after testing",
      value: "haboma6770@dotvilla.com",
    },
  ];
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
    opportunityName: "",
    organisationName: "",
    opportunityPoster: "",
    organisationLogo: "",
    domainName: "",
    mobileNo: "",
    alternateMobileNo: "",
    email: "",
    amount: "",
    opportunityMode: "",
    opportunityLocation: "",
    description: "",
    applicationStartTime: "",
    applicationEndTime: "",
    opportunityTiming: "",
    isPaid: "",
    policy: "",
    duration: "",
    websiteUrl: "",
    applyLink: "",
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
    getDomains(setDomain);
    setUserEmail(getUserEmail());
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    // check if the userEmail exist in specialUserEmails
    if (specialUserEmails.some((e) => e.value === userEmail)) {
      setIsSpecialUser(true);
    }
  }, [userEmail]);

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      opportunityName: "",
      opportunityPoster: "",
      organisationLogo: "",
    };
    function isImageFileName(fileName) {
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

    setErrors(newErrors);
    return valid;
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
    if (featuredArray.length !== 0) {
      form.append("featuredArray", featuredArray);
    }
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
    form.append("amount", amountCopy);
    form.append("isPaid", isPaid);
    form.append("eligibility", eligibility);
    if (checkUrl() === "Job") {
      form.append("experience", experience);
    }
    form.append("skillsRequired", skillsRequired);
    form.append("opportunityLocation", opportunityLocation);
    form.append("opportunityMode", opportunityMode);
    form.append("opportunityTiming", opportunityTiming);
    if (checkUrl() === "Internship") {
      form.append("duration", duration);
    }
    form.append("websiteUrl", websiteUrl);
    form.append("applyLink", applyLink);
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
    // console.log(form.get("amount"), " amountCopy ");
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

  const step1 = (
    <div>
      <TextField
        name="opportunityName"
        label="Opportunity Title*"
        variant="outlined"
        value={opportunityName}
        placeholder="Ex: Hiring for Software Developers, etc."
        onChange={(e) => setOpportunityName(e.target.value)}
        onBlur={(e) => setOpportunityName(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.opportunityName}
        helperText={errors.opportunityName}
        autoComplete="off"
      />
      <Example placeholder={"Yo type shit here"} />
    </div>
  );

  return (
    <>
      <main className="signup-page">
        <section className="details-container">
          <div className="details">
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step1}
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
                  type="submit"
                  className="button next-button"
                  disabled={isLoading}
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogHosting;
