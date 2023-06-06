import "./Signup.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
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
import {FormControl, InputLabel } from '@mui/material';
import CustomSnackbar from "../Login/CustomSnackbar";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const MentorSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
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
        linkedIn: '',
        twitter: '',
        instagram: '',
      }

  });
  const [step, setStep] = useState(1);
  useEffect(() => {
    fetchCampuses();
  }, []);


  const fetchCampuses = async () => {
    try {
      const response = await fetch(`${API_URL}api/v1/campus`);
      const data = await response.json();
      setCampuses(data);
    } catch (error) {
      console.error('Error fetching campuses:', error);
    }
  };

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
        linkedIn: '',
        twitter: '',
        instagram: '',
      }
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

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      name: "",
      // userName: '',
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
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
      valid = false;
    }
  

    setErrors(newErrors);
    return valid;
  };
 const validateInput2 =()=>{
let valid =true;

const newErrors ={
  companyName: "",
  currentProfile: "",
  campus: "",
  
}
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
 }

 const validateInput3 =()=>{

  let valid =true;
  const newErrors={
    socialMedia: {
      linkedIn: '',
      twitter: '',
      instagram: '',
    }
  }
if(!formData.socialMedia.instagram)
{
  newErrors.socialMedia.instagram="Instagram URL is required"
  valid =false;
}
else if (!/^https:\/\//.test(formData.socialMedia.instagram))
{
  newErrors.socialMedia.instagram="URL must begin with https"
}
if(!formData.socialMedia.linkedIn)
{
  newErrors.socialMedia.linkedIn="LinkedIn URL is required"
  valid =false;
}
else if (!/^https:\/\//.test(formData.socialMedia.linkedIn))
{
  newErrors.socialMedia.linkedIn="URL must begin with https"
}

if(!formData.socialMedia.twitter)
{
  newErrors.socialMedia.twitter="twitter URL is required"
  valid =false;
}
else if (!/^https:\/\//.test(formData.socialMedia.twitter))
{
  newErrors.socialMedia.twitter="URL must begin with https"
}

  setErrors(newErrors);
  return valid;
 }


 const validateInput4 =()=>{

  let valid = true;
   const newErrors={
    batch:"",
    password:"",
    confirmPassword:"",
  }
  if(!formData.batch)
  {
    newErrors.batch="Enter your Passout year";
    valid=false;
  }
  else if (!/^(19[5-9]\d|20[0-2]\d|2030)$/.test(formData.batch))
  {
    newErrors.batch ="Batch must me like 2002";
    valid =false;
  }


  if (!formData.password) {
    newErrors.password = "password is required";
    valid = false;
  }
  if (formData.password.length < 8) {
    newErrors.password ="password must be of 8 digits"
    valid = false;
  }
  if (!/[A-Z]/.test(formData.password)) {
    
    newErrors.password =
      "Password must contain at least one uppercase character.";
      valid = false;
  }


  if (!/[a-z]/.test(formData.password)) {
    // allErrors.push(" 1 lowercase character");
    newErrors.password =
      "Password must contain at least one lowercase character.";
      valid = false;
  }
  if (!/\d/.test(formData.password)) {
    // allErrors.push(" 1 numeric character");
    newErrors.password = "Password must contain at least one numeric character.";
    valid = false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    // allErrors.push(" 1 special character");
    newErrors.password = "Password must contain at least one special character.";
    valid = false;
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
    valid = false;
  }
  if(formData.password!== formData.confirmPassword)
  {
    newErrors.confirmPassword="match the password";
    valid = false;
  }


setErrors(newErrors);
return valid;
 }

  const handleNext1 = () => {
    if(validateInput1())
      setStep(step+1);
  };
  const handleNext2 = () => {
    // if(validateInput2())
     setStep(step+1);
};
const handleNext3 = () => {
    // if(validateInput3())
     setStep(step+1);
};

const handleNext4 =()=>{
  if(validateInput4())
  setStep(step+1);
}

  const handlePrev = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!validateInput()) {
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
          if(response.status===200 || response.status===201 || response.status===202 || response.status===203 || response.status===204)
          {
            setLoading(false);
            navigate("/otpverification");
            setOpen(true);
            // window.location.reload(true);
          }
        },
        (error) => {
          setLoading(false);
          if (err && err instanceof AxiosError)
          setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message);
        setOpen(true);

          console.log(error);
        }
      );
    }
  }
  
  
