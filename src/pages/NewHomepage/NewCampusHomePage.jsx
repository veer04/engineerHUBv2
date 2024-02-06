import React,{useState,useEffect} from 'react'
import "./NewCommunitySectionHomePage.css";
import { useParams, useNavigate, useSearchParams  } from "react-router-dom";
import { getEvents,controller } from '../../services/APIConfig';
import { ehubLogo,defaultEventPoster } from '../../assets/defaultPoster';
import NewEventCard from '../../components/NewEventCard/NewEventCard';
import HomeEventsCard from './HomeEventsCard';
import HomeAlmaCards from './HomeAlmaCards';
import HomeClubCards from './HomeClubCards';

const NewCampusHomePage = () => {
    
    const { id, eventId } = useParams();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchedEvents, setSearchedEvents] = useState([]);
    const [eventsData, setEventsData] = useState({});
    const [buttonColors, setButtonColors] = useState(['light', 'light', 'light']);
    const [activeCard, setActiveCard] = useState(1);
    const handleButtonClick = (cardNumber, index) => {
      setActiveCard(cardNumber);
  
      // Update button colors based on the clicked button
      const newColors = buttonColors.map((color, i) => (i === index ? 'dark' : 'light'));
      setButtonColors(newColors);
    };
  const navigate =useNavigate();
    const handleHover = (index) => {
      // Update button colors on hover
      const newColors = buttonColors.map((color, i) => (i === index ? 'dark' : 'light'));
      setButtonColors(newColors);
    };
  
    const handleMouseLeave = () => {
      // Reset button colors on mouse leave
      setButtonColors(['light', 'light', 'light']);
    };
  
    const buttonNames = ['Events', 'Almas', 'Clubs'];
  
  
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
    <>
   <div className="mainContainer">
    <div className="container">
        <div className="boxCommunity row"
         style={{background:"#f1fbea"}}>
            <div className="col-md-6">
                <div className="container">
                    <div className="textContainer">
                        <p className='textContent'>
                        Now Companies are just 

                        </p>
                        <p className='textContent'>
                           few clicks away
                        </p>
                        {/* <p style={{fontSize:"2rem",fontWeight:"700",lineHeight:"1.6rem",color:"#002b36",marginBottom:"5%"}}>
                            domains
                        </p> */}
                        <p className='textDesc'>
                        Finding it difficult to connect to companies?  </p>
                            <p  className='textDesc'>
                           
                             Here is the easy 3-step solution curated for you</p> 
                        <div className='wrapButton'>
                        <div onClick={()=>navigate("/campus")} style={{
                            width:"220px",
                            borderRadius:"50px",
                            border:"1px solid #002b36 ",
                            display:"flex",
                            justifyContent:"center",
                            textAlign:"center",
                            alignItems:"center",
                            color:"#002b36 ",
                            marginTop:"5%",
                            cursor:"pointer",
                        }}>
                            <p style={{
                                marginTop:"10px"


                            }}>
                                Explore campus
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6" style={{display:"flex",alignItems:"center"}}>
                            
        <div className="container" style={{}}>
         <div className="row" style={{alignItems:"center",justifyContent:"center" ,  
         display:"flex",
          gap:"10px",}}>
         {buttonColors.map((color, index) => (
        <span
          key={index}
          onClick={() => handleButtonClick(index + 1, index)}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleMouseLeave}
          className='buttonSwitch'
        style={{
          background: color === 'dark' ? '#002b36' : '#86989e',
         
        }}
        >
          {buttonNames[index]}
        </span>
      ))}
      </div>
                        {/* <span style={{marginLeft:"25%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Events</span>
                        <span style={{marginLeft:"10%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Almas</span>
                        <span style={{marginLeft:"10%",fontSize:"1.2rem",color:"#fff", background:"#002b36"}}>Clubs</span> */}
 <div className="alignMid " style={{display:"flex",justifyContent:"center" ,maxWdith:"14.75rem"}} >
                        
      {activeCard === 1 && <div className='eventCardHomeCampus'><HomeEventsCard  /></div>}
      {activeCard === 2 && <div className='almaCardHomePage'> <HomeAlmaCards className="event-card-homePage"/></div>}
      {activeCard === 3 && <HomeClubCards className="event-card-homePage" />}

                    </div>
                </div>
            </div>

        </div>
    </div>
   </div>
    </>
  )
}

export default NewCampusHomePage;