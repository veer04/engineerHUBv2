import React from "react";
import "./ParticularCampus.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { CgChevronDown } from "react-icons/cg";
import { RxChevronDown } from "react-icons/rx";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CampusEventCard from "../../../components/CampusEventCard/CampusEventCard";
import { Link, useParams } from "react-router-dom";

export default function ParticularCampus() {
  const { collegeID } = useParams();
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  const collegeMoreDetails = [
    {
      _id: 1,
      title: "NIT DURGAPUR TECHNICAL CLUB",
      studentActivity: "230+",
      ongoingEvents: "100",
      color: colors[0],
      link: `/campus/${collegeID}/technical-clubs`,
    },
    {
      _id: 2,
      title: "NIT DURGAPUR CULTURAL CLUB",
      studentActivity: "20+",
      ongoingEvents: "12",
      color: colors[1],
      link: `/campus/${collegeID}/cultural-clubs`,
    },
    {
      _id: 3,
      title: "NIT DURGAPUR ALMAS",
      studentActivity: "2.1k",
      ongoingEvents: "108",
      color: colors[2],
      link: `/campus/${collegeID}/almas`,
    },
  ];
  return (
    <div className="particular-campus-page">
      {/* <div className="search-bar__container">
        <SearchBar placeholder="You are looking for which campus" type="text" />
      </div> */}
      <div className="image-carousel__container">
        <div className="image-carousel">
          <ImageCarousel />
        </div>
      </div>
      <div className="details-tab">
        <div className="details">
          <div>
            <img src="https://source.unsplash.com/random" alt="logo" />
          </div>
          <div>
            <div className="title">NIT Durgapur</div>
            <div className="location">Durgapur, India</div>
            <div className="rating">
              <div className="rating__stars">
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
                <BsStar />
              </div>
              <div className="rating__number">Rating: 3/5</div>
            </div>
          </div>
        </div>
        <Link to={`/campus/${collegeID}/details`}>
          <div className="view-more">
            View More <RxChevronDown />
          </div>
        </Link>
      </div>
      <div className="about">
        <div className="heading">About College</div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consectetur sunt possimus tempore aperiam quis repudiandae aliquid
          obcaecati deserunt eligendi, in sed recusandae exercitationem?
          Officiis consequatur magnam laboriosam repellat quis deserunt pariatur
          necessitatibus culpa, neque ea odio non veniam corrupti illum
          molestias. Optio, maiores. Eum qui ab quidem perferendis cum facere
          omnis architecto ipsa corporis rerum? Culpa natus, maiores tempore
          laboriosam debitis aliquid quas non mollitia dolores assumenda
          aliquam, nam laudantium porro vitae sequi, facilis ut eos. Odit
          nostrum minima nemo! Aliquid, sunt sequi quas et quae iste est quidem
          sapiente accusantium placeat numquam dignissimos recusandae corrupti
          laboriosam ipsa mollitia consectetur quos ipsum quasi nulla quia
          tempora minima. Eligendi nesciunt odio suscipit? Eveniet voluptatum
          quis ab doloremque incidunt quas laboriosam. Reiciendis excepturi
          tenetur itaque dicta temporibus tempora voluptatibus autem id maiores
          harum facere saepe expedita atque eaque explicabo totam fugiat
          adipisci consequatur quisquam, perferendis ducimus architecto at quas?
          Fugiat, quasi.
        </div>
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
