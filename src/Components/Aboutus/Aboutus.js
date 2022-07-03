import React from 'react';
import '../Aboutus/Aboutus.css';
import ImageGroup from '../Aboutus/Group.svg';
function Aboutus() {
  return (
    <>

    <div className=" container mw-100  allcontent">
<div className="row">

    <div className="col-lg-3 aboutus">
        <h1 className='aboutus'>About Us</h1>
    </div>
</div>
<div className="row">
    <div className="col-lg-4 aboutustxt">
    engineerHUB (formerly engineerSUMMIT) is INDIA's largest community of engineers where students(alumni) from IITs, NITs, IIITs and state colleges join together to develop  and nurture students skills coming from all over India. Provide basic guidelines to new comers into engineering field for how and where to start their learning.
    </div>
</div>

<div className="row">
    <div className="col-lg-4 group">
<img src={ImageGroup} alt=""  className='Groupimg'/>
    </div>
    <div className="col-lg-3"></div>
    <div className="col-lg-5">
        <div className="row aboutusbullets1">
        
        <div className="">
            <ul>
               <li> Providing them valuable content
        and personal assistance.</li></ul></div>
        
        </div>
        <div className="row aboutusbullets2">
         
            <div className="">
           <ul> <li> Conducting regular webinars by our
            industry personalities/mentors who
            map out the basic blueprint from their
            learning to placement experience.
            </li> </ul> </div>
        
        </div>
        <div className="row aboutusbullets3">
        
            <div className="">
           <ul> <li> Special attention is given to the students
         to enhance their programming skills , 
        help them in project management and
         provide them internship oppourtunities.
         </li> </ul> </div>
      
        </div>
    </div>
</div>
    </div>
    
    
    </>
  )
}

export default Aboutus