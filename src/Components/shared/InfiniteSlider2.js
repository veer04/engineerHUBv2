import React from "react";

import styles from "./InfiniteSlider.module.scss";
import "../HomePage/HomePage.css";
import Carousel from "react-bootstrap/Carousel";
import { Bucket_URL } from "../../services/APIUtils";

const InfiniteSlider = () => {
  return (
    <div className={styles.sliderStudent}>
      <div className={styles.slide_trackStudent}>
      <Carousel>  
      <Carousel.Item>
      <div className={styles.slideStudent}>

          {/* 1 */}
     
<div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/iitp.jpeg`} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/iitk.svg`} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    KANPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/iitr.jpg`} alt="swiggy" className="tcsimage imgpos" />
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
    <img src={`${Bucket_URL}collegeLogo/iitb.jpg`} alt="swiggy" className="tcsimage imgpos" />
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
        <div className={styles.slideStudent}>
          {/* 2 */}

        <div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/nitp.png`} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/nitr.jpeg`} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    RAIPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/nita.png`} alt="swiggy" className="tcsimage imgpos" />
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
    <img src={`${Bucket_URL}collegeLogo/nitk.jpeg`} alt="swiggy" className="tcsimage imgpos" />
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
        <div className={styles.slideStudent}>

      {/* 3 */}

        <div className="row1-container">
<div className="box box-down cyan">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/akg.png`}alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKGEC <br />
    GHAZIABAD
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/aktu.jpeg`} alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKTU <br />
    
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src={`${Bucket_URL}collegeLogo/vit.png`} alt="swiggy" className="tcsimage imgpos" />
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
    <img src={`${Bucket_URL}collegeLogo/mit.jpg`} alt="swiggy" className="tcsimage imgpos" />
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



