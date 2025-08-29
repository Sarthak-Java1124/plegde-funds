"use client"
import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    className="w-full py-6 sm:py-8 mt-8 sm:mt-24 text-center text-black px-4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    style={{backgroundImage : "url('/bg-to-use.jpg')"}}
  >
    © 2025 PledgeIT. All rights reserved.
  </motion.footer>
);

export default Footer; 