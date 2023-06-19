import React from "react";
import "./Hackathons.css";
import HackathonCard from "./HackathonCards";
import { Bucket_URL } from "../../../../services/APIUtils";

const Hackathons = () => {
  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;
  const hackathonsList = [
    {
      name: "PhonePe SDET Hiring Challenge",
      logo: `${bucket}google.svg`,
      imgBanner: `${bucket}googleBanner.png`,
      locations: "Remote",
      tags: ["#Data Structures", "#UI Automation/API Automation", "#CICD","#Performance Testing"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1234,
      brief:
        "coading challange base on hiring",
      rules: [
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        // "Ullamcorper suspendisse porttitor cras nulla.",
        // "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        // "Lectus commodo cursus ut eleifend faucibus eget enim.",
        // "Vitae donec egestas purus diam venenatis aliquet.",
        // "Ultricies in sit ullamcorper habitant pretium facilisis.",
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "02 June 2023, 03:00 IST",
        feeDate: "02 July 2023, 03:00 IST",
        submission: "14 April 23, 03:00 IST",
        results: "14 April 23, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 9219609226" },
          { name: "Name Surname", phone: "+91 6393974108" },
        ],
      },
    },
    {
      name: "Doceree Software Engineer (Java)",
      logo: `${bucket}prodigy.svg`,
      imgBanner: `${bucket}prodigyBanner.png`,
      locations: "Remote",
      tags: ["Java", "Data Structure", "Algorithms", "Database"],
      stats: {
        stars: 0,
        views: 0,
        days: 5,
      },
      hackId: 1233,
      brief:
        "Doceree is looking for a Software Engineer (Java) with 2-4 years of experience to join our adserver team who can write java code, is good in problem solving, data structures and algorithms, databases and have an eye for details and edge cases.",
      rules: [
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        // "Ullamcorper suspendisse porttitor cras nulla.",
        // "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        // "Lectus commodo cursus ut eleifend faucibus eget enim.",
        // "Vitae donec egestas purus diam venenatis aliquet.",
        // "Ultricies in sit ullamcorper habitant pretium facilisis.",
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "20/06/2023, 03:00 IST",
        feeDate: "03/07/2023, 03:00 IST",
        submission: "03/07/2023, 03:00 IST",
        results: "05/07/2023, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 9219609226" },
          { name: "Name Surname", phone: "+91 6393974108" },
        ],
      },
    },
    {
      name: "Hiring contest GP LAUNCHPAD",
      logo: `${bucket}accenture.svg`,
      imgBanner: `${bucket}accentureBanner.png`,
      locations: "Remote",
      tags: ["#Competition", "#Challenge", "#Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1232,
      brief:
        "On the successful completion of the coding challenges, the participants will be evaluated based on written code, approach on solving the problem and efficiency of the program. The recruitment process will include technical and behavioral focused discussions.",
      rules: [
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        // "Ullamcorper suspendisse porttitor cras nulla.",
        // "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        // "Lectus commodo cursus ut eleifend faucibus eget enim.",
        // "Vitae donec egestas purus diam venenatis aliquet.",
        // "Ultricies in sit ullamcorper habitant pretium facilisis.",
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "02/06/2023, 03:00 IST",
        feeDate: "02/07/2023, 03:00 IST",
        submission: "02/07/2023, 03:00 IST",
        results: "05/07/2023, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 6393974108" },
          { name: "Name Surname", phone: "+91 9219609226" },
        ],
      },
    },
    {
      name: "Software Development Trac FLIPKART",
      logo: `${bucket}iit.svg`,
      imgBanner: `${bucket}iitBanner.png`,
      locations: "Remote",
      tags: ["#Competition", "#Challenge", "#Google", "+2 more"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1231,
      brief:
        "coading challenges for hiring ",
      rules: [
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        // "Ullamcorper suspendisse porttitor cras nulla.",
        // "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        // "Lectus commodo cursus ut eleifend faucibus eget enim.",
        // "Vitae donec egestas purus diam venenatis aliquet.",
        // "Ultricies in sit ullamcorper habitant pretium facilisis.",
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "07/06/2023, 03:00 IST",
        feeDate: "07/06/2023, 03:00 IST",
        submission: "13/07/2023, 03:00 IST",
        results: "13/07/2023, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 9219609226" },
          { name: "Name Surname", phone: "+91 6393974108" },
        ],
      },
    },
    {
      name: "Hiring contest - GFG",
      logo: `${bucket}google.svg`,
      imgBanner: `${bucket}googleBanner.png`,
      locations: "Remote",
      tags: ["#Competition", "#Challenge", "#GFG"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1234,
      brief:
        "MEGA JOB HIRING",
      rules: [
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
        // "Ullamcorper suspendisse porttitor cras nulla.",
        // "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
        // "Lectus commodo cursus ut eleifend faucibus eget enim.",
        // "Vitae donec egestas purus diam venenatis aliquet.",
        // "Ultricies in sit ullamcorper habitant pretium facilisis.",
        // "Lorem ipsum dolor sit amet consectetur.",
        // "Scelerisque amet turpis senectus arcu rhoncus arcu.",
        // "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
        // "Faucibus maecenas nulla rhoncus vel.",
        // "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      ],
      details:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum",
      dates: {
        registration: "05/06/2023, 03:00 IST",
        feeDate: "05/06/2023, 03:00 IST",
        submission: "05/07/2023, 03:00 IST",
        results: "05/07/2023, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 9219609226" },
          { name: "Name Surname", phone: "+91 6393974108" },
        ],
      },
    },
    {
      name: "HPE - Operating-Systems-Engineer",
      logo: `${bucket}iit.svg`,
      imgBanner: `${bucket}iitBanner.png`,
      locations: "Remote",
      tags: ["Python", "Docker", "Cloud", "KVM", "SAS"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1231,
      brief:
        "Responsible for creating and maintaining the Containerized/Virtual operating systems for HPE Storage System. Customize device OSs to meet Engineering and Market requirements. Works in a team environment, closely collaborating with the software and hardware engineering team. Provides support for members of the engineering team and other departments as required. A strong attention to detail and through knowledge of OS configuration and deployment is required for this position. To ensure success as a Virtual OS engineer, you should exhibit sound knowledge of Virtualization and related technologies, and experience in a similar role.",
      // rules: [
      //   "Lorem ipsum dolor sit amet consectetur.",
      //   "Scelerisque amet turpis senectus arcu rhoncus arcu.",
      //   "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
      //   "Faucibus maecenas nulla rhoncus vel.",
      //   "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      //   "Ullamcorper suspendisse porttitor cras nulla.",
      //   "Gravida sit curabitur pulvinar tempus diam sed aenean ipsum.",
      //   "Lectus commodo cursus ut eleifend faucibus eget enim.",
      //   "Vitae donec egestas purus diam venenatis aliquet.",
      //   "Ultricies in sit ullamcorper habitant pretium facilisis.",
      //   "Lorem ipsum dolor sit amet consectetur.",
      //   "Scelerisque amet turpis senectus arcu rhoncus arcu.",
      //   "Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum.",
      //   "Faucibus maecenas nulla rhoncus vel.",
      //   "Urna enim consequat leo justo tortor maecenas ipsum arcu elementum.",
      // ],
      details:
        "Responsible for creating and maintaining the Containerized/Virtual operating systems for HPE Storage System. Customize device OSs to meet Engineering and Market requirements. Works in a team environment, closely collaborating with the software and hardware engineering team. Provides support for members of the engineering team and other departments as required. A strong attention to detail and through knowledge of OS configuration and deployment is required for this position. To ensure success as a Virtual OS engineer, you should exhibit sound knowledge of Virtualization and related technologies, and experience in a similar role.",
      dates: {
        registration: "20/06/2023, 03:00 IST",
        feeDate: "20/06/2023, 03:00 IST",
        submission: "15/07/2023, 03:00 IST",
        results: "15/07/2023, 03:00 IST",
      },
      prize: {
        first: "25,000",
        second: "15,000",
      },
      certificate: ["merit", "participation"],
      contact: {
        email: "career@engineerhub.in ",
        users: [
          { name: "Name Surname", phone: "+91 6393974108" },
          { name: "Name Surname", phone: "+91 9219609226" },
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
  return (
    <div className="Hackathons">
      <div className="hackathonTiles">
        {hackathonsList.map((item, index) => {
          return (
            <a href={`/company/events/hackathons/${item.hackId}`} key={index}>
              <HackathonCard details={item} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Hackathons;
