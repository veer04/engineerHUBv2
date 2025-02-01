// import { FunctionComponent } from 'react';
import styles from './Frame.module.css';
export const Frame = () => {
return (
<div className={styles.frameParent}>
<div className={styles.frameGroup}>
<div className={styles.frameWrapper}>
<div className={styles.frameContainer}>
<div className={styles.connectWithUsWrapper}>
<div className={styles.connectWithUs}>Connect with us</div>
</div>
<div className={styles.letUsHelpYouToHireTheBeWrapper}>
<b className={styles.letUsHelp}>Let us help you to hire the best</b>
</div>
<div className={styles.bookASlotWithOurTeamOrRWrapper}>
<div className={styles.bookASlot}>Book a slot with our TEAM or reach out to us via call/mail.</div>
</div>
</div>
</div>
<div className={styles.frameDiv}>
<div className={styles.bookASlotNowWrapper}>
<b className={styles.b}>Book a slot now</b>
</div>
<div className={styles.frameParent1}>
<div className={styles.phoneParent}>
<div className={styles.phone}>
<img className={styles.vectorIcon} alt="" src="Vector.svg" />
</div>
<div className={styles.wrapper}>
<b className={styles.b}>
<span>{`83031 56089 `}</span>
<span className={styles.span}>/</span>
<span> 91298 83089</span>
</b>
</div>
</div>
<div className={styles.phoneParent}>
<img className={styles.mailIcon} alt="" src="mail.svg" />
<div className={styles.wrapper}>
<b className={styles.b}>info@engineerhub.in</b>
</div>
</div>
</div>
</div>
</div>
</div>);
};
