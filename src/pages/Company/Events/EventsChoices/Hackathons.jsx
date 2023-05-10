import React from "react";
import "./Hackathons.css";
import HackathonCard from "./HackathonCards";
import { Bucket_URL } from "../../../../services/APIUtils";

const Hackathons = () => {
  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;
  const hackathonsList = [
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
    {
      name: "BuzzOnEarth Solution ChallengeIndia Level Hackathon",
      logo: `${bucket}iit.svg`,
      imgBanner: `${bucket}iitBanner.png`,
      locations: "IIT, Kharagpur",
      tags: ["#Competition", "#Challenge", "#Google", "+2 more"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1231,
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
      name: "BuzzOnEarth Solution ChallengeIndia Level Hackathon",
      logo: `${bucket}iit.svg`,
      imgBanner: `${bucket}iitBanner.png`,
      locations: "IIT, Kharagpur",
      tags: ["#Competition", "#Challenge", "#Google", "+2 more"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
      hackId: 1231,
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
