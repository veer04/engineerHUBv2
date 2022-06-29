import React from 'react';
import ReactPlayer from 'react-player';
import'../HomePage/HomePage.css';
import '../Aboutus/Aboutus';
import Aboutus from '../Aboutus/Aboutus';
import '../Whatwedo/Whatwedo';
import Whatwedo from '../Whatwedo/Whatwedo';
import '../Magzine/Magzine';
import Magzine from '../Magzine/Magzine';
import '../Events/Events'
import Events from '../Events/Events';
import '../Courses/Courses'
import Courses from '../Courses/Courses';
import '../Members/Members';
import Members from '../Members/Members';
import '../Footer/Footer';
import Footer from '../Footer/Footer';



export default function NavBar() {
  return (
    <>
    <div>
    <div className='home'>
      <div className='left'>
          <h2>The Place Where We Connect</h2>
          <h1>Engineers</h1>
          <button className='signup'>SIGN IN</button>
      </div>
      <div className='right'>
      <ReactPlayer className='video' url='https://www.youtube.com/watch?v=Xi8Fabcb_MA' />
      </div>
      </div>
      <div className='line'>
      <h2>" A VERSATILE COMMUNITY FOR VERSATILE PEOPLE "</h2>
      <button className='arrow'>v</button>

      </div>
    </div>
    <div className="about">
      <Aboutus/>

    </div>
    <div className="WhatWeDo">
      <Whatwedo/>

    </div>
    
  <div className="magzine">
    <Magzine/>
  </div>
  <div className="Events">
    <Events/>
  </div>
  <div className="Courses">
    <Courses/>
  </div>
  <div className="Members">
    <Members/>
  </div>
  <div className="Footer">
    <Footer/>
  </div>
    </>
  )
}
