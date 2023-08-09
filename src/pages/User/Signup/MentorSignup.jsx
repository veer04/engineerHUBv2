import "./StudentSignup.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [campuses, setCampuses] = useState([]);
  const [gender, setGender] = useState("");
  const [validation, setValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    getAllCampuses(setCampuses);
  }, []);

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
      instagram: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    currentProfile: "",
    batch: "",
    aboutMe: "",
    campus: "",
    gender: "",
    password: "",
    confirmPassword: "",
    socialMedia: {
      linkedIn: "",
      instagram: "",
    },
  });
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
      gender: "",
      aboutMe: "",
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
    if (!gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }
    if (formData.aboutMe && formData.aboutMe.length < 50) {
      newErrors.aboutMe = "About me should be of atleast 50 characters";
      valid = false;
    } else if (formData.aboutMe && formData.aboutMe.length > 1000) {
      newErrors.aboutMe = "About me should be of atmost 1000 characters";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      campus: "",
      batch: "",
      companyName: "",
      currentProfile: "",
    };
    if (!formData.campus) {
      newErrors.campus = "Campus is required";
      valid = false;
    }
    if (!formData.batch) {
      newErrors.batch = "Enter your passing year";
      valid = false;
    } else if (
      !/^(19[6-9][0-9]|20[0-4][0-9]|2050)-(19[6-9][0-9]|20[0-4][0-9]|2050)\s*$/.test(
        formData.batch
      )
    ) {
      newErrors.batch = "Batch must me like 2002-2004";
      valid = false;
    } else if (
      parseInt(formData.batch.split("-")[0]) >
      parseInt(formData.batch.split("-")[1])
    ) {
      newErrors.batch = "Batch must me like 2002-2004";
      valid = false;
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
      valid = false;
    } else if (formData.companyName.length < 3) {
      newErrors.companyName = "Company name should be of atleast 3 characters";
      valid = false;
    }
    if (!formData.currentProfile) {
      newErrors.currentProfile = "Current position is required";
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
        instagram: "",
      },
      password: "",
      confirmPassword: "",
    };
    if (
      formData.socialMedia.instagram &&
      !/^https:\/\//.test(formData.socialMedia.instagram)
    ) {
      newErrors.socialMedia.instagram = "URL must begin with https://";
      valid = false;
    }
    if (
      formData.socialMedia.linkedIn &&
      !/^https:\/\//.test(formData.socialMedia.linkedIn)
    ) {
      newErrors.socialMedia.linkedIn = "URL must begin with https://";
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
      gender: gender,
      aboutMe: formData.aboutMe,
      campus: formData.campus,
      batch: formData.batch,
      companyName: formData.companyName,
      currentProfile: formData.currentProfile,
      socialMedia: formData.socialMedia,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    if (validation === true) {
      setLoading(true);
      axios.post(`${API_URL}api/v1/alumni/signup`, data).then(
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
        required
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-gender-label"
          error={!!errors.gender}
          required
        >
          Gender
        </InputLabel>
        <Select
          labelId="gender"
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
      <TextField
        name="aboutMe"
        label="About Me"
        variant="outlined"
        placeholder="Write a brief about yourself"
        value={formData.aboutMe}
        multiline
        minRows={3}
        maxRows={6}
        onChange={handleChange}
        onBlur={(e) =>
          setFormData({ ...formData, aboutMe: e.target.value.trim() })
        }
        fullWidth
        margin="normal"
        error={!!errors.aboutMe}
        helperText={errors.aboutMe}
      />
    </div>
  );

  const step2 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.campus}
          required
        >
          Campus
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
        name="batch"
        label="Batch"
        variant="outlined"
        required
        value={formData.batch}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.batch}
        helperText={errors.batch}
      />
      <TextField
        name="companyName"
        label="Company Name"
        variant="outlined"
        value={formData.companyName}
        required
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.companyName}
        helperText={errors.companyName}
      />
      <TextField
        name="currentProfile"
        label="Current Position"
        variant="outlined"
        value={formData.currentProfile}
        required
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.currentProfile}
        helperText={errors.currentProfile}
      />
    </div>
  );

  const step3 = (
    <div>
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

export default MentorSignup;
