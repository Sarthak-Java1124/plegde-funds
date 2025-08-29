"use client"
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => (
  <motion.section
    className="w-full flex flex-col items-center mt-8 sm:mt-24 px-4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <h2 className="text-center text-slate-800 font-semibold text-2xl sm:text-5xl md:text-7xl mb-4">
      Tired of AI Planners and To-Do list?
    </h2>
    <p className="text-center text-gray-600 text-lg sm:text-xl max-w-2xl mt-4 mb-8 sm:mb-12">
      Try something with real skin in the game. Build habits, commit with tokens, and get rewarded — or lose your stake.
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
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Connect your wallet and login</h3>
            <p className="text-gray-600 text-sm sm:text-base">Come to the app, log in, and you are good to go with your pledging journey.</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Make a pledge and commit tokens</h3>
            <p className="text-gray-600 text-sm sm:text-base">Set your goal, commit your tokens, and put real value on the line to motivate yourself.</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Achieve your goal or lose your stake</h3>
            <p className="text-gray-600 text-sm sm:text-base">Complete your habit to earn rewards, or lose your tokens if you don&apos;t follow through.</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Why Choose PledgeIT?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Real financial motivation</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Transparent blockchain tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Instant rewards on completion</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
            <span className="text-gray-700">Secure smart contract execution</span>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default Features; 