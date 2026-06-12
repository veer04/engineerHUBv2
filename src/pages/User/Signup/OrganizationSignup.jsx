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
import TimelineEmployer from "../../../components/Timeline/TimelineEmployer";
import { controller } from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import countryCodes from "../../../assets/countryCodes";
import jwt_decode from "jwt-decode";
import CustomSnackbar from "../Login/CustomSnackbar";

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Company Signup | engineerHUB";
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
  const [open, setOpen] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });

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
    if (!formData.email) {
      newErrors.email = "Work email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (linkedIn && !/^https:\/\//.test(linkedIn)) {
      newErrors.linkedIn = "LinkedIn URL must begin with https://";
      valid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Contact number is required";
      valid = false;
    } else if (!/^[0-9]+$/.test(formData.mobile)) {
      newErrors.mobile =
        "Contact number should only contain digits (0-9)";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Contact number must be exactly 10 digits";
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
      password: "",
      confirmPassword: "",
    };

    if (!formData.organizationName) {
      newErrors.organizationName = "Company name is required";
      valid = false;
    } else if (formData.organizationName.trim().length < 3) {
      newErrors.organizationName = "Company name must be at least 3 characters";
      valid = false;
    }
    if (!formData.webSiteURL) {
      newErrors.webSiteURL = "Website URL is required";
      valid = false;
    } else if (!/^https:\/\//.test(formData.webSiteURL)) {
      newErrors.webSiteURL = "Website URL must begin with https://";
      valid = false;
    }

    // Password validation (from validateInput3)
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
      if (validateInput2()) {
        setValidation(true);
        sessionStorage.setItem("OtpRoute", "true");
      }
    }
  }

  function handlePrev() {
    setStep(step - 1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.organizationName, // Backend expects 'name' for organization name
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      websiteUrl: formData.webSiteURL,
      linkedIn: linkedIn,
      mobile: formData.mobile,
      mobileCountryCode: mobileCountryCode,
      contactName: contactName,
      hiringFor: hiringFor,
    };

    if (validation === true) {
      setLoading(true);
      console.log(formData);

      axios.post(`${API_URL}api/v1/organization/signup`, data).then(
        (response) => {
          console.log(response);
          
          // Check if account is already verified (auto-login case)
          if (response.data.alreadyVerified && response.data.accessToken) {
            // Account already exists and is verified - auto login
            const token = response.data.accessToken;
            const decoded = jwt_decode(token);
            
            // Set all cookies for logged-in user
            Cookies.set("access_token", response.data.accessToken, { expires: 400 });
            Cookies.set("refresh_token", response.data.refreshToken, { expires: 400 });
            Cookies.set("email", response.data.email, { expires: 400 });
            Cookies.set("role", decoded.role, { expires: 400 });
            Cookies.set("name", response.data.name, { expires: 400 });
            Cookies.set("userName", response.data.userName, { expires: 400 });
            Cookies.set("isVerified", "true", { expires: 400 });
            Cookies.set("verifiedByEhub", decoded.verifiedByEhub, { expires: 400 });
            Cookies.set("mobile", decoded.mobile, { expires: 400 });
            Cookies.set("_id", decoded._id, { expires: 400 });
            Cookies.set("image", decoded.image, { expires: 400 });
            Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain || {}), { expires: 400 });
            
            setLoading(false);
            setSnackbarValues({
              severity: "success",
              message: "Account already exists and is verified. You have been logged in successfully!",
            });
            setOpen(true);
            setTimeout(() => {
              navigate("/");
              window.location.reload(true);
            }, 1500);
            return;
          }
          
          // Normal signup flow - OTP verification needed
          Cookies.set("email", response.data.email, { expires: 1 / 24 / 4 });
          Cookies.set("role", "Organization", { expires: 1 / 24 / 4 });

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
          
          // Handle different error types with user-friendly messages
          let errorMessage = "An error occurred during signup. Please try again.";
          
          if (error.response) {
            // Server responded with error
            const status = error.response.status;
            const message = error.response.data?.message || error.response.data?.err;
            const conflictField = error.response.data?.conflictField;
            
            if (status === 409) {
              // Conflict - account already exists
              if (conflictField === "email") {
                errorMessage = message || "An account with this email already exists. Please use a different email or login.";
              } else if (conflictField === "mobile") {
                errorMessage = message || "An account with this contact number already exists. Please use a different contact number.";
              } else {
                errorMessage = message || "An account with these credentials already exists. Please login or use different credentials.";
              }
            } else if (status === 400) {
              // Bad request - validation errors
              errorMessage = message || "Please check your input and ensure all required fields are filled correctly.";
            } else if (status === 500) {
              // Server error
              errorMessage = "Server error. Please try again later.";
            } else {
              errorMessage = message || errorMessage;
            }
          } else if (error.request) {
            // Request made but no response
            errorMessage = "Network error. Please check your internet connection and try again.";
          }
          
          setSnackbarValues({
            severity: "error",
            message: errorMessage,
          });
          setOpen(true);
          console.error("Signup error:", error);
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
        required
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

      {/* Password Fields from step3 */}
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
        <section className="details-container signup-details-frame">
          <div className="signup-header">
            <h2 className="signup-heading" style={{
                  color: "#0a3f51",
                  padding: "0px 0px 10px 0px",
                  fontWeight: "700",
                  textAlign: "center",
              
                }}>Employer Signup</h2>
          </div>
          <div className="details">
            <TimelineEmployer
              step={step}
              numberOfCheckpoints={2} // <-- set this to 2
              width="85%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
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
                >
                  {`${step === 2 ? "Submit" : "Next"}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <CustomSnackbar
        setOpen={() => setOpen(false)}
        open={open}
        message={snackbarValues.message}
        severity={snackbarValues.severity}
        duration={4000}
      />
    </>
  );
};

export default OrganizationSignup;
