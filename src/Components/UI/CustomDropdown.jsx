/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { createPortal } from "react-dom";

const CustomDropdown = ({ field, options, placeholder, value, icon, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(event.target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(field, selectedValue);
    setIsOpen(false);
  };

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0, width: 0 };
    
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    };
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <motion.div
        ref={triggerRef}
        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 bg-white cursor-pointer flex items-center justify-between text-base sm:text-lg"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-purple-500">{icon}</span>}
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>

      {/* Dropdown Portal */}
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${getDropdownPosition().top}px`,
            left: `${getDropdownPosition().left}px`,
            width: `${getDropdownPosition().width}px`,
            zIndex: 9999,
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto"
            >
              {options.map((option) => (
                <motion.div
                  key={option.value}
                  className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center justify-between text-base sm:text-lg border-b border-purple-100 last:border-b-0"
                  whileHover={{ backgroundColor: "#f3e8ff" }}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-purple-500"
                    >
                      <FaCheck />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CustomDropdown;