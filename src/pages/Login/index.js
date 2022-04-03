import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import Input from "../../components/Input"
import { selectCurrentUser, setCurrentUser } from "../../store/user";
import './index.css';

export const Login = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [])

  const handleFistNameChange = (e) => {
    setError(null);
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setError(null);
    setLastName(e.target.value);
  }

  const onLogin = () => {
    if (!firstName && !lastName) {
      setError({
        message: 'First name and and last name is required'
      })
    } else if (!firstName) {
      setError({
        message: 'First name is required'
      })
    } else if (!lastName) {
      setError({
        message: 'Last name is required'
      })
    } else {
      dispatch(setCurrentUser({ firstName, lastName }))
    }
  }

  return <div className='login'>
    <div className="login_header">
      <h1>Welcome to the chat</h1>
      <span>To get started, please enter your name details.</span>
    </div>
    <div className="login_body">
      <Input value={firstName} placeholder='First name' onChange={handleFistNameChange} />
      <Input value={lastName} placeholder='Last name' onChange={handleLastNameChange} />
    </div>
    {!!error &&
      <div className='login_error'>
        {error.message}
      </div>
    }
    <div className="login_footer">
      <Button text='Login' onClick={onLogin} />
      <Button text='Clear Storage' onClick={() => localStorage.clear()} />
    </div>
  </div>
}

export default Login;