/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaHeartBroken, FaBalanceScale, FaHandsHelping } from 'react-icons/fa'
import { GiHandcuffs, GiTombstone } from 'react-icons/gi'
import { MdReportProblem } from 'react-icons/md'

const Awareness = () => {
  const [stats, setStats] = useState({
    deaths: 0,
    cases: 0,
    harassment: 0
  })

  // Simulate fetching real data (you can replace with actual API calls)
  useEffect(() => {
    // These are approximate statistics based on NCRB data and various studies
    const realStats = {
      deaths: 8391, // Dowry deaths in India (2019 NCRB data)
      cases: 7045, // Dowry cases registered (2019 NCRB data)
      harassment: 103272 // Crimes against women (2019 NCRB data)
    }

    // Animate the numbers
    const animateStats = (target, key) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }))
      }, 50)
    }

    animateStats(realStats.deaths, 'deaths')
    animateStats(realStats.cases, 'cases')
    animateStats(realStats.harassment, 'harassment')
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaExclamationTriangle className="text-4xl text-red-600" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              The Reality Behind Dowry
            </h2>
            <FaExclamationTriangle className="text-4xl text-red-600" />
          </div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Before we proceed with the calculator, let's understand the serious impact of dowry on society. 
            This is not just a social issue - it's a matter of life and death for thousands of families.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <GiTombstone className="text-4xl text-red-600" />
              <div>
                <h3 className="text-3xl font-bold text-red-600">{stats.deaths.toLocaleString()}</h3>
                <p className="text-gray-600 font-semibold">Dowry Deaths in 2019</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              According to NCRB data, this means approximately <strong>23 women died every day</strong> due to dowry-related violence in India.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <GiHandcuffs className="text-4xl text-orange-600" />
              <div>
                <h3 className="text-3xl font-bold text-orange-600">{stats.cases.toLocaleString()}</h3>
                <p className="text-gray-600 font-semibold">Dowry Cases Registered</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              These are only the <strong>reported cases</strong>. The actual number is believed to be much higher due to underreporting.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-500"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaHeartBroken className="text-4xl text-yellow-600" />
              <div>
                <h3 className="text-3xl font-bold text-yellow-600">{stats.harassment.toLocaleString()}</h3>
                <p className="text-gray-600 font-semibold">Women Harassed</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Total crimes against women in 2019, many involving dowry-related harassment and domestic violence.
            </p>
          </motion.div>
        </motion.div>

        {/* Real Stories Section */}
        <motion.div
          className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-8 mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <MdReportProblem className="text-3xl text-red-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">The Human Cost</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Economic Impact</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Families go into debt for decades</li>
                <li>• Girls seen as financial burden</li>
                <li>• Affects women's education and career</li>
                <li>• Perpetuates gender inequality</li>
              </ul>
            </div>
            
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Social Consequences</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Domestic violence and harassment</li>
                <li>• Mental health issues</li>
                <li>• Family relationships destroyed</li>
                <li>• Discrimination against girl children</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Legal Information */}
        <motion.div
          className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaBalanceScale className="text-3xl text-blue-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Legal Framework</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Dowry Prohibition Act, 1961</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Giving or taking dowry is illegal</li>
                <li>• Punishment: Up to 5 years imprisonment</li>
                <li>• Fine: Up to ₹15,000 or dowry amount</li>
                <li>• Demanding dowry is also punishable</li>
              </ul>
            </div>
            
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Section 498A IPC</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Protects women from cruelty</li>
                <li>• Covers mental and physical torture</li>
                <li>• Non-bailable and cognizable offense</li>
                <li>• Punishment: Up to 3 years imprisonment</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl p-8 text-center"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaHandsHelping className="text-3xl text-green-600" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">How You Can Help</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Educate Others</h4>
              <p className="text-gray-700">
                Spread awareness about the harmful effects of dowry system in your community.
              </p>
            </div>
            
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Support Victims</h4>
              <p className="text-gray-700">
                Help victims report cases and provide emotional support to affected families.
              </p>
            </div>
            
            <div className="bg-white/70 rounded-xl p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">Take a Stand</h4>
              <p className="text-gray-700">
                Refuse to participate in dowry transactions and encourage others to do the same.
              </p>
            </div>
          </div>

          <div className="bg-white/70 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="font-bold text-lg text-gray-800 mb-3">Emergency Helplines</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <strong>Women Helpline:</strong> 1091
              </div>
              <div>
                <strong>National Commission for Women:</strong> 7827-170-170
              </div>
              <div>
                <strong>Police:</strong> 100
              </div>
              <div>
                <strong>Domestic Violence Helpline:</strong> 181
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="text-center mt-12 bg-yellow-50 rounded-2xl p-6"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-700 font-medium">
            <strong>Important:</strong> The calculator below is meant for educational and entertainment purposes only. 
            It aims to highlight the absurdity of the dowry system by satirizing how people are "valued" in matrimonial markets. 
            <br /><br />
            <strong>Please remember:</strong> No person's worth can be calculated by material possessions, education, or social status. 
            True relationships are built on love, respect, and mutual understanding - not on dowry.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Awareness
