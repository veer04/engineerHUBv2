import "./Signup.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import {  Button } from "@mui/material";
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
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { Select, MenuItem } from "@mui/material";
import { API_URL } from "../../../services/APIUtils";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import HostEventTimeline from "../../../components/Timeline/HostEventTimeline";
// import { set } from "react-hook-form";
import {
  controller,
  getAllCountries,
  getCitiesByState,
  getStatesByCountry,
} from "../../../services/APIConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);
  
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [validation, setValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    // userName: '',
    email: "",
    organizationName: "",
    state: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    webSiteURL: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    name: "",
    // userName: '',
    email: "",
    organizationName: "",
    state: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
    getAllCountries(setCountries);
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
      organizationName: "",
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

    if (!formData.organizationName) {
      newErrors.organizationName = "organization name is required";
      valid = false;
    } 
 

   

    setErrors(newErrors);
    return valid;
  };



const validateInput2=()=>{
  let valid =true;
  const newErrors ={
    country:"",
    state:"",
    city:"",
  }

if(!formData.country)
{
  newErrors.country="country Name is required";
  valid =false;
}
if (!formData.state)
{
  newErrors.state="state name is required";
  valid =false;
}
if(!formData.city)
{
  newErrors.city="city name is required";
  valid =false;
}

  setErrors(newErrors);
  return valid;
}

  const validateInput3=()=>{

    let valid =true;
   const newErrors ={
      websiteURL:"",
      password:"",
      confirmPassword:"",
   }
   if(!formData.webSiteURL)
   {
    newErrors.websiteURL ="website URL is Required"
    valid =false;
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
  
    
  }
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
    if (validation===true) {
      setLoading(true);
      console.log(formData);

      axios.post(`${API_URL}api/v1/organization/signup`, formData).then(
        (response) => {


          // Cookies.set("access_token", response.data.accessToken);
          // const token = response.data.accessToken;
          // const decoded = jwt_decode(token);
          // console.log(decoded);
          // Cookies.set("refresh_token", response.data.refreshToken);
          // Cookies.set("userName", response.data.userName);
          Cookies.set("email", response.data.email);

          console.log(response);
          if(response.status===200 || 
            response.status===201 ||
             response.status===202 || 
             response.status===203 ||
              response.status===204)
          {
            setLoading(false);
            navigate("/otpverification");
            window.location.reload(true);
          }
        },
        (error) => 
        {
          setLoading(false);
          setValidation(false);
          alert(error.response.data.message);
          console.log(error);
        }
      );
    }
  }
  

  // return (
  //   <>
  //     <div className="Login">
  //       <div className="container">
  //         <div className="row">
            {/* <div className="col-lg-3 sideMenuLogin">
    <p className="sidemenuBarHeaderLogin">
        For Users

    </p>
    <div className="formSideMenuBar">
        <div className="sideMenuList">
        Registraions
        </div>
        <div className="sideMenuList">
        Watchlist
        </div>
        <div className="sideMenuList">
        Recently viewed
        </div>
        <div className="sideMenuList">
        Mentor Sessions
        </div>
        <div className="sideMenuList">
        Courses
        </div>
        <div className="sideMenuList">
        Liked domains
        </div>
        <div className="sideMenuList">
        Prizes/Rewards
        </div>
        <div className="sideMenuList">
       Notifications
        </div>
    </div>
    <p className="sidemenuBarHeaderLogin">
        For Organizations

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
       Manage Lists
        </div>
         <div className="sideMenuList">
       My Events
        </div> 

    </div>
    <p className="sidemenuBarHeaderLogin">
        For Mentors

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
      Mentor Profile
        </div>

    </div>
                </div> */}
            {/* <div className="col-lg-2"></div>
            <div className="col-lg-5">
              <div className="form-container">
              <HostEventTimeline step={step} numberOfCheckpoints={3} width="35rem" />

                <form action="/" method="POST" onSubmit={handleSubmit}> */}
                  const step1 = (
                    <div>
                      <TextField
                        name="name"
                        label="User Name"
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
                        name="organizationName"
                        label="Organization Name "
                        variant="outlined"
                        value={formData.organizationName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.organizationName}
                        helperText={errors.organizationName}
                      />

                      {/* <br />

                      <button
                        type="button"
                        onClick={handleNext1}
                        className="buttonOnHostingPage"
                      >
                        Next
                      </button> */}
                    </div>
                  )

              const step2 = (
                    <div>
                      {/* <TextField
                        name="branch"
                        label="branch Name"
                        variant="outlined"
                        value={formData.branch}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.branch}
                        helperText={errors.branch}
                      /> */}

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
{/* 
                      <br />
                      <button
                        type="button"
                        className="buttonOnHostingPage"
                        onClick={handlePrev}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="buttonOnHostingPage btnrightallign"
                        onClick={handleNext2}
                      >
                        Next
                      </button>
                      <br />
                      <br /> */}
                  
                    </div>
                  )


                  const step3 = (
                    <div>
                      <TextField
                        name="webSiteURL"
                        label="WebSite URL"
                        variant="outlined"
                        value={formData.webSiteURL}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.webSiteURL}
                        helperText={errors.webSiteURL}
                      />

                      {/* <Select
                        value={role}
                        fullWidth
                        className="mt-2"
                        onChange={handleChangeRole}
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select> */}

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

                      {/* <br />
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="buttonOnHostingPage"
                      >
                        Previous
                      </button>
                          
                      <button type="submit"
                         onClick={handleNext3}
                      className="buttonOnHostingPage btnrightallign">
                      {loading ? "Loading..." : "Submit"}
                      </button>
                      <br />
                      <br /> */}

                    </div>
                  )
                {/* </form>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </>
  ); */}
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
