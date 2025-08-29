import AboutUs from "@/components/AboutUs";
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
       <section id="about"><AboutUs /></section>
       <Footer/>
     </>
   );
}
