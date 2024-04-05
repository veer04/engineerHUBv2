import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import "./GetFeaturedForm.css";
import "../../pages/Profile/Dashboard.css";
import "../../pages/Profile/EditProfile.css";
import "../../pages/Profile/CompanyDashboard/CompanyEditProfile.css"
import moment from "moment";

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
import { useRef } from "react";
import countryCodes from "../../assets/countryCodes";
import LoadingPage from "../../components/Loader/LoadingPage";
import { getAccessToken } from "../../features/getCookieValues";
import { getAllCampuses,controller ,  addUserEducation,deleteProfilePicture,

  patchProfilePicture,
} from "../../services/APIConfig";
export default function GetFeaturedForm() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return <main></main>;
  }
  const fileInput = useRef(null);

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fetchResponse, setFetchResponse] = useState({});
  const [email, setEmail] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [response, setResponse] = useState({});
  const [newCampus, setNewCampus] = useState("");
  const [countryCode, setCountryCode] = useState("91"); //change the type to Number
  const [contactNo, setContactNo] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
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
    document.title = "Get Featured | engineerHUB";
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
    if (!!Object.keys(deleteResponse).length) {
      setIsImageDeleting(false);
      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile picture removed successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in removing profile picture");
        setSnackbarOpen(true);
      }
      setDeleteResponse({});
    }
  }, [deleteResponse]);
  function fetchData() {
    getUserProfileById(setUser,  getUserId(), setFetchResponse);
  }
  useEffect(() => {
    console.log(newImage);
    console.log(!!newImage);
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(getUserId(), file, setResponse);
        setNewImage(null);
      } else {
        alert("Please choose an image file only");
      }
    }
  }, [newImage]);
  
  useEffect(() => {
    if (!!Object.keys(response).length) {
      if (response.status >= 200 && response.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile picture updated successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in updating profile picture");
        setSnackbarOpen(true);
      }
      setResponse({});
    }
    setIsImageLoading(false);
    return () => {
      controller.abort();
    };
  }, [response]);
  function handleImageDelete() {
    setIsImageDeleting(true);
    deleteProfilePicture(setDeleteResponse);
  }
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
        if (getUserRole() === "User" || getUserRole() === "Alumni" || getUserRole()=="Club")
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
        <section className="box">
        <p className="heading">{getUserRole().toUpperCase()} PROFILE PICTURE</p>
        <p className="md-alert-text">
          *Note Image size must be not more than 100kb
        </p>
        <div>
          <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src={user?.image} style={{
              maxWidth:"220px",
              // borderRadius:"50%",
              maxHeight:"220px",
              marginBottom:"2%",

            }} loading="lazy" alt="logo" />
          </div>
          <div className="buttons" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <input
              ref={fileInput}
              type="file"
              style={{
                display: "none",
              }}
              onChange={(e) => {
                setNewImage(e.target.files[0]);
              }}
            />
            <button
            style={{border:"none",
          color:"#fff",
        background:"rgb(1,64,81)",
        padding:"2px 10px",

        borderRadius:"5px",
      margin:"5px",}}
              onClick={() => {
                fileInput.current.value = null;
                fileInput.current.click();
              }}
              disabled={isImageDeleting || isImageLoading}
            >
              {isImageLoading ? (
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Upload"
              )}
            </button>
            <button
            style={{border:"none",
            color:"#fff",
          background:"rgb(1,64,81)",
        padding:"2px 10px",
      borderRadius:"5px",
    margin:"5px",}}
              onClick={() => {
                handleImageDelete();
              }}
              disabled={isImageLoading || isImageDeleting}
            >
              {isImageDeleting ? (
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Delete"
              )}
            </button>
            {/* <p className="alert-text">
              *Note Image size must be not more than 100kb
            </p> */}
          </div>
        </div>
      </section>
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
            getUserRole() === "User" || getUserRole() === "Alumni"  ?(
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


