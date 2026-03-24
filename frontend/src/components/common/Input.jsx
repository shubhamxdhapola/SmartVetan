import { useState } from "react";

const Input = ({ type, name, value, onChange, placeholder, label, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <div>
      <span>{label}</span>
      <div>
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          Icon={Icon}
        />
        {type == "password" && (
          <button type="button" onClick={togglePassword}>
            {showPassword ? <span>Hide</span> : <span>Show</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
