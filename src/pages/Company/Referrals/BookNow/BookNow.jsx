import React, { useEffect, useRef, useState } from "react";
import "./booknow.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FeedBackCarousalForBookNow from "../FeedbackCarousalForBookNow/FeedBackCarousalForBookNow";
import DateBoxes from "../DateBoxesCard/DateBoxes";
import TimeBox from "../TimeBox/TimeBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { API_URL, PAYMENT_API_URL } from "../../../../services/APIUtils";
import StepIndicator from "../StepIndicator/StepIndicator";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import moment from "moment/moment";

const BookNow = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPage1, setCurrentPage1] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const { referralId } = useParams();
  const [meetingData, setMeetingData] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [timeArrayCopy, setTimeArrayCopy] = useState([]);
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const [busyEventData, setBusyEventData] = useState([]);
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ slidesToScroll: "auto" });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const {
    prevBtnDisabled: prevBtnDisabled2,
    nextBtnDisabled: nextBtnDisabled2,
    onPrevButtonClick: onPrevButtonClick2,
    onNextButtonClick: onNextButtonClick2,
  } = usePrevNextButtons(emblaApi2);

  const location = useLocation();
  const { rating, popular } = location.state || {};

  const DATES_SLIDE_COUNT = isMobile ? 4 : 3;
  const TIME_SLIDE_COUNT = 2;
  const DATES_SLIDES = Array.from(Array(DATES_SLIDE_COUNT).keys());
  const TIME_SLIDES = Array.from(Array(TIME_SLIDE_COUNT).keys());

  // useEffect(() => {
  //   const carouselElement = document.querySelector("#feedbackCarousel");
  //   if (carouselElement) {
  //     new bootstrap.Carousel(carouselElement);
  //   }
  // }, []);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(
          `${PAYMENT_API_URL}api/v1/meet/${referralId}`
        );

        if (response.ok) {
          const data = await response.json();
          setMeetingData(data?.data);
        } else {
          throw new Error("Error fetching meeting data");
        }
      } catch (error) {
        console.error("Error fetching meeting data", error);
      }
    };

    fetchMeetingData();
  }, [referralId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!meetingData) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selectedTime, setSelectedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const timesPerPage = isMobile ? 6 : 12; // 4 columns x 4 rows
  const datesPerPage = isMobile ? 3 : 4; // 1 rows x 2 columns
  const carouselRef = useRef(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const durationInMinutes = parseInt(meetingData.duration.split(" ")[0], 10);
    // Convert selected time string to Date object
    const [timeString, period] = time.split(" ");
    const [hour, minute] = timeString.split(":").map(Number);
    const hours24 =
      period === "PM" && hour !== 12
        ? hour + 12
        : period === "AM" && hour === 12
        ? 0
        : hour;
    const startTime = new Date();
    startTime.setHours(hours24, minute, 0, 0);

    // Calculate end time
    const endTimeDate = new Date(
      startTime.getTime() + durationInMinutes * 60 * 1000
    );

    // Format end time in 12-hour format
    const endHour = endTimeDate.getHours() % 12 || 12;
    const endMinute = endTimeDate.getMinutes().toString().padStart(2, "0");
    const endPeriod = endTimeDate.getHours() >= 12 ? "PM" : "AM";
    const formattedEndTime = `${endHour}:${endMinute} ${endPeriod}`;

    setEndTime(formattedEndTime);
  };

  const handleDateClick = (date) => {
    setSelectedDates(date);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const generateDatesForYear = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1);
    startDate.setHours(0, 0, 0, 0);

    // Loop through the year
    while (startDate.getFullYear() === today.getFullYear()) {
      // Add dates from today onwards
      if (startDate >= today) {
        const day = startDate.toLocaleDateString("en-US", { weekday: "short" });
        const date = startDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        });
        dates.push({ day, date });
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  // const datesArray = generateDatesForYear();

  // // console.log(datesArray, "datearray");
  const totalDatePages = Math.ceil(datesArray.length / datesPerPage);

  const handleNextDates = () => {
    setCurrentPage1((prevPage) => (prevPage + 1) % totalDatePages);
  };

  const handlePrevDates = () => {
    setCurrentPage1(
      (prevPage) => (prevPage - 1 + totalDatePages) % totalDatePages
    );
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    const carousel = new window.bootstrap.Carousel(carouselElement, {
      interval: false,
      wrap: false,
    });

    // Move to the slide based on currentPage1 state
    carousel.to(currentPage1);

    return () => {
      if (carousel) {
        carousel.dispose();
      }
    };
  }, [currentPage1]);

  const generateTimeArray = () => {
    const times = [];

    // Define time ranges for the morning and evening sessions
    const timeRanges = [
      { start: [10, 30], end: [12, 30] }, // Morning range from 10:30 AM to 12:30 PM
      { start: [16, 30], end: [19, 30] }, // Evening range from 4:30 PM to 7:30 PM
    ];

    const currenTime = Date.now() + 4;

    timeRanges.forEach(({ start, end }) => {
      const startTime = new Date();
      startTime.setHours(start[0], start[1], 0, 0);

      const Interval = parseInt(meetingData?.duration?.split(" ")[0], 10);
      // console.log(meetingData, "dration");

      // console.log(Interval, "Interval");

      const endTime = new Date();
      endTime.setHours(end[0], end[1], 0, 0);

      for (
        let time = new Date(startTime);
        time <= endTime;
        time.setMinutes(time.getMinutes() + Interval)
      ) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const timeString = `${displayHours}:${displayMinutes} ${ampm}`;

        times.push({
          time: timeString,
          actualTime: new Date(time),
          isDisabled: true,
        });
      }
    });

    return times;
  };

  // console.log(selectedDates, "selectedDate");
  // console.log(selectedTime, "selectedTime");
  // console.log(endTime, "endTime");

  useEffect(() => {
    if (Object.keys(meetingData).length > 0) {
      setTimeArray(generateTimeArray());
    }
  }, [meetingData]);

  // const timeArray = generateTimeArray();

  useEffect(() => {
    if (referralId) {
      setDatesArray(generateDatesForYear());

      // setTimeArrayCopy(generateTimeArray());
    }
  }, [referralId]);

  const totalPages = Math.ceil(timeArray.length / timesPerPage);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    const carousel = new window.bootstrap.Carousel(carouselElement, {
      interval: false, // Disable auto-sliding
      wrap: false, // Disable wrapping around
    });
    // Clean up Bootstrap Carousel instance on component unmount
    return () => {
      if (carousel) {
        carousel.dispose();
      }
    };
  }, [timeArray, currentPage]);

  const getBusyEvent = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/calendar/getFreeBusyData/${referralId}`,
        config
      );

      // // console.log(data, "busyeventdata");
      setBusyEventData(data?.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const [renderTimes, setRenderTimes] = useState([]);

  useEffect(() => {
    // Now when the busy dates have been fetched then in the timeArray i want that to add a tag to that time as booked. The busy event data is an array of objects in format as end:"2024-08-25T13:00:00Z", start:"2024-08-25T12:00:00Z"

    // // console.log("timeArray", timeArray);
    // // console.log("busyEventData", busyEventData);
    let renderTimes = [];
    if (!!selectedDates) {
      // // console.log(
      //   moment(new Date(`${selectedDates} 2024 8:30 PM`)).format(
      //     "YYYY[-]MM[-]DD[T]HH[:]mm[:]ss[Z]"
      //   )
      // );
      renderTimes = timeArray.filter(
        (time) =>
          busyEventData.filter(
            (busyEvent) =>
              // 2024-08-25T12:00:00Z

              moment(new Date(`${selectedDates} 2024 ${time.time}`)).format(
                "YYYY[-]MM[-]DD[T]HH[:]mm[:]ss[Z]"
              ) === busyEvent.start
          ).length === 0
      );
      // .map((time) => (time.isDisabled = false));
    }
    // // console.log("Busy Events Updated", renderTimes);
    setTimeArrayCopy(
      timeArray.map((time) => {
        if (
          renderTimes.filter((renderTime) => renderTime.time === time.time)
            .length > 0
        ) {
          return { ...time, isDisabled: false };
        }
        return time;
      })
    );
  }, [busyEventData, selectedDates]);

  // // console.log("timeArrayCopy", timeArrayCopy);

  useEffect(() => {
    getBusyEvent();
  }, [referralId]);

  const onSubmitConfirmDetails = async () => {
    if (!selectedTime || !endTime || !selectedDates) {
      alert("Please select both the date and time.");
      return;
    }

    // Function to convert 12-hour time to 24-hour format
    const convertTo24Hour = (time, meridiem) => {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours, 10);
      if (meridiem === "PM" && hours !== 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    // Function to parse date and set current year
    const parseDate = (dateString) => {
      const date = new Date(dateString);
      const currentYear = new Date().getFullYear();
      date.setFullYear(currentYear); // Set the current year
      return date; // Return as a Date object
    };

    // Format times with 24-hour conversion
    const startTimeMeridiem = selectedTime.split(" ")[1]; // AM or PM
    const endTimeMeridiem = endTime.split(" ")[1]; // AM or PM

    const startTime24 = convertTo24Hour(
      selectedTime.split(" ")[0],
      startTimeMeridiem
    );
    const endTime24 = convertTo24Hour(endTime.split(" ")[0], endTimeMeridiem);

    // Create Date objects with local time
    const startDate = parseDate(selectedDates);
    const endDate = new Date(startDate); // Create a new date object for end time

    // Adjust for start time
    const [startHours, startMinutes] = startTime24.split(":");
    startDate.setHours(parseInt(startHours, 10));
    startDate.setMinutes(parseInt(startMinutes, 10));

    // Adjust for end time
    const [endHours, endMinutes] = endTime24.split(":");
    endDate.setHours(parseInt(endHours, 10));
    endDate.setMinutes(parseInt(endMinutes, 10));

    // Convert to ISO 8601 format without milliseconds
    const formatISOWithoutMilliseconds = (date) => {
      // Adjust to local time zone and format
      return date.toISOString().split(".")[0] + "Z";
    };

    // Output for debugging
    // // console.log("Start DateTime Object:", startDate);
    // // console.log("End DateTime Object:", endDate);

    const startDateTimeISO = formatISOWithoutMilliseconds(startDate);
    const endDateTimeISO = formatISOWithoutMilliseconds(endDate);

    // // console.log(startDateTimeISO, endDateTimeISO, "hgfd");

    // setSnackbarMessage("Registered  Meeting Successfully");
    // setSnackbarOpen(true);
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
    localStorage.setItem("selectedTime", JSON.stringify(selectedTime));
    localStorage.setItem("meetingData", JSON.stringify(meetingData));
    navigate("/referrals/book-now/payment/", {
      state: {
        selectedDates,
        selectedTime,
        meetingData,
        startDateTimeISO,
        endDateTimeISO,
        rating,
      },
    });
  };

  // // console.log("totalDatePages",totalDatePages)
  // // console.log("datesArray",datesArray)
  // // console.log("datesPerPage",datesPerPage)
  // // console.log("Array.from({ length: totalDatePages })",JSON.stringify(Array.from({ length: totalDatePages })))

  // i am re-creating the date and time slot booking part from here because previous one got too confusing

  const currentTime = new Date();

  const [dates, setDates] = useState([]);

  // i want 12 dates including current day
  useEffect(() => {
    console.log("Generating Dates");
    const dates = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      console.log(date);
      date.setDate(currentTime.getDate() + 1 + i);
      dates.push(date);
    }
    console.log(dates);
    setDates(dates);
  }, []);

  // now when the dates are created then i want to load the time slots which should only be in the range 10:30 AM to 12:30 PM and 4:30 PM to 7:30 PM

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    console.log("Times");
    if (dates.length && selectedDates) {
      const year = new Date().getFullYear();
      const currentYearSelectedDate = `${selectedDates} ${year}`;
      console.log(currentYearSelectedDate);
      console.log("Generating Times");
      const timeSlots = [];
      // the time interval will depend on the duration we get from the meetingData.duration. meetingData.duration is a string in "30 Mins" format. Extract the "30" out of it and use that as the time interval
      const timeInterval = parseInt(meetingData?.duration?.split(" ")[0], 10);
      console.log(timeInterval);
      // i want the times array to be for only the selected date. The selectedDates variable contains the date selected. The selectedDates is a string in format of "Sep 03". Create time slots according to this.
      const selectedDate = new Date(currentYearSelectedDate);
      console.log("selectedDate", selectedDate);
      // i want to create time slots from 10:30 AM to 12:30 PM and 4:30 PM to 7:30 PM
      const morningStartTime = new Date(selectedDate);
      morningStartTime.setHours(10, 30, 0, 0);
      console.log("morningStartTime", morningStartTime);
      const morningEndTime = new Date(selectedDate);
      morningEndTime.setHours(12, 30, 0, 0);
      console.log("morningEndTime", morningEndTime);
      const eveningStartTime = new Date(selectedDate);
      eveningStartTime.setHours(16, 30, 0, 0);
      console.log("eveningStartTime", eveningStartTime);
      const eveningEndTime = new Date(selectedDate);
      eveningEndTime.setHours(19, 30, 0, 0);
      console.log("eveningEndTime", eveningEndTime);
      // now i want to create time slots from morningStartTime to morningEndTime and eveningStartTime to eveningEndTime
      morningStartTime.getTime();
      for (
        let time = morningStartTime.getTime();
        time <= morningEndTime.getTime();
        time = time + timeInterval * 60000
      ) {
        // const hours = time.getHours();
        // const minutes = time.getMinutes();
        // const ampm = hours >= 12 ? "PM" : "AM";
        // const displayHours = hours % 12 || 12;
        // const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // const timeString = `${displayHours}:${displayMinutes} ${ampm}`;
        console.log(time);
        console.log(new Date(time));
        timeSlots.push({ time: time, isEventBusy: false });
      }
      for (
        let time = eveningStartTime.getTime();
        time <= eveningEndTime.getTime();
        time = time + timeInterval * 60000
      ) {
        // const hours = time.getHours();
        // const minutes = time.getMinutes();
        // const ampm = hours >= 12 ? "PM" : "AM";
        // const displayHours = hours % 12 || 12;
        // const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // const timeString = `${displayHours}:${displayMinutes} ${ampm}`;
        timeSlots.push({ time: time, isEventBusy: false });
      }

      console.log("timeSlots", timeSlots);
      setTimeSlots(timeSlots);
    }
  }, [dates, selectedDates]);

  // now once the times are created, I want to create a renderTimeArray which will have the time slots which will actually be rendered. This will be created once the busyEventData is also fetched. here we majorly have two main conditions, if the selected date is of today then the time slots which have already surpass the current time will be marked as isSlotBusy: true and the second most main condition is that if the time in the renderTimeArray is also present in the busyEventData then it will also be marked as busy. Now this checking of whether the time is busy on not will happen for every date changed. The time format in busyEventData is in 2024-08-25T13:00:00Z format.

  const [renderTimeArray, setRenderTimeArray] = useState([]);

  useEffect(() => {
    // if the date is valid after the conditions then it will be marked as isEventBusy: true
    let renderTimeArray = [];
    console.log("Busy Slots");
    if (!!selectedDates) {
      console.log("Generating Busy Slots");
      renderTimeArray = timeSlots
        .map((timeSlot) => {
          if (
            selectedDates === moment(timeSlot.time).format("MMM DD").toString()
          ) {
            if (currentTime.getTime() > timeSlot.time) {
              return { time: new Date(timeSlot.time), isEventBusy: true };
            }
          }
          return timeSlot;
        })
        .map((timeSlot) => {
          if (
            busyEventData.filter(
              (busyEvent) =>
                moment(busyEvent.start).format("YYYY-MM-DDTHH:mm:ss[Z]") ===
                moment(timeSlot.time).format("YYYY-MM-DDTHH:mm:ss[Z]")
            ).length > 0
          ) {
            return { time: new Date(timeSlot.time), isEventBusy: true };
          }
          return { time: new Date(timeSlot.time), isEventBusy: false };
        });
    }
    console.log("renderTimeArray", renderTimeArray);
    console.log("busyEventData", busyEventData);

    setRenderTimeArray(renderTimeArray);
  }, [busyEventData, selectedDates, timeSlots]);

  return (
    <div className="main-book-now">
      <div className="left-booknow-container">
        <div className="top-goback-div">
          <div className="goback-btn">
            <img src="/chevro-left.svg" alt="" />
            <Link to={"/referrals"} className="goback-button-link">
              Go Back
            </Link>
          </div>
          {/* rating button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: "63px",
              height: "32px",
              padding: "4px 14px",
              gap: 3,
              borderRadius: 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>{rating}</h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>

          {/* rating button */}
        </div>

        {/* main content */}

        <div className="main-content-resume-div">
          <h4 className="text-h4">{meetingData?.title}</h4>

          <div className="meeting-duration-book-now">
            <div className="m-left-duration">
              <h5 style={{ fontSize: "12px", color: "#547178" }}>
                Meeting Duration
              </h5>
              <h5
                className="m-left-h4"
                style={{
                  // fontSize: "20px",
                  fontWeight: "600",
                  marginTop: "-5px",
                }}
              >
                {meetingData.duration}
              </h5>
            </div>

            <div className="stick"></div>

            <div className="m-right-duration">
              <h5 style={{ fontSize: "12px", color: "#547178" }}>Amount</h5>
              <h5
                className="m-right-h4"
                style={{
                  // fontSize: "20px",
                  fontWeight: "600",
                  marginTop: "-5px",
                }}
              >
                &#8377;{meetingData.price === 0 ? "Free" : meetingData.price}
              </h5>
            </div>
          </div>

          <div>{/* <h4 className="more-details">More details</h4> */}</div>

          <div className="more-details-content">
            <h4 className="text-h4">More Details</h4>
            {/* <h4 className="text-h4-content">{meetingData.description}</h4> */}
            <span
              className="text-h4-content"
              dangerouslySetInnerHTML={{
                __html: meetingData?.description,
              }}
            ></span>
          </div>

          <div className="feedback-section">
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <h3 className="text-h3">Recent Feedbacks</h3>
            </div>

            {/* <div className="feedback-btn-main-div">
              <div className="feedback-btn">
                <img src="/chevro-left.svg" alt="" />
                <Link className="feedback-button-link">Previous</Link>
              </div>

              <div className="feedback-btn">
                <Link className="feedback-button-link">Next</Link>
                <img src="/chevro-right.svg" alt="" />
              </div>
            </div> */}
          </div>

          <div className="feedback-carousal-div">
            {isMobile ? (
              <FeedBackCarousalForBookNow
                content={
                  "I have successfully received a referral from Microsoft, thank you engineerhub."
                }
                name={"Satyam Singh"}
                // profile={"dd/mm/yy"}
              />
            ) : (
              <>
                <FeedBackCarousalForBookNow
                  content={
                    "I got an idea about how companies approach, what they expect from us, and how to customize my resume."
                  }
                  name={"Mohammed Sulaiman"}
                  // profile={"dd/mm/yy"}
                />
                <FeedBackCarousalForBookNow
                  content={
                    "I have successfully received a referral from Microsoft, thank you engineerhub."
                  }
                  name={"Satyam Singh"}
                  // profile={"dd/mm/yy"}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="right-booknow-container">
        <div>
          <h3 className="what-time-text">What day should we meet?</h3>
        </div>

        <div className="referral-dates-container">
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {DATES_SLIDES.map((index) => (
                  <div
                    className="embla__slide"
                    key={index}
                    style={{
                      gridTemplateColumns: isMobile
                        ? "repeat(3, 1fr)"
                        : "repeat(4, 1fr)",
                    }}
                  >
                    {/* <div className="embla__slide__number">
                      <span></span>
                    </div> */}
                    {dates
                      .slice(index * datesPerPage, (index + 1) * datesPerPage)
                      .map((dateObj, index) => (
                        // <div className={isMobile ? "col-4" : "col-3"} key={index}>
                        <DateBoxes
                          // isDisabled={true}
                          key={index}
                          day={moment(dateObj).format("ddd")}
                          date={moment(dateObj).format("MMM DD")}
                          isSelected={
                            selectedDates === moment(dateObj).format("MMM DD")
                          }
                          onClick={() =>
                            handleDateClick(moment(dateObj).format("MMM DD"))
                          }
                        />
                        // </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="time-meet-btns">
              <button
                className="time-meet-btn label-sm"
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              >
                <IoIosArrowBack />
                Previous
              </button>

              <button
                className="time-meet-btn label-sm"
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              >
                Next
                <IoIosArrowForward />
              </button>
            </div>
          </section>
        </div>

        {/* <div id="dateCarousel" className="carousel slide" ref={carouselRef}>
          <div className="carousel-inner">
            {Array.from({ length: totalDatePages }).map((_, pageIndex) => (
              <div
                className={`carousel-item ${
                  pageIndex === currentPage1 ? "active" : ""
                }`}
                key={pageIndex}
              >
                <div className="row">
                  {datesArray
                    .slice(
                      pageIndex * datesPerPage,
                      (pageIndex + 1) * datesPerPage
                    )
                    .map((dateObj, index) => (
                      <div className={isMobile ? "col-4" : "col-3"} key={index}>
                        <DateBoxes
                          isActive={false}
                          day={dateObj.day}
                          date={dateObj.date}
                          isSelected={selectedDates === dateObj.date}
                          onClick={() => handleDateClick(dateObj.date)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {selectedDates && (
          <>
            <div
              className="time-div"
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="select-time-text">Select time of the day</h3>
            </div>

            <div className="referral-dates-container">
              <section className="embla">
                <div className="embla__viewport" ref={emblaRef2}>
                  <div className="embla__container">
                    {/* {TIME_SLIDES.map((index) => ( */}
                    <div
                      className="embla__slide"
                      // key={index}
                      style={{
                        gridTemplateColumns: isMobile
                          ? "repeat(3, 1fr)"
                          : "repeat(4, 1fr)",
                      }}
                    >
                      {renderTimeArray.map(
                        (timeObj, index) => (
                          <TimeBox
                            isDisabled={timeObj.isEventBusy}
                            key={index}
                            time={moment(timeObj.time).format("hh:mm A")}
                            isSelected={
                              selectedTime ===
                              moment(timeObj.time).format("hh:mm A")
                            }
                            onClick={() =>
                              handleTimeClick(
                                moment(timeObj.time).format("hh:mm A")
                              )
                            }
                          />
                        )
                        // <div className={isMobile ? "col-4" : "col-3"} key={index}>
                        //   <TimeBox
                        //     isDisabled={timeObj.isEventBusy}
                        //     key={index}
                        //     time={timeObj.time}
                        //     isSelected={selectedTime === timeObj.time}
                        //     onClick={() => handleTimeClick(timeObj.time)}
                        //   />
                        // </div>
                      )}
                      {/* {timeArrayCopy
                          .slice(
                            index * timesPerPage,
                            (index + 1) * timesPerPage
                          )
                          .map((timeObj, index) => (
                            
                            <TimeBox
                              isDisabled={timeObj?.isDisabled}
                              key={index}
                              time={timeObj.time}
                              isSelected={selectedTime === timeObj.time}
                              onClick={() => handleTimeClick(timeObj.time)}
                            />
                          ))} */}
                    </div>
                    {/* ))} */}
                  </div>
                </div>
                {/* <div className="time-meet-btns">
                  <button
                    className="time-meet-btn label-sm"
                    onClick={onPrevButtonClick2}
                    disabled={prevBtnDisabled2}
                  >
                    <IoIosArrowBack />
                    Previous
                  </button>

                  <button
                    className="time-meet-btn label-sm"
                    onClick={onNextButtonClick2}
                    disabled={nextBtnDisabled2}
                  >
                    Next
                    <IoIosArrowForward />
                  </button>
                </div> */}
              </section>
            </div>
          </>
        )}

        <div
          style={{ display: "none" }}
          id="timeCarousel"
          className="carousel slide"
          ref={carouselRef}
        >
          <div className="carousel-inner">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                className={`carousel-item ${
                  pageIndex === currentPage ? "active" : ""
                }`}
                key={pageIndex}
              >
                <div className="row">
                  {timeArray
                    .slice(
                      pageIndex * timesPerPage,
                      (pageIndex + 1) * timesPerPage
                    )
                    .map((timeObj, index) => (
                      <div className={isMobile ? "col-4" : "col-3"} key={index}>
                        <TimeBox
                          key={index}
                          time={timeObj.time}
                          isSelected={selectedTime === timeObj.time}
                          onClick={() => handleTimeClick(timeObj.time)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-content">
          <div className="calendar-content-data">
            <img style={{ marginRight: "10px" }} src="/Calender2.svg" alt="" />

            <div>
              <h4 className="data-text-h4">
                {selectedDates ? selectedDates : "Select Date"}
              </h4>
              <h5 className="data-text-h5">
                {selectedTime
                  ? selectedTime
                  : selectedDates
                  ? "Select Time"
                  : "& Time"}
              </h5>
            </div>
          </div>

          <div className="confirm-btn">
            <button
              onClick={onSubmitConfirmDetails}
              className="confirm-btn-link"
            >
              Confirm Slots
            </button>

            {/* <button data-bs-toggle="modal" data-bs-target="#stepindicatormodal">
              Modal
            </button> */}
          </div>
        </div>
        {/* <StepIndicator currentStep={2} /> */}
      </div>
    </div>
  );
};

export default BookNow;
