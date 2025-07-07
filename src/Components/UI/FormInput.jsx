/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  required = false,
  icon
}) => {
  return (
    <div className="form-field">
      <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
        {icon && icon}
        {label}
      </label>
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-all duration-300 text-base sm:text-lg"
        placeholder={placeholder}
        whileFocus={{ scale: 1.02 }}
        required={required}
      />
    </div>
  );
};

export default FormInput;