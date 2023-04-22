import React from "react";
import "./Company.css";
import JobCards from "./Jobs/JobCards";
import googleLogo from "../../assets/images/google.svg";
import microsoftLogo from "../../assets/images/microsoft.svg";
import uberLogo from "../../assets/images/uber.svg";
import avatar from "../../assets/images/studentAvatar.svg";
import arrow from "../../assets/images/arrow.svg";
import databaseLogo from "../../assets/images/databaseLogo.svg";
import appdevLogo from "../../assets/images/appdevLogo.svg";
import webdevLogo from "../../assets/images/webdevLogo.svg";
import designLogo from "../../assets/images/appdevLogo.svg";

const Company = () => {
  const CardEntries = [
    {
      name: "Senior UI Developer",
      tags: ["Engineer", "Developer"],
      ctc: "5-5.6 LPA",
      location: "Mumbai, India",
      logo: uberLogo,
      bg: "#8FC8E8",
      jobId: 1234,
      org: "Uber",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin ac blandit sed hac volutpat mauris lacus. Sed nunc mauris maecenas est a tempor felis amet fringilla. Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla. Nulla amet sem quis eu pharetra vitae commodo eget. A nulla diam mattis praesent est. Amet varius proin in tellus dui. Semper nibh pretium augue id ipsum egestas risus sollicitudin risus. Non nec tristique consectetur sed non scelerisque magna ut adipiscing. Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      req: [
        "Lorem ipsum dolor sit amet consectetur. ",
        "Proin ac blandit sed hac volutpat mauris lacus. ",
        "Sed nunc mauris maecenas est a tempor felis amet fringilla.",
        "Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla.",
        "Nulla amet sem quis eu pharetra vitae commodo eget.",
        "A nulla diam mattis praesent est. Amet varius proin in tellus dui.",
        "Semper nibh pretium augue id ipsum egestas risus sollicitudin risus.",
        "Non nec tristique consectetur sed non scelerisque magna ut adipiscing.",
        "Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      ],
      info: {
        salary: "15000/-",
        availability: "12hr/day",
        type: "Full-Time",
      },
    },
    {
      name: "Senior Backend Engineer",
      tags: ["Engineer", "Developer"],
      ctc: "10-16 LPA",
      location: "Mumbai, India",
      logo: googleLogo,
      bg: "#B2E887",
      jobId: 1233,
      org: "Google",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin ac blandit sed hac volutpat mauris lacus. Sed nunc mauris maecenas est a tempor felis amet fringilla. Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla. Nulla amet sem quis eu pharetra vitae commodo eget. A nulla diam mattis praesent est. Amet varius proin in tellus dui. Semper nibh pretium augue id ipsum egestas risus sollicitudin risus. Non nec tristique consectetur sed non scelerisque magna ut adipiscing. Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      req: [
        "Lorem ipsum dolor sit amet consectetur. ",
        "Proin ac blandit sed hac volutpat mauris lacus. ",
        "Sed nunc mauris maecenas est a tempor felis amet fringilla.",
        "Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla.",
        "Nulla amet sem quis eu pharetra vitae commodo eget.",
        "A nulla diam mattis praesent est. Amet varius proin in tellus dui.",
        "Semper nibh pretium augue id ipsum egestas risus sollicitudin risus.",
        "Non nec tristique consectetur sed non scelerisque magna ut adipiscing.",
        "Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      ],
      info: {
        salary: "50000/-",
        availability: "2hr/day",
        type: "Part-Time",
      },
    },
    {
      name: "Azure Data Engineer",
      tags: ["Engineer", "Developer"],
      ctc: "7-8.5 LPA",
      location: "Mumbai, India",
      logo: microsoftLogo,
      bg: "#E8BA98",
      jobId: 1232,
      org: "Microsoft",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin ac blandit sed hac volutpat mauris lacus. Sed nunc mauris maecenas est a tempor felis amet fringilla. Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla. Nulla amet sem quis eu pharetra vitae commodo eget. A nulla diam mattis praesent est. Amet varius proin in tellus dui. Semper nibh pretium augue id ipsum egestas risus sollicitudin risus. Non nec tristique consectetur sed non scelerisque magna ut adipiscing. Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      req: [
        "Lorem ipsum dolor sit amet consectetur. ",
        "Proin ac blandit sed hac volutpat mauris lacus. ",
        "Sed nunc mauris maecenas est a tempor felis amet fringilla.",
        "Phasellus massa sed pulvinar tortor quam nunc mauris aliquam nulla.",
        "Nulla amet sem quis eu pharetra vitae commodo eget.",
        "A nulla diam mattis praesent est. Amet varius proin in tellus dui.",
        "Semper nibh pretium augue id ipsum egestas risus sollicitudin risus.",
        "Non nec tristique consectetur sed non scelerisque magna ut adipiscing.",
        "Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
      ],
      info: {
        salary: "25000/-",
        availability: "3hr/day",
        type: "Part-Time",
      },
    },
  ];
  const CategoryEntries = [
    { name: "Design", logo: designLogo },
    { name: "App-Dev", logo: appdevLogo },
    { name: "Web-Dev", logo: webdevLogo },
    { name: "Database", logo: databaseLogo },
  ];
  return (
    <div className="companyHome">
      <h3>Company</h3>
      <a href="/company/events">Events</a>
      <br />
      <div className="Category">
        <h5>Most on Demand Jobs Categories</h5>
        <div className="CategoryTiles">
          {CategoryEntries.map((item, index) => {
            return (
              <div
                className={index === 0 ? "CategoryCard select" : "CategoryCard"}
                key={index}
              >
                <h4>{item.name}</h4>
                <img src={item.logo} alt="image-Logo" />
              </div>
            );
          })}
          <div className="seeMore">
            <img src={arrow} alt="arrow" />
            <span>See More</span>
          </div>
        </div>
      </div>
      <div className="FeaturedJobs">
        <a href="/company/jobs" style={{ textDecoration: "none" }}>
          <h5>Featured Jobs</h5>
        </a>
        <div className="FeaturedJobsTiles">
          {CardEntries.map((item, index) => {
            return <JobCards details={item} key={index} />;
          })}
        </div>
      </div>
      <div className="FeaturedJobs">
        <a href="/company/events" style={{ textDecoration: "none" }}>
          <h5>Featured Jobs</h5>
        </a>
        <div className="FeaturedJobsTiles">
          {CardEntries.map((item, index) => {
            return <JobCards details={item} key={index} />;
          })}
        </div>
      </div>
      <div className="StudentReviews">
        <div className="heading">
          What our
          <br />
          Students say?
        </div>
        <div className="reviewCard">
          <img src={avatar} alt="Avatar" />
          <p>
            Lorem ipsum dolor sit amet consectetur. Enim enim fringilla volutpat
            accumsan feugiat lobortis. Id ridiculus risus massa est. Tellus enim
            pellentesque odio posuere purus sit nunc.Lorem ipsum dolor sit amet
            consectetur. Enim enim fringilla volutpat accumsan feugiat lobortis.
            Id ridiculus risus massa est. Tellus enim pellentesque odio posuere
            purus sit nunc
          </p>
          <h6>Girish Shedge</h6>
        </div>
        <div className="reviewCard">
          <img src={avatar} alt="Avatar" />
          <p>
            Lorem ipsum dolor sit amet consectetur. Enim enim fringilla volutpat
            accumsan feugiat lobortis. Id ridiculus risus massa est. Tellus enim
            pellentesque odio posuere purus sit nunc.Lorem ipsum dolor sit amet
            consectetur.
          </p>
          <h6>Girish Shedge</h6>
        </div>
      </div>
    </div>
  );
};

export default Company;
