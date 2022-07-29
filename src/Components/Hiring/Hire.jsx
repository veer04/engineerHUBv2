import React from "react";
import "./Hire.css";
import hiring from "./hiring.jpeg";
import ShareIcon from '@mui/icons-material/Share'; 

export default function Hire() {
  return (
    <>
    <div className="cardw">
      <div className="card ca mb-5">
        <img
          src={hiring}
          className="card-img-left card-img img-fluid image"
          alt="hire-card"
        />
        <div className="card-body position-absolute cbody">
          <h2 className="card-title txt">
            Hiring Mentors for Domains.
            <a href="#">
              <ShareIcon className="share-icon"/>
            </a>
          </h2>
          <p className="card-text txt2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Arcu, eget suspendisse nunc duis non eget est.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Arcu, eget suspendisse nunc duis non eget est.
          </p>
          <div className="btn-container">
            <a href="#" className="btn btn-primary btn1">
              <span>Apply Now !</span>
            </a>
            <div className="btn-container d-inline m-5">
            <a href="#" className="btn btn-warning btn2 text-white">
             Paid
            </a>
            <p className="d-inline fst-normal m-5 fs-5 fw-light">Last date: dd/mm/yy</p>
            </div>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
}