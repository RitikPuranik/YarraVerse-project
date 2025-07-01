// src/components/Input.jsx

export const Input = ({ value, onChange, placeholder = "", onKeyPress, className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      className={`px-4 py-2 border rounded-md outline-none w-full ${className}`}
    />
  );
};

export default Input;
