import React from "react";


import "./InternCard.css";

const InternCard = ({ company, position, link }) => {
  return (
    <div className="Intern-Container">
      <hr
        style={{
            color: "#D9D9D9",
            // backgroundColor: "#D9D9D9",
            // height: "2.74px",
            width:"160.04px",
        }}
    />
      <span className="posted">Posted 2 hrs ago</span>
      <div className="Intern-Company">
        {/* <svg href="google.svg"></svg> */}
        {/* <div className="company-image">
        <img src={google} alt="google logo"/>
        </div> */}
        <div className="Company-Name">{position}  | {company}</div>
          <button className="btn btn-primary newbtn">New</button>
          
      </div>
      <div>
      <li className="conta" >
            <ul className="items text-in">Full-Time</ul>
            <ul className="text-in">Delhi, India</ul>
            <ul className="text-in">Paid</ul>
          </li>
      </div>
      <div className="Intern-Position">
      
        Titan is a itan Company Limited is an Indian products company that mainly
        manufactures fashion accessories such as jewellery, watches and eyewear.



      </div>
      {/* <div className="Intern-Apply-Link"> */}
      <a href={link} target="_blank" rel="noreferrer">
      <div className="applycont">

        <div className="btn btn-dark apply">
          Apply
        </div>

      </div>
      </a>
    </div>
  );
};

export default InternCard;
