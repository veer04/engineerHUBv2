import { useEffect, useState } from "react";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import "./CampusSearchPage.css";
import { controller, getAllCampuses } from "../../services/APIConfig";
import { Navigate } from "react-router";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListAlmas from "../../components/TrendingList/TrendingListAlmas";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import defaultPoster from "../../assets/defaultPoster";
import { BsChevronDown } from "react-icons/bs";

export default function CampusSearchPage() {
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    getAllCampuses(setAllCampuses);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (output) {
      Navigate(`/campus/search/${output}`);
    }
  }, [output]);

  return (
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
            <div className="box">
              <div className="logo">
                <img src={defaultPoster} alt="" />
              </div>
              <div className="content">
                <span className="name text-crop-1">
                  Bharati Vidyapeeth College of Engineering, Navi Mumbai
                </span>
                <span className="location text-crop-1">Navi Mumbai</span>
                <span className="description text-crop-4">
                  Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
                  faucibus platea feugiat odio.Lorem ipsum dolor sit amet
                  consectetur. Mattis aliquam sodales faucibus platea feugiat
                  odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam
                  sodales faucibus platea feugiat odio.Lorem ipsum dolor sit
                  amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.
                </span>
              </div>
            </div>
          </div>
          <div className="clubs club-container result-container">
            <span className="title">Clubs</span>
            <div className="box">
              <div className="logo">
                <img src={defaultPoster} alt="" />
              </div>
              <div className="content">
                <span className="name text-crop-1">
                  Bharati Vidyapeeth College of Engineering, Navi Mumbai
                </span>
                <span className="location college text-crop-1">
                  Navi Mumbai
                </span>
                <span className="description text-crop-2">
                  Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
                  faucibus platea feugiat odio.Lorem ipsum dolor sit amet
                  consectetur. Mattis aliquam sodales faucibus platea feugiat
                  odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam
                  sodales faucibus platea feugiat odio.Lorem ipsum dolor sit
                  amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.
                </span>
              </div>
            </div>
            <hr />
            <div className="view-more_container">
              <button>
                <BsChevronDown /> View More
              </button>
            </div>
          </div>
          <div className="alma alma-container result-container">
            <span className="title">Almas</span>
            <div className="box">
              <div className="logo">
                <img src={defaultPoster} alt="" />
              </div>
              <div className="content">
                <span className="name text-crop-1">
                  Bharati Vidyapeeth College of Engineering, Navi Mumbai
                </span>
                <span className="location college text-crop-1">
                  Navi Mumbai
                </span>
                <span className="description text-crop-2">
                  Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
                  faucibus platea feugiat odio.Lorem ipsum dolor sit amet
                  consectetur. Mattis aliquam sodales faucibus platea feugiat
                  odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam
                  sodales faucibus platea feugiat odio.Lorem ipsum dolor sit
                  amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor
                  sit amet consectetur. Mattis aliquam sodales faucibus platea
                  feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis
                  aliquam sodales faucibus platea feugiat odio.
                </span>
              </div>
            </div>
            <hr />
            <div className="view-more_container">
              <button>
                <BsChevronDown /> View More
              </button>
            </div>
          </div>
        </div>
        <div className="column column-2">
          <TrendingListColleges />
          <TrendingListAlmas />
          <TrendingListClubs />
        </div>
      </div>
    </main>
  );
}
