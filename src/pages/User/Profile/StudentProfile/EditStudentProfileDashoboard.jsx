import { useState, useEffect } from "react";
import "../../../../pages/Profile/Dashboard.css";
import "../../../../pages/Profile/EditProfile.css";
import "../../../../pages/Profile/CompanyDashboard/CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { CgLogOut } from "react-icons/cg";
import {AiOutlinePlus} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Autocomplete,
} from "@mui/material";
import { API_URLT } from "../../../../services/APIUtils";
import { deleteProfilePicture,
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
const EditStudentProfileDashoboard = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const fileInput = useRef(null);
    const [skillsRequired,setSkillsRequired]=useState([]);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [user,setUser]=useState(null);
    const options = ["Basic Information","Education Details","Skills","Work Experience","Projects","Social Links"];
    const [chosenOption, setChosenOption] = useState(options[0]);
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const [campuses, setCampuses] = useState([]);
    
    const [workExperienceExists,setWorkExperienceExists]=useState(true);
    const [projectExists,setProjectExists]=useState(true);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [mobile,setMobile]=useState("");
    const [gender,setGender]=useState("");
    
    const [dateOfBirth,setDateOfBirth]=useState("");
    const [aboutMe,setAboutMe]=useState("");
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
    const [deleteResponse, setDeleteResponse] = useState(null);
    const [validation,setValidation]=useState(true);
    const [errors, setErrors] = useState({
      firstName:"",
      lastName:"",
      gender:"",
      aboutMe:"",
      dateOfBirth:"",
      mobile:"",
    });
    const [error2,setError2]=useState({
      degree:"",
      startYear:"",
      endYear:"",
      marks:"",
      specialization:"",
      collegeId:"",
      country:"",
    })
    const handleCheckboxChange = (event) => {
      const { checked } = event.target;
      setCurrentlyWorking(checked);
    };
    useEffect(() => {
      // window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
      // window.scrollTo(0, 0);
  getUserProfileById(setUser, userId);
      getAllCountries(setCountries);
      return () => {
        controller.abort();
      };
    }, []);
    useEffect(() => {
      window.scrollTo(0, 0);
      getAllEngBranches(setBranches);
      getAllCampuses(setCampuses);
  
      return () => {
        controller.abort();
      };
    }, []);
    useEffect(()=>
    {
      console.log(user);
    },[user])
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
      }   return () => {
        controller.abort();
      };
    }, [countryParam, newCountry]);

    const handleSkillsChange = (_, value) => {
      setSkillsRequired(value);
    };
  
    function validateData1() {
      let errors = {
      firstName:"",
      lastName:"",
      gender:"",
      dateOfBirth:"",
      mobile:"",
      aboutMe:"",
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
      } 
      else if(mobile.length<10)
      {
        errors.mobile="mobile number must be of 10 digits";
      }
      if(!!!dateOfBirth)
      {
        errors.dateOfBirth="date of birth is required";
        isValid=false;
      }
  
      if (!!!aboutMe) {
        errors.aboutMe =
          "Please enter your Organization / Company Description";
        isValid = false;
      } else if (aboutMe.length < 3) {
        errors.aboutMe =
          "Company Description must be at least 3 characters long";
        isValid = false;
      } else if (aboutMe.length > 1000) {
        errors.aboutMe =
          "Company Description must be at most 1000 characters long";
        isValid = false;
      }
  
      setErrors((prev) => ({ ...prev, ...errors }));
      return isValid;
    }


    function handleDelete() {
      deleteProfilePicture(setDeleteResponse);
    }
    async function updateBasic(e){
      e.preventDefault();
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName",lastName);
    form.append("dateOfBirth",dateOfBirth);
    form.append("aboutMe",aboutMe);
    form.append("mobile",mobile);
    form.append("gender",gender);
    const formEdu =new FormData();
    formEdu.append("collegeId",campuses);
    if(validateData1()===true)
    {
      try
      {
        const response = await axios.patch(`${API_URLT}api/v1/user/profileUpdate`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        });
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

      }
      catch(error){
        alert(error.response);
        setValidation(false);
        console.log(error);
      }
    }

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
                <img
                  src={user?.image}
                  loading="lazy"
                  alt="logo"
                />
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
                >Upload New</button>
                <button
                 onClick={() => {
                   handleDelete();
                 }}
                 disabled={isImageLoading}
                >Delete</button>
                <p className="alert-text">
                  *Note Image size must be not more than 100kb
                </p>
              </div>
            </div>
          </section>
          <form action=""  onSubmit={updateBasic}>
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
              onChange={(e)=>setFirstName(e.target.value)}
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
              onChange={(e)=>setLastName(e.target.value)}
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
              onChange={(e)=>setMobile(e.target.value)}
            /><label className="error-message">{errors.mobile}</label>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                <label className="label">
            Gender<span className="required">*</span>
            </label>
            <select className="input-field"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="sigma">Sigma</option>
              <option value="alpha">Giga Chad</option>
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
              onChange={(e)=>setDateOfBirth(e.target.value)}
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
              onChange={(e)=>setAboutMe(e.target.value)}
              placeholder="Describe about your Organization / Company"
            />
            <label className="error-message">{errors.aboutMe}</label>
            <button className="update-btn"
            onClick={updateBasic}>Update Details</button>
          </section>
          </form>
        </>
      );

      const renderEducation=(
        <>
                 <section className="box">
            <p className="heading">EDUCATION DETAILS</p>
        
     
            <div className="row">
                <div className="">
                <label className="label">
            Degree<span className="required">*</span>
            </label>
            <select className="input-field">
                <option value="default">Select Degree</option>
              <option value="B.tech">Btech</option>
              <option value="M.tech">Mtech</option>
        
            </select>
                </div>
        
            </div>
            <br />
            <div className="row">
                <div className="col-lg-3">
                <label className="label">
              Date of Start<span className="required">*</span>
            </label>
            <input
              type="date"
              className="input-field"
              placeholder="Enter your String"
            />
                </div>
                <div className="col-lg-3">

                <label className="label">
              Date of End<span className="required">*</span>
            </label>
            <input
              type="date"
              className="input-field"
              placeholder="Enter your String"
            />
                </div>
                <div className="col-lg-3">
                <label className="label">
              CGPA<span className="required">*</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter your String"
            />
                </div>
            </div>

            <div className="row">
            <div className=" ">
            <label className="label">
            Specialization<span className="required"
            style={{
              gap:"0",
            }}>*</span>
            </label>
            <select className="input-field"
                style={{
                  gap:"0",
                }}
            // value={gender}
            // onChange={(e)=>setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="sigma">Sigma</option>
              <option value="alpha">Giga Chad</option>
            </select>
            </div>
            </div>
            <div className="row">   
           <label className="label">
       Institute/College Name<span className="required">*</span>
       </label>
       <select
          labelId="campus-name"
          id="student-signup-campus-select"
          required
          value={campuses}
          label="Institution Name"
          name="institutionName"
          onChange={(e)=>e.target.value}
      
        >
          {campuses.map((campus) => (
            <option key={campus._id} value={campus._id}>
              {campus.collegeName}
            </option>
          ))}
        </select>
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
       </div>

       </div>
          </section>
        </>
      )
      const renderSkills=(<>
         <section className="box">
            <p className="heading">Skills</p>
            <div className="">
        <Autocomplete
          multiple
          options={[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "Java",
            "C++",
            " SQL",
            "No-SQL",
            "MongoDB",
            "MERN",
            "PHP",
            "Web Development",
            "Database Management",
            "Ruby",
            "Rust",
            "Golang",
            "Firebase",
            "Heroku",
            "azure",
            "aws",
            "DevOps",
            "Data Analysis",
            "Numpy",
            "Pandas",
            "Tensorflow",
            "Keras",
            "OpenCV",
            "OpenGL",
            "excel",
            "pandas",
            "tableu",
            "powerBI",
            "Cloud Computing",
            "Google Cloud",
            "Communication Skills",
            "Problem-Solving",
            "Teamwork and Collaboration",
            "Adaptability",
            "Leadership",
            "Time Management",
            "Creativity",
            "Analytical Thinking",
            "Emotional Intelligence",
            "Continuous Learning",
          ]}
          freeSolo
          value={skillsRequired}
          onChange={handleSkillsChange}
          renderInput={(params) => (
            <TextField margin="normal"  className="input-field"{...params} label="Required Skills*" />
          )}
        />
        {errors.skillsRequired && (
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
            id=":rf:-helper-text"
          >
            
          </p>
        )}
      </div>
      </section>
      </>)
      const renderWork=(<>

      <section className="box">
            <p className="heading">WORK EXPERIENCE</p>
        
            {
        workExperienceExists?(<>
        <div className="row">
            <div className="boxWork"
                style={{
                    border:"1px solid grey",
                    borderRadius:"5px",
                    padding:"2%",
                }}>
                <div className="row">
                    <div className="col-lg-2"
                           style={{
                            border:"1px solid grey",
                            borderRadius:"5px",
                            width:"80px",
                            height:"80px",
                            marginRight:"10px",
                            marginRight:"10px",
                            marginTop:"10px",

                        }}
                ></div>
                    <div className="col-lg-10">
                        <div className="row jobRole"
                        style={{
                            color:"#002b36 ",
                            fontSize:"1.2rem",
                            fontWeight:"600",
                            lineHeight:"2rem",
                        }}>Software II</div>
                        <div className="row companyName"
                        style={{
                            color:"#002b36",
                            fontSize:"1.0rem",
                            fontWeight:"600",
                        }}>Microsoft Internship </div>
                        <div className="row duration">APR 2023-Currently *2 yrs and 3months</div>
                        <div className="row jobLocation">Mumbai , India</div>
                    </div>
                </div>
            </div>
            <div className="addButton"
            onClick={()=>setWorkExperienceExists(false)}
            style={{
                border:"1px solid grey",
                width:"300px",
                height:"60px",
                borderRadius:"10px",
                color:"#002b36",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",

            }}>
                <div className="addIcon">
                <AiOutlinePlus/>
                </div>
                Add New
            </div>
        </div>
        
        </>):(<>

            <div className="row">
            <div className="">
                <label className="label">
              Designation<span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your String"
            />
            </div>
        
            </div>
     <div className="row">
      <div className="col-lg-3">
        <label className="label">
          From Year<span className="required">*</span>
        </label>
        <input
          type="date"
          className="input-field"
          placeholder="Enter your String"
        />
      </div>
      <div className="col-lg-3">
        <label className="label">
          To Year<span className="required">*</span>
        </label>
        <input
          type="date"
          className="input-field"
          placeholder="Enter your String"
          disabled={currentlyWorking}
        />
      </div>
      <div className="col-lg-3">
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
              type="text"
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
       <select className="input-field">
         <option value="male">India</option>
         <option value="female">Austrilia</option>
         <option value="sigma">England</option>
         <option value="alpha">China</option>
       </select>
       </div>
       <div className="col-lg-4">
       <label className="label">
       State<span className="required">*</span>
       </label>
       <select className="input-field">
         <option value="male">UP</option>
         <option value="female">UK</option>
         <option value="sigma">Delhi</option>
         <option value="alpha">Karnataka</option>
       </select>
       </div>

       </div>

        </>)
     }   

          </section>


      </>)
      const renderProjects=(<>
            <section className="box">
            <p className="heading"
            style={{fontSize:"1.2rem"}}>Projects</p>
          {
            projectExists?(<>
            <div className="row">
                        <div className="addButton"
                        onClick={()=>setProjectExists(false)}
            style={{
                border:"1px solid grey",
                width:"300px",
                height:"60px",
                borderRadius:"10px",
                color:"#002b36",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",

            }}>
                <div className="addIcon">
                <AiOutlinePlus/>
                </div>
                Add New
            </div>
            </div>
            </>):(<>
            


            </>)
          }

            </section>
      </>)
      const renderSocialLinks=(<>
      Social Links
      </>)
  return (
    <>
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
            onClick={() => navigate(`/profile/organization/${organizationId}`)}
            className="back-btn"
          >
            <IoIosArrowBack /> <span>Back to Profile</span>
          </button>
          <button className="logout-button">
            <CgLogOut /> <span>Logout</span>
          </button>
        </aside>
        {chosenOption === options[0]&&<div>{ renderOption1}</div>}
        {chosenOption === options[1] &&<div> {renderEducation}</div>}
        {chosenOption === options[2] && <div>{renderSkills}</div>}
        {chosenOption === options[3] &&<div> {renderWork}</div>}
        {chosenOption === options[4] && <div> {renderProjects}</div>}     
        {chosenOption === options[5] && <div> {renderSocialLinks}</div>}   
      </div>
    </main>
    </>
  )
}

export default EditStudentProfileDashoboard