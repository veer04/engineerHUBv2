import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import "../../Hosting/EventRegistration.css";
import useNavbar from "../../../hooks/use-navbar";
import { Select, MenuItem } from "@mui/material";
import { API_URL } from "../../../services/APIUtils";
import Cookies from "js-cookie";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
import { controller } from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import countryCodes from "../../../assets/countryCodes";

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const [mobileCountryCode, setMobileCountryCode] = useState("91");
  const [hiringFor, setHiringFor] = useState("Full Time");
  const [contactName, setContactName] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [validation, setValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organizationName: "",
    state: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    webSiteURL: "",
    mobile: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    hiringFor: "",
    linkedIn: "",
    contactName: "",
    webSiteURL: "",
    name: "",
    mobile: "",
    email: "",
    organizationName: "",
    state: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const hiringForList = [
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "Intern",
      label: "Intern",
    },
    {
      value: "Part Time/Project Basis",
      label: "Part Time/Project Basis",
    },
    {
      value: "Event Based Hiring/Hackathons",
      label: "Event Based Hiring/Hackathons",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    return () => {
      controller.abort();
    };
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      contactName: "",
      email: "",
      linkedIn: "",
      mobile: "",
    };

    if (!contactName) {
      newErrors.contactName = "Name is required";
      valid = false;
    }
    if (!formData.email && !linkedIn) {
      newErrors.email = "Either email or linkedIn is required";
      newErrors.linkedIn = "Either email or linkedIn is required";
      valid = false;
    } else {
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
      if (linkedIn && !/^https:\/\//.test(linkedIn)) {
        newErrors.linkedIn = "URL must begin with https://";
        valid = false;
      }
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^[0-9]+$/.test(formData.mobile)) {
      newErrors.mobile =
        "Mobile number should not contain any special characters or letter";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number should be of 10 digits";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      organizationName: "",
      webSiteURL: "",
    };

    if (!formData.organizationName) {
      newErrors.organizationName = "Company name is required";
      valid = false;
    }
    if (!formData.webSiteURL) {
      newErrors.webSiteURL = "Website URL is Required";
      valid = false;
    } else if (!/^https:\/\//.test(formData.webSiteURL)) {
      newErrors.webSiteURL = "URL must begin with https://";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "Password must contain at least";
      let allErrors = [];
      if (formData.password.length < 8) {
        allErrors.push(" 8 characters");
      }
      if (!/[A-Z]/.test(formData.password)) {
        allErrors.push(" 1 uppercase character");
      }
      if (!/[a-z]/.test(formData.password)) {
        allErrors.push(" 1 lowercase character");
      }
      if (!/\d/.test(formData.password)) {
        allErrors.push(" 1 numeric character");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        allErrors.push(" 1 special character");
      }
      if (allErrors.length > 0) {
        newErrors.password += allErrors.join(",");
        newErrors.password += ".";
        valid = false;
      } else {
        newErrors.password = "";
      }
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Password and Confirm Password does not match";
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
      if (validateInput3()) setValidation(true);
      {
        localStorage.setItem("OtpRoute", "true");
      }
    }
  }

  function handlePrev() {
    setStep(step - 1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: contactName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      organizationName: formData.organizationName,
      websiteUrl: formData.webSiteURL,
      linkedIn: linkedIn,
      mobile: formData.mobile,
      contactName: contactName,
      hiringFor: hiringFor,
    };

    if (validation === true) {
      setLoading(true);
      console.log(formData);

      axios.post(`${API_URL}api/v1/organization/signup`, data).then(
        (response) => {
          Cookies.set("email", response.data.email);

          console.log(response);
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202 ||
            response.status === 203 ||
            response.status === 204
          ) {
            setLoading(false);
            navigate("/otp-verification");
            window.location.reload(true);
          }
        },
        (error) => {
          setLoading(false);
          setValidation(false);
          alert(error.response.data.message);
          console.log(error);
        }
      );
    }
  };
  const step1 = (
    <div>
      <TextField
        name="contactName"
        label="Your Name"
        variant="outlined"
        placeholder="Enter your name"
        required
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        onBlur={(e) => setContactName(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.contactName}
        helperText={errors.contactName}
      />

      <TextField
        name="email"
        label="Work Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        name="linkedIn"
        label="Linkedin Profile Link"
        variant="outlined"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
        onBlur={(e) => setLinkedIn(e.target.value.trim())}
        fullWidth
        margin="normal"
        error={!!errors.linkedIn}
        helperText={errors.linkedIn}
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
              <MenuItem
                key={countryCode}
                value={countryCode}
              >{`+${countryCode}`}</MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.mobileCountryCode}>
            {errors.mobileCountryCode}
          </FormHelperText>
        </FormControl>
        <TextField
          name="mobile"
          label="Contact Number"
          variant="outlined"
          placeholder="Enter your Contact Number"
          required
          value={formData.mobile}
          onChange={handleChange}
          onBlur={(e) =>
            setFormData({ ...formData, mobile: e.target.value.trim() })
          }
          fullWidth
          margin="normal"
          error={!!errors.mobile}
          helperText={errors.mobile}
        />
      </div>
    </div>
  );

  const step2 = (
    <div>
      <TextField
        name="organizationName"
        label="Company Name "
        variant="outlined"
        placeholder="Enter your Company/Startup/Idea Name"
        required
        value={formData.organizationName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.organizationName}
        helperText={errors.organizationName}
      />
      <TextField
        name="webSiteURL"
        label="Website URL"
        variant="outlined"
        placeholder="Enter your Website URL"
        required
        value={formData.webSiteURL}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.webSiteURL}
        helperText={errors.webSiteURL}
      />
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="company-signup-hiring-label"
          error={!!errors.hiringFor}
          required
        >
          Hiring For
        </InputLabel>
        <Select
          labelid="year"
          id="student-signup-year-select"
          value={hiringFor}
          label="Hiring For"
          name="year"
          onChange={(e) => setHiringFor(e.target.value)}
          error={!!errors.hiringFor}
        >
          {hiringForList.map((hiringType) => (
            <MenuItem key={hiringType.value} value={hiringType.value}>
              {hiringType.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.hiringType}>
          {errors.hiringType}
        </FormHelperText>
      </FormControl>
    </div>
  );

  const step3 = (
    <div>
      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel
          htmlFor="student-signup-outlined-adornment-password"
          error={!!errors.password}
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="student-signup-outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText error={!!errors.password}>
          {errors.password}
        </FormHelperText>
      </FormControl>

      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel
          htmlFor="student-signup-outlined-adornment-confirm-password"
          error={!!errors.confirmPassword}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="student-signup-outlined-adornment-confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        <FormHelperText error={!!errors.confirmPassword}>
          {errors.confirmPassword}
        </FormHelperText>
      </FormControl>
    </div>
  );
  return (
    <>
      <main className="signup-page">
        <section className="details-container">
          <div className="details">
            <HostEventTimeline
              step={step}
              numberOfCheckpoints={3}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}
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
                  type={`${step === 3 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {`${step === 3 ? "Submit" : "Next"}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrganizationSignup;
