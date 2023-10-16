import { useEffect, useState } from "react";
import "./TrendingColleges.css";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCampuses, getCampusById } from "../../services/APIConfig";

export default function TrendingColleges() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  //   const [width, setWidth] = useState(window.innerWidth);
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
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
        aside.
      </div>
    </main>
  );
}
