import { useEffect, useState } from "react";
import "./AlumniPage.css";
import AlumniGlobalCard from "../../../components/AlumniGlobalCard/AlumniGlobalCard";
import AlumniLocalCard from "../../../components/AlumniLocalCard/AlumniLocalCard";
import colorWheel from "../../../assets/colorWheel";
import useNavbar from "../../../hooks/use-navbar";
import LoadingPage from "../../../components/Loader/LoadingPage";
import {
  controller,
  getBestAlumni,
  getCampusAlumni,
} from "../../../services/APIConfig";
import { useParams } from "react-router-dom";

export default function AlumniPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const { collegeId } = useParams();

  const [bestAlumni, setBestAlumni] = useState([]);
  const [alumni, setAlumni] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("campus");
    getBestAlumni(setBestAlumni);
    getCampusAlumni(setAlumni, collegeId);

    return () => {
      controller.abort();
    };
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
              color={colorWheel[index % colorWheel.length]}
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
