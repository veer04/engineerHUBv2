import React, { useState, useEffect } from "react";
import "./ParticularCampus.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { CgChevronDown } from "react-icons/cg";
import { RxChevronDown } from "react-icons/rx";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CampusEventCard from "../../../components/CampusEventCard/CampusEventCard";
import { Link, useParams } from "react-router-dom";
import { controller, getCampusById } from "../../../services/APIConfig";

export default function ParticularCampus() {
  const { collegeId } = useParams();
  console.log(collegeId);
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];
  const [campus, setCampus] = useState(
    sessionStorage.getItem(`${collegeId} campus`)
      ? JSON.parse(sessionStorage.getItem(`${collegeId} campus`))
      : {}
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampusById(setCampus, collegeId);

    return () => {
      controller.abort();
    };
  }, [collegeId]);

  useEffect(() => {
    sessionStorage.setItem(`${collegeId} campus`, JSON.stringify(campus));
  }, [campus]);

  const collegeMoreDetails = [
    {
      _id: 1,
      title: `${campus.collegeName} TECHNICAL CLUBS`,
      studentActivity: "230+",
      ongoingEvents: "100",
      color: colors[0],
      link: `/campus/${collegeId}/technical-clubs`,
    },
    {
      _id: 2,
      title: `${campus.collegeName} CULTURAL CLUBS`,
      studentActivity: "20+",
      ongoingEvents: "12",
      color: colors[1],
      link: `/campus/${collegeId}/cultural-clubs`,
    },
    {
      _id: 3,
      title: `${campus.collegeName} ALMAS`,
      studentActivity: "2.1k",
      ongoingEvents: "108",
      color: colors[2],
      link: `/campus/${collegeId}/almas`,
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
  return (
    <div className="particular-campus-page">
      {/* <div className="search-bar__container">
        <SearchBar placeholder="You are looking for which campus" type="text" />
      </div> */}
      <div className="image-carousel__container">
        <div className="image-carousel">
          <ImageCarousel collegePhoto={campus.collegePhoto} />
        </div>
      </div>
      <div className="details-tab">
        <div className="details">
          <div>
            <img src={campus.collegeLogo} alt="logo" />
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
          />
        ))}
      </div>
    </div>
  );
}
