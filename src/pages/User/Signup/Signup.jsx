import "./Signup.css";
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from '@mui/material';
import axios from "axios";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const Signup = () => {
  const navigate =useNavigate();
    const [skills, setSkill] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        // userName: '',
        email: '',
        mobile: '',
        // college: '',
        branch: '',
        institutionName:'',
        city:'',
        country: '',
        password:'',
        confirmPassword:'',
        skills:[''],
      });

      const [errors, setErrors] = useState({
        name: '',
        // userName: '',
        email: '',
        mobile: '',
        // college: '',
        branch: '',
        institutionName:'',
        city:'',
        country: '',
        password:'',
        confirmPassword:'',
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
    
        // if (!formData.userName) {
        //   newErrors.userName = 'Username is required';
        //   valid = false;
        // }
    
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
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateInput()){
          axios.post('https://e-hub-backend-production-9545.up.railway.app/api/v1/user/signup',formData).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

          if(response.status===200|| response.status===201||response.status===204)
          {
            Navigate("/otpverification");
          }
  
        }
      
      //  {
      //     try {
      //       const response = await fetch('http://e-hub-backend-production-9545.up.railway.app/user/signup', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify(formData),
              
      //       });
    
      //       const data = await response.json();
      //       console.log(data);
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   }
      };
    
    
  return (
    <>
    <div className="Login">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 sideMenuLogin">
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
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-5">
                    <div className="form-container">
                        <p className="LformHeaderText">Basic Details</p>
    <form action="/" method="POST"  onSubmit={handleSubmit}>
    <Box >
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        className="inputFieldSignup"
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
      /> */}
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        className="inputFieldSignup"
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
        className="inputFieldSignup"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.mobile}
        helperText={errors.mobile}
      />
      {/* <TextField
        name="college"
        label="College Name"
        variant="outlined"
        value={formData.college}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.college}
        helperText={errors.college}
      /> */}
      <TextField
        name="branch"
        label="branch Name"
        variant="outlined"
        className="inputFieldSignup"
        value={formData.branch}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.branch}
        helperText={errors.branch}
      />
      <TextField
        name="city"
        label="city"
        variant="outlined"
        className="inputFieldSignup"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        name="country"
        label="Country"
        variant="outlined"
        className="inputFieldSignup"
        value={formData.country}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.country}
        helperText={errors.country}
      />
       <TextField
        name="institutionName"
        label="institutionName"
        variant="outlined"
        className="inputFieldSignup"
        value={formData.institutionName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.institutionName}
        helperText={errors.institutionName}
      />
       <TextField
        name="password"
        label="password"
        variant="outlined"
        className="inputFieldSignup"
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
        className="inputFieldSignup"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
       {/* <input type="text" onChange={handleInputChange} />
      <ul>
        {skills.map((skills, index) => (
          <li key={index}>{skills.trim()}</li>
        ))}
      </ul> */}

      <Button type="submit" variant="contained" color="primary"
       >
        Submit
       
      </Button>
    </Box>
 </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup