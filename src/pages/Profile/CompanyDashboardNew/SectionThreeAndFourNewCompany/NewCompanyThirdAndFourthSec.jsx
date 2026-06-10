// import React from "react";



// import "./newcompanythirdandfourth.css";
// import { useNavigate } from "react-router-dom";

// const NewCompanyThirdAndFourthSec = ({
//   title,
//   desc,
//   bgColor,
//   btn,
//   btnLink,
//   rightImage,
//   adminView,
// }) => {
//   const navigate = useNavigate();
//   const handleButtonClick = () => {
//     navigate(`${btnLink}`);
//   };
  
//   if (!adminView) {
//     return null;
//   }
  
//   return (
//     <div className="main-div-campus-screening" style={{ background: bgColor }}>
//       <div className="inner-sub-div">
//         <div className="inner-div-content">
//           <h4>{title}</h4>
//           <p>{desc}</p>

//           <button onClick={() => handleButtonClick()}>{btn}</button>
//         </div>
//         <div className="inner-div-image">
//           <img src={rightImage} alt="right_image" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewCompanyThirdAndFourthSec;
import React from "react";
import "./newcompanythirdandfourth.css";

import { useNavigate } from "react-router-dom";

const EmployerHiringSection = ({
  title,
  features,
  btnText,
  btnLink,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <section className="employer-section">
      <div className="employer-content">

        <div className="employer-left">

          <div className="employer-badge">
            For Employers
          </div>

          <h2>{title}</h2>

          <div className="feature-list">
            {features.map((item, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <h3>500K+</h3>
              <p>Engineers</p>
            </div>

            <div className="stat-card">
              <h3>1000+</h3>
              <p>Colleges</p>
            </div>

            <div className="stat-card">
              <h3>70%</h3>
              <p>Faster Hiring</p>
            </div>
          </div>

          <button
            className="employer-btn"
            onClick={() => navigate(btnLink)}
          >
            {btnText}
          </button>
        </div>

        <div className="employer-right">
          <img src={image} alt="Hiring Workflow" />
        </div>

      </div>
    </section>
  );
};

export default EmployerHiringSection;