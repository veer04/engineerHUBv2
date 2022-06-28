import React from 'react';
import pp from './pp.jpg';
import './Card.css';
import gmail from './gmail.png';
import link from './link.png';
import whatsapp from './whatsapp.png';

function Card() {
  return (
  <div className="container py-5">
    <div class="row">
    <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
          <img src={pp} alt="avatar" className="rounded-circle img-fluid pp"/>
          <h5 className='p-3'>Founder</h5>
            <h3 class="my-1">Name Surname</h3>
            <p class="mb-1 fs-5">Contact No : 99999 99999</p>
            <div style={{position:"relative"}}>
              <img src={whatsapp} alt="icon"  className="ico"/>
              <img src={gmail} alt="icon" className="ico1"/>
              <img src={link} alt="icon" className="ico2"/>
            </div>
            <p className='txtc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie eget mattis gravida aliquam eget facilisis nibh.</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btnc btn-primary fs-4">Connect</button>
            </div>
        </div>
        </div>
        </div>
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
          <img src={pp} alt="avatar" className="rounded-circle img-fluid pp"/>
          <h5 className='p-3'>Co-Founder</h5>
            <h3 class="my-1">Name Surname</h3>
            <p class="mb-1 fs-5">Contact No : 99999 99999</p>
            <div style={{position:"relative"}}>
              <img src={whatsapp} alt="icon"  className="ico"/>
              <img src={gmail} alt="icon" className="ico1"/>
              <img src={link} alt="icon" className="ico2"/>
            </div>
            <p className='txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie eget mattis gravida aliquam eget facilisis nibh.</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btnc btn-primary fs-4">Connect</button>
            </div>
        </div>
        </div>
        </div>
        <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
          <img src={pp} alt="avatar" className="rounded-circle img-fluid pp"/>
          <h5 className='p-3'>Core Member</h5>
            <h3 class="my-1">Name Surname</h3>
            <p class="mb-1 fs-5">Contact No : 99999 99999</p>
            <div style={{position:"relative"}}>
              <img src={whatsapp} alt="icon"  className="ico"/>
              <img src={gmail} alt="icon" className="ico1"/>
              <img src={link} alt="icon" className="ico2"/>
            </div>
            <p className='txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie eget mattis gravida aliquam eget facilisis nibh.</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btnc btn-primary fs-4">Connect</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        
        </div>
  )
}

export default Card;