import "./CompaniesWeCollaborate.css";
import { Bucket_URL } from "../../services/APIUtils";

export default function CompaniesWeCollaborate() {
  const NUMBER_OF_COMPANIES = 4;
  const bucket = `${Bucket_URL}frontend/homepage/companieswecollaborate/`;
  const companyLogos = [];
  for (let i = 1; i <= NUMBER_OF_COMPANIES; i++) {
    companyLogos.push({
      id: i,
      logo: `${bucket}company${i}.png`,
    });
  }
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
