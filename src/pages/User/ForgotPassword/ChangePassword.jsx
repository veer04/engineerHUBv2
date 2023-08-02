import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "../Signup/StudentSignup.css";
import { API_URL } from "../../../services/APIUtils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "./ForgotPassword.css";
import CustomSnackbar from "../Login/CustomSnackbar";

const UpdateUserForm = () => {
  const [role, setRole] = useState("");
  const [_id, setId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const storedRole = sessionStorage.getItem("ForgotRole");
    const storedId = sessionStorage.getItem("ForgotId");
    if (!!storedRole && !!storedId) {
      setRole(storedRole);
      setId(storedId);
    } else {
      window.location.href = "/login";
    }
  }, []);
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setError("");
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleOTPChange = (event) => {
    if (isNaN(event.target.value)) {
      setError2("OTP must be a number");
      return;
    }
    setOTP(event.target.value);
    setError2("");
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleSubmit = async () => {
    let valid = true;
    const otpAsNumber = parseInt(OTP, 10);
    if (!newPassword) {
      setError("Password is required");
      valid = false;
    } else {
      setError("Password must contain at least");
      let allErrors = [];
      if (newPassword.length < 8) {
        allErrors.push(" 8 characters");
      }
      if (!/[A-Z]/.test(newPassword)) {
        allErrors.push(" 1 uppercase character");
      }
      if (!/[a-z]/.test(newPassword)) {
        allErrors.push(" 1 lowercase character");
      }
      if (!/\d/.test(newPassword)) {
        allErrors.push(" 1 numeric character");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        allErrors.push(" 1 special character");
      }
      if (allErrors.length > 0) {
        setError((prev) => prev + allErrors.join(",") + ".");
        valid = false;
      } else {
        setError("");
      }
    }
    if (!otpAsNumber) {
      setError2("OTP is required");
      valid = false;
    } else if (otpAsNumber.toString().length !== 6) {
      setError2("OTP must be 6 digits");
      valid = false;
    }
    if (valid) {
      setIsLoading(true);
      try {
        const response = await axios
          .patch(`${API_URL}api/v1/forgotPasswordVerify`, {
            role,
            _id,
            newPassword,
            OTP: otpAsNumber,
          })
          .then((res) => {
            setSnackbarValues({
              severity: "success",
              message: `Password changed successfully.`,
            });
            setOpen(true);

            setIsLoading(false);
            sessionStorage.removeItem("ForgotId");
            sessionStorage.removeItem("ForgotRole");
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          });
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <main className="signup-page">
      <section className="details-container">
        <div className="details">
          <div className="cont-head">
            <div
              className="my-form-head forgotPassHeader"
              style={{
                fontSize: "40px",
                color: "#0a3f51",
                padding: "0px 0px 30px 0px",
              }}
            >
              Change Password
            </div>
          </div>
          <form action="/" method="POST">
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel
                htmlFor="student-signup-outlined-adornment-confirm-password"
                error={!!error}
                required
              >
                New Password
              </InputLabel>
              <OutlinedInput
                id="student-signup-outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={!!error}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              <FormHelperText error={!!error}>{error}</FormHelperText>
            </FormControl>
            <TextField
              name="name"
              label="OTP"
              variant="outlined"
              placeholder="Enter the 6-digit OTP"
              value={OTP}
              onChange={handleOTPChange}
              margin="normal"
              error={!!error2}
              helperText={error2}
              type="text"
              maxLength={6}
              pattern="[0-9]*"
              required
              id="otp"
            />
            <Button
              style={{
                backgroundColor: "var(--primary-color-green)",
              }}
              className="button btn-submit-green next-button float-end mt-4"
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
            {snackbarValues.severity === "success" && (
              <CustomSnackbar
                setOpen={setOpen}
                open={open}
                message={snackbarValues.message}
                severity={snackbarValues.severity}
              />
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default UpdateUserForm;
