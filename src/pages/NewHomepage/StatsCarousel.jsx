import "./StatsCarousel.css";
import {
  CampusSvg,
  CommunitySvg,
  CompanySvg,
} from "../../components/MobileNavbar/MobileNavbar";
import { Bucket_URL } from "../../services/APIUtils";

export default function StatsCarousel() {
  const bucket = `${Bucket_URL}frontend/homepage/stats/`;
  return (
    <section id="homepage-stats-section">
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="stats-container">
              <p>
                Student from across India, including those from IITs, NITs and
                state colleges.
              </p>
              <div className="stat">
                <CommunitySvg className="svg" />
                <span>2,00,000+</span>
                <span>Members</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>
                Now, every campus is at your fingertips. Explore their events,
                alumni, and clubs.
              </p>
              <div className="stat">
                <CampusSvg className="svg" />
                <span>1,950+</span>
                <span>Campuses</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>
                Companies from across India are hosting opportunities.
                <br />
                Log in, explore and apply.
              </p>
              <div className="stat">
                <CompanySvg className="svg" />
                <span>800+</span>
                <span>Companies</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="mobile-stats-container">
        <div className="first-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CommunitySvg className="svg" />
            </div>
            <span>2,00,000+</span>

            <span>Members</span>
          </div>
        </div>
        <div className="second-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CampusSvg className="svg" />
            </div>
            <span>1,950+</span>
            <span>Campuses</span>
          </div>
          <div className="mobile-stat">
            <div className="svg-container">
              <CompanySvg className="svg" />
            </div>
            <span>800+</span>
            <span>Companies</span>
          </div>
        </div>
        <div className="hand-image">
          <img
            src={`${bucket}hand-image.png`}
            alt="three hand connecting in a triangle showing a bond between them"
          />
        </div>
      </div>
    </section>
  );
}
