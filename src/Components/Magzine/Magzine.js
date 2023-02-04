import React, { useState, useEffect } from "react";

import { cancelToken, getHandBook } from "../../services/APIConfig";
import "../Magzine/Magzine.css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";

// import MagazineCard from "./MagazineCard";
import MagCard from "./MagCard";

function Magzine() {
  const [handbookData, setHandBookData] = useState([]);



  useEffect(() => {
    getHandBook(setHandBookData);

    return () => {
      cancelToken.cancel();
    };
  }, []);
  return (
    <>
      <div className="content">
        <div className="container"

        >
          <h1 className="text1 txt">Magazines & Hand-Book</h1>
          <h5 className="text2 text111 magazine-box ">
            Engineerhub issues various magazines & handbooks regularly that
            contribute to expanding knowledge for the benefit of students.
          </h5>

          <Swiper
            
            loop={true}
          Autoplay={false}
        
            touchMoveStopPropagation={false}
            autoplay={{ delay: 2000 }}
            spaceBetween={26}
            breakpoints={{
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 900,
                slidesPerView: 3,
              },
              1440: {
                width: 1274,
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => {}}
            onTouchMoveCapture={()=>{}}
            onSlideChange={() => {}}
          >
            {handbookData.reverse().map((c, i) => (
              <SwiperSlide key={`${i}a`}>
                <MagCard
                  key={`${i}a`}
                  bookTitle={c.bookTitle}
                  pdfUrl={c.pdfUrl}
                  description={c.description}
                  img={c.bookimgUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Magzine;
