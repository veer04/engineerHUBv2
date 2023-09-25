import "./StudentSignup.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../Hosting/EventRegistration.css";
import useNavbar from "../../../hooks/use-navbar";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { API_URL } from "../../../services/APIUtils";
import Cookies from "js-cookie";

import { controller, getAllCampuses } from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
import countryCodes from "../../../assets/countryCodes";

const ClubSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const [mobileCountryCode, setMobileCountryCode] = useState("91");
  const [campuses, setCampuses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    getAllCampuses(setCampuses);

    return () => {
      controller.abort();
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    clubType: "",
    websiteUrl: "",
    mobile: "",
    collegeId: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    description: "",
    mobile: "",
    clubType: "",
    websiteUrl: "",
    collegeId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      mobile: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile Number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile Number should be of 10 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      clubType: "",
      collegeId: "",
      description: "",
    };
    if (!formData.clubType) {
      newErrors.clubType = "Club Type is Required ";
      valid = false;
    } else if (!/^[A-Za-z0-9\s&'-]+$/.test(formData.clubType)) {
      newErrors.clubType = "Club Type should not have special characters";
      valid = false;
    }
    if (!formData.collegeId) {
      newErrors.collegeId = "College Name is required";
      valid = false;
    } else if (!/^[A-Za-z0-9\s&'-]+$/.test(!formData.collegeId)) {
      newErrors.collegeId = "College Name cannot have any special character";
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      valid = false;
    } else if (formData.description.length < 50) {
      newErrors.description =
        "Description should have a minimum of 50 characters";
      valid = false;
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description should not exceed 1000 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      websiteUrl: "",
      password: "",
      confirmPassword: "",
    };
    if (!formData.websiteUrl) {
      newErrors.websiteUrl = "Website URL is Required";
      valid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.websiteUrl)) {
      newErrors.websiteUrl =
        "Invalid URL format. Link should be like https://www.engineerhub.in/";
      valid = false;
    }

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
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      clubType: formData.clubType,
      collegeId: formData.collegeId,
      aboutUs: formData.description,
      websiteUrl: formData.websiteUrl,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (validation === true) {
      setLoading(true);

      axios.post(`${API_URL}api/v1/club/signup`, data).then(
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
            navigate("/otpverification");
            window.location.reload(true);
          }
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert(error.response.data.message);
          setValidation(false);
        }
      );
    }
  };

  const step1 = (
    <div>
      <TextField
        name="name"
        label="Club Name"
        variant="outlined"
        placeholder="Enter your Club Name"
        required
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        name="email"
        label="Club Email"
        variant="outlined"
        placeholder="Enter your Club Email"
        required
        value={formData.email}
        onChange={handleChange}
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
          label="Club Representative Contact No."
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
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.collegeId}
          required
        >
          Campus Name
        </InputLabel>
        <Select
          labelid="campus-name"
          id="student-signup-campus-select"
          value={formData.collegeId}
          label="Campus Name"
          name="collegeId"
          onChange={handleChange}
          error={!!errors.collegeId}
        >
          {campuses.map((campus) => (
            <MenuItem key={campus._id} value={campus._id}>
              {campus.collegeName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.collegeId}>
          {errors.collegeId}
        </FormHelperText>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.clubType}
          required
        >
          Club Type
        </InputLabel>
        <Select
          labelid="event-type-label"
          id="event-type"
          value={formData.clubType}
          label="club Type"
          name="clubType"
          onChange={handleChange}
          error={!!errors.clubType}
        >
          <MenuItem value="Technical">Technical</MenuItem>
          <MenuItem value="Cultural">Cultural</MenuItem>
        </Select>
        <FormHelperText error={!!errors.clubType}>
          {errors.clubType}
        </FormHelperText>
      </FormControl>
      <TextField
        name="description"
        label="About the Club"
        variant="outlined"
        placeholder="Write a brief about your Club"
        required
        value={formData.description}
        multiline
        minRows={3}
        maxRows={6}
        onChange={handleChange}
        onBlur={(e) =>
          setFormData({ ...formData, description: e.target.value.trim() })
        }
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
    </div>
  );

  const step3 = (
    <div>
      <TextField
        name="websiteUrl"
        label="Website URL"
        variant="outlined"
        required
        value={formData.websiteUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.websiteUrl}
        helperText={errors.websiteUrl}
      />

      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel
          htmlFor="student-signup-outlined-adornment-password"
          error={!!errors.password}
          required
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
          required
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

export default ClubSignup;
