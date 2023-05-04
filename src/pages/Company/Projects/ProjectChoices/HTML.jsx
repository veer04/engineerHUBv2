import React from "react";
import ProjectCards from "../ProjectCards";
import imgBanner from "../../../../assets/images/spotifyImg.png";
import orgLogo from "../../../../assets/images/eduncle.svg";
import "./HTML.css";

const HTML = () => {
  const HTMLEntries = [
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
    {
      name: "Spotify Clone",
      img: imgBanner,
      desc: "Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis senectus arcu rhoncus arcu. Eu auctor consectetur adipiscing pellentesque vitae amet ullamcorper enim condimentum. Faucibus maecenas nulla rhoncus vel. Urna enim consequat leo justo tortor maecenas ipsum arcu elementum. Ullamcorper suspendisse porttitor cras nulla. Gravida sit curabitur pulvinar tempus diam sed aenean ipsum. Lectus commodo cursus ut eleifend faucibus eget enim. Vitae donec egestas purus diam venenatis aliquet. Ultricies in sit ullamcorper habitant pretium facilisis.",
      organization: {
        name: "Eduncle",
        logo: orgLogo,
        submissions: 100,
      },
      software: ["Software Used", "Software Used"],
      prerequisites: [
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
        "lorem ipsum dolor sit amet consectetur",
      ],
      tags: ["HTML", "Java"],
      link: "#",
      info: {
        salary: "5000",
        availability: "2",
      },
      projectId: "1234",
    },
  ];
  return (
    <div className="HTML">
      {HTMLEntries.map((entry, index) => {
        return <ProjectCards data={entry} key={index} />;
      })}
    </div>
  );
};

export default HTML;
