import "./StudentSignup.css";
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
import {
  controller,
  getAllBranches,
  getAllCampuses,
  getAllCountries,
  getCitiesByState,
  getStatesByCountry,
} from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import countryCodes from "../../../assets/countryCodes";

const StudentSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [validation, setValidation] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileCountryCode, setMobileCountryCode] = useState("91");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    institutionName: "",
    branch: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    mobileCountryCode: "",
    name: "",
    email: "",
    mobile: "",
    state: "",
    branch: "",
    year: "",
    gender: "",
    institutionName: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const yearList = [
    {
      value: 1,
      label: "1st Year",
    },
    {
      value: 2,
      label: "2nd Year",
    },

    {
      value: 3,
      label: "3rd Year",
    },
    {
      value: 4,
      label: "4th Year",
    },
    {
      value: 5,
      label: "5th Year",
    },
  ];
  // "Male", "Female", "Non-Binary", "Prefer not to say"
  const genderList = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Non-Binary",
      label: "Non-Binary",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    getAllBranches(setBranches);
    getAllCampuses(setCampuses);

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
      name: "",
      email: "",
      mobile: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name =
        "Name should not contain any special characters or numbers";
      valid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name should be of atleast 3 characters";
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
      institutionName: "",
      branch: "",
      year: "",
    };

    if (!formData.institutionName) {
      newErrors.institutionName = "Institution Name is required";
      valid = false;
    }
    if (!formData.branch) {
      newErrors.branch = "Branch is required";
      valid = false;
    }
    if (!year) {
      newErrors.year = "Year is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      gender: "",
      password: "",
      confirmPassword: "",
    };

    if (!gender) {
      newErrors.gender = "Gender is required";
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
      sessionStorage.setItem("OtpRoute", "true");
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
      mobileCountryCode: mobileCountryCode,
      mobile: formData.mobile,
      institutionName: formData.institutionName,
      branch: formData.branch,
      year: year,
      gender: gender,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    if (validation === true) {
      setLoading(true);
      axios.post(`${API_URL}api/v1/user/signup`, data).then(
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
            navigate("/otp-verification", { replace: true });
            window.location.reload(true);
          }
        },
        (error) => {
          console.log(formData);
          setLoading(false);
          alert(error.response.data.message);
          setValidation(false);
          console.log(error);
        }
      );
    }
  };

  const step1 = (
    <div>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        placeholder="Enter your Full Name"
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
        label="Email"
        variant="outlined"
        placeholder="Enter your Email ID"
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
          label="Mobile No"
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
          error={!!errors.institutionName}
          required
        >
          Institution Name
        </InputLabel>
        <Select
          labelid="campus-name"
          id="student-signup-campus-select"
          required
          value={formData.institutionName}
          label="Institution Name"
          name="institutionName"
          onChange={handleChange}
          error={!!errors.institutionName}
        >
          {campuses.map((campus) => (
            <MenuItem key={campus._id} value={campus._id}>
              {campus.collegeName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.institutionName}>
          {errors.institutionName}
        </FormHelperText>
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-branch-label"
          error={!!errors.branch}
          required
        >
          Branch
        </InputLabel>
        <Select
          labelid="branch-name"
          id="student-signup-branch-select"
          value={formData.branch}
          label="Branch"
          name="branch"
          onChange={handleChange}
          error={!!errors.branch}
        >
          {branches.map((branch) => (
            <MenuItem key={branch} value={branch}>
              {branch}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.branch}>{errors.branch}</FormHelperText>
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-year-label"
          error={!!errors.branch}
          required
        >
          Year
        </InputLabel>
        <Select
          labelid="year"
          id="student-signup-year-select"
          value={year}
          label="Year"
          name="year"
          onChange={(e) => setYear(e.target.value)}
          error={!!errors.year}
        >
          {yearList.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.year}>{errors.year}</FormHelperText>
      </FormControl>
    </div>
  );

  const step3 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-gender-label"
          error={!!errors.branch}
          required
        >
          Gender
        </InputLabel>
        <Select
          labelid="gender"
          id="student-signup-gender-select"
          value={gender}
          label="Gender"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
          error={!!errors.gender}
        >
          {genderList.map((gender) => (
            <MenuItem key={gender.value} value={gender.value}>
              {gender.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.gender}>{errors.gender}</FormHelperText>
      </FormControl>

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

export default StudentSignup;
