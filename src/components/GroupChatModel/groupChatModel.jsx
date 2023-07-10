import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { ChatState } from "../../contexts/chatProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import UserListItem from "../UserList/userlist";
import Alert from "@mui/material/Alert";
import UserBadgeItem from "../UserBadge/userBadge";
import { getAccessToken } from "../../features/getCookieValues";
import { API_URL } from "../../services/APIUtils";
const GroupChatModel = ({ children,user }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const { chats, setChats } = ChatState();

  // const user = {
  //   _id: "64721d2f9fd56e81fd53f72b",
  //   name: "Hariom Kushwaha",
  //   email: "hok1234@gmail",
  //   pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxZDJmOWZkNTZlODFmZDUzZjcyYiIsImlhdCI6MTY4NTIwMTIyOCwiZXhwIjoxNjg3NzkzMjI4fQ.qCXSSq83F2DbXV7IPbFML5FFgfM_1PwEI7kIlQQmqRE",
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    console.log(query);
    if (query.trim().length === 0) {
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
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers?.includes(userToAdd)) {
      <Alert severity="info">This is an information message!</Alert>;
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers?.filter((sel) => sel?._id !== delUser?._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      <Alert severity="info">This is an information message!</Alert>;
      return;
    }

    try {
      const config = {
        headers: {
          accesstoken:getAccessToken(),
        },
      };
      const { data } = await axios.post(
        `${API_URL}api/v1/chat/group`,
        {
          chatName: groupChatName,
          users: selectedUsers?.map((u) => u._id),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      <Alert severity="info">This is an information message!</Alert>;
    } catch (error) {
      console.log(error.message);
      <Alert severity="info">This is an information message!</Alert>;
    }
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        {children}
      </span>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          fontSize={"35px"}
          fontFamily={"monospace"}
          display={"flex"}
          justifyContent={"center"}
        >
          Creat Group Chat
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <TextField
              id="outlined-basic"
              label="Chat Name"
              variant="outlined"
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Add Users eg: John, Piyush, Jane"
              variant="outlined"
              mb={1}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Box display={"flex"} flexWrap={"wrap"}>
              {" "}
              {selectedUsers?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </Box>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create Group</Button>
          {/* <Button onClick={handleClose}></Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GroupChatModel;
