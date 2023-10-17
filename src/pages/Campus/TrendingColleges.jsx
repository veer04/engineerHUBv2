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

export default function TrendingColleges() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  //   const [width, setWidth] = useState(window.innerWidth);
  const [trendingList, setTrendingList] = useState([]);
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    // window.scrollTo(0, 0);
    getTrendingCampuses(setTrendingList);
    getCampusById(setCampusData, collegeId);
    getAllCampuses(setAllCampuses);

    // const handleResize = () => setWidth(window.innerWidth);
    // window.addEventListener("resize", handleResize);
    return () => {
      setCampus({});
      //   window.removeEventListener("resize", handleResize);
    };
  }, [collegeId]);

  useEffect(() => {
    console.log(trendingList);
  }, [trendingList]);

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

  return (
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
        <aside className="column column-1">
          <div className="list-heading">
            <div>
              <FaArrowTrendUp /> Trending Colleges
            </div>
          </div>
          {trendingList?.map((item) => (
            <div key={item._id} className="card">
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
                    Bharati Vidyapeeth College of Engineering, Deemed to be
                    University Navi Mumbai
                  </span>
                  <span className="location text-crop-2">Navi Mumbai</span>
                  <div className="tags">
                    <div className="club-count">5+ Clubs</div>
                    <div className="alma-count">5+ Alumni</div>
                    <div className="student-count">5+ Students</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>
        <section className="column column-2"></section>
      </div>
    </main>
  );
}
