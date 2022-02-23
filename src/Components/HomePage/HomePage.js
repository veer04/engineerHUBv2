import React from 'react'
import ReactPlayer from 'react-player'
import'../HomePage/HomePage.css'


export default function NavBar() {
  return (
    <div>
    <div className='home'>
      <div className='left'>
          <h2>The Place Where We Connect</h2>
          <h1>Engineers</h1>
          <button className='signup'>SIGN UP</button>
      </div>
      <div className='right'>
      <ReactPlayer className='video' url='https://www.youtube.com/watch?v=Xi8Fabcb_MA' />
      </div>
      </div>
      <div className='line'>
      <h2>"A VERSATILE COMMUNITY FOR VERSATILE PEOPLE"</h2>
      <button className='arrow'>v</button>
      </div>
    </div>
  )
}
