import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../../contexts/chatProvider";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatLoading from "../ChatLoading/chatLoading";
import Stack from "@mui/material/Stack";
import { getSender } from "../../config/chatLogic";
import GroupChatModel from "../GroupChatModel/groupChatModel";
import { API_URL } from "../../services/APIUtils";
import { getAccessToken } from "../../features/getCookieValues";

const myChat = ({ fetchAgain, user }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          accessToken: getAccessToken(),
        },
      };

      const { data } = await axios.get(`${API_URL}api/v1/chat/App Development`, config);
      console.log(data.data);
      console.log(data);
      setChats(data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      alignItems={"center"}
      border={"2px lawngreen"}
      width={"31%"}
      borderRadius={"5px"}
      p={3}
      sx={{
        backgroundColor: "white",
        display: { base: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
      }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chat
        <GroupChatModel user={user}>
          <Button display="flex" fontSize="10px" endIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        backgroundColor="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="15px"
        overflow="hidden"
        gap={2}
      >
        {chats ? (
          <Stack overflow={scroll} spacing={2}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                backgroundColor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="5px"
                key={chat._id}
              >
                <Typography>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default myChat;
