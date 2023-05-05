import React from "react";
import "./Company.css";
import JobCards from "./Jobs/JobCards";
import googleLogo from "../../assets/images/google.svg";
import microsoftLogo from "../../assets/images/microsoft.svg";
import metaLogo from "../../assets/images/meta.svg";
import netflixLogo from "../../assets/images/netflix.svg";
import amazonLogo from "../../assets/images/amazon.svg";
import uberLogo from "../../assets/images/uber.svg";
import avatar from "../../assets/images/studentAvatar.svg";
// import arrow from "../../assets/images/arrow.svg";
import databaseLogo from "../../assets/images/databaseLogo.svg";
import appdevLogo from "../../assets/images/appdevLogo.svg";
import webdevLogo from "../../assets/images/webdevLogo.svg";
import designLogo from "../../assets/images/appdevLogo.svg";
import prodigyLogo from "../../assets/images/prodigy.svg";
import accentureLogo from "../../assets/images/accenture.svg";
import prodigyBanner from "../../assets/images/prodigyBanner.png";
import googleBanner from "../../assets/images/googleBanner.png";
import accentureBanner from "../../assets/images/accentureBanner.png";
import EventChar from "../../assets/images/EventChar.svg";
import JobChar from "../../assets/images/JobChar.svg";
import ProjectChar from "../../assets/images/ProjectChar.svg";
import InternChar from "../../assets/images/InternChar.svg";
import cartoonChar from "../../assets/images/cartoonChar.svg";
import curveArrow from "../../assets/images/curveArrow.svg";
import spiral from "../../assets/images/spiral.svg";
import HackathonCard from "./Events/EventsChoices/HackathonCards";

const CompanyCards = ({ data }) => {
  return (
    <div
      className="companyCards"
      style={{
        background: data.background,
        boxShadow: `3px 3px 13.54px ${data.background}`,
      }}
    >
      <img src={data.char} alt={data.name} />
      <h1>{data.name}</h1>
      <p>{data.desc}</p>
      <div className="stats">
        <span>
          <h2>{data.stats.position}+</h2>
          <h6>Job Postings Live</h6>
        </span>
        <span>
          <h2>{data.stats.hiring}+</h2>
          <h6>On-going Hiring</h6>
        </span>
      </div>
      <a href={data.link} style={{ textDecoration: "none" }}>
        <div className="Btn">Explore More</div>
      </a>
    </div>
  );
};

