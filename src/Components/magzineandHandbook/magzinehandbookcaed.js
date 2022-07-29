import React from "react";
import "../magzineandHandbook/magzineandhandbook.css";
import cybersecurityimg from "../magzineandHandbook/cybersecurityimg.png";
export default function MagzineAndHandbookcard() {
  return (
    <>
      <div className="card">
        <img
          src={cybersecurityimg}
          className="card-img-left card-img img-fluid"
          alt="magzine-card-image"
        />
        <div className="card-body">
          <h5 className="card-title">
            Cyber Security
            <a href="www.engineerhub.in">
              <i className="fa fa-share-alt share-icon"></i>
            </a>
          </h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Dignissim diam quis enim lobortis scelerisque fermentum dui.
            Interdum consectetur libero id faucibus nisl tincidunt eget nullam
            non. Sagittis id consectetur purus ut faucibus pulvinar. Sed
            ullamcorper morbi tincidunt ornare massa eget egestas. Ut morbi
            tincidunt augue interdum. Massa tincidunt dui ut ornare lectus sit
            amet. Mattis nunc sed blandit libero volutpat sed cras ornare. Nec
            nam aliquam sem et tortor consequat id. Integer malesuada nunc vel
            risus. Quis auctor elit sed vulputate. Volutpat consequat mauris
            nunc congue
          </p>
          <div className="btn-container">
            <a href="www.engineerhub.in" className="btn btn-primary">
              Tap to open
            </a>
            <a href="www.engineerhub.in" className="btn btn-warning">
              <i class="fa fa-eye"></i> 1,000
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
