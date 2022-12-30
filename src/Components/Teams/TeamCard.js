import React from "react";
import "../Mentors/MentorCard.css";
// import {Link} from "react-router-dom";

// import mentorLinkedin from "./MediaIcons/icon-linkedin.png";
// import mentorGmail from "./MediaIcons/icon-gmail.png";
// import mentorWp from "./MediaIcons/icon-wp.png";
const TeamCard = ({ domain, name, Company, Desc, linkedIn, image }) => {
 
  return (
    <div className="Ment-container">
      <div className="Ment-image">
        <img src={image} alt="Mentor" />
      </div>
      <div>
        {/* <div className="Ment-prof">{Profession}</div> */}
        <div className="Ment-name">{name}</div>
        <div className="Ment-contact">
          <span>{domain}</span>
        </div>
      </div>

      {/* <div className="d-flex"> */}
      {/* <span className="Ment-about">{Desc}</span> */}
      {/* {Desc} */}
      <a
        target="_blank"
        href={linkedIn}
        rel="noopener noreferrer"
        className="Ment-button"
      >
        Connect
      </a>
      {/* </div> */}
      {/* <a target="_blank" href={LinkedIn} rel="noopener noreferrer" className="Ment-button">Connect</a> */}
    </div>
    //     <>    <div className="Ment-container">
    //     <div className="cardm mb-3" style={{borderRadius:"5px",maxWidth:"540px"}} >
    //   <div className="row g-0" style={{ paddingBottom:"0%"}}>
    //     <div className="col-md-4">
    //       <img src={mentorImage} className="img-fluid rounded-start Ment-image" style={{height:"126px", maxWidth:"107%"}} alt="..."/>
    //     </div>
    //     <div className="col-md-8">
    //       <div className="card-body">
    //         <h5 className="card-title" style={{color:"rgb(1 58 64)", color: "#ffc107",textAlign: "center",
    //     paddingTop: "5px",
    //     paddingBottom: "0px"}}>{Name}</h5>
    //         <h6 className="card-title card-Profession" style={{color:"rgb(1 58 64)",color:"white", padding:"0",textAlign: "center"}}>{Profession}</h6>
    //         {/* <p className="card-text" style={{color:"rgb(1 58 64)"}}>{Desc}</p> */}
    //         {/* <p className="card-text" style={{padding: "1rem 1rem 0 1rem"}}><small className="text-muted">Last updated 3 mins ago</small></p> */}
    //         <a target="_blank" href={LinkedIn} rel="noopener noreferrer" className="Ment-button">Connect</a>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    // </div>
    // </>
  );
};

export default TeamCard;
