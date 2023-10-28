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
  getUserProfileById,
} from "../../services/APIConfig";
import { FaArrowTrendUp } from "react-icons/fa6";
import AlumniList from "../TrendingList/AlumniList";
import Page404 from "../../pages/Maintenance/Page404";
import LoadingPage from "../Loader/LoadingPage";
import default_profile_icon from "../../pages/Profile/ClubDashboard/default_profile_icon.png";
import { isUserLoggedIn, getUserId } from "../../features/User/UserDetails";
const TrendingAlumni = () => {
  const { almaId } = useParams();
  const {userId}=useParams();
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
  function fetchData() {
    getUserProfileById(setAlumniData, almaId, setFetchResponse);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingAlumni(setTrendingList);
    fetchData();
    // getAlumniById(setAlumni, almaId);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      //   setAlumni({});
      window.removeEventListener("resize", handleResize);
    };
  }, [almaId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isUserLoggedIn() && almaId === getUserId()) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [almaId]);
  useEffect(() => {
    console.log(trendingList);
    console.log(alumniData);
  }, [trendingList,alumniData]);

  useEffect(() => {
    if (output) {
      navigate(`/alma/search/${output}`);
    }
  }, [output]);

  useEffect(() => {
    if (Object.keys(alumniData).length !== 0) {
      setAlumni(alumniData?.data?.data);
    }
  }, [alumniData]);
  useEffect(() => {
    console.log(alumniData);
  }, [alumniData]);

  const renderTrendingAlumni = (
    <>
      <main className="trending-Colleges">
      <div className="search-bar__container" style={{display:"flex",}} >
        <div style={{justifyContent:"center",
    alignItems:"center"}}>
          <CampusSearchBox
            data={trendingList}
            placeholder="You are looking for which Alumni?"
            searchParams={["alumniName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      
      <div className="content-container row">
        <aside id="column-1" className="column column-1 col-lg-3">
          <div className="list-heading">
            <div>
              <FaArrowTrendUp /> Trending Alumni
            </div>
          </div>
          <div className="cards">
            <div className="card">
        
            <AlumniList />
            
          </div>
          </div>
        </aside>
        <div id="column-2" className="column column-2 col-lg-8">
      <section className="intro">
        <main className="profile-dashboard club-dashboard">
        <h1 className="title">Profile</h1>
        {/* <section className="more-details">
            <AlumniList />
            </section> */}
        </main>
      </section>
      </div>
      </div>
 
    </main>
    </>

  
  );
  return !!Object.keys(trendingList).length ? (
    trendingList?.status >= 200 && trendingList?.status <= 300 ? (
      renderTrendingAlumni
    ) : (
      renderTrendingAlumni
    )
  ) : (
    <LoadingPage />
  );
};

export default TrendingAlumni;
