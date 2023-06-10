import "./StudentProfilePage.css";
import { useOutletContext } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import { handleLogout } from "../../../../features/logout";
import { TextField } from "@mui/material";

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

      <TextField
        name="instagram"
        label="Instagram"
        variant="outlined"
        value={
          profile.socialMedia?.instagram
            ? profile.socialMedia?.instagram
            : "N/A"
        }
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />

      <TextField
        name="linkedIn"
        label="linkedIn"
        variant="outlined"
        value={
          profile.socialMedia?.linkedIn ? profile.socialMedia?.linkedIn : "N/A"
        }
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />

      {profile.techStack.length !== 0 &&
        profile.techStack.map((tech, index) => <p key={index}>{tech}</p>)}

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
