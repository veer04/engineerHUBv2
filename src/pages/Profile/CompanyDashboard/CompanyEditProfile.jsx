import { useState, useEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "../EditProfile.css"; // !import this file second
import "./CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import {
  controller,
  deleteProfilePicture,
  getAllCountries,
  getCitiesByState,
  getOrganizationProfileByIdPrivateMode,
  getStatesByCountry,
  patchProfilePicture,
  updateOrganizationDetails,
} from "../../../services/APIConfig";
import countryCodes from "../../../assets/countryCodes";
import { useRef } from "react";
import { handleLogout } from "../../../features/logout";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";
import Page404 from "../../Maintenance/Page404";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import LoadingPage from "../../../components/Loader/LoadingPage";

export default function CompanyEditProfile() {
  const { organizationId } = useParams();
  if (!isUserLoggedIn() || getUserId() !== organizationId) {
    return <Page404 />;
  }
  const [organization, setOrganization] = useState({});
  const navigate = useNavigate();
  const options = ["Basic Information", "Contact Information", "Edit Location"];
  const [chosenOption, setChosenOption] = useState(options[0]);
  const fileInput = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSubHeading, setNewSubHeading] = useState("");
  const [newOrganizationType, setNewOrganizationType] = useState("");
  const [newAboutUs, setNewAboutUs] = useState("");
  const [newHiringFor, setNewHiringFor] = useState("");
  const [newContactName, setNewContactName] = useState("");
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
  const [updateResponse, setUpdateResponse] = useState({});
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [fetchResponse, setFetchResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    newName: "",
    newSubHeading: "",
    newOrganizationType: "",
    newWebsite: "",
    newAboutUs: "",
    newHiringFor: "",
    newCountry: "",
    newState: "",
    newCity: "",
    newContactName: "",
    newMobileCountryCode: "",
    newMobileNumber: "",
    newWebsiteUrl: "",
    newLinkedin: "",
  });

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
    getOrganizationProfileByIdPrivateMode(
      setOrganization,
      organizationId,
      setFetchResponse
    );
    getAllCountries(setCountries);
    return () => {
      controller.abort();
    };
  }, [organizationId]);

  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(organizationId, file, setResponse);
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
        getOrganizationProfileByIdPrivateMode(
          setOrganization,
          organizationId,
          setFetchResponse
        );
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
    if (!!Object.keys(deleteResponse).length) {
      setIsImageDeleting(false);
      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile picture removed successfully");
        setSnackbarOpen(true);
        getOrganizationProfileByIdPrivateMode(
          setOrganization,
          organizationId,
          setFetchResponse
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in removing profile picture");
        setSnackbarOpen(true);
      }
      setDeleteResponse({});
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (!!Object.keys(updateResponse).length) {
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
    if (organization) {
      document.title = `Edit Profile | Company | engineerHUB`;
      setNewName(organization?.name);
      setNewSubHeading(organization?.subHeading);
      setNewOrganizationType(organization?.organisationType);
      setNewAboutUs(organization?.aboutUs);
      setNewHiringFor(organization?.hiringFor);
      setNewContactName(organization?.contactName);
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

  function validateData1() {
    let errors = {
      newName: "",
      newSubHeading: "",
      newOrganizationType: "",
      newAboutUs: "",
      newHiringFor: "",
    };
    let isValid = true;

    if (!!!newName) {
      errors.newName = "Please enter your Organization / Company Name";
      isValid = false;
    } else if (newName.length < 3) {
      errors.newName = "Company Name must be at least 3 characters long";
      isValid = false;
    } else if (newName.length > 100) {
      errors.newName = "Company Name must be at most 100 characters long";
      isValid = false;
    }

    if (!!!newSubHeading) {
      errors.newSubHeading =
        "Please enter your Organization / Company Sub-heading";
      isValid = false;
    } else if (newSubHeading.length < 3) {
      errors.newSubHeading =
        "Company Sub-heading must be at least 3 characters long";
      isValid = false;
    } else if (newSubHeading.length > 250) {
      errors.newSubHeading =
        "Company Sub-heading must be at most 250 characters long";
      isValid = false;
    }

    if (!!!newOrganizationType) {
      errors.newOrganizationType =
        "Please enter your Organization / Company Type";
      isValid = false;
    } else if (newOrganizationType.length < 3) {
      errors.newOrganizationType =
        "Company Type must be at least 3 characters long";
      isValid = false;
    } else if (newOrganizationType.length > 100) {
      errors.newOrganizationType =
        "Company Type must be at most 100 characters long";
      isValid = false;
    }

    if (!!!newAboutUs) {
      errors.newAboutUs =
        "Please enter your Organization / Company Description";
      isValid = false;
    } else if (newAboutUs.length < 3) {
      errors.newAboutUs =
        "Company Description must be at least 3 characters long";
      isValid = false;
    } else if (newAboutUs.length > 1000) {
      errors.newAboutUs =
        "Company Description must be at most 1000 characters long";
      isValid = false;
    }

    if (!!!newHiringFor || newHiringFor === "Not Selected") {
      errors.newHiringFor = "Please select your preference for hiring";
      isValid = false;
    }
    setErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  }

  function validateData2() {
    let errors = {
      newContactName: "",
      newMobileCountryCode: "",
      newMobileNumber: "",
      newWebsiteUrl: "",
      newLinkedin: "",
    };
    let isValid = true;

    if (!!!newContactName) {
      errors.newContactName = "Please enter your contact name";
      isValid = false;
    } else if (newContactName.length < 3) {
      errors.newContactName = "Contact name must be at least 3 characters long";
      isValid = false;
    } else if (newContactName.length > 100) {
      errors.newContactName =
        "Contact name must be at most 100 characters long";
      isValid = false;
    }

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
        organisationType: newOrganizationType,
        aboutUs: newAboutUs,
        hiringFor: newHiringFor,
      };
    } else if (index === 2) {
      data = {
        contactName: newContactName,
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
    updateOrganizationDetails(data, setUpdateResponse);
  }

  function handleDelete() {
    setIsImageDeleting(true);
    deleteProfilePicture(setDeleteResponse);
  }

  const renderOption1 = (
    <>
      <section className="box">
        <p className="heading">COMPANY PROFILE PICTURE</p>
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
        {/* <label className="label">
          Sample Text Field for Strings<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your String"
        />
        <label className="label" draggable>
          Sample Text Area for Long Description
          <span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          placeholder="Enter your long Description here"
        />
        <label className="label">
          Sample Text Field for Number<span className="required">*</span>
        </label>
        <input
          type="number"
          className="input-field"
          placeholder="Enter your Number"
        />
        <label className="label">
          Sample Dropdown<span className="required">*</span>
        </label>
        <select className="input-field">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="sigma">Sigma</option>
          <option value="alpha">Giga Chad</option>
        </select>
        <label className="label">
          Sample Datalist<span className="required">*</span>
        </label>
        <input
          className="input-field"
          list="browsers"
          name="browser"
          id="browser"
        />
        <datalist id="browsers">
          <option value="Edge"></option>
          <option value="Firefox"></option>
          <option value="Chrome"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
        </datalist>
        <label className="label">
          Sample Calendar<span className="required">*</span>
        </label>
        <input
          type="date"
          className="input-field"
          placeholder="Enter your Organization / Company Name"
        /> */}
        <label className="label">
          Organization / Company Name<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <label className="error-message">{errors.newName}</label>
        <label className="label">
          Organization / Company Sub-heading<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Sub-heading"
          value={newSubHeading}
          onChange={(e) => setNewSubHeading(e.target.value)}
        />
        <label className="error-message">{errors.newSubHeading}</label>

        <label className="label">
          Organization / Company Type<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Type"
          value={newOrganizationType}
          onChange={(e) => setNewOrganizationType(e.target.value)}
        />
        <label className="error-message">{errors.newOrganizationType}</label>

        <label className="label">
          About<span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          placeholder="Describe about your Organization / Company"
          value={newAboutUs}
          onChange={(e) => setNewAboutUs(e.target.value)}
        />
        <label className="error-message">{errors.newAboutUs}</label>
        <label className="label">
          Hiring for<span className="required">*</span>
        </label>
        <select
          className="input-field"
          value={newHiringFor}
          onChange={(e) => setNewHiringFor(e.target.value)}
        >
          <option key="Not Selected" value="Not Selected" disabled>
            Not Selected
          </option>
          {hiringForList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newHiringFor}</label>
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
          Contact Name<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Contact Name"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
        />
        <label className="error-message">{errors.newContactName}</label>
        <label className="label">
          Mobile Number<span className="required">*</span>
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
        <label className="error-message">{errors.newMobileCountryCode}</label>
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

  const companyEditProfile = (
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
            onClick={() => navigate(`/profile/organization/${organizationId}`)}
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
      companyEditProfile
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
