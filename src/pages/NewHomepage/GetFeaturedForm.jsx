import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GetFeaturedForm.css";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import {
  getUserId,
  getUserRole,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import {
  getClubProfileById,
  getOrganizationProfileById,
  getUserProfileById,
} from "../../services/APIConfig";
import countryCodes from "../../assets/countryCodes";
import { getAccessToken } from "../../features/getCookieValues";
import { getAllCampuses,controller ,  addUserEducation,} from "../../services/APIConfig";
export default function GetFeaturedForm() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return <main></main>;
  }
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [newCampus, setNewCampus] = useState("");
  const [countryCode, setCountryCode] = useState("91"); //change the type to Number
  const [contactNo, setContactNo] = useState("");
  const [updateEducationResponse, setUpdateEducationResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    countryCode: "",
    contactNo: "",
    campus:"",
  });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (getUserRole() === "User" || getUserRole() === "Alumni") {
      getUserProfileById(setUser, getUserId());
      getAllCampuses(setCampuses);
    } else if (getUserRole() === "Club") {
      getClubProfileById(setUser, getUserId());
    } else if (getUserRole() === "Organization") {
      getOrganizationProfileById(setUser, getUserId());
    }
  }, []);


  useEffect(() => {
    setName(
      !!user?.firstName
        ? `${user?.firstName}${user?.lastName ? " " + user.lastName : ""}`
        : user.name
        ? user.name
        : ""
    );
    setEmail(user.email);
    setContactNo(user?.contactNo || user.mobile);
  }, [user]);

  useEffect(() => {
    if (!!Object.keys(updateEducationResponse).length) {
      setLoading(false);
      if (
        updateEducationResponse.status >= 200 &&
        updateEducationResponse.status < 300
      ) {
        // setSnackbarSeverity("success");
        // setSnackbarMessage("You are added to the waitlist🎉");
        // setSnackbarDuration(8000);
        // setSnackbarOpen(true);
      } else {
        // setSnackbarSeverity("error");
        // setSnackbarMessage("Something went wrong");
        // setSnackbarOpen(true);
        // setSnackbarDuration(8000);
      }
      setUpdateEducationResponse({});
      
      setNewCampus("");
      
    }
  }, [updateEducationResponse]);

  function validateForm() {
    let formIsValid = true;
    let error = {
      name: "",
      email: "",
      countryCode: "",
      contactNo: "",
      campus:"",
    };

    if (!name) {
      formIsValid = false;
      error.name = "Name is required";
    } else if (name.length < 3) {
      formIsValid = false;
      error.name = "Name should be atleast 3 characters long";
    }

    if (!email) {
      formIsValid = false;
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      error.email = "Invalid email format!";
    }

    if (!!!countryCode) {
      error.countryCode = "Please select your country code";
      formIsValid = false;
    }
    if (!contactNo) {
      formIsValid = false;
      error.contactNo = "Contact no. is required";
    } else if (contactNo.length < 6) {
      formIsValid = false;
      error.contactNo = "Contact no. should be atleast 6 digits long";
    } else if (contactNo.length > 16) {
      formIsValid = false;
      error.contactNo = "Contact no. should be atmost 16 digits long";
    }

    setError(error);
    return formIsValid;
  }

  const handleChangeCollegeId = (e) => {
    // const { name, value } = e.target;
    setNewCampus(e.target.value);
  };




  function handleUpdateEducation() {
    const data = {
      collegeId: newCampus,
     
    };
    setLoading(true);
    addUserEducation(data, setUpdateEducationResponse);
  }

  function  submitFormData() {

    const data = {
      name,
      email,
      mobile: contactNo,
    };
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    axios
      .post(
        `${API_URL}api/v1/getFeaturedForm`,
        {
          ...data,
        },
        config
      )
      .then(() => {
        if (getUserRole() === "User" || getUserRole() === "Alumni")
        {

          handleUpdateEducation() 
        }
        setLoading(false);
        setSnackbarMessage("You are added to the waitlist🎉");
        setSnackbarSeverity("success");
        setSnackbarDuration(8000);
        setSnackbarOpen(true);
        navigate(`/`);
      })
      .catch((err) => {
        if (getUserRole() === "User" || getUserRole() === "Alumni")
        {

          handleUpdateEducation() 
        }
        setLoading(false);
        setSnackbarMessage(
          err?.response?.data?.message || "Something went wrong"
        );
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }

  function handleSubmit(e) {
     
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      submitFormData();
     
    } else {
      setLoading(false);
    }
  }


  return (
    <main id="get-featured-form" className="get-featured-form">
      <section className="box">
        <p className="heading">Get Yourself Featured</p>
        <form>
          <div className="line">
            <div className="column">
              <label className="label">
                Name<span className="required">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter you full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.name}</label>
            </div>
            <div className="column">
              <label className="label">
                Email<span className="required">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <label className="error-message">{error.email}</label>
            </div>
          </div>
          <div className="line">
            <div className="column">
              <label className="label">
                Mobile Number<span className="required">*</span>
              </label>
              <div className="mobile-field">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="input-field"
                >
                  {countryCodes.map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      +{countryCode}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter your Contact Number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </div>
              {!!error.countryCode && (
                <label className="error-message">{error.countryCode}</label>
              )}
              <label className="error-message">{error.contactNo}</label>
            </div>
          </div>
          {
            getUserRole() === "User" || getUserRole() === "Alumni" ?(
              <div className="row">
              <label className="label">
                Institute/College Name<span className="required">*</span>
              </label>
              <select
                className="input-field"
                labelid="campus-name"
                id="student-signup-campus-select"
                label="Institution Name"
                name="institutionName"
                value={newCampus}
                onChange={handleChangeCollegeId}
              >
                <option value="" disabled>
                  Select your Campus
                </option>
                {campuses.map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.collegeName}
                  </option>
                ))}
              </select>
              <label className="error-message">{error.campus}</label>
              </div>

            ):(
              <>
              </>
            )

          }
       
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="update-btn"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}


