
import styles from "./InfiniteSlider.module.scss";
import iitr from "./svg/iitr.jpg";
import akg from "./svg/akg.png";
import iitk from "./svg/iitk.svg";
import nitk from "./svg/nitk.jpeg";
function InfiniteSlider3() {
  return (
<>
<div className={styles.slider3}>
      <div className={styles.slide_track}>
        <div className={styles.slide}>
          <img src={iitr} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={iitk} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={akg} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={akg} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={iitk} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img
            src={nitk}
            height="100"
            width="150"
            alt=""
          />
        </div>
       
      </div>
    </div>

</>
  )
}

export default InfiniteSlider3