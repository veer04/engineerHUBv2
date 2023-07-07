import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      border={"wheat"}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Avatar cursor="pointer" name={user.name} src={user.pic} />
      <Box>
        <Typography>{user.name}</Typography>
        <Typography>
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
