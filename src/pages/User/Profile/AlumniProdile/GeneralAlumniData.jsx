import "./AlumniProfilePage.css";
import { useOutletContext } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import { handleLogout } from "../../../../features/logout";
import { TextField } from "@mui/material";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiLinkedin, FiTwitter } from "react-icons/fi";

export default function GeneralAlumniData() {
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
      <TextField
        name="name"
        label="Username"
        variant="outlined"
        value={profile.userName}
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
      )}

      <TextField
        name="company"
        label="Company"
        variant="outlined"
        value={profile.companyName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="designation"
        label="Designation"
        variant="outlined"
        value={profile.currentProfile}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="campus"
        label="Campus"
        variant="outlined"
        value={profile.campus?.collegeName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="batch"
        label="Batch"
        variant="outlined"
        value={profile.batch}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="about"
        label="About Me"
        variant="outlined"
        value={profile.aboutMe}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <p className="mt-3">Social Links</p>
      <div className="social-links-container">
        {profile.socialMedia?.instagram === "" &&
          profile.socialMedia?.linkedIn === "" &&
          profile.socialMedia?.twitter === "" && <p>No Social Links Added</p>}

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
        {profile.socialMedia?.twitter && (
          <a href={profile.socialMedia?.twitter} target="__blank">
            <div>
              <FiTwitter />
            </div>
          </a>
        )}
      </div>
      {/* <p className="mt-3">Tech Stack</p>
      <div className="tech-stack-container">
        {profile.techStack.length !== 0 ? (
          profile.techStack.map((tech, index) => <div key={index}>{tech}</div>)
        ) : (
          <p>No Tech Stack Added</p>
        )}
      </div> */}
      {profile.isLoggedIn && (
        <button
          className="logBtn mt-3 logout-btn"
          style={{
            textAlign: "center",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </>
  );
}
