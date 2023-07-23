import "./Company.css";
import JobCards from "./Jobs/JobCards";
import HackathonCard from "./Events/EventsChoices/HackathonCards";
import { Bucket_URL } from "../../services/APIUtils";
import { useEffect, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import { controller } from "../../services/APIConfig";
import { Link, useNavigate } from "react-router-dom";
import { getHiringData, getProjectData } from "../../services/APIConfig";
import colorWheel from "../../assets/colorWheel";

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
      <Link to={data.link}>
        <div className="Btn">Explore More</div>
      </Link>
    </div>
  );
};
const Company = () => {
  const { setSelectedPageNavbar } = useNavbar();
  const [hiring, setHiring] = useState([]);
  const [project, setProject] = useState([]);
  const [cntEvent,setCntEvent]=useState(-1);
  const [cntEventLive,setCntEventLive]=useState(-1);
  const [cntJob,setCntJob]=useState(-1);
  const [cntJobLive,setCntJobLive]=useState(-1);
  const [cntInternship,setCntInternship]=useState(-1);
  const [cntInternshipLive,setCntInternshipLive]=useState(-1);
  const [cntProject,setCntProject]=useState(-1);
  const[length,setLength]=useState(-1);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("company");
    getHiringData(setHiring);
    getProjectData(setProject);
    return () => {
      controller.abort();
    };
  }, []);

useEffect(()=>{
  
  setCntEvent(Object.keys(hiring.filter((res) => res.opportunityType === "Event")).length);
  setCntEventLive(Object.keys(hiring.filter((res) => res.opportunityType === "Event" && res.isServiceOff===false)).length);
  setCntJob(Object.keys(hiring.filter((res) => res.opportunityType === "Job")).length);
  setCntJobLive(Object.keys(hiring.filter((res) => res.opportunityType === "Job"&& res.isServiceOff===false)).length);
  setCntInternship(Object.keys(hiring.filter((res) => res.opportunityType === "Internship")).length);
  setCntInternshipLive(Object.keys(hiring.filter((res) => res.opportunityType === "Internship"&& res.isServiceOff===false)).length);
  setCntProject(Object.keys(project).length);

  },[]);

  const bucket = `${Bucket_URL}frontend/company/`;
  const CompanyCardEntries = [
    {
      name: "event hiring",
      desc: "Participate in the events directly conducted by the companies to highlight your profile.",
      char: `${bucket}EventChar.svg`,
      stats: {
        position: cntEvent,
        hiring: cntEventLive,
      },
      link: "/company/events",
      background: "#F7d77f",
    },
    {
      name: "job hiring",
      desc: "Apply for the jobs of your interest and get the offer letter in the next step.",
      char: `${bucket}JobChar.svg`,
      background: "#8FC8E8",
      stats: {
        position: cntJob,
        hiring: cntJobLive,
      },
      link: "/company/jobs",
    },
    {
      name: "project hub",
      desc: "Paid projects that gives you hands-on experience for better career.",
      char: `${bucket}ProjectChar.svg`,
      background: "#B2E887",
      stats: {
        position: cntProject,
        hiring: cntProject,
      },
      link: "/company/projects",
    },
    {
      name: "BE AN INTERN",
      desc: "Apply for the Internships of your interest and get the offer letter in the next step.",
      char: `${bucket}InternChar.svg`,
      background: "#e8ba98",
      stats: {
        position: cntInternship,
        hiring: cntInternshipLive,
      },
      link: "/company/internships",
    }
  ];
  const CategoryEntries = [
    { name: "Design", logo: `${bucket}appdevLogo.svg` },
    { name: "App-Dev", logo: `${bucket}appdevLogo.svg` },
    { name: "Web-Dev", logo: `${bucket}webdevLogo.svg` },
    { name: "Database", logo: `${bucket}databaseLogo.svg` },
  ];
  const data = [
    {
      stars: 3,
      views: 426,
      days: 9,
    },
    {
      stars: 3,
      views: 575,
      days: 20,
    },
    {
      stars: 4,
      views: 978,
      days: 7,
    },
    {
      stars: 5,
      views: 148,
      days: 171,
    },
    {
      stars: 3,
      views: 429,
      days: 15,
    },
    {
      stars: 5,
      views: 292,
      days: 27,
    },
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
                onClick={() => {
                  navigate(`/company/jobs`);
                }}
                className={
                  // index === selectedCategory
                  //   ? "CategoryCard select"
                  //   : "CategoryCard"
                  "CategoryCard"
                }
                key={index}
              >
                <h4>{item.name}</h4>
                <img src={item.logo} alt="image-Logo" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="FeaturedJobs">
        <a href="/company/jobs" style={{ textDecoration: "none" }}>
          <h5>Featured Jobs</h5>
        </a>
        <div className="FeaturedJobsTiles">
          {hiring
            .filter((res) => res.opportunityType === "Job")
            .map((item, index) => {
              return (
                <JobCards
                  details={item}
                  color={colorWheel[index % colorWheel.length]}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <div className="Opportunities">
        <a href="/company/events" style={{ textDecoration: "none" }}>
          <h5>Trending Opportunities</h5>
        </a>
        <div className="OpportunitiesTiles">
          {hiring
            .filter((res) => res.opportunityType === "Event")
            .map((item, index) => {
              return (
                <HackathonCard
                  data={data[index % data.length]}
                  details={item}
                  key={index}
                />
              );
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
            EngineerHUB's mentors are truly exceptional! Their expertise and
            patience made learning complex engineering concepts a breeze. Highly
            recommended for any student seeking personalized mentorship!
          </p>
          <h6>Girish Shedge</h6>
        </div>
        <div className="reviewCard reviewCard2">
          <img
            style={{
              height: "58px",
              width: "58px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={`https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/teams/Backend/yash.jpeg`}
            alt="Avatar"
          />
          <p>
            I highly recommend EngineerHUB for students. The live batches are
            well-structured, and the mentors are experienced and supportive.
          </p>
          <h6>Yash Vardhan</h6>
        </div>
      </div>
    </div>
  );
};

export default Company;
