"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";



export default function SignIn() {
    const router = useRouter();

    type formData = {
      email : string,
      password : string,
    }
    const form = useForm({
        defaultValues : {
        
            password : "",
            email : "",
        }
    })
  

    const onSubmit = async (data:formData)=>{
      try {
        const res =  await signIn("credentials",{
            redirect : false,
            
            password : data.password,
            email : data.email,
         })
         if(res?.ok==true){
            console.log("Succesfully logged in");
            router.replace("/")
         }else{
         alert("Wrong Username or Password");
         }
      } catch (error) {
        console.log("The  error while logging up is : " , error);
      }
    }
    
  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
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
            Welcome Back
          </motion.h1>
          <motion.p
            className="text-gray-600 text-xl leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sign in to continue your pledging journey and track your progress.
          </motion.p>
        </motion.div>

        {/* Right Side - Sign-in Form */}
        <motion.div
          className="flex-1 max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.form
            className="glass p-10 rounded-2xl shadow-2xl flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                Email
              </label>
              <input
                type="text"
                placeholder="example@email.com"
                {...form.register("email")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium flex items-center gap-2">
                <FaLock className="text-blue-500" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
                className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
              />
            </div>

            
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition"
              >
                Forgot password?
              </a>
            </div>

            
            <motion.button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition text-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>

            
            <div className="text-center mt-4">
              <span className="text-gray-600">
                Don&apos;t have an account?{" "}
              </span>
              <a
                href="/sign-up"
                className="text-blue-600 hover:text-blue-700 font-medium transition"
              >
                Sign up
              </a>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
} 