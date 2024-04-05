import { useState, useEffect } from "react";
import moment from "moment";
import "../Dashboard.css";
import "../EditProfile.css";
import "../CompanyDashboard/CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import getCookie from "../../../features/getCookieValues";
import axios from "axios";
import { CgLogOut } from "react-icons/cg";
import jwt_decode from "jwt-decode";

import { AiOutlinePlus } from "react-icons/ai";
import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Cookies from "js-cookie";

import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import BehanceIcon from '@mui/icons-material/Behance';
import { API_URLT, API_URL } from "../../../services/APIUtils";
import {
  deleteProfilePicture,
  patchProfilePicture,
  getAllCountries,
  getCitiesByState,
  getUserProfileById,
  getStatesByCountry,
  controller,
  getAllCampuses,
  getAllEngBranches,
  patchStudentData,
  updateUserDetails,
  addUserEducation,
  deleteUserEducation,
  addUserExperience,
  deleteUserExperience,
  addUserProject,
  deleteUserProject,
  addUserAchievement,
  deleteUserAchievement,
  addUserCertification,
  deleteUserCertification,
  patchResume,
} from "../../../services/APIConfig";
import { useRef } from "react";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { getAccessToken } from "../../../features/User/UserDetails";
import { handleLogout } from "../../../features/logout";
import Page404 from "../../Maintenance/Page404";
import LoadingPage from "../../../components/Loader/LoadingPage";
const UserEditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const fileInput = useRef(null);

  const [skillsRequired, setSkillsRequired] = useState([]);
  const [user, setUser] = useState({});
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newAboutMe, setNewAboutMe] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [experienceList, setExperienceList] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [achievementList, setAchievementList] = useState([]);
  const options = [
    "Basic Information",
    "Education Details",
    "Work Experience",
    "Projects",
    "Achievements",
    "Liscence & Certifications",
  ];
  const [chosenOption, setChosenOption] = useState(options[0]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [collegeId, setCollegeId] = useState("");
  const [newCampus, setNewCampus] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [workExperienceExists, setWorkExperienceExists] = useState(false);
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [cities, setCities] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [response, setResponse] = useState({});
  const [degree, setDegree] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [marks, setMarks] = useState("");
  const [educationExist, setEducationExist] = useState(false);
  const [projectExist, setProjectExist] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [deleteResponse, setDeleteResponse] = useState({});
  const [organisation, setOrganisation] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [workEnd, setWorkEnd] = useState("");
  const [designation, setDesignation] = useState("");
  const [validation, setValidation] = useState(true);
  const [fetchResponse, setFetchResponse] = useState({});
  const [patchEducationDetails, setPatchEducationDetails] = useState(false);
  const [updateUserResponse, setUpdateUserResponse] = useState({});
  const [updateEducationResponse, setUpdateEducationResponse] = useState({});
  const [updateCertificationResponse, setUpdateCertificationResponse] =
    useState({});
  const [updateAchievementResponse, setUpdateAchievementResponse] = useState(
    {}
  );
  const [deleteEducationResponse, setDeleteEducationResponse] = useState({});
  const [deleteAchievementResponse, setDeleteAchievementResponse] = useState(
    {}
  );
  const [deleteCertificationResponse, setDeleteCertificationResponse] =
    useState({});
  const [certificationList, setCertificationList] = useState([]);
  const [updateExperienceResponse, setUpdateExperienceResponse] = useState({});
  const [deleteExperienceResponse, setDeleteExperienceResponse] = useState({});
  const [updateProjectResponse, setUpdateProjectResponse] = useState({});
  const [deleteProjectResponse, setDeleteProjectResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [achievementName, setAchievementName] = useState("");
  const [achDescription, setAchDescription] = useState("");
  const [achDate, setAchDate] = useState("");
  const [achUrl, setAchUrl] = useState("");
  const [achErrors, setAchErrors] = useState({
    achievementName: "",
    achDescription: "",
    achDate: "",
    achUrl: "",
  });
  const [certificationName, setCertificationName] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [certErrors, setCertErrors] = useState({
    certificationName: "",
    issuedBy: "",
    issuedDate: "",
    certificateUrl: "",
  });
  const [certExist, setCertExist] = useState(false);
  const [achExist, setAchExist] = useState(false);
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [errors1, setErrors1] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    aboutMe: "",
    dateOfBirth: "",
    mobile: "",
  });
  const [errorWork, setErrorWork] = useState({
    designation: "",
    startYear: "",
    endYear: "",
    organisationName: "",
    country: "",
    state: "",
  });
  const [error2, setError2] = useState({
    degree: "",
    startYear: "",
    endYear: "",
    marks: "",
    specialization: "",
    campus: "",
    country: "",
    state: "",
  });
  const [errorProjects, setErrorProjects] = useState({
    projectTitle: "",
    projectDescription: "",
    projectLink: "",
  });
  const [errorSkills, setErrorSkills] = useState({
    skillsRequired: "",
  });
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setCurrentlyWorking(checked);
    setWorkEnd("");
  };

  function fetchData() {
    getUserProfileById(setUser, userId, setFetchResponse);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    getAllCountries(setCountries);
    getAllEngBranches(setBranches);
    getAllCampuses(setCampuses);
    return () => {
      controller.abort();
    };
  }, [userId]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      document.title = `Edit Profile | ${
        user?.role ? user.role : "User"
      } | engineerHUB`;
      setNewFirstName(user?.firstName);
      setNewLastName(user?.lastName);
      setEmail(user?.email);
      setNewMobile(user?.mobile);
      setNewGender(user?.gender);
      setNewDateOfBirth(user?.dateOfBirth?.substring(0, 10));
      setNewAboutMe(user?.aboutMe);
      setUserSkills(user?.skillsDetails);
      setEducationList(user?.educationDetails);
      setAchievementList(user?.achievementDetails);
      setCertificationList(user?.licenceDetails);
      setExperienceList(user?.experienceDetails);
      setProjectList(user?.projectDetails);
      setWorkExperienceExists(user?.experienceDetails?.length > 0);
      setProjectExist(user?.projectDetails?.length > 0);
      setEducationExist(user?.educationDetails?.length > 0);
      setAchExist(user?.achievementDetails?.length > 0);
      setCertExist(user?.licenceDetails?.length > 0);
    }
  }, [user]);

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

  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(userId, file, setResponse);
        setNewImage(null);
      } else {
        alert("Please choose an image file only");
      }
    }
  }, [newImage]);

  useEffect(() => {
    if (!!Object.keys(updateUserResponse).length) {
      setLoading(false);
      if (updateUserResponse.status >= 200 && updateUserResponse.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile updated successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in updating profile");
        setSnackbarOpen(true);
      }
      setUpdateUserResponse({});
    }
  }, [updateUserResponse]);

  useEffect(() => {
    if (!!Object.keys(updateEducationResponse).length) {
      setLoading(false);
      if (
        updateEducationResponse.status >= 200 &&
        updateEducationResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Education added successfully");
        setSnackbarOpen(true);
        setEducationExist(true);
        const decoded = jwt_decode(updateEducationResponse.data.accessToken);
        Cookies.set("access_token", updateEducationResponse.data.accessToken, {
          expires: 400,
        });
        Cookies.set("role", decoded.role, { expires: 400 });
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding education");
        setSnackbarOpen(true);
      }
      setUpdateEducationResponse({});
      setDegree("");
      setStartYear("");
      setEndYear("");
      setMarks("");
      setSpecialization("");
      setNewCampus("");
      setNewCountry("");
      setNewState("");
    }
  }, [updateEducationResponse]);

  useEffect(() => {
    if (!!Object.keys(updateAchievementResponse).length) {
      setLoading(false);
      if (
        updateAchievementResponse.status >= 200 &&
        updateAchievementResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Achievement added successfully");
        setSnackbarOpen(true);
        setAchExist(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding Achievement");
        setSnackbarOpen(true);
      }
      setUpdateAchievementResponse({});
      setAchievementName("");
      setAchDescription("");
      setAchDate("");
      setAchUrl("");
    }
  }, [updateAchievementResponse]);

  useEffect(() => {
    if (!!Object.keys(updateCertificationResponse).length) {
      setLoading(false);
      if (
        updateCertificationResponse.status >= 200 &&
        updateCertificationResponse.status < 300
      ) {
        fetchData();
        setSnackbarSeverity("success");
        setSnackbarMessage("Certification added successfully");
        setSnackbarOpen(true);
        setCertExist(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding Certification");
        setSnackbarOpen(true);
      }
      setUpdateCertificationResponse({});
      setCertificationName("");
      setIssuedBy("");
      setIssuedDate("");
      setCertificateUrl("");
    }
  }, [updateCertificationResponse]);
  useEffect(() => {
    if (!!Object.keys(deleteCertificationResponse).length) {
      setLoading(false);
      if (
        deleteCertificationResponse.status >= 200 &&
        deleteCertificationResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Certification deleted successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in deleting Certifications");
        setSnackbarOpen(true);
      }
      setDeleteCertificationResponse({});
    }
  }, [deleteCertificationResponse]);

  useEffect(() => {
    if (!!Object.keys(deleteEducationResponse).length) {
      setLoading(false);
      if (
        deleteEducationResponse.status >= 200 &&
        deleteEducationResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Education deleted successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in deleting Education");
        setSnackbarOpen(true);
      }
      setDeleteEducationResponse({});
    }
  }, [deleteEducationResponse]);

  useEffect(() => {
    if (!!Object.keys(deleteAchievementResponse).length) {
      setLoading(false);
      if (
        deleteAchievementResponse.status >= 200 &&
        deleteAchievementResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Achievement deleted successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in deleting Achievement");
        setSnackbarOpen(true);
      }
      setDeleteAchievementResponse({});
    }
  }, [deleteAchievementResponse]);
  useEffect(() => {
    if (!!Object.keys(updateExperienceResponse).length) {
      setLoading(false);
      if (
        updateExperienceResponse.status >= 200 &&
        updateExperienceResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Experience added successfully");
        setSnackbarOpen(true);
        setWorkExperienceExists(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding experience");
        setSnackbarOpen(true);
      }
      setUpdateExperienceResponse({});
      setDesignation("");
      setWorkStart("");
      setWorkEnd("");
      setOrganisation("");
      setNewCountry("");
      setNewState("");
    }
  }, [updateExperienceResponse]);

  useEffect(() => {
    if (!!Object.keys(deleteExperienceResponse).length) {
      setLoading(false);
      if (
        deleteExperienceResponse.status >= 200 &&
        deleteExperienceResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Experience deleted successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in deleting experience");
        setSnackbarOpen(true);
      }
      setDeleteExperienceResponse({});
    }
  }, [deleteExperienceResponse]);

  useEffect(() => {
    if (!!Object.keys(updateProjectResponse).length) {
      setLoading(false);
      if (
        updateProjectResponse.status >= 200 &&
        updateProjectResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Project added successfully");
        setSnackbarOpen(true);
        setProjectExist(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding project");
        setSnackbarOpen(true);
      }
      setUpdateProjectResponse({});
      setProjectTitle("");
      setProjectLink("");
      setProjectDescription("");
    }
  }, [updateProjectResponse]);

  useEffect(() => {
    if (!!Object.keys(deleteProjectResponse).length) {
      setLoading(false);
      if (
        deleteProjectResponse.status >= 200 &&
        deleteProjectResponse.status < 300
      ) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Project deleted successfully");
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in deleting project");
        setSnackbarOpen(true);
      }
      setDeleteProjectResponse({});
    }
  }, [deleteProjectResponse]);

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

  const handleSkillsChange = (_, value) => {
    setSkillsRequired(value);
  };
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    LinkedIn: "",
    Instagram: "",
    Twitter: "",
    GitHub: "",
    Behance: "",
  });

  const [showLink, setShowLink] = useState(false);
  const [errorLink, setErrorLink] = useState("");

  const toggleVisibility = () => {
    setShowLink(!showLink);
  };

  const handleChange = (platform, value) => {
    const updatedLinks = { ...socialMediaLinks, [platform]: value };
    setSocialMediaLinks(updatedLinks);
  };

  const handleBlur = () => {
    const enteredLinks = Object.values(socialMediaLinks).filter(
      (link) => link !== ""
    );
    if (enteredLinks.length > 3) {
      setErrorLink("You can only enter up to 3 social media links.");
    } else {
      setErrorLink("");
    }
  };

  function validateData1() {
    let isValid = true;
    let errors = {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      mobile: "",
      aboutMe: "",
    };

    if (!!!newFirstName) {
      errors.firstName = "Please enter your first Name";
      isValid = false;
    } else if (newFirstName.length < 3) {
      errors.firstName = "First Name must be at least 3 characters long";
      isValid = false;
    } else if (newFirstName.length > 50) {
      errors.firstName = "First Name must be at most 50 characters long";
      isValid = false;
    }
    if (!!!newLastName) {
      errors.lastName = "Please enter your last Name";
      isValid = false;
    } else if (newLastName.length < 3) {
      errors.lastName = "Last Name must be at least 3 characters long";
      isValid = false;
    } else if (newLastName.length > 50) {
      errors.lastName = "Last Name must be at most 50 characters long";
      isValid = false;
    }

    if (!!!newGender) {
      errors.gender = "Please enter your gender";
      isValid = false;
    }
    if (!!!newMobile) {
      errors.mobile = "Please enter your mobile Number";
      isValid = false;
    } else if (newMobile.toString()?.length !== 10) {
      errors.mobile = "Mobile number must be of 10 digits";
      isValid = false;
    }
    if (!!!newDateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }

    if (!!!newAboutMe) {
      errors.aboutMe = "Please enter your About me";
      isValid = false;
    } else if (newAboutMe.length < 3) {
      errors.aboutMe = "About me must be at least 3 characters long";
      isValid = false;
    } else if (newAboutMe.length > 1000) {
      errors.aboutMe = "About me must be at most 1000 characters long";
      isValid = false;
    }

    setErrors1(errors);
    return isValid;
  }

  function validateData2() {
    let error2 = {
      degree: "",
      startYear: "",
      endYear: "",
      marks: "",
      specialization: "",
      campus: "",
      country: "",
      state: "",
    };
    let isValid = true;
    if (!!!degree) {
      error2.degree = "Please select your Degree";
      isValid = false;
    }
    if (!!!startYear) {
      error2.startYear = "Please Input the start year";
      isValid = false;
    }
    if (!!!endYear) {
      error2.endYear = "Please Input the end year";
      isValid = false;
    }
    if (!!!marks) {
      error2.marks = "Please Input the marks";
      isValid = false;
    }
    if (!!!specialization) {
      error2.specialization = "Please select your specialization";
      isValid = false;
    }
    if (!!!newCampus) {
      error2.campus = "Please select your campus";
      isValid = false;
    }
    if (!!!newCountry) {
      error2.country = "Please select your country";
      isValid = false;
    }
    if (!!!newState) {
      error2.state = "Please select your state";
      isValid = false;
    }

    setError2(error2);
    return isValid;
  }

  function validateData3() {
    let errorWork = {
      designation: "",
      startYear: "",
      endYear: "",
      organisationName: "",
      country: "",
      state: "",
    };
    let isValid = true;

    if (!!!designation) {
      errorWork.designation = "Please enter the Designation";
      isValid = false;
    }
    if (!!!workStart) {
      errorWork.startYear = "Please enter the Start Year";
      isValid = false;
    }
    if (!currentlyWorking && !!!workEnd) {
      errorWork.endYear = "Please enter the End Year";
      isValid = false;
    }
    if (!!!organisation) {
      errorWork.organisationName = "Please enter the Organization name";
      isValid = false;
    }
    if (!!!newCountry) {
      errorWork.country = "Please select the country";
      isValid = false;
    }
    if (!!!newState) {
      errorWork.state = "Please select the state";
      isValid = false;
    }

    setErrorWork(errorWork);
    return isValid;
  }

  function validateData4() {
    let errors = {
      projectDescription: "",
      projectTitle: "",
      projectLink: "",
    };
    let isValid = true;

    if (!!!projectDescription) {
      errors.projectDescription = "Project description is required";
      isValid = false;
    } else if (projectDescription.length < 50) {
      errors.projectDescription =
        "Project Description must be of 50 characters";
      isValid = false;
    }
    if (!!!projectTitle) {
      errors.projectTitle = "Project title is Required";
      isValid = false;
    }
    if (!!!projectLink) {
      errors.projectLink = "Project link is Required!!!";
      isValid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(projectLink)) {
      errors.projectLink =
        "Invalid project link! (Ex: https://www.engineerhub.in/)";
      isValid = false;
    }
    setErrorProjects(errors);
    return isValid;
  }

  function validationDataCert() {
    let errors = {
      certificationName: "",
      certificateUrl: "",
      issuedBy: "",
      issuedDate: "",
    };
    let valid = true;
    if (!!!certificationName) {
      errors.certificationName = "Certification Name is Required";
      valid = false;
    }
    if (!!!certificateUrl) {
      errors.certificateUrl = "Certification URL is  Required";
      valid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(certificateUrl)) {
      errors.certificateUrl =
        "Certificate URL must be of the form ftp|http|https";
      valid = false;
    }
    if (!!!issuedBy) {
      errors.issuedBy = "Issued By which Organization is  Required";
      valid = false;
    }
    if (!!!issuedDate) {
      errors.issuedDate = "Issued date Required";
      valid = false;
    }
    setCertErrors(errors);
    return valid;
  }

  function validationDataAch() {
    let errors = {
      achievementName: "",
      achDescription: "",
      achDate: "",
      achUrl: "",
    };
    let valid = true;
    if (!!!achievementName) {
      errors.achievementName = "Achievement Name is Required";
      valid = false;
    }
    if (!!!achDescription) {
      errors.achDescription = "Achievement Description is  Required";
      valid = false;
    }
    if (!!!achDate) {
      errors.achDate = "Achievement Date is  Required";
      valid = false;
    }
    if (!!!achUrl) {
      errors.achUrl = "Achievement URL is  Required";
      valid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(achUrl)) {
      errors.achUrl = "Achievement URL must be of the form ftp|http|https";
      valid = false;
    }

    setAchErrors(errors);
    return valid;
  }
  function handleUpdateCertification() {
    let isValid = false;
    isValid = validationDataCert();
    if (!isValid) {
      return;
    }
    const data = {
      certificationName: certificationName,
      issuedBy: issuedBy,
      issuedDate: issuedDate,
      certificateUrl: certificateUrl,
    };
    setLoading(true);
    addUserCertification(data, setUpdateCertificationResponse);
    // window.location.reload(true);
  }
  function handleUpdateAchievement() {
    let isValid = false;

    isValid = validationDataAch();

    if (!isValid) {
      return;
    }
    const data = {
      achievementName: achievementName,
      description: achDescription,
      achievementDate: achDate,
      achievementUrl: achUrl,
    };
    setLoading(true);
    addUserAchievement(data, setUpdateAchievementResponse);
    // window.location.reload(true);
  }
  function handleUpdateEducation() {
    let isValid = false;

    isValid = validateData2();

    if (!isValid) {
      return;
    }

    const data = {
      degree: degree,
      collegeId: newCampus,
      startYear: startYear,
      endYear: endYear,
      marks: marks,
      specialization: specialization,
      country: newCountry,
      state: newState,
    };
    setLoading(true);
    addUserEducation(data, setUpdateEducationResponse);
  }

  function handleDeleteAchievement(_id) {
    setLoading(true);
    deleteUserAchievement(_id, setDeleteAchievementResponse);
  }
  function handleDeleteEducation(_id) {
    setLoading(true);
    deleteUserEducation(_id, setDeleteEducationResponse);
  }
  function handleDeleteCertification(_id) {
    setLoading(true);
    deleteUserCertification(_id, setDeleteCertificationResponse);
  }

  function handleUpdateExperience() {
    let isValid = false;

    isValid = validateData3();

    if (!isValid) {
      return;
    }

    const data = {
      designation: designation,
      startYear: workStart,
      organisationName: organisation,
      country: newCountry,
      state: newState,
    };
    if (currentlyWorking) {
      data.currentlyWorking = true;
    } else {
      data.endYear = workEnd;
    }
    setLoading(true);
    addUserExperience(data, setUpdateExperienceResponse);
  }

  function handleDeleteExperience(_id) {
    setLoading(true);
    deleteUserExperience(_id, setDeleteExperienceResponse);
  }

  function handleUpdateProject() {
    let isValid = false;

    isValid = validateData4();

    if (!isValid) {
      return;
    }

    const data = {
      projectLink: projectLink,
      projectDescription: projectDescription,
      projectTitle: projectTitle,
    };
    setLoading(true);
    addUserProject(data, setUpdateProjectResponse);
  }

  function handleDeleteProject(_id) {
    setLoading(true);
    deleteUserProject(_id, setDeleteProjectResponse);
  }

  function handleImageDelete() {
    setIsImageDeleting(true);
    deleteProfilePicture(setDeleteResponse);
  }

  // function validateSkills() {
  //   let errorSkills = {
  //     skillsRequired: "",
  //   };
  //   let valid = true;
  //   if (!!!skillsRequired) {
  //     errorSkills.skillsRequired = "Add skills they are required!!!";
  //   } else if (skillsRequired.split(" ").length < 5)
  //     errorSkills.skillsRequired = "Add atleast 5 skills";
  //   return valid;
  // }

  const handleChangeCollegeId = (e) => {
    // const { name, value } = e.target;
    setNewCampus(e.target.value);
  };

  // async function addSkills(e) {
  //   e.preventDefault;

  //   try {
  //     const response = await axios.post(
  //       `${API_URL}api/v1/add/skills`,
  //       skillsRequired,
  //       {
  //         headers: {
  //           accesstoken: getAccessToken(),
  //         },
  //       }
  //     );
  //     console.log(response);

  //     if (
  //       response.status === 200 ||
  //       response.status === 201 ||
  //       response.status === 202 ||
  //       response.status === 203 ||
  //       response.status === 204
  //     ) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     alert(error.response);

  //     console.log(error);
  //   }
  // }

  function handleSubmit(index) {
    let isValid = false;
    if (index === 1) {
      isValid = validateData1();
    }

    if (isValid === false) return;

    let data = {};

    if (index === 1) {
      data = {
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: newDateOfBirth,
        aboutMe: newAboutMe,
        mobile: newMobile,
        gender: newGender,
      };
    }
    setLoading(true);
    updateUserDetails(data, setUpdateUserResponse);
  }

  const renderOption1 = (
    <>
      <section className="box">
        <p className="heading">USER PROFILE PICTURE</p>
        <p className="md-alert-text">
          *Note Image size must be not more than 100kb
        </p>
        <div>
          <div className="logo">
            <img src={user?.image} loading="lazy" alt="logo" />
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
      <section className="box">
        <p className="heading">BASIC INFORMATION</p>

        <div className="row">
          <div className="col-lg-4">
            <label className="label">
              First Name<span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter you first name"
              name="firstName"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <label className="error-message">{errors1.firstName}</label>
          </div>
          <div className="col-lg-4">
            <label className="label">
              Last Name<span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your last name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <label className="error-message">{errors1.lastName}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <label className="label">Email Id</label>
            <input
              type="email"
              value={email}
              className="input-field"
              placeholder="Enter your email id"
              disabled
            />
            <label className="error-message"></label>
          </div>
          <div className="col-lg-4">
            <label className="label">
              Mobile No.<span className="required">*</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter your mobile number"
              maxLength={10}
              value={newMobile}
              onChange={(e) => setNewMobile(e.target.value)}
            />
            <label className="error-message">{errors1.mobile}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <label className="label">
              Gender<span className="required">*</span>
            </label>
            <select
              className="input-field"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            >
              <option value="" disabled>
                Not Selected
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <label className="error-message">{errors1.gender}</label>
          </div>
          <div className="col-lg-4">
            <label htmlFor="date" className="label">
              Date of Birth<span className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              className="input-field"
              placeholder="Enter your date of birth"
              value={newDateOfBirth}
              onChange={(e) => setNewDateOfBirth(e.target.value)}
            />
            <label className="error-message">{errors1.dateOfBirth}</label>
          </div>
        </div>
      </section>
      <section className="box">
        <p className="heading">ABOUT US</p>
        <label className="label">
          About<span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          value={newAboutMe}
          onChange={(e) => setNewAboutMe(e.target.value)}
          placeholder="Describe about yourself"
        />
        <label className="error-message">{errors1.aboutMe}</label>
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

  const renderEducation = (
    <>
      <section className="box">
        <p className="heading">EDUCATION DETAILS</p>
        {educationExist ? (
          <>
            {educationList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="row"
                  style={{
                    margin: "2%",
                  }}
                >
                  <div className="boxWork" style={{}}>
                    <div className="row">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          onClick={() => {
                            if (!loading) {
                              handleDeleteEducation(item._id);
                            }
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <DeleteOutlineIcon></DeleteOutlineIcon>
                        </div>
                      </div>
                      <div className="col-2 styleBox1" style={{}}>
                        <img
                          height={50}
                          width={50}
                          style={
                            {
                              // padding: "4px",
                            }
                          }
                          src={item?.collegeId?.collegeLogo}
                          alt=""
                        />
                      </div>

                      <div
                        className="col-2  styleBox2"
                        style={
                          {
                            // marginLeft:"5%",
                          }
                        }
                      >
                        <div className="row jobRole headingJob">
                          {item.collegeId.collegeName}
                        </div>

                        <div className="row companyName headingJob2">
                          {item.degree} / {item.specialization}
                        </div>
                        <div className="row duration headingJob2">
                          {item.startYear} - {item.endYear}
                        </div>
                        <div className="row jobLocation headingJob2">
                          {item.state} , {item.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="addButton"
              onClick={() => setEducationExist(false)}
              style={{
                border: "1px solid grey",
                width: "300px",
                height: "60px",
                borderRadius: "10px",
                color: "#002b36",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              {/* <div className="addIcon"> <AiOutlinePlus />     
              </div> */}
              Add New
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="">
                <label className="label">
                  Degree<span className="required">*</span>
                </label>
                <select
                  value={degree}
                  className="input-field"
                  onChange={(e) => setDegree(e.target.value)}
                >
                  <option value="">Select your Degree</option>
                  <option value="B.tech">B.E/Btech</option>
                  <option value="M.tech">M.E/Mtech</option>
                </select>
                <label className="error-message">{error2.degree}</label>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-3">
                <label className="label">
                  Start Year<span className="required">*</span>
                </label>
                <input
                  type="text"
                  min={1959}
                  max={2050}
                  className="input-field"
                  placeholder="Start Year"
                  onChange={(e) => setStartYear(e.target.value)}
                />
                <label className="error-message">{error2.startYear}</label>
              </div>
              <div className="col-lg-3">
                <label className="label">
                  End Year<span className="required">*</span>
                </label>
                <input
                  type="text"
                  min={1959}
                  max={2050}
                  className="input-field"
                  placeholder="End Year"
                  onChange={(e) => setEndYear(e.target.value)}
                />
                <label className="error-message">{error2.endYear}</label>
              </div>
              <div className="col-lg-3">
                <label className="label">
                  CGPA<span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="CGPA"
                  onChange={(e) => setMarks(e.target.value)}
                />
                <label className="error-message">{error2.marks}</label>
              </div>
            </div>

            <div className="row">
              <div className=" ">
                <label className="label">
                  Specialization
                  <span
                    className="required"
                    style={{
                      gap: "0",
                    }}
                  >
                    *
                  </span>
                </label>
                <select
                  className="input-field"
                  style={{
                    gap: "0",
                  }}
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="" disabled>
                    Select your specialization
                  </option>
                  <option value="Computer Science Engineering">
                    Computer Science Engineering
                  </option>
                  <option value="Electronics & Communication Engineering">
                    Electronics & Communication Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Biotechnology Engineering">
                    Biotechnology Engineering
                  </option>
                  <option value="Aerospace Engineering">
                    Aerospace Engineering
                  </option>
                  <option value="Artificial Intelligence and Machine Learning">
                    Artificial Intelligence and Machine Learning
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Automobile Engineering">
                    Automobile Engineering
                  </option>
                  <option value="Robotics Engineering">
                    Robotics Engineering
                  </option>
                  <option value="Mechatronics Engineering">
                    Mechatronics Engineering
                  </option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Production Engineering">
                    Production Engineering
                  </option>
                  <option value="Environmental Engineering">
                    Environmental Engineering
                  </option>
                  <option value="Telecommunication Engineering">
                    Telecommunication Engineering
                  </option>
                  <option value="Power Engineering">Power Engineering</option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="Structural Engineering">
                    Structural Engineering
                  </option>
                  <option value="Petroleum Engineering">
                    Petroleum Engineering
                  </option>
                  <option value="Communications Engineering">
                    Communications Engineering
                  </option>
                  <option value="Textile Engineering">
                    Textile Engineering
                  </option>
                  <option value="Marine Engineering">Marine Engineering</option>
                  <option value="Construction Engineering">
                    Construction Engineering
                  </option>
                  <option value="Food Technology">Food Technology</option>
                  <option value="Transportation Engineering">
                    Transportation Engineering
                  </option>
                  <option value="Ceramic Engineering">
                    Ceramic Engineering
                  </option>
                  <option value="Tool Engineering">Tool Engineering</option>
                  <option value="Industrial Engineering">
                    Industrial Engineering
                  </option>
                </select>
                <label className="error-message">{error2.specialization}</label>
              </div>
            </div>
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
              <label className="error-message">{error2.campus}</label>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label className="label">
                  Country<span className="required">*</span>
                </label>
                <select
                  value={newCountry}
                  disabled={!!!countries?.length}
                  onChange={(e) => {
                    setNewCountry(e.target.value);
                    setCountryParam(
                      countries.find(
                        (country) => country.country === e.target.value
                      ).countryCode
                    );
                  }}
                  className="input-field"
                >
                  {!!countries?.length && (
                    <option value="" disabled>
                      Select the country
                    </option>
                  )}
                  {countries.map((country) => (
                    <option key={country.countryCode} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
                <label className="error-message">{error2.country}</label>
              </div>
              <div className="col-lg-4">
                <label className="label">
                  State<span className="required">*</span>
                </label>
                <select
                  value={newState}
                  disabled={!!!states?.length}
                  onChange={(e) => {
                    setNewState(e.target.value);
                    setStateParam(
                      states.find((state) => state.state === e.target.value)
                        .stateCode
                    );
                  }}
                  className="input-field"
                >
                  {!!states?.length && (
                    <option value="" disabled>
                      Select the state
                    </option>
                  )}
                  {states.map((state) => (
                    <option key={state.stateCode} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
                <label className="error-message">{error2.state}</label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <button
                disabled={loading}
                onClick={() => handleUpdateEducation()}
                className="update-btn"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Add Education"
                )}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
  // const renderSkills = (
  //   <>
  //     <section className="box">
  //       <p className="heading">Skills</p>
  //       {userSkills ? (
  //         <>
  //           <form action="" onSubmit={addSkills}>
  //             <Autocomplete
  //               multiple
  //               options={[
  //                 "HTML",
  //                 "CSS",
  //                 "JavaScript",
  //                 "React",
  //                 "Node.js",
  //                 "Python",
  //                 "Java",
  //                 "C++",
  //                 " SQL",
  //                 "No-SQL",
  //                 "MongoDB",
  //                 "MERN",
  //                 "PHP",
  //                 "Web Development",
  //                 "Database Management",
  //                 "Ruby",
  //                 "Rust",
  //                 "Golang",
  //                 "Firebase",
  //                 "Heroku",
  //                 "azure",
  //                 "aws",
  //                 "DevOps",
  //                 "Data Analysis",
  //                 "Numpy",
  //                 "Pandas",
  //                 "Tensorflow",
  //                 "Keras",
  //                 "OpenCV",
  //                 "OpenGL",
  //                 "excel",
  //                 "pandas",
  //                 "tableu",
  //                 "powerBI",
  //                 "Cloud Computing",
  //                 "Google Cloud",
  //                 "Communication Skills",
  //                 "Problem-Solving",
  //                 "Teamwork and Collaboration",
  //                 "Adaptability",
  //                 "Leadership",
  //                 "Time Management",
  //                 "Creativity",
  //                 "Analytical Thinking",
  //                 "Emotional Intelligence",
  //                 "Continuous Learning",
  //               ]}
  //               freeSolo
  //               value={skillsRequired}
  //               onChange={handleSkillsChange}
  //               renderInput={(params) => (
  //                 <TextField
  //                   margin="normal"
  //                   style={{ width: "100%" }}
  //                   className="input-field"
  //                   {...params}
  //                   label="Required Skills*"
  //                 />
  //               )}
  //             />
  //             {errorSkills.skillsRequired && (
  //               <p className="" id=":rf:-helper-text"></p>
  //             )}
  //                         <div style={{
  //               display:"flex",
  //               justifyContent:"flex-end",
  //               alignItems:"flex-end",
  //             }}>
  //             <button type="submit" style={{
  //               border:"none",
  //               backgroundColor:"#002b36",
  //               borderRadius:"5px",
  //               padding:"5px 20px",

  //               color:"#fff",
  //               marginTop:"10px",
  //             }} onClick={()=>addSkills()}>
  //               Submit
  //             </button>
  //             </div>
  //           </form>
  //         </>
  //       ) : (
  //         <>
  //           sagar k pull
  //           <form action="" onSubmit={addSkills}>
  //             <Autocomplete
  //               multiple
  //               options={[
  //                 "HTML",
  //                 "CSS",
  //                 "JavaScript",
  //                 "React",
  //                 "Node.js",
  //                 "Python",
  //                 "Java",
  //                 "C++",
  //                 " SQL",
  //                 "No-SQL",
  //                 "MongoDB",
  //                 "MERN",
  //                 "PHP",
  //                 "Web Development",
  //                 "Database Management",
  //                 "Ruby",
  //                 "Rust",
  //                 "Golang",
  //                 "Firebase",
  //                 "Heroku",
  //                 "azure",
  //                 "aws",
  //                 "DevOps",
  //                 "Data Analysis",
  //                 "Numpy",
  //                 "Pandas",
  //                 "Tensorflow",
  //                 "Keras",
  //                 "OpenCV",
  //                 "OpenGL",
  //                 "excel",
  //                 "pandas",
  //                 "tableu",
  //                 "powerBI",
  //                 "Cloud Computing",
  //                 "Google Cloud",
  //                 "Communication Skills",
  //                 "Problem-Solving",
  //                 "Teamwork and Collaboration",
  //                 "Adaptability",
  //                 "Leadership",
  //                 "Time Management",
  //                 "Creativity",
  //                 "Analytical Thinking",
  //                 "Emotional Intelligence",
  //                 "Continuous Learning",
  //               ]}
  //               freeSolo
  //               value={skillsRequired}
  //               onChange={handleSkillsChange}
  //               renderInput={(params) => (
  //                 <TextField
  //                   margin="normal"
  //                   style={{ width: "100%" }}
  //                   className="input-field"
  //                   {...params}
  //                   label="Required Skills*"
  //                 />
  //               )}
  //             />
  //             {errorSkills.skillsRequired && (
  //               <p className="" id=":rf:-helper-text"></p>
  //             )}
  //             <button type="submit" onClick={()=>addSkills()}>
  //               Submit
  //             </button>
  //           </form>
  //         </>
  //       )}
  //     </section>
  //   </>
  // );

  const renderWork = (
    <>
      <section className="box">
        <p className="heading">WORK EXPERIENCE</p>

        {!workExperienceExists ? (
          <>
            <div className="row">
              <div className="">
                <label className="label">
                  Designation<span className="required">*</span>
                </label>
                <input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  type="text"
                  className="input-field"
                  placeholder="Enter your designation"
                />
                <label className="error-message">{errorWork.designation}</label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <label className="label">
                  Start Year<span className="required">*</span>
                </label>
                <input
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                  type="number"
                  min={1959}
                  max={2050}
                  className="input-field"
                  placeholder="Enter the starting year"
                  pattern="^(19[5-9]\d|20[0-4]\d|2050)$"
                  required
                />
                <label className="error-message">{errorWork.startYear}</label>
              </div>
              <div className="col-lg-5">
                <label className="label">
                  End Year<span className="required">*</span>
                </label>
                <input
                  disabled={currentlyWorking}
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                  type="number"
                  min={1959}
                  max={2050}
                  className="input-field"
                  placeholder={currentlyWorking ? "" : "Enter the ending year"}
                  pattern="^(19[5-9]\d|20[0-4]\d|2050)$"
                  required
                />
                <label className="error-message">{errorWork.endYear}</label>
              </div>
            </div>
            <div className="row">
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Currently Working
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="">
                <label className="label">
                  Organization Name<span className="required">*</span>
                </label>
                <input
                  value={organisation}
                  type="text"
                  onChange={(e) => setOrganisation(e.target.value)}
                  className="input-field"
                  placeholder="Enter organization name "
                />
                <label className="error-message">
                  {errorWork.organisationName}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label className="label">
                  Country<span className="required">*</span>
                </label>
                <select
                  value={newCountry}
                  disabled={!!!countries?.length}
                  onChange={(e) => {
                    setNewCountry(e.target.value);
                    setCountryParam(
                      countries.find(
                        (country) => country.country === e.target.value
                      ).countryCode
                    );
                  }}
                  className="input-field"
                >
                  {!!countries?.length && (
                    <option value="" disabled>
                      Select the country
                    </option>
                  )}
                  {countries.map((country) => (
                    <option key={country.countryCode} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
                <label className="error-message">{errorWork.country}</label>
              </div>
              <div className="col-lg-4">
                <label className="label">
                  State<span className="required">*</span>
                </label>
                <select
                  value={newState}
                  disabled={!!!states?.length}
                  onChange={(e) => {
                    setNewState(e.target.value);
                    setStateParam(
                      states.find((state) => state.state === e.target.value)
                        .stateCode
                    );
                  }}
                  className="input-field"
                >
                  {!!states?.length && (
                    <option value="" disabled>
                      Select the state
                    </option>
                  )}
                  {states.map((state) => (
                    <option key={state.stateCode} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
                <label className="error-message">{errorWork.state}</label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <button
                disabled={loading}
                onClick={() => handleUpdateExperience()}
                className="update-btn"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Add Experience"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {experienceList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="row"
                  style={{
                    margin: "5%",
                  }}
                >
                  <div className="boxWork" style={{}}>
                    <div className="row">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          onClick={() => {
                            if (!loading) {
                              handleDeleteExperience(item._id);
                            }
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <DeleteOutlineIcon></DeleteOutlineIcon>
                        </div>
                      </div>
                      <div className=" col-2  styleBox1">
                        <div
                          style={{
                            fontSize: "3rem",
                          }}
                        >
                          {item?.logo ? (
                            <img src={item?.logo} alt="" />
                          ) : (
                            <HiOutlineBuildingOffice2 />
                          )}
                        </div>
                      </div>
                      <div className="col-9 styleBox2">
                        <div className="row jobRole  headingJob" style={{}}>
                          {item.designation}
                        </div>
                        <div
                          className="row companyName  headingJob2"
                          style={{}}
                        >
                          {item.organisationName}
                        </div>
                        <div className="row duration  headingJob2">
                          {item.startYear} -{" "}
                          {item.currentlyWorking ? "Present" : item.endYear}
                        </div>
                        <div className="row jobLocation  headingJob2">
                          {item.state} , {item.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="addButton"
              onClick={() => setWorkExperienceExists(false)}
              style={{
                border: "1px solid grey",
                width: "300px",
                height: "60px",
                borderRadius: "10px",
                color: "#002b36",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              {/* <div className="addIcon">
                      <AiOutlinePlus />
                    </div> */}
              Add New
            </div>
          </>
        )}
      </section>
    </>
  );

  const renderProjects = (
    <>
      <section className="box">
        <p className="heading" style={{ fontSize: "1.2rem" }}>
          Projects
        </p>
        {projectExist ? (
          <>
            {projectList.map((item, index) => {
              return (
                <div key={index} className="row">
                  <div className="box outerBox" style={{}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (!loading) {
                            handleDeleteProject(item._id);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </div>
                    </div>
                    <div>
                      <p style={{}} className="headingProject">
                        {item.projectTitle}
                      </p>
                    </div>
                    <div>
                      <p style={{}} className="projectDes">
                        {item.projectDescription}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "auto",
                        }}
                      >
                        <Link to={item.projectLink}>{item.projectLink}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div
                className="addButton"
                onClick={() => setProjectExist(false)}
                style={{
                  border: "1px solid grey",
                  width: "300px",
                  height: "60px",
                  borderRadius: "10px",
                  color: "#002b36",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  margin: "auto",
                }}
              >
                <div className="addIcon">
                  <AiOutlinePlus />
                </div>
                Add New
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-5">
                <div className="">
                  <label className="label">
                    Project Title<span className="required">*</span>
                  </label>
                  <input
                    value={projectTitle}
                    type="text"
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="input-field"
                    placeholder="Enter your project title"
                  />
                  <label className="error-message">
                    {errorProjects.projectTitle}
                  </label>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="">
                  <label className="label">
                    Project Link<span className="required">*</span>
                  </label>
                  <input
                    value={projectLink}
                    type="text"
                    onChange={(e) => setProjectLink(e.target.value)}
                    className="input-field"
                    placeholder="Enter your project link"
                  />
                  <label className="error-message">
                    {errorProjects.projectLink}
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <label className="label">
                    Project Description<span className="required">*</span>
                  </label>
                  <input
                    value={projectDescription}
                    type="text"
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="input-field"
                    placeholder="Enter your project description"
                  />
                  <label className="error-message">
                    {errorProjects.projectDescription}
                  </label>
                </div>
              </div>
            </div>
            <button
              disabled={loading}
              onClick={() => handleUpdateProject()}
              className="update-btn"
            >
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Add Project"
              )}
            </button>
          </>
        )}
      </section>
    </>
  );
  const renderAchievements = (
    <>
      <section className="box">
        <p className="heading">ACHIEVEMENT DETAILS</p>
        {achExist ? (
          <>
            {achievementList.map((item, index) => {
              return (
                <div key={index} className="row">
                  <div className="box outerBox" style={{}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (!loading) {
                            handleDeleteAchievement(item._id);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </div>
                    </div>
                    <div>
                      <p style={{}} className="headingProject">
                        {item.achievementName}
                      </p>
                    </div>
                    <div>
                      <p style={{}} className="projectDes">
                        {moment(item.achievementDate)
                          .utc()
                          .format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <div>
                      <p style={{}} className="projectDes">
                        {item.description}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "auto",
                        }}
                      >
                        <Link to={item.achievementUrl}>
                          {item.achievementUrl}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="addButton"
              onClick={() => setAchExist(false)}
              style={{
                border: "1px solid grey",
                width: "300px",
                height: "60px",
                borderRadius: "10px",
                color: "#002b36",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              {/* <div className="addIcon"> <AiOutlinePlus />     
              </div> */}
              Add New
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <label className="label">
                    Achievement Name<span className="required">*</span>
                  </label>
                  <input
                    value={achievementName}
                    type="text"
                    onChange={(e) => setAchievementName(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Achievement Name"
                  />
                  <label className="error-message">
                    {achErrors.achievementName}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="">
                  <label className="label">
                    Achievement Date<span className="required">*</span>
                  </label>
                  <input
                    value={achDate}
                    type="date"
                    onChange={(e) => setAchDate(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Achievement Date"
                  />
                  <label className="error-message">{achErrors.achDate}</label>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="">
                  <label className="label">
                    Achievement Url<span className="required">*</span>
                  </label>
                  <input
                    value={achUrl}
                    type="text"
                    onChange={(e) => setAchUrl(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Achievement Url"
                  />
                  <label className="error-message">{achErrors.achUrl}</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <label className="label">
                    Achievement Description<span className="required">*</span>
                  </label>
                  <input
                    value={achDescription}
                    type="text"
                    onChange={(e) => setAchDescription(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Achievement Name"
                  />
                  <label className="error-message">
                    {achErrors.achDescription}
                  </label>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <button
                disabled={loading}
                onClick={() => handleUpdateAchievement()}
                className="update-btn"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Add Achievement"
                )}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
  const renderCertification = (
    <>
      <section className="box">
        <p className="heading"> Certifications</p>
        {certExist ? (
          <>
            {certificationList.map((item, index) => {
              return (
                <div key={index} className="row">
                  <div className="box outerBox" style={{}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (!loading) {
                            handleDeleteCertification(item._id);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </div>
                    </div>
                    <div>
                      <p style={{}} className="headingProject">
                        {item.certificationName}
                      </p>
                    </div>
                    <div>
                      <p style={{}} className="projectDes">
                        {item.issuedBy}
                      </p>
                    </div>
                    <div>
                      <p style={{}} className="projectDes">
                        {moment(item.issuedDate).utc().format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "auto",
                        }}
                      >
                        <Link to={item.certificateUrl}>
                          {item.certificateUrl}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div
                className="addButton"
                onClick={() => setCertExist(false)}
                style={{
                  border: "1px solid grey",
                  width: "300px",
                  height: "60px",
                  borderRadius: "10px",
                  color: "#002b36",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  margin: "auto",
                }}
              >
                <div className="addIcon">
                  <AiOutlinePlus />
                </div>
                Add New
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <label className="label">
                    Certification Name<span className="required">*</span>
                  </label>
                  <input
                    value={certificationName}
                    type="text"
                    onChange={(e) => setCertificationName(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Certification Name"
                  />
                  <label className="error-message">
                    {certErrors.certificationName}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="">
                  <label className="label">
                    Issued Date<span className="required">*</span>
                  </label>
                  <input
                    value={issuedDate}
                    type="date"
                    onChange={(e) => setIssuedDate(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Certificate Issue Date"
                  />
                  <label className="error-message">
                    {certErrors.issuedDate}
                  </label>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="">
                  <label className="label">
                    Certification Url<span className="required">*</span>
                  </label>
                  <input
                    value={certificateUrl}
                    type="text"
                    onChange={(e) => setCertificateUrl(e.target.value)}
                    className="input-field"
                    placeholder="Enter your Certificate Url"
                  />
                  <label className="error-message">
                    {certErrors.certificateUrl}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <label className="label">
                    Issued By<span className="required">*</span>
                  </label>
                  <input
                    value={issuedBy}
                    type="text"
                    onChange={(e) => setIssuedBy(e.target.value)}
                    className="input-field"
                    placeholder="Enter the name certificate Issuing organization"
                  />
                  <label className="error-message">{certErrors.issuedBy}</label>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <button
                disabled={loading}
                onClick={() => handleUpdateCertification()}
                className="update-btn"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Add Certification"
                )}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
  // const renderSocialLinks = (
  //   <>
  //     <section className="box">
  //       <p className="heading" style={{ fontSize: "1.2rem" }}>
  //         Projects
  //       </p>

  //       <div>
  //         <div>
  //           <TextField
  //             label="LinkedIn"
  //             variant="outlined"
  //             value={socialMediaLinks.LinkedIn}
  //             onChange={(e) => handleChange("LinkedIn", e.target.value)}
  //             onBlur={handleBlur}
  //             error={errorLink !== "" && socialMediaLinks.LinkedIn === ""}
  //             helperText={
  //               errorLink !== "" && socialMediaLinks.LinkedIn === ""
  //                 ? errorLink
  //                 : ""
  //             }
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <LinkedInIcon />
  //                 </InputAdornment>
  //               ),
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton onClick={toggleVisibility}>
  //                     {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //               type: showLink ? "text" : "password",
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <TextField
  //             label="Instagram"
  //             variant="outlined"
  //             value={socialMediaLinks.Instagram}
  //             onChange={(e) => handleChange("Instagram", e.target.value)}
  //             onBlur={handleBlur}
  //             error={errorLink !== "" && socialMediaLinks.Instagram === ""}
  //             helperText={
  //               errorLink !== "" && socialMediaLinks.Instagram === ""
  //                 ? errorLink
  //                 : ""
  //             }
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <InstagramIcon />
  //                 </InputAdornment>
  //               ),
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton onClick={toggleVisibility}>
  //                     {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //               type: showLink ? "text" : "password",
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <TextField
  //             label="Twitter"
  //             variant="outlined"
  //             value={socialMediaLinks.Twitter}
  //             onChange={(e) => handleChange("Twitter", e.target.value)}
  //             onBlur={handleBlur}
  //             error={errorLink !== "" && socialMediaLinks.Twitter === ""}
  //             helperText={
  //               errorLink !== "" && socialMediaLinks.Twitter === ""
  //                 ? errorLink
  //                 : ""
  //             }
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <TwitterIcon />
  //                 </InputAdornment>
  //               ),
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton onClick={toggleVisibility}>
  //                     {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //               type: showLink ? "text" : "password",
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <TextField
  //             label="GitHub"
  //             variant="outlined"
  //             value={socialMediaLinks.GitHub}
  //             onChange={(e) => handleChange("GitHub", e.target.value)}
  //             onBlur={handleBlur}
  //             error={errorLink !== "" && socialMediaLinks.GitHub === ""}
  //             helperText={
  //               errorLink !== "" && socialMediaLinks.GitHub === ""
  //                 ? errorLink
  //                 : ""
  //             }
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <GitHubIcon />
  //                 </InputAdornment>
  //               ),
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton onClick={toggleVisibility}>
  //                     {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //               type: showLink ? "text" : "password",
  //             }}
  //           />
  //         </div>
  //         {/* <TextField
  //       label="Behance"
  //       variant="outlined"
  //       value={socialMediaLinks.Behance}
  //       onChange={e => handleChange('Behance', e.target.value)}
  //       onBlur={handleBlur}
  //       error={error !== '' && socialMediaLinks.Behance === ''}
  //       helperText={error !== '' && socialMediaLinks.Behance === '' ? error : ''}
  //       InputProps={{
  //         startAdornment: (
  //           <InputAdornment position="start">
  //             <BehanceIcon />
  //           </InputAdornment>
  //         ),
  //         endAdornment: (
  //           <InputAdornment position="end">
  //             <IconButton onClick={toggleVisibility}>
  //               {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //             </IconButton>
  //           </InputAdornment>
  //         ),
  //         type: showLink ? 'text' : 'password',
  //       }}
  //     /> */}
  //       </div>
  //     </section>
  //   </>
  // );

  const userEditProfile = (
    <>
      <main className="edit-profile profile-dashboard">
        <h1 className="title">Edit Profile</h1>
        <h2 className="subheading">
          {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
          faucibus platea feugiat odio. */}
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
              onClick={() => navigate(`/profile/user/${userId}`)}
              className="back-btn"
            >
              <IoIosArrowBack /> <span>Back to Profile</span>
            </button>
            <button onClick={() => handleLogout()} className="logout-button">
              <CgLogOut /> <span>Logout</span>
            </button>
          </aside>
          {chosenOption === options[0] && <div>{renderOption1}</div>}
          {chosenOption === options[1] && <div> {renderEducation}</div>}
          {/* {chosenOption === options[2] && <div>{renderSkills}</div>} */}
          {chosenOption === options[2] && <div> {renderWork}</div>}
          {chosenOption === options[3] && <div> {renderProjects}</div>}
          {chosenOption === options[4] && <div> {renderAchievements}</div>}
          {chosenOption === options[5] && <div>{renderCertification}</div>}
        </div>
      </main>
    </>
  );

  return !!Object.keys(fetchResponse).length ? (
    fetchResponse?.status >= 200 && fetchResponse?.status <= 300 ? (
      userEditProfile
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
};

export default UserEditProfile;
