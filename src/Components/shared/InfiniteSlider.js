import React from "react";
import styles from "./InfiniteSlider.module.scss";
const InfiniteSlider = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slide_track}>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/tcs.svg" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/oracle.svg" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/vedantu.svg" height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/infosys.svg" height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/tcs.svg" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/Zomato.png" height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/BYJU.png" height="100" width="360" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/Eduncle.png" height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/IOTR.png" height="100" width="160" alt="" />
        </div>
      </div>
      
    </div>
  );
};

export default InfiniteSlider;
