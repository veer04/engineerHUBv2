import "./Signup.css";
import { useState, useEffect } from 'react';
import { TextField, Button} from '@mui/material';
import axios from "axios";
import "../../Hosting/EventRegistration.css";
import useNavbar from "../../../hooks/use-navbar";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { Select, MenuItem } from '@mui/material';
import { API_URL } from "../../../services/APIUtils";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const Signup = () => {
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("login");
  }, []);

  const roles = ["User", "Mentor", "Organization"];
    
  const [role, setRole] = useState("User");
    const [formData, setFormData] = useState({
        name: '',
        // userName: '',
        email: '',
        mobile: '',
        state: '',
        branch: '',
        institutionName:'',
        city:'',
        country: '',
        password:'',
        confirmPassword:'',
        role:'',
        
      });
      const [step, setStep] = useState(1);
      const [errors, setErrors] = useState({
        name: '',
        // userName: '',
        email: '',
        mobile: '',
        state: '',
        branch: '',
        institutionName:'',
        city:'',
        country: '',
        password:'',
        confirmPassword:'',
      });

      const handleNext = () => {
        setStep(step + 1);
      };
    
      const handlePrev = () => {
        setStep(step - 1);
      };
    


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
          name: '',
          // userName: '',
          email: '',
          mobile: '',
          institutionName:'',
          contact: '',
          country: '',
        };

        if (!formData.name) {
          newErrors.name = 'Name is required';
          valid = false;
        }


        if (!formData.email) {
          newErrors.email = 'Email is required';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
          valid = false;
        }

        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
          valid = false;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Invalid mobile number';
          valid = false;
        }

        if (!formData.institutionName) {
          newErrors.institutionName = 'College name is required';
          valid = false;
        }

        if (!formData.contact) {
          newErrors.contact = 'Contact number is required';
          valid = false;
        } else if (!/^\d{10}$/.test(formData.contact)) {
          newErrors.contact = 'Invalid contact number';
          valid = false;
        }

        if (!formData.country) {
          newErrors.country = 'Country is required';
          valid = false;
        }

        setErrors(newErrors);
        return valid;
      };

      const handleChangeRole = (event) => {
        setRole(event.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        if(!validateInput())
        {
          console.log(formData);
          
        axios.post(`${API_URL}api/v1/user/signup`,formData).then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      }

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
                    <div className="navigation-buttons__container">
          <div className="navigation-buttons">
            <div
              style={{
                borderColor: step > 1 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-1"
            ></div>
            <div
              style={{
                borderColor: step > 2 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-2"
            ></div>
            <div
              style={{
                backgroundColor:
                  step === 1 ? "var(--primary-color-dark-green)" : "#15CF74",
                color: "white",
                borderColor: step > 1 ? "#15CF74" : "",
              }}
              className="form-button"
            >
              Basic Details
            </div>
            <div
              style={{
                backgroundColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
                color: step === 2 ? "white" : step === 3 ? "white" : "",
                borderColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
              }}
              className="form-button"
            >
              Applicant Details
            </div>
            <div
              style={{
                backgroundColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
                color: step === 3 ? "white" : "",
                borderColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
              }}
              className="form-button"
            >
              Publish
            </div>
          </div>
        </div>


    <form action="/" method="POST"  onSubmit={handleSubmit}>

    

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
       {/* <TextField
        name="userName"
        label="Username"
        variant="outlined"
        value={formData.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.userName}
        helperText={errors.userName}
      />  */}
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
                  onClick={handleNext}
                  className="buttonOnHostingPage"
                >
                  Next
                </button>
               
       </div>   )}



     { step===2 &&(
      
 <div>
      <TextField
        name="branch"
        label="branch Name"
        variant="outlined"
        value={formData.branch}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.branch}
        helperText={errors.branch}
      />
   
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
        label="state"
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
        label="city"
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
                
                <br />
                <button
                  type="button"
                  className="buttonOnHostingPage"
                  onClick={handleNext}
                >
                  Next
                </button>

      </div>

     )}


     {step==3 && (
      <div>
     
       <TextField
        name="institutionName"
        label="institutionName"
        variant="outlined"
        value={formData.institutionName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.institutionName}
        helperText={errors.institutionName}
      />

<Select value={role}
  fullWidth
  className="mt-2"
onChange={handleChangeRole}>
      {roles.map((role) => (
        <MenuItem key={role}
         value={role}
       
         >
          {role}
        </MenuItem>
      ))}
    </Select>

       <TextField
        name="password"
        label="password"
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
        label="confirmPassword"
        variant="outlined"
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

                <br />

              <button type="submit" className="buttonOnHostingPage">
                  submit
                </button>
     </div>)}
    
 </form>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup