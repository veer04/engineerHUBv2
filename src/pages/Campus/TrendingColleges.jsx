import { useEffect, useState } from "react";
import "./TrendingColleges.css";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCampuses,
  getCampusById,
  getTrendingCampuses,
} from "../../services/APIConfig";
import { FaArrowTrendUp } from "react-icons/fa6";
import defaultPoster from "../../assets/defaultPoster";
import AlumniList from "../../components/TrendingList/AlumniList";
import ClubsList from "../../components/TrendingList/ClubsList";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import ImageCarousel2 from "../../components/ImageCarousel2/ImageCarousel2";
import Page404 from "../Maintenance/Page404";
import LoadingPage from "../../components/Loader/LoadingPage";

export default function TrendingColleges() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [trendingList, setTrendingList] = useState([]);
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingCampuses(setTrendingList);
    getCampusById(setCampusData, collegeId);
    getAllCampuses(setAllCampuses);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      setCampus({});
      window.removeEventListener("resize", handleResize);
    };
  }, [collegeId]);

  useEffect(() => {
    if (Object.keys(campus).length !== 0) {
      console.log(document.getElementById("column-1").style.height);
      console.log(document.getElementById("column-2").offsetHeight);
      document.getElementById("column-1").style.height = `${
        document.getElementById("column-2").offsetHeight
      }px`;
    }
  }, [campus, trendingList, width]);

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

  const renderTrendingCollege = (
    <main className="trending-colleges">
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
      <div className="content-container">
        <aside id="column-1" className="column column-1">
          <div className="list-heading">
            <div>
              <FaArrowTrendUp /> Trending Colleges
            </div>
          </div>
          <div className="cards">
            {trendingList?.map((item) => (
              <div
                onClick={() => navigate(`/trending/campuses/${item._id}`)}
                key={item._id}
                className="card"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="poster">
                  {item?.collegePhoto?.length ? (
                    <img src={item?.collegePhoto[0]} alt="poster" />
                  ) : (
                    <img src={defaultPoster} alt="poster" />
                  )}
                </div>
                <div className="content">
                  <div className="logo">
                    <img src={item?.collegeLogo} alt="logo" />
                  </div>
                  <div className="details">
                    <span className="name text-crop-3">
                      {item?.collegeName}
                    </span>
                    <span className="location text-crop-2">{`${item?.city}, ${item?.state}`}</span>
                    <div className="tags">
                      {!!item?.totalClubs && (
                        <div className="club-count">
                          {item?.totalClubs}+ Clubs
                        </div>
                      )}
                      {!!item?.totalAlumni && (
                        <div className="alma-count">
                          {item?.totalAlumni}+ Alumni
                        </div>
                      )}
                      {!!item?.totalEvents && (
                        <div className="student-count">
                          {item?.totalEvents}+ Events
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div id="column-2" className="column column-2">
          <ImageCarousel2 photos={campus?.collegePhoto} />
          <section className="intro">
            <div className="logo">
              <img src={campus?.collegeLogo} alt="logo" />
            </div>
            <div className="content">
              <div className="header">
                <div className="left">
                  <span className="name text-crop-1">
                    {campus?.collegeName}
                  </span>
                  <span className="location text-crop-1">{`${campus?.city}, ${campus?.state}`}</span>
                  <div className="rating">
                    Rating: {campus?.rating}
                    {/* <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
                <BsStar /> */}
                  </div>
                </div>
                <div className="right">
                  <button className="view-more">View More</button>
                </div>
              </div>
              <div className="mobile-view">
                <button className="view-more">View More</button>
              </div>
              <span className="description text-crop-2">{campus?.aboutUs}</span>
            </div>
          </section>
          <section className="more-details">
            <AlumniList />
            <ClubsList />
          </section>
        </div>
      </div>
    </main>
  );

  return !!Object.keys(campusData).length ? (
    campusData?.status >= 200 && campusData?.status <= 300 ? (
      renderTrendingCollege
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
