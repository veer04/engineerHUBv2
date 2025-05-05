import "./Company.css";
import JobCards from "./Jobs/JobCards";
import HackathonCard from "./Events/EventsChoices/HackathonCards";
import { API_URL, Bucket_URL } from "../../services/APIUtils";
import { useEffect, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import { Link, useNavigate } from "react-router-dom";
import colorWheel from "../../assets/colorWheel";
import axios from "axios";
import NewEventCard from "../../components/NewEventCard/NewEventCard";
import PromoteServices from "./Referrals/PromoteServices/PromoteServices";
import { useQuery } from "@tanstack/react-query";
import OtherPageCard from "./OtherPageCard";
import OtherPageCard2 from "./OtherPageCard2";
import OtherPageCard3 from "./OtherPageCard3";
import BannerSpaceComp from "./BannerSpaceComp/BannerSpaceComp";
import JobsForYouFilterComp from "./JobsForYouFilterPage/JobsForYouFilterComp";

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
          <h6>{data.text1}</h6>
        </span>
        <span>
          <h2>{data.stats.hiring}+</h2>
          <h6>{data.text2}</h6>
        </span>
      </div>
      <Link to={data.link}>
        <div className="Btn">Explore More</div>
      </Link>
    </div>
  );
};

const Company = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  let count = 0;
  const [jobs, setJobs] = useState(
    sessionStorage.getItem("companyPageJobs")
      ? JSON.parse(sessionStorage.getItem("companyPageJobs"))
      : []
  );
  const [events, setEvents] = useState(
    sessionStorage.getItem("companyPageEvents")
      ? JSON.parse(sessionStorage.getItem("companyPageEvents"))
      : []
  );
  const [companyPageCounts, setCompanyPageCounts] = useState(
    sessionStorage.getItem("companyPageCounts")
      ? JSON.parse(sessionStorage.getItem("companyPageCounts"))
      : {}
  );

  const getCompanyPageCounts = () => {
    axios
      .get(`${API_URL}api/v1/getCompanyPageCounts/`)
      .then((res) => {
        sessionStorage.setItem(
          "companyPageCounts",
          JSON.stringify(res?.data?.data)
        );
        setCompanyPageCounts(res?.data?.data);
      })
      .catch((err) => {
        setCompanyPageCounts(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  };

  const getCompanyPageJobs = (setJobs, pageNo, limit, isEasyApply) => {
    axios
      .get(`${API_URL}api/v1/getHiringByOpportunityType/`, {
        params: {
          opportunityType: "Job",
          pageNo: pageNo,
          limit: limit,
          isEasyApply: isEasyApply,
        },
      })
      .then((res) => {
        sessionStorage.setItem(
          "companyPageJobs",
          JSON.stringify(res?.data?.data)
        );
        setJobs(res?.data?.data);
      })
      .catch((err) => {
        setJobs(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  };

  // const getCompanyPageEvents = (setEvents, pageNo, limit) => {
  //   axios
  //     .get(`${API_URL}api/v1/getHiringByOpportunityType/`, {
  //       params: {
  //         opportunityType: "Event",
  //         pageNo: pageNo,
  //         limit: limit,
  //       },
  //     })
  //     .then((res) => {
  //       sessionStorage.setItem(
  //         "companyPageEvents",
  //         JSON.stringify(res?.data?.data)
  //       );
  //       setEvents(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       setEvents(err);
  //       if (axios.isCancel(err)) {
  //         console.log("req cancel");
  //       } else {
  //         console.log("req performed");
  //       }
  //     });
  // };
  //

  const getEventByType = (setEvents) => {
    axios
      .get(`${API_URL}api/v1/eventTypeWiseEvents/eventHiring`, {})
      .then((res) => {
        sessionStorage.setItem(
          "companyPageEvents",
          JSON.stringify(res?.data?.data)
        );
        setEvents(res?.data?.data);
      })
      .catch((err) => {
        setEvents(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  };

  useEffect(() => {
    document.title = "Career | engineerHUB";
    // window.scrollTo(0, 0);
    setSelectedPageNavbar("company");
    if (sessionStorage.getItem("companyPageCounts")) {
      setCompanyPageCounts(
        JSON.parse(sessionStorage.getItem("companyPageCounts"))
      );
    } else {
      getCompanyPageCounts();
    }
    if (sessionStorage.getItem("companyPageJobs")) {
      setJobs(JSON.parse(sessionStorage.getItem("companyPageJobs")));
    } else {
      getCompanyPageJobs(setJobs, 1, 6, 1);
    }
    if (sessionStorage.getItem("companyPageEvents")) {
      setEvents(JSON.parse(sessionStorage.getItem("companyPageEvents")));
    } else {
      getEventByType(setEvents);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bucket = `${Bucket_URL}frontend/company/`;
  const CompanyCardEntries = [
    //Jobs
    {
      name: "job hiring",
      desc: "Apply for the jobs of your interest and get the offer letter in the next step.",
      char: `${bucket}JobChar.svg`,
      background: "#8FC8E8",
      stats: {
        position: companyPageCounts?.pageSizeJob,
        hiring: companyPageCounts?.pageSizeJob ? 1800 : 0,
      },
      link: "/career/jobs?pageNo=1&limit=24",
      text1: "jobs live",
      text2: "total opening",
    },

    //Internship
    {
      name: "BE AN INTERN",
      desc: "Apply for the Internships of your interest and get the offer letter in the next step.",
      char: `${bucket}InternChar.svg`,
      background: "#e8ba98",
      stats: {
        position: companyPageCounts?.pageSizeInternship,
        hiring: companyPageCounts?.pageSizeInternship ? 820 : 0,
      },
      link: "/career/internships?pageNo=1&limit=24",
      text1: "internships live",
      text2: "total opening",
    },

    //
    //Project
    // {
    //   name: "project hub",
    //   desc: "Paid projects that gives you hands-on experience for better career.",
    //   char: `${bucket}ProjectChar.svg`,
    //   background: "#B2E887",
    //   stats: {
    //     position: companyPageCounts?.pageSizeProjects,
    //     hiring: companyPageCounts?.pageSizeProjects ? 20 : 0,
    //   },
    //   link: "/company/projects",
    //   text1: "projects live",
    //   text2: "ongoing projects",
    // },

    //Event

    {
      name: "event hiring",
      desc: "Participate in the events directly conducted by the companies to highlight your profile.",
      char: `${bucket}EventChar.svg`,
      stats: {
        position: companyPageCounts?.newpageSizeEvent,
        hiring: companyPageCounts?.newpageSizeEvent ? 10 : 0,
      },
      link: "/career/events",
      background: "#F7d77f",
      text1: "events live",
      text2: "total opening",
    },
  ];

  const testimonialsQuery = useQuery({
    queryKey: ["Testimonials"],
    queryFn: () =>
      axios.get(`${API_URL}api/v1/testimonials?page=1&limit=30`).then((res) => {
        return res;
      }),
    staleTime: Infinity,
  });

  return (
    <div className="companyHome">
      <div className="pagesContainer padding-adjustment">
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
      {/* <div className="Category" style={{ display: "none" }}>
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
      </div> */}

      <div className="banner-space-div-to-promote-companies">
        <BannerSpaceComp
          image={`${Bucket_URL}banner1.png`}
          mobileImage={`${Bucket_URL}13404898.png`}
        />
      </div>

      <div className="padding-adjustment">
        <PromoteServices compName={"Our Resources"} />
      </div>

      <div className="FeaturedJobs padding-adjustment">
        <a href="/career/jobs" style={{ textDecoration: "none" }}>
          <h5>Featured Jobs</h5>
        </a>
        <div className="FeaturedJobsTiles">
          {jobs.slice(0, 6).map((item, index) => {
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
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="padding-adjustment"
      >
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-8474972598474156"
          data-ad-slot="7731176663"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
      </div>
      <div className="Opportunities padding-adjustment">
        <a href="/career/events" style={{ textDecoration: "none" }}>
          <h5>Trending Opportunities</h5>
        </a>
        <div className="OpportunitiesTiles">
          {events.slice(0, 6).map((item, index) => {
            return <NewEventCard data={item} key={index} eventHiring={true} />;
          })}
        </div>
      </div>

      <div>
        <JobsForYouFilterComp />
      </div>

      <div className="Our-Other-Pages-Main-Div">
        <h4
          style={{
            color: "#000",
            fontSize: "18px",
            lineHeight: "24px",
            letterSpacing: "0.9px",
            fontWeight: "700",
            fontFamily: "Lato, sans-serif",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          EXPLORE OTHER PAGES
        </h4>

        <div className="wrapper-other-pages">
          <OtherPageCard
            link={
              "https://engineerhub.in/referrals/book-now/66e091cc56ed7c8c16400d91"
            }
            image={`${Bucket_URL}Mentors/otherpages/1.png`}
            showText={++count === 4}
          />

          <OtherPageCard2
            link={
              "https://engineerhub.in/referrals/book-now/66d4572436b0cd9739a994e8"
            }
          />
          <OtherPageCard
            link={"https://engineerhub.in/chat/Let%E2%80%99s%20Discuss"}
            image={`${Bucket_URL}Mentors/otherpages/2.png`}
            showText={++count === 4}
          />
          <OtherPageCard
            link={"https://engineerhub.in/campus"}
            image={`${Bucket_URL}Mentors/otherpages/3.png`}
            showText={++count === 4}
          />
          <OtherPageCard
            link={"https://www.engineerhub.in/host"}
            image={`${Bucket_URL}Mentors/otherpages/5.png`}
            showText={++count === 4}
          />

          <OtherPageCard3
            link={
              "https://engineerhub.in/community/notes/Data%20Structures%20%26%20Algorithms"
            }
            image={`${Bucket_URL}Mentors/otherpages/4.png`}
          />
        </div>
      </div>

      {testimonialsQuery.isSuccess && (
        <section className="testimonials">
          <h3 className="heading-md">Our placed students and their reviews</h3>
          <div className="testimonial-container">
            {testimonialsQuery?.data?.data?.data?.testimonials?.map(
              (item, index) => {
                return (
                  <div className="flip-card" key={index}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front testimonial-card-front">
                        <div className="author-image">
                          <img src={item?.image} alt="author-image" />
                          <div className="role">
                            <p title={item?.role} className="label-xsm">
                              {item?.role}
                            </p>
                          </div>
                        </div>
                        <p title={item?.name} className="name text-crop-1">
                          {item?.name}
                        </p>
                        <p className="placed-at">Placed at</p>
                        <img
                          title={item?.company}
                          className="company-logo"
                          src={item?.companyLogo}
                          alt={item?.company}
                        />
                      </div>
                      <div className="flip-card-back testimonial-card-back">
                        <p title={item?.text} className="testimonial">
                          {item?.text}
                        </p>
                        <div className="placement-details">
                          <div className="detail">
                            <p>Role</p>
                            <p title={item?.role} className="text-crop-3">
                              {item?.role}
                            </p>
                          </div>
                          <div className="detail">
                            <p>Package</p>
                            <p>{item?.package}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Company;
