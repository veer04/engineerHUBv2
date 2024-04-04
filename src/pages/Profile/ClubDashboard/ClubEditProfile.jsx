import { useState, useEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "../EditProfile.css"; // !import this file second
import "./ClubEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import {
  controller,
  deleteProfilePicture,
  getAllCountries,
  getCitiesByState,
  getClubProfileByIdPrivateMode,
  getStatesByCountry,
  patchProfilePicture,
  updateClubDetails,
} from "../../../services/APIConfig";
import countryCodes from "../../../assets/countryCodes";
import { useRef } from "react";
import { handleLogout } from "../../../features/logout";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";
import Page404 from "../../Maintenance/Page404";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { set } from "react-hook-form";
import LoadingPage from "../../../components/Loader/LoadingPage";

export default function ClubEditProfile() {
  const { clubId } = useParams();
  if (!isUserLoggedIn() || getUserId() !== clubId) {
    return <Page404 />;
  }
  const [organization, setOrganization] = useState(null);
  const navigate = useNavigate();
  const options = ["Basic Information", "Contact Information", "Edit Location"];
  const [chosenOption, setChosenOption] = useState(options[0]);
  const fileInput = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSubHeading, setNewSubHeading] = useState("");
  const [newClubType, setNewClubType] = useState("");
  const [newAboutUs, setNewAboutUs] = useState("");
  const [newMobileCountryCode, setNewMobileCountryCode] = useState("91");
  const [newMobileNumber, setNewMobileNumber] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [response, setResponse] = useState({});
  const [deleteResponse, setDeleteResponse] = useState({});
  const [errors, setErrors] = useState({
    newName: "",
    newSubHeading: "",
    newClubType: "",
    newAboutUs: "",
    newCountry: "",
    newState: "",
    newCity: "",
    newMobileCountryCode: "",
    newMobileNumber: "",
    newWebsiteUrl: "",
    newLinkedin: "",
  });
  const [updateResponse, setUpdateResponse] = useState({});
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [loading, setLoading] = useState(false);
  const [fetchResponse, setFetchResponse] = useState({});

  const hiringForList = [
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "Intern",
      label: "Intern",
    },
    {
      value: "Part Time/Project Basis",
      label: "Part Time/Project Basis",
    },
    {
      value: "Event Based Hiring/Hackathons",
      label: "Event Based Hiring/Hackathons",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    getClubProfileByIdPrivateMode(setOrganization, clubId, setFetchResponse);
    getAllCountries(setCountries);
    return () => {
      controller.abort();
    };
  }, [clubId]);

  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(clubId, file, setResponse);
        setNewImage(null);
      } else {
        alert("Please choose an image file only");
      }
    }
  }, [newImage]);

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      if (response.status >= 200 && response.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile picture updated successfully");
        setSnackbarOpen(true);
        getClubProfileByIdPrivateMode(setOrganization, clubId);
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

  useEffect(() => {
    if (Object.keys(deleteResponse).length > 0) {
      setIsImageDeleting(false);
      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile picture removed successfully");
        setSnackbarOpen(true);
        getClubProfileByIdPrivateMode(setOrganization, clubId);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in removing profile picture");
        setSnackbarOpen(true);
      }
      setDeleteResponse({});
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (Object.keys(updateResponse).length > 0) {
      setLoading(false);
      if (updateResponse.status >= 200 && updateResponse.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile updated successfully");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in updating profile");
        setSnackbarOpen(true);
      }
      setResponse({});
    }
  }, [updateResponse]);

  useEffect(() => {
    if (countryParam) {
      setStates([]);
      setStateParam("");
      setNewState("");
      setCities([]);
      setNewCity("");
      getStatesByCountry(setStates, countryParam);
    }
    return () => {
      controller.abort();
    };
  }, [countryParam]);

  useEffect(() => {
    if (stateParam) {
      setCities([]);
      setNewCity("");
      getCitiesByState(setCities, countryParam, stateParam);
    }
    return () => {
      controller.abort();
    };
  }, [stateParam]);

  useEffect(() => {
    if (organization) {
      document.title = `Edit Profile | Club | engineerHUB`;
      setNewName(organization?.name);
      setNewSubHeading(organization?.subHeading);
      setNewClubType(organization?.clubType);
      setNewAboutUs(organization?.aboutUs);
      setNewMobileCountryCode(organization?.mobileCountryCode);
      setNewMobileNumber(organization?.mobile);
      setNewWebsiteUrl(
        !!organization?.websiteUrl
          ? organization?.websiteUrl
          : organization?.webSiteURL
      );
      setNewLinkedin(organization?.linkedIn);
    }
  }, [organization]);

  function validateData1() {
    let errors = {
      newName: "",
      newSubHeading: "",
      newClubType: "",
      newAboutUs: "",
    };
    let isValid = true;

    if (!!!newName) {
      errors.newName = "Please enter your Club Name";
      isValid = false;
    } else if (newName.length < 3) {
      errors.newName = "Club Name must be at least 3 characters long";
      isValid = false;
    } else if (newName.length > 100) {
      errors.newName = "Club Name must be at most 100 characters long";
      isValid = false;
    }

    if (!!!newSubHeading) {
      errors.newSubHeading = "Please enter your Club Sub-heading";
      isValid = false;
    } else if (newSubHeading.length < 3) {
      errors.newSubHeading =
        "Club Sub-heading must be at least 3 characters long";
      isValid = false;
    } else if (newSubHeading.length > 250) {
      errors.newSubHeading =
        "Club Sub-heading must be at most 250 characters long";
      isValid = false;
    }

    if (!!!newClubType) {
      errors.newClubType = "Please choose your Club Type";
      isValid = false;
    }

    if (!!!newAboutUs) {
      errors.newAboutUs = "Please enter your Club Description";
      isValid = false;
    } else if (newAboutUs.length < 50) {
      errors.newAboutUs =
        "Club Description must be at least 50 characters long";
      isValid = false;
    } else if (newAboutUs.length > 1000) {
      errors.newAboutUs =
        "Club Description must be at most 1000 characters long";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  }

  function validateData2() {
    let errors = {
      newMobileCountryCode: "",
      newMobileNumber: "",
      newWebsiteUrl: "",
      newLinkedin: "",
    };
    let isValid = true;

    if (!!!newMobileCountryCode) {
      errors.newMobileCountryCode = "Please select your country code";
      isValid = false;
    }

    if (!!!newMobileNumber) {
      errors.newMobileNumber = "Please enter your mobile number";
      isValid = false;
    } else if (newMobileNumber.length < 10) {
      errors.newMobileNumber =
        "Mobile number must be at least 10 characters long";
      isValid = false;
    } else if (newMobileNumber.length > 10) {
      errors.newMobileNumber =
        "Mobile number must be at most 10 characters long";
      isValid = false;
    }

    if (!!!newWebsiteUrl) {
      errors.newWebsiteUrl = "Please enter your website url";
      isValid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(newWebsiteUrl)) {
      errors.newWebsiteUrl =
        "Invalid website url! (URL Ex: https://www.engineerhub.in/)";
      isValid = false;
    }

    if (!!!newLinkedin) {
      errors.newLinkedin = "Please enter your linkedin url";
      isValid = false;
    } else if (
      !/^(ftp|http|https):\/\/[^ "]+$/.test(newLinkedin) ||
      !/^(ftp|http|https):\/\/(www.linkedin.com\/)/.test(newLinkedin)
    ) {
      errors.newLinkedin =
        "Invalid linkedin url! (URL Ex: https://www.linkedin.com/company/engineersummit)";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  }

  function validateData3() {
    let errors = {
      newCountry: "",
      newState: "",
      newCity: "",
    };
    let isValid = true;

    if (!!!newCountry) {
      errors.newCountry = "Please select your country";
      isValid = false;
    }

    if (!!!newState) {
      errors.newState = "Please select your state";
      isValid = false;
    }

    if (!!!newCity) {
      errors.newCity = "Please select your city";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  }

  function handleSubmit(index) {
    let isValid = true;
    if (index === 1) {
      isValid = validateData1();
    } else if (index === 2) {
      isValid = validateData2();
    } else if (index === 3) {
      isValid = validateData3();
    }

    if (isValid === false) return;

    let data = {};

    if (index === 1) {
      data = {
        name: newName,
        subHeading: newSubHeading,
        clubType: newClubType,
        aboutUs: newAboutUs,
      };
    } else if (index === 2) {
      data = {
        mobileCountryCode: newMobileCountryCode,
        mobile: newMobileNumber,
        websiteUrl: newWebsiteUrl,
        linkedIn: newLinkedin,
      };
    } else if (index === 3) {
      data = {
        country: newCountry,
        state: newState,
        city: newCity,
      };
    }
    setLoading(true);
    updateClubDetails(data, setUpdateResponse);
  }

  function handleDelete() {
    +setIsImageDeleting(true);
    deleteProfilePicture(setDeleteResponse);
  }

  const renderOption1 = (
    <>
      <section className="box">
        <p className="heading">CLUB PROFILE PICTURE</p>
        {/* <p className="md-alert-text">
          *Note Image size must be not more than 100kb
        </p> */}
        <div>
          <div className="logo">
            <img src={organization?.image} loading="lazy" alt="logo" />
          </div>
          <div className="buttons">
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
              onClick={() => {
                handleDelete();
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
      <section className="box">
        <p className="heading">BASIC INFORMATION</p>
        <label className="label">
          Club Name<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Club Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <label className="error-message">{errors.newName}</label>
        <label className="label">
          Club Sub-heading<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Club Sub-heading"
          value={newSubHeading}
          onChange={(e) => setNewSubHeading(e.target.value)}
        />
        <label className="error-message">{errors.newSubHeading}</label>

        <label className="label">
          Club Type<span className="required">*</span>
        </label>
        <select
          value={newClubType}
          onChange={(e) => {
            setNewClubType(e.target.value);
          }}
          className="input-field"
        >
          <option value="" disabled>
            Select your Type
          </option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
        </select>
        <label className="error-message">{errors.newClubType}</label>

        <label className="label">
          About<span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          placeholder="Describe about your Club"
          value={newAboutUs}
          onChange={(e) => setNewAboutUs(e.target.value)}
        />
        <label className="error-message">{errors.newAboutUs}</label>
        <button
          disabled={loading}
          onClick={() => handleSubmit(1)}
          className="update-btn"
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Update Details"
          )}
        </button>
      </section>
    </>
  );

  const renderOption2 = (
    <>
      <section className="box">
        <p className="heading">CONTACT INFORMATION</p>
        <label className="label">
          Club Representative Mobile Number<span className="required">*</span>
        </label>
        <div className="mobile-field">
          <select
            value={newMobileCountryCode}
            onChange={(e) => setNewMobileCountryCode(e.target.value)}
            className="input-field"
          >
            {countryCodes.map((countryCode) => (
              <option key={countryCode} value={countryCode}>
                +{countryCode}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="input-field"
            placeholder="Enter your Contact Number"
            value={newMobileNumber}
            onChange={(e) => setNewMobileNumber(e.target.value)}
          />
        </div>
        {!!errors.newMobileCountryCode && (
          <label className="error-message">{errors.newMobileCountryCode}</label>
        )}
        <label className="error-message">{errors.newMobileNumber}</label>
        <label className="label">
          Website URL<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Website URL"
          value={newWebsiteUrl}
          onChange={(e) => setNewWebsiteUrl(e.target.value)}
        />
        <label className="error-message">{errors.newWebsiteUrl}</label>
        <label className="label">
          Linkedin<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Linkedin"
          value={newLinkedin}
          onChange={(e) => setNewLinkedin(e.target.value)}
        />
        <label className="error-message">{errors.newLinkedin}</label>
        <button
          disabled={loading}
          onClick={() => handleSubmit(2)}
          className="update-btn"
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Update Details"
          )}
        </button>
      </section>
    </>
  );
  const renderOption3 = (
    <>
      <section className="box">
        <p className="heading">CHANGE LOCATION</p>
        <label className="label">
          Country<span className="required">*</span>
        </label>
        <select
          disabled={countries?.length === 0}
          value={newCountry}
          onChange={(e) => {
            setNewCountry(e.target.value);
            setCountryParam(
              countries.find((country) => country.country === e.target.value)
                .countryCode
            );
          }}
          className="input-field"
        >
          {countries.length !== 0 && (
            <option value="" selected disabled>
              Select your Country
            </option>
          )}
          {countries.map((country) => (
            <option key={country.countryCode} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newCountry}</label>
        <label className="label">
          State<span className="required">*</span>
        </label>
        <select
          disabled={states?.length === 0}
          value={newState}
          onChange={(e) => {
            setNewState(e.target.value);
            setStateParam(
              states.find((state) => state.state === e.target.value).stateCode
            );
          }}
          className="input-field"
        >
          {states.length !== 0 && (
            <option value="" selected disabled>
              Select your State
            </option>
          )}
          {states.map((state) => (
            <option key={state.stateCode} value={state.state}>
              {state.state}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newState}</label>
        <label className="label">
          City<span className="required">*</span>
        </label>
        <select
          disabled={cities?.length === 0}
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="input-field"
        >
          {cities.length !== 0 && (
            <option value="" selected disabled>
              Select your City
            </option>
          )}
          {cities.map((city) => (
            <option key={city.cityCode} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newCity}</label>

        <button
          disabled={loading}
          onClick={() => handleSubmit(3)}
          className="update-btn"
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Update Details"
          )}
        </button>
      </section>
    </>
  );

  const clubEditProfilePage = (
    <main className="edit-profile profile-dashboard">
      <h1 className="title">Edit Profile</h1>
      <h2 className="subheading">
        {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
    platea feugiat odio. */}
      </h2>
      <aside className="md-options">
        {options.map((option) => (
          <button
            className={`option ${
              chosenOption === option ? "--is-selected" : ""
            }`}
            key={option}
            onClick={() => setChosenOption(option)}
          >
            {option}
          </button>
        ))}
      </aside>
      <div>
        <aside>
          <div className="options">
            {options.map((option) => (
              <button
                className={`option ${
                  chosenOption === option ? "--is-selected" : ""
                }`}
                key={option}
                onClick={() => setChosenOption(option)}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate(`/profile/club/${clubId}`)}
            className="back-btn"
          >
            <IoIosArrowBack /> <span>Back to Profile</span>
          </button>
          <button onClick={() => handleLogout()} className="logout-button">
            <CgLogOut /> <span>Logout</span>
          </button>
        </aside>
        {chosenOption === options[0] && <div>{renderOption1}</div>}
        {chosenOption === options[1] && <div>{renderOption2}</div>}
        {chosenOption === options[2] && <div>{renderOption3}</div>}
      </div>
    </main>
  );

  return !!Object.keys(fetchResponse).length ? (
    fetchResponse?.status >= 200 && fetchResponse?.status <= 300 ? (
      clubEditProfilePage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
