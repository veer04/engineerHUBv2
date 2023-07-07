import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="20px"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="purple"
      color={"whitesmoke"}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={handleFunction}
      width="fit-content"
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <span>
        {" "}
        <CloseIcon />
      </span>
    </Box>
  );
};

export default UserBadgeItem;
