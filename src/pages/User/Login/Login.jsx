import "./Login.css";
import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

const Login = () => {
    const [values, setValues] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        mobile: '',
        college: '',
        branch: '',
        institutionName:'',
        city:'',
        country: '',
        password:'',
        conPassword:'',
        values:[],
      });
      const handleInputChange = (event) => {
        const inputValues = event.target.value.split(',');
        setValues(inputValues);
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Send form data to the API using fetch or axios
        console.log(formData);
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
                <div className="col-lg-9">
                    <div className="form-container">
                        <p className="LformHeaderText">Basic Details</p>
                        <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="userName"
        label="Username"
        variant="outlined"
        value={formData.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="mobile"
        label="Mobile No."
        variant="outlined"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="college"
        label="College Name"
        variant="outlined"
        value={formData.college}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="branch"
        label="branch No."
        variant="outlined"
        value={formData.branch}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="city"
        label="city"
        variant="outlined"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="country"
        label="Country"
        variant="outlined"
        value={formData.country}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <TextField
        name="institutionName"
        label="institutionName"
        variant="outlined"
        value={formData.institutionName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <TextField
        name="password"
        label="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <TextField
        name="conPassword"
        label="conPassword"
        variant="outlined"
        value={formData.conPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <input type="text" onChange={handleInputChange} />
      <ul>
        {values.map((value, index) => (
          <li key={index}>{value.trim()}</li>
        ))}
      </ul>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login