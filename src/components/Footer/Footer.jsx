import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Bucket_URL } from "../../services/APIUtils";

export default function Footer() {
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
          link: "/community/events/App%20Development",
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
          link: "https://discord.com/invite/ZMZAEZ5NfA",
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
          title: "+91 91298 83089",
          link: {},
        },
        {
          title: "+91 83031 56089",
          link: {},
        },
        {
          title: "info@engineerhub.in",
          link: {},
        },
      ],
    },

    {
      id: 8,
      title: "Address",
      content:
        "Gokulpuram Colony, Chitaipur, Chunar Road, Varanasi, Uttar Pradesh, 221106",
    },

    {
      id: 9,
      title: "Newsletter",
      content:
        "We'll send you updates on the latest opportunities to showcase your talent and get hired and rewarded regularly.",
    },
  ];

  // for changes to be made in future for responsiveness 👇

  //   const [width, setWidth] = useState(window.innerWidth);
  //   const handleResize = () => setWidth(window.innerWidth);

  //   useEffect(() => {
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  //   const adjustmentPadding =
  //     width >= 1920
  //       ? `${(width - 1920) / 2 + 166.56}px`
  //       : "var(--section-padding)";

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
                    <Link style={{ color: "white" }} to={link.link}>
                      {link.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
  }

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-row-1 footer-row">
          {createFooterContent(footer.slice(0, 4))}
          <div className="footer-follow-section">
            <div className={`footer-follow-content footer-follow-content`}>
              <h5 style={{ color: "#FFD600", fontWeight: "600" }}>
                {footer[4].title}
              </h5>
              <span>{footer[4].content}</span>
              <ul
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {footer[4].links &&
                  footer[4].links.map((link, index) => {
                    return (
                      <li key={`5${index}`}>
                        <Link style={{ color: "white" }} to={link.link}>
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={`footer-follow-content footer-follow-content`}>
              <h5 style={{ color: "#FFD600", fontWeight: "600" }}>
                {footer[5].title}
              </h5>
              <span>{footer[5].content}</span>
              <ul>
                {footer[5].links &&
                  footer[5].links.map((link, index) => {
                    return (
                      <li key={`6${index}`}>
                        <Link style={{ color: "white" }} to={link.link}>
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-row-2 footer-row">
          {createFooterContent(footer.slice(6, 9))}
        </div>
      </div>
    </div>
  );
}
