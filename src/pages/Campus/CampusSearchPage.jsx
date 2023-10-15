import { useEffect, useState } from "react";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import "./CampusSearchPage.css";
import {
  controller,
  getAllCampuses,
  getCampusAlumni,
  getCampusById,
} from "../../services/APIConfig";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListAlumni from "../../components/TrendingList/TrendingListAlumni";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import Page404 from "../Maintenance/Page404";
import LoadingPage from "../../components/Loader/LoadingPage";

export default function CampusSearchPage() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});
  const [clubs, setClubs] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [viewAllClubs, setViewAllClubs] = useState(false);
  const [viewAllAlmas, setViewAllAlmas] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCampuses(setAllCampuses);
    getCampusById(setCampusData, collegeId);
    getCampusAlumni(setAlumni, collegeId);

    return () => {
      controller.abort();
      setCampusData({});
    };
  }, [collegeId]);

  useEffect(() => {
    if (Object.keys(campusData).length !== 0) {
      setCampus(campusData?.data?.data);
    }
  }, [campusData]);

  useEffect(() => {
    console.log("clubs: ", clubs);
  }, [clubs]);

  useEffect(() => {
    console.log("alumni: ", alumni);
  }, [alumni]);

  useEffect(() => {
    if (output) {
      navigate(`/campus/search/${output}`);
    }
  }, [output]);

  const renderCampusSearchPage = (
    <main className="campus-search-page">
      <h1 className="heading-3">Campus</h1>
      <h2 className="subheading-1">
        What's happening inside is no more hidden now !
        <strong> Explore--Network--Participate--Host</strong>
      </h2>
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={allCampuses}
            placeholder="You are looking for which Campus?"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      <div className="campus-search-page__container">
        <div className="column column-1">
          <div className="campus result-container">
            <div
              onClick={() => navigate(`/campus/${campus._id}`)}
              className="box"
            >
              <div className="logo">
                <img src={campus?.collegeLogo} alt="" />
              </div>
              <div className="content">
                <span className="name text-crop-1">{campus.collegeName}</span>
                <span className="location text-crop-1">{`${campus?.city}, ${campus?.state}`}</span>
                <span className="description text-crop-4">
                  {campus.aboutUs}
                </span>
              </div>
            </div>
          </div>
          <div className="clubs club-container result-container">
            <span className="title">Clubs</span>
            {false && (
              <div className="w-full d-flex justify-content-center">
                <i>No club found</i>
              </div>
            )}
            {clubs.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )}
            {clubs.slice(0, viewAllClubs ? clubs.length : 3).map((club) => (
              <>
                <div key={club._id} className="box">
                  <div className="logo">
                    <img src={club?.image} alt="" />
                  </div>
                  <div className="content">
                    <span className="name text-crop-1">{club.clubName}</span>
                    <span className="location college text-crop-1">
                      {club.location}
                    </span>
                    <span className="description text-crop-2">
                      {club.description}
                    </span>
                  </div>
                </div>
                <hr />
              </>
            ))}
            {clubs.length !== 0 && !viewAllClubs && (
              <div
                onClick={() => setViewAllClubs(true)}
                className="view-more_container"
              >
                <button>
                  <BsChevronDown /> View More
                </button>
              </div>
            )}
            {viewAllClubs && (
              <div
                onClick={() => setViewAllClubs(false)}
                className="view-more_container"
              >
                <button>
                  <BsChevronUp /> View Less
                </button>
              </div>
            )}
          </div>
          <div className="alma alma-container result-container">
            <span className="title">Alumni</span>
            {false && (
              <div className="w-full d-flex justify-content-center">
                <i>No alma found</i>
              </div>
            )}
            {alumni.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )}
            {alumni.slice(0, viewAllAlmas ? alumni.length : 3).map((alma) => (
              <>
                <div key={alma._id} className="box">
                  <div className="logo">
                    <img src={alma.image} alt="" />
                  </div>
                  <div className="content">
                    <span className="name text-crop-1">{alma.almaName}</span>
                    <span className="location college text-crop-1">
                      {alma.location}
                    </span>
                    <span className="description text-crop-2">
                      {alma.description}
                    </span>
                  </div>
                </div>
                <hr />
              </>
            ))}
            {alumni.length !== 0 && !viewAllAlmas && (
              <div
                onClick={() => setViewAllAlmas(true)}
                className="view-more_container"
              >
                <button>
                  <BsChevronDown /> View More
                </button>
              </div>
            )}
            {viewAllAlmas && (
              <div
                onClick={() => setViewAllAlmas(false)}
                className="view-more_container"
              >
                <button>
                  <BsChevronUp /> View Less
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="column column-2">
          <TrendingListColleges />
          <TrendingListAlumni />
          <TrendingListClubs />
        </div>
      </div>
    </main>
  );

  return !!Object.keys(campusData).length ? (
    campusData?.status >= 200 && campusData?.status <= 300 ? (
      renderCampusSearchPage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
