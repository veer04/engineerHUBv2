import React from "react";
import "./ourclientale.css";
import { Bucket_URL } from "../../services/APIUtils";

const images = [
  { img1: `${Bucket_URL}static/clientele/acciojobs.png` },
  { img2: `${Bucket_URL}static/clientele/asbl.jpg` },
  { img3: `${Bucket_URL}static/clientele/baazigames.png` },
  { img4: `${Bucket_URL}static/clientele/blusmart.jpg` },
  { img5: `${Bucket_URL}static/clientele/cognizant.jpeg` },
  { img6: `${Bucket_URL}static/clientele/deloitte.png` },
  { img7: `${Bucket_URL}static/clientele/garaaz.jpeg` },
  { img8: `${Bucket_URL}static/clientele/motherson.png` },
  { img9: `${Bucket_URL}static/clientele/opslyft.png` },
  { img10: `${Bucket_URL}static/clientele/proxgy.png` },
  { img11: `${Bucket_URL}static/clientele/Recruit.png` },
  { img12: `${Bucket_URL}static/clientele/responsenet.png` },
  { img13: `${Bucket_URL}static/clientele/serri.png` },
  { img14: `${Bucket_URL}static/clientele/superkalam.png` },
  { img15: `${Bucket_URL}static/clientele/trulymadly.jpg` },
  { img16: `${Bucket_URL}static/clientele/wipro.png` },
];

const OurClientale = () => {
  // Split images into 3 rows (16 logos)
  const firstRowImages = images.slice(0, 6);
  const secondRowImages = images.slice(6, 11);
  const thirdRowImages = images.slice(11, 16);
  
  return (
    <div className="main-clientale-div">
      <div className="main-heading-div">
        <h3 className="h3-clientale">Our clientele ❤️</h3>
        <p className="p-clientale">
          Over 350 top companies & startups have hired talent through engineerHUB
        </p>
      </div>

      <div className="clientale-slider">
        <div className="slider-row move-right">
          {[...firstRowImages, ...firstRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <div key={index} className="logo-tile">
                <img
                  src={img[key]}
                  alt={`Client ${index + 1}`}
                  className="logo-image"
                />
              </div>
            );
          })}
        </div>

        <div className="slider-row move-left">
          {[...secondRowImages, ...secondRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <div key={index} className="logo-tile">
                <img
                  src={img[key]}
                  alt={`Client ${index + 8}`}
                  className="logo-image"
                />
              </div>
            );
          })}
        </div>

        <div className="slider-row move-right-slow">
          {[...thirdRowImages, ...thirdRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <div key={index} className="logo-tile">
                <img
                  src={img[key]}
                  alt={`Client ${index + 15}`}
                  className="logo-image"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurClientale;
