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
              <p>Students from IIT’s, NIT’s and IIIT’s to form a community.</p>
              <div className="stat">
                <CommunitySvg className="svg" />
                <span>75000+</span>
                <span>Students</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>Students from IIT’s, NIT’s and IIIT’s to form a community.</p>
              <div className="stat">
                <CampusSvg className="svg" />
                <span>1100+</span>
                <span>Campuses</span>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="stats-container">
              <p>Students from IIT’s, NIT’s and IIIT’s to form a community.</p>
              <div className="stat">
                <CompanySvg className="svg" />
                <span>125+</span>
                <span>Companies</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="mobile-stats-container">
        <div className="first-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CommunitySvg className="svg" />
            </div>
            <span>75000+</span>
            <span>Students</span>
          </div>
        </div>
        <div className="second-line">
          <div className="mobile-stat">
            <div className="svg-container">
              <CampusSvg className="svg" />
            </div>
            <span>1100+</span>
            <span>Campuses</span>
          </div>
          <div className="mobile-stat">
            <div className="svg-container">
              <CompanySvg className="svg" />
            </div>
            <span>125+</span>
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
