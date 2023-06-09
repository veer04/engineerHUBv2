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
// import jwt_decode from "jwt-decode";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
// import { set } from "react-hook-form";
import {
  controller,
  getAllBranches,
  getAllCampuses,
  getAllCountries,
  getCitiesByState,
  getStatesByCountry,
} from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StudentSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [validation, setValidation] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    branch: "",
    institutionName: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    // role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    branch: "",
    institutionName: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    getAllBranches(setBranches);
    getAllCountries(setCountries);
    getAllCampuses(setCampuses);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (countryParam) {
      getStatesByCountry(setStates, countryParam);
    }

    return () => {
      controller.abort();
    };
  }, [countryParam]);

  useEffect(() => {
    if (stateParam) {
      getCitiesByState(setCities, countryParam, stateParam);
    }

    return () => {
      controller.abort();
    };
  }, [stateParam]);

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
      branch: "",
      country: "",
      state: "",
      city: "",
    };

    if (!formData.branch) {
      newErrors.branch = "Branch is required";
      valid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
      valid = false;
    }
    if (!formData.state) {
      newErrors.state = "State is required";
      valid = false;
    }
    if (!formData.city) {
      newErrors.city = "city is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      institutionName: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.institutionName) {
      newErrors.state = "Institution Name is required";
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
        // errors.password = "Password must be at least 8 characters long.";
      }
      if (!/[A-Z]/.test(formData.password)) {
        allErrors.push(" 1 uppercase character");
        // errors.password =
        //   "Password must contain at least one uppercase character.";
      }
      if (!/[a-z]/.test(formData.password)) {
        allErrors.push(" 1 lowercase character");
        // errors.password =
        //   "Password must contain at least one lowercase character.";
      }
      if (!/\d/.test(formData.password)) {
        allErrors.push(" 1 numeric character");
        // errors.password = "Password must contain at least one numeric character.";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        allErrors.push(" 1 special character");
        // errors.password = "Password must contain at least one special character.";
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
    }
  }

  function handlePrev() {
    setStep(step - 1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (validation === true) {
      setLoading(true);
      console.log(formData);

      axios.post(`${API_URL}api/v1/user/signup`, formData).then(
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
        label="Full Name"
        variant="outlined"
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
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        name="mobile"
        label="Mobile No."
        variant="outlined"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.mobile}
        helperText={errors.mobile}
      />
    </div>
  );

  const step2 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-branch-label" error={!!errors.branch}>
          Branch
        </InputLabel>
        <Select
          labelId="branch-name"
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
        <InputLabel id="student-signup-country-label" error={!!errors.country}>
          Country
        </InputLabel>
        <Select
          labelId="country-name"
          id="student-signup-country-select"
          value={formData.country}
          label="Country"
          name="country"
          onChange={handleChange}
          error={!!errors.country}
        >
          {countries.map((country) => (
            <MenuItem
              onClick={() => setCountryParam(country.countryCode)}
              key={country.countryCode}
              value={country.country}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.country}>
          {errors.country}
        </FormHelperText>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-state-label"
          error={!!errors.state}
          disabled={states.length === 0}
        >
          State
        </InputLabel>
        <Select
          labelId="state-name"
          id="student-signup-state-select"
          value={formData.state}
          label="State"
          name="state"
          onChange={handleChange}
          error={!!errors.state}
          disabled={states.length === 0}
        >
          {states.map((state) => (
            <MenuItem
              onClick={() => setStateParam(state.stateCode)}
              key={state.stateCode}
              value={state.state}
            >
              {state.state}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.state}>{errors.state}</FormHelperText>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-city-label"
          error={!!errors.city}
          disabled={cities.length === 0}
        >
          City
        </InputLabel>
        <Select
          labelId="city-name"
          id="student-signup-city-select"
          value={formData.city}
          label="City"
          name="city"
          onChange={handleChange}
          error={!!errors.city}
          disabled={cities.length === 0}
        >
          {cities.map((city) => (
            <MenuItem key={city.city} value={city.city}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.city}>{errors.city}</FormHelperText>
      </FormControl>
    </div>
  );

  const step3 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.institutionName}
        >
          Institution Name
        </InputLabel>
        <Select
          labelId="campus-name"
          id="student-signup-campus-select"
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
          // helperText={errors.password}

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

export default StudentSignup;
