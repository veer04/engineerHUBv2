import React, { useState, useEffect } from "react";
import "./HackathonDesc.css";
import { Chip } from "@mui/material";
import { BsCalendar4 } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";
import { Bucket_URL } from "../../../../services/APIUtils";
import { useNavigate,Link } from "react-router-dom";
import getCookie, { getAccessToken } from "../../../../features/getCookieValues";
import { API_URL } from "../../../../services/APIUtils";
import jwt_decode from "jwt-decode";
const HackathonDesc = ({ details }) => {
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate =useNavigate();
  const accesstoken=getAccessToken();
  const decode =jwt_decode(accesstoken);
  // const valueName=getCookie("name");
  useEffect(()=>{
    if(getCookie("name"))
    {
      setIsLoggedIn(true);
    }
  },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);
  
  const postUserDetails=()=>{
    const data= {
      eventId: details._id,
      userId:decode._id

    };
    axios.post(`${API_URL}/api/v1/eventRegistration`,data).then(
      (res)=>{
        if(res.status===200||
          res.status===201||
          res.status===2002||
          res.status===203||
          res.status===204
          )
          {
            window.alert("successfully Applied");
          }
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;
  return (
    <div className="HackDescription">
      <div className="HackDetailHeader">
        <div className="imageBanner">
          <img src={details.OpportunityPoster} alt="Banner" />
        </div>
        <span>
          <span className="imgBox">
            <img src={details.organizationPoster} alt="Logo" />
          </span>
          <span className="heads">
            <h1>{details.OpportunityName}</h1>
            <h3>{details.jobLocation}</h3>
          </span>
          <div>
            {
              isLoggedIn?(
                <Link
                onClick={postUserDetails}
                to={details.websiteUrl}
                >
          <div className="btn"  
          >Apply </div>
          </Link>

              ):(

                <Link to={"https://ehubbusiness.com/login"}>
                <div className="btn"  
                >Apply </div>
                </Link>
              )
            }
          
          </div>
        </span>
        {/* <span className="Tags">
          {details?.skillsRequired.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={tag}
              style={{
                fontWeight: "500",
                fontSize: "10px",
                marginRight: "15px",
              }}
            />
          ))}
        </span> */}
      </div>
      <div className="HackDesc">
        <h5>Brief</h5>
        <p>{details.description}</p>
      </div>
      {/* <div className="HackReq">
        <h5>Rules & Regulations</h5>
        <ul>
          {details.rules.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div> */}
      {/* <div className="HackDetail">
        <h5>Brief</h5>
        <p>{details.details}</p>
      </div> */}
      <div className="HackDates">
        <h5>Dates & Deadlines</h5>
        <div className="HackDateTiles">
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Registration Date</h4>
              <h6>{details.applicationStartTime}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Registration Fees Payment</h4>
              <h6>{details.applicationEndTime}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Submission Date</h4>
              <h6>{details.applicationEndTime}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Results</h4>
              <h6>{details.applicationEndTime}</h6>
            </span>
          </div>
        </div>
      </div>
      {/* <div className="HackPrize">
        <h5>Prize Pool</h5>
        <div className="HackInfoItems">
          <div className="HackInfoItem" style={{ background: "#F7D77F" }}>
            <h6>First Prize</h6>
            <p>
            
            </p>
            <span>{`₹ ${details.prize.first}`}</span>
            <img src={`${bucket}prize.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#8FC8E8" }}>
            <h6>Second Prize</h6>
            <p>
           
            </p>
            <span>{`₹ ${details.prize.second}`}</span>
            <img src={`${bucket}prize.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#B2E887" }}>
            <h6>Certificate of Merit</h6>
            <p>
   
            </p>
            <img src={`${bucket}certificate.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#B2E887" }}>
            <h6>Certificate of Participation</h6>
            <p>
             
            </p>
            <img src={`${bucket}certificate.svg`} alt="guide" />
          </div>
        </div>
      </div> */}
      {/* <div className="HackContact">
        <h5>Contact</h5>
        <div className="HackContactTiles">
          {details.contact.users.map((user, index) => {
            return (
              <div className="HackContactItem">
                <div className="icon">
                  <TbPhoneCall />
                </div>
                <span>
                  <h4>{user.name}</h4>
                  <h6>{user.phone}</h6>
                </span>
              </div>
            );
          })}
          <div className="HackContactItem">
            <div className="icon">
              <FiMail />
            </div>
            <span>
              <h4>Ask your Queries at</h4>
              <h6>{details.contact.email}</h6>
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HackathonDesc;
