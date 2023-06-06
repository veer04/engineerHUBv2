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
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const roles = ["User", "Mentor", "Organization"];
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch country data
    axios.get(`${API_URL}api/v1/getCountries`)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);


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

  const validateInput = () => {
    let valid = true;
    const newErrors = {
      name: "",
      // userName: '',
      email: "",
      organizationName: "",
      contact: "",
      country: "",
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
    } else if (!/^[a-zA-Z][0-9]$/.test(formData.organizationName)) {
      newErrors.organizationName = "Invalid organization name";
      valid = false;
    }

 

    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Invalid contact number";
      valid = false;
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };
  const handleNext = () => {
      setStep(step+1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!validateInput()) {
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
          if(response.status===200 || response.status===201 || response.status===202 || response.status===203 || response.status===204)
          {
            setLoading(false);
            navigate("/otpverification");
            // window.location.reload(true);
          }
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
    }
  }
  
  
  ;  const handleCountryChange = event => {
    const countryCode = event.target.value;
    
    // Fetch state data based on selected country
    axios.get(`${API_URL}api/v1/getStates/{countryCode}`)
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  };

    const handleStateChange = event => {
    const countryCode = event.target.value; // Get the selected country code
    const stateCode = event.target.value; // Get the selected state code
    axios.get(`${API_URL}api/v1/getCities/${countryCode}/${stateCode}`)
    .then(response => {
      setCities(response.data);
    })
    .catch(error => {
      console.error('Error fetching cities:', error);
    });

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
            <div className="col-lg-5">
              <div className="form-container">
              <HostEventTimeline step={step} numberOfCheckpoints={3} width="35rem" />

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

                      <br />

                      <button
                        type="button"
                        onClick={handleNext}
                        className="buttonOnHostingPage"
                      >
                        Next
                      </button>
                    </div>
                  )}

              {step === 2 && (
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

                      <TextField
                        name="country"
                        label="Country"
                        variant="outlined"
                        value={formData.country}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.country}
                        helperText={errors.country}
                      />
                      <TextField
                        name="state"
                        label="State"
                        variant="outlined"
                        value={formData.state}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.state}
                        helperText={errors.state}
                      />
                      <TextField
                        name="city"
                        label="City"
                        variant="outlined"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.city}
                        helperText={errors.city}
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
                        onClick={handleNext}
                      >
                        Next
                      </button>
                      <br />
                      <br />
                  
                    </div>
                  )}


                  {step == 3 && (
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
                          
                      <button type="submit" className="buttonOnHostingPage btnrightallign">
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

export default OrganizationSignup;
