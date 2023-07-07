import { createContext, useContext } from "react";
import { useState } from "react";
// import { useHistory } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  // const history = useHistory();

  // setUser({email:"rishabs123@gmail",password:"12345"});
  // useEffect(() => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // });

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        //     notification,
        //     setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
