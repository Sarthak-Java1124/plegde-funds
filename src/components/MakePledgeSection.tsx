"use client"
import React, {  useEffect } from "react";

import { motion } from "framer-motion";
import {useForm} from "react-hook-form"

import axios from "axios"


import { useAccount, useWriteContract  } from "wagmi";
import {waitForTransactionReceipt } from "wagmi/actions"
import {abi} from ".././abi.json"
import {useSession} from "next-auth/react"
import { parseUnits } from "viem";
import { erc20Abi } from "viem";
import { wagmiConfig } from "@/lib/wagmiConfig";


const MakePledgeSection = () => {
    type formData = {
      startTime : string,
      endTime : string,
      Duration : string,
      habbitName : string,
      stakeAmount : number, 
    }
 
  const {writeContractAsync } = useWriteContract();

  const {data : session} = useSession();
  
  const form = useForm(
    {defaultValues : {
         startTime : Date.now().toString(),
         endTime : "",
         Duration : "",
         habbitName : "",
         stakeAmount : 1,
    }}
  );
  

  
  const {register , watch , setValue} = form;
  const stakeAmount = watch("stakeAmount");
  const amountInUSDC = parseUnits(String(stakeAmount), 6);
   const startTime = watch("startTime");
   const endTime = watch("endTime");
   const { isConnected } = useAccount();

   useEffect(() => {
     if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
           setValue("endTime", startTime);
       alert("End date cannot be before start date");
     }
   }, [startTime, endTime, setValue]);
  
const onSubmit = async (sdata : formData)=>{
  
   try {
if(isConnected){
 
  await writeContractAsync({
    address: "0x73d219B3881E481394DA6B5008A081d623992200",
    abi: erc20Abi,
    functionName: "approve",
    args: ["0x574d2F2114459e23174D0cEc537382e0abD954cC", amountInUSDC],
  });
  const contractResponse = await writeContractAsync({
    address: "0x574d2F2114459e23174D0cEc537382e0abD954cC",
      abi : abi,
      functionName : "stakeAmount",
      args : [amountInUSDC , session?.user.randomId]
  });

  const receipt = await waitForTransactionReceipt( wagmiConfig, {hash : contractResponse});
 if(receipt.status=="success"){
  const response = await axios.post("/api/register-pledge" , { sdata , userId : session?.user._id , stakeAmount : stakeAmount , habbitName : sdata.habbitName , Duration : sdata.Duration , endTime : sdata.endTime , startTime : sdata.startTime }  , {withCredentials : true});
  if(response.status==200){
  }else {
    alert("Submission failed, please try again later");  
  }
}else {
  alert("Not enough balance in your account")
}
 }else {
  alert("Please connect your wallet first");
 }
   


   } catch (error) {
      
   }
}
  

  return (
    <motion.section
      className="w-full flex flex-col items-center mt-8 sm:mt-24 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className="text-center gradient-text font-bold text-2xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">
        Let&apos;s make a pledge
      </h2>
      <form
        className="w-full max-w-lg glass p-6 sm:p-10 flex flex-col gap-6 sm:gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 font-medium mb-1">
            Goal Duration (in Days)
          </label>
          <input
            type="text"
            {...register("Duration")}
            placeholder="How much time you need in days"
            className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-gray-800 font-medium mb-1">Start Time</label>
            <input
              type="date"
              {...register("startTime")}
              min={new Date().toISOString().split("T")[0]}
              placeholder="Fix a start timing"
              className="bg-white/60 rounded-xl px-4 sm:px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-gray-800 font-medium mb-1">End Time</label>
            <input
              type="date"
              {...register("endTime")}
              placeholder="What time do you want it to end"
              min={watch("startTime")}
              className="bg-white/60 rounded-xl px-4 sm:px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-gray-800 font-medium mb-1">
            What&apos;s Your Pledge
          </label>
          <textarea
            className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900 resize-none h-50"
            placeholder="Enter Your Pledge"
            {...register("habbitName")}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 font-medium mb-1">Stake Amount</label>
          <input
            type="number"
            {...register("stakeAmount")}
            placeholder="How much amount you want to stake (USDC)"
            className="bg-white/60 rounded-xl px-5 py-3 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder-gray-400 text-gray-900"
          />
        </div>
        {session?.user && stakeAmount ? (
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
          >
            Pledge It
          </button>
        ) : (
          <button
            onClick={() => alert("Please Log In First")}
            className="mt-2 bg-gradient-to-r  from-blue-600 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
          >
            Plegde It
          </button>
        )}
      </form>
    </motion.section>
  );
};

export default MakePledgeSection; 
