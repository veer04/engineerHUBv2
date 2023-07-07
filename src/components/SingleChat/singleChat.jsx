import { Box, IconButton, Typography } from '@mui/material';
import React from 'react'

import {useEffect,useState} from 'react'
import { ChatState } from "../../contexts/chatProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender,getSenderFull } from '../../config/chatLogic';
import ProfileModal from '../profileModel/profileModel';
import UpdateGroupChatModel from '../UpdateGroupChatModel/updateGroupChatModel'
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import "../SingleChat/singleChatStyle.css"
import ScrollableChat from '../ScrollableChat/scrollableChat';
import Lottie from "react-lottie";
import animationData from "../../animation/typing.json";
import { API_URL } from '../../services/APIUtils';
import io from "socket.io-client";
import getCookie, { getAccessToken } from '../../features/getCookieValues';
const ENDPOINT = "https://backend.ehubbusiness.com/"; // "https://ehub.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain,user}) => {

        const [messages, setMessages] = useState([]);
        const [loading, setLoading] = useState(false);
        const [newMessage, setNewMessage] = useState("");
        const [socketConnected, setSocketConnected] = useState(false);
        const [typing, setTyping] = useState(false);
        const [istyping, setIsTyping] = useState(false);

     const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
  };


    const sendMessage = async(event) =>{
        
        if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
    event.preventDefault();
      try {
        const config = {
          headers: {
           accesstoken: getAccessToken(),
          },
        };
        
        setNewMessage("");
        const { data } = await axios.post(
          `${API_URL}api/v1/chatMessage`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
    
        socket.emit("new message", data);
        console.log(data);
        setMessages([...messages, data.data]);
      } catch (error) {
        console.log(error.message)
      }
      
    }
    }

     const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
      accesstoken: getAccessToken(),
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}api/v1/chatMessage/${selectedChat._id}`, //change api route after discussion with backend
        config
      );

      // console.log(messages)
      setMessages(data.data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error.message)
    }
  };

   useEffect(() => {
  //   const user ={
  //     _id: getCookie("_id"),
  //     name: getCookie("name"),
  //     email: getCookie("email"),
  //     pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //     token: getAccessToken(),
  // };

  console.log(user);
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
   
  }, [selectedChat]);



  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain((prev)=>!prev);
        }
      } else {
        setMessages((prev)=>[...prev, newMessageRecieved]);
      }
    });
    return () => socket.off('message received');
  },[socket]);


    const typingHandler =async(e) =>{
        setNewMessage(e.target.value);

         if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
    }


  return (
    <>
        {
            selectedChat?(<>
            <Typography
            fontSize={{ sx: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent= "space-between"
            alignItems="center"
          >
            {/* <IconButton
            //   display={'flex'}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            /> */}
                {
                    !selectedChat.isGroupChat?(<>
                    {getSender(user,selectedChat.users)}
                    <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                    </>):(
                        <>
                        {
                            selectedChat.chatName.toUpperCase()
                        }
                        <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}
                        user={user}/>
                        </>
                    )
                }


          </Typography>
                <Box
                sx={{
            backgroundColor: '#E8E8E8',
        //    overflow: 'auto',
            flexDirection:'column',
           
          }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    p={3}
                    background="#E8E8E8"
                    width="100%"
                    height="600px"
                    borderRadius="5px"
                    >
                    {loading?<CircularProgress
                    size="80px"
                    width={20}
                    height={20}
                    alignItems="center"
                    margin="auto"
                    />:<div className='message'>
                        <ScrollableChat messages={messages} user={user}/>
                        </div>}

                       <Box
                       component="form"
                        onKeyDown={sendMessage}
                        // sx={{overflow: 'auto'}}
                        >
                             {istyping ? (
                                <div>
                                <Lottie
                                    options={defaultOptions}
                                    // height={50}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0 }}
                                />
                                </div>
                            ) : (
                                <></>
                            )}
                         <TextField fullWidth id="filled-basic" label="enter a message" variant="filled"
                         value={newMessage}
                         onChange={typingHandler}
                         />
                        </Box>
                </Box>
            </>):(
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Typography fontSize="30px" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
            )
        }
    </>
  )
}

export default SingleChat;