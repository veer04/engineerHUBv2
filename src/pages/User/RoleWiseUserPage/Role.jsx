import React from 'react'
import { Bucket_URL } from "../../../services/APIUtils";
import { Link ,useNavigate} from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "../../Hosting/Hosting.css";
import Student from "./Images/student.png";
import Club from "./Images/Club.png";
import Company from "./Images/Company.png";
import Mentor from "./Images/Mentor.png";
import "./Role.css";
const Role = () => {
  const navigate =useNavigate();
  const bucket = `${Bucket_URL}frontend/hosting/`;
const studentNavigation=()=>{
  navigate("/signup");
}
const mentorNavigation=()=>{
  navigate("/mentorSignup");
}
const clubNavigation=()=>{
  navigate("/clubSignup");
}
const organizationNavigation=()=>{
  navigate("/organizationSignup");
}
  const navigationFunction =()=>{
    if (val===1)
    {
      const decoded = jwt_decode(token);
      console.log(decoded);
      console.log(decoded.role);
      if(decoded.role==="Organization")
      {
        navigate("/hostevent");
      }
      else {
        window.alert("Not Authorized to Host events!!!");
      }
    }
    else{
      navigate("/login");
    }
}
  return (
    <>
    
   <div className="container">
    <div className="roles">
      <div className="roleHeading">
        Create your Profile As per your Role!
      </div>
    </div>
    <div className="cards cardContainingContainer row container">
    <div className="cardStudent card-hover col-lg-3">
    
   <img src={Student} alt="" height={150} width={150}
   onClick={studentNavigation} />
   Student <BsArrowRight />
    
   </div>
    <div className="cardMentor card-hover col-lg-3">
    <img src={Mentor} alt="" height={150} width={150}
   onClick={mentorNavigation} />
   Alumni <BsArrowRight />
    </div>
    <div className="cardClubs card-hover col-lg-3">
    <img src={Club} alt="" height={150} width={150}
   onClick={clubNavigation} />
   Clubs <BsArrowRight />
    </div>
    <div className="cardOrganization card-hover col-lg-3">
    <img src={Company} alt="" height={150} width={150}
   onClick={organizationNavigation} />
   Organization <BsArrowRight />
    </div>

    </div>

   </div>
    </>
  )
}

export default Role