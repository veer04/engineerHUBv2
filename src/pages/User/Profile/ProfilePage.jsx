import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import defaultPoster from "../../../assets/defaultPoster";
import SimpleInputField from "../../../components/SimpleInputField/SimpleInputField";
import useNavbar from "../../../hooks/use-navbar";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/Loader/LoadingPage";
import { set } from "react-hook-form";
import { handleLogout } from "../../../features/logout";

export default function ProfilePage() {
  const { setSelectedPageNavbar } = useNavbar();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  function getCookie(name) {
    // Get the value of a cookie by name
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  useEffect(() => {
    setSelectedPageNavbar("profile");
    // Check if user is logged in by checking for the 'userName' cookie
    const storedName = getCookie("name");
    if (storedName === "" || storedName === null || storedName === undefined) {
      navigate("/login");
      setIsLoading(false);
    }
    if (storedName) {
      setIsLoading(false);
      setName(decodeURIComponent(storedName));
    }
    const storedEmail = getCookie("email");
    if (storedEmail) {
      setEmail(decodeURIComponent(storedEmail));
    }
    const storedCollege = getCookie("institutionName");
    if (storedCollege) {
      setCampus(decodeURIComponent(storedCollege));
    }
    const storedImage = getCookie("image");
    if (storedImage) {
      setImage(decodeURIComponent(storedImage));
    }
    const isEmailVerified = getCookie("isVerified");
    if (isEmailVerified) {
      setIsEmailVerified(decodeURIComponent(isEmailVerified));
    }
    const storedPhoneNumber = getCookie("mobile");
    if (storedPhoneNumber) {
      setPhoneNumber(decodeURIComponent(storedPhoneNumber));
    }
    const isPhoneNumberVerified = getCookie("isPhoneNumberVerified");
    if (isPhoneNumberVerified) {
      setIsPhoneNumberVerified(decodeURIComponent(isPhoneNumberVerified));
    }
  }, []);

  const profilePage = (
    <main className="profile-page">
      <header className="heading-3">Profile</header>
      <section>
        <div className="details-container">
          <p>Profile Picture</p>
          <div>
            <div
              style={{
                backgroundImage: `url(${image ? image : defaultPoster})`,
              }}
              className="profile-picture"
            ></div>
          </div>
          <p>Name</p>
          <SimpleInputField
            name="Name"
            value={name}
            setValue={setName}
            disabled
          />
          {/* <div className="verifiable-fields">
            <div> */}
          <p>Email ID</p>
          <SimpleInputField
            name="Email"
            value={email}
            setValue={setEmail}
            disabled
          />
          {/* </div>
            <div>
              <button
                className={`verification-btn ${
                  isEmailVerified ? "--is-verified" : ""
                }`}
              >
                {isEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
          <div className="verifiable-fields">
            <div> */}
          <p>Phone Number</p>
          <SimpleInputField
            name="Phone Number"
            value={phoneNumber}
            setValue={setPhoneNumber}
            disabled
          />
          {/* </div>
            <div>
              <button
                className={`verification-btn ${
                  isPhoneNumberVerified ? "--is-verified" : ""
                }`}
              >
                {isPhoneNumberVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div> */}
          <p>Campus</p>
          <SimpleInputField
            name="Campus"
            value={campus}
            setValue={setCampus}
            disabled
          />
          <div
            className="logBtn logout-btn"
            style={{
              textAlign: "center",
            }}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </section>
    </main>
  );

  return isLoading ? <LoadingPage /> : profilePage;
}
