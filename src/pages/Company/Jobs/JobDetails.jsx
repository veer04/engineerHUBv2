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
  const bucket2 = `${Bucket_URL}frontend/company/`;
  const { jobId } = useParams();
  const [search, setSearch] = useState("");
  const CardEntries = [
    {
      name: "Software Engineer",
      tags: ["Engineer", "Developer","C#", "DevOps", "OOPs"],
      ctc: "14-16 LPA",
      location: "Gurugram, India",
      logo: `${bucket2}Natwest.jpeg`,
      bg: "#8FC8E8",
      jobId: 1234,
      link:"https://jobs.natwestgroup.com/jobs/12779776-software-engineer?bid=370",
      org: "NatWest Group",
      desc:" Our people work differently depending on their jobs and needs. From hybrid working to flexible hours , we have plenty of options that help our people to thrive.This role is based in India and as such all normal working days must be carried out in India.Join us as a Software Engineer In your new role, you’ll engineer and maintain innovative, customer centric, high performance, secure and robust solutions We’ll look to you to design and engineer software focusing on the customer or user experience as the primary objective It’s a chance to hone your existing technical skills and advance your career as you develop the discipline of software engineering across the business This role is available at associate level",
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
      tags: [".NET", "RESTful API", "SQL", "Github", "JIRA", "Confluence", "Slack or similar"],
      ctc: "10-12 LPA",
      location: "Bengaluru, India",
      logo: `${bucket2}OutSystems.png`,
      link:"https://www.outsystems.com/careers/job-detail/8a78859e88983a4f0188a0191dd80299/?gnk=job&gni=8a78859e88983a4f0188a0191dd80299",
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
      tags: ["Java", "kotlin",],
      ctc: "9-10.5 LPA",
      location: "Bengaluru, India",
      logo: `${bucket2}Victoria.jpg`,
      link:"https://careers.victoriassecret.com/en/job/18528007/associate-software-engineer-n-bangalore-in/",
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
      logo: `${bucket2}Harman.png`,
      link:"https://harman.wd3.myworkdayjobs.com/en-US/HARMAN/job/IN_Bangalore_EOIZ-Indust-Area-Campus/Data-Scientist_R-27234-2023",
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
      tags: ["Java", "Python", "C++", "ASP.Net", "MySQL" , "MongoDB"],
      ctc: "8-11 LPA",
      location: "KOCHI, INDIA ",
      logo: `${bucket2}Nielsen.png`,
      link:"https://jobs.lever.co/nielsen/8d83cd35-666d-420c-8a08-e8901abd48bd?lever-source=LinkedIn",
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
      tags: ["C++",  "Perl", "Python", "Shell", "TCL/TK",  "AutoIT" ],
      ctc: "7-8.5 LPA",
      location: "Hyderabad, India",
      link:"https://careers.amd.com/careers-home/jobs/30489?lang=en-us&iis=Job%20Board&iisn=Linkedin",
      logo: `${bucket2}Amd.png`,
      bg: "#E8BA98",
      jobId: 1232,
      org: "AMD technology ",

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
