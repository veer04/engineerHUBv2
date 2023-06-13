import React, { useState, useEffect } from "react";
import "./ParticularAlumni.css";
import AlumniLocalCard from "../../../components/AlumniLocalCard/AlumniLocalCard";
import { Bucket_URL } from "../../../services/APIUtils";
import { useNavigate, useParams } from "react-router-dom";
import {
  controller,
  getAlumniById,
  getCampusAlumni,
} from "../../../services/APIConfig";
import colorWheel from "../../../assets/colorWheel";
import LoadingPage from "../../../components/Loader/LoadingPage";

export default function ParticularAlumni() {
  const navigate = useNavigate();
  const { collegeId, almaId } = useParams();
  const [alumni, setAlumni] = useState([]);
  const [almaData, setAlmaData] = useState({});
  const bucket = `${Bucket_URL}frontend/campus/particularcampus/particularalma/`;
  const instagramPng = `${bucket}instagram.png`;
  const twitterPng = `${bucket}twitter.png`;
  const linkedinPng = `${bucket}linkedin.png`;

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampusAlumni(setAlumni, collegeId);
    getAlumniById(setAlmaData, almaId);

    return () => {
      controller.abort();
    };
  }, [almaId, collegeId]);

  const particularAlumniPage = (
    <div className="particular-alumni-page">
      <div className="alumni-list">
        {alumni.map((alumni, index) => (
          <AlumniLocalCard
            key={alumni._id}
            {...alumni}
            color={colorWheel[index % colorWheel.length]}
          />
        ))}
      </div>
      <div className="details-container">
        <div className="section info-container">
          <div className="batch-lg-container">
            <div className="batch">
              Batch <span>- {almaData.batch}</span>
            </div>
            <div className="socials">
              {Object.keys(almaData).length > 0 && (
                <a href={almaData.socialMedia.instagram} target="_blank">
                  <img src={instagramPng} alt="instagram" />
                </a>
              )}
              {Object.keys(almaData).length > 0 && (
                <a href={almaData.socialMedia.twitter} target="_blank">
                  <img src={twitterPng} alt="twitter" />
                </a>
              )}
              {Object.keys(almaData).length > 0 && (
                <a href={almaData.socialMedia.linkedIn} target="_blank">
                  <img src={linkedinPng} alt="linkedin" />
                </a>
              )}
            </div>
          </div>
          <div className="personal-info">
            <div
              style={{
                backgroundImage: `url(${almaData.image})`,
              }}
              className="image"
            ></div>
            <div className="info">
              <div className="name">{almaData.name}</div>
              <div className="designation">
                {almaData.companyName}, {almaData.currentProfile}
              </div>
              <div className="batch-md">
                Batch <span>- {almaData.batch}</span>
              </div>
            </div>
            {/* <div className="options-container">
          <button className="message">Message</button>
        </div> */}
          </div>
        </div>
        <div className="section socials-container">
          <div className="title">Socials</div>
          <div className="socials">
            {Object.keys(almaData).length > 0 && (
              <a href={almaData.socialMedia.instagram} target="_blank">
                <img src={instagramPng} alt="instagram" />
              </a>
            )}
            {Object.keys(almaData).length > 0 && (
              <a href={almaData.socialMedia.twitter} target="_blank">
                <img src={twitterPng} alt="twitter" />
              </a>
            )}
            {Object.keys(almaData).length > 0 && (
              <a href={almaData.socialMedia.linkedIn} target="_blank">
                <img src={linkedinPng} alt="linkedin" />
              </a>
            )}
          </div>
        </div>

        <div className="section about-container">
          <div className="title">About Me</div>
          <div className="about">{almaData.aboutMe} </div>
        </div>
        <div className="section connect-container">
          <div className="title">Connect with Mentor</div>
          <div className="connect">
            <div
              onClick={() => navigate("/under-maintenance")}
              className="connect-card on-hover-scale"
            >
              <div className="title">1-on-1 Mentorship</div>
              <div className="info">
                Earn by sharing your valuable learning & expertise with your
                juniors.
              </div>
            </div>
            <div
              onClick={() => navigate("/under-maintenance")}
              className="connect-card on-hover-scale"
            >
              <div className="title">Resume Review</div>
              <div className="info">
                Help out your junior in creating the industry standard resume by
                reviewing it.
              </div>
            </div>
            <div
              onClick={() => navigate("/under-maintenance")}
              className="connect-card on-hover-scale"
            >
              <div className="title">Webinars</div>
              <div className="info">
                Your juniors still need your guidance, so host an live session
                for them to re-connect.
              </div>
            </div>
            <div
              onClick={() => navigate("/under-maintenance")}
              className="connect-card on-hover-scale"
            >
              <div className="title">Courses</div>
              <div className="info">
                Craft a course for your juniors to teach them How & What exactly
                Industry looks in a fresh candidate.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return Object.keys(almaData).length > 0 ? (
    particularAlumniPage
  ) : (
    <LoadingPage />
  );
}
