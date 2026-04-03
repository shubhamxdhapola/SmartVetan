import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ type, name, value, onChange, placeholder, label, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <div className="space-y-2">
      <label className="font-label uppercase tracking-widest text-on-surface-variant text-[10px] font-bold ml-1 inline-block">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          Icon={Icon}
          className="w-full bg-surface-container-high border border-outline-variant/10 focus:border-primary/50 focus:ring-0 rounded-sm px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/30 transition-all text-sm"
        />
        {type == "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-lg text-on-surface-variant cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
