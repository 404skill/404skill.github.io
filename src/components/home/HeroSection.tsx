
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HelpCircle, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
  isVisible: boolean;
}

const HeroSection = ({ isLoggedIn, isVisible }: HeroSectionProps) => {
  return (
    <section className="container py-24 space-y-8 md:space-y-12">
      <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Master <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Backend Development</span><br />
          With Real-World Projects
        </h1>
        <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
          Take your coding skills to the next level with practical, hands-on projects that teach you how to build robust, secure, and scalable backend systems.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                <BookOpen className="h-5 w-5" />
                Go to Projects
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                <Terminal className="h-5 w-5" />
                Start Coding Now
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
          
          <Link to="/auth">
            <Button variant="outline" size="lg" className="gap-2 hover:bg-primary/10 animate-fade-in font-mono" style={{ animationDelay: "100ms" }}>
              <HelpCircle className="h-5 w-5" />
              How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
