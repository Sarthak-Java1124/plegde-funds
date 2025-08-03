"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {  useSession, signOut } from "next-auth/react";
import axios from "axios";

import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
 import {abi} from "../../../abi.json"
import { Address } from "viem";

import { FaWallet, FaCheckCircle, FaCoins, FaSignOutAlt, FaPowerOff, FaCheck, FaArrowRight } from "react-icons/fa";



export default  function DashboardPage() {
  type Pledge = {
    habbitName : string,
    endTime : Date,
    stakeAmount : number,
    startTime : Date,
    Duration : string,
    pledgeNumber : number,
    
  }
  const {writeContractAsync} = useWriteContract();
  const {data : session} = useSession();
  const [isCompleted , setIsCompleted] = useState<number[]>([]);

  const [number , setNumber] = useState(0);
  const [messages , setMessages] = useState<Pledge[]>([]);
  if(!session?.user._id){
    console.log("No Session Id found");
  }

    useEffect(()=>{
     let sum = 0;
      const getPledges = async ()=>{
        try{
     if(session?.user._id){
      const response = await axios.get(`/api/get-pledges/${session.user.randomId}`);
      if(response.status==200){
        console.log("The Response data from the get pledges is : " , response.data);
         setMessages(response.data.findPledge.filter((item : Pledge)=>{
              const itemDate = new Date(item.endTime);
              const today = new Date();

              const itemYear = itemDate.getFullYear();
              const itemMonth = itemDate.getMonth();
              const itemDay = itemDate.getDate();

              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDay = today.getDate();

              // Manual date comparison
              if (itemYear > todayYear) return true;
              if (itemYear < todayYear) return false;

              // Same year
              if (itemMonth > todayMonth) return true;
              if (itemMonth < todayMonth) return false;

              // Same year and month
              return itemDay > todayDay;
         }));
      }else {
      alert("Your Pledge cannot be fetched");
      }
      
      for(let i = 0 ; i<messages.length; i++){
         sum = sum + messages[i].stakeAmount;
             setNumber(sum);
      }
     }else{
      console.log("No id for the session found");
     }
     
      }
  
    catch(error){
          console.log("The problem fetching pledge on the frontend is : " , error);
          throw new Error("There was a error fetching pledges on the frontend")

    }
    
  }; getPledges() }, [session])

  
           const deleteMessage =  async(pledgeNumber : number)=>{
         
           
                const delResponse = await axios.delete("/api/delete-message", {
                  data : {
                    pledgeNumber  : pledgeNumber
                  },
                  
               
                
              } ,);
             if(delResponse.status === 500){
              alert("There was a problem deleting the message");
             }
              }
              
            
           
   
     
 
 const {connectAsync , connectors , isPending , isSuccess } = useConnect();
   const {address} = useAccount();
   
 const {disconnect} = useDisconnect();
       const handleSubmit = async () => {
            try {
        const connectorWallet = connectors.find((c) => c.id == "injected");
        if (connectorWallet != null) {
          const response = await connectAsync({ connector: connectorWallet });
          
          console.log("The wallet is connected", response.accounts);
        }
      }
    catch (error) {
      console.log("The error is : ", error);
    }
   }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{ backgroundImage: "url(/bg-to-use.jpg)" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 md:gap-0">
        {/* Left: Welcome + Stats */}
        <div className="flex flex-col gap-6 w-full md:w-auto">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-gray-800"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Welcome,{" "}
            <span className="text-blue-600">{session?.user.firstname}</span>
          </motion.h1>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white/90 rounded-xl shadow-md px-6 py-4 flex items-center gap-3 min-w-[140px]">
              <FaWallet className="text-blue-500 text-2xl" />
              <div>
                <span className="text-gray-500 text-xs">Total Pledges</span>
                <div className="text-lg font-bold text-blue-600">
                  {messages.length}
                </div>
              </div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-md px-6 py-4 flex items-center gap-3 min-w-[140px]">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <div>
                <span className="text-gray-500 text-xs">Complete</span>
                <div className="text-lg font-bold text-green-600">
                  {isCompleted.length}
                </div>
              </div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-md px-6 py-4 flex items-center gap-3 min-w-[140px]">
              <FaCoins className="text-purple-500 text-2xl" />
              <div>
                <span className="text-gray-500 text-xs">Total Staked</span>
                <div className="text-lg font-bold text-purple-600">
                  {number}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Wallet/Logout Buttons */}
        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          {!address ? (
            <>
              {!isPending && !isSuccess && (
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 6px 32px 0 rgba(59,130,246,0.18)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 border-2 border-transparent hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                  onClick={handleSubmit}
                >
                  <FaWallet className="text-xl" />
                  Connect Wallet
                </motion.button>
              )}
              {isPending && !isSuccess && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                >
                  <FaPowerOff className="text-xl animate-spin" />
                  Connecting....
                </motion.button>
              )}
            </>
          ) : (
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0 6px 32px 0 rgba(59,130,246,0.18)",
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 border-2 border-transparent hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              onClick={() => disconnect()}
            >
              <FaPowerOff className="text-xl" />
              Disconnect Wallet
            </motion.button>
          )}
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 6px 32px 0 rgba(59,130,246,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 border-2 border-transparent hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            <FaSignOutAlt className="text-xl" />
            Logout
          </motion.button>
        </div>
      </div>
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 mt-2 text-center md:text-left">
        Your Pledges
      </h2>
      {/* Pledge Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {messages.length > 0 ? (
          <>
            {messages.map((pledge, idx) => (
              <motion.div
                key={idx}
                className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:scale-105 hover:shadow-xl transition min-h-[210px]"
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400 font-medium">
                    {pledge.startTime.toString().slice(0, 10)}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">To</span>
                  <span className="text-xs text-gray-400 font-medium">
                    {pledge.endTime.toString().slice(0, 10)}
                  </span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ${pledge.stakeAmount}
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {pledge.habbitName}
                </div>
                <div className="flex-1 flex items-end">
                  {isCompleted.includes(pledge.pledgeNumber) ? (
                    <motion.button
                      whileHover={{
                        scale: 1.07,
                        boxShadow: "0 6px 32px 0 rgba(251,191,36,0.18)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 border-2 border-transparent hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 text-lg w-full"
                      onClick={async () => {
                        const response = await writeContractAsync({
                          abi: abi,
                          functionName: "amountBacktoUser",
                          args: [pledge.stakeAmount, session?.user.randomId],
                          address:
                            "0xF55A20Ff398975171580860d7A821D58e8f62dD5" as Address,
                        });
                        if(response){
                          await deleteMessage(pledge.pledgeNumber);
                        }else {
                          alert("There was a problem withdrawing your crypto");
                        }
                        
                      }}
                    >
                      <FaArrowRight className="text-xl" />
                      Withdraw Your Crypto
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{
                        scale: 1.07,
                        boxShadow: "0 6px 32px 0 rgba(34,197,94,0.18)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-200 border-2 border-transparent hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 text-lg w-full"
                      onClick={() => {
                        const date = new Date().toISOString().slice(0, 10);
                        const year = new Date().toISOString().slice(0, 7);
                        const startDate = new Date(
                          pledge.startTime.toString().slice(0, 10)
                        );
                        const endDate = new Date(
                          pledge.endTime.toString().slice(0, 10)
                        );
                        const diffInMs =
                          endDate.getTime() - startDate.getTime();
                        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                        if (
                          pledge.endTime.toString().slice(0, 10) < date ||
                          (diffInDays.toString() <= pledge.Duration &&
                            pledge.endTime.toString().slice(0, 7) == year)
                        ) {
                          setIsCompleted((prev) => [
                            ...prev,
                            pledge.pledgeNumber,
                          ]);
                        } else {
                          alert("The Due Date has already passed");
                        }
                      }}
                    >
                      <FaCheck className="text-xl" />
                      Mark as Completed
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No Pledges To Display
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 