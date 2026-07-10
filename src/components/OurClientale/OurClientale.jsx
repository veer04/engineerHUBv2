import React from "react";
import "./ourclientale.css";
import { Bucket_URL } from "../../services/APIUtils";

const images = [
  { img1: `${Bucket_URL}static/clientele/acciojobs.png` },
  { img2: `${Bucket_URL}static/clientele/asbl.jpg` },
  { img3: `${Bucket_URL}static/clientele/baazigames.png` },
  
  { img5: `${Bucket_URL}static/clientele/blusmart.png` },
  { img6: `${Bucket_URL}static/clientele/cognizant.jpeg` },
  
  { img8: `${Bucket_URL}static/clientele/deloitte.png` },
  { img9: `${Bucket_URL}static/clientele/garaaz.jpeg` },
  { img10: `${Bucket_URL}static/clientele/motherson.png` },
  { img11: `${Bucket_URL}static/clientele/opslyft.png` },
  { img12: `${Bucket_URL}static/clientele/proxgy.png` },
  { img13: `${Bucket_URL}static/clientele/Recruit.png` },
 
  { img15: `${Bucket_URL}static/clientele/responsenet.png` },
  { img16: `${Bucket_URL}static/clientele/serri.png` },
  { img17: `${Bucket_URL}static/clientele/superkalam.png` },
  { img18: `${Bucket_URL}static/clientele/trulymadly.jpg` },
  { img19: `${Bucket_URL}static/clientele/wipro.png` },
  { img20: `${Bucket_URL}static/clientele/calix.png` },
  { img21: `${Bucket_URL}static/clientele/gururo.png` },
  { img22: `${Bucket_URL}static/clientele/infor.jpeg` },
  { img23: `${Bucket_URL}static/clientele/supermoney.jpg` },
  { img24: `${Bucket_URL}static/clientele/instabase.png` },


];

const OurClientale = () => {
  // Split images into 3 rows to cover all 20 logos
  const firstRowImages = images.slice(0, 7);
  const secondRowImages = images.slice(7, 14);
  const thirdRowImages = images.slice(14, 20);
  
  return (
    <div className="main-clientale-div">
      <div className="main-heading-div">
        <h3 className="h3-clientale">Our clientele ❤️</h3>
        <p className="p-clientale">
          Over 75 top companies have hired talent through engineerHUB
        </p>
      </div>

      <div className="clientale-slider">
        <div className="slider-row move-right">
          {[...firstRowImages, ...firstRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <img
                key={index}
                src={img[key]}
                alt={`Client ${index + 1}`}
                className="logo-image"
              />
            );
          })}
        </div>

        <div className="slider-row move-left">
          {[...secondRowImages, ...secondRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <img
                key={index}
                src={img[key]}
                alt={`Client ${index + 8}`}
                className="logo-image"
              />
            );
          })}
        </div>

        <div className="slider-row move-right-slow">
          {[...thirdRowImages, ...thirdRowImages].map((img, index) => {
            const key = Object.keys(img)[0];
            return (
              <img
                key={index}
                src={img[key]}
                alt={`Client ${index + 15}`}
                className="logo-image"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurClientale;
