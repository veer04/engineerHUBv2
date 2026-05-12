import "./NewHomePage.css";
import { useEffect, useRef, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import MainLandingSection from "./MainLandingSection";
import NewReviewSection from "./NewReviewSection";
import StatsCarousel from "./StatsCarousel";
import NewCommunitySection from "./NewCommunitySectionHomePage";
import NewCampusHomePage from "./NewCampusHomePage";
import NewCompanyHomePage from "./NewCompanyHomePage";
import NewHostHomePage from "./NewHostHomePage";
import NewSiliconValley from "./NewSiliconValley";
import { getTrendingAlumni2, getTrendingClubs } from "../../services/APIConfig";
import EasyWayToHire from "../Enterprise/Assests/Components/EasyWayToHire/EasyWayToHire";
import OurClientale from "../../components/OurClientale/OurClientale";
import JobsForYouFilterComp from "../Company/JobsForYouFilterPage/JobsForYouFilterComp";
import TestimonialsSection from "../Company/TestimonialsSection/TestimonialsSection";
import { SEO } from "../../components/SEO/SEO.jsx";
import JobsSegment from "../Company/JobsSegment/JobsSegment";
import InternshipSegment from "../Company/InternshipSegment/InternshipSegment";
import ServicesSegment from "../Company/ServicesSegment/ServicesSegment";

const DAILY_OPPS_TYPEWRITER_TEXT =
  "50+ opportunities are posted every day.";
const DAILY_OPPS_TYPE_MS = 42;

function renderDailyOppsTyped(typed) {
  const prefix = "50+";
  if (!typed.length) return null;
  if (typed.length <= prefix.length && prefix.startsWith(typed)) {
    return (
      <span className="homepage-daily-opps-banner__accent">{typed}</span>
    );
  }
  if (typed.startsWith(prefix)) {
    return (
      <>
        <span className="homepage-daily-opps-banner__accent">{prefix}</span>
        {typed.slice(prefix.length)}
      </>
    );
  }
  return typed;
}

const REFERRALS_HOOK_TYPEWRITER_TEXT =
  "Tired of applying? Get the direct referrals.";
const REFERRALS_HOOK_TYPE_MS = 42;

function renderReferralsHookTyped(typed) {
  const prefix = "Tired";
  if (!typed.length) return null;
  if (typed.length <= prefix.length && prefix.startsWith(typed)) {
    return (
      <span className="homepage-referrals-hook-banner__accent">{typed}</span>
    );
  }
  if (typed.startsWith(prefix)) {
    return (
      <>
        <span className="homepage-referrals-hook-banner__accent">{prefix}</span>
        {typed.slice(prefix.length)}
      </>
    );
  }
  return typed;
}

export default function NewHomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  const [list, setList] = useState([]);
  const [clubs, setClubs] = useState([]);
  const dailyOppsRef = useRef(null);
  const [dailyOppsVisible, setDailyOppsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [dailyOppsTyped, setDailyOppsTyped] = useState("");
  const [dailyOppsTypingDone, setDailyOppsTypingDone] = useState(false);

  const referralsHookRef = useRef(null);
  const [referralsHookVisible, setReferralsHookVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [referralsHookTyped, setReferralsHookTyped] = useState("");
  const [referralsHookTypingDone, setReferralsHookTypingDone] =
    useState(false);

  useEffect(() => {
    setSelectedPageNavbar("home");
    getTrendingAlumni2(setList);
    getTrendingClubs(setClubs);
    // window.scrollTo(0, 0);
  }, [setSelectedPageNavbar]);

  useEffect(() => {
    const el = dailyOppsRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setDailyOppsVisible(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDailyOppsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!dailyOppsVisible) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setDailyOppsTyped(DAILY_OPPS_TYPEWRITER_TEXT);
      setDailyOppsTypingDone(true);
      return undefined;
    }

    setDailyOppsTyped("");
    setDailyOppsTypingDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDailyOppsTyped(DAILY_OPPS_TYPEWRITER_TEXT.slice(0, i));
      if (i >= DAILY_OPPS_TYPEWRITER_TEXT.length) {
        clearInterval(id);
        setDailyOppsTypingDone(true);
      }
    }, DAILY_OPPS_TYPE_MS);
    return () => clearInterval(id);
  }, [dailyOppsVisible]);

  useEffect(() => {
    const el = referralsHookRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setReferralsHookVisible(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReferralsHookVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!referralsHookVisible) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setReferralsHookTyped(REFERRALS_HOOK_TYPEWRITER_TEXT);
      setReferralsHookTypingDone(true);
      return undefined;
    }

    setReferralsHookTyped("");
    setReferralsHookTypingDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setReferralsHookTyped(REFERRALS_HOOK_TYPEWRITER_TEXT.slice(0, i));
      if (i >= REFERRALS_HOOK_TYPEWRITER_TEXT.length) {
        clearInterval(id);
        setReferralsHookTypingDone(true);
      }
    }, REFERRALS_HOOK_TYPE_MS);
    return () => clearInterval(id);
  }, [referralsHookVisible]);

  return (
    <SEO
      title="engineerHUB | Jobs, Referrals & Mentorship"
      description="Explore jobs, internships, referral programs, and mentorship trusted by Indian engineers on engineerHUB’s community-powered career platform."
      keywords={[
        "engineerhub jobs",
        "tech internships",
        "referral programs",
        "career mentorship",
        "campus placements",
        "hiring community",
      ]}
    >
      <main className="homepage">
        <MainLandingSection />
        <StatsCarousel />
        <div ref={dailyOppsRef} className="homepage-daily-opps-banner">
          <p
            className="homepage-daily-opps-banner__text homepage-daily-opps-banner__typewriter"
            aria-label={DAILY_OPPS_TYPEWRITER_TEXT}
          >
            {renderDailyOppsTyped(dailyOppsTyped)}
            {!dailyOppsTypingDone && dailyOppsVisible ? (
              <span
                className="homepage-daily-opps-typewriter-caret"
                aria-hidden="true"
              />
            ) : null}
          </p>
        </div>
        {/* <NewCommunitySection /> */}
        {/* <NewCampusHomePage list={list} clubs={clubs} />*/}
      {/*    
        <NewCompanyHomePage />
        */}
        <JobsSegment />
        <InternshipSegment />
        <div ref={referralsHookRef} className="homepage-referrals-hook-banner">
          <p
            className="homepage-referrals-hook-banner__text homepage-referrals-hook-banner__typewriter"
            aria-label={REFERRALS_HOOK_TYPEWRITER_TEXT}
          >
            {renderReferralsHookTyped(referralsHookTyped)}
            {!referralsHookTypingDone && referralsHookVisible ? (
              <span
                className="homepage-referrals-typewriter-caret"
                aria-hidden="true"
              />
            ) : null}
          </p>
        </div>
        <ServicesSegment />
       {/* <JobsForYouFilterComp /> */}

        
        {/*
        <NewHostHomePage />

        <EasyWayToHire />
        {/*
        <OurClientale />
        */}

        {/* <NewSiliconValley /> */}
        
        <TestimonialsSection />
        
        {/* <NewReviewSection /> */}
      </main>
    </SEO>
  );
}
