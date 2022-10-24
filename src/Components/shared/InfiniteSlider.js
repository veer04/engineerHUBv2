import React from "react";
import styles from "./InfiniteSlider.module.scss";
import tcs from "./svg/tcs.svg";
import oracle from "./svg/oracle.svg";
import BYJU from "./svg/BYJU.png";
import Eduncle from "./svg/Eduncle.png";
import IOTR from './svg/IOTR.png';
import vedantu from "./svg/vedantu.svg";
import infosys from "./svg/infosys.svg";

import zomato from "./svg/Zomato.png";
const InfiniteSlider = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slide_track}>
        <div className={styles.slide}>
          <img src={tcs} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={oracle} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={vedantu} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={infosys} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={tcs} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={zomato} height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={BYJU} height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={Eduncle} height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={IOTR} height="100" width="150" alt="" />
        </div>
      </div>
      
    </div>
  );
};

export default InfiniteSlider;
