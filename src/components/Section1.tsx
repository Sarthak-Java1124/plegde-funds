
"use client"
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Section1(){
  const {data : session} = useSession();
  console.log("The session is : " , session?.user)
  const router = useRouter();
  return(
   
    <motion.section
      className="w-full flex flex-col items-center mt-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-center text-slate-800 font-semibold text-5xl sm:text-7xl leading-tight">
        Beat <span className="italic text-blue-600">Procastination</span><br />
        and Get Your Crypto
      </h1>
      
      {!session?.user ? (<button
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition text-2xl"
          onClick={() => router.replace("/sign-in")}
        >
          Log In
          </button>) : <button
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition text-2xl"
          onClick={() => router.replace("/dashboard")}
        >
          Go to Dashboard
          </button>}
     
    </motion.section>
  );
}
