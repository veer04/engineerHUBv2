import React, { useState, useEffect } from "react";
import "./ParticularClub.css";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { RxChevronDown } from "react-icons/rx";
import { BsArrowUpRight, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link, Outlet, useParams } from "react-router-dom";
import defaultPoster, {
  defaultPosterArray,
} from "../../../assets/defaultPoster";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import ClubPostCard from "../../../components/ClubPostCard/ClubPostCard";
import useNavbar from "../../../hooks/use-navbar";
import AlumniGlobalCard from "../../../components/AlumniGlobalCard/AlumniGlobalCard";
import Girl from "./girl.jpeg";
import InterCollegeCard from "../../../components/InterCollegeCard/InterCollegeCard";
import { getAllEvents, getClubById } from "../../../services/APIConfig";
import ClubMemberCard from "../../../components/ClubMemberCard/ClubMemberCard";
import { FiArrowUpRight } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";
import LoadingPage from "../../../components/Loader/LoadingPage";
export default function ParticularClub() {
  const { setSelectedPageNavbar } = useNavbar();
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [current, setCurrent] = useState(1);
  const [events, setEvents] = useState([]);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("campus");
    getAllEvents(setEvents);
    getClubById(setClub, clubId);
  }, []);

  const renderedPosts = club.posts
    ? club.posts.map((post) => <ClubPostCard key={post._id} {...post} />)
    : null;

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

  const particularClubPage = (
    <div className="particular-club-page">
      <div className="image-carousel__container">
        <div className="image-carousel">
          <ImageCarousel
            collegePhoto={
              club.clubPhoto?.length ? club.clubPhoto : defaultPosterArray
            }
          />
        </div>
      </div>
      <div className="details-tab">
        <div className="details">
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage: `url(${
                club.image ? club.image : defaultPoster
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="logo"
          ></div>
          <div>
            <div className="title">{club.name}</div>
            <a className="link" href={`${club.websiteUrl}`}>
              Club Website
              <HiArrowUpRight />
            </a>
          </div>
        </div>
        <div className="stats">
          {/* <div>
            <div className="number">{club.followers ? club.followers : ""}</div>
            <div className="label">Followers</div>
          </div> */}
          <div>
            <div className="number">
              {club.members ? club.members.length : ""}
            </div>
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
      {club.members !== undefined && club.members.length !== 0 && (
        <div className="members-container">
          <div className="title">Members</div>
          <div className="members">
            {club.members.map((member) => (
              <ClubMemberCard key={member._id} {...member} />
            ))}
          </div>
        </div>
      )}
      <div className="events-container">
        {events.length > 0 &&
          events
            .slice(0, 2)
            .map((event) => (
              <InterCollegeCard
                className="--smaller"
                key={event._id}
                {...event}
              />
            ))}
      </div>
      <Outlet />
    </div>
  );

  return club.name ? particularClubPage : <LoadingPage />;
}
