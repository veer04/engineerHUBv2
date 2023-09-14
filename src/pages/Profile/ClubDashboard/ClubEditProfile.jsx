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
  getClubProfileById,
  getStatesByCountry,
  patchProfilePicture,
} from "../../../services/APIConfig";
import countryCodes from "../../../assets/countryCodes";
import { useRef } from "react";
import { handleLogout } from "../../../features/logout";

export default function ClubEditProfile() {
  const [organization, setOrganization] = useState(null);
  const navigate = useNavigate();
  const { clubId } = useParams();
  const options = ["Basic Information", "Contact Information", "Location"];
  const [chosenOption, setChosenOption] = useState(options[0]);
  const fileInput = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSubHeading, setNewSubHeading] = useState("");
  const [newOrganizationType, setNewOrganizationType] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
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
  const [response, setResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
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
    // window.scrollTo(0, 0);
    getClubProfileById(setOrganization, clubId);
    getAllCountries(setCountries);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        console.log(newImage);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(clubId, file, setResponse);
      } else {
        alert("Please choose an image file only");
      }
    }
  }, [newImage]);

  useEffect(() => {
    if (!!response) {
      getClubProfileById(setOrganization, clubId);
    }
    setIsImageLoading(false);
    return () => {
      controller.abort();
    };
  }, [response]);

  useEffect(() => {
    if (!!deleteResponse) {
      getClubProfileById(setOrganization, clubId);
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (countryParam) {
      getStatesByCountry(setStates, countryParam);
    } else if (newCountry) {
      getStatesByCountry(
        setStates,
        countries?.find((country) => country.country === newCountry)
          ?.countryCode
      );
    }

    return () => {
      controller.abort();
    };
  }, [countryParam, newCountry]);

  useEffect(() => {
    if (stateParam) {
      getCitiesByState(setCities, countryParam, stateParam);
    } else if (newState) {
      getCitiesByState(
        setCities,
        countries?.find((country) => country.country === newCountry)
          ?.countryCode,
        states?.find((state) => state.state === newState)?.stateCode
      );
    }

    return () => {
      controller.abort();
    };
  }, [stateParam, newState]);

  useEffect(() => {
    if (organization) {
      setNewName(organization?.name);
      setNewSubHeading(organization?.subHeading);
      setNewOrganizationType(organization?.organisationType);
      setNewAboutUs(organization?.aboutUs);
      setNewHiringFor(organization?.hiringFor);
      setNewCountry(organization?.country);
      setNewState(organization?.state);
      setNewCity(organization?.city);
      setNewContactName(organization?.contactName);
      setNewMobileCountryCode(organization?.mobileCountryCode);
      setNewMobileNumber(organization?.mobile);
      setNewWebsite(
        !!organization?.websiteUrl
          ? organization?.websiteUrl
          : organization?.webSiteURL
      );
      setNewLinkedin(organization?.linkedIn);
    }
    console.log("organization", organization);
  }, [organization]);

  useEffect(() => {
    console.log("newName", newName);
  }, [newName]);

  useEffect(() => {
    console.log("newSubHeading", newSubHeading);
  }, [newSubHeading]);

  useEffect(() => {
    console.log("newOrganizationType", newOrganizationType);
  }, [newOrganizationType]);

  useEffect(() => {
    console.log("newWebsite", newWebsite);
  }, [newWebsite]);

  useEffect(() => {
    console.log("newAboutUs", newAboutUs);
  }, [newAboutUs]);

  useEffect(() => {
    console.log("newHiringFor", newHiringFor);
  }, [newHiringFor]);

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

    if (!!!newOrganizationType) {
      errors.newOrganizationType = "Please enter your Club Type";
      isValid = false;
    } else if (newOrganizationType.length < 3) {
      errors.newOrganizationType =
        "Club Type must be at least 3 characters long";
      isValid = false;
    } else if (newOrganizationType.length > 100) {
      errors.newOrganizationType =
        "Club Type must be at most 100 characters long";
      isValid = false;
    }

    if (!!!newAboutUs) {
      errors.newAboutUs = "Please enter your Club Description";
      isValid = false;
    } else if (newAboutUs.length < 3) {
      errors.newAboutUs = "Club Description must be at least 3 characters long";
      isValid = false;
    } else if (newAboutUs.length > 1000) {
      errors.newAboutUs =
        "Club Description must be at most 1000 characters long";
      isValid = false;
    }

    if (!!!newHiringFor || newHiringFor === "Not Selected") {
      errors.newHiringFor = "Please select your Hiring For";
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
    }
  }

  function handleDelete() {
    deleteProfilePicture(setDeleteResponse);
  }

  const renderOption1 = (
    <>
      <section className="box">
        <p className="heading">CLUB PROFILE PICTURE</p>
        <p className="md-alert-text">
          *Note Image size must be not more than 100kb
        </p>
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
              onClick={() => fileInput.current.click()}
              disabled={isImageLoading}
            >
              Upload New
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              disabled={isImageLoading}
            >
              Delete
            </button>
            <p className="alert-text">
              *Note Image size must be not more than 100kb
            </p>
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
        <select className="input-field">
          <option key="Not Selected" value="Not Selected">
            Not Selected
          </option>
          {hiringForList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newHiringFor}</label>
        <button onClick={() => handleSubmit(1)} className="update-btn">
          Update Details
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
        <div>
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
        <button onClick={() => handleSubmit(2)} className="update-btn">
          Update Details
        </button>
      </section>
    </>
  );
  const renderOption3 = (
    <>
      <section className="box">
        <p className="heading">LOCATION</p>
        <label className="label">
          Country<span className="required">*</span>
        </label>
        <select
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
          value={newState}
          onChange={(e) => {
            setNewState(e.target.value);
            setStateParam(
              states.find((state) => state.state === e.target.value).stateCode
            );
          }}
          className="input-field"
        >
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
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="input-field"
        >
          {cities.map((city) => (
            <option key={city.cityCode} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.newCity}</label>

        <button onClick={() => handleSubmit(3)} className="update-btn">
          Update Details
        </button>
      </section>
    </>
  );

  return (
    <main className="edit-profile profile-dashboard">
      <h1 className="title">Edit Profile</h1>
      <h2 className="subheading">
        Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio.
      </h2>
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
            onClick={() => navigate(`/profile/organization/${clubId}`)}
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
}
