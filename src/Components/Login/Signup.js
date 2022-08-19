import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Register.css';

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom:5
          }}
        >
          <div className="cont-head">
     <div
          className="my-form-head"
          style={{
            padding: "0px 0px 0px 0px",
            lineHeight:"43px"
          }}
        >
          Create your Account
        </div>
      </div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Phone Number"
                  type="number"
                  id="number"
                  autoComplete="new-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                background: "#05555e" ,
                color: "white",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                padding: "5px",
  borderRadius: "16px",
  // margin: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  fontFamily: " sans-serif",
  fontSize: "17px",
  letterSpacing: "0.7px",
  height: "60px",
  // width: "366px",
            }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <div className="divisor d-flex justify-content-center">
           <hr style={{ color: "#6c757d" }} />
           <span className="d-flex justify-content-center p-2">or</span>
           <hr />
         </div>
         <div className="sign-field reg-field">
           <div className="sign-opt reg">
             <img src={gg} alt="google" />
           </div>
           <div className="sign-opt reg">
             <img src={fve} alt="Facebook" />
           </div>
         </div> */}

      </Container>
    </ThemeProvider>
  );
}