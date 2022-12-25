import React from 'react'
import {Link} from 'react-router-dom'
import tick from "./svg/tick.svg";
import styles from "./success.module.css";
const success = () => {
  return (
    <div className={styles.successCont}>
        <img  className={styles.tk} src={tick} alt={"tick"}/>
        <div className={styles.successMsg}>
        Congratulations, you have completed your registration!
        </div>
        <Link to="/courses" className={styles.successBtn}>
            Done
        </Link>
    </div>
  )
}

export default success