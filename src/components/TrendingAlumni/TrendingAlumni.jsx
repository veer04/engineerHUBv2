import React from "react";
import "./TrendingAlumni.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { Bucket_URL } from "../../services/APIUtils";
import "../../../src/pages/Campus/TrendingColleges.css";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { PiGlobeLight } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import "../../components/TrendingList/TrendingList.css";
import CampusSearchBox from "../CampusSearchBox/CampusSearchBox";
import {
  getAlumniProfileById,
  getAlumniById,
  getTrendingAlumni,
} from "../../services/APIConfig";
import { FaArrowTrendUp } from "react-icons/fa6";
import AlumniList from "../TrendingList/AlumniList";
import Page404 from "../../pages/Maintenance/Page404";
import LoadingPage from "../Loader/LoadingPage";
import default_profile_icon from "../../pages/Profile/ClubDashboard/default_profile_icon.png";
import { isUserLoggedIn, getUserId } from "../../features/User/UserDetails";
const TrendingAlumni = () => {
  const { alumniId } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [trendingList, setTrendingList] = useState([]);
  const [alumniData, setAlumniData] = useState({});
  const [alumni, setAlumni] = useState({});
  const [allAlumni, setAllAlumni] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [showAll1, setShowAll1] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const [output, setOutput] = useState("");
  const [fetchResponse, setFetchResponse] = useState({});
  const bucket2 = `${Bucket_URL}frontend/profile/dashboard/`;
  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingAlumni(setTrendingList);
    getAlumniProfileById(setAlumniData, alumniId);
    getAlumniById(setAlumni, alumniId);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      //   setAlumni({});
      window.removeEventListener("resize", handleResize);
    };
  }, [alumniId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isUserLoggedIn() && alumniId === getUserId()) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [alumniId]);
  useEffect(() => {
    console.log(trendingList);
    // console.log(allAlumni);
  }, [trendingList]);

  useEffect(() => {
    if (output) {
      navigate(`/club/search/${output}`);
    }
  }, [output]);

  useEffect(() => {
    if (Object.keys(alumniData).length !== 0) {
      setClub(alumniData?.data?.data);
    }
  }, [alumniData]);
  useEffect(() => {
    console.log(alumniData);
  }, [alumniData]);

  return (
    <main className="trending-Colleges">
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={trendingList}
            placeholder="You are looking for which Alumni?"
            searchParams={["alumniName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      <div className="content-container">
        <aside id="column-1" className="column column-1">
          <div className="list-heading">
            <div>
              <FaArrowTrendUp /> Trending Alumni
            </div>
          </div>
          <div className="cards">
            {trendingList?.map((item) => (
              <div
                onClick={() => navigate(`/trending/alumni/${item._id}`)}
                key={item._id}
                className="card"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="content">
                  <div className="trending-cards-container">
                    <div
                      style={{
                        backgroundColor: "#F7D77F",
                      }}
                      className="title"
                    >
                      <span>Alumni</span>
                    </div>
                    {trendingList.length === 0 && (
                      <div className="loading-container">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    {trendingList
                      .slice(0, viewMore ? trendingList.length : 3)
                      .map((trending) => (
                        <Fragment key={trending._id}>
                          <div
                            onClick={() =>
                              navigate(`/profile/user/${trending._id}`)
                            }
                            className="trending-card"
                          >
                            <div className="logo">
                              <img src={trending.image} alt="logo" />
                            </div>
                            <div className="content">
                              <span className="name text-crop-2">
                                {trending.name}
                              </span>
                              <span className="subheading text-crop-2">
                                {trending.aboutMe}
                              </span>
                            </div>
                          </div>
                          <hr />
                        </Fragment>
                      ))}
                    {trendingList.length > 3 && !viewMore && (
                      <div className="view-more">
                        <button onClick={() => setViewMore(true)}>
                          <BsChevronDown />
                          View More
                        </button>
                      </div>
                    )}
                    {viewMore && (
                      <div className="view-more">
                        <button onClick={() => setViewMore(false)}>
                          <BsChevronUp />
                          View Less
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div id="column-2" className="column column-2">

      <section className="intro">
        <main className="profile-dashboard club-dashboard">
        <h1 className="title">Profile</h1>

        </main>
      </section>
      </div>
    </main>
  );
};

export default TrendingAlumni;
