import React from "react";
import "./Company.css";
import JobCards from "./Jobs/JobCards";
import googleLogo from "../../assets/images/google.svg";
import microsoftLogo from "../../assets/images/microsoft.svg";
import uberLogo from "../../assets/images/uber.svg";

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
  return (
    <div className="companyHome">
      <h3>Company</h3>
      <a href="/company/events">Events</a>
      <br />
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
    </div>
  );
};

export default Company;
