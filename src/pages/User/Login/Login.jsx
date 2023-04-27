import "./Login.css";
import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        mobile: '',
        college: '',
        contact: '',
        country: '',
      });
    
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
                <div className="col-lg-4"></div>
                <div className="col-lg-8">
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
        name="contact"
        label="Contact No."
        variant="outlined"
        value={formData.contact}
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