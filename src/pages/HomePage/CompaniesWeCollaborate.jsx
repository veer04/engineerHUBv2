import React, { useEffect, useState } from "react";
import "./CompaniesWeCollaborate.css";
import logo1 from "./svg/decimal-company.svg";
import logo2 from "./svg/yaro-company.svg";
import logo3 from "./svg/sayf-company.svg";
import logo4 from "./svg/eduncle-company.svg";
import axios from "axios";
import { Bucket_URL } from "../../services/APIUtils";
// import { Storage } from "aws-amplify";

export default function CompaniesWeCollaborate() {
  const bucket = `${Bucket_URL}frontend/homepage/companieswecollaborate/`;

  // async function getNumFiles() {
  //   const files = await Storage.list(
  //     `${Bucket_URL}frontend/homepage/companieswecollaborate/`
  //   );
  //   const numFiles = files.length;
  //   console.log(`Number of files in folder: ${numFiles}`);
  // }

  // const [companyLogos, setCompanyLogos] = useState([]);

  // useEffect(() => {
  //   axios

  const companyLogos = [
    {
      id: 1,
      logo: logo1,
    },
    {
      id: 2,
      logo: logo2,
    },
    {
      id: 3,
      logo: logo3,
    },
    {
      id: 4,
      logo: logo4,
    },
  ];

  const renderedCompanyLogos = companyLogos.map((company) => {
    return (
      <div key={company.id} className="company-logo-container">
        <img src={company.logo} className="company-logo" alt="company logo" />
      </div>
    );
  });

  return (
    <div className="companies-center-div">
      <h3 className="companies-we-collaborate-mobile heading-4">
        Companies we Collaborate
      </h3>
      <div className="companies-container">
        <h3 className="companies-we-collaborate">Companies we Collaborate</h3>
        <div className="company-logos-container">{renderedCompanyLogos}</div>
      </div>
    </div>
  );
}
