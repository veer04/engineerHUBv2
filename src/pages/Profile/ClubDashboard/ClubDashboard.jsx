import { useState, useEffect, useLayoutEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "./ClubDashboard.css";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { PiGlobeLight } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import default_profile_icon from "./default_profile_icon.png";
import { Bucket_URL } from "../../../services/APIUtils";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";
import EventCard from "../../../components/EventCard/EventCard";
import {
  followClub,
  getAllPosts,
  getClubProfileById,
  getClubProfileByIdPrivateMode,
  getFeaturedEvents,
  unFollowClub,
} from "../../../services/APIConfig";
import ClubPostCard from "../../../components/ClubPostCard/ClubPostCard";
import ClubMemberCard from "../../../components/ClubMemberCard/ClubMemberCard";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";

export default function ClubDashboard() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [showAll1, setShowAll1] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const [posts, setPosts] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [followResponse, setFollowResponse] = useState({});
  const bucket2 = `${Bucket_URL}frontend/profile/dashboard/`;
 

  function fetchData() {
    if (isUserLoggedIn()) {
      getClubProfileByIdPrivateMode(setOrganization, clubId, setFetchResponse);
    } else {
      getClubProfileById(setOrganization, clubId, setFetchResponse);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    getAllPosts(setPosts, clubId);
    getFeaturedEvents(setFeaturedEvents);

    if (isUserLoggedIn() && clubId === getUserId()) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [clubId]);

  useLayoutEffect(() => {
    fetchData();
    getAllPosts(setPosts, clubId);
    getFeaturedEvents(setFeaturedEvents);
  }, [window.location.pathname]);

  useLayoutEffect(() => {
    if (!!Object.keys(followResponse).length) fetchData();
  }, [followResponse]);

  function handleFollow() {
    if (organization?.isFollowing) {
      unFollowClub(clubId, setFollowResponse);
    } else {
      followClub(clubId, setFollowResponse);
    }
  }

  const clubDashboardPage = (
    <>
      <main className="profile-dashboard club-dashboard">
        <h1 className="title">Profile</h1>
        <h2 className="subheading">
          {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
          faucibus platea feugiat odio. */}
        </h2>
        <section className="box details-container">
          <div className="cover">
            {(organization?.imagePoster ||
              organization?.clubPhoto?.length > 0) && (
              <img
                className="cover-image"
                loading="lazy"
                src={
                  !!organization?.imagePoster
                    ? organization?.imagePoster
                    : organization?.clubPhoto[0]
                }
                alt="Cover Image"
              />
            )}
            {!(
              organization?.imagePoster || organization?.clubPhoto?.length > 0
            ) && (
              <img
                className="cover-image"
                loading="lazy"
                src={`${bucket2}cover-image-1.png`}
                alt="Cover Image"
              />
            )}
            {isUserAdmin && (
              <button
                onClick={() => navigate("edit-cover-image")}
                className="edit-option"
              >
                <FiEdit />
              </button>
            )}
            <div className="logo">
              {organization?.image && (
                <img src={organization?.image} alt="Profile Picture" />
              )}
              {!organization?.image && (
                <img src={default_profile_icon} alt="Profile Picture" />
              )}
            </div>
          </div>
          <div className="details">
            <div className="upper-container">
              <div className="left-container">
                <div>
                  <h1 className="text-crop-1 overflow-hidden">
                    {organization?.name}
                  </h1>
                  <h2 className="text-crop-1 overflow-hidden">
                    {organization?.subHeading ? (
                      organization?.subHeading
                    ) : (
                      <i className="text-crop-1 overflow-hidden">
                        Subheading not available
                      </i>
                    )}
                  </h2>
                  <div>
                    <span className="text-crop-1 overflow-hidden">
                      {organization?.clubType ? (
                        <>
                          <div className="d-flex flex-row gap-1">
                            <span className="text-crop-1 overflow-hidden">
                              {organization?.clubType}
                            </span>
                            {organization?.country && (
                              <>
                                <span>•</span>
                                <span className="text-crop-1 overflow-hidden">
                                  {`${
                                    organization?.state
                                      ? organization?.state + ","
                                      : ""
                                  } ${
                                    organization?.country
                                      ? organization?.country
                                      : ""
                                  }`}
                                </span>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <i className="text-crop-1 overflow-hidden">
                          Organization type not available
                        </i>
                      )}
                    </span>
                  </div>
                  {!!organization?.followerCount && (
                    <span className="follower-count">
                      {`${organization?.followerCount} ${
                        organization?.followerCount > 1
                          ? "Followers"
                          : "Follower"
                      }`}
                    </span>
                  )}
                  {isUserAdmin && (
                    <button
                      onClick={() => navigate("edit-profile")}
                      className="md-edit-btn"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              <div className="right-container">
                <div className="socials">
                  {organization?.websiteUrl && (
                    <a href={organization?.websiteUrl}>
                      <PiGlobeLight />
                    </a>
                  )}
                  {organization?.linkedIn && (
                    <a href={organization?.linkedIn}>
                      <AiFillLinkedin />
                    </a>
                  )}
                  {organization?.instagram && (
                    <a href={organization?.instagram}>
                      <BiLogoInstagramAlt />
                    </a>
                  )}
                </div>
                {isUserAdmin && (
                  <button
                    onClick={() => navigate("edit-profile")}
                    className="edit-btn"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            {isUserLoggedIn() && !isUserAdmin && (
              <button
                style={{
                  backgroundColor: organization?.isFollowing
                    ? "transparent"
                    : "#002B36",
                  color: organization?.isFollowing ? "#002B36" : "#fff",
                }}
                onClick={() => handleFollow()}
                onMouseEnter={(e) => {
                  if (organization?.isFollowing) {
                    e.target.innerHTML = "Unfollow";
                  }
                }}
                onMouseLeave={(e) => {
                  if (organization?.isFollowing) {
                    e.target.innerHTML = "Following";
                  }
                }}
                className="follow-btn"
              >
                {`${organization?.isFollowing ? "Following" : "+ Follow"}`}
              </button>
            )}
            <div className="lower-container">
              {/* {isUserAdmin && (
                <div className="edit">
                  <FiEdit2 />
                </div>
              )} */}
              <p className="heading">ABOUT US</p>
              {organization?.description && (
                <span
                  className={`content ${
                    viewMore ? "no-text-crop" : "text-crop-4"
                  } `}
                >
                  {organization?.description}
                </span>
              )}
              {!organization?.description && (
                <p className="no-description">
                  <i>Description not available</i>
                </p>
              )}
              {organization?.description && !viewMore && (
                <div onClick={() => setViewMore(true)} className="view-more">
                  View More
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="box recent-activities">
          {isUserAdmin && (
            <div onClick={() => navigate("add-post")} className="add-option">
              <MdAdd />
            </div>
          )}
          <p className="heading">POSTS</p>
          <div className="carousel-container">
            {posts.length !== 0 && (
              <div className="carousel-grid">
                {showAll1
                  ? posts.map((jobDetail, index) => (
                      <ClubPostCard key={index} {...jobDetail} />
                    ))
                  : posts
                      .slice(0, 3)
                      .map((jobDetail, index) => (
                        <ClubPostCard key={index} {...jobDetail} />
                      ))}
              </div>
            )}

            {posts.length === 0 && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No posts to show`}</p>
              </div>
            )}
          </div>
          {posts.length > 3 && !showAll1 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll1(true)}
                className="all-jobs-btn"
              >
                Show all posts <BsArrowRight />
              </button>
            </div>
          )}
          {posts.length > 3 && showAll1 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll1(false)}
                className="all-jobs-btn"
              >
                Show less posts <BsArrowUp />
              </button>
            </div>
          )}
        </section>
        <section className="box recent-activities">
          {isUserAdmin && (
            <div onClick={() => navigate("add-member")} className="add-option">
              <MdAdd />
            </div>
          )}
          <p className="heading">CLUB MEMBERS</p>
          <div className="carousel-container">
            {organization?.members?.length !== 0 && (
              <div className="carousel-grid">
                {showAll2
                  ? organization?.members?.map((jobDetail, index) => (
                      <ClubMemberCard
                        key={index}
                        {...jobDetail}
                        className="scroll-card no-hover-scale"
                      />
                    ))
                  : organization?.members
                      ?.slice(0, 3)
                      .map((jobDetail, index) => (
                        <ClubMemberCard
                          key={index}
                          {...jobDetail}
                          className="scroll-card no-hover-scale"
                        />
                      ))}
              </div>
            )}

            {organization?.members?.length === 0 && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No members to show`}</p>
              </div>
            )}
          </div>
          {organization?.members?.length > 3 && !showAll2 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll2(true)}
                className="all-jobs-btn"
              >
                Show all members <BsArrowRight />
              </button>
            </div>
          )}
          {organization?.members?.length > 3 && showAll2 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll2(false)}
                className="all-jobs-btn"
              >
                Show less members <BsArrowUp />
              </button>
            </div>
          )}
        </section>
        <section id="recent-activities" className="box recent-activities">
          {isUserAdmin && (
            <div onClick={() => navigate("/host/event")} className="add-option">
              <MdAdd />
            </div>
          )}
          <p className="heading">FEATURED EVENTS</p>
          <div className="carousel-container">
            {featuredEvents.length !== 0 && (
              <div className="carousel-grid">
                {showAll3
                  ? featuredEvents.map((jobDetail, index) => (
                      <EventCard
                        key={index}
                        {...jobDetail}
                        className="scroll-card no-hover-scale"
                      />
                    ))
                  : featuredEvents
                      .slice(0, 3)
                      .map((jobDetail, index) => (
                        <EventCard
                          key={index}
                          {...jobDetail}
                          className="scroll-card no-hover-scale"
                        />
                      ))}
              </div>
            )}

            {featuredEvents.length === 0 && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No events to show`}</p>
              </div>
            )}
          </div>
          {featuredEvents.length > 3 && !showAll3 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll3(true)}
                className="all-jobs-btn"
              >
                Show all events <BsArrowRight />
              </button>
            </div>
          )}
          {featuredEvents.length > 3 && showAll3 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll3(false)}
                className="all-jobs-btn"
              >
                Show less events <BsArrowUp />
              </button>
            </div>
          )}
        </section>
      </main>
      <Outlet />
    </>
  );

  return !!Object.keys(fetchResponse).length ? (
    fetchResponse?.status >= 200 && fetchResponse?.status <= 300 ? (
      clubDashboardPage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
