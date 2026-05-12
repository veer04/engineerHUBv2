import "./StatsCarousel.css";
import { useEffect, useRef, useState } from "react";
import {
  CampusSvg,
  CommunitySvg,
  CompanySvg,
} from "../../components/MobileNavbar/MobileNavbar";
import { Bucket_URL } from "../../services/APIUtils";

/** Count runs ~3.5s, then carousel advances after a short beat at the final value. */
const COUNT_DURATION_MS = 3500;
const HOLD_AT_MAX_MS = 450;
const CAROUSEL_WRAP = true;

/**
 * Desktop carousel slides: left copy is static; right number animates start → max.
 * Members start at 2,00,000 (Indian grouping); others start at 0.
 */
const STATS_SLIDES = [
  {
    start: 200000,
    max: 225000,
    label: "Members",
    suffix: "+",
  },
  {
    start: 0,
    max: 800,
    label: "Campuses",
    suffix: "+",
  },
  {
    start: 0,
    max: 75,
    label: "Companies",
    suffix: "+",
  },
];

function formatStatNumber(n) {
  return `${n.toLocaleString("en-IN")}`;
}

function useCountUp(start, max, durationMs, enabled) {
  const [value, setValue] = useState(enabled ? start : max);

  useEffect(() => {
    if (!enabled) {
      setValue(max);
      return undefined;
    }

    setValue(start);
    const startAt = performance.now();
    let raf = 0;

    const tick = (now) => {
      const elapsed = now - startAt;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - (1 - t) * (1 - t);
      const v = Math.round(start + (max - start) * eased);
      setValue(v);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(max);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, max, durationMs, enabled]);

  return value;
}

/** Desktop: animates when slide is active. Mobile: pass `forceActive` so it always uses the same count-up as the carousel tile. */
function CarouselStatNumber({
  slideIndex,
  activeIndex,
  slide,
  forceActive = false,
}) {
  const isActive = forceActive || slideIndex === activeIndex;
  const animated = useCountUp(
    slide.start,
    slide.max,
    COUNT_DURATION_MS,
    isActive
  );
  const shown = isActive ? animated : slide.max;
  return (
    <span className="stat-number">
      {formatStatNumber(shown)}
      {slide.suffix}
    </span>
  );
}

export default function StatsCarousel() {
  const bucket = `${Bucket_URL}frontend/homepage/stats/`;
  const carouselRef = useRef(null);
  const carouselInstanceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    const Carousel = window.bootstrap?.Carousel;
    if (!el || !Carousel) return undefined;

    carouselInstanceRef.current =
      Carousel.getInstance(el) ??
      Carousel.getOrCreateInstance(el, {
        interval: false,
        ride: false,
        wrap: CAROUSEL_WRAP,
      });

    return undefined;
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return undefined;

    const onSlid = () => {
      const items = el.querySelectorAll(".carousel-item");
      const idx = [...items].findIndex((node) =>
        node.classList.contains("active")
      );
      if (idx >= 0) setActiveIndex(idx);
    };

    el.addEventListener("slid.bs.carousel", onSlid);
    return () => el.removeEventListener("slid.bs.carousel", onSlid);
  }, []);

  useEffect(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }

    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      carouselInstanceRef.current?.next();
    }, COUNT_DURATION_MS + HOLD_AT_MAX_MS);

    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
    };
  }, [activeIndex]);

  return (
    <section id="homepage-stats-section">
      <div
        ref={carouselRef}
        id="carousel"
        className="carousel slide"
        data-bs-wrap={CAROUSEL_WRAP ? "true" : "false"}
        aria-label="Community statistics highlights"
        role="region"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="stats-container">
              <p>
                Student from across India, including those from IITs, NITs and
                state colleges.
              </p>
              <div className="stat">
                <CommunitySvg className="svg" />
                <CarouselStatNumber
                  slideIndex={0}
                  activeIndex={activeIndex}
                  slide={STATS_SLIDES[0]}
                />
                <span>{STATS_SLIDES[0].label}</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>Now students from colleges of all tiers are here!</p>
              <div className="stat">
                <CampusSvg className="svg" />
                <CarouselStatNumber
                  slideIndex={1}
                  activeIndex={activeIndex}
                  slide={STATS_SLIDES[1]}
                />
                <span>{STATS_SLIDES[1].label}</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>
                Companies from across India are hosting opportunities.
                <br />
                Log in, explore and apply.
              </p>
              <div className="stat">
                <CompanySvg className="svg" />
                <CarouselStatNumber
                  slideIndex={2}
                  activeIndex={activeIndex}
                  slide={STATS_SLIDES[2]}
                />
                <span>{STATS_SLIDES[2].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-stats-container">
        <div className="first-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CommunitySvg className="svg" />
            </div>
            <CarouselStatNumber
              slideIndex={0}
              activeIndex={activeIndex}
              slide={STATS_SLIDES[0]}
              forceActive
            />
            <span>{STATS_SLIDES[0].label}</span>
          </div>
        </div>
        <div className="second-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CampusSvg className="svg" />
            </div>
            <CarouselStatNumber
              slideIndex={1}
              activeIndex={activeIndex}
              slide={STATS_SLIDES[1]}
              forceActive
            />
            <span>{STATS_SLIDES[1].label}</span>
          </div>
          <div className="mobile-stat">
            <div className="svg-container">
              <CompanySvg className="svg" />
            </div>
            <CarouselStatNumber
              slideIndex={2}
              activeIndex={activeIndex}
              slide={STATS_SLIDES[2]}
              forceActive
            />
            <span>{STATS_SLIDES[2].label}</span>
          </div>
        </div>
        {/*
        <div className="hand-image">
          <img
            src={`${bucket}hand-image.png`}
            alt="three hand connecting in a triangle showing a bond between them"
          />
        </div>
        */}
      </div>
    </section>
  );
}
