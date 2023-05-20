import "./Company.css";
import JobCards from "./Jobs/JobCards";
import HackathonCard from "./Events/EventsChoices/HackathonCards";
import { Bucket_URL } from "../../services/APIUtils";
import { useEffect, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import { controller } from "../../services/APIConfig";

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
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("company");

    return () => {
      controller.abort();
    };
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const bucket = `${Bucket_URL}frontend/company/`;
  const CompanyCardEntries = [
    {
      name: "event hiring",
      desc: "lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis nunc, accumsan.",
      char: `${bucket}EventChar.svg`,
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
      char: `${bucket}JobChar.svg`,
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
      char: `${bucket}ProjectChar.svg`,
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
      char: `${bucket}InternChar.svg`,
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
  ];
  const HackathonCardEntries = [
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: `${bucket}google.svg`,
      imgBanner: `${bucket}googleBanner.png`,
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
      logo: `${bucket}prodigy.svg`,
      imgBanner: `${bucket}prodigyBanner.png`,
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
      logo: `${bucket}accenture.svg`,
      imgBanner: `${bucket}accentureBanner.png`,
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
    { name: "Design", logo: `${bucket}appdevLogo.svg` },
    { name: "App-Dev", logo: `${bucket}appdevLogo.svg` },
    { name: "Web-Dev", logo: `${bucket}webdevLogo.svg` },
    { name: "Database", logo: `${bucket}databaseLogo.svg` },
  ];
  return (
    <div className="companyHome">
      <div className="pagesContainer">
        <div className="spiral">
          <h1>One Step Closer to your Dream Job</h1>
          <img src={`${bucket}spiral.svg`} alt="spiral" className="spiralImg" />
          <img
            src={`${bucket}cartoonChar.svg`}
            alt="Character"
            className="cartoon"
          />
          <img
            src={`${bucket}curveArrow.svg`}
            alt="Arrow"
            className="curveArrow"
          />
          <img src={`${bucket}uber.svg`} alt="uber" className="uber" />
          <img src={`${bucket}netflix.svg`} alt="netflix" className="netflix" />
          <img src={`${bucket}meta.svg`} alt="meta" className="meta" />
          <img src={`${bucket}amazon.svg`} alt="amazon" className="amazon" />
          <img src={`${bucket}google.svg`} alt="google" className="google" />
          <img
            src={`${bucket}microsoft.svg`}
            alt="microsoft"
            className="microsoft"
          />
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
                className={
                  index === selectedCategory
                    ? "CategoryCard select"
                    : "CategoryCard"
                }
                key={index}
              >
                <h4>{item.name}</h4>
                <img src={item.logo} alt="image-Logo" />
              </div>
            );
          })}
          {/* <div className="seeMore">
            <img src={`${bucket}arrow.svg`} alt="arrow" />
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
          <img src={`${bucket}studentAvatar.svg`} alt="Avatar" />
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
          <img src={`${bucket}studentAvatar.svg`} alt="Avatar" />
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
