import { useEffect, useState } from "react";
import "./CampusDetails.css";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import {
  getAllCampuses,
  getCampusAlumniAndClub,
  getCampusById,
} from "../../services/APIConfig";
import { useNavigate, useParams } from "react-router-dom";
import ImageCarousel2 from "../../components/ImageCarousel2/ImageCarousel2";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import ClubsList from "../../components/TrendingList/ClubsList";
import AlumniList from "../../components/TrendingList/AlumniList";
import Page404 from "../Maintenance/Page404";
import LoadingPage from "../../components/Loader/LoadingPage";

export default function CampusDetails() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  //   const [width, setWidth] = useState(window.innerWidth);
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampusById(setCampusData, collegeId);
    getAllCampuses(setAllCampuses);
    getCampusAlumniAndClub(setResult, collegeId);

    // const handleResize = () => setWidth(window.innerWidth);
    // window.addEventListener("resize", handleResize);
    return () => {
      setCampus({});
      //   window.removeEventListener("resize", handleResize);
    };
  }, [collegeId]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    if (output) {
      navigate(`/campus/search/${output}`);
    }
  }, [output]);

  useEffect(() => {
    if (Object.keys(campusData).length !== 0) {
      setCampus(campusData?.data?.data);
    }
  }, [campusData]);

  const renderCampusDetails = (
    <main className="campus-details">
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={allCampuses}
            placeholder="Search any Campus, Clubs or Alumni"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      <ImageCarousel2 photos={campus?.collegePhoto} />
      <section className="intro">
        <div className="logo">
          <img src={campus?.collegeLogo} alt="logo" />
        </div>
        <div className="content">
          <div className="header">
            <div className="left">
              <span className="name text-crop-1">{campus?.collegeName}</span>
              <span className="location text-crop-1">{`${campus?.city}, ${campus?.state}`}</span>
              <div className="rating">
                Rating: {campus?.rating}/5
                {/* <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
                <BsStar /> */}
              </div>
            </div>
            <div className="right">
              <button
                onClick={() => {
                  console.log("object");
                  navigate(`/campus/${collegeId}/details`);
                }}
                className="view-more"
              >
                View More
              </button>
            </div>
          </div>
          <div className="mobile-view">
            <button
              onClick={() => {
                console.log("object");
                navigate(`/campus/${collegeId}/details`);
              }}
              className="view-more"
            >
              View More
            </button>
          </div>
          <span className="description text-crop-2">{campus?.aboutUs}</span>
        </div>
      </section>
      <section className="more-details">
        <AlumniList data={result?.data?.data?.alumni} />
        <ClubsList data={result?.data?.data?.clubs} />
        <TrendingListColleges />
      </section>
    </main>
  );

  return !!Object.keys(campusData).length ? (
    campusData?.status >= 200 && campusData?.status <= 300 ? (
      renderCampusDetails
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
