import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import "./ReviewsSection.css";

export default function ReviewsSection() {
  const [activeCard, setActiveCard] = useState(0);

  //not more than 15 reviews recommended

  //fetch reviews from database
  const reviews = [
    {
      // id starting from 0 is required to assign colors to the div later, so don't change it, if required, then replace variable 'id' with 'index' in the array as well as in the map function
      id: 0,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iure omnis ad velit! Distinctio voluptatem aut magni, recusandae maxime reprehenderit.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, possimus? Beatae mollitia labore corporis quae? Cum blanditiis ullam excepturi officiis, aspernatur nemo minima sapiente ratione eveniet expedita quos perferendis et?",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 2,
      name: "John Doe",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae velit quam qui atque quod. At dolor corporis maxime iusto maiores modi non sapiente delectus nesciunt.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 3,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eos aliquam in libero, commodi ab?",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 4,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, optio tempore? Neque, debitis commodi. Sint maiores quasi cumque.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 5,
      name: "John Doe",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla explicabo totam, aliquam repellendus odit quibusdam, saepe consequuntur aut, natus reiciendis sint! Ea?",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 6,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut unde sapiente ratione! Sunt cum, quam magnam laudantium eum impedit maiores dolores accusantium praesentium accusamus voluptatum pariatur?",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 7,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia commodi placeat illum ipsa. Aliquam.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 8,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem pariatur hic sequi unde illum delectus obcaecati atque.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 9,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsam asperiores illo quos.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 10,
      name: "John Doe",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae inventore blanditiis atque modi suscipit quibusdam minima ut laboriosam obcaecati?",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 11,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, cumque in maxime natus aut laboriosam minus qui voluptatibus. Dolorum enim sequi iure rerum consequatur.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 12,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et incidunt quam excepturi velit ad accusamus vel eveniet in recusandae.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 13,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nostrum similique, vitae voluptate id a cupiditate ipsam quibusdam necessitatibus quae.",
      img: "https://source.unsplash.com/random",
    },
    {
      id: 14,
      name: "John Doe",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum modi incidunt assumenda velit quam.",
      img: "https://source.unsplash.com/random",
    },
  ];

  let randomnessFactor = reviews.length;

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    const interval = setInterval(() => {
      setActiveCard(Math.floor(Math.random() * randomnessFactor));
    }, 5000);

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
      clearInterval(interval);
    };
  }, []);

  if (width < 1450) {
    randomnessFactor = 12;
  }
  if (width < 1150) {
    randomnessFactor = 9;
  }
  if (width < 750) {
    randomnessFactor = 6;
  }
  if (width < 510) {
    randomnessFactor = 3;
  }

  function renderReviews(reviews) {
    return reviews.map((review) => {
      return (
        <ReviewCard
          key={review.id}
          id={review.id}
          name={review.name}
          text={review.text}
          img={review.img}
          activeCard={activeCard}
        />
      );
    });
  }

  return (
    <div className="reviews-section">
      <div className="reviews-section-title heading-3">
        Your Honest Reviews :)
      </div>
      <div className="reviews-section-container">
        <div className="reviews-col reviews-col-1">
          {renderReviews(reviews.slice(0, 3))}
        </div>
        <div className="reviews-col reviews-col-2">
          {renderReviews(reviews.slice(3, 6))}
        </div>
        <div className="reviews-col reviews-col-3">
          {renderReviews(reviews.slice(6, 9))}
        </div>
        <div className="reviews-col reviews-col-4">
          {renderReviews(reviews.slice(9, 12))}
        </div>
        <div className="reviews-col reviews-col-5">
          {renderReviews(reviews.slice(12, 15))}
        </div>
      </div>
    </div>
  );
}
