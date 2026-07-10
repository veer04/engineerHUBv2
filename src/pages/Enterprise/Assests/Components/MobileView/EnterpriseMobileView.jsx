import React from "react";
import { FaUserCheck, FaLaptopCode, FaVideo, FaRocket } from "react-icons/fa";
import { Bucket_URL } from "../../../../../services/APIUtils";
import { useNavigate } from "react-router-dom";
import "./EnterpriseMobileView.css";
import EasyWayToHire from "../EasyWayToHire/EasyWayToHire";
import OurClientale from "../../../../../components/OurClientale/OurClientale";
import { SEO } from "../../../../../components/SEO/SEO.jsx";
export const JobAThonMobile = () => {
  const bucket = `${Bucket_URL}frontend/enterprise/mobileView/`;
  const bitsminpng = `${bucket}bits-min.png.png`;
  const iimaminwebp = `${bucket}iima-min.webp.png`;
  const iimcalminwebp = `${bucket}iimcal-min.webp.png`;
  const vnitlogowebp = `${bucket}vnit-logo.webp.png`;
  const nmimsminpng = `${bucket}nmims-min.png.png`;
  const spjainminwebp = `${bucket}spjain-min.webp.png`;
  const bmlmunjalminpng = `${bucket}bml-munjal-min.png.png`;
  const srmlogowebppng = `${bucket}srm-logo.webp.png`;
  const Navigate = useNavigate();
  return (
    <SEO
      title="Hire Faster|engineerHUB"
      description="Hire Faster on engineerHUB to connect with engineers, host hiring events, and digitize campus placements through engineerHUB."
      keywords={[
        " hiring platform",
        "campus placements",
        "engineerhub employer",
        "hire faster on engineerHUB",
        "hire fast on engineerHUB",
        "engineerHUB campus placements",
        "engineerHUB employer",
        "engineerHUB hiring events on engineerHUB",
        "engineerHUB digitize campus placements on engineerHUB",
        "engineerHUB hiring platform on engineerHUB",
      ]}
      canonical="https://www.engineerhub.in/employer"
    >
      <div className="job-a-thon-mobile">
      <div className="div">
        <div className="overlap-group">
          <div className="frameMobView">
            <div className="frameMobView-wrapper">
              <div className="frameMobView-2">
                <div className="div-wrapper">
                  <p className="text-wrapper">
                    One stop hiring solution for companies!
                  </p>
                </div>

                <div className="frameMobView-3">
                  <p className="p">Source . Engage . Hire</p>
                </div>

                <div className="div-wrapper">
                  <p className="text-wrapper-2">
                    Empowering recruiters to hire smarter and helping
                    universities simplify campus placements
                  </p>
                </div>
              </div>
            </div>

            <div className="mob-cta-container">
              <div 
                className="frameMobView-4"
                onClick={() => {
                  document
                    .getElementById("book-slot-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Connect with us
              </div>
              <div 
                className="mob-host-opportunity-btn"
                onClick={() => {
                  document
                    .getElementById("hire-talent-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Host Opportunity
              </div>
            </div>
          </div>

          <img
            className="company"
            alt="Company"
            src={`${bucket}company-4-2.png`}
          />
        </div>

        <div className="frameMobView-7">
          <div className="frameMobView-8">
            <div className="frameMobView-9">
              <div className="text-wrapper-4">we streamline hiring</div>

              <p className="heading-you-focus">so you can focus on growing</p>
            </div>

            <div className="mob-feature-cards">
              {/* Card 0: Fastest Sourcing — Green */}
              <div className="mob-feature-card" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
                <div className="mob-feature-illustration">
                  <div className="mob-feature-circle" style={{ background: "#dcfce7" }}>
                    <FaRocket className="mob-feature-icon" style={{ color: "#15803d" }} />
                  </div>
                </div>
                <div className="mob-feature-content">
                  <span className="mob-feature-badge" style={{ background: "#dcfce7", color: "#15803d" }}>Fastest Sourcing</span>
                  <h2 className="mob-feature-headline">Fastest Sourcing</h2>
                  <p className="mob-feature-desc">
                    Get engineers from campuses across India instantly.
                    <br></br>
                    Trusted by 300,000+ engineering candidates visiting engineerHUB every month.
                    
                  </p>
                </div>
              </div>

              {/* Card 1: AI Screening — Orange */}
              <div className="mob-feature-card" style={{ background: "#fff9f0", borderColor: "#fed7aa" }}>
                <div className="mob-feature-illustration">
                  <div className="mob-feature-circle" style={{ background: "#ffedd5" }}>
                    <FaUserCheck className="mob-feature-icon" style={{ color: "#c2410c" }} />
                  </div>
                </div>
                <div className="mob-feature-content">
                  <span className="mob-feature-badge" style={{ background: "#ffedd5", color: "#c2410c" }}>AI Resume Screening</span>
                  <h2 className="mob-feature-headline">Reduce Resume Screening Time by 70%</h2>
                  <p className="mob-feature-desc">
                    Our intelligent parsing engine identifies top-tier talent automatically, surfacing the best candidates based on actual technical depth.
                  </p>
                </div>
              </div>

              {/* Card 2: AI Assessment — Blue */}
              <div className="mob-feature-card" style={{ background: "#f0f7ff", borderColor: "#bfdbfe" }}>
                <div className="mob-feature-illustration">
                  <div className="mob-feature-circle" style={{ background: "#dbeafe" }}>
                    <FaLaptopCode className="mob-feature-icon" style={{ color: "#1d4ed8" }} />
                  </div>
                </div>
                <div className="mob-feature-content">
                  <span className="mob-feature-badge" style={{ background: "#dbeafe", color: "#1d4ed8" }}>AI Assessment</span>
                  <h2 className="mob-feature-headline">Generate Technical Assessments in Seconds</h2>
                  <p className="mob-feature-desc">
                    Instantly create coding challenges tailored to your tech stack. Schedule, track, and prevent cheating with AI proctoring.
                  </p>
                </div>
              </div>

              {/* Card 3: Smart Interview — Purple */}
              <div className="mob-feature-card" style={{ background: "#faf5ff", borderColor: "#e9d5ff" }}>
                <div className="mob-feature-illustration">
                  <div className="mob-feature-circle" style={{ background: "#f3e8ff" }}>
                    <FaVideo className="mob-feature-icon" style={{ color: "#7e22ce" }} />
                  </div>
                </div>
                <div className="mob-feature-content">
                  <span className="mob-feature-badge" style={{ background: "#f3e8ff", color: "#7e22ce" }}>Smart Interview</span>
                  <h2 className="mob-feature-headline">Conduct Interviews from One Workspace</h2>
                  <p className="mob-feature-desc">
                    Video, collaborative coding, and real-time notes in one seamless interface. Boost productivity 4x with smart scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="hire-talent-section">
            <EasyWayToHire />
          </div>

          {/* frameMobView-11/15/17 - Commented out: For Companies/HR/Campus campus sections */}
          {null && (
            <>
              <div className="frameMobView-11">
                <div className="frameMobView-12">
                  <div className="frameMobView-13">
                    <div className="text-wrapper-7">For Companies</div>
                  </div>
                  <div className="frameMobView-2">
                    <div className="frameMobView-14">
                      <p className="text-wrapper-8">
                        Simplifying Campus Recruitment : Smarter, Faster, Better
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rectangle">
                  <p className="text-wrapper-9">Hire from Any Tier of Campus</p>
                </div>
              </div>

              <div className="frameMobView-15">
                <div className="frameMobView-12">
                  <div className="frameMobView-16">
                    <div className="text-wrapper-10">For HR</div>
                  </div>
                  <div className="frameMobView-2">
                    <div className="from-hi-to-hired-wrapper">
                      <p className="text-wrapper-8">
                        From Hi to Hired within <br />3 days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rectangle">
                  <p className="connect-hire-top">Connect &amp; Hire Top Talent</p>
                </div>
              </div>

              <div className="frameMobView-17">
                <div className="frameMobView-12">
                  <div className="frameMobView-16">
                    <div className="text-wrapper-10">For Campus</div>
                  </div>
                  <div className="frameMobView-2">
                    <div className="frameMobView-18">
                      <p className="text-wrapper-8">
                        Digitize &amp; Automate Your Campus Placements
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rectangle">
                  <div className="text-wrapper-11">Manage Online Placements</div>
                </div>
              </div>
            </>
          )}

          <div className="frameMobView-19">
            <div className="frameMobView-20">
              <div className="frameMobView-21">
                <div className="frameMobView-22">
                  <div className="frameMobView-18">
                    <div className="text-wrapper-12">Our Campuses</div>
                  </div>

                  <div className="frameMobView-18">
                    <p className="text-wrapper-13">
                      We have engineer’s from 800+ colleges across India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="frameMobView-20">
              <div className="grid-container">
                <div className="grid-item">
                  <div
                    className="bits-min-png"
                    style={{
                      backgroundImage: `url(${bitsminpng})`,
                    }}
                  />
                  <div className="text-wrapper-14">BITS Pilani</div>
                </div>
                <div className="grid-item">
                  <div
                    className="iima-min-webp"
                    style={{
                      backgroundImage: `url(${iimaminwebp})`,
                    }}
                  />
                  <div className="text-wrapper-14">IIM Ahmedabad</div>
                </div>
                <div className="grid-item">
                  <div
                    className="iimcal-min-webp"
                    style={{
                      backgroundImage: `url(${iimcalminwebp})`,
                    }}
                  />
                  <div className="text-wrapper-14">IIM Calcutta</div>
                </div>
                <div className="grid-item">
                  <div
                    className="vnit-logo-webp"
                    style={{ backgroundImage: `url(${vnitlogowebp})` }}
                  />
                  <div className="text-wrapper-14">VNIT, Nagpur</div>
                </div>
                <div className="grid-item">
                  <div
                    className="srm-logo-webp"
                    style={{ backgroundImage: `url(${srmlogowebppng})` }}
                  />
                  <div className="text-wrapper-14">SRM University</div>
                </div>
                <div className="grid-item">
                  <div
                    className="nmims-min-png"
                    style={{ backgroundImage: `url(${nmimsminpng})` }}
                  />
                  <div className="text-wrapper-14">NMIMS</div>
                </div>
                <div className="grid-item">
                  <div
                    className="spjain-min-webp"
                    style={{ backgroundImage: `url(${spjainminwebp})` }}
                  />
                  <div className="text-wrapper-14">SP Jain</div>
                </div>
                <div className="grid-item">
                  <div
                    className="bml-munjal-min-png"
                    style={{ backgroundImage: `url(${bmlmunjalminpng})` }}
                  />
                  <div className="text-wrapper-14">BML</div>
                </div>
              </div>
            </div>
          </div>

          <div className="frameMobView-24">
            <div className="frameMobView-25">
              <div className="frameMobView-26">
                <div className="frameMobView-27">
                  <div className="frameMobView-28">
                    <div className="text-wrapper-15">Connect with us</div>
                  </div>

                  <div className="frameMobView-18">
                    <p className="text-wrapper-16">
                      Let us help you to hire the best
                    </p>
                  </div>

                  <div className="frameMobView-18">
                    <p className="text-wrapper-17">
                      Book a slot with our TEAM or reach out to us via
                      call/mail.
                    </p>
                  </div>
                </div>
              </div>
              <div id="book-slot-section" className="frameMobView-26">
                <div
                  className="frameMobView-29"
                  onClick={() =>
                    Navigate("/referrals/book-now/67a107c89d57a46e99582bd1")
                  }
                >
                  <div className="text-wrapper-18">Book a slot now</div>
                </div>

                <div className="frameMobView-30">
                  <div className="frameMobView-31">
                    <img
                      className="img"
                      alt="Phone"
                      src={`${bucket}Vector.svg`}
                    />

                    <div className="frameMobView-32">
                      <div className="element-2">
                        83031 56089
                        <br />
                        91298 83089
                      </div>
                    </div>
                  </div>

                  <div className="frameMobView-31">
                    <img className="img" alt="Mail" src={`${bucket}mail.svg`} />

                    <div className="frameMobView-32">
                      <div className="text-wrapper-19">info@engineerhub.in</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="enterprise-mobile-clientele-wrapper">
            <OurClientale />
          </div>

          <div className="frameMobView-33">
            <div className="frameMobView-34">
              <div className="text-wrapper-20">Why HRs support us</div>

              <img
                className="vector"
                alt="Vector"
                src={`${bucket}Vector-2.svg`}
              />
            </div>

            <div className="feedback">
              <div className="frameMobView-35">
                <div className="frameMobView-36">
                  <div className="frameMobView-34">
                    <p className="engineerhub-s">
                      EngineerHUB&#39;s interactive learning environment is a
                      game-changer for engineering students. The mentors are
                      knowledgeable and supportive, and the community is
                      collaborative and friendly.
                    </p>
                  </div>

                  <div className="frameMobView-37">
                    <div className="frameMobView-3">
                      <div className="text-wrapper-21">Mr. RB Mouli</div>
                    </div>

                    <div className="frameMobView-3">
                      <div className="text-wrapper-22">
                        Placement Head, Birla Campus
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
    </SEO>
  );
};
