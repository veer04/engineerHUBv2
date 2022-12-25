import React from "react";
// import styles from "./InfiniteSlider.module.scss";

import "../HomePage/HomePage.css";
import iitr from "./svg/iitr.jpg";
import nitk from "./svg/nitk.jpeg";
import aktu from "./svg/aktu.jpeg";
import vit from "./svg/vit.png";
import akg from "./svg/akg.png";
import mit from "./svg/mit.jpg";
import nita from "./svg/nita.png";
import IITK from "../HomePage/svg/IITK.png";
import Carousel from "react-bootstrap/Carousel";
// 
const InfiniteSlider = () => {
  return (
    <div className="">
      <div className="">
      <Carousel>  
      <Carousel.Item>
        <div className="">

          {/* 1 */}
     
<div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={iitr} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    KANPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    ROORKEE
  </h2>
</div>
</div>
<div className="row2-container">
<div className="box orange">
  <div className="comp studentfrom2">
    <img src={iitr} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    BOMBAY
  </h2>
</div>
</div>
        </div>
        <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="">
          {/* 2 */}

        <div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={nita} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={nitk} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    RAIPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={nita} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    ALLAHABAD
  </h2>
</div>
</div>
<div className="row2-container">
<div className="box orange">
  <div className="comp studentfrom2">
    <img src={nitk} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    KURUKSHETRA
  </h2>
</div>
</div>
        </div>
        <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>       
        <div className="">

      {/* 3 */}

        <div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={akg} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKGEC <br />
    GHAZIABAD
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={aktu} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKTU <br />
    
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={vit} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    VIT <br />
    VELLORE
  </h2>
</div>
</div>
<div className="row2-container">
<div className="box orange">
  <div className="comp studentfrom2">
    <img src={mit} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    MIT <br />
    BANGALORE
  </h2>
</div>
</div>
</div>
<Carousel.Caption></Carousel.Caption>
</Carousel.Item>       
</Carousel>   
      </div>
    </div>
  );
};

export default InfiniteSlider;



