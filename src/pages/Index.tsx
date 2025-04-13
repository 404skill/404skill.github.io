
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import TeamSection from "@/components/home/TeamSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TechStackSection from "@/components/home/TechStackSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const isLoggedIn = localStorage.getItem('user') !== null;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection isLoggedIn={isLoggedIn} isVisible={isVisible} />
        <TeamSection />
        <HowItWorksSection isVisible={isVisible} />
        <WhyChooseSection />
        <TechStackSection />
        <PricingSection />
        <CtaSection isLoggedIn={isLoggedIn} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
