import React, { useState } from "react";
import imgBanner from "../../../assets/images/spotifyImg.png";
import orgLogo from "../../../assets/images/eduncle.svg";
import { useParams } from "react-router-dom";
import ProjectDesc from "./ProjectDesc";
import ProjectCards from "./ProjectCards";
import "./ProjectDetail.css";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";

const ProjectDetail = () => {
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
      projectId: 1234,
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
      projectId: 1234,
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
      projectId: 1234,
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
      projectId: 1234,
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
      projectId: 1234,
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
      projectId: 1234,
    },
  ];
  const [search, setSearch] = useState("");
  const { projectId } = useParams();
  console.log(
    HTMLEntries.filter((item) => item.projectId === parseInt(projectId))
  );
  return (
    <div className="ProjectDetail">
      <div className="ProjectTiles">
        <h1>Projects</h1>
        <div className="search">
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
        </div>
        {HTMLEntries.map((item, index) => {
          return <ProjectCards data={item} key={index} />;
        })}
      </div>
      <div className="ProjectDescContainer">
        {projectId === undefined ? (
          <div></div>
        ) : (
          <ProjectDesc
            data={
              HTMLEntries.filter(
                (item) => item.projectId === parseInt(projectId)
              )[0]
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
