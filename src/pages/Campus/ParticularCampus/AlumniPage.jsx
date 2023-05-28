import { useEffect, useState } from "react";
import "./AlumniPage.css";
import Girl from "./girl.jpeg";
import Uber from "./uber.png";
import AlumniGlobalCard from "../../../components/AlumniGlobalCard/AlumniGlobalCard";
import AlumniLocalCard from "../../../components/AlumniLocalCard/AlumniLocalCard";
import colorWheel from "../../../assets/colorWheel";
import useNavbar from "../../../hooks/use-navbar";
import LoadingPage from "../../../components/Loader/LoadingPage";

export default function AlumniPage() {
  const { setSelectedPageNavbar } = useNavbar();

  const [bestAlumni, setBestAlumni] = useState([
    {
      _id: 1,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
    {
      _id: 2,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
    {
      _id: 3,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
    {
      _id: 4,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
    {
      _id: 5,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
    {
      _id: 6,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      campus: "IIT Delhi",
      batch: "2015",
      image: Girl,
    },
  ]);
  const [alumni, setAlumni] = useState([
    {
      _id: 1,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 2,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 3,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 4,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 5,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 6,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 7,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 8,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
    {
      _id: 9,
      name: "Name Surname",
      designation: "SDE at Microsoft",
      batch: "2015",
      image: Girl,
      company: Uber,
    },
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("campus");
  }, []);

  const alumniPage = (
    <div className="alumni-page">
      <div className="best-alumni-container">
        <p className="heading">Meet the India’s Best Alumnis</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
          mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam
          eu enim dignissim donec ultrices dis amet ipsum.
        </p>
        <div className="best-alumni">
          {bestAlumni.map((alumni) => (
            <AlumniGlobalCard key={alumni._id} {...alumni} />
          ))}
        </div>
      </div>
      <div className="campus-alumni-container">
        <p className="heading">Meet the Alumnis from your Campus</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
          mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam
          eu enim dignissim donec ultrices dis amet ipsum.
        </p>
        {/* <div className="search-bar">
      <input type="text" placeholder="Search" />
    </div> */}
        <div className="alumni-container">
          {alumni.map((alumni, index) => (
            <AlumniLocalCard
              color={colorWheel[index % 4]}
              key={alumni._id}
              {...alumni}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return alumni.length !== 0 || bestAlumni.length !== 0 ? (
    alumniPage
  ) : (
    <LoadingPage />
  );
}
