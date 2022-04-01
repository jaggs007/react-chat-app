import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { UserMessages } from "../../components/UserMessages";
import { selectCurrentUser } from "../../store/user";
import Login from "../Login";
import './index.css';

const ChatMessage = () => {
  const { firstName, lastName } = useSelector(selectCurrentUser);
  const [newMessage, setNewMessage] = useState('');

  const onMessageChange = (e) => {
    setNewMessage(e.target.value);
  }

  let messageId = 0

  const onSend = () => {
    var storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessages = [...storedMessages, {
      id: messageId++,
      message: newMessage,
      createdAt: Date.now(),
      from: `${firstName} ${lastName}`
    }]
    localStorage.setItem('messages', JSON.stringify(newMessages))
    setNewMessage('')
  }

  var allMessages = JSON.parse(localStorage.getItem("messages"));

  return <div className='chat_message'>
    {
      !firstName && !lastName
        ? <Login />
        : <>
          <div className='chat_message_messages'>
            <UserMessages
              messages={allMessages}
            />
          </div>
          <div className='chat_message_footer'>
            <TextArea value={newMessage} onChange={onMessageChange} placeholder='Type message' />
            <Button text='Send' onClick={onSend} />
          </div>
        </>
    }
  </div>
}

export default ChatMessage;