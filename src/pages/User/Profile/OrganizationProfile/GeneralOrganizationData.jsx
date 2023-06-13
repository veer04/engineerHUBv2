import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext } from "react-router-dom";
import defaultPoster from "../../../../assets/defaultPoster";
import { handleLogout } from "../../../../features/logout";
import { TextField } from "@mui/material";

export default function GeneralOrganizationData() {
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
        name="companyName"
        label="Company Name"
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
        name="websiteURL"
        label="Website URL"
        variant="outlined"
        value={profile.webSiteURL}
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
