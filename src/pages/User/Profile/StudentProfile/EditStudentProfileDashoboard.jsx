import { useState, useEffect } from "react";
import "../../../../pages/Profile/Dashboard.css";
import "../../../../pages/Profile/EditProfile.css";
import "../../../../pages/Profile/CompanyDashboard/CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { CgLogOut } from "react-icons/cg";
import {AiOutlinePlus} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { API_URLT } from "../../../../services/APIUtils";
const EditStudentProfileDashoboard = () => {
    const navigate = useNavigate();
    const { organizationId } = useParams();
    const options = ["Basic Information","Education Details","Skills","Work Experience","Projects","Social Links"];
    const [chosenOption, setChosenOption] = useState(options[0]);
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const [workExperienceExists,setWorkExperienceExists]=useState(true);
    const [projectExists,setProjectExists]=useState(true);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [mobile,setMobile]=useState("");
    const [gender,setGender]=useState("");
    const [dateOfBirth,setDateOfBirth]=useState("");
    const [aboutMe,setAboutMe]=useState("");
    const [validation,setValidation]=useState(false);
    const handleCheckboxChange = (event) => {
      const { checked } = event.target;
      setCurrentlyWorking(checked);
    };
    useEffect(() => {
      // window.scrollTo(0, 0);
    }, []);


    async function updateBasic(){
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName",lastName);
    form.append("dateOfBirth",dateOfBirth);
    form.append("aboutMe",aboutMe);
    form.append("mobile",mobile);
    if(validation ===true)
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
      catch{
        alert(error.response.data.message);
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
                  src="https://via.placeholder.com/150"
                  loading="lazy"
                  alt="logo"
                />
              </div>
              <div className="buttons">
                <button>Upload New</button>
                <button>Delete</button>
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
              placeholder="Enter your String"
              name="first Name"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
            />
                </div>
                <div className="col-lg-4">

                <label className="label">
              Last Name<span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your String"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
            />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
            <label className="label">
           Email Id<span className="required">*</span>
            </label>
            <input
              type="email"
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
              placeholder="Enter your String"
              maxLength={10}
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
            />
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="sigma">Sigma</option>
              <option value="alpha">Giga Chad</option>
            </select>
                </div>
        
            </div>
            <div className="row">
                <div className="col-lg-3">
                <label className="label">
              Date of Birth<span className="required">*</span>
            </label>
            <input
              type="date"
              className="input-field"
              placeholder="Enter your String"
            />
                </div>
                <div className="col-lg-3">

                <label className="label">
              Date of Birth<span className="required">*</span>
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
           
                <label className="label">
            Specialization<span className="required">*</span>
            </label>
            <select className="input-field">
              <option value="male">Data Science</option>
              <option value="female">AIML</option>
              <option value="sigma">CSE</option>
              <option value="alpha">CS</option>
            </select>
            </div>
            <div className="row">   
           <label className="label">
       Institute/College Name<span className="required">*</span>
       </label>
       <select className="input-field">
         <option value="male">Data Science</option>
         <option value="female">AIML</option>
         <option value="sigma">CSE</option>
         <option value="alpha">CS</option>
       </select>
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
          </section>
        </>
      )
      const renderSkills=(<>
      Skills
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