"use client"
import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    className="w-full py-8 mt-24 text-center text-gray-500 text-sm border-t border-gray-200 glass shadow-2xl"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    © 2025 PledgeIT. All rights reserved.
  </motion.footer>
);

export default Footer; 