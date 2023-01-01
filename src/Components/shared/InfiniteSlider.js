import React from "react";
import styles from "./InfiniteSlider.module.scss";
const InfiniteSlider = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slide_track}>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/deciml.png" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/oracle.svg" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/tka.png" height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/nkosh.png" height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/deciml.png" height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/CompaniesLogo/create.png" height="100" width="150" alt="" />
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
