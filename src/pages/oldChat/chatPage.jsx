import { ChatState } from "../../contexts/chatProvider";
import { Height } from "@mui/icons-material";

import MyChat from "../../components/MyChat/myChat";
import ChatBox from "../../components/ChatBox/chatBox";

import SideDrawer from "../../components/SideDrawer/sideDrawer";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../features/getCookieValues";
import jwt_decode from "jwt-decode";

export default function Chatpage() {
  // const user = {
  //   _id: "64721d2f9fd56e81fd53f72b",
  //   name: "Hariom Kushwaha",
  //   email: "hok1234@gmail",
  //   pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxZDJmOWZkNTZlODFmZDUzZjcyYiIsImlhdCI6MTY4NTIwMTIyOCwiZXhwIjoxNjg3NzkzMjI4fQ.qCXSSq83F2DbXV7IPbFML5FFgfM_1PwEI7kIlQQmqRE",
  // };

  const token = getAccessToken();
  const decodedToken = jwt_decode(token);

  const user = {
    _id: decodedToken._id,
    name: decodeURIComponent(getCookie("name")[2]),
    email: decodeURIComponent(getCookie("email")[2]),
    pic: decodedToken.image,
    token: token,
  };

  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer user={user} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          Height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChat fetchAgain={fetchAgain} user={user}/>}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={user}/>
        )}
      </div>
    </div>
  );
}
