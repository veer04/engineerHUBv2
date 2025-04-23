import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket_URL } from "../../../../services/APIUtils";
import styles from "./JobAThonDesktopView.module.css";
import EasyWayToHire from "./EasyWayToHire/EasyWayToHire";

export const JobAThonDesktopView = () => {
  const bucket = `${Bucket_URL}frontend/enterprise/desktopView/`;
  const Navigate = useNavigate();
  return (
    <div className={styles.jobAThonDesktopView}>
      <div className={styles.jobAThonDesktopViewChild} />
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.oneStopHiringSolutionForCWrapper}>
            <div className={styles.oneStopHiring}>
              One stop hiring solution for companies!
            </div>
          </div>
          <div className={styles.sourceEngageHireWrapper}>
            <b className={styles.sourceEngage}>Source . Engage . Hire</b>
          </div>
          <div className={styles.empoweringRecruitersToHireWrapper}>
            <div className={styles.empoweringRecruitersToContainer}>
              <p
                className={styles.empoweringRecruitersTo}
              >{`Empowering recruiters to hire smarter and helping `}</p>
              <p className={styles.empoweringRecruitersTo}>
                universities simplify campus placements.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <div
              className={styles.frameContainer}
              onClick={() => {
                document
                  .getElementById("book-slot-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <b className={styles.connectWithUs}>Connect with us</b>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.jobAThonDesktopViewInner}>
        <div className={styles.frameDiv}>
          <div className={styles.frameParent1}>
            <div className={styles.frameParent2}>
              <div className={styles.weStreamlineHiringParent}>
                <div className={styles.weStreamlineHiring}>
                  we streamline hiring
                </div>
                <div className={styles.heading2}>
                  so you can focus on growing
                </div>
              </div>
              <div className={styles.paragraphbackgroundParent}>
                <div className={styles.paragraphbackground}>
                  <div className={styles.heading3}>70%</div>
                  <b className={styles.lessTimeSpent}>
                    less time spent screening
                  </b>
                  <div
                    className={styles.automatedShortlistingSaves}
                  >{`Automated shortlisting saves time by filtering top candidates based on skills, experience, and recruiter preferences. `}</div>
                </div>
                <div className={styles.paragraphbackground1}>
                  <div className={styles.heading3}>3x</div>
                  <b className={styles.lessTimeSpent}>faster assesments</b>
                  <div className={styles.automatedShortlistingSaves}>
                    <p
                      className={styles.integratedThirdPartyAssessm}
                    >{`Integrated third-party assessment tools streamline aptitude, coding, and case study evaluations, reducing the hiring timeline significantly.  `}</p>
                  </div>
                </div>
                <div className={styles.paragraphbackground}>
                  <div className={styles.heading3}>4x</div>
                  <b className={styles.lessTimeSpent}>
                    better interview scheduling
                  </b>
                  <div
                    className={styles.smartToolsLike}
                  >{`Smart tools like Calendly integration ensure seamless scheduling, rescheduling, and communication with candidates.  `}</div>
                </div>
                <div className={styles.paragraphbackground}>
                  <div className={styles.heading3}>2.5x</div>
                  <b className={styles.lessTimeSpent}>
                    more insightful analytics
                  </b>
                  <div className={styles.automatedShortlistingSaves}>
                    Basic analytics provide actionable data on hiring
                    efficiency, candidate performance, and recruitment trends to
                    make better decisions.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <EasyWayToHire />
            </div>

            <div className={styles.frameParent3}>
              <div className={styles.frameParent4}>
                <div className={styles.frameParent5}>
                  <div className={styles.engineerhubIsOneStopSolutiWrapper}>
                    <div className={styles.frameParent6}>
                      <div
                        className={styles.simplifyingCampusRecruitmentWrapper}
                      >
                        <b className={styles.simplifyingCampusRecruitment}>
                          Simplifying Campus Recruitment : Smarter, Faster,
                          Better.
                        </b>
                      </div>
                      <div className={styles.fromConnectingWith5LakhEWrapper}>
                        <div className={styles.fromConnectingWith}>
                          From connecting with 5 lakh+ engineers to assessments,
                          virtual interviews, advanced analytics, and
                          ATS-powered shortlisting—our platform automates and
                          streamlines every step of the recruitment journey.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.forCompaniesWrapper}>
                    <b className={styles.forCompanies}>For Companies</b>
                  </div>
                </div>
                <div className={styles.hireFromAnyTierOfCampusParent}>
                  <b className={styles.hireFromAny}>
                    Hire from Any Tier of Campus
                  </b>
                  <img
                    className={styles.icon}
                    alt=""
                    src={`${bucket}230403050229390024-1.png`}
                  />
                </div>
              </div>
              <div className={styles.frameParent7}>
                <div className={styles.frameParent5}>
                  <div className={styles.engineerhubIsOneStopSolutiWrapper}>
                    <div className={styles.frameParent6}>
                      <div
                        className={styles.simplifyingCampusRecruitmentWrapper}
                      >
                        <b className={styles.simplifyingCampusRecruitment}>
                          From Hi to Hired within 3 days
                        </b>
                      </div>
                      <div className={styles.fromConnectingWith5LakhEWrapper}>
                        <div className={styles.fromConnectingWith}>
                          Accelerate your hiring process with our streamlined
                          platform—connect, assess, and onboard top talent
                          within 72 hours, ensuring efficiency and quality every
                          step of the way.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.forCompaniesWrapper}>
                    <b className={styles.forCompanies}>For HRs</b>
                  </div>
                </div>
                <div className={styles.connectHireTopTalentParent}>
                  <b
                    className={styles.connectHire}
                  >{`Connect & Hire Top Talent`}</b>
                  <img
                    className={styles.importantRecruitingMetricsFIcon}
                    alt=""
                    src={`${bucket}Important-recruiting-metrics-featured-1.png
`}
                  />
                </div>
              </div>
              <div className={styles.frameParent10}>
                <div className={styles.frameParent5}>
                  <div className={styles.engineerhubIsOneStopSolutiWrapper}>
                    <div className={styles.frameParent6}>
                      <div
                        className={styles.simplifyingCampusRecruitmentWrapper}
                      >
                        <b className={styles.simplifyingCampusRecruitment}>
                          <p
                            className={styles.empoweringRecruitersTo}
                          >{`Digitize & Automate Your `}</p>
                          <p className={styles.empoweringRecruitersTo}>
                            Campus Placements.
                          </p>
                        </b>
                      </div>
                      <div className={styles.fromConnectingWith5LakhEWrapper}>
                        <div className={styles.fromConnectingWith}>
                          Effortlessly enhance your campus placement process
                          with advanced tools to access live job listings,
                          manage student profiles, schedule interviews, and aim
                          for 100% placement success—all on a single,
                          streamlined platform.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.forCompaniesWrapper}>
                    <b className={styles.forCompanies}>For Campuses</b>
                  </div>
                </div>
                <div className={styles.hireFromAnyTierOfCampusParent}>
                  <b className={styles.manageOnlinePlacements}>
                    Manage Online Placements
                  </b>
                  <div className={styles.frameParent13}>
                    <div className={styles.studentDataWrapper}>
                      <div className={styles.studentData}>Student Data</div>
                    </div>
                    <div className={styles.jobsWrapper}>
                      <div className={styles.studentData}>Jobs</div>
                    </div>
                    <div className={styles.jobsWrapper}>
                      <div className={styles.studentData}>Interviews</div>
                    </div>
                  </div>
                  <img
                    className={styles.orangeWhiteGreenNeoBrutali}
                    alt=""
                    src={`${bucket}Orange+White+Green+Neo+Brutalism+Business+Performance+Dashboard+Graph-1.png`}
                  />
                </div>
              </div>
              <div className={styles.frameParent14}>
                <div className={styles.weStreamlineHiringParent}>
                  <div className={styles.frameDiv}>
                    <div className={styles.frameParent6}>
                      <div className={styles.oneStopHiringSolutionForCWrapper}>
                        <b className={styles.simplifyingCampusRecruitment}>
                          Our Campuses
                        </b>
                      </div>
                      <div className={styles.weHaveEngineersFrom1950Wrapper}>
                        <div className={styles.weHaveEngineers}>
                          We have engineer’s from 1950+ colleges across India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameWrapper6}>
                  <div className={styles.containerParent}>
                    <div className={styles.container}>
                      <img
                        className={styles.bitsMinpngIcon}
                        alt=""
                        src={`${bucket}bits-min.png.png`}
                      />
                      <div className={styles.bitsPilani}>BITS Pilani</div>
                    </div>
                    <div className={styles.container}>
                      <img
                        className={styles.th1Icon}
                        alt=""
                        src={`${bucket}th-1.png`}
                      />
                      <div className={styles.bitsPilani}>IIT Bombay</div>
                    </div>
                    <div className={styles.container2}>
                      <img
                        className={styles.iimcalMinwebpIcon}
                        alt=""
                        src={`${bucket}iimcal-min.webp.png`}
                      />
                      <div className={styles.bitsPilani}>IIT Madras</div>
                    </div>
                    <div className={styles.container}>
                      <img
                        className={styles.vnitLogowebpIcon}
                        alt=""
                        src={`${bucket}vnit-logo.webp.png`}
                      />
                      <div className={styles.bitsPilani}>VNIT, Nagpur</div>
                    </div>
                    <div className={styles.container}>
                      <img
                        className={styles.bitsMinpngIcon}
                        alt=""
                        src={`${bucket}srm-logo.webp.png`}
                      />
                      <div className={styles.bitsPilani}>SRM University</div>
                    </div>
                    <div className={styles.container}>
                      <img
                        className={styles.bitsMinpngIcon}
                        alt=""
                        src={`${bucket}nmims-min.png.png`}
                      />
                      <div className={styles.bitsPilani}>NMIMS </div>
                    </div>
                    <div className={styles.container}>
                      <div className={styles.spjainMinwebp}>
                        <img
                          className={styles.bharatiVidyapeethLogo1Icon}
                          alt=""
                          src={`${bucket}bharati_vidyapeeth_logo-1.png`}
                        />
                      </div>
                      <div className={styles.bitsPilani}>
                        Bharati Vidyapeeth
                      </div>
                    </div>
                    <div className={styles.container}>
                      <img
                        className={styles.bitsMinpngIcon}
                        alt=""
                        src={`${bucket}bml-munjal-min.png.png`}
                      />
                      <div className={styles.bitsPilani}>BML</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.frameWrapper7}>
                <div className={styles.frameParent16}>
                  <div className={styles.frameWrapper8}>
                    <div className={styles.frameParent17}>
                      <div className={styles.connectWithUsContainer}>
                        <div className={styles.empoweringRecruitersToContainer}>
                          Connect with us
                        </div>
                      </div>
                      <div className={styles.letUsHelpYouToHireTheBeWrapper}>
                        <b className={styles.simplifyingCampusRecruitment}>
                          Let us help you to hire the best
                        </b>
                      </div>
                      <div className={styles.bookASlotWithOurTeamOrRWrapper}>
                        <div className={styles.weHaveEngineers}>
                          Book a slot with our TEAM or reach out to us via
                          call/mail.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameParent18}>
                    <div
                      className={styles.bookASlotNowWrapper}
                      onClick={() =>
                        Navigate("/referrals/book-now/67a107c89d57a46e99582bd1")
                      }
                    >
                      <b className={styles.forCompanies} id="book-slot-section">
                        Book a slot now
                      </b>
                    </div>
                    <div className={styles.frameParent19}>
                      <div className={styles.phoneParent}>
                        <div className={styles.phone}>
                          <img
                            className={styles.vectorIcon}
                            alt=""
                            src={`${bucket}Vector.svg`}
                          />
                        </div>
                        <div className={styles.wrapper}>
                          <b className={styles.forCompanies}>
                            <span>{`83031 56089 `}</span>
                            <span className={styles.span}>/</span>
                            <span> 91298 83089</span>
                          </b>
                        </div>
                      </div>
                      <div className={styles.phoneParent}>
                        <img
                          className={styles.mailIcon}
                          alt=""
                          src={`${bucket}mail.svg`}
                        />
                        <div className={styles.wrapper}>
                          <b className={styles.forCompanies}>
                            info@engineerhub.in
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.frameParent20}>
                <div className={styles.frameWrapper9}>
                  <div className={styles.whyHrsSupportUsParent}>
                    <b className={styles.whyHrsSupport}>Why HR’s support us</b>
                    <img
                      className={styles.vectorIcon1}
                      alt=""
                      src={`${bucket}Vector+(1).svg`}
                    />
                  </div>
                </div>
                <div className={styles.feedback}>
                  <div className={styles.feedbackInner}>
                    <div className={styles.frameParent21}>
                      <div className={styles.oneStopHiringSolutionForCWrapper}>
                        <div className={styles.weHaveEngineers}>
                          EngineerHUB improved our hiring process by reducing
                          time by 40%, using ATS scoring, bulk actions, and
                          advanced filtering, saving countless hours and effort
                          efficiently
                        </div>
                      </div>
                      <div className={styles.frameParent22}>
                        <div className={styles.frameContainer}>
                          <b className={styles.connectWithUs}>Mr. RB Mouli</b>
                        </div>
                        <div className={styles.placementHeadBirlaCampusWrapper}>
                          <div className={styles.placementHeadBirla}>
                            Placement Head, Birla Campus
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.feedbackChild}>
                    <div className={styles.frameParent21}>
                      <div className={styles.oneStopHiringSolutionForCWrapper}>
                        <div className={styles.weHaveEngineers}>
                          Assessments, interview scheduling, and automated
                          notifications from EngineerHUB ensure a smooth
                          recruitment process, simplifying coding rounds,
                          aptitude tests, and enhancing team productivity
                        </div>
                      </div>
                      <div className={styles.frameParent22}>
                        <div className={styles.frameContainer}>
                          <b className={styles.connectWithUs}>
                            Mr. Rakesh Singh
                          </b>
                        </div>
                        <div className={styles.placementHeadBirlaCampusWrapper}>
                          <div className={styles.placementHeadBirla}>
                            Placement Cell, NIET{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.feedbackInner1}>
                    <div className={styles.frameParent21}>
                      <div className={styles.oneStopHiringSolutionForCWrapper}>
                        <div className={styles.weHaveEngineers}>
                          Role-based access allows secure workflows, while
                          analytics tools provide actionable insights, enabling
                          our team to refine strategies and achieve recruitment
                          goals faster than expected.
                        </div>
                      </div>
                      <div className={styles.frameParent22}>
                        <div className={styles.frameContainer}>
                          <b className={styles.connectWithUs}>Mrs Sonal</b>
                        </div>
                        <div className={styles.placementHeadBirlaCampusWrapper}>
                          <div className={styles.placementHeadBirla}>
                            Human Resource, TCS
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.feedbackChild}>
                    <div className={styles.frameParent21}>
                      <div className={styles.oneStopHiringSolutionForCWrapper}>
                        <div className={styles.weHaveEngineers}>
                          EngineerHUB automated updates, interview rescheduling,
                          and pre-placement talks improve candidate engagement,
                          boosting feedback and employer branding, ensuring a
                          better recruitment experience overall
                        </div>
                      </div>
                      <div className={styles.frameParent22}>
                        <div className={styles.frameContainer}>
                          <b className={styles.connectWithUs}>
                            Mrs. Rashmi sharma
                          </b>
                        </div>
                        <div className={styles.placementHeadBirlaCampusWrapper}>
                          <div className={styles.placementHeadBirla}>
                            Associate HR, Infosys
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper10}></div>
          </div>
        </div>
      </div>
      <img
        className={styles.company41}
        alt=""
        src={`${bucket}Company-(4)-1.png`}
      />
      <div className={styles.dtNavBar}>
        <div className={styles.eHubLogoUpdated6Wrapper}>
          <img
            className={styles.eHubLogoUpdated6}
            alt=""
            src="E-HUB-logo Updated 6.png"
          />
        </div>
        <div className={styles.tabs}>
          <div className={styles.communityContainer}>
            <div className={styles.placementHeadBirla}>Community</div>
          </div>
          <div className={styles.communityContainer}>
            <div className={styles.placementHeadBirla}>Campus</div>
          </div>
          <div className={styles.communityContainer}>
            <div className={styles.placementHeadBirla}>Career</div>
          </div>
          <div className={styles.frameParent56}>
            <div className={styles.communityContainer}>
              <div className={styles.placementHeadBirla}>Referrals</div>
            </div>
            <div className={styles.frameWrapper29}>
              <div className={styles.newWrapper}>
                <div className={styles.new}>New</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameParent57}>
          <div className={styles.addCircleStrokeRounded2Parent}>
            <img
              className={styles.addCircleStrokeRounded2}
              alt=""
              src="add-circle-stroke-rounded (2) 1.svg"
            />
            <div className={styles.placementHeadBirla}>Host</div>
          </div>
          <div className={styles.connectWithUsContainer}>
            <div className={styles.frameItem} />
          </div>
          <div className={styles.loginsignup}>
            <div className={styles.loginWrapper}>
              <div className={styles.placementHeadBirla}>Login</div>
            </div>
            <div className={styles.joinUsWrapper}>
              <div className={styles.placementHeadBirla}>For Employers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAThonDesktopView;
