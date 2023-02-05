import { useNavigate } from "react-router-dom";
import "./CoursesCard.css";
import {useIsAuthenticated} from 'react-auth-kit';
import { useEffect} from "react";
import { useState } from "react";
import Cookies from 'js-cookie';

const CoursesCard = ({
  courseTitle1,
  courseTitle2,
  courseDescription,
  cardImage,
  id,
  state,
  img,
}) => {
  const navigate = useNavigate();
  // const isAuthenticated = useIsAuthenticated()
  const [user,setUser]=useState(false);
  useEffect(() => {
    const cookieUserName = Cookies.get('_auth_state');
    if(cookieUserName){
      setUser(true);
    }
  });
  const navigationHandle =()=>{
if(user===true)
    {
    
      
        navigate("/courses");
  
     
    }
   
    else
    {
      navigate("/modal");
    }
    
  }


  return (
    <>
      <div className="courses-card-body">
        <div>
          {" "}
          <img
            width="100%"
            height={147}
            src={`${cardImage}`}
            alt="particular-courses"
            className="courses-image"
          />
        </div>

        <div className="d-flex courses--btns">
          <div className="courses-name">
            {courseTitle1} <br />
            {courseTitle2}
          </div>
          <button className="Prize">Free</button>
        </div>
        <div className="courses-details">{courseDescription}</div>
        <div className="courses-register"onClick={navigationHandle}>
          <div className="btn--link" >
            Register
          </div>{" "}
        </div>
      </div>
  
    </>
  );
};

export default CoursesCard;
