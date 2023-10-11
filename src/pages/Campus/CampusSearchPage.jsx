import { useEffect, useState } from "react";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import "./CampusSearchPage.css";
import { controller, getAllCampuses } from "../../services/APIConfig";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListAlmas from "../../components/TrendingList/TrendingListAlmas";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import defaultPoster from "../../assets/defaultPoster";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loading";

export default function CampusSearchPage() {
  const navigate = useNavigate();
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");
  const [campus, setCampus] = useState({
    image: defaultPoster,
    _id: "60f9b0b3e6b3a5b4a4f7e1b1",
    collegeName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    location: "Navi Mumbai",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
  });
  const [clubs, setClubs] = useState([
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7e1b1",
    //   clubName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4fsdfa4f7e1b1",
    //   clubName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7wqede1b1",
    //   clubName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7wqwe1b1",
    //   clubName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
  ]);
  const [almas, setAlmas] = useState([
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7e1b1",
    //   almaName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4fsdfa4f7e1b1",
    //   almaName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7wqede1b1",
    //   almaName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
    // {
    //   image: defaultPoster,
    //   _id: "60f9b0b3e6b3a5b4a4f7wqwe1b1",
    //   almaName: "Bharati Vidyapeeth College of Engineering, Navi Mumbai",
    //   location: "Navi Mumbai",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus platea feugiat odio.",
    // },
  ]);
  const [viewAllClubs, setViewAllClubs] = useState(false);
  const [viewAllAlmas, setViewAllAlmas] = useState(false);

  useEffect(() => {
    getAllCampuses(setAllCampuses);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (output) {
      navigate(`/campus/search/${output}`);
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
                <img src={campus?.image} alt="" />
              </div>
              <div className="content">
                <span className="name text-crop-1">{campus.collegeName}</span>
                <span className="location text-crop-1">{campus.location}</span>
                <span className="description text-crop-4">
                  {campus.description}
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
            <span className="title">Almas</span>
            {false && (
              <div className="w-full d-flex justify-content-center">
                <i>No alma found</i>
              </div>
            )}
            {almas.length === 0 && (
              <div className="w-full d-flex justify-content-center">
                <Loading />
              </div>
            )}
            {almas.slice(0, viewAllAlmas ? almas.length : 3).map((alma) => (
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
            {almas.length !== 0 && !viewAllAlmas && (
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
          <TrendingListAlmas />
          <TrendingListClubs />
        </div>
      </div>
    </main>
  );
}
