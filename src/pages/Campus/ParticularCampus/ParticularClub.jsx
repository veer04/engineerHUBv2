import React, { useState, useEffect } from "react";
import "./ParticularClub.css";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { RxChevronDown } from "react-icons/rx";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import ClubPostCard from "../../../components/ClubPostCard/ClubPostCard";
import useNavbar from "../../../hooks/use-navbar";

export default function ParticularClub() {
  const { setSelectedPageNavbar } = useNavbar();

  const [current, setCurrent] = useState(1);
  // const { clubId } = useParams();
  const categories = [
    {
      id: 1,
      title: "Posts",
    },
    {
      id: 2,
      title: "Reels",
    },
  ];

  const [clubPhotos, setClubPhotos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("campus");

  }, []);

  useEffect(() => {
    setClubPhotos([defaultPoster, defaultPoster, defaultPoster]);
  }, []);

  const clubsData = [
    {
      _id: 1,
      image: defaultPoster,
    },
    {
      _id: 2,
      image: defaultPoster,
    },
    {
      _id: 3,
      image: defaultPoster,
    },
    {
      _id: 4,
      image: defaultPoster,
    },
    {
      _id: 5,
      image: defaultPoster,
    },
    {
      _id: 6,
      image: defaultPoster,
    },
    {
      _id: 7,
      image: defaultPoster,
    },
    {
      _id: 8,
      image: defaultPoster,
    },
  ];

  const renderedPosts = clubsData.map((club) => (
    <ClubPostCard key={club._id} {...club} />
  ));
  const renderedReels = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10rem",
        width: "100%",
        fontSize: "1.15rem",
        fontWeight: "600",
        color: "var(--text-color-green)",
      }}
    >
      Reels Coming Soon
    </div>
  );
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
          <ImageCarousel collegePhoto={clubPhotos} />
        </div>
      </div>
      <div className="details-tab">
        <div className="details">
          <div
            style={{
              width: "78px",
              height: "78px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="logo"
          >
            {/* <img src="https://source.unsplash.com/random" alt="logo" /> */}
          </div>
          <div>
            <div className="title">NIT Durgapur</div>
            <div className="location">Durgapur, India</div>
            <a className="link" href="https://www.google.com/">
              www.google.com
            </a>
          </div>
        </div>
        <div className="stats">
          <div>
            <div className="number">100</div>
            <div className="label">Followers</div>
          </div>
          <div>
            <div className="number">100</div>
            <div className="label">Members</div>
          </div>
        </div>
      </div>
      <CategoryBar
        categories={categories}
        current={current}
        setCurrent={setCurrent}
      />
      {/* later change to code below*/}

      {/* <div className="content-container">
        {current === 1 && renderedPosts}
        {current === 2 && renderedReels}
      </div> */}

      {current === 1 && (
        <div className="content-container">{renderedPosts}</div>
      )}
      {current === 2 && renderedReels}
    </div>
  );
}
