import { useEffect } from "react";
import "./Reviewslide.css";

export default function ReviewSlide() {
  const colorWheel = ["#FAE8B7", "#C0E0F2", "#D6F3BF", "#F1D5C0"];

  // Dummy data for the reviews
  const dummyReviews = [
    {
      text: "Thanks for providing the referral at Delhivery, I'm selected there. Recommending engineerHUB to all the engineers out there.",
      name: "Rohit Das",
    },
    {
      text: "It was a great session. Mr Rishabh did a thorough review of my Resume...highly recommended!!",
      name: "Vandana Balasubramanian",
    },
    {
      text: "Thanks, really helpful. helped me improve my ATS score",
      name: "Mayukh Pankaj",
    },
    {
      text: "Resourceful List! I've applied to some open positions among these.",
      name: "Rahul Pratap",
    },

    {
      text: "Thanks for providing assistance & support for my recent career transition. With your help, I successfully secured a position at Cisco, an achievement I am incredibly proud of.",
      name: "Ishaan Sikka",
    },
    {
      text: "Thanks for helping in understanding resume to attract recruiters",
      name: "Ravindra Babu",
    },
    {
      text: "I have successfully received a referral from Microsoft, thank you engineerhub.",
      name: "Satyam Singh",
    },

    {
      text: "I got an idea about how companies approach, what they expect from us, and how to customize my resume.",
      name: "Mohammed Sulaiman ",
    },
  ];

  function addAnimation() {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  useEffect(() => {
    if (!!dummyReviews.length) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
        addAnimation();
      }
    }
  }, [dummyReviews]);

  return (
    <section className="review-slide-section">
      <div className="scroller">
        <div className="scroller__inner">
          {[...Array(5)].map((_, index1) => {
            return (
              <div key={index1} className="column">
                {dummyReviews
                  .slice(index1 * 2, index1 * 2 + 2)
                  .map((review, index2) => (
                    <div
                      style={{
                        backgroundColor:
                          colorWheel[(index1 + index2 + 1) % colorWheel.length],
                      }}
                      key={index2}
                      className={`review ${
                        index2 === 1 ? "--hide-mobile" : ""
                      }`}
                    >
                      <span className="text">{review.text}</span>
                      <div className="details-container">
                        <div className="image">
                          <img
                            src={`https://ui-avatars.com/api/?background=0A5C36&color=fff&name=${encodeURIComponent(
                              review.name
                            )}`}
                            alt={`${review.name}`}
                          />
                        </div>
                        <div className="details">
                          <span className="name">{review.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
