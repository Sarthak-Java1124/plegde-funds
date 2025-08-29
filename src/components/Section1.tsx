
"use client"
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Section1(){
  const {data : session} = useSession();
  const router = useRouter();

  return(
   
    <motion.section
      className="w-full flex flex-col items-center mt-8 sm:mt-24 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-center text-slate-800 font-semibold text-3xl sm:text-5xl md:text-7xl leading-tight">
        Beat <span className="italic text-blue-600">Procrastination</span><br />
        and Get Your Crypto
      </h1>
      
      {!session?.user ? (<button
          className="mt-6 sm:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition text-lg sm:text-2xl w-full sm:w-auto"
          onClick={() => router.replace("/sign-in")}
        >
          Log In
          </button>) : <button
          className="mt-6 sm:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition text-lg sm:text-2xl w-full sm:w-auto"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
          </button>}
     
    </motion.section>
  );
}
