import React, { useEffect, useState } from "react";
import "./NewFooter.css";
import { Link, useLocation } from "react-router-dom";
import { Bucket_URL } from "../../services/APIUtils";
import {
  BsDiscord,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsThreads,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";

export default function NewFooter() {
  const [displayFooter, setDisplayFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("community/chat")) {
      setDisplayFooter(false);
    } else setDisplayFooter(true);
  }, [location]);

  const bucket = `${Bucket_URL}frontend/footer/`;

  const domainLink = "/community/projects/";
  const footer = [
    {
      id: 1,
      title: "About Us",
      content:
        "engineerHUB is INDIA's leading community of engineers where students or alumni from IITs, NITs, IIITs and state colleges unite together to develop and nurture the skills of students all over India.",
      links: [],
    },
    {
      id: 2,
      title: "Quick Links",
      content: [],
      links: [
        {
          title: "Campus",
          link: "/campus",
        },
        {
          title: "Company",
          link: "/company",
        },
        {
          title: "Project",
          link: "community/projects/App%20Development",
        },
        {
          title: "Hiring",
          link: "/company/jobs",
        },
        {
          title: "Mentorship",
          link: "/mentorship",
        },
      ],
    },
    {
      id: 3,
      title: "Domain",
      content: [],
      links: [
        {
          title: "App",
          link: `${domainLink}${encodeURIComponent("App Development")}`,
        },
        {
          title: "Web",
          link: `${domainLink}${encodeURIComponent("Web Development")}`,
        },
        {
          title: "UI/UX",
          link: `${domainLink}${encodeURIComponent("UI/UX Design")}`,
        },
        {
          title: "DSA",
          link: `${domainLink}${encodeURIComponent(
            "Data Structures & Algorithms"
          )}`,
        },
        {
          title: "AI/ML",
          link: `${domainLink}${encodeURIComponent("Machine Learning & AI")}`,
        },
      ],
    },
    {
      id: 4,
      title: "Community",
      content: [],
      links: [
        {
          title: "Campus Updates",
          link: "/campus",
        },
        {
          title: "Blog",
          link: "/community/blogs/App%20Development",
        },
        {
          title: "Events",
          link: "/trending/workshops/64c0f9c6f0c72e2702488a5c",
        },
      ],
    },
    {
      id: 5,
      title: "Follow Us On",
      content: [],
      links: [
        {
          title: <img src={`${bucket}instagram.svg`} alt="instagram" />,
          link: "https://www.instagram.com/engineerhub.in/",
        },
        {
          title: <img src={`${bucket}youtube.svg`} alt="youtube" />,
          link: "https://www.youtube.com/@engineerHUB1",
        },
        // {
        //   title: <img src={`${bucket}facebook.svg`} alt="facebook" />,
        //   link: "https://www.facebook.com/engineerhubindia",
        // },
        {
          title: <img src={`${bucket}linkedin.svg`} alt="linkedin" />,
          link: "https://www.linkedin.com/company/engineersummit/mycompany/",
        },
        {
          title: <img src={`${bucket}discord.svg`} alt="discord" />,
          link: "https://discord.com/channels/792634139403878400/992453301817847888/992500434717659226",
        },
      ],
    },
    {
      id: 6,
      // title: "Download Our App",
      // links: [
      //   {
      //     title: <img src={`${bucket}app_store.svg`} alt="app store" />,
      //     link: "https://apps.apple.com/in/app/engineerhub/id1540000000",
      //   },
      // ],
    },
    {
      id: 7,
      title: "Contact Us",
      content: [],
      links: [
        {
          title: "+91 93546 47032",
        },
        {
          title: "+91 91298 83089",
        },
        {
          title: "+91 83031 56089",
        },
        {
          title: "career@engineerhub.in",
          mail: "career@engineerhub.in",
        },
        {
          title: "info@engineerhub.in",
          mail: "info@engineerhub.in",
        },
      ],
    },

    {
      id: 8,
      title: "Address",
      content: "8B, Gyankhand 4, Indirapuram, Ghaziabad 201014",
    },

    {
      id: 9,
      title: "Newsletter",
      content:
        "We'll send you updates on the latest opportunities to showcase your talent and get hired and rewarded regularly. Coming soon!",
    },
  ];

  function createFooterContent(footer) {
    return footer.map((item) => {
      return (
        <div
          key={item.id}
          className={`footer-content footer-content-${item.id}`}
        >
          <h5 style={{ color: "#FFD600", fontWeight: "600" }}>{item.title}</h5>
          <span>{item.content}</span>
          <ul>
            {item.links &&
              item.links.map((link, index) => {
                return (
                  <li key={`${item.id}${index}`}>
                    {link?.link ? (
                      <Link style={{ color: "white" }} to={link.link}>
                        {link.title}
                      </Link>
                    ) : link.mail ? (
                      <a
                        style={{ color: "white" }}
                        href={`
                          mailto:${link.mail}`}
                      >
                        {link.mail}
                      </a>
                    ) : (
                      link.title
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
  }

  return (
    <footer>
      <div className="content">
        <div className="about-us-container">
          <p className="title">About Us</p>
          <p className="description">
            engineerHUB is one stop solution for engineers ! A platform to learn
            in community, explore campuses & get placed in dream companies.
          </p>
          <div className="our-links">
            <Link to="https://x.com/engineerhub_in?t=ewStHI3a_LZV66vZ2Yswgw&s=09">
              <BsTwitterX />
            </Link>
            <Link to="/">
              <BsInstagram />
            </Link>
            <Link to="/">
              <BsLinkedin />
            </Link>
            <Link to="/">
              <BsYoutube />
            </Link>
            <Link to="/">
              <BsDiscord />
            </Link>
            <Link to="/">
              <BsWhatsapp />
            </Link>
            <Link to="/">
              <BsThreads />
            </Link>
            <Link to="/">
              <BsTelegram />
            </Link>
          </div>
          <p className="sub-title">Have a query?</p>
          <div className="info">
            <Link to="/" className="link">
              info@engineerhub.in
            </Link>
            <span>+91 93546 47032</span>
          </div>
          <div className="info">
            <Link to="/" className="link">
              career@engineerhub.in
            </Link>
            <span>+91 91298 83089</span>
          </div>
        </div>
        <div className="links-container">
          <div className="pages">
            <p className="title">Host</p>
            <Link to="/" className="link">
              Cultural Events
            </Link>
            <Link to="/" className="link">
              Technical Events
            </Link>
            <Link to="/" className="link">
              Hackathon
            </Link>
            <Link to="/" className="link">
              Webinar
            </Link>
            <Link to="/" className="link">
              Jobs
            </Link>
            <Link to="/" className="link">
              Internships
            </Link>
            <Link to="/" className="link">
              Projects
            </Link>
          </div>
          <div className="pages">
            <p className="title">Company</p>
            <Link to="/" className="link">
              Internships
            </Link>
            <Link to="/" className="link">
              Jobs
            </Link>
            <Link to="/" className="link">
              Hackathons
            </Link>
            <Link to="/" className="link">
              Projects
            </Link>
          </div>
          <div className="pages">
            <p className="title">Campus</p>
            <Link to="/" className="link">
              Search Campuses
            </Link>
            <Link to="/" className="link">
              Trending Events
            </Link>
            <Link to="/" className="link">
              Trending Campus
            </Link>
            <Link to="/" className="link">
              Trending Almas
            </Link>
            <Link to="/" className="link">
              Workshops
            </Link>
          </div>
          <div className="pages">
            <p className="title">Community</p>
            <Link to="/" className="link">
              Chat
            </Link>
            <Link to="/" className="link">
              Projects
            </Link>
            <Link to="/" className="link">
              Events
            </Link>
            <Link to="/" className="link">
              Blogs
            </Link>
          </div>
        </div>
      </div>
      <div className="courtesy">Campus Engineerhub Pvt. Ltd.</div>
    </footer>
  );
}
