import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Avatar from "@mui/material/Avatar";
import ProfileModal from "../profileModel/profileModel";
import Drawer from "../drawer/drawer";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const sideDrawer = ({ user }) => {
  // const user = {
  //   _id: "64721d2f9fd56e81fd53f72b",
  //   name: "Hariom Kushwaha",
  //   email: "hok1234@gmail",
  //   pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxZDJmOWZkNTZlODFmZDUzZjcyYiIsImlhdCI6MTY4NTIwMTIyOCwiZXhwIjoxNjg3NzkzMjI4fQ.qCXSSq83F2DbXV7IPbFML5FFgfM_1PwEI7kIlQQmqRE",
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        padding={"5px 10px 5px 10px"}
        border={"5px"}
        sx={{ backgroundColor: "white", borderWidth: "5px" }}
      >
        <Tooltip title="Search user" arrow>
          <Button>
            <SearchIcon />
            <Typography
              display="flex"
              variant="caption"
              gutterBottom
              padding={"10px 10px 0px 10px"}
              color={"grey"}
            >
              <Drawer user={user} />
            </Typography>
          </Button>
        </Tooltip>
        <Typography fontSize={"20px"} fontFamily={"monospace"}>
          Ehub Chat
        </Typography>
        <div>
          <Button id="basic-button" startIcon={<NotificationsActiveIcon />}>
            <Menu>
              <MenuItem>Profile</MenuItem>
            </Menu>
          </Button>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar {...stringAvatar(user.name)} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <ProfileModal user={user}>
              <MenuItem>Profile</MenuItem>
            </ProfileModal>

            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default sideDrawer;
