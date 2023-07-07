import React from "react";
import { useEffect, useState } from "react";
import { ChatState } from "../../contexts/chatProvider";
import Box from "@mui/material/Box";
import SingleChat from "../SingleChat/singleChat";

const ChatBox = ({ fetchAgain, setFetchAgain, user }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      alignItems="center"
      p={3}
      sx={{
        backgroundColor: "white",
        display: { base: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
      }}
      width={{ base: "100%", md: "68%" }}
      borderRadius="5px"
      borderWidth="2px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={user}/>
    </Box>
  );
};

export default ChatBox;
