import "./StudentSignup.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "../../Hosting/EventRegistration.css";
import useNavbar from "../../../hooks/use-navbar";
import { Select, MenuItem } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { API_URL } from "../../../services/APIUtils";
import Cookies from "js-cookie";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
import CustomSnackbar from "../Login/CustomSnackbar";
import { controller, getAllCampuses } from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const MentorSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  // const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [campuses, setCampuses] = useState([]);
  const [validation, setValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    getAllCampuses(setCampuses);
  }, []);

  //   const roles = ["User", "Mentor", "Organization"];
  //   const [countries, setCountries] = useState([]);
  //   const [states, setStates] = useState([]);
  //   const [cities, setCities] = useState([]);

  //   useEffect(() => {
  //     // Fetch campus data
  //     axios.get(`${API_URL}api/v1/getCountries`)
  //       .then(response => {
  //         setCountries(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching countries:', error);
  //       });
  //   }, []);

  //   const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    currentProfile: "",
    batch: "",
    aboutMe: "",
    campus: "",
    password: "",
    confirmPassword: "",
    socialMedia: {
      linkedIn: "",
      twitter: "",
      instagram: "",
    },
  });
  const [step, setStep] = useState(1);
  // useEffect(() => {
  //   fetchCampuses();
  // }, []);

  // const fetchCampuses = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}api/v1/campus`);
  //     const data = await response.json();
  //     setCampuses(data);
  //   } catch (error) {
  //     console.error('Error fetching campuses:', error);
  //   }
  // };

  const [errors, setErrors] = useState({
    name: "",
    // userName: '',
    email: "",
    mobile: "",
    companyName: "",
    currentProfile: "",
    batch: "",
    aboutMe: "",
    campus: "",
    password: "",
    confirmPassword: "",
    socialMedia: {
      linkedIn: "",
      twitter: "",
      instagram: "",
    },
  });

  // const handleInputChange = (event) => {
  //   const inputValues = event.target.value.split(',');
  //   setSkills(inputValues);
  // };
  const handleChange = (e) => {
    // const campusId = event.target.value;
    const { name, value } = e.target;
    // setSelectedCampus(campusId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //  const handleChangeDrop =(event)=>{
  //   setRole(event.target.value);
  //  }

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
      companyName: "",
      currentProfile: "",
      campus: "",
    };
    if (!formData.campus) {
      newErrors.campus = "campus is required";
      valid = false;
    }
    if (!formData.companyName) {
      newErrors.companyName = "company name is required";
      valid = false;
    }
    if (!formData.currentProfile) {
      newErrors.currentProfile = "current profile is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      socialMedia: {
        linkedIn: "",
        twitter: "",
        instagram: "",
      },
    };
    if (!formData.socialMedia.instagram) {
      newErrors.socialMedia.instagram = "Instagram URL is required";
      valid = false;
    } else if (!/^https:\/\//.test(formData.socialMedia.instagram)) {
      newErrors.socialMedia.instagram = "URL must begin with https";
    }
    if (!formData.socialMedia.linkedIn) {
      newErrors.socialMedia.linkedIn = "LinkedIn URL is required";
      valid = false;
    } else if (
      !/^https:\/\/www\.linkedin\.com$/.test(formData.socialMedia.linkedIn)
    ) {
      newErrors.socialMedia.linkedIn =
        "URL must begin with https://www.linkedin.com";
    }

    if (!formData.socialMedia.twitter) {
      newErrors.socialMedia.twitter = "twitter URL is required";
      valid = false;
    } else if (!/^https:\/\//.test(formData.socialMedia.twitter)) {
      newErrors.socialMedia.twitter = "URL must begin with https";
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput4 = () => {
    let valid = true;
    const newErrors = {
      batch: "",
      password: "",
      confirmPassword: "",
    };
    if (!formData.batch) {
      newErrors.batch = "Enter your Passout year";
      valid = false;
    } else if (
      !/^(19[6-9][0-9]|20[0-2][0-9]|2030)-(19[6-9][0-9]|20[0-2][0-9]|2030)\s*$/.test(
        formData.batch
      )
    ) {
      newErrors.batch = "Batch must me like 2002-2004";
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
      if (validateInput3()) setStep(step + 1);
    }

    if (step === 4) {
      if (validateInput4()) setValidation(true);
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
    // console.log(formData);
    if (validation === true) {
      setLoading(true);
      console.log(formData);

      axios.post(`${API_URL}api/v1/alumni/signup`, formData).then(
        (response) => {
          // Cookies.set("access_token", response.data.accessToken);
          // const token = response.data.accessToken;
          // const decoded = jwt_decode(token);
          // console.log(decoded);
          // Cookies.set("refresh_token", response.data.refreshToken);
          // Cookies.set("userName", response.data.userName);
          // Cookies.set("batch", response.data.batch);
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
            setOpen(true);
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

  const handleChangeArraydata = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMedia: {
        ...prevData.socialMedia,
        [name]: value,
      },
    }));
  };

  const step1 = (
    <div>
      <TextField
        name="name"
        label="Name"
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
      <TextField
        name="currentProfile"
        label="Current Profile Name"
        variant="outlined"
        value={formData.currentProfile}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.currentProfile}
        helperText={errors.currentProfile}
      />

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.campus}>
          campus{" "}
        </InputLabel>
        <Select
          labelId="campus-name"
          id="student-signup-campus-select"
          value={formData.campus}
          label="Campus"
          name="campus"
          onChange={handleChange}
          error={!!errors.campus}
        >
          {campuses.map((campus) => (
            <MenuItem key={campus._id} value={campus._id}>
              {campus.collegeName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.campus}>{errors.campus}</FormHelperText>
      </FormControl>

      <TextField
        name="companyName"
        label="Company Name"
        variant="outlined"
        value={formData.companyName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.companyName}
        helperText={errors.companyName}
      />
      <TextField
        name="aboutMe"
        label="About Me"
        variant="outlined"
        value={formData.aboutMe}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.aboutMe}
        helperText={errors.aboutMe}
      />
    </div>
  );

  const step3 = (
    <div>
      <TextField
        name="instagram"
        label="Instagram"
        variant="outlined"
        value={formData.socialMedia.instagram}
        onChange={handleChangeArraydata}
        fullWidth
        margin="normal"
        error={!!errors.socialMedia?.instagram}
        helperText={errors.socialMedia?.instagram}
      />

      <TextField
        name="linkedIn"
        label="LinkedIn"
        variant="outlined"
        value={formData.socialMedia.linkedIn}
        onChange={handleChangeArraydata}
        fullWidth
        margin="normal"
        error={!!errors.socialMedia?.linkedIn}
        helperText={errors.socialMedia?.linkedIn}
      />
      <TextField
        name="twitter"
        label="Twitter"
        variant="outlined"
        value={formData.socialMedia.twitter}
        onChange={handleChangeArraydata}
        fullWidth
        margin="normal"
        error={!!errors.socialMedia?.twitter}
        helperText={errors.socialMedia?.twitter}
      />
    </div>
  );

  const step4 = (
    <div>
      <TextField
        name="batch"
        label="Batch"
        variant="outlined"
        value={formData.batch}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.batch}
        helperText={errors.batch}
      />

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
              numberOfCheckpoints={4}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}
              {step === 4 && step4}
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
                  type={`${step === 4 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {`${step === 4 ? "Submit" : "Next"}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default MentorSignup;
