import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import "../Signup/StudentSignup.css";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { changeDocumentTitle } from "../../../features/changeDocumentTitle";
export default function ForgotPassword() {
  changeDocumentTitle("Forgot Password | engineerHUB");
  const navigate = useNavigate();
  if (Cookies.get("name")) {
    let path = "";
    if (Cookies.get("role") === "User") {
      path = "user";
    } else if (Cookies.get("role") === "Alumni") {
      path = "user";
    } else if (Cookies.get("role") === "Club") {
      path = "club";
    } else if (Cookies.get("role") === "Organization") {
      path = "organization";
    }
    if (sessionStorage.getItem("redirectToAuth") === "true") {
      sessionStorage.removeItem("redirectToAuth");
      navigate(sessionStorage.getItem("redirectToAuthLink"));
      sessionStorage.removeItem("redirectToAuthLink");
    } else window.location.href = `/profile/${path}/${Cookies.get("_id")}`;
    return;
  }
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    } else if (!email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    } else if (email.includes(" ")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios
        .post(`${API_URL}api/v1/forgotPassword`, { email })
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("ForgotId", res.data._id, { expires: 400 });
            Cookies.set("ForgotRole", res.data.role, { expires: 400 });
            // store ForgotId and ForgotRole in session storage instead of cookies
            sessionStorage.setItem("ForgotId", res.data._id);
            sessionStorage.setItem("ForgotRole", res.data.role);

            setIsLoading(false);
            navigate("/change-password");
          }
        });
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred. Please try again later.");
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
              Forgot Password
            </div>
          </div>
          <form>
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              name="name"
              label="Enter your email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error}
            />
            <div className="button-container">
              <Button
                className="button next-button"
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
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
