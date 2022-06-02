import React from 'react'
import '../NavBar/NavBar.css'
import img from '../NavBar/logo.png'

export default function NavBar() {
  return (
    <nav className="navd navbar-expand-lg  navbar-light">
      <div className="container-fluid">
      <div className="logo">
      <img src={img} alt="" />
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">About</a>
          </li>
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Services</a>
          </li>
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Campus Ambassader</a>
          </li>
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Material</a>
          </li>
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Internships</a>
          </li>
          
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Hiring</a>
          </li>
          <li className="hov gap nav-item">
            <a className="hov" aria-current="page" href="#">Mentors</a>
          </li>
          <li className="hov gap nav-item">
            <a className=" hov" aria-current="page" href="#">Industrial Personalities</a>
          </li>
         
          
        </ul>
      </div>
      </div>
  </nav>
  )
}