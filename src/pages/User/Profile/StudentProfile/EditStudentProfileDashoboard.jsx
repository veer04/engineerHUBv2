import { useState, useEffect } from "react";
import "../../../../pages/Profile/Dashboard.css";
import "../../../../pages/Profile/EditProfile.css";
import "../../../../pages/Profile/CompanyDashboard/CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { getAccessToken } from "../../../../features/getCookieValues";
import getCookie from "../../../../features/getCookieValues";
import axios from "axios";
import { CgLogOut } from "react-icons/cg";
import collegeSVG from "./collegeSVG.png";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EditIcon from '@mui/icons-material/Edit';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import BehanceIcon from '@mui/icons-material/Behance';
import { API_URLT, API_URL } from "../../../../services/APIUtils";
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
} from "../../../../services/APIConfig";
import countryCodes from "../../../../assets/countryCodes";
import { useRef } from "react";
import { handleLogout } from "../../../../features/logout";
const 
EditStudentProfileDashoboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const fileInput = useRef(null);
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [user, setUser] = useState({});
  const [experienceList, setExperienceList] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const options = [
    "Basic Information",
    "Education Details",
    
    "Work Experience",
    "Projects",
    
  ];
  const [chosenOption, setChosenOption] = useState(options[0]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [collegeId, setCollegeId] = useState("");
  const [newCampus, setNewCampus] = useState("");
  const [projectTitle,setProjectTitle] = useState("");
  const [projectLink,setProjectLink]= useState("");
  const [projectDescription,setProjectDescription]= useState("");
  const [workExperienceExists, setWorkExperienceExists] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const imageProfile = getCookie("image")[2];
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [cities, setCities] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [response, setResponse] = useState(null);
  const [degree, setDegree] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [marks, setMarks] = useState("");
  const [educationExist, setEducationExist] = useState(false);
  const [projectExist, setProjectExist] = useState(false);
  const [specialization, setSpecialization] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [organisation, setOrganisation] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [projectList,setProjectList] = useState([]);
  const [workEnd, setWorkEnd] = useState("");
  const [designation, setDesignation] = useState("");
  const [validation, setValidation] = useState(true);
  const [patchEducationDetails,setPatchEducationDetails]=useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    aboutMe: "",
    dateOfBirth: "",
    mobile: "",
  });
  const [error2, setError2] = useState({
    degree: "",
    startYear: "",
    endYear: "",
    marks: "",
    specialization: "",
    campuses: "",
    country: "",
  });
  const [errorProjects,setErrorProjects]=useState({
    projectTitle:"",
    projectDescription:"",
    projectLink:"",

  })
  const [errorSkills, setErrorSkills] = useState({
    skillsRequired: "",
  });
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setCurrentlyWorking(checked);
  };
  useEffect(() => {
    const controller = new AbortController();
    getUserProfileById(setUser, userId);
    console.log("hiii");
    getAllCountries(setCountries);
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllEngBranches(setBranches);
    getAllCampuses(setCampuses);

    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserSkills(user?.skillsDetails);
      setEducationList(user?.educationDetails);
      setExperienceList(user?.experienceDetails);
      setProjectList(user?.projectDetails);
      if(Object.keys(projectList).length > 0)
      {
        setProjectExist(true);
      }
      if (Object.keys(educationList).length > 0) {
        setEducationExist(true);
      }
    }
    console.log(user);
    console.log(educationList);
    console.log(experienceList);
    console.log(educationExist);
  }, [user]);
  useEffect(() => {
    if (!!response) {
      getUserProfileById(setUser, userId);
    }
    setIsImageLoading(false);
    return () => {
      controller.abort();
    };
  }, [response]);
  useEffect(() => {
    if (!!deleteResponse) {
      getUserProfileById(setUser, userId);
    }
  }, [deleteResponse]);
  useEffect(() => {
    if (!!newImage) {
      if (newImage.type.includes("image")) {
        setIsImageLoading(true);
        console.log(newImage);
        const file = new FormData();
        file.append("profileImage", newImage);
        patchProfilePicture(userId, file, setResponse);
      } else {
        alert("Please choose an image file only");
      }
    }
  }, [newImage]);

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
    LinkedIn: '',
    Instagram: '',
    Twitter: '',
    GitHub: '',
    Behance: '',
  });

  const [showLink, setShowLink] = useState(false);
  const [errorLink, setErrorLink] = useState('');

  const toggleVisibility = () => {
    setShowLink(!showLink);
  };

  const handleChange = (platform, value) => {
    const updatedLinks = { ...socialMediaLinks, [platform]: value };
    setSocialMediaLinks(updatedLinks);
  };

  const handleBlur = () => {
    const enteredLinks = Object.values(socialMediaLinks).filter(link => link !== '');
    if (enteredLinks.length > 3) {
      setErrorLink('You can only enter up to 3 social media links.');
    } else {
      setErrorLink('');
    }
  };
  function validateDate2() {
    let error2 = {
      degree: "",
      startYear: "",
      endYear: "",
      marks: "",
      specialization: "",
      campuses: "",
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
    if (!!!marks) {
      error2.marks = "Please Input the marks";
      isValid = false;
    }
    if (!!!specialization) {
      error2.specialization = "Please select your specialization";
      isValid = false;
    }

    setError2((prev) => ({ ...prev, ...error2 }));
    return isValid;
  }

  function validateData1() {
    let errors = {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      mobile: "",
      aboutMe: "",
    };
    let isValid = true;

    if (!!!firstName) {
      errors.firstName = "Please enter your first Name";
      isValid = false;
    } else if (firstName.length < 3) {
      errors.firstName = "First Name must be at least 3 characters long";
      isValid = false;
    } else if (firstName.length > 27) {
      errors.firstName = "First Name must be at most 27 characters long";
      isValid = false;
    }
    if (!!!lastName) {
      errors.lastName = "Please enter your first Name";
      isValid = false;
    } else if (lastName.length < 3) {
      errors.lastName = "Last Name must be at least 3 characters long";
      isValid = false;
    } else if (lastName.length > 27) {
      errors.lastName = "Last Name must be at most 27 characters long";
      isValid = false;
    }

    if (!!!gender) {
      errors.gender = "Please enter your gender";
      isValid = false;
    }
    if (!!!mobile) {
      errors.mobile = "Please enter your mobile Number";
      isValid = false;
    } else if (mobile.length < 10) {
      errors.mobile = "mobile number must be of 10 digits";
    }
    if (!!!dateOfBirth) {
      errors.dateOfBirth = "date of birth is required";
      isValid = false;
    }

    if (!!!aboutMe) {
      errors.aboutMe = "Please enter your Organization / Company Description";
      isValid = false;
    } else if (aboutMe.length < 3) {
      errors.aboutMe = "Company Description must be at least 3 characters long";
      isValid = false;
    } else if (aboutMe.length > 1000) {
      errors.aboutMe =
        "Company Description must be at most 1000 characters long";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  }
  function validateProject()
  {
    let errors={
      projectDescription:"",
      projectTitle:"",
      projectLink:"",
    };
    let isValid=true;
    if(!!!projectDescription)
    {
      errorProjects.projectDescription="Project Description is Required!!!";
      isValid =false;

    }
    else if(projectDescription.length<30)
    {
      errorProjects.projectDescription="Project Description must be of 30 characters!!!";
      isValid=false;
    }
    if(!!!projectTitle)
    {
      errorProjects.projectTitle="Project Title is Required !!!";
      isValid=false;
    }
    if(!!!projectLink)
    {
      errorProjects.projectLink="project Link is Required!!!";
      isValid=false;
    }
    else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(projectLink)) {
      errorProjects.projectLink =
        "Invalid Project Link! (Ex: https://www.engineerhub.in/)";
      valid = false;
    }
    setErrorProjects((prev) => ({ ...prev, ...errorProjects }));
    return isValid;

  }
  

  function deleteWork(itemId) {
   
    axios.delete(
         `${API_URL}api/v1/delete/experience/${itemId}`,
         {
           headers: {
             accesstoken: getAccessToken(),
           },
         }
       ).then((response)=>
       {  if (
         response.status === 200 ||
         response.status === 201 ||
         response.status === 202 ||
         response.status === 203 ||
         response.status === 204
       ) {
       
         navigate("/login");
       }
       }).catch((err)=>{
         console.log(err);
       });
       
     }

     function deleteProject(itemId) {
   
      axios.delete(
           `${API_URL}api/v1/delete/projectDetails/${itemId}`,
           {
             headers: {
               accesstoken: getAccessToken(),
             },
           }
         ).then((response)=>
         {  if (
           response.status === 200 ||
           response.status === 201 ||
           response.status === 202 ||
           response.status === 203 ||
           response.status === 204
         ) {
         
           navigate("/login");
         }
         }).catch((err)=>{
           console.log(err);
         });
         
       }

 function deleteEducation(itemId) {
   
   axios.delete(
        `${API_URL}api/v1/delete/education/${itemId}`,
        {
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      ).then((response)=>
      {  if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 203 ||
        response.status === 204
      ) {
      
        navigate("/");
      }
      }).catch((err)=>{
        console.log(err);
      });
      
    }

  async function updateEducation(e) {
    e.preventDefault();

    const formEdu = {
      degree: degree,
      collegeId: newCampus,
      startYear: startYear,
      endYear: endYear,
      marks: marks,
      specialization: specialization,
      country: newCountry,
      state: stateParam,
    };

    try {
      const response = await axios.post(
        `${API_URL}api/v1/add/education`,
        formEdu,
        {
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );
      console.log(response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 203 ||
        response.status === 204
      ) {
        setEducationExist(true);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response);

      console.log(error);
    }
  }
  async function addWork(e) {
    e.preventDefault();
    const data = {
      designation: designation,
      startYear: workStart,
      currentlyWorking: false,
      // marks: "8.11",
      organisationName: organisation,
      country: newCountry,
      state: stateParam,
      endYear:workEnd,
    };
    try {
      const response = await axios.post(
        `${API_URL}api/v1/add/experience`,
        data,
        {
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );
      console.log(response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 203 ||
        response.status === 204
      ) {
        setWorkExperienceExists(true);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response);

      console.log(error);
    }
  }
  async function addProject(e)
  {
    e.preventDefault();
    const data ={
      projectLink:projectLink,
      projectDescription:projectDescription,
      projectTitle:projectTitle,
    };

    if(validateProject())
    {
      try {
        const response = await axios.post(
          `${API_URL}api/v1/add/projectDetails`,
          data,
          {
            headers: {
              accesstoken: getAccessToken(),
            },
          }
        );
        console.log(response);
  
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202 ||
          response.status === 203 ||
          response.status === 204
        ) {
          setProjectExist(true);
          navigate("/login");
        }
      } catch (error) {
        alert(error.response);
  
        console.log(error);
      }
    }


  }
  function handleDelete() {
    deleteProfilePicture(setDeleteResponse);
  }

  async function updateBasic(e) {
    e.preventDefault();
    // const form = new FormData();
    // form.append("firstName", firstName);
    // form.append("lastName", lastName);
    // form.append("dateOfBirth", dateOfBirth);
    // form.append("aboutMe", aboutMe);
    // form.append("mobile", mobile);
    // form.append("gender", gender);
    const form = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      aboutMe: aboutMe,
      mobile: mobile,
      gender: gender,
    };

    if (validateData1() === true) {
      try {
        const response = await axios.patch(
          `${API_URL}api/v1/user/profileUpdate`,
          form,
          {
            headers: {
              accesstoken: getAccessToken(),
            },
          }
        );
        console.log(response);

        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202 ||
          response.status === 203 ||
          response.status === 204
        ) {
          navigate("/");
        }
      } catch (error) {
        alert(error.response);
        setValidation(false);
        console.log(error);
      }
    }
  }

  function validateSkills() {
    let errorSkills = {
      skillsRequired: "",
    };
    let valid = true;
    if (!!!skillsRequired) {
      errorSkills.skillsRequired = "Add skills they are required!!!";
    } else if (skillsRequired.split(" ").length < 5)
      errorSkills.skillsRequired = "Add atleast 5 skills";
    return valid;
  }
  const handleChangeCollegeId = (e) => {
    // const { name, value } = e.target;
    setNewCampus(e.target.value);
  };
  async function addSkills(e) {
    e.preventDefault;

    try {
      const response = await axios.post(
        `${API_URL}api/v1/add/skills`,
        skillsRequired,
        {
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );
      console.log(response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 203 ||
        response.status === 204
      ) {
        navigate("/");
      }
    } catch (error) {
      alert(error.response);

      console.log(error);
    }
  }
  function addEdu() {
    setEducationExist(true);
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
            <img src={imageProfile} loading="lazy" alt="logo" />
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
      <form action="" onSubmit={updateBasic}>
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
                placeholder={user?.firstName}
                name="first Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="error-message">{errors.firstName}</label>
            </div>
            <div className="col-lg-4">
              <label className="label">
                Last Name<span className="required">*</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder={user?.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="error-message">{errors.lastName}</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <label className="label">
                Email Id<span className="required">*</span>
              </label>
              <input
                type="email"
                value={user?.email}
                className="input-field"
                placeholder="Enter your String"
              />
            </div>
            <div className="col-lg-4">
              <label className="label">
                Mobile No.<span className="required">*</span>
              </label>
              <input
                type="number"
                className="input-field"
                placeholder=""
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label className="error-message">{errors.mobile}</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <label className="label">
                Gender<span className="required">*</span>
              </label>
              <select
                className="input-field"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <label className="error-message">{errors.gender}</label>
            </div>
            <div className="col-lg-4">
              <label htmlFor="date" className="label">
                Date of Birth<span className="required">*</span>
              </label>
              <input
                type="date"
                id="date"
                className="input-field"
                placeholder="Enter your String"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <label className="error-message">{errors.dateOfBirth}</label>
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
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="Describe about your Organization / Company"
          />
          <label className="error-message">{errors.aboutMe}</label>
          <div style={{
                display:"flex",
                justifyContent:"flex-end",
                alignItems:"flex-end",
              }}>
              <button type="submit" style={{
                border:"none",
                backgroundColor:"#002b36",
                borderRadius:"5px",
                padding:"5px 20px",
                
                color:"#fff",
                marginTop:"10px",
              }} onClick={()=>updateBasic()}>
                Update Details
              </button>
              </div>
        </section>
      </form>
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
                  className="row"
                  style={{
                    margin: "2%",
                  }}
                >
                  <div
                    className="boxWork"
                    style={{
                   
                    
                     
                    }}
                  >
                    <div className="row">
                    <div
                        style={{
                          display:"flex",
                          justifyContent:"flex-end",
                          alignItems:"flex-start",
                        }}>

                        
                   <div onClick={()=>deleteEducation(item._id)} style={{
                    cursor:"pointer",
                   }}  >
                   <DeleteOutlineIcon></DeleteOutlineIcon>
                  </div>
                  </div>
                      <div
                        className="col-2 styleBox1"
                        style={{

                        }}
                      >
                        <img
                          height={50}
                          width={50}
                          style={{

                            // padding: "4px",
                            
                          }}
                          src={item.collegeId.collegeLogo}
                          alt=""
                        />
                        
                      </div>
           
                      <div className="col-2  styleBox2"
                      style={{
                        // marginLeft:"5%",
                      }}
                      >
                        <div
                          className="row jobRole headingJob"
                     
                        >
                          {item.collegeId.collegeName}
                        </div>
             
                        <div
                          className="row companyName headingJob2"
                    
                        >
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
                margin:"auto",
              
              }}
            >
              {/* <div className="addIcon"> <AiOutlinePlus />     
              </div> */}
               Add New
            </div>
          </>
        ) : (
          <>
            <form action="" onSubmit={(e)=>updateEducation(e)}>
              <div className="row">
                <div className="">
                  <label className="label">
                    Degree<span className="required">*</span>
                  </label>
                  <select
                    className="input-field"
                    onChange={(e) => setDegree(e.target.value)}
                  >
                    <option value="default">Select Degree</option>
                    <option value="B.tech">Btech</option>
                    <option value="M.tech">Mtech</option>
                  </select>
                  <label className="error-message">{error2.degree}</label>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-3">
                  <label className="label">
                    Date of Start<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your String"
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                  <label className="error-message">{error2.startYear}</label>
                </div>
                <div className="col-lg-3">
                  <label className="label">
                    Date of End<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your String"
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
                    placeholder="Enter your String"
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
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                  <label className="error-message">
                    {error2.specialization}
                  </label>
                </div>
              </div>
              <div className="row">
                <label className="label">
                  Institute/College Name<span className="required">*</span>
                </label>
                <select 
                  className="input-field"
                  labelId="campus-name"
                  id="student-signup-campus-select"
                  label="Institution Name"
                  name="institutionName"
                  value={newCampus}
                  onChange={handleChangeCollegeId}
                >
                  {campuses.map((campus) => (
                    <option key={campus._id} value={campus._id}>
                      {campus.collegeName}
                    </option>
                  ))}
                </select>
                <label className="error-message">{error2.campuses}</label>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <label className="label">
                    Country<span className="required">*</span>
                  </label>
                  <select
                    value={newCountry}
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
                    {countries.map((country) => (
                      <option key={country.countryCode} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  {/* <label className="error-message">{error2.country}</label> */}
                </div>
                <div className="col-lg-4">
                  <label className="label">
                    State<span className="required">*</span>
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => {
                      setNewState(e.target.value);
                      setStateParam(
                        states.find((state) => state.state === e.target.value)
                          .stateCode
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
                  {/* <label className="error-message">{error2.state}</label> */}
                </div>
              </div>
              <div style={{
                display:"flex",
                justifyContent:"flex-end",
                alignItems:"flex-end",
              }}>
              <button type="submit" style={{
                border:"none",
                backgroundColor:"#002b36",
                borderRadius:"5px",
                padding:"5px 20px",
                
                color:"#fff",
                marginTop:"10px",
              }} onClick={()=>updateEducation()}>
                Submit
              </button>
              </div>
            </form>
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

        {workExperienceExists ? (
          <>
            <form action="" onSubmit={addWork()}>
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
                    placeholder="Enter your String"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <label className="label">
                    From Year<span className="required">*</span>
                  </label>
                  <input
                    value={workStart}
                    onChange={(e) => setWorkStart(e.target.value)}
                    type="text"
                    className="input-field"
                    placeholder="Enter your String"
                  />
                </div>
                <div className="col-lg-5">
                  <label className="label">
                    To Year<span className="required">*</span>
                  </label>
                  <input
                    value={workEnd}
                    onChange={(e) => setWorkEnd(e.target.value)}
                    type="text"
                    className="input-field"
                    placeholder="Enter your String"
                  />
                </div>
                <div className="">
                  {/* <div className="form-check">
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
                  </div> */}
                </div>
              </div>
              <div className="row"
              >
                <div className="">
                  <label className="label">
                    Organization Name<span className="required">*</span>
                  </label>
                  <input
                    value={organisation}
                    type="text"
                    onChange={(e) => setOrganisation(e.target.value)}
                    className="input-field"
                    placeholder="Enter your String"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <label className="label">
                    Country<span className="required">*</span>
                  </label>
                  <select
                    value={newCountry}
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
                    {countries.map((country) => (
                      <option key={country.countryCode} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  {/* <label className="error-message">{error2.country}</label> */}
                </div>
                <div className="col-lg-4">
                  <label className="label">
                    State<span className="required">*</span>
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => {
                      setNewState(e.target.value);
                      setStateParam(
                        states.find((state) => state.state === e.target.value)
                          .stateCode
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
                  {/* <label className="error-message">{error2.state}</label> */}
                </div>
              </div>
              <div style={{
                display:"flex",
                justifyContent:"flex-end",
                alignItems:"flex-end",
              }}>
              <button type="submit" style={{
                border:"none",
                backgroundColor:"#002b36",
                borderRadius:"5px",
                padding:"5px 20px",
                
                color:"#fff",
                marginTop:"10px",
              }} onClick={()=>addWork()}>
                Submit
              </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {experienceList.map((item, index) => {
              return (
                <div className="row"
                style={{
                  margin:"5%",
                }}>
                  <div
                    className="boxWork"
                    style={{
                    
                    }}
                  >
             
                    <div className="row">
                    <div
                        style={{
                          display:"flex",
                          justifyContent:"flex-end",
                          alignItems:"flex-start",
                        }}>

                        
                   <div onClick={()=>deleteWork(item._id)} style={{
                    cursor:"pointer",
                   }}  >
                   <DeleteOutlineIcon></DeleteOutlineIcon>
                  </div>
                  </div>
                      <div
                        className=" col-2  styleBox1"

                      >
                        <div style={{
                          fontSize:"3rem",
                        }}>
                       {experienceList?.logo ? (
                          <img  src={experienceList?.logo} alt="" />
                        ) : (
                          <HiOutlineBuildingOffice2  />
                        )}
                      </div>
                      </div>
                      <div className="col-9 styleBox2">
                        <div
                          className="row jobRole  headingJob"
                          style={{
                     
                          }}
                        >
                          {item.designation}
                        </div>
                        <div
                          className="row companyName  headingJob2"
                          style={{
                          
                          }}
                        >
                          {item.organisationName}
                        </div>
                        <div className="row duration  headingJob2">
                          {item.startYear}-{item.endYear}
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
                    onClick={() => setWorkExperienceExists(true)}
                    style={{
                      border: "1px solid grey",
                      width: "300px",
                      height: "60px",
                      borderRadius: "10px",
                      color: "#002b36",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin:"auto",
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
          {
            projectList.map((item,index)=>{
              return (
                <div className="row">
                  
                <div className="box outerBox"
                style={{
                 
                }}>
                  <div
                        style={{
                          display:"flex",
                          justifyContent:"flex-end",
                          alignItems:"flex-start",
                        }}>

                        
                   <div onClick={()=>deleteProject(item._id)} style={{
                    cursor:"pointer",
                   }}  >
                   <DeleteOutlineIcon></DeleteOutlineIcon>
                  </div>
                  </div>
                  <div>
                    <p style={{
                    
    
                    }}  className="headingProject">
                      {item.projectTitle}
    
                    </p>
                  </div>
                  <div>
                    <p style={{
                 
                    }}
                    className="projectDes">{item.projectDescription}
                    </p>
                  </div>
                  <div>
                    <p style={{
                      margin:"auto",
                    }}>
                      <Link to={item.projectLink}>
                       {item.projectLink}
                      </Link>
                    </p>
                  </div>
    
                </div>
              </div>
              )
            })
          }
       

          <div className="row">
              <div
                className="addButton"
                onClick={() => setProjectExist(true)}
                style={{
                  border: "1px solid grey",
                  width: "300px",
                  height: "60px",
                  borderRadius: "10px",
                  color: "#002b36",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              
                    margin:"auto",
                  
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
              <form action="" onSubmit={addProject}>
           <div className="row"
              >
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
                    placeholder="Enter your String"
                  />
                  <label className="error-message">{errorProjects.projectTitle}</label>
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
                    placeholder="Enter your String"
                  />
                  <label className="error-message">{errorProjects.projectLink}</label>
                </div>
                </div>
              </div>
       
              <div className="row"
              >
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
                    placeholder="Enter your String"
                  />
                  <label className="error-message">{errorProjects.projectDescription}</label>
                  </div>
                </div>
              </div>
              <button
              style={{
                marginTop:"2%",
              }} type="submit"
              onClick={()=>addProject()}>
                submit

              </button>
              </form>
            </>
        )}
      </section>


      
 
    </>
  );
  const renderSocialLinks = (<>
  
  <section className="box">
        <p className="heading" style={{ fontSize: "1.2rem" }}>
          Projects
        </p>
        
    <div>
      <div>
    <TextField
        label="LinkedIn"
        variant="outlined"
        value={socialMediaLinks.LinkedIn}
        onChange={e => handleChange('LinkedIn', e.target.value)}
        onBlur={handleBlur}
        error={errorLink !== '' && socialMediaLinks.LinkedIn === ''}
        helperText={errorLink !== '' && socialMediaLinks.LinkedIn === '' ? errorLink : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          type: showLink ? 'text' : 'password',
        }}
      />
      </div>
      <div>
      <TextField
        label="Instagram"
        variant="outlined"
        value={socialMediaLinks.Instagram}
        onChange={e => handleChange('Instagram', e.target.value)}
        onBlur={handleBlur}
        error={errorLink !== '' && socialMediaLinks.Instagram === ''}
        helperText={errorLink !== '' && socialMediaLinks.Instagram === '' ? errorLink : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InstagramIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          type: showLink ? 'text' : 'password',
        }}
      />
      </div>
      <div>
      <TextField
        label="Twitter"
        variant="outlined"
        value={socialMediaLinks.Twitter}
        onChange={e => handleChange('Twitter', e.target.value)}
        onBlur={handleBlur}
        error={errorLink !== '' && socialMediaLinks.Twitter === ''}
        helperText={errorLink !== '' && socialMediaLinks.Twitter === '' ? errorLink : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TwitterIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          type: showLink ? 'text' : 'password',
        }}
      />
      </div>
      <div>
      <TextField
        label="GitHub"
        variant="outlined"
        value={socialMediaLinks.GitHub}
        onChange={e => handleChange('GitHub', e.target.value)}
        onBlur={handleBlur}
        error={errorLink !== '' && socialMediaLinks.GitHub === ''}
        helperText={errorLink !== '' && socialMediaLinks.GitHub === '' ? errorLink : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GitHubIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          type: showLink ? 'text' : 'password',
        }}
      />
      </div>
      {/* <TextField
        label="Behance"
        variant="outlined"
        value={socialMediaLinks.Behance}
        onChange={e => handleChange('Behance', e.target.value)}
        onBlur={handleBlur}
        error={error !== '' && socialMediaLinks.Behance === ''}
        helperText={error !== '' && socialMediaLinks.Behance === '' ? error : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BehanceIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {showLink ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          type: showLink ? 'text' : 'password',
        }}
      /> */}
    </div>
  

</section>
  </>);
  return (
    <>
      <main className="edit-profile profile-dashboard">
        <h1 className="title">Edit Profile</h1>
        <h2 className="subheading">
          Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
          faucibus platea feugiat odio.
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
              onClick={() =>
                navigate(`/profile/organization/${organizationId}`)
              }
              className="back-btn"
            >
              <IoIosArrowBack /> <span>Back to Profile</span>
            </button>
            <button className="logout-button">
              <CgLogOut /> <span>Logout</span>
            </button>
          </aside>
          {chosenOption === options[0] && <div>{renderOption1}</div>}
          {chosenOption === options[1] && <div> {renderEducation}</div>}
          {/* {chosenOption === options[2] && <div>{renderSkills}</div>} */}
          {chosenOption === options[2] && <div> {renderWork}</div>}
          {chosenOption === options[3] && <div> {renderProjects}</div>}
          {chosenOption === options[4] && <div> {renderSocialLinks}</div>}
        </div>
      </main>
    </>
  );
};

export default EditStudentProfileDashoboard;
