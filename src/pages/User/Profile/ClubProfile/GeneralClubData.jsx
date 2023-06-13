import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import { handleLogout } from "../../../../features/logout";
import { TextField } from "@mui/material";

export default function GeneralClubData() {
  const [profile, isLoggedIn] = useOutletContext();

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
        name="userName"
        label="Username"
        variant="outlined"
        value={profile.userName}
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
        name="campus"
        label="Campus"
        variant="outlined"
        value={profile.collegeId?.collegeName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="campusType"
        label="Campus Type"
        variant="outlined"
        value={profile.clubType}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="website"
        label="Website"
        variant="outlined"
        value={profile.websiteUrl}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        value={profile.description}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      {isLoggedIn && (
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
