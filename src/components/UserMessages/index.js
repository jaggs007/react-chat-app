import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { selectCurrentUser } from '../../store/user';
import { getInitials } from '../../helpers/string';
import './index.css';

export const UserMessages = ({
  messages,
}) => {
  const user = useSelector(selectCurrentUser);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(scrollToBottom, [messages]);
  return <div className='user_messages'>
    <div className='user_messages_list'>
      {(messages || []).map((message, i) => {
        const { id, message: body, createdAt, from } = message;
        const currentUserInitials = getInitials(`${user.firstName} ${user.lastName}`);
        const senderInitials = getInitials(from);
        const isCurrentUser = currentUserInitials === senderInitials;
        return <UserMessage
          key={createdAt}
          initials={senderInitials}
          body={body}
          align={isCurrentUser ? 'right' : 'left'}
        />
      })}
      <div ref={messagesEndRef} />

    </div>
  </div>
}

export const UserMessage = ({
  body,
  initials,
  align
}) => {
  const userMessageClassName = cs('user_message', {
    'is__left': align === 'left',
    'is__right': align === 'right',
  })
  return <div className={userMessageClassName}>
    <span className='user_message_initials'>{initials}</span>
    <span className='user_message_body'>{body}</span>
  </div>
}
