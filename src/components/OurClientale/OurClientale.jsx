import React from "react";
import "./ourclientale.css";
import { Bucket_URL } from "../../services/APIUtils";

const images = [
  { img1: `${Bucket_URL}clientale/10.svg` },
  { img2: `${Bucket_URL}clientale/11.svg` },
  { img3: `${Bucket_URL}clientale/12.svg` },
  { img4: `${Bucket_URL}clientale/13.svg` },
  { img5: `${Bucket_URL}clientale/14.svg` },
  { img6: `${Bucket_URL}clientale/15.svg` },
  { img7: `${Bucket_URL}clientale/16.svg` },
  { img8: `${Bucket_URL}clientale/17.svg` },
  { img9: `${Bucket_URL}clientale/30.svg` },
  { img10: `${Bucket_URL}clientale/19.svg` },
  { img11: `${Bucket_URL}clientale/20.svg` },
  { img12: `${Bucket_URL}clientale/21.svg` },
  { img13: `${Bucket_URL}clientale/22.svg` },
  { img14: `${Bucket_URL}clientale/23.svg` },
  { img15: `${Bucket_URL}clientale/24.svg` },
  { img16: `${Bucket_URL}clientale/25.svg` },
  { img17: `${Bucket_URL}clientale/26.svg` },
  { img18: `${Bucket_URL}clientale/27.svg` },
  { img19: `${Bucket_URL}clientale/28.svg` },
  { img20: `${Bucket_URL}clientale/29.svg` },
];

const OurClientale = () => {
  const firstRowImages = images.slice(0, 10);
  const secondRowImages = images.slice(10, 20);
  return (
    <div className="main-clientale-div">
      <div className="main-heading-div">
        <h3 className="h3-clientale">Our Clientale</h3>
        <p className="p-clientale">
          Over 65 top companies have hired talent through engineerHUB
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
                alt={`Client ${index + 11}`}
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
