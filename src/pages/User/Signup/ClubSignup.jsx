import "./StudentSignup.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
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
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { Select, MenuItem } from "@mui/material";
import { API_URL } from "../../../services/APIUtils";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { controller, getAllCampuses } from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const ClubSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const roles = ["User", "Mentor", "Organization"];
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState(false);

  // useEffect(() => {
  //   // Fetch country data
  //   axios.get(`${API_URL}api/v1/getCountries`)
  //     .then(response => {
  //       setCountries(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching countries:', error);
  //     });
  // }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    getAllCampuses(setCampuses);

    return () => {
      controller.abort();
    };
  }, []);

  // const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    // userName: '',
    email: "",
    description: "",
    // collegeName: "",
    clubType: "",
    websiteUrl: "",

    collegeId: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    name: "",
    // userName: '',
    email: "",
    description: "",
    // collegeName: "",
    clubType: "",
    websiteUrl: "",

    collegeId: "",
    password: "",
    confirmPassword: "",
  });

  // const handleInputChange = (event) => {
  //   const inputValues = event.target.value.split(',');
  //   setSkills(inputValues);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
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
      // userName: '',
      email: "",
      // description: "",
      // websiteUrl: "",
      // contact: "",
      // collegeId: "",
      description: "",
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

    if (!formData.description) {
      newErrors.description = "description is required";
      valid = false;
    } else if (!/^(?=.*[a-zA-Z0-9\s]).{50,}$/.test(formData.description)) {
      newErrors.description = "must have a minimum of 50 characters";
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
    };
    if (!formData.clubType) {
      newErrors.clubType = "club Type is Required ";
      valid = false;
    } else if (!/^[A-Za-z0-9\s&'-]+$/.test(formData.clubType)) {
      newErrors.clubType = "Club Type should not have special characters";
      valid = false;
    }
    if (!formData.collegeId) {
      newErrors.collegeId = "College ID is required";
      valid = false;
    } else if (!/^[A-Za-z0-9\s&'-]+$/.test(!formData.collegeId)) {
      newErrors.collegeId = "College ID cannot have any special character";
      valid = false;
    }
    //  if(!formData.collegeName)
    //  {
    //    newErrors.collegeName="College Name is required";
    //    valid =false;
    //  }
    // else if(!/^[A-Za-z0-9\s&'-]+$/.test(!formData.collegeName))
    // {
    //  newErrors.collegeName="College Name cannot have any special character";
    //  valid=false;
    // }

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
      newErrors.websiteUrl = "website URL is Required";
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

  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };
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

      axios.post(`${API_URL}api/v1/club/signup`, formData).then(
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
            // window.location.reload(true);
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
        name="description"
        label="Description "
        variant="outlined"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
    </div>
  );

  const step2 = (
    <div>


{/* <TextField
        name="clubType"
        label="club Type"
        variant="outlined"
        value={formData.clubType}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.clubType}
        helperText={errors.clubType}
      /> */}
                    <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.clubType}
                          >
                            Club Type
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={formData.clubType}
                          label="club Type"
                          name="clubType"
                          onChange={handleChange}
                        >
                          <MenuItem value="Technical">Technical</MenuItem>
                          <MenuItem value="Cultural">Cultural</MenuItem>
                    
                        </Select>
                        <FormHelperText error={!!errors.clubType}>
                            {errors.clubType}
                          </FormHelperText>
                      </FormControl>
                      
      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.collegeId}>
          Campus Name
        </InputLabel>
        <Select
          labelId="campus-name"
          id="student-signup-campus-select"
          value={formData.institutionName}
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
    </div>
  );

  const step3 = (
    <div>
      <TextField
        name="websiteUrl"
        label="Website URL"
        variant="outlined"
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

export default ClubSignup;
