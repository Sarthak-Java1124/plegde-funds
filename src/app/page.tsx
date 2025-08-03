import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MakePledgeSection from "@/components/MakePledgeSection";
import Navbar from "@/components/Navbar";
import Section1 from "@/components/Section1";

export default function Home() {

   return (
     <>
       <Navbar />
       <section id="home"><Section1 /></section>
       <MakePledgeSection />
       <section id="features"><Features /></section>
       <section id="about" className="about w-full py-16 flex flex-col items-center justify-center text-center px-4">
         <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">About Us</h2>
         <p className="max-w-2xl text-gray-700 text-lg mb-6">
           PledgeFunds is dedicated to helping you build better habits and achieve your goals by staking crypto on your commitments. Our mission is to empower individuals to stay accountable, motivated, and rewarded for their progress. Join our community and turn your promises into real results!
         </p>
         <div className="flex flex-col sm:flex-row gap-8 mt-6">
           <div className="bg-white/70 rounded-xl p-6 shadow-md flex-1 min-w-[220px]">
             <h3 className="text-xl font-semibold text-blue-600 mb-2">Our Mission</h3>
             <p className="text-gray-500">To inspire positive change by making habit-building fun, social, and rewarding through the power of blockchain technology.</p>
           </div>
           <div className="bg-white/70 rounded-xl p-6 shadow-md flex-1 min-w-[220px]">
             <h3 className="text-xl font-semibold text-purple-600 mb-2">Our Vision</h3>
             <p className="text-gray-500">A world where everyone can achieve their goals, stay accountable, and be part of a supportive, transparent community.</p>
           </div>
         </div>
       </section>
       <Footer/>
     </>
   );
}
