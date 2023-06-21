import "./Company.css";
import JobCards from "./Jobs/JobCards";
import HackathonCard from "./Events/EventsChoices/HackathonCards";
import { Bucket_URL } from "../../services/APIUtils";
import { useEffect, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import { controller } from "../../services/APIConfig";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      desc: "Participate in the events directly conducted by the companies to highlight your profile.",
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
      desc: "Apply for the jobs of your interest and get the offer letter in the next step.",
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
      desc: "Paid projects that gives you hands-on experience for better career.",
      char: `${bucket}ProjectChar.svg`,
      background: "#B2E887",
      stats: {
        position: "30",
        hiring: "10",
      },
      link: "/company/projects",
    },
    // {
    //   name: "be an intern",
    //   desc: "Grab Paid Internships and Training programs for your Summer and Winter Holidays.",
    //   char: `${bucket}InternChar.svg`,
    //   background: "#E8BA98",
    //   stats: {
    //     position: "30",
    //     hiring: "10",
    //   },
    //   link: "/company/events",
    // },
  ];
  const JobCardEntries = [
    {
      name: "Software Engineer",
      tags: ["Engineer", "Developer", "C#", "DevOps", "OOPs"],
      ctc: "14-16 LPA",
      location: "Gurugram, India",
      logo: `${bucket}uber.svg`,
      bg: "#8FC8E8",
      jobId: 1234,
      org: "NatWest Group",
      desc: " Our people work differently depending on their jobs and needs. From hybrid working to flexible hours , we have plenty of options that help our people to thrive.This role is based in India and as such all normal working days must be carried out in India.Join us as a Software Engineer In your new role, you’ll engineer and maintain innovative, customer centric, high performance, secure and robust solutions We’ll look to you to design and engineer software focusing on the customer or user experience as the primary objective It’s a chance to hone your existing technical skills and advance your career as you develop the discipline of software engineering across the business This role is available at associate level",
      req: [
        "What you'll do As a Software Engineer, you’ll design, develop and deploy applications capable of meeting and exceeding the anticipated load, performance and availability volumes, including load balancing, performance testing and benchmarking. You'll be working across the life cycle, from requirements analysis and design, through coding to testing, deployment and operations.",
        "coding to testing, deployment and operations. You’ll be working within a feature team and using extensive experience to engineer software, scripts and tools that are often complex, as well as liaising with other engineers, architects and business analysts across the platform.  You’ll also be:  ",
        "Writing code in C# to build market data exchange",
        "Delivering for key initiatives funding work in market data exchange",
        "Providing L3 support to market data exchange consumers.",
        "Maintaining DevOps pipeline.",
        "Collaborating to optimise our software engineering capability",
        "Designing, producing, testing and implementing our working code",
      ],
      info: {
        salary: "14,75,000/-",
        availability: "08hr/day",
        type: "Hybrid",
      },
    },
    {
      name: "Associate Software Engineer",
      tags: [
        ".NET",
        "RESTful API",
        "SQL",
        "Github",
        "JIRA",
        "Confluence",
        "Slack or similar",
      ],
      ctc: "10-12 LPA",
      location: "Bengaluru, India",
      logo: `${bucket}google.svg`,
      bg: "#B2E887",
      jobId: 1233,
      org: "OutSystems",
      desc: "As the #1 low-code application development platform, OutSystems provides customers with everything they need to build apps incredibly fast. So, let us cut to the chase: we have an immediate opportunity to be part of our APAC leadership team – Associate Software Engineer to be based in India.",
      req: [
        "Build and maintain a strong hands-on understanding of our product, its capabilities and major customer use cases for the OutSystems platform.",
        "Be part of a dynamic and technically diverse group of engineers across geographies, where you will get to influence, contribute, learn and grow top notch technical skill sets, while building the next generation Identity for OutSystems Developers and end users. ",
        "Implement microservices at scale with low latency.",
        "Troubleshoot issues in the platform and contribute to root cause analysis along with team members.",
        "Participate in all Agile ceremonies, representing quality to provide estimates, test status and risk assessment.",
        "Bachelor or Master's Degree in Software Engineering, Computer Science, or similar. If you do not have one but you have equivalent real-world experience (and can show it), we still want to hear from you.",
        "0-2 years of building software applications running in a large-scale distributed computing infrastructure in a cloud environment",
        "Non nec tristique consectetur sed non scelerisque magna ut adipiscingKnowledge of APIs and web services (RESTful). ",
        "Knowledge of .NET technologies",
        "Familiarity with SQL.",
        "Good troubleshooting skills.",
        "Experience with Github, JIRA, Confluence, Slack or similar.",
        "AWS knowledge is a plus.",
      ],
      info: {
        salary: "50000/-",
        availability: "08hr/day",
        type: "Full-Time",
      },
    },
    {
      name: "Associate Software Engineer",
      tags: ["Java", "kotlin"],
      ctc: "9-10.5 LPA",
      location: "Bengaluru, India",
      logo: `${bucket}microsoft.svg`,
      bg: "#E8BA98",
      jobId: 1232,
      org: "Victoria’s Secret ",
      desc: "The responsibility of the mobile Android Associate Engineer is to provide technology solutions for projects and daily support. The developer ensures that he learns Android development languages quickly, adherence to current standards and maintains a commitment to high quality development and implementations. This individual will work under the technology expertise and guidance of a senior engineer and should be able to learn and start delivering by himself.",
      req: [
        "Collaborate with the mentor to learn Android coding and developmental technologies. ",
        "Start delivering Mobile Android user stories. ",
        "Collaborate with development and business teams to understand the process, systems, and business requirements.",
        "Build and maintain re-usable components and scripts.",
        "Ensure the quality of developed solutions through appropriate testing cycles in partnership with a testing team",
        "Prepare and maintain necessary documentation related to the code that is being developed.",
        "B.E/B.Tech Graduate on computer science or related branch.",
        "0 to 1 years of Mobile software development experience.",
        " Hands-on experience with full-stack application design, development and automation",
        "Knowledge on Java, kotlin, and device API’s.",
        "Team player",
        "Organized and self-motivated.",
        "Works well under pressure ",
        "Flexible to work odd hours, including weekends",
        "Excellent written and verbal communication skills",
      ],
      info: {
        salary: "42000/-",
        availability: "08hr/day",
        type: "Full-Time",
      },
    },
    {
      name: "Data Scientist",
      tags: ["Engineer", "Developer"],
      ctc: "10-12 LPA",
      location: "IN_Bangalore_EOIZ Indust Area Campus",
      logo: `${bucket}uber.svg`,
      bg: "#8FC8E8",
      jobId: 1234,
      org: "HARMAN International ",
      desc: "HARMAN’s engineers and designers are creative, purposeful and agile. As part of this team, you’ll combine your technical expertise with innovative ideas to help drive cutting-edge solutions in the car, enterprise and connected ecosystem. Every day, you will push the boundaries of creative design, and HARMAN is committed to providing you with the opportunities, innovative technologies and resources to build a successful career. A Career at HARMAN As a technology leader that is rapidly on the move, HARMAN is filled with people who are focused on making life better. Innovation, inclusivity and teamwork are a part of our DNA. When you add that to the challenges we take on and solve together, you’ll discover that at HARMAN you can grow, make a difference and be proud of the work you do everyday..",
      req: [
        "Lorem ipsum dolor sit amet consectetur.Design and implement effective database solutions and models to store and retrieve data after identify source data structures. Proin ac blandit sed hac volutpat mauris lacus. ",
        "Discover trends and patterns, combine various algorithms and modules and bring up the data representation using various data visualization techniques and tools.",
        "Implementing end-to-end data modeling, from the technical architecture, and developing the application to finally testing and implementing the proposed solution.",
        "Development experience on GCP (Bigquery and Vertex AI) and good to have AWS knowledge as well.",
        "Good to have database management and administration knowledge",
        "Knowledge of programming languages Python, C/C++, Java, and Perl HARMAN is an Equal Opportunity /Affirmative Action employer.",
        " All qualified applicants will receive consideration for employment without regard to race,color, religion, sex, sexual orientation, gender identity, national origin,disability or Protected Veterans status. HARMAN offers a great work environment, challenging career opportunities, professional training and competitive compensation",
      ],
      info: {
        salary: "24000/-",
        availability: "08hr/day",
        type: "Full-Time",
      },
    },
    {
      name: "Junior Software Developer (Java & Python)",
      tags: ["Java", "Python", "C++", "ASP.Net", "MySQL", "MongoDB"],
      ctc: "8-11 LPA",
      location: "KOCHI, INDIA ",
      logo: `${bucket}google.svg`,
      bg: "#F7D77F",
      jobId: 1233,
      org: "Nielsen",
      desc: "Build, test, maintain and extend Big Data Pipeline processing large datasets pertaining to Audience Measurement;      .",
      req: [
        "A degree in computer science, software engineering, or a related field is required.",
        "1-3 years of experience in one or more programming languages such as Java, Python, C++, ASP.Net is required. ",
        "Knowledge of database systems like MySQL or MongoDB is required. Experience in writing complex SQL queries is a plus.",
        "Deep understanding of AWS services and hands-on experience is a plus.",
        "Should be able to analyze complex problems and come up with creative solutions.",
        "Should be able to effectively communicate technical information to team members and stakeholders.",
        "Must have a high level of attention to detail to ensure code is written accurately and with minimal errors.",
        "Experience with development tools like Git, JIRA, or Trello is required.",
        "Should be able to work well in a team environment, collaborating with other developers, project managers, and other stakeholders.",
        "Ability to learn new technologies and programming languages quickly.",
        "As the arbiter of truth, Nielsen Global Media fuels the media industry with unbiased, reliable data about what people watch and listen to. To discover what’s true, we measure across all channels and platforms⁠—from podcasts to streaming TV to social media. And when companies and advertisers are armed with the truth, they have a deeper understanding of their audiences and can accelerate growth.",
      ],
      info: {
        salary: "55000/-",
        availability: "08hr/day",
        type: "Remote",
      },
    },
    {
      name: "Software System Designer 1",
      tags: ["C++", "Perl", "Python", "Shell", "TCL/TK", "AutoIT"],
      ctc: "7-8.5 LPA",
      location: "Hyderabad, India",
      logo: `${bucket}microsoft.svg`,
      bg: "#E8BA98",
      jobId: 1232,
      org: "Microsoft",
      desc: "WHAT YOU DO AT AMD CHANGES EVERYTHING We care deeply about transforming lives with AMD technology to enrich our industry, our communities, and the world. Our mission is to build great products that accelerate next-generation computing experiences – the building blocks for the data center, artificial intelligence, PCs, gaming and embedded. Underpinning our mission is the AMD culture. We push the limits of innovation to solve the world’s most important challenges. We strive for execution excellence while being direct, humble, collaborative, and inclusive of diverse perspectives. This is who we are at our best. One Company. One Team.AMD together we advance SOFTWARE SYSTEM DESIGNER 1",
      req: [
        "This is an exciting role in which you will have excellent exposure to all the latest AMD (Advanced Micro Devices) technologies. Imagine yourself as part of the team which will deliver our next generation of our products or automation for many of our reference solutions. This is a phenomenal opportunity to work in an outstanding company like AMD.   ",
        "You are a self-starter who is able to achieve successful outcomes in a non-hierarchical environment. Detailed oriented, you have the ability to multitask through planning/organizing.  You have excellent communication and presentation skills and a passion to push the limits of software on innovative platforms. ",
        "Performance analysis and software optimization",
        "Build and deploy software for the most advanced HPC (High Performance Compute), data science, Virtualization, and machine learning platforms in the world",
        "Define/develop/execute regression test models and track the results",
        "Drive innovation in production software environments.",
        "Combine advanced software engineering skills with a drive to explore novel approaches to solve important problems in heterogeneous computing at the large scales",
        "Evaluate and review of existing processes and continuously strive to optimize the workflow",
        "Ipsum nulla tincidunt pellentesque vitae integer vitae ut.",
        "Extensive C++ experience, preferably in production environments",
        "Prior experience of scripting with Perl, Python, Shell, TCL/TK, and AutoIT is an added advantage",
        "Knowledge of Windows and Linux environments",
        "Experience with software development process and tools such as debuggers and source code control systems a plus ",
        "Knowledge of KVM/XEN/VMWARE is a plus ",
        "Bachelors or Masters degree in Electrical Engineering, Mathematics, Computer Science, Engineering, or an equivalent ",
      ],
      info: {
        salary: "37000/-",
        availability: "08hr/day",
        type: "Full-Time",
      },
    },
  ];
  const HackathonCardEntries = [
    {
      name: "Google Problem Solution Challenge - UNESCO",
      link: "1234",
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
      link: "1233",
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
      link: "1232",
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
          EngineerHUB's mentors are truly exceptional! Their expertise and patience made learning complex engineering concepts a breeze. Highly recommended for any student seeking personalized mentorship!
          </p>
          <h6>Girish Shedge</h6>
        </div>
        <div className="reviewCard reviewCard2">
          <img style={{height: "58px",width:"58px",borderRadius:"50%", objectFit:"cover"}} src={`https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/teams/Backend/yash.jpeg`} alt="Avatar" />
          <p>
          I highly recommend EngineerHUB for students. The live batches are well-structured, and the mentors are experienced and supportive.
          </p>
          <h6>Yash Vardhan</h6>
        </div>
      </div>
    </div>
  );
};

export default Company;
