"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Navbar() {
  const { connectAsync, connectors, isPending, isSuccess } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleSubmit = async () => {
    try {
      const connectorWallet = connectors.find((c) => c.id == "injected");
      if (connectorWallet != null) {
        await connectAsync({ connector: connectorWallet });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Please Connect a wallet");
    }
  };

  return (
    <>
      <nav className="flex sm:hidden w-full items-center justify-between px-4 py-3 mb-8">
        <div className="flex items-center">
          <img
            src="/logo-img.png"
            alt="PledgeFunds Logo"
            className="h-24 w-auto"
          />
        </div>
        
        <div className="flex items-center">
          {!address ? (
            <>
              {!isPending && !isSuccess && (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition text-sm"
                  onClick={handleSubmit}
                >
                  Connect
                </button>
              )}
              {isPending && !isSuccess && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition text-sm">
                  Connecting...
                </button>
              )}
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition text-sm"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          )}
        </div>
      </nav>


      <nav className="hidden sm:flex w-full items-center justify-between px-8 py-4 mt-8 bg-transparent shadow-none">
        <div className="flex flex-1 gap-8">
          <a
            href="#home"
            className="text-black hover:text-green-300 font-medium text-lg"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-black hover:text-green-300 font-medium text-lg"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-black hover:text-green-300 font-medium text-lg"
          >
            About Us
          </a>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 select-none flex items-center justify-center">
          <img
            src="/logo-img.png"
            alt="PledgeFunds Logo"
            className="h-40 w-auto"
          />
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          {!address ? (
            <>
              {!isPending && !isSuccess && (
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Connect Wallet
                </button>
              )}
              {isPending && !isSuccess && (
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
                  Connecting....
                </button>
              )}
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
