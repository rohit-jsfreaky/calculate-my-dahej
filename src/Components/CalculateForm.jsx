import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalculator,
  FaCar,
  FaHome,
  FaInstagram,
  FaGraduationCap,
} from "react-icons/fa";
import { GiTwoCoins, GiDiamondRing, GiCastle } from "react-icons/gi";
import { calculateDahej } from "../utils/dahejCalculator";

// Import modular components
import FormInput from "./UI/FormInput";
import CustomDropdown from "./UI/CustomDropdown";
import FormSection from "./UI/FormSection";

// Import form options
import {
  occupations,
  educationLevels,
  familyBackgrounds,
  genderOptions,
  booleanOptions,
} from "../utils/formOptions";

const CalculateForm = ({ onCalculationComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    netWorth: "",
    education: "",
    familyBackground: "",
    caste: "",
    carOwned: "",
    ownsHouse: "",
    city: "",
    skills: "",
    socialFollowing: "",
    confidenceLevel: 5,
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);

    // Calculate dahej
    const result = calculateDahej(formData);

    // Simulate calculation time for better UX
    setTimeout(() => {
      setIsCalculating(false);
      onCalculationComplete(result);

      // Smooth scroll to result section
      const resultElement = document.getElementById("calculation-result");
      if (resultElement) {
        resultElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div
      id="calculate-form"
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 sm:py-20 px-4 relative"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-4 sm:left-10 text-yellow-400 text-2xl sm:text-4xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <GiTwoCoins />
        </motion.div>

        <motion.div
          className="absolute top-40 right-4 sm:right-20 text-pink-400 text-3xl sm:text-5xl"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GiDiamondRing />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-4 sm:left-20 text-purple-400 text-4xl sm:text-6xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GiCastle />
        </motion.div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Form Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 px-4">
            Tell Us About Yourself! 🎭
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 px-4">
            Fill in the details and discover your "market value" 😂
          </p>
        </motion.div>

        {/* Form Container */}
        <FormSection>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Personal Information Section */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
            >
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <FormInput
                  label="Your Name 👤"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your awesome name"
                  required={true}
                  icon={<FaUser className="text-purple-500" />}
                />
              </motion.div>

              {/* Age Field */}
              <motion.div variants={itemVariants}>
                <FormInput
                  label="🎂 Your Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Young = Higher Value! 😉"
                  required={true}
                />
              </motion.div>

              {/* Gender Field */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  ⚧️ Gender
                </label>
                <CustomDropdown
                  field="gender"
                  options={genderOptions}
                  placeholder="Select Gender"
                  value={formData.gender}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* Occupation Field */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  💼 Occupation
                </label>
                <CustomDropdown
                  field="occupation"
                  options={occupations}
                  placeholder="Select Occupation"
                  value={formData.occupation}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* Net Worth Field */}
              <motion.div variants={itemVariants}>
                <FormInput
                  label="💎 Net Worth (₹)"
                  name="netWorth"
                  type="number"
                  value={formData.netWorth}
                  onChange={handleInputChange}
                  placeholder="Enter your net worth"
                />
              </motion.div>

              {/* Education Field */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  <FaGraduationCap className="text-blue-500" />
                  Education
                </label>
                <CustomDropdown
                  field="education"
                  options={educationLevels}
                  placeholder="Select Education"
                  value={formData.education}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* Family Background */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  🏰 Family Background
                </label>
                <CustomDropdown
                  field="familyBackground"
                  options={familyBackgrounds}
                  placeholder="Select Family Background"
                  value={formData.familyBackground}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* Car Owned */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  <FaCar className="text-red-500" />
                  Car Owned?
                </label>
                <CustomDropdown
                  field="carOwned"
                  options={booleanOptions}
                  placeholder="Do you own a car?"
                  value={formData.carOwned}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* House Owned */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                  <FaHome className="text-green-500" />
                  Owns House?
                </label>
                <CustomDropdown
                  field="ownsHouse"
                  options={booleanOptions}
                  placeholder="Do you own a house?"
                  value={formData.ownsHouse}
                  onChange={handleDropdownSelect}
                />
              </motion.div>

              {/* City */}
              <motion.div variants={itemVariants}>
                <FormInput
                  label="🏙️ City of Residence"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </motion.div>

              {/* Social Media Following */}
              <motion.div variants={itemVariants}>
                <FormInput
                  label="Social Media Following"
                  name="socialFollowing"
                  type="number"
                  value={formData.socialFollowing}
                  onChange={handleInputChange}
                  placeholder="Number of followers"
                  icon={<FaInstagram className="text-pink-500" />}
                />
              </motion.div>
            </motion.div>

            {/* Skills/Hobbies */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                🎨 Skills/Hobbies
              </label>
              <motion.textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-all duration-300 text-base sm:text-lg resize-none"
                placeholder="Tell us your hidden talents! 🌟"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Confidence Level Slider */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700 mb-3">
                ⚡ Self Confidence Level: {formData.confidenceLevel}/10
              </label>
              <motion.div className="relative">
                <input
                  type="range"
                  name="confidenceLevel"
                  min="0"
                  max="10"
                  value={formData.confidenceLevel}
                  onChange={handleInputChange}
                  className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2">
                  <span>😢 Shy</span>
                  <span>😎 Confident</span>
                  <span>🔥 Overconfident</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center pt-4 sm:pt-8"
              variants={itemVariants}
            >
              <motion.button
                type="submit"
                disabled={isCalculating}
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-2xl font-bold rounded-full shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{
                  scale: isCalculating ? 1 : 1.05,
                  boxShadow: isCalculating
                    ? "0 15px 30px rgba(0,0,0,0.2)"
                    : "0 25px 50px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: isCalculating ? 1 : 0.95 }}
                animate={
                  isCalculating
                    ? {
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 15px 30px rgba(0,0,0,0.2)",
                          "0 20px 40px rgba(0,0,0,0.3)",
                          "0 15px 30px rgba(0,0,0,0.2)",
                        ],
                      }
                    : {
                        boxShadow: [
                          "0 15px 30px rgba(0,0,0,0.2)",
                          "0 20px 40px rgba(0,0,0,0.3)",
                          "0 15px 30px rgba(0,0,0,0.2)",
                        ],
                      }
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <motion.div
                  animate={{ rotate: isCalculating ? [0, 360] : 0 }}
                  transition={{
                    duration: 1,
                    repeat: isCalculating ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <FaCalculator className="text-xl sm:text-2xl" />
                </motion.div>
                {isCalculating ? "Calculating..." : "Calculate My Dahej!"} 💰
                {!isCalculating && (
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                )}
              </motion.button>
            </motion.div>
          </form>
        </FormSection>
      </motion.div>
    </div>
  );
};

export default CalculateForm;
