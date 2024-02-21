import {useState,useEffect} from 'react'
import "./NewCommunitySectionHomePage.css";
import { ehubLogo,defaultEventPoster } from '../../assets/defaultPoster';
import { useParams, useNavigate, useSearchParams  } from "react-router-dom";
import { getEvents,controller } from '../../services/APIConfig';
import NewEventCard from '../../components/NewEventCard/NewEventCard';
const HomeEventsCard = () => {
    const { id, eventId } = useParams();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchedEvents, setSearchedEvents] = useState([]);
    const [eventsData, setEventsData] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        getEvents(setEventsData, id);
    
        return () => {
          controller.abort();
          setEventsData({});
        };
      }, [id]);
        useEffect(() => {
            if (searchedEvents.length > 0) {
              setFilteredEvents(searchedEvents);
            } else {
              setFilteredEvents([]);
            }
          }, [searchedEvents]);
          useEffect(()=>{
            console.log(eventsData)
          },[eventsData])
          const data=[{
            "_id": "658d2fc47db76e8f91ee34c0",
    "creatorId": {
    "_id": "64ae7a54586afe9e0caa7531",
    "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae7a54586afe9e0caa75311702452095008.jpg",
    "firstName": "Kunwar Vidya",
    "lastName": "Niwas"
    },
    "eventModeType": "Workshop",
    "eventPoster": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/community/events/level_up_with_mern1703751618762.jpg",
    "eventName": "Level Up with MERN",
    "domainName": "Web Development",
    "campusId": [
    {
    "_id": "64df1cedcbacbe6b7e5e6568",
    "collegeName": "MMMUT",
    "collegeLogo": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/college/collegeLogo3/CAMLOGO254.jpeg"
    }
    ],
    "eventType": "Technical",
    "tags": [],
    "mode": false,
    "description": "Calling all software developers! Elevate your skills with the MERN stack at engineerHUB. Join us on December 1st at 1:00 PM for an invaluable session that will take your proficiency to the next level. Learn, network, and grow with experienced professionals and fellow students. Don't miss out on this opportunity to boost your career!",
    "applyLink": "https://meet.google.com/sfm-pdtt-xga",
    "status": "Upcoming",
    "eventStartTime": "2023-12-30T07:30:00.000Z",
    "eventEndTime": "2023-12-30T07:30:00.000Z",
    "policy": "Our policy at engineerHUB emphasizes respectful behavior, active participation, inclusivity, diversity, and professionalism. Clear instructions will be provided regarding expectations, engagement opportunities, and feedback channels for all attendees.",
    "isFeatured": false,
    "creatorModel": "User"
            },]
  return (
    <div
    //   onClick={() => {
    //     if (community)
    //       navigate(`/community/events/${encodeURIComponent(id)}/${data._id}`);
    //     else navigate(`/trending/events/${data._id}`);
    //   }}
      key={data._id}
      className="event-card-new card"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="poster"
      >
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultEventPoster;
          }}
          src={data?.eventPoster}
          alt={`${data?.eventName} poster`}
        />
        <div className="tags-container">
          <span
            style={{
              backgroundColor: "#F7D77F",
              fontSize: ".75rem",
              wordBreak: "break-all",
            }}
            className="text-crop-1"
          >
            {data?.eventType}
          </span>
          {/* <span
            style={{
              backgroundColor: "#F7D77F",
              fontSize: ".75rem",
              wordBreak: "break-all",
            }}
            className="text-crop-1"
          >{`${eventDateWithSuffix} @${eventTime}`}</span> */}
        </div>
      </div>
      <span className="text-crop-2 heading">{data?.eventName}</span>
      <span className="text-crop-2 description">{data?.description}</span>
      <div className="details">
        <div className="logo">
          <img
            src={`${
              data?.campusId
                ? data?.campusId?.length
                  ? data?.campusId[0]?.collegeLogo
                  : ehubLogo
                : ehubLogo
            }`}
            alt="logo"
          />
        </div>
        <div className="name">
          <span className="title">Organized By</span>
          <span className="label text-crop-2">{`${
            data?.campusId
              ? data?.campusId?.length
                ? data?.campusId[0]?.collegeName
                : "engineerHUB"
              : "engineerHUB"
          }`}</span>
        </div>
      </div>
    </div>
  )
}

export default HomeEventsCard