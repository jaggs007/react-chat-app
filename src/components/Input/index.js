import './index.css';

export const Input = ({ value, onChange , placeholder}) => {
  return <input className='input' value={value} className='input' onChange={onChange} placeholder={placeholder} />
}

export default Input;