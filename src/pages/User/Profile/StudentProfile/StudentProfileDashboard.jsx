import React from "react";
import { useEffect, useState } from "react";
import "../../../../../src/components/ProfileSection/ProfilePopUp/ProfilePopUp.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import { Instagram } from "@mui/icons-material";
import defaul_profile_icon from "../../../../pages/Profile/CompanyDashboard/default_profile_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { RiSuitcase2Line } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  getUserFullName,
  getUserId,
  getUserName,
  getUserImage,
  getUserRole,
  getUserEmail,
} from "../../../../features/User/UserDetails";
import { getUserProfileById, controller } from "../../../../services/APIConfig";
const StudentProfileDashboard = () => {
  const [progress, setProgress] = useState(0);
  const [profileProgress, setProfileProgress] = useState(100);
  const userFullName = getUserFullName();
  const userName = getUserName();
  const userId = useParams();
  const userEmail = getUserEmail();
  const [userDetailsById, setUserDetailsById] = useState(null);
  useEffect(() => {
    getUserProfileById(setUserDetailsById, userId);
    return () => {
      controller.abort();
    };
  });
  useEffect(() => {
    console.log(userDetailsById);
  }, [userDetailsById]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= profileProgress ? profileProgress : prevProgress + 2
      );
    }, 60);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const userImage = getUserImage();
  return (
    <div className="container">
      <div
        className="HeaderText"
        style={{
          fontSize: "2rem",
          color: " rgba(0, 43, 54, 1)",
          fontWeight: "600",
          marginTop: "2%",
          lineHeight: "2.7rem",
        }}
      >
        Profile
      </div>

      <div className="HeaderTxtLorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        placeat alias harum. Saepe voluptatum consequuntur nisi atque adipisci
        eum, doloribus recusandae obcaecati impedit laboriosam asperiores
        similique quis temporibus quibusdam eligendi.
      </div>
      <div
        style={{
          margin: "4%",
          padding: "2%",
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="row">
            <div className="col-lg-3">
              <div className="profile-picture">
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    width: "5rem",
                    height: "5rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    className="progress-bar"
                    sx={{
                      color: "rgba(8, 224, 69, 1)",
                    }}
                    variant="determinate"
                    value={progress}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="image"
                      src={userImage}
                      width={40}
                      height={40}
                      alt="Profile Picture"
                    />
                  </Box>
                </Box>
                <div className="progress-counter">{`${progress}%`}</div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">@{userName}</div>
              <div
                className="row"
                style={{
                  color: "rgba(0, 43, 54, 1)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                }}
              >
                {userFullName}
              </div>
              <div className="row">
                The Indian Institute of Technology Bombay (IIT Bombay) Powai,
                Mumbai,Maharastra,India.
              </div>
              <div className="row">{userEmail}</div>
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
              </div>
              <div className="row">
                <div
                  className="col-lg-4"
                  style={{
                    padding: "5%",
                  }}
                >
                  <LinkedIn></LinkedIn>
                </div>
                <div
                  className="col-lg-4"
                  style={{
                    padding: "5%",
                  }}
                >
                  <GitHub></GitHub>
                </div>
                <div
                  className="col-lg-4"
                  style={{
                    padding: "5%",
                  }}
                >
                  <Instagram></Instagram>
                </div>
              </div>
              <div
                className="row "
                style={{
                  marginLeft: "3%",
                  marginTop: "5%",
                  background: "#002b36",
                  padding: "2%",
                  width: "220px",
                  color: "#fff",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                type="button"
              >
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: "400",
                  }}
                >
                  Edit Profile{" "}
                </p>
              </div>
              <div
                className="row "
                style={{
                  marginLeft: "3%",
                  marginTop: "5%",
                  background: "#fff",
                  padding: "2%",
                  width: "220px",
                  color: "#002b36",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 1px #002b36",
                  fontWeight: "400",
                }}
                type="button"
              >
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: "400",
                  }}
                >
                  Upload Resume{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "4%",
          padding: "2%",
        }}
      >
        <div className="container">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                margin: "10px",
              }}
            >
              <div>
                About Me
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Write something about yourself. To make your profile
                    stand-out from the rest.
                  </small>
                </div>
              </div>
            </div>

            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                gap: "2",
                margin: "10px",
              }}
            >
              <div>
                My Skills
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Add your Skills to stand Out from the rest.
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* second Row */}
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                margin: "10px",
              }}
            >
              <div>
                Education
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Showcase your education.
                  </small>
                </div>
              </div>
            </div>

            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                margin: "10px",
              }}
            >
              <div>
                Projects
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Add some exciting projects to uplift your profile.
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* third row */}
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                margin: "10px",
              }}
            >
              <div>
                My Interest
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Add your personal experience which you enjoy doing in your
                    free time.
                  </small>
                </div>
              </div>
            </div>

            <div
              className="col-lg-5"
              style={{
                background: "#fff",
                color: "#002b36",
                fontWeight: "600",
                fontSize: "1.3rem",
                padding: "1%",
                margin: "10px",
              }}
            >
              <div>
                Experience
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(176, 189, 193, 1)",
                      borderRadius: "5px",
                      height: "40px",
                      width: "250px",
                    }}
                  >
                    <AiFillPlusCircle />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small style={{ fontSize: "0.8rem", color: "grey" }}>
                    Share your Work experience.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container"></div>
      </div>
    </div>
  );
};

export default StudentProfileDashboard;
