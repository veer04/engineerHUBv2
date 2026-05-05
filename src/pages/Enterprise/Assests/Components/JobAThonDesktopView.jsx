import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket_URL } from "../../../../services/APIUtils";
import styles from "./JobAThonDesktopView.module.css";
// import EasyWayToHire from "./EasyWayToHire/EasyWayToHire"; // Removed to avoid CSS conflicts
import OurClientale from "../../../../components/OurClientale/OurClientale";
import { useTypewriter } from "../../../../hooks/useTypewriter";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { SEO } from "../../../../components/SEO/SEO.jsx";

export const JobAThonDesktopView = () => {
  const bucket = `${Bucket_URL}frontend/enterprise/desktopView/`;
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Typewriter animation for the main heading
  const { displayText: typewriterText, isComplete } = useTypewriter(
    "We streamline hiring so you can\nfocus on growing !",
    80, // Speed in milliseconds
    500  // Initial delay in milliseconds
  );

  // Modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEmailClick = () => {
    window.open("mailto:info@engineerhub.in", "_blank");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918303156089";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const navigateToHostFlow = (path) => {
    Navigate(path);
  };

  const scrollToBookSlotSection = () => {
    const element = document.getElementById("book-slot-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <SEO
      title="Hiring Platform | engineerHUB"
      description="engineerHUB helps HR teams source, engage, and hire faster with AI-powered screening, analytics, and campus connectivity."
      keywords={[
        "hiring platform",
        "campus recruitment",
        "Recruitment platform",
        "ai hiring platform",
        "engineerHUB employer",
        "engineerHUB hiring platform",
        "engineerHUB campus recruitment",
        "engineerHUB ai hiring platform",
        "engineerHUB employer",
        "engineerHUB hiring platform",
        "engineerHUB campus recruitment",
        "engineerHUB ai hiring platform",
      ]}
      canonical="https://www.engineerhub.in/employer"
    >
      <div className={styles.jobAThonDesktopView}>
      <div className={styles.jobAThonDesktopViewChild} />
      
      {/* Landing Section with Flexbox Layout */}
      <div className={styles.landingSection}>
        <div className={styles.contentSection}>
          <div className={styles.heroContent}>
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
                <p className={styles.empoweringRecruitersTo}>
                  engineerHUB is an AI-powered end-to-end hiring platform that enables companies to discover high-potential candidates faster, and helps colleges modernize campus placements.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.ctaSection}>
            <div 
              className={styles.frameWrapper}
              onClick={scrollToBookSlotSection}
            >
              <div className={styles.frameContainer}>
                <div className={styles.frameContainer}>
                  <b className={styles.connectWithUs}>Connect with us</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.imageSection}>
          <img
            className={styles.company41}
            alt="Hiring Platform Illustration"
            src={`${Bucket_URL}ui/banners/company_emp.png`}
          />
        </div>
      </div>

      <section className={styles.enterpriseHireTalentSection}>
        <div className={styles.enterpriseHireTalentWrap}>
          <h3 className={styles.enterpriseHireTalentTitle}>Hire Talent</h3>
          <div className={styles.enterpriseHireTalentGrid}>
            <article
              className={`${styles.enterpriseHireTalentCard} ${styles.enterpriseHireTalentCardJobs}`}
              onClick={() => navigateToHostFlow("/host/job")}
            >
              <FaBriefcase className={styles.enterpriseHireTalentIcon} aria-hidden="true" />
              <span className={styles.enterpriseHireTalentHeading}>Jobs</span>
              <span className={styles.enterpriseHireTalentSubHeading}>
                Create Jobs →
              </span>
              <p className={styles.enterpriseHireTalentDescription}>
                Unlock career opportunities! Connect young talent with exciting professionals.
              </p>
            </article>

            <article
              className={`${styles.enterpriseHireTalentCard} ${styles.enterpriseHireTalentCardInternships}`}
              onClick={() => navigateToHostFlow("/host/internship")}
            >
              <PiStudentFill className={styles.enterpriseHireTalentIcon} aria-hidden="true" />
              <span className={styles.enterpriseHireTalentHeading}>Internships</span>
              <span className={styles.enterpriseHireTalentSubHeading}>
                Create Internships →
              </span>
              <p className={styles.enterpriseHireTalentDescription}>
                Engage with aspiring talent. Showcase internship opportunities on our platform.
              </p>
            </article>

            {/* Event hiring card temporarily hidden.
            <article
              className={styles.enterpriseHireTalentCard}
              onClick={scrollToBookSlotSection}
            >
              <span className={styles.enterpriseHireTalentHeading}>Event Hiring</span>
              <span className={styles.enterpriseHireTalentSubHeading}>
                Hire Talent →
              </span>
              <p className={styles.enterpriseHireTalentDescription}>
                Find the perfect talent for your events with our Event Hiring!.
              </p>
            </article>
            */}
          </div>
        </div>
      </section>
      <div className={styles.jobAThonDesktopViewInner}>
        <div className={styles.frameDiv}>
          <div className={styles.frameParent1}>
            <div className={styles.frameParent2}>
              <div className={styles.weStreamlineHiringParent}>
                <div className={styles.typewriterContainer}>
                  <span className={styles.typewriterText}>
                    {typewriterText.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < typewriterText.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                    {!isComplete && <span className={styles.cursor}>|</span>}
                  </span>
                </div>
              </div>
              {/* Responsive Vertical Stack Layout */}
              <div className={styles.streamlineCardsContainer}>
                <div className={styles.streamlineCard}>
                  <div className={styles.heading3}>70%</div>
                  <b className={styles.lessTimeSpent}>
                    less time screening
                  </b>
                  <div className={styles.automatedShortlistingSaves}>
                    AI-driven shortlisting automatically filters top candidates by skills, experience, and JD preferences - cutting manual screening time by 70%.
                  </div>
                </div>
                
                <div className={styles.streamlineCard}>
                  <div className={styles.heading3}>4x</div>
                  <b className={styles.lessTimeSpent}>
                    smarter interview scheduling
                  </b>
                  <div className={styles.smartToolsLike}>
                    Seamless integrations automate scheduling and communication, boosting recruiter productivity and candidate experience.
                  </div>
                </div>
                
                <div className={styles.streamlineCard}>
                  <div className={styles.heading3}>2.5x</div>
                  <b className={styles.lessTimeSpent}>
                    deeper hiring insights
                  </b>
                  <div className={styles.automatedShortlistingSaves}>
                    Actionable analytics on hiring efficiency, candidate performance, and recruitment trends empower smarter, data-backed decisions.
                  </div>
                </div>
              </div>
            </div>

            {/* Easy Way to Hire Section - Inline to avoid CSS conflicts */}
            <div className={styles.easyWayToHireSection}>
              <div className={styles.easyWayContainer}>
                <div className={styles.easyWayTitle}>
                  <h3 className={styles.easyWayHeading}>
                    3 easy ways to{" "}
                    <span className={styles.highlightText}>Hire</span> through
                    engineerHUB
                  </h3>
                </div>
                
                <div className={styles.easyWayGrid}>
                  {/* Card 1: Do-it-yourself hiring */}
                  <div className={styles.easyWayCard} style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" }}>
                    <div className={styles.freeBand}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="61"
                        height="88"
                        viewBox="0 0 61 88"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_3683_4429)">
                          <path
                            d="M29.9997 0.499959L57.0051 46L57.0051 80L4.4965 0.499925L29.9997 0.499959Z"
                            fill="#FF0000"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_3683_4429"
                            x="0.496094"
                            y="0.499878"
                            width="60.5088"
                            height="87.5001"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_3683_4429"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_3683_4429"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                      <h3 className={styles.freeText}>FREE</h3>
                    </div>
                    
                    <div className={styles.cardInfo}>
                      <h3 className={styles.cardTitle}>Do-it-yourself hiring</h3>
                      <p className={styles.cardDescription}>
                        Zero cost. Basic tools.<br />
                        Instant access to job seekers.
                      </p>
                      <div className={styles.cardButton} onClick={() => window.open("/host/job", "_blank")}>
                        <button>Host Now</button>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Use our sourcing Expert */}
                  <div className={styles.easyWayCard} style={{ background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)" }}>
                    <div className={styles.cardInfo}>
                      <h3 className={styles.cardTitle}>Use our sourcing Expert</h3>
                      <p className={styles.cardDescription}>
                        Our experts match you with fits.<br />
                        Pay per role or ~ 3% on success.
                      </p>
                      <div className={styles.cardButton} onClick={openModal}>
                        <button>Connect Now</button>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Let us hire for you */}
                  <div className={styles.easyWayCard} style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)" }}>
                    <div className={styles.cardInfo}>
                      <h3 className={styles.cardTitle}>Let us hire for you</h3>
                      <p className={styles.cardDescription}>
                        From start to hire, we manage it all.<br />
                        Starts at ~5% of CTC.
                      </p>
                      <div className={styles.cardButton} onClick={openModal}>
                        <button>Connect Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        AI-Powered Campus Hiring
                        </b>
                      </div>
                      <div className={styles.fromConnectingWith5LakhEWrapper}>
                        <div className={styles.fromConnectingWith}>
                        <ul>
                        <li>
                        Discover and hire top engineers from any tier of campus across India  instantly, With access to 2,25,000+ verified candidates.
                        </li>
                        <br />  
                        <li>
                        
                        from AI-driven shortlisting and skill-based assessments to
                        virtual interviews and advanced analytics.
                        </li>
                        <br />
                          <li>
                         Break free from geographic limits and connect with untapped, high-potential talent nationwide .
                        </li>
                        </ul>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={styles.forCompaniesWrapper}
                    onClick={() => {
                      const element = document.getElementById("book-slot-section");
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: "smooth", 
                          block: "center",
                          inline: "center"
                        });
                      }
                    }}
                  >
                    <b className={styles.forCompanies}>For Companies</b>
                  </div>
                </div>
                {/* Image side temporarily hidden to remove S3/image dependency.
                <div className={styles.hireFromAnyTierOfCampusParent}>
                  <b className={styles.hireFromAny}>
                    Hire from Any Tier of Campus
                  </b>
                  <img
                    className={styles.icon}
                    alt=""
                    src={`${bucket}campus_hiring.png`}
                  />
                </div>
                */}
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
                          <ul>
                          <li>
                        Accelerate your hiring with our AI-powered platform - connect, evaluate, and onboard top talent from any campus within just 3 days.
                        </li>
                        <li>
                        Save time, cut costs, and ensure quality every step of the way.
                        </li>
                        
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={styles.forCompaniesWrapper}
                    onClick={() => {
                      const element = document.getElementById("book-slot-section");
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: "smooth", 
                          block: "center",
                          inline: "center"
                        });
                      }
                    }}
                  >
                    <b className={styles.forCompanies}>For HRs</b>
                  </div>
                </div>
                {/* Image side temporarily hidden to remove S3/image dependency.
                <div className={styles.connectHireTopTalentParent}>
                  <b
                    className={styles.connectHire}
                  >{`Connect & Hire Top Talent`}</b>
                  <img
                    className={styles.importantRecruitingMetricsFIcon}
                    alt=""
                    src={`${bucket}hr_hiring_latest.png
`}
                  />
                </div>
                */}
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
                          >{`Digitize Your `}</p>
                          <p className={styles.empoweringRecruitersTo}>
                            Campus Placements.
                          </p>
                        </b>
                      </div>
                      <div className={styles.fromConnectingWith5LakhEWrapper}>
                        <div className={styles.fromConnectingWith}>
                        <ul>
                        <li>Partner with engineerHUB to list your campus and give companies direct access to your students.
                        </li>
                        
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={styles.forCompaniesWrapper}
                    onClick={() => {
                      const element = document.getElementById("book-slot-section");
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: "smooth", 
                          block: "center",
                          inline: "center"
                        });
                      }
                    }}
                  >
                    <b className={styles.forCompanies}>For Campuses</b>
                  </div>
                </div>
                {/* Image side temporarily hidden to remove S3/image dependency.
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
                    src={`${bucket}college_engineerhub.png`}
                  />
                </div>
                */}
              </div>
              {/*
              <div className={styles.ourClientaleWrapper}>
                <OurClientale />
              </div>
              */}
              {/*
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
                          We have engineer’s from 800+ colleges across India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameWrapper6}>
                  <div className={styles.campusCarousel}>
                    <div className={styles.campusCarouselTrack}>
                    
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="BITS Pilani"
                          src={`${bucket}bits-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>BITS Pilani</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.th1Icon}
                          alt="IIT Bombay"
                          src={`${bucket}th-1.png`}
                        />
                        <div className={styles.bitsPilani}>IIT Bombay</div>
                      </div>
                      <div className={styles.container2}>
                        <img
                          className={styles.iimcalMinwebpIcon}
                          alt="IIT Madras"
                          src={`${bucket}iimcal-min.webp.png`}
                        />
                        <div className={styles.bitsPilani}>IIT Madras</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.vnitLogowebpIcon}
                          alt="VNIT Nagpur"
                          src={`${bucket}vnit-logo.webp.png`}
                        />
                        <div className={styles.bitsPilani}>VNIT, Nagpur</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="SRM University"
                          src={`${bucket}srm-logo.webp.png`}
                        />
                        <div className={styles.bitsPilani}>SRM University</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="NMIMS"
                          src={`${bucket}nmims-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>NMIMS</div>
                      </div>
                      <div className={styles.container}>
                        <div className={styles.spjainMinwebp}>
                          <img
                            className={styles.bharatiVidyapeethLogo1Icon}
                            alt="Bharati Vidyapeeth"
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
                          alt="BML"
                          src={`${bucket}bml-munjal-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>BML</div>
                      </div>
                      
                     
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="BITS Pilani"
                          src={`${bucket}bits-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>BITS Pilani</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.th1Icon}
                          alt="IIT Bombay"
                          src={`${bucket}th-1.png`}
                        />
                        <div className={styles.bitsPilani}>IIT Bombay</div>
                      </div>
                      <div className={styles.container2}>
                        <img
                          className={styles.iimcalMinwebpIcon}
                          alt="IIT Madras"
                          src={`${bucket}iimcal-min.webp.png`}
                        />
                        <div className={styles.bitsPilani}>IIT Madras</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.vnitLogowebpIcon}
                          alt="VNIT Nagpur"
                          src={`${bucket}vnit-logo.webp.png`}
                        />
                        <div className={styles.bitsPilani}>VNIT, Nagpur</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="SRM University"
                          src={`${bucket}srm-logo.webp.png`}
                        />
                        <div className={styles.bitsPilani}>SRM University</div>
                      </div>
                      <div className={styles.container}>
                        <img
                          className={styles.bitsMinpngIcon}
                          alt="NMIMS"
                          src={`${bucket}nmims-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>NMIMS</div>
                      </div>
                      <div className={styles.container}>
                        <div className={styles.spjainMinwebp}>
                          <img
                            className={styles.bharatiVidyapeethLogo1Icon}
                            alt="Bharati Vidyapeeth"
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
                          alt="BML"
                          src={`${bucket}bml-munjal-min.png.png`}
                        />
                        <div className={styles.bitsPilani}>BML</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              */}
              

              <div className={styles.frameWrapper7} id="book-slot-section">
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
                      <b className={styles.forCompanies}>
                        Book a slot now
                      </b>
                    </div>
                    <div className={styles.frameParent19}>
                      <div className={styles.phoneParent}>
                        <div className={styles.phone}>
                          <MdPhone className={styles.vectorIcon} aria-hidden="true" />
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
                        <MdEmail className={styles.mailIcon} aria-hidden="true" />
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
                <div className={styles.feedbackCarousel}>
                  <div className={styles.feedbackCarouselTrack}>
                    {/* First set of feedback cards */}
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>Mr. RB Mouli</b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Placement Head, Birla Campus
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>
                              Mr. Rakesh Singh
                            </b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Placement Cell, NIET
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>Mrs Sonal</b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Human Resource, TCS
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>
                              Mrs. Rashmi sharma
                            </b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Associate HR, Infosys
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Duplicate set for seamless scrolling */}
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>Mr. RB Mouli</b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Placement Head, Birla Campus
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>
                              Mr. Rakesh Singh
                            </b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Placement Cell, NIET
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>Mrs Sonal</b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Human Resource, TCS
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.feedbackCard}>
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
                            <b className={styles.feedbackName}>
                              Mrs. Rashmi sharma
                            </b>
                          </div>
                          <div className={styles.placementHeadBirlaCampusWrapper}>
                            <div className={styles.feedbackPosition}>
                              Associate HR, Infosys
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Easy Way Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>Kindly drop a call or mail</h3>

            <div className={styles.modalContact} onClick={handleEmailClick}>
              <MdEmail className={styles.modalIcon} />
              <span>info@engineerhub.in</span>
            </div>

            <div className={styles.modalContact} onClick={handleWhatsAppClick}>
              <MdPhone className={styles.modalIcon} />
              <span>+91 8303156089</span> 
            </div>

            <button className={styles.modalBackBtn} onClick={closeModal}>
              Back
            </button>
          </div>
        </div>
      )}
      </div>
    </SEO>
  );
};

export default JobAThonDesktopView;
