"use client"
import React from "react";
import { FaWallet, FaTrophy } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { motion } from "framer-motion";

const Features = () => (
  <motion.section
    className="w-full flex flex-col items-center mt-24"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <h2 className="text-center text-slate-800 font-semibold text-5xl sm:text-7xl mb-4">
      Tired of AI Planners and To-Do list?
    </h2>
    <p className="text-center text-gray-600 text-xl max-w-2xl mt-4 mb-12">
      Try something with real skin in the game. Build habits, commit with tokens, and get rewarded — or lose your stake.
    </p>
    <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-center">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-lg p-12 flex-1 max-w-sm flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-200">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-3xl font-bold mb-6">
          <FaWallet size={36} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Connect your wallet and login</h3>
        <p className="text-gray-600 text-center text-lg">Come to the app, log in, and you are good to go with your pledging journey.</p>
      </div>
      {/* Card 2 */}
      <div className="bg-white rounded-xl shadow-lg p-12 flex-1 max-w-sm flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-200">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-3xl font-bold mb-6">
          <FiTarget size={36} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Make a pledge and commit tokens</h3>
        <p className="text-gray-600 text-center text-lg">Set your goal, commit your tokens, and put real value on the line to motivate yourself.</p>
      </div>
      {/* Card 3 */}
      <div className="bg-white rounded-xl shadow-lg p-12 flex-1 max-w-sm flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-200">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-3xl font-bold mb-6">
          <FaTrophy size={36} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Achieve your goal or lose your stake</h3>
        <p className="text-gray-600 text-center text-lg">Complete your habit to earn rewards, or lose your tokens if you don’t follow through.</p>
      </div>
    </div>
  </motion.section>
);

export default Features; 