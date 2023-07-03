import React, { useState, useEffect } from "react";
import "./ParticularCampus.css";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { RxChevronDown } from "react-icons/rx";
import { BsStar, BsStarFill } from "react-icons/bs";
import CampusEventCard from "../../../components/CampusEventCard/CampusEventCard";
import { Link, useParams } from "react-router-dom";
import {
  controller,
  getAllCampuses,
  getCampusById,
} from "../../../services/APIConfig";
import CampusSearchBox from "../../../components/CampusSearchBox/CampusSearchBox";
import { useNavigate } from "react-router";
import useNavbar from "../../../hooks/use-navbar";
import LoadingPage from "../../../components/Loader/LoadingPage";
import defaultPoster from "../../../assets/defaultPoster";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { set } from "react-hook-form";

export default function ParticularCampus() {
  const { setSelectedPageNavbar } = useNavbar();

  const { collegeId } = useParams();
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];
  const [campus, setCampus] = useState(
    // sessionStorage.getItem(`${collegeId} campus`)
    //   ? JSON.parse(sessionStorage.getItem(`${collegeId} campus`))
    //   :
    {}
  );
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let [scrollLimit, setScrollLimit] = useState(400);
  useEffect(() => {
    if (width > 820) {
      setScrollLimit(400);
    }
    if (width <= 820) {
      setScrollLimit(300);
    }
    if (width <= 600) {
      setScrollLimit(150);
    }
    console.log("Scroll Limit", scrollLimit);
  }, [window.innerWidth]);

  const [allCampuses, setAllCampuses] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampusById(setCampus, collegeId);
    getAllCampuses(setAllCampuses);
    setSelectedPageNavbar("campus");

    return () => {
      controller.abort();
      setCampus({});
    };
  }, [collegeId]);

  const collegeMoreDetails = [
    {
      _id: 1,
      title: `${campus.collegeName} TECHNICAL CLUBS`,
      studentActivity: "230+",
      ongoingEvents: "100",
      color: colors[0],
      link: `/campus/${collegeId}/technical-clubs`,
      image:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/campus/particularcampus/technical_club.png",
    },
    {
      _id: 2,
      title: `${campus.collegeName} CULTURAL CLUBS`,
      studentActivity: "20+",
      ongoingEvents: "12",
      color: colors[1],
      link: `/campus/${collegeId}/cultural-clubs`,
      image:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/campus/particularcampus/cultural_club.png",
    },
    {
      _id: 3,
      title: `${campus.collegeName} ALMAS`,
      studentActivity: "2.1k",
      ongoingEvents: "108",
      color: colors[2],
      link: `/campus/${collegeId}/almas`,
      image:
        "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/campus/particularcampus/almas.png",
    },
  ];
  const starsFilled = [];
  const starsEmpty = [];

  for (let i = 0; i < campus.rating; i++) {
    starsFilled.push(<BsStarFill key={i} />);
  }

  for (let i = 0; i < 5 - campus.rating; i++) {
    starsEmpty.push(<BsStar key={i} />);
  }

  const navigate = useNavigate();

  const [output, setOutput] = useState("");
  useEffect(() => {
    if (output) {
      navigate(`/campus/${output}`);
    }
  }, [output]);

  const [activeImage, setActiveImage] = useState(campus.collegePhoto?.length);
  const [carouselPhotos, setCarouselPhotos] = useState([]);
  const [extra, setExtra] = useState(0);
  const [emptyArray, setEmptyArray] = useState([]);
  useEffect(() => {
    // sessionStorage.setItem(`${collegeId} campus`, JSON.stringify(campus));
    setExtra(campus.collegePhoto?.length);
    setActiveImage(campus.collegePhoto?.length);
    console.log("Campus", campus);
  }, [campus]);

  useEffect(() => {
    console.log("Extra", extra);
    setEmptyArray(Array.from({ length: extra }, () => ""));
  }, [extra]);

  useEffect(() => {
    console.log("Empty Array", emptyArray);
    if (campus.collegePhoto?.length > 0)
      setCarouselPhotos([...emptyArray, ...campus.collegePhoto, ""]);
    else setCarouselPhotos([defaultPoster]);
  }, [emptyArray]);

  useEffect(() => {
    console.log("Active Image", activeImage);
  }, [activeImage]);

  useEffect(() => {
    console.log("Carousel Photos", carouselPhotos);
    if (document.querySelector(".inner-container") !== null)
      document.querySelector(".inner-container").scrollLeft = 0;
  }, [carouselPhotos]);
  //function to find out which image is displayed in the carousel

  const particularCampusPage = (
    <div className="particular-campus-page">
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={allCampuses}
            placeholder="You are looking for which Campus?"
            searchParams={["collegeName"]}
            listLength={5}
            setOutput={setOutput}
          />
        </div>
      </div>
      <div className="image-carousel__outer-container">
        <IoIosArrowBack
          onClick={() => {
            if (activeImage > extra) {
              setActiveImage((prev) => prev - 1);
              document.querySelector(".inner-container").scrollLeft -=
                scrollLimit;
            }
          }}
          className="arrow"
        />
        <div className="inner-container">
          {carouselPhotos?.map((photo, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${photo})`,
                }}
                className="image-container"
              ></div>
            );
          })}
        </div>
        <IoIosArrowForward
          onClick={() => {
            if (activeImage < carouselPhotos.length - 2) {
              setActiveImage((prev) => prev + 1);
              document.querySelector(".inner-container").scrollLeft +=
                scrollLimit;
            }
          }}
          className="arrow"
        />
      </div>
      <div className="details-tab">
        <div className="details">
          <div>
            <img
              src={campus.collegeLogo ? campus.collegeLogo : defaultPoster}
              alt="logo"
            />
          </div>
          <div>
            <div className="title">{campus.collegeName}</div>
            <div className="location">{`${campus.city}, ${campus.state}`}</div>
            <div className="rating">
              <div className="rating__stars">
                {starsFilled}
                {starsEmpty}
              </div>
              <div className="rating__number">Rating: {campus.rating}/5</div>
            </div>
          </div>
        </div>
        <Link to={`/campus/${collegeId}/details`}>
          <div className="view-more">
            View More <RxChevronDown />
          </div>
        </Link>
      </div>
      <div className="about">
        <div className="heading">About College</div>
        <div className="description">{campus.aboutUs}</div>
      </div>
      <div className="campus-events-section">
        {collegeMoreDetails.map((event) => (
          <CampusEventCard
            link={event.link}
            key={event._id}
            title={event.title}
            studentActivity={event.studentActivity}
            ongoingEvents={event.ongoingEvents}
            color={event.color}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );

  return Object.keys(campus).length !== 0 ? (
    particularCampusPage
  ) : (
    <LoadingPage />
  );
}
