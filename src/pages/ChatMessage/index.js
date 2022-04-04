import { useEffect, useRef, useState } from "react";
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
  const [allMessages, setAllMessages] = useState([]);
  const messagesRef = useRef(null);
  const [itemPerPage, setItemPerPage] = useState(25);
  const [filteredMessages, setFilteredMessages] = useState([]);
  
  useEffect(() => {
    setInterval(() => {
      const storedMessages = JSON.parse(localStorage.getItem("messages"));
      setAllMessages(storedMessages)
    }, 1000)
  }, [])

  useEffect(() => {
    setFilteredMessages(allMessages.slice(allMessages.length - itemPerPage, allMessages.length))
  }, [itemPerPage, allMessages])

  const onMessageChange = (e) => {
    setNewMessage(e.target.value);
  }

  const onScroll = () => {
    if (messagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
      if (scrollTop === 0 && allMessages.length > itemPerPage) {
        if (allMessages.length > (itemPerPage + 10)) {
          setItemPerPage(itemPerPage + 10)
          setFilteredMessages(allMessages.slice(allMessages.length - (itemPerPage + 10), allMessages.length))
        } else {
          setItemPerPage(allMessages.length)
          setFilteredMessages(allMessages)
        }
      }
    }
  };

  const onSend = () => {
    if (!newMessage) return;
    var storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessages = [...storedMessages, {
      id: Math.random(),
      message: newMessage,
      createdAt: Date.now(),
      from: `${firstName} ${lastName}`
    }]
    localStorage.setItem('messages', JSON.stringify(newMessages))
    setNewMessage('')
  }

  return <div className='chat_message'>
    {
      !firstName && !lastName
        ? <Login />
        : <>
          <UserMessages
            messageRef={messagesRef}
            messages={filteredMessages}
            onScroll={onScroll}
          />
          <div className='chat_message_footer'>
            <TextArea value={newMessage} onChange={onMessageChange} placeholder='Type message' />
            <Button text='Send' onClick={onSend} />
          </div>
        </>
    }
  </div>
}

export default ChatMessage;