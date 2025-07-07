/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaLightbulb,
  FaTrophy,
  FaShareAlt,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaCamera,
} from "react-icons/fa";
import { GiTwoCoins, GiDiamondRing, GiPartyPopper } from "react-icons/gi";
import { toPng } from "html-to-image";

const CalculationResult = ({ result }) => {
  const resultCardRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Use the new utility function
  const handleShareImage = async () => {
    if (!resultCardRef.current) return;
    try {
      const dataUrl = await toPng(resultCardRef.current, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = `dahej_calculation_result_${result.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // Share on social media
  const shareOnTwitter = () => {
    const text = `I just calculated my marriage market value with the Dahej Calculator! My score: ${
      result.totalScore
    } points (${result.category.name}) worth ${formatCurrency(
      result.dahejAmount
    )}! Check it out at dahej.fun`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    const text = `I just calculated my marriage market value with the Dahej Calculator! My score: ${
      result.totalScore
    } points (${result.category.name}) worth ${formatCurrency(
      result.dahejAmount
    )}! Check it out at dahej.fun`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        "https://dahej.fun"
      )}`,
      "_blank"
    );
  };

  return (
    <div
      id="calculation-result"
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-10 sm:py-20 px-4 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-4 sm:left-10 text-yellow-400 text-4xl sm:text-6xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <GiPartyPopper />
        </motion.div>

        <motion.div
          className="absolute top-40 right-4 sm:right-20 text-green-400 text-5xl sm:text-7xl"
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GiTwoCoins />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-4 sm:left-20 text-pink-400 text-6xl sm:text-8xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GiDiamondRing />
        </motion.div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🎉 Results Are In! 🎉
          </motion.h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium">
            Hey {result.name}, here's your matrimonial market analysis! 📊
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          ref={resultCardRef}
          className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 shadow-3xl border-2 border-gradient-to-r from-purple-200 to-pink-200 mb-8 relative"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl sm:text-8xl md:text-9xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {result.category.emoji}
            </motion.div>

            <motion.h3
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color:
                  result.category.color &&
                  result.category.color.startsWith("oklch")
                    ? "#8B5CF6" // Default to purple if oklch
                    : result.category.color,
              }}
            >
              {result.category.name}
            </motion.h3>

            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-4"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Estimated Dahej: {formatCurrency(result.dahejAmount)}
            </motion.div>

            <div className="text-lg sm:text-xl text-gray-700 bg-gray-100 rounded-2xl p-4 mb-6">
              <strong>Market Score:</strong> {result.totalScore} / 2000 points
            </div>

            <p className="text-lg sm:text-xl text-gray-600 italic">
              {result.recommendation}
            </p>
          </div>
        </motion.div>

        {/* Share Options - updated to use the new utility */}
        <motion.div
          className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaShareAlt className="text-2xl sm:text-3xl text-purple-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Share Your Results!
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareImage}
            >
              <FaShareAlt className="text-xl" />
              <span className="font-bold">Save Image</span>
            </motion.button>

            {/* Add manual screenshot option */}
            <motion.button
              className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                alert(
                  "To take a screenshot manually:\n\n1. On Windows: Press Win+Shift+S\n2. On Mac: Press Cmd+Shift+4\n3. On Mobile: Use your device's screenshot feature"
                );
              }}
            >
              <FaCamera className="text-xl" />
              <span className="font-bold">Take Screenshot</span>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareOnTwitter}
            >
              <FaTwitter className="text-xl" />
              <span className="font-bold">Twitter</span>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareOnWhatsApp}
            >
              <FaWhatsapp className="text-xl" />
              <span className="font-bold">WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Detailed Breakdown */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8"
          variants={containerVariants}
        >
          {Object.entries(result.breakdown).map(([category, data]) => (
            <motion.div
              key={category}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl border border-purple-200"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl sm:text-3xl">
                  {getCategoryIcon(category)}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                  {category} Score
                </h4>
                <div className="ml-auto text-lg sm:text-xl font-bold text-green-600">
                  +{data.score}
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {data.factors.map((factor, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <span className="font-medium text-gray-800">
                        {factor.factor}
                      </span>
                      <p className="text-sm text-gray-600">
                        {factor.description}
                      </p>
                    </div>
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        factor.impact.includes("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {factor.impact}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Facts Section */}
        <motion.div
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaLightbulb className="text-2xl sm:text-3xl text-yellow-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Fun Facts About You!
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.funFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="bg-white/80 rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="text-base sm:text-lg text-gray-700">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Comparison */}
        <motion.div
          className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-2xl sm:text-3xl text-blue-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Market Comparison
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.comparison.map((comp, index) => (
              <motion.div
                key={index}
                className="bg-white/80 rounded-xl p-4 shadow-lg flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-base sm:text-lg text-gray-700">
                  vs {comp.item}
                </span>
                <span
                  className={`font-bold text-base sm:text-lg ${
                    comp.value.includes("More")
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {comp.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Trends */}
        <motion.div
          className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-6 sm:p-8 shadow-2xl"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaTrophy className="text-2xl sm:text-3xl text-pink-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Market Trends 2024
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 rounded-xl p-4 shadow-lg">
              <h4 className="font-bold text-lg text-gray-800 mb-3">
                🔥 Hot Professions
              </h4>
              <ul className="space-y-2">
                {result.marketTrends.popularProfessions.map((prof, index) => (
                  <li key={index} className="text-gray-700">
                    • {prof}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 rounded-xl p-4 shadow-lg">
              <h4 className="font-bold text-lg text-gray-800 mb-3">
                📈 Rising Trends
              </h4>
              <ul className="space-y-2">
                {result.marketTrends.risingTrends.map((trend, index) => (
                  <li key={index} className="text-gray-700">
                    • {trend}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 rounded-xl p-4 shadow-lg">
              <h4 className="font-bold text-lg text-gray-800 mb-3">
                🏙️ Trending Cities
              </h4>
              <ul className="space-y-2">
                {result.marketTrends.trendingCities.map((city, index) => (
                  <li key={index} className="text-gray-700">
                    • {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white/80 rounded-xl p-4 shadow-lg">
            <p className="text-lg text-gray-700 italic">
              💡 <strong>Market Insight:</strong>{" "}
              {result.marketTrends.marketInsight}
            </p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          variants={itemVariants}
        >
          <p className="text-base sm:text-lg text-gray-600 italic bg-yellow-50 rounded-2xl p-4 sm:p-6">
            <strong>Disclaimer:</strong> This is purely for entertainment
            purposes! Real relationships are built on love, trust, and
            understanding - not calculations! Please don't use this for actual
            marriage decisions! 😄❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const icons = {
    personal: "👤",
    professional: "💼",
    financial: "💰",
    social: "👥",
    lifestyle: "🏡",
  };
  return icons[category] || "📊";
};

export default CalculationResult;
