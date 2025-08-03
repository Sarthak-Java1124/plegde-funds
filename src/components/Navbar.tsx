"use client";
import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { connectAsync, connectors, isPending, isSuccess } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [menuOpen, setMenuOpen] = useState(false);

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

  // Desktop Navbar
  return (
    <>
      {/* Mobile Navbar */}
      <nav className="flex sm:hidden w-full items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 left-0 z-50">
        <span className="font-bold text-blue-700 text-xl">PledgeFunds</span>
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-2xl text-blue-700 focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden fixed top-14 left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center animate-fade-in">
          <a
            href="#home"
            className="py-3 w-full text-center border-b border-gray-200 text-blue-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#features"
            className="py-3 w-full text-center border-b border-gray-200 text-blue-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#about"
            className="py-3 w-full text-center border-b border-gray-200 text-blue-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </a>
          <div className="py-3 w-full flex justify-center">
            {!address ? (
              !isPending && !isSuccess ? (
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                  onClick={() => {
                    setMenuOpen(false);
                    handleSubmit();
                  }}
                >
                  Connect Wallet
                </button>
              ) : (
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
                  Connecting...
                </button>
              )
            ) : (
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => {
                  setMenuOpen(false);
                  disconnect();
                }}
              >
                Disconnect Wallet
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className="hidden sm:flex w-full items-center justify-between px-8 py-4 mt-8 bg-transparent shadow-none">
        {/* Left: Navlinks */}
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
        {/* Center: Brand Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 select-none flex items-center justify-center">
          <img
            src="/logo-img.png"
            alt="PledgeFunds Logo"
            className="h-40 w-auto"
          />
        </div>
        {/* Right: Connect Wallet */}
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
