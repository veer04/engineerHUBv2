import "./ImageCarousel2.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import defaultPoster from "../../assets/defaultPoster";

export default function ImageCarousel2({ photos }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeImage, setActiveImage] = useState(photos?.length);
  const [extraPaddingImages, setExtraPaddingImages] = useState(0);
  const [paddingArray, setPaddingArray] = useState([]);
  const [carouselPhotos, setCarouselPhotos] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(400);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width > 820) {
      setScrollLimit(400);
    }
    if (width <= 820) {
      setScrollLimit(300);
    }
    if (width <= 600) {
      setScrollLimit(150);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    setExtraPaddingImages(photos?.length);
    setActiveImage(photos?.length);
  }, [photos]);

  useEffect(() => {
    setPaddingArray(Array.from({ length: extraPaddingImages }, () => ""));
  }, [extraPaddingImages]);

  useEffect(() => {
    if (photos?.length > 0) setCarouselPhotos([...paddingArray, ...photos, ""]);
    else setCarouselPhotos([defaultPoster]);
  }, [paddingArray]);

  useEffect(() => {
    if (document.querySelector(".inner-container") !== null)
      document.querySelector(".inner-container").scrollLeft = 0;
  }, [carouselPhotos]);

  return (
    <div className="image-carousel__outer-container">
      <IoIosArrowBack
        onClick={() => {
          if (activeImage > extraPaddingImages) {
            setActiveImage((prev) => prev - 1);
            document.querySelector(".inner-container").scrollLeft -=
              scrollLimit;
          }
        }}
        style={{
          visibility: activeImage > extraPaddingImages ? "visible" : "hidden",
        }}
        className="arrow arrow-left"
      />
      <div className="inner-container">
        {carouselPhotos?.map((photo, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundImage: `url(${photo})`,
              }}
              className="image-container"
            ></div>
          );
        })}
      </div>
      <IoIosArrowForward
        onClick={() => {
          if (activeImage < carouselPhotos.length - 2) {
            setActiveImage((prev) => prev + 1);
            document.querySelector(".inner-container").scrollLeft +=
              scrollLimit;
          }
        }}
        style={{
          visibility:
            activeImage < carouselPhotos.length - 2 ? "visible" : "hidden",
        }}
        className="arrow arrow-right"
      />
    </div>
  );
}
