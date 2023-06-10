import "./StudentProfilePage.css";
import { useOutletContext } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import { handleLogout } from "../../../../features/logout";
import { TextField } from "@mui/material";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiLinkedin } from "react-icons/fi";

export default function GeneralStudentData() {
  const [profile] = useOutletContext();

  return (
    <>
      <p>Profile Picture</p>
      <div>
        <div
          style={{
            backgroundImage: `url(${
              profile.image ? profile.image : defaultPoster
            })`,
          }}
          className="profile-picture"
        ></div>
      </div>
      <TextField
        name="name"
        label="Full Name"
        variant="outlined"
        value={profile.name}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      {profile.isLoggedIn && (
        <>
          {" "}
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={profile.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            name="mobile"
            label="Phone Number"
            variant="outlined"
            value={profile.mobile}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
        </>
      )}{" "}
      <TextField
        name="campus"
        label="Campus"
        variant="outlined"
        value={profile.institutionName?.collegeName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="branch"
        label="Branch"
        variant="outlined"
        value={profile.branch}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      {profile.isLoggedIn && (
        <>
          <TextField
            name="country"
            label="Country"
            variant="outlined"
            value={profile.country}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            name="state"
            label="State"
            variant="outlined"
            value={profile.state}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            value={profile.city}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <p className="mt-3">Social Links</p>
      <div className="social-links-container">
        {/* if instagram and linkedin is show a message that no social links added */}

        {profile.socialMedia?.instagram === "" &&
          profile.socialMedia?.linkedIn === "" && <p>No Social Links Added</p>}

        {profile.socialMedia?.instagram && (
          <a href={profile.socialMedia?.instagram} target="__blank">
            <div>
              <AiOutlineInstagram />
            </div>
          </a>
        )}
        {profile.socialMedia?.linkedIn && (
          <a href={profile.socialMedia?.linkedIn} target="__blank">
            <div>
              <FiLinkedin />
            </div>
          </a>
        )}
      </div>
      <p className="mt-3">Tech Stack</p>
      <div className="tech-stack-container">
        {profile.techStack.length !== 0 ? (
          profile.techStack.map((tech, index) => <div key={index}>{tech}</div>)
        ) : (
          <p>No Tech Stack Added</p>
        )}
      </div>
      <button
        className="logBtn mt-3 logout-btn"
        style={{
          textAlign: "center",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
