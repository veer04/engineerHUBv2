import React from "react";
import "../HomePage/HomePage.css";
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/iitk.svg" alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/iitr.jpg" alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    IIT <br />
    KANPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/iitk.svg"alt="swiggy" className="tcsimage imgpos" />
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/iitr.jpg" alt="swiggy" className="tcsimage imgpos" />
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/nita.png" alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    PATNA
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/nitk.jpeg" alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    NIT <br />
    RAIPUR
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/nita.png" alt="swiggy" className="tcsimage imgpos" />
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/nitk.jpeg" alt="swiggy" className="tcsimage imgpos" />
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/akg.png"alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKGEC <br />
    GHAZIABAD
  </h2>
</div>

<div className="box red">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/aktu.jpeg" alt="swiggy" className="tcsimage imgpos" />
  </div>
  <h2 className="clgname">
    AKTU <br />
    
  </h2>
</div>

<div className="box box-down blue">
  <div className="comp studentfrom2">
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/vit.png" alt="swiggy" className="tcsimage imgpos" />
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
    <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/collegeLogo/mit.jpg" alt="swiggy" className="tcsimage imgpos" />
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



