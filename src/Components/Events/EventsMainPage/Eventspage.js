// import pastEvents from "./pastEvents";
import './Eventspage.css';
import { useState } from "react";
import mentor from "../../Udaan/udaan.jpg";
const Eventspage=()=>{
    const[active , setActive]=useState("FirstComponent");
return(
<>
<div className="EventsPageContainer">
    <div className="headingEventspage heading headtextmentor">
        Events
    </div>
    <div className="eventHeadingDesc texthire">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Voluptate, eum itaque laboriosam veniam dignissimos cum at sed aliquam, 
        iure accusantium autem nulla temporibus quia molestiae nisi reiciendis
         consectetur eligendi minima.
    </div>
    <div className="EventsMenuBar">
        <span className='eventMenu'onClick={()=>setActive("FirstComponent")}>Past Events</span>
        <span className='eventMenu'>Ongoing Event</span>
        <span className='eventMenu'>Featured Events</span>
        <span className='eventMenu'>Upcoming Events</span>
    </div>
    <div className="EventsCardArena row">
        <div className="col-lg-3 pastCard">
            <div className="eventimgHead">
                <img src={mentor} className="imageUdaan" alt="" />
            </div>
            <div className="eventContent">
                <ul>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                </ul>
            </div>
            <div className="applyBtnEvents">
                <button className='EventRegisterBtn'>Register here</button>
            </div>
        </div>
        <div className="col-lg-3 pastCard">
        <div className="eventimgHead">
                <img src={mentor} className="imageUdaan" alt="" />
            </div>
            <div className="eventContent">
                <ul>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                </ul>
            </div>
            <div className="applyBtnEvents">
                <button className='EventRegisterBtn'>Register here</button>
            </div>
        </div>
        <div className="col-lg-3 pastCard">
        <div className="eventimgHead">
                <img src={mentor} className="imageUdaan" alt="" />
            </div>
            <div className="eventContent">
                <ul>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                    <li className='BulletsList'>Lorem ipsum dolor sit amet </li>
                </ul>
            </div>
            <div className="applyBtnEvents">
                <button className='EventRegisterBtn'>Register here</button>
            </div>
        </div>
    </div>
</div>
</>
);
}
export default Eventspage;