import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user";
import Login from "../Login";
import './index.css';

const ChatMessage = () => {
  const { firstName, lastName } = useSelector(selectCurrentUser);

  return <div className='chat_message'>
    {
      !firstName && !lastName
        ? <Login />
        : <>
          Chat Message
        </>
    }
  </div>
}

export default ChatMessage;