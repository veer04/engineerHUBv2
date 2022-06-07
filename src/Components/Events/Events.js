import React from 'react'
import '../Events/Events.css'
import ShareIcon from '@mui/icons-material/Share';
import backImage from '../Magzine/backimg.png'
import { borderRadius } from '@mui/system';


function Events() {
  return (
    <>
  <div className="content contentEvent">
      
    <div className="container">
<h1 className='text1'>
  Events
</h1>
<h5 className='text2 text111 '>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
             Quos, natus. Nihil molestias culpa quibusdam quaerat ea
              neque velit fugit officia amet eligendi! Quis quos animi
               officia explicabo accusamus obcaecati totam.
        </h5>
        <div className="row">
          <div className="col-lg-4">
          <div className="card cardEvent" style={{ width: '20rem', borderRadius: 25}}>
         <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-img-top"></div>
  <div className="card-body">
    <h5 className="card-title">Coding Contest 
    

    </h5>
    <button className='Free'>Free</button>
    <button className='Prize'>Prize</button>
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div>
<button className='buttonz Register' >Register</button>


          </div>
          <div className="col-lg-4">

          <div className="card cardEvent" style={{ width: '20rem', borderRadius: 25}}>
         <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-img-top"></div>
  <div className="card-body">
    <h5 className="card-title">Coding Contest </h5>
<button className='Free'>Free</button>
    <button className='Prize'>Prize</button>
    
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div>
<button className='buttonz Register'>Register</button>



          </div>
          <div className="col-lg-4">

          <div className="card cardEvent" style={{ width: '20rem', borderRadius: 25}}>
         <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-img-top"></div>
  <div className="card-body">
    <h5 className="card-title">Coding Contest</h5>
<button className='Free'>Free</button>
    <button className='Prize'>Prize</button>
    
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div>
<button className='buttonz Register'>Register</button>


          </div>

        </div>
    </div>
 </div>
    </>
  )
}

export default Events