//   ;  const handlecampusChange = event => {
//     const campusCode = event.target.value;
    
//     // Fetch state data based on selected campus
//     axios.get(`${API_URL}api/v1/getStates/{campusCode}`)
//       .then(response => {
//         setStates(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching states:', error);
//       });
//   };

//     const handleStateChange = event => {
//     const campusCode = event.target.value; // Get the selected campus code
//     const stateCode = event.target.value; // Get the selected state code
//     axios.get(`${API_URL}api/v1/getCities/${campusCode}/${stateCode}`)
//     .then(response => {
//       setCities(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching cities:', error);
//     });

//   };


const handleChangeArraydata = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMedia: {
        ...prevData.socialMedia,
        [name]: value
      }
    }));
  };

  return (
    <>
      <div className="Login">
        <div className="container">
          <div className="row">
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
            <div className="col-lg-2"></div>
            <div className="col-lg-7">
              <div className="form-container">
              <HostEventTimeline step={step} numberOfCheckpoints={4} width="35rem" />

                <form action="/" method="POST" onSubmit={handleSubmit}>
                  {step === 1 && (
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

                      <br />

                      <button
                        type="button"
                        onClick={handleNext1}
                        className="buttonOnHostingPage"
                      >
                        Next
                      </button>
                    </div>
                  )}

              {step === 2 && (
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


{/* <div>
<FormControl fullWidth>
          <InputLabel id="campus-select-label">Select a Campus</InputLabel>
          <Select
            labelId="campus-select-label"
            id="campus-select"
            value={selectedCampus}
            onChange={handleChange}
            label="Select a Campus"
          >
            <MenuItem value="">
              <em>Select a campus</em>
            </MenuItem>
            {campuses.map((campus) => (
              <MenuItem key={campus.data._id} value={campus.data._id}>
                {campus.data.collegeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      {selectedCampus && <p>Selected Campus ID: {selectedCampus}</p>}
    </div> */}


                      <TextField
                        name="campus"
                        label="Campus"
                        variant="outlined"
                        value={formData.campus}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.campus}
                        helperText={errors.campus}
                      />

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
                        onClick={handleNext1}
                      >
                        Next
                      </button>
                      <br />
                      <br />
                  
                    </div>
                  )}

                {
                    step === 3 && (

                        <div>
                       <TextField
                        name="instagram"
                        label="Instagram"
                        variant="outlined"
                        value={formData.socialMedia.instagram}
                        onChange={handleChangeArraydata}
                        fullWidth
                        margin="normal"
                        error={!!errors.socialMedia.instagram}
                        helperText={errors.socialMedia.instagram}
                      />


                        <TextField
                        name="linkedIn"
                        label="LinkedIn"
                        variant="outlined"
                        value={formData.socialMedia.linkedIn}
                        onChange={handleChangeArraydata}
                        fullWidth
                        margin="normal"
                        error={!!errors.socialMedia.linkedIn}
                        helperText={errors.socialMedia.linkedIn}
                      />
                         <TextField
                        name="twitter"
                        label="Twitter"
                        variant="outlined"
                        value={formData.socialMedia.twitter}
                        onChange={handleChangeArraydata}
                        fullWidth
                        margin="normal"
                        error={!!errors.socialMedia.twitter}
                        helperText={errors.socialMedia.twitter}
                      />
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
                        onClick={handleNext3}
                      >
                        Next
                      </button>
                      <br />
                      <br />

                        </div>



                    )
                }





                  {step === 4 && (
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

                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                      />
                      <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                      />

                      <br />
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="buttonOnHostingPage"
                      >
                        Previous
                      </button>
                          
                      <button type="submit" 
                      onClick={handleNext4}
                      className="buttonOnHostingPage btnrightallign">
                      {loading ? "Loading..." : "Submit"}
                      </button>
                      <br />
                      <br />
                    
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorSignup;
