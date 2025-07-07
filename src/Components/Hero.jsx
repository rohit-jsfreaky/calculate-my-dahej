/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCalculator, FaRing, FaCoins } from "react-icons/fa";
import { GiTwoCoins, GiDiamondRing, GiGoldBar } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";

const Hero = () => {
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Floating animation variants
  const floatingIcons = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleAnimation = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleCalculateClick = () => {
    // Smooth scroll to calculator form
    const formElement = document.getElementById('calculate-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Coins */}
        <motion.div
          className="absolute top-20 left-10 text-yellow-400 text-4xl md:text-6xl"
          variants={floatingIcons}
          animate="animate"
          style={{ y }}
        >
          <GiTwoCoins />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-yellow-500 text-3xl md:text-5xl"
          variants={floatingIcons}
          animate="animate"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        >
          <FaCoins />
        </motion.div>

        {/* Floating Rings */}
        <motion.div
          className="absolute bottom-40 left-20 text-pink-400 text-5xl md:text-7xl"
          variants={floatingIcons}
          animate="animate"
          style={{ rotate }}
        >
          <GiDiamondRing />
        </motion.div>

        <motion.div
          className="absolute top-60 right-10 text-purple-400 text-4xl md:text-6xl"
          variants={floatingIcons}
          animate="animate"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        >
          <FaRing />
        </motion.div>

        {/* Gold Bars */}
        <motion.div
          className="absolute bottom-20 right-40 text-yellow-600 text-3xl md:text-5xl"
          variants={floatingIcons}
          animate="animate"
          style={{ y }}
        >
          <GiGoldBar />
        </motion.div>

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-2xl md:text-4xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={sparkleAnimation}
            animate="animate"
            transition={{ delay: i * 0.3 }}
          >
            <HiSparkles />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{ opacity, scale }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl py-6 md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-4">
              Calculate My
            </h1>

            <div className="flex -mt-5 items-center justify-center space-x-4">
              <motion.h1
                className="text-6xl  py-6 md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Dahej
              </motion.h1>

              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold "
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                💰
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 font-medium"
          >
            The most accurate dowry calculator in the universe! 😂✨
          </motion.p>

          {/* Fun Description */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12 text-lg md:text-xl text-gray-600"
          >
            <span className="bg-pink-200 px-4 py-2 rounded-full">
              👤 Your Name
            </span>
            <span className="bg-purple-200 px-4 py-2 rounded-full">
              🎂 Your Age
            </span>
            <span className="bg-yellow-200 px-4 py-2 rounded-full">
              💼 Occupation
            </span>
            <span className="bg-green-200 px-4 py-2 rounded-full">
              💎 Net Worth
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.button
              onClick={handleCalculateClick}
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.2)",
                  "0 15px 40px rgba(0,0,0,0.3)",
                  "0 10px 30px rgba(0,0,0,0.2)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaCalculator className="text-2xl md:text-3xl" />
              </motion.div>
              Calculate Yours! 🎉
              {/* Button Sparkle Effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </motion.button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="text-sm md:text-base text-gray-500 mt-8 italic"
          >
            *This is purely for entertainment purposes. Please don't take it
            seriously! 😄
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{
            borderColor: ["#9CA3AF", "#EC4899", "#9CA3AF"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              backgroundColor: ["#9CA3AF", "#EC4899", "#9CA3AF"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
