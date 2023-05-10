import "./CompaniesWeCollaborate.css";
import { Bucket_URL } from "../../services/APIUtils";
import { useEffect } from "react";

export default function CompaniesWeCollaborate() {
  const NUMBER_OF_COMPANIES = 4;
  const bucket = `${Bucket_URL}frontend/homepage/companieswecollaborate/`;
  const companyLogos = [];
  for (let i = 1; i <= NUMBER_OF_COMPANIES * 10; i++) {
    companyLogos.push({
      id: i,
      logo: `${bucket}company${(i % 4) + 1}.png`,
    });
  }
  const renderedCompanyLogos = companyLogos.map((company) => {
    return (
      <div key={company.id} className="company-logos">
        <img src={company.logo} className="company-logo" alt="company logo" />
      </div>
    );
  });

  // useEffect(() => {
  //   const scroller = document.querySelector(
  //     ".company-logos-container"
  //   );
  //   setTimeout(() => {

  const scroller = document.getElementsByClassName("company-logos-container");
  // let direction = 1;
  useEffect(() => {
    console.log(scroller);
    const interval = setInterval(() => {
      let prevScroll = scroller[0].scrollLeft;
      scroller[0].scrollLeft += 1;
      if (prevScroll === scroller[0].scrollLeft) {
        scroller[0].scrollLeft = 0;
      }
      // if (prevScroll === 0) {
      //   direction = 1;
      // }
    }, 10);
    return () => clearInterval(interval);
  }, []);

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
