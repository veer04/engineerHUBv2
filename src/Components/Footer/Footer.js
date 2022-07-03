import React from 'react'
import '../Footer/Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';


import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TelegramIcon from '@mui/icons-material/Telegram';
function Footer() {
  return (
    <>
   <div className="container mw-100">
       <div className="Footer">
           <div className="row footerRow">
             <div className="col-lg-4">
    <h3 className='textfooter'>About Us</h3>
    <div className="row">
      
        <p className='footertextaboutus'>engineerHUB (formerly engineerSUMMIT) is INDIA's largest community of engineers where students(alumni)
from IITs, NITs, IIITs and state colleges join together to develop  and nurture students skills coming from all over
India. Provide basic guidelines to new comers into engineering field for how and where to start their learning. </p>

    </div>
             </div>
             <div className="col-lg-2">
             <h3 className='textfooter'>Quick Links</h3>
<div className="row footerinnertext">
  <p>
    Magzines
  </p>
</div>
<div className="row footerinnertext ">
  <p>
    Courses
  </p>
</div>
             <div className="row footerinnertext">
               <p>
                 Events
               </p>
             </div>
             </div>
             <div className="col-lg-2">
              
             <h3 className='textfooter quickfooter'>Address</h3>
             <div className="row footerinnertext">
                 <p>
                   Delhi(NCR)
                 </p>
               </div>
               </div>
               <div className="col-lg-2">
               <h3 className='textfooter legalfooter'>Legal</h3>
<div className="row footerinnertext">
  <p>
    xxxxxxxxxx
  </p>
</div>
<div className="row footerinnertext">
  <p>
    xxxxxxxxxx
  </p>
</div>
<div className="row footerinnertext">
  <p>
    xxxxxxxxxx
  </p>
</div>
               </div>
               <div className="col-lg-2">
               <h3 className='textfooter'>Contact Us</h3>

<div className="row">
<p className='footerinnertext'>myengineerhub@gmail.com</p>
</div>
<div className="row">
  <div className="col-lg-2 footericon"> <InstagramIcon/></div>
  <div className="col-lg-2 footericon">  <LinkedInIcon/> </div>
  <div className="col-lg-2 footericon"> <TwitterIcon/> </div>
  <div className="col-lg-2 footericon"> <SportsEsportsIcon/></div>
  <div className="col-lg-2 footericon"> <TelegramIcon/></div>

</div>
<div className="row">
  <div className="col-lg-6">
  <button className='footerBB'>Log In</button>
  </div>
  <div className="col-lg-6">
  <button className='footerBB'>Register</button>
</div>
</div>

               </div>
           </div>
           <div className="row copyright"> myengineerhub@gmail.com</div>
           <div className="row  copyright1">All copyright@ reserved</div>
       </div>
   </div>
    </>
  )
}

export default Footer