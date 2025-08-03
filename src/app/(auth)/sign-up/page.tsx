"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SignUp() {
type formData = {
  firstname : string,
  lastname : string,
  email : string,
  password : string,

}

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "", password: "", firstname: "", lastname: "", isVerified: true,
    }
  });

  const {register , handleSubmit , reset} = form;
  const onSubmit = async (data : formData)=>{
    try {
      const response  = await axios.post("/api/sign-up " , data);
      if(response.status==200){
        console.log("Huraay Your form has been submitted")
        reset();
        router.replace("/sign-in");
      }
      console.log("The data from the form is : " , response.data);


      
    } catch (error) {
      console.log("The error on submitting form is : " , error);
      
      
    }
  }
  return (

    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
      {/* Background blobs - same as main page */}

      <motion.div
        className="w-full max-w-6xl flex items-center justify-center gap-16 px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side - Header */}
        <motion.div
          className="flex-1 max-w-md"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-slate-800 font-semibold text-5xl sm:text-6xl mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join PledgeIT
          </motion.h1>
          <motion.p
            className="text-gray-600 text-xl leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start your pledging journey today and beat procrastination with real stakes.
          </motion.p>
        </motion.div>

        {/* Right Side - Sign-up Form */}
        <motion.div
          className="flex-1 max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.form
            className="glass p-10 rounded-2xl shadow-2xl flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaUser className="text-blue-500" />
                First name
              </label>
              <input
                type="text"
                placeholder="Enter your Username"
                {...register("firstname")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastname")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaLock className="text-blue-500" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition text-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition">
                Sign in
              </a>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}