const Company = () => {
  const CompanyCardEntries = [
    {
      name: "event hiring",
      desc: "lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis nunc, accumsan.",
      char: EventChar,
      stats: {
        position: "30",
        hiring: "10",
      },
      link: "/company/events",
      background: "#F7d77f",
    },
    {
      name: "job hiring",
      desc: "lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis nunc, accumsan.",
      char: JobChar,
      background: "#8FC8E8",
      stats: {
        position: "30",
        hiring: "10",
      },
      link: "/company/jobs",
    },
    {
      name: "project hub",
      desc: "lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis nunc, accumsan.",
      char: ProjectChar,
      background: "#B2E887",
      stats: {
        position: "30",
        hiring: "10",
      },
      link: "/company/projects",
    },
    {
      name: "be an intern",
      desc: "lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis nunc, accumsan.",
      char: InternChar,
      background: "#E8BA98",
      stats: {
        position: "30",
        hiring: "10",
      },
      link: "/company/events",
    },
  ];
  const JobCardEntries = [
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
  const HackathonCardEntries = [
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      imgBanner: googleBanner,
      locations: "Google, USA",
      tags: ["#Competition", "#Challenge", "#Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1234,
      brief:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      rules: [
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        "Ullamcorper suspendisse porttitor cras nulla.",
        "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        "Lectus commodo cursus ut eleifend faucibus eget enim.",
        "Vitae donec egestas purus diam venenatis aliquet.",
        "Ultricies in sit ullamcorper habitant pretium facilisis.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "14 April 23, 03:00 IST",
        feeDate: "14 April 23, 03:00 IST",
        submission: "14 April 23, 03:00 IST",
        results: "14 April 23, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "anything11@gmail.com",
        users: [
          { name: "Name Surname", phone: "+91 99999 99999" },
          { name: "Name Surname", phone: "+91 99999 99999" },
        ],
      },
    },
    {
      name: "CyberHavoc CTF",
      logo: prodigyLogo,
      imgBanner: prodigyBanner,
      locations: "NIT, Surat",
      tags: ["#Competition", "#Challenge", "#Google", "+2 more"],
      stats: {
        stars: 0,
        views: 0,
        days: 5,
      },
      hackId: 1233,
      brief:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      rules: [
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        "Ullamcorper suspendisse porttitor cras nulla.",
        "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        "Lectus commodo cursus ut eleifend faucibus eget enim.",
        "Vitae donec egestas purus diam venenatis aliquet.",
        "Ultricies in sit ullamcorper habitant pretium facilisis.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "14 April 23, 03:00 IST",
        feeDate: "14 April 23, 03:00 IST",
        submission: "14 April 23, 03:00 IST",
        results: "14 April 23, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "anything11@gmail.com",
        users: [
          { name: "Name Surname", phone: "+91 99999 99999" },
          { name: "Name Surname", phone: "+91 99999 99999" },
        ],
      },
    },
    {
      name: "Accenture Hack Diva",
      logo: accentureLogo,
      imgBanner: accentureBanner,
      locations: "Accenture, Delhi",
      tags: ["#Competition", "#Challenge", "#Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1232,
      brief:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      rules: [
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        "Ullamcorper suspendisse porttitor cras nulla.",
        "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        "Lectus commodo cursus ut eleifend faucibus eget enim.",
        "Vitae donec egestas purus diam venenatis aliquet.",
        "Ultricies in sit ullamcorper habitant pretium facilisis.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        "Faucibus maecenas nulla rhoncus vel.",
        "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "14 April 23, 03:00 IST",
        feeDate: "14 April 23, 03:00 IST",
        submission: "14 April 23, 03:00 IST",
        results: "14 April 23, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "anything11@gmail.com",
        users: [
          { name: "Name Surname", phone: "+91 99999 99999" },
          { name: "Name Surname", phone: "+91 99999 99999" },
        ],
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
      <div className="pagesContainer">
        <div className="spiral">
          <h1>One Step Closer to your Dream Job</h1>
          <img src={spiral} alt="spiral" className="spiralImg" />
          <img src={cartoonChar} alt="Character" className="cartoon" />
          <img src={curveArrow} alt="Arrow" className="curveArrow" />
          <img src={uberLogo} alt="uber" className="uber" />
          <img src={netflixLogo} alt="netflix" className="netflix" />
          <img src={metaLogo} alt="meta" className="meta" />
          <img src={amazonLogo} alt="amazon" className="amazon" />
          <img src={googleLogo} alt="google" className="google" />
          <img src={microsoftLogo} alt="microsoft" className="microsoft" />
        </div>
        <div className="pages">
          {CompanyCardEntries.map((item, index) => {
            return <CompanyCards data={item} key={index} />;
          })}
        </div>
      </div>
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
          {/* <div className="seeMore">
            <img src={arrow} alt="arrow" />
            <span>See More</span>
          </div> */}
        </div>
      </div>
      <div className="FeaturedJobs">
        <a href="/company/jobs" style={{ textDecoration: "none" }}>
          <h5>Featured Jobs</h5>
        </a>
        <div className="FeaturedJobsTiles">
          {JobCardEntries.map((item, index) => {
            return <JobCards details={item} key={index} />;
          })}
        </div>
      </div>
      <div className="Opportunities">
        <a href="/company/events" style={{ textDecoration: "none" }}>
          <h5>Trending Opportunities</h5>
        </a>
        <div className="OpportunitiesTiles">
          {HackathonCardEntries.map((item, index) => {
            return <HackathonCard details={item} key={index} />;
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
        <div className="reviewCard reviewCard2">
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
