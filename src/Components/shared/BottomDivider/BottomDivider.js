import React from "react";
import styles from "./BottomDivider.module.css";
import gplay from "./gplay.svg";
const BottomDivider = () => {
  return (
    <div className={`${styles.dividerContainer} desk-tab--view `}>
      <div className={styles.dividerHead}>
        We are now on <span className={styles.highlight}>PlayStore</span>
      </div>
      <div className={styles.dividerDesc}>
        Try our new App anytime and anywhere you like
      </div>
      <div className={styles.dividerButton}>
        Get the app <img src={gplay} alt="googlePlay" />
      </div>
    </div>
  );
};

export default BottomDivider;
