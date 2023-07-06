import { Avatar, Tooltip } from '@mui/material'
import * as React from 'react'

import {isSameSender,isLastMessage,isSameSenderMargin,isSameUser} from '../../config/chatLogic'

import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({messages}) => {

    // const { user } = ChatState();
    const user ={
    _id: "64721d2f9fd56e81fd53f72b",
    name: "Hariom Kushwaha",
    email: "hok1234@gmail",
    pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxZDJmOWZkNTZlODFmZDUzZjcyYiIsImlhdCI6MTY4NTIwMTIyOCwiZXhwIjoxNjg3NzkzMjI4fQ.qCXSSq83F2DbXV7IPbFML5FFgfM_1PwEI7kIlQQmqRE"
};
 

  return (
    <ScrollableFeed>{messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}</ScrollableFeed>
  )
}

export default ScrollableChat