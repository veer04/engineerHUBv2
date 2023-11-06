import { useEffect, useState } from "react";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import "./CampusSearchPage.css";
import {
  controller,
  getAllCampuses,
  getCampusPageSearchResult,
} from "../../services/APIConfig";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListAlumni from "../../components/TrendingList/TrendingListAlumni";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Page404 from "../Maintenance/Page404";
import LoadingPage from "../../components/Loader/LoadingPage";

export default function CampusSearchPage() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");
  const [campuses, setCampus] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [viewAllCampus, setViewAllCampus] = useState(false);
  const [viewAllClubs, setViewAllClubs] = useState(false);
  const [viewAllAlmas, setViewAllAlmas] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampusPageSearchResult(setResult, collegeId);
    getAllCampuses(setAllCampuses);
    // getCampusById(setCampusData, collegeId);
    // getCampusAlumni(setAlumni, collegeId);

    return () => {
      controller.abort();
      setResult({});
    };
  }, [collegeId]);

  useEffect(() => {
    console.log(result);
    if (Object.keys(result).length !== 0) {
      setCampus(result?.data?.data?.campusData);
      setClubs(result?.data?.data?.clubData);
      setAlumni(result?.data?.data?.alumniData);
    }
    setViewAllCampus(false);
    setViewAllClubs(false);
    setViewAllAlmas(false);
  }, [result]);

  // useEffect(() => {
  //   if (Object.keys(campusData).length !== 0) {
  //     setCampus(campusData?.data?.data);
  //   }
  // }, [campusData]);

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
            placeholder="Search any Campus, Clubs or Alumni"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      <div className="campus-search-page__container">
        <div className="column column-1">
          <div className="campus result-container">
            <span className="title">Campuses</span>
            {campuses.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <i style={{ color: "grey" }}>No campus found</i>
              </div>
            )}
            {/* {clubs.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )} */}
            {campuses
              .slice(0, viewAllCampus ? campuses.length : 3)
              .map((campus, index) => (
                <>
                  <div
                    key={campus._id}
                    onClick={() => navigate(`/campus/${campus._id}`)}
                    className="box"
                  >
                    <div className="logo">
                      <img src={campus?.collegeLogo} alt="" />
                    </div>
                    <div className="content">
                      <span className="name text-crop-1">
                        {campus.collegeName}
                      </span>
                      <span className="location text-crop-1">{`${campus?.city}, ${campus?.state}`}</span>
                      <span className="description text-crop-3">
                        {campus.aboutUs}
                      </span>
                    </div>
                  </div>
                  {campuses.length > 3 ? (
                    <hr />
                  ) : index !== campuses.length - 1 ? (
                    <hr />
                  ) : (
                    ""
                  )}
                </>
              ))}
            {campuses.length > 3 && !viewAllCampus && (
              <div
                onClick={() => setViewAllCampus(true)}
                className="view-more_container"
              >
                <button>
                  <BsChevronDown /> View More
                </button>
              </div>
            )}
            {viewAllCampus && (
              <div
                onClick={() => setViewAllCampus(false)}
                className="view-more_container"
              >
                <button>
                  <BsChevronUp /> View Less
                </button>
              </div>
            )}
          </div>
          <div className="clubs club-container result-container">
            <span className="title">Clubs</span>
            {clubs.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <i style={{ color: "grey" }}>No club found</i>
              </div>
            )}
            {/* {clubs.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )} */}
            {clubs
              .slice(0, viewAllClubs ? clubs.length : 3)
              .map((club, index) => (
                <>
                  <div
                    onClick={() => navigate(`/profile/club/${club._id}`)}
                    key={club._id}
                    className="box"
                  >
                    <div className="logo">
                      <img src={club?.image} alt="" />
                    </div>
                    <div className="content">
                      <span className="name text-crop-1">{club.name}</span>
                      <span className="location college text-crop-1">
                        {`${!!club.city ? club.city : ""}${
                          !!club.state ? `, ${club.state}` : ""
                        }`}
                      </span>
                      <span className="description text-crop-2">
                        {club.aboutUs || club.description}
                      </span>
                    </div>
                  </div>
                  {clubs.length > 3 ? (
                    <hr />
                  ) : index !== clubs.length - 1 ? (
                    <hr />
                  ) : (
                    ""
                  )}
                </>
              ))}
            {clubs.length > 3 && !viewAllClubs && (
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
            {alumni.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <i style={{ color: "grey" }}>No alma found</i>
              </div>
            )}
            {/* {alumni.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )} */}
            {alumni
              .slice(0, viewAllAlmas ? alumni.length : 3)
              .map((alma, index) => (
                <>
                  <div
                    onClick={() => navigate(`/profile/user/${alma._id}`)}
                    key={alma._id}
                    className="box"
                  >
                    <div className="logo">
                      <img src={alma.image} alt="" />
                    </div>
                    <div className="content">
                      <span className="name text-crop-1">{`${alma.firstName} ${alma.lastName}`}</span>
                      <span className="location college text-crop-1">
                        {`${!!alma.city ? alma.city : ""}${
                          !!alma.state ? `, ${alma.state}` : ""
                        }`}
                      </span>
                      <span className="description text-crop-2">
                        {!!alma?.experienceDetails?.length
                          ? `${alma?.experienceDetails[0]?.designation} | ${alma?.experienceDetails[0]?.organisationName}`
                          : `${!!alma?.aboutMe ? alma?.aboutMe : ""}`}
                      </span>
                    </div>
                  </div>
                  {alumni.length > 3 ? (
                    <hr />
                  ) : index !== alumni.length - 1 ? (
                    <hr />
                  ) : (
                    ""
                  )}
                </>
              ))}
            {alumni.length > 3 && !viewAllAlmas && (
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

  return !!Object.keys(result).length ? (
    result?.status >= 200 && result?.status <= 300 ? (
      renderCampusSearchPage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
