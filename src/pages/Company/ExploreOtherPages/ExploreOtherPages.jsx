import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import OtherPageCard from '../OtherPageCard';
import OtherPageCard2 from '../OtherPageCard2';
import OtherPageCard3 from '../OtherPageCard3';
import { Bucket_URL } from '../../../services/APIUtils';
import { NextButton, PrevButton, usePrevNextButtons } from '../Referrals/BookNow/EmblaCarouselArrowButtons';
import './ExploreOtherPages.css';

const ExploreOtherPages = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  let count = 0;

  const cards = [
    {
      component: OtherPageCard,
      props: {
        link: "https://engineerhub.in/referrals/book-now/66e091cc56ed7c8c16400d91",
        image: `${Bucket_URL}Mentors/otherpages/1.png`,
        showText: ++count === 4
      }
    },
    {
      component: OtherPageCard2,
      props: {
        link: "https://engineerhub.in/referrals/book-now/66d4572436b0cd9739a994e8"
      }
    },
    {
      component: OtherPageCard,
      props: {
        link: "https://engineerhub.in/chat/Let%E2%80%99s%20Discuss",
        image: `${Bucket_URL}Mentors/otherpages/2.png`,
        showText: ++count === 4
      }
    },
    {
      component: OtherPageCard,
      props: {
        link: "https://engineerhub.in/campus",
        image: `${Bucket_URL}Mentors/otherpages/3.png`,
        showText: ++count === 4
      }
    },
    {
      component: OtherPageCard,
      props: {
        link: "https://www.engineerhub.in/host",
        image: `${Bucket_URL}Mentors/otherpages/5.png`,
        showText: ++count === 4
      }
    },
    {
      component: OtherPageCard3,
      props: {
        link: "https://engineerhub.in/community/notes/Data%20Structures%20%26%20Algorithms",
        image: `${Bucket_URL}Mentors/otherpages/4.png`
      }
    }
  ];

  return (
    <section className="explore-pages-section">
      <h2 className="segment-heading">Explore Other Pages</h2>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {cards.map((card, index) => {
              const CardComponent = card.component;
              return (
                <div key={index} className="embla__slide">
                  <CardComponent {...card.props} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherPages; 