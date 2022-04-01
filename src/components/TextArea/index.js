
import './index.css';

export const TextArea = ({
  onChange,
  value,
  placeholder
}) => {
  return <textarea  placeholder={placeholder} onChange={onChange} value={value} />
}