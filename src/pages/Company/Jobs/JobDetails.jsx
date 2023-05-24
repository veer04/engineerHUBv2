/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import JobCards from "./JobCards";
import "./JobDetails.css";
import JobDescription from "./JobDescription";
import { Bucket_URL } from "../../../services/APIUtils";

const JobDetails = () => {
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const { jobId } = useParams();
  const [search, setSearch] = useState("");
  const CardEntries = [
    {
      name: "Senior UI Developer",
      tags: ["Engineer", "Developer"],
      ctc: "5-5.6 LPA",
      location: "Mumbai, India",
      logo: `${bucket}uber.svg`,
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
      logo: `${bucket}google.svg`,
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
      logo: `${bucket}microsoft.svg`,
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
    {
      name: "Senior UI Developer",
      tags: ["Engineer", "Developer"],
      ctc: "5-5.6 LPA",
      location: "Mumbai, India",
      logo: `${bucket}uber.svg`,
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
      logo: `${bucket}google.svg`,
      bg: "#F7D77F",
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
      logo: `${bucket}microsoft.svg`,
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
    {
      name: "Senior UI Developer",
      tags: ["Engineer", "Developer"],
      ctc: "5-5.6 LPA",
      location: "Mumbai, India",
      logo: `${bucket}uber.svg`,
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
      logo: `${bucket}google.svg`,
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
      logo: `${bucket}microsoft.svg`,
      bg: "#F7D77F",
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
  useEffect(() => {}, []);
  return (
    <div className="CompanyJobDetails">
      <h2>Job Hiring</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </p>
      {/* <div className="search">
        <span>
          <BsSearch />
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </span>
        <div className="filters">
          <MdTune />
        </div>
      </div> */}
      <div className="Jobs">
        <div className="JobTiles">
          {CardEntries.map((item, index) => {
            return <JobCards details={item} key={index} />;
          })}
        </div>
        <div className="JobDetail">
          {jobId === undefined ? (
            <div></div>
          ) : (
            <JobDescription
              details={
                CardEntries.filter((item) => item.jobId === parseInt(jobId))[0]
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
