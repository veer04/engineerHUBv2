import React from "react";
import "./ParticularClub.css";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { RxChevronDown } from "react-icons/rx";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

export default function ParticularClub() {
  return (
    <div className="particular-club-page">
      <h1 className="heading-3">Technical Club</h1>
      <h2 className="subheading-1">
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </h2>
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
            {/* <div className="rating">
              <div className="rating__stars">
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
                <BsStar />
              </div>
              <div className="rating__number">Rating: 3/5</div>
            </div> */}
          </div>
        </div>
        <div className="view-more">
          View More <RxChevronDown />
        </div>
      </div>
    </div>
  );
}
