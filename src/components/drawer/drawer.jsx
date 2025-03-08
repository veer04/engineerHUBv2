import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import ChatLoading from "../ChatLoading/chatLoading";
import UserListItem from "../UserList/userlist";
import axios from "axios";
import { ChatState } from "../../contexts/chatProvider";
export default function Drawer({ user }) {
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingChat, setLoadingChat] = React.useState(false);

  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSearch = async () => {
    // console.log("yes" + search);
    if (search.trim().length === 0) {
      <Alert severity="warning">This is a warning alert — check it out!</Alert>;
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // console.log("here2" + config.headers.Authorization);
      // console.log(search);
      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search.trim()}`,
        config
      );
      // console.log("here3");

      setLoading(false);
      setSearchResult(data);
      // console.log(searchResult);
    } catch (error) {
      // console.log(error.message);
      <Alert severity="error">error</Alert>;
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error.message);
      <Alert severity="error">error</Alert>;
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <Box
        display={"flex"}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>go</Button>
      </Box>
      <Box onClick={toggleDrawer(anchor, false)}>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult.map((user) => (
            <UserListItem
              o
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      {["Search User"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
