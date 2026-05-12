import "./MainLandingSection.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";

const LANDING_HEADLINE_TYPEWRITER_TEXT =
  "One stop career solution for engineers !";
const LANDING_HEADLINE_TYPE_MS = 42;

const LANDING_HEADLINE_ACCENT_WORD = "engineers";

function renderLandingHeadlineTyped(typed) {
  const full = LANDING_HEADLINE_TYPEWRITER_TEXT;
  const accent = LANDING_HEADLINE_ACCENT_WORD;
  const accentStart = full.indexOf(accent);
  if (accentStart === -1 || !typed.length) return typed || null;

  if (typed.length <= accentStart) {
    return typed;
  }

  const accentEnd = accentStart + accent.length;
  const before = typed.slice(0, accentStart);
  const inAccent = typed.slice(
    accentStart,
    Math.min(typed.length, accentEnd)
  );
  const after = typed.length > accentEnd ? typed.slice(accentEnd) : "";

  return (
    <>
      {before}
      <span className="splash-heading__accent">{inAccent}</span>
      {after}
    </>
  );
}

export default function MainLandingSection() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const headlineRef = useRef(null);
  const [headlineVisible, setHeadlineVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [headlineTyped, setHeadlineTyped] = useState("");
  const [headlineTypingDone, setHeadlineTypingDone] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/featuredList`)
      .then((res) => {
        setData([
          ...res.data.data.students.map((item) => ({
            ...item,
            type: "Student",
          })),
          ...res.data.data.alumni.map((item) => ({
            ...item,
            type: "Alumni",
          })),
          // ...res.data.data.clubs.map((item) => ({
          //   ...item,
          //   type: "Club",
          // })),
          // ...res.data.data.organizations.map((item) => ({
          //   ...item,
          //   type: "Company",
          // })),
        ]);
      })
      .catch((err) => {
        setData([]);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }, []);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setHeadlineVisible(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadlineVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!headlineVisible) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setHeadlineTyped(LANDING_HEADLINE_TYPEWRITER_TEXT);
      setHeadlineTypingDone(true);
      return undefined;
    }

    setHeadlineTyped("");
    setHeadlineTypingDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setHeadlineTyped(LANDING_HEADLINE_TYPEWRITER_TEXT.slice(0, i));
      if (i >= LANDING_HEADLINE_TYPEWRITER_TEXT.length) {
        clearInterval(id);
        setHeadlineTypingDone(true);
      }
    }, LANDING_HEADLINE_TYPE_MS);
    return () => clearInterval(id);
  }, [headlineVisible]);

  // const data = [
  //   {
  //     _id: 8,
  //     name: "Kunika Maam",
  //     type: "Student",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2cf6f7ef4eb43387fa371.jpg",
  //   },
  //   {
  //     _id: 4,
  //     name: "Yash Vardhan",
  //     type: "Student",
  //     image:
  //       "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
  //   },
  //   {
  //     _id: 2,
  //     name: "Girish Shedge",
  //     type: "Alumni",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2191025d4e975cdef39a6.jpg",
  //   },
  //   {
  //     _id: 6,
  //     name: "Kunwar Vidya Niwas",
  //     type: "Alumni",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2cf6f7ef4eb43387fa371.jpg",
  //   },
  //   {
  //     _id: 3,
  //     name: "Swapnil Raj",
  //     type: "Club",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64854cb91cb8a37947e8a090.jpg",
  //   },
  //   {
  //     _id: 7,
  //     name: "Karan Veer Singh",
  //     type: "Club",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae9a4d6dc6d78031fe1355.jpg",
  //   },
  //   {
  //     _id: 1,
  //     name: "Decimal",
  //     type: "Company",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae9e736dc6d78031fe141f1696450195468.jpg",
  //   },

  //   {
  //     _id: 5,
  //     name: "Manish Rai",
  //     type: "Company",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/organization/64d0b565e4e4201287d09086.jpg",
  //   },
  // ];

  return (
    <section className="landing-section">
      <div className="content">
        <h1
          ref={headlineRef}
          className="splash-heading splash-heading--typewriter"
          aria-label={LANDING_HEADLINE_TYPEWRITER_TEXT}
        >
          {renderLandingHeadlineTyped(headlineTyped)}
          {!headlineTypingDone && headlineVisible ? (
            <span
              className="splash-heading__caret"
              aria-hidden="true"
            />
          ) : null}
        </h1>
        <h2 className="splash-subheading">
          A platform to connect with like-minded people & get hired by your dream companies.
        </h2>
        <Link to="/get-featured">
          <button className="waitlist-btn">
            <FaStar className="star-svg" />
            Join the waitlist to get featured
            <IoArrowForward className="arrow-svg" />
          </button>
        </Link>
      </div>
      <div className="featured-container">
        {data?.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                id={`item-${index + 1}`}
                key={item._id}
                onClick={() =>
                  navigate(
                    `/profile/${item.profileModel.toLowerCase()}/${
                      item.profile
                    }`
                  )
                }
                className={`item feature-item vibrate-${((index + 1) % 4) + 1}`}
              >
                <div className="image">
                  <img src={item.image} alt="" />
                </div>
                <div className="details">
                  <span className="text-crop-1 overflow-hidden">
                    {item.name}
                  </span>
                  <span>{item.type}</span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
