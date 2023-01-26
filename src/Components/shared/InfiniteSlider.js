import styles from "./InfiniteSlider.module.scss";
import { Bucket_URL } from "../../services/APIUtils";
const InfiniteSlider = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slide_track}>
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/deciml.png`} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/oracle.svg`} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/tka.png`} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/nkosh.png`} height="100" width="150" alt="" />
        </div>

        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/deciml.png`} height="100" width="250" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/create.png`} height="100" width="150" alt="" />
        </div>
      
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/Eduncle.png`} height="100" width="150" alt="" />
        </div>
        <div className={styles.slide}>
          <img src={`${Bucket_URL}CompaniesLogo/IOTR.png`} height="100" width="160" alt="" />
        </div>
      </div>
      
    </div>
  );
};

export default InfiniteSlider;
