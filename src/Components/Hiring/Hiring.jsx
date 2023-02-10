import React, { useState, useEffect } from "react";
import "./Hiring.css";
import ehub from './ehub.svg';
import CardH from "../Hiring/CardH";
import { cancelToken, getHiring } from "../../services/APIConfig";

export default function Hiring() {
  const [hiringData, setHiringData] = useState([]);
  useEffect(() => {
    getHiring(setHiringData);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      <div className="container-hiring">
        <div className="heading">We are Hiring !!</div>

        <div className="texthire">
          engineerhub is hiring students to encourage their efforts & help them
          excel in the following domains.
        </div>

        <div
          className="hiringcardui "
          
        >
          {hiringData.map((hcd) => {
            return (
              <CardH
                card_head={`Hiring for ${hcd.position}`}
                cDate={hcd.date}
                desc={hcd.description}
                loc={hcd.location}
                tech={hcd.techStack}
                exp={hcd.experience}
                elg={hcd.eligibility}
                lastDate={hcd.lastDate}
              />
            );
          })}
      
          <div className="hiringmainC"
          
          style={{
            padding: "10px",
            margin: "10px",
          }}
          >
            <img src={ehub} alt="" />
          <div className="ttxt">
            @engineerHUB
          </div>
          <div className="card-body">
            <div className="card-title h-effect"
              style={{
                padding: 0,
                font: "poppins",
                fontWeight: 500,
                fontSize: "1.3rem",
                lineHeight: "2.3rem",
                paddingTop: "0",
                color: "#002b36"
              }}
            >
            Node.js Developer Intern
            </div>
            <div className="d-flex">
              <ul>
                <li>
                <h6 style={{ fontWeight: 400  ,paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          TechStack: Express.js Node.js MongoDB
        </h6>
                </li>

                <li>
            <h6 style={{ fontWeight: 400, paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Experience: 0-2 years
        </h6>
            </li>
            <li>
            <h6 style={{ fontWeight: 400,  paddingRight:"9px", padding:"2px 9px 2px 2px"}}>
          Eligibility: Min 6 CGPA
        </h6>
            </li>
              </ul>
            </div>
            <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Location: Work From Home
        </h6>
        <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Last Date: 10/02/2023
        </h6>
        <div className="d-flex align-items-baseline justify-content-between">
          <a href="https://forms.gle/dqjfM7vGZzaBCgbNA" className="btnc" style={{ backgroundColor: "#002a36" , borderRadius: "10px"}}>
            <span style={{ color: "white", fontSize: "0.9rem", padding: "12px 24px" , }}>
              Apply
            </span>
          </a>
        </div>

        </div>

      </div>
    

        </div>
      </div>
    </>
  );
}
