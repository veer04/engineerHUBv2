import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ChatState } from "../../contexts/chatProvider";
import { useState } from "react";
import UserBadgeItem from "../UserBadge/userBadge";
import axios from "axios";
import UserListItem from "../UserList/userlist";
import { getAccessToken } from "../../features/getCookieValues";
import { API_URL } from "../../services/APIUtils";

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain, user }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat } = ChatState();

  // const user = {
  //   _id: "64721d2f9fd56e81fd53f72b",
  //   name: "Hariom Kushwaha",
  //   email: "hok1234@gmail",
  //   pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxZDJmOWZkNTZlODFmZDUzZjcyYiIsImlhdCI6MTY4NTIwMTIyOCwiZXhwIjoxNjg3NzkzMjI4fQ.qCXSSq83F2DbXV7IPbFML5FFgfM_1PwEI7kIlQQmqRE",
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      console.log("only admin can remove");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          accesstoken:getAccessToken(),
        },
      };
      const { data } = await axios.put(
        `${API_URL}api/v1/chat/removeUser`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      //   fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
    // setGroupChatName("");
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
        accesstoken:getAccessToken(),
        },
      };
      const { data } = await axios.patch(
        `${API_URL}api/v1/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error.message);
      setRenameLoading(false);
    }
    // setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("user already in group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      console.log("only admin can add");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          accessToken: getAccessToken(),
        },
      };
      const { data } = await axios.put(
        `${API_URL}api/v1/chat/addUser`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
    
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
       accesstoken: getAccessToken(),
        },
      };
      const { data } = await axios.get(
        `${API_URL}api/v1/getAllUsersForChats?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data.data);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} display="flex">
        <VisibilityIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          fontSize="35px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
        >
          {selectedChat.chatName}
        </DialogTitle>
        <DialogContent>
          <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
            display={"flex"}
          >
            <TextField
              id="outlined-basic"
              label="Chat Name"
              variant="outlined"
              mb={3}
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              color="success"
              variant="contained"
              isLoading={renameloading}
              onClick={handleRename}
              width="3px"
            >
              Update
            </Button>
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "60ch" },
            }}
            noValidate
            autoComplete="off"
            display={"flex"}
          >
            <TextField
              id="outlined-basic"
              label="Add User to group"
              variant="outlined"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>
          {loading ? (
            <span>Loading..</span>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </DialogContent>
        {/* <DialogActions>   // removed because same api is being used for both delete group and remove user
          <Button
            onClick={() => handleRemove(user)}
            color="error"
            variant="contained"
          >
            Leave Group
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default UpdateGroupChatModel;
