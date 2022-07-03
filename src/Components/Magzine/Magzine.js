import React from 'react'
import '../Magzine/Magzine.css'
import ShareIcon from '@mui/icons-material/Share';
import backImage from '../Magzine/backimg.png'
// import { borderRadius } from '@mui/system';

function Magzine() {
  return (
<>
<div className="content">
    <div className="container">
        <h1 className='text1'>
        Magzines & Hand-Book
        </h1>
        <h5 className='text2 text111 '>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
             Quos, natus. Nihil molestias culpa quibusdam quaerat ea
              neque velit fugit officia amet eligendi! Quis quos animi
               officia explicabo accusamus obcaecati totam.
        </h5>

     <div className="row containmentz">
     
         <div className="col-lg-2 ">
         <div className="card" style={{ width: '18rem', borderRadius: 25}}>
         <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-img-top"></div>
  <div className="card-body">
    <h5 className="card-title">App
Development <ShareIcon style={{marginLeft: 5}}/></h5>
    
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div>
<button className='buttonz'>Open</button>
         </div>
         <div className="col-lg-1"></div>
         <div className="col-lg-2">
         <div className="card" style={{ width: '18rem', borderRadius: 25}}>
  <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"> UI / UX - 
Designing <ShareIcon style={{marginLeft: 5}}/></h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div>
<button className='buttonz'>Open</button>
             </div>
             <div className="col-lg-1"></div>
             <div className="col-lg-2">
             <div className="card"style={{ width: '18rem', borderRadius: 25}} >
             <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Web
Development <ShareIcon style={{marginLeft: 10}}/></h5>
    <p className="card-text ">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>

  </div>
</div>
<button className='buttonz'>Open</button>
             </div>
             <div className="col-lg-1"></div>
             <div className="col-lg-2">
             <div className="card " style={{ width: '18rem', borderRadius: 25}}>
             <img src={backImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Cyber -
Security <ShareIcon style={{marginLeft: 30}}/></h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Pharetra consequat consequat at fermentum sollicitudin pellentesque tortor..</p>
  
  </div>
</div><button className='buttonz'>Open</button>
             </div>
             
         </div>   
    </div>
</div>
</>
  )
}

export default Magzine