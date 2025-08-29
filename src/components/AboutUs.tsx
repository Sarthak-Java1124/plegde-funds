"use client"
import React from "react";
import { FaCheckCircle, FaLightbulb, FaUsers, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => (
  <motion.section
    className="w-full flex flex-col items-center mt-8 sm:mt-24 px-4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <h2 className="text-center text-slate-800 font-semibold text-2xl sm:text-5xl md:text-7xl mb-4">
      About Us
    </h2>
    <p className="text-center text-gray-600 text-lg sm:text-xl max-w-2xl mt-4 mb-8 sm:mb-12">
      PledgeFunds is dedicated to helping you build better habits and achieve your goals by staking crypto on your commitments. Our mission is to empower individuals to stay accountable, motivated, and rewarded for their progress.
    </p>
    
    <div className="w-full max-w-4xl">
      <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
        <motion.div 
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <FaLightbulb className="text-white text-sm" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Our Mission</h3>
            <p className="text-gray-600 text-sm sm:text-base">To inspire positive change by making habit-building fun, social, and rewarding through the power of blockchain technology.</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <FaUsers className="text-white text-sm" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p className="text-gray-600 text-sm sm:text-base">A world where everyone can achieve their goals, stay accountable, and be part of a supportive, transparent community.</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <FaShieldAlt className="text-white text-sm" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Our Promise</h3>
            <p className="text-gray-600 text-sm sm:text-base">Join our community and turn your promises into real results with transparent, secure, and rewarding habit-building.</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">What We Believe In</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Transparency in all transactions</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Community-driven accountability</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Innovation through blockchain</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Real rewards for real progress</span>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default AboutUs